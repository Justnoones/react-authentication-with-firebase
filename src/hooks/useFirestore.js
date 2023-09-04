import React, { useEffect, useRef, useState } from 'react'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp, where } from 'firebase/firestore';
import db from '../firebase';

export default function useFirestore () {
  
    let getCollection = (colName, _q) => {

        let qRef = useRef(_q).current;

        let [error, setError] = useState(false);
        let [loading, setLoading] = useState(false);
        let [data, setData] = useState([]);
      
        useEffect(() => {
            setLoading(true);
            let ref = collection(db, colName);
            let queries = [];
            if (qRef) {
             queries.push(where(...qRef));
            }
            queries.push(orderBy('date', 'desc'));
            let q = query(ref, ...queries);
            onSnapshot(q, docs => {
              if (docs.empty) {
                setLoading(false);
                setError("no documents found.");
              } else {
                let collectionDatas = [];
                docs.forEach(doc => {
                  let document = {
                    id : doc.id,
                    ...doc.data()
                  }
                  collectionDatas.push(document);
                })
                setLoading(false);
                setData(collectionDatas);
                setError(null);
              }
            });
          }, [qRef])

          return { data, error, loading };
    };

    let getDocument = (colName, id) => {

      let [error, setError] = useState(false);
      let [loading, setLoading] = useState(false);
      let [data, setData] = useState([]);

      useEffect(() => {
          setLoading(true);
          let ref = doc(db, colName, id);
          onSnapshot(ref, doc => {
              if (doc.exists()) {
                  let document = { id : doc.id, ...doc.data() };
                  setData(document);
                  setLoading(false);
                  setError(false);
              } else {
                  setError(true);
                  setLoading(false);
              }
          });
      }, [id]);

      return { data, error, loading }

    };

    let addCollection = async (colName, data) => {
      data.date = serverTimestamp();
      let ref = collection(db, colName);
      return addDoc(ref, data);
    };

    let deleteDocument = async (colName, id) => {
      let ref = doc(db, colName, id);
      return deleteDoc(ref);
    };

    let updateDocument = async (colName, id, data) => {
      data.date = serverTimestamp();
      let ref = doc(db, colName, id);
      return updateDoc(ref, data);

    };

    return { getCollection, getDocument, addCollection, deleteDocument, updateDocument };

}

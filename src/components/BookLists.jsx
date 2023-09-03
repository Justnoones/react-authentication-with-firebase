import React, { useEffect, useState } from 'react';
import BookList from './BookList';
import { useLocation } from 'react-router-dom';
import db from '../firebase/index';
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function BookLists () {
  
  let location = useLocation();
  let param = new URLSearchParams(location.search);
  let searchValue = param.get('q');
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
  let [books, setBooks] = useState([]);
  useEffect(() => {
    setLoading(true);
    let ref = collection(db, 'books');
    let q = query(ref, orderBy('date', 'desc'))
    onSnapshot(q, docs => {
      if (docs.empty) {
        setLoading(false);
        setError("no documents found.");
      } else {
        let books = [];
        docs.forEach(doc => {
          let book = {
            id : doc.id,
            ...doc.data()
          }
          books = [...books, book];
        })
        setLoading(false);
        setBooks(books);
        setError(null);
      }
    });
  }, [])
  
  return (
    <>
        {error && <p className={`text-center text-2xl font-bold text-gray-700 mt-5`}>{error}</p>}
        {!error && loading && <p className={`text-center text-2xl font-bold text-gray-700 mt-5`}>Loading...</p>}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-5'>
            {books && books.map(book => (
              <BookList key={book.id} book={book} />
            ))}
        </div>
        {!error && books && books.length < 1 && <p className={`text-center text-2xl font-bold text-gray-700`}>No Records Found.</p>}
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import db from '../firebase/index';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

export default function BookForm () {

  let { id } = useParams();

  let { isDark } = useTheme();

  let [ title, setTitle ] = useState("");
  let [ description, setDescription ] = useState("");
  let [ category, setCategory ] = useState("");
  let [ categories, setCategories ] = useState([]);
  let [ isEdit, setIsEdit ] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      let ref = doc(db, "books", id);
      getDoc(ref)
        .then(doc => {
          if (doc.exists()) {
            let { title, description, categories } = doc.data();
            setTitle(title);
            setDescription(description);
            setCategories(categories);
          } else {
            navigate("/");
          }
        })

    } else {
      setIsEdit(false);
      setTitle("");
      setDescription("");
      setCategories("");
    }
  }, []);

  let addNewCategory = e => {
    e.preventDefault();
    if (categories.includes(category)) {
      return;
    }
    if (category === "") {
      return;
    }
    setCategories([...categories, category]);
    setCategory("");
  }

  let submitForm = async (e)=> {
    e.preventDefault();
    let newBook = {
      title,
      description,
      categories,
      date : serverTimestamp()
    }

    if (isEdit) {
      let ref = doc(db, "books", id);
      await updateDoc(ref, newBook);
    } else {
      let ref = collection(db, "books");
      addDoc(ref, newBook);
    }
    navigate("/");
  }

  return (
      <form className='w-full max-w-lg mx-auto mt-5' onSubmit={submitForm}>
        <div className='flex flex-wrap -mx-3 mb-6 space-y-5'>
          <div className="w-full px-3">
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark && "text-white"}`} htmlFor="title">
              Title
            </label>
            <input value={title} onChange={e => setTitle(e.target.value)} className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500 bg-inherit ${isDark && "text-white"}`} id="title" type="text" placeholder="Book Title" />
          </div>
          <div className="w-full px-3">
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark && "text-white"}`} htmlFor="description">
              Description
            </label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500 bg-inherit ${isDark && "text-white"}`} id="description" type="text" placeholder="Book Description" />
          </div>
          <div className="w-full px-3">
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark && "text-white"}`} htmlFor="category">
              Category
            </label>
            <div className="flex items-center space-x-2">
              <input value={category} onChange={e => setCategory(e.target.value)} className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500 bg-inherit ${isDark && "text-white"}`} id="category" type="text" placeholder="Book Category" />
              <button onClick={addNewCategory} className="bg-primary p-1 rounded-lg mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap -mx-3 p-3 gap-3">
              {!!categories.length && categories.map(category => (
                <div key={category} className="bg-indigo-500 text-white text-sm px-2 py-1 rounded-lg mb-3">
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full px-3">
            <button className='w-full text-white bg-indigo-500 px-2 py-1 rounded-lg'>{isEdit ? "Edit" : "Create"} Book</button>
          </div>
        </div>
      </form>
  )
}

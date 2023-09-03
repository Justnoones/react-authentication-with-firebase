import React from 'react'
import gojo from '../assets/download.jpg';
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import trash from '../assets/trash.svg';
import { doc, deleteDoc } from 'firebase/firestore';
import edit from '../assets/edit.svg';
import db from '../firebase';

export default function BookList ({book}) {
  let deleteBook = async (e , id) => {
    e.preventDefault();
    let ref = doc(db, "books", id);
    await deleteDoc(ref);
    // setBooks(ps => {
    //   return ps.filter(b => b.id!== id);
    // })
  }

  let navigate = useNavigate();

  let editBook = (e, id) => {
    e.preventDefault();
    navigate(`edit/${id}`);
  }

  let { isDark } = useTheme();
  return (
    <Link to={`books/${book.id}`} className={`min-h-[520px] border-2 shadow-sm text-center space-y-2 mt-2 ${isDark && "border-primary"}`}>
        <div>
            <img src={gojo} className='w-full h-full' alt={"gojo"} />
        </div>
        <div className="min-h-[50px]">
          <h1 className={`text-lg font-bold ${isDark && "text-white"}`}>{book.title}</h1>
        </div>
        <div className="min-h-[50px]">
          <p className={`${isDark && "text-white"}`}>{book.description}</p>
        </div>
        <div className="min-h-[90px]">
          <div className='flex flex-wrap gap-2 p-4'>
            {book.categories.map(category => (
              <span key={category} className='text-sm text-white bg-indigo-500 px-2 py-1 rounded-md'>{category}</span>
            ))}
          </div>
        </div>
        <div className="min-h-[50px]">
          <div className="grid grid-cols-2">
            <button className='flex mx-auto px-2 py-1 bg-red-500 rounded-lg text-white' onClick={e => deleteBook(e, book.id)}>
              <img src={trash} /><span className='font-bold hidden md:block'>Delete</span>
            </button>
            <button className='flex mx-auto px-2 py-1 bg-yellow-500 rounded-lg text-black' onClick={e => editBook(e, book.id)}>
              <img src={edit} /><span className='font-bold hidden md:block'>Edit</span>
            </button>
          </div>
        </div>
    </Link>
  )
}

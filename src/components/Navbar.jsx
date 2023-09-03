import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import useTheme from '../hooks/useTheme';
import moon from '../assets/moon.svg';
import sun from '../assets/sun.svg';

export default function Navbar() {

  let navigate = useNavigate();
  let [search, setSearch] = useState("");
  let { isDark, changeContext } = useTheme();
  let searchBook = e => {
    e.preventDefault();
    navigate(`/?q=${search}`);
  }

  return (
    <nav className={`border border-b-3 ${isDark && "border-primary"}`}>
      <ul className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <li className='flex space-x-2 items-center text-center'>
          <button onClick={searchBook} className='hidden md:block'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isDark && "text-primary"}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <form method='GET' onSubmit={searchBook}>
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" name='q' placeholder='Search something...' className={`b outline-none px-2 py-1 bg-inherit ${isDark && "text-white"}`} autoComplete='off'/>
          </form>
          <button onClick={searchBook} className='b bg-primary text-white px-2 py-1 rounded-lg md:text-lg hidden md:block'>Search</button>
          <button onClick={searchBook} className='block md:hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isDark && "text-primary"}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </li>
        <Link to="/" className='flex space-x-2 items-center md:-ml-12'>
          <h1 className='b text-2xl font-bold text-primary hidden md:block'>Book Store</h1>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isDark && "text-white"}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
          </svg>
        </Link>
        <li className='flex space-x-2 items-center'>
          <Link to="create" className='flex space-x-2 items-center bg-primary rounded-xl px-2 py-1 text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className='text-lg hidden md:block'>Create Book</span>
          </Link>
          <div className='w-10 hidden md:block'>
            <img src='https://i.pinimg.com/474x/40/3c/6e/403c6e5bd46ac212351fd80f63a9849f.jpg' className='w-full rounded-full' />
          </div>
          <div className='w-10 text-center'>
            {!isDark && <img src={sun} className='w-full cursor-pointer' onClick={e => changeContext("dark")} />}
            {isDark && <img src={moon} className='w-full cursor-pointer' onClick={e => changeContext("light")} />}
          </div>
        </li>
      </ul>
    </nav>
  )
}
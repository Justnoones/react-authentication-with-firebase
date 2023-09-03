import React from 'react'
import useTheme from '../hooks/useTheme'

export default function Login () {
    let { isDark } = useTheme();
  return (
    <div className="w-full max-w-lg mt-5 mx-auto">
        <form className={`bg-${isDark ? "dbg border border-primary" : "white"} shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5`}>
            <h1 className='text-2xl font-bold text-primary'>Login Form</h1>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input className={`bg-inherit shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${isDark ? "text-white" : "text-gray-700 "}`} id="email" type="email" placeholder="Email Address" />
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input className={`bg-inherit shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline ${isDark ? "text-white" : "text-gray-700"}`} id="password" type="password" placeholder="******************" />
            </div>
            <div className="flex items-center justify-center">
            <button className="bg-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                Login
            </button>
            </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
        </p>
    </div>
  )
}

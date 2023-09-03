import React from 'react'
import useTheme from '../hooks/useTheme'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignin from '../hooks/useSignIn';

export default function Login () {

    let { error, loading, signIn } = useSignin();

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let navigate = useNavigate();

    let login = async (e) => {
        e.preventDefault();
        let user = await signIn(email, password);
        if (user) {
            navigate("/");
        }
    }

    let { isDark } = useTheme();
  return (
    <div className="w-full max-w-lg mt-5 mx-auto">
        <form className={`bg-${isDark ? "dbg border border-primary" : "white"} shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5`}  onSubmit={login}>
            <h1 className='text-2xl font-bold text-primary'>Login Form</h1>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input value={email} onChange={e => setEmail(e.target.value)} className={`bg-inherit shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${isDark ? "text-white" : "text-gray-700 "}`} id="email" type="email" placeholder="Email Address" />
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input value={password} onChange={e => setPassword(e.target.value)} className={`bg-inherit shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline ${isDark ? "text-white" : "text-gray-700"}`} id="password" type="password" placeholder="******************" />
            {error && <p className='text-red-500 text-xs itelic'>{error}</p>}
            </div>
            <div className="flex items-center justify-center">
            <button className="flex bg-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
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

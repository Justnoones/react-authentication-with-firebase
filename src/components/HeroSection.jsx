import React from 'react'
import useTheme from '../hooks/useTheme'

export default function HeroSection () {
  let { isDark } = useTheme();
  return (
    <div className={`text-center p-10 rounded-lg space-y-2 ${!isDark ? "bg-gradient-to-r from-rose-100 to-teal-100" : "bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800"}`}>
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-700"}`}>Welcome From Our Library.</h1>
        <p className={`${isDark ? "text-gray-200" : "text-gray-500"}`}>This is the place where you can store and manage your books.</p>
    </div>
  )
}

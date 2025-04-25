"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in using Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Firebase will trigger onAuthStateChanged which will update isLoggedIn
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 dark:from-gray-900 dark:to-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white dark:text-gray-100 text-xl font-bold flex items-center">
          <span className="mr-2">📚</span> EduLeap
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/course-catalog" className="text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-gray-300 transition-colors duration-200">
            Courses
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link href="/student-dashboard" className="text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-gray-300 transition-colors duration-200">
                Dashboard
              </Link>
              <Link href="/profile" className="text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-gray-300 transition-colors duration-200">
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-gray-300 transition-colors duration-200">
                Login
              </Link>
              <Link href="/signup" className="bg-white text-blue-600 dark:bg-blue-500 dark:text-white px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-600 transition-colors duration-200">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
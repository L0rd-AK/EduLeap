import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 dark:bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white dark:text-gray-100 text-lg font-bold">EduLeap</Link>
        <div className="flex space-x-4">
          <Link href="/course-catalog" className="text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-gray-300">Courses</Link>
          <Link href="/login" className="text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-gray-300">Login</Link>
          <Link href="/signup" className="text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-gray-300">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
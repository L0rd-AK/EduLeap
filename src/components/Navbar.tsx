"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { usePathname } from 'next/navigation';
import { 
  Users, BookOpen, CreditCard, LayoutDashboard, 
  Settings, LogOut, Menu, X, Bell, Search,
  GraduationCap, FileText, MessageSquare, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'student' | null>(null);
  const [userName, setUserName] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Check if user is logged in using Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      
      if (user) {
        // For demo purposes, determine role based on email
        // In a real app, you would fetch this from your user database
        if (user.email?.includes('admin')) {
          setUserRole('admin');
        } else {
          setUserRole('student');
        }
        
        setUserName(user.displayName || user.email?.split('@')[0] || 'User');
      } else {
        setUserRole(null);
        setUserName('');
      }
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

  const adminNavItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Students', href: '/admin/student-management', icon: <Users className="h-5 w-5" /> },
    { name: 'Courses', href: '/admin/course-management', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Loans', href: '/admin/loan-management', icon: <CreditCard className="h-5 w-5" /> },
    { name: 'Graduation Caps', href: '/admin/graduation-cap-settings', icon: <GraduationCap className="h-5 w-5" /> },
    { name: 'Reports', href: '/admin/reports', icon: <FileText className="h-5 w-5" /> },
  ];

  const studentNavItems = [
    { name: 'Dashboard', href: '/student-dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'My Courses', href: '/student/courses', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'My Loans', href: '/student/loans', icon: <CreditCard className="h-5 w-5" /> },
    { name: 'Graduation', href: '/student/graduation', icon: <GraduationCap className="h-5 w-5" /> },
    { name: 'Support', href: '/student/support', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : studentNavItems;
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* Desktop Navbar */}
      <div className="border-b bg-white dark:bg-gray-950 dark:border-gray-800 shadow-sm">
        <div className="flex h-16 items-center px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-blue-600 dark:text-blue-500 text-2xl">📚</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              EduLeap
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isLoggedIn && userRole && (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-500",
                    pathname === item.href
                      ? "text-blue-600 dark:text-blue-500"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Public Navigation */}
          {!isLoggedIn && (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
              <Link 
                href="/course-catalog" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                Courses
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                About
              </Link>
            </nav>
          )}

          <div className="ml-auto flex items-center gap-2">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-gray-700 dark:text-gray-300">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {userRole === 'admin' ? (
                      <>
                        <div className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">New student registration</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Alice Smith registered for Web Development</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">10 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                          <div className="rounded-full bg-yellow-100 dark:bg-yellow-900 p-2">
                            <CreditCard className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Loan application pending</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">5 new loan applications need review</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 hour ago</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                          <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                            <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Assignment graded</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Your Module 3 assignment was graded: 95%</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">30 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                          <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-2">
                            <CreditCard className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Loan payment reminder</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Your next payment is due in 5 days</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button variant="outline" size="sm" className="w-full">View all notifications</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{userName}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/student-registration">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-white dark:bg-gray-950 dark:border-gray-800">
          <div className="space-y-1 px-4 py-3">
            {isLoggedIn && userRole ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center py-2 text-base font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-500",
                      pathname === item.href
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2 pb-3">
                  <Button onClick={handleLogout} variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/course-catalog" 
                  className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Courses
                </Link>
                <Link 
                  href="/about" 
                  className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <div className="pt-4 pb-3 space-y-2">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link href="/student-registration" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
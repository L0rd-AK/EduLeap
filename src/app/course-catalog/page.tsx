'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast"; // Import useToast

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  fees: number;
  skills: string[];
  enrollmentStatus: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    category: "IT",
    duration: "12 weeks",
    fees: 1200,
    skills: ["HTML", "CSS", "JavaScript"],
    enrollmentStatus: "Open",
  },
  {
    id: 2,
    title: "Certified Nursing Assistant (CNA)",
    category: "Healthcare",
    duration: "6 weeks",
    fees: 800,
    skills: ["Patient Care", "Medical Terminology"],
    enrollmentStatus: "Open",
  },
  {
    id: 3,
    title: "Electrician Training Program",
    category: "Trades",
    duration: "24 weeks",
    fees: 2500,
    skills: ["Electrical Systems", "Wiring"],
    enrollmentStatus: "Open",
  },
  {
    id: 4,
    title: "Data Science Fundamentals",
    category: "IT",
    duration: "16 weeks",
    fees: 1800,
    skills: ["Python", "Machine Learning", "SQL"],
    enrollmentStatus: "Open",
  },
];

export default function CourseCatalogPage() {
  const { toast } = useToast(); // Initialize toast
  // Placeholder state for search, filters, and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('price-asc');
  // State to track button status for each course
  const [buttonStatus, setButtonStatus] = useState<{ [key: number]: 'Apply' | 'Pending' }>({});

  // Placeholder for filtering and sorting logic
  const filteredAndSortedCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || course.category === categoryFilter)
  ).sort((a, b) => {
    if (sortOrder === 'price-asc') {
      return a.fees - b.fees;
    } else if (sortOrder === 'price-desc') {
      return b.fees - a.fees;
    } else if (sortOrder === 'duration-asc') {
        // Simple string comparison, could be improved by parsing duration
        const durationA = parseInt(a.duration.split(' ')[0]);
        const durationB = parseInt(b.duration.split(' ')[0]);
        return durationA - durationB;
    } else if (sortOrder === 'duration-desc') {
         const durationA = parseInt(a.duration.split(' ')[0]);
        const durationB = parseInt(b.duration.split(' ')[0]);
        return durationB - durationA;
    }
    return 0;
  });

  const handleApplyForLoan = (courseId: number) => {
    console.log(`Applying for loan for course ${courseId}`);
    // Simulate loan application submission (replace with actual API call)
    setButtonStatus(prevStatus => ({
      ...prevStatus,
      [courseId]: 'Pending',
    }));
    toast({
      title: "Loan Application Submitted",
      description: "Your loan application is pending review.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">Explore Our Courses</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Input
            placeholder="Search courses by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          />
          <Select onValueChange={setCategoryFilter} value={categoryFilter}>
            <SelectTrigger className="w-full md:w-[180px] border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Trades">Trades</SelectItem>
              {/* Add more categories as needed */}
            </SelectContent>
          </Select>
          <Select onValueChange={setSortOrder} value={sortOrder}>
            <SelectTrigger className="w-full md:w-[180px] border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="duration-asc">Duration: Short to Long</SelectItem>
              <SelectItem value="duration-desc">Duration: Long to Short</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedCourses.map((course) => {
            const currentButtonStatus = buttonStatus[course.id] || 'Apply';
            return (
              <Card key={course.id} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-200">{course.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{course.category}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2 text-gray-700 dark:text-gray-300 flex-grow">
                  <p><strong className="font-semibold">Duration:</strong> {course.duration}</p>
                  <p><strong className="font-semibold">Fees:</strong> <span className="text-green-600 dark:text-green-400">${course.fees}</span></p>
                  <div>
                      <strong className="font-semibold">Skills:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                          {course.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">{skill}</Badge>
                          ))}
                      </div>
                  </div>
                  <p><strong className="font-semibold">Status:</strong> {course.enrollmentStatus}</p>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    onClick={() => handleApplyForLoan(course.id)}
                    disabled={currentButtonStatus !== 'Apply'}
                  >
                    {currentButtonStatus === 'Pending' ? 'Pending' : 'Apply for Loan'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  fees: number;
  description: string;
  skills: string[];
  enrollmentStatus: string;
  instructor: string;
  startDate: string;
  modules: {
    title: string;
    description: string;
    duration: string;
  }[];
  milestones: string[];
  studentsEnrolled: number;
}

// Updated course data to match the course details page structure
const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    category: "IT",
    duration: "12 weeks",
    fees: 1200,
    description: "This comprehensive course covers all aspects of modern web development, from HTML and CSS fundamentals to advanced JavaScript frameworks.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    enrollmentStatus: "Open",
    instructor: "Dr. Sarah Johnson",
    startDate: "2024-09-01",
    modules: [
      {
        title: "HTML & CSS Fundamentals",
        description: "Learn the building blocks of web pages and styling",
        duration: "3 weeks"
      },
      {
        title: "JavaScript Essentials",
        description: "Master programming concepts and DOM manipulation",
        duration: "4 weeks"
      },
      {
        title: "Frontend Frameworks",
        description: "Build applications with modern frameworks like React",
        duration: "5 weeks"
      }
    ],
    milestones: [
      "Build a responsive portfolio website",
      "Create an interactive web application",
      "Develop a full-stack project with API integration"
    ],
    studentsEnrolled: 128
  },
  {
    id: 2,
    title: "Certified Nursing Assistant (CNA)",
    category: "Healthcare",
    duration: "6 weeks",
    fees: 800,
    description: "Prepare for a rewarding career in healthcare with our comprehensive CNA training program.",
    skills: ["Patient Care", "Medical Terminology", "Vital Signs", "Infection Control"],
    enrollmentStatus: "Open",
    instructor: "Prof. Michael Chen",
    startDate: "2024-08-15",
    modules: [
      {
        title: "Basic Healthcare Concepts",
        description: "Introduction to healthcare principles and patient rights",
        duration: "1 week"
      },
      {
        title: "Clinical Skills",
        description: "Hands-on training in essential nursing assistant skills",
        duration: "3 weeks"
      },
      {
        title: "Clinical Practicum",
        description: "Supervised experience in healthcare settings",
        duration: "2 weeks"
      }
    ],
    milestones: [
      "Pass the skills assessment exam",
      "Complete 40 hours of clinical practice",
      "Achieve certification readiness"
    ],
    studentsEnrolled: 64
  },
  {
    id: 3,
    title: "Electrician Training Program",
    category: "Trades",
    duration: "24 weeks",
    fees: 2500,
    description: "Become a skilled electrician through our comprehensive training program.",
    skills: ["Electrical Systems", "Wiring", "Circuit Design", "Safety Protocols"],
    enrollmentStatus: "Open",
    instructor: "Robert Martinez",
    startDate: "2024-10-01",
    modules: [
      {
        title: "Electrical Theory",
        description: "Understanding electricity, circuits, and components",
        duration: "6 weeks"
      },
      {
        title: "Residential Wiring",
        description: "Installation techniques for homes and apartments",
        duration: "8 weeks"
      },
      {
        title: "Commercial Applications",
        description: "Advanced systems for business environments",
        duration: "10 weeks"
      }
    ],
    milestones: [
      "Complete basic circuit design project",
      "Pass residential wiring assessment",
      "Achieve journeyman-level skills evaluation"
    ],
    studentsEnrolled: 42
  },
  {
    id: 4,
    title: "Data Science Fundamentals",
    category: "IT",
    duration: "16 weeks",
    fees: 1800,
    description: "Learn to analyze and interpret complex data using statistical methods and programming.",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    enrollmentStatus: "Open",
    instructor: "Dr. Emily Rodriguez",
    startDate: "2024-09-15",
    modules: [
      {
        title: "Python Programming",
        description: "Fundamentals of Python for data analysis",
        duration: "4 weeks"
      },
      {
        title: "Statistical Analysis",
        description: "Statistical methods and their applications",
        duration: "5 weeks"
      },
      {
        title: "Machine Learning",
        description: "Building predictive models with ML algorithms",
        duration: "7 weeks"
      }
    ],
    milestones: [
      "Complete data analysis project",
      "Build a machine learning model",
      "Create a data visualization dashboard"
    ],
    studentsEnrolled: 95
  }
];

export default function CourseCatalogPage() {
  const { toast } = useToast();
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
              <SelectItem value="duration-asc">Duration: Shortest First</SelectItem>
              <SelectItem value="duration-desc">Duration: Longest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCourses.map((course) => (
            <Card key={course.id} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <Link href={`/course-details?courseId=${course.id}`} className="block">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">{course.title}</CardTitle>
                    <Badge variant="outline" className={course.enrollmentStatus === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'}>
                      {course.enrollmentStatus}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {course.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Duration:</span> {course.duration}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Fee:</span> ${course.fees}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills Covered:</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                          {skill}
                        </Badge>
                      ))}
                      {course.skills.length > 3 && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          +{course.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {course.description}
                  </div>
                </CardContent>
              </Link>
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleApplyForLoan(course.id)}
                  disabled={buttonStatus[course.id] === 'Pending'}
                >
                  {buttonStatus[course.id] === 'Pending' ? 'Application Pending' : 'Apply for Loan'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
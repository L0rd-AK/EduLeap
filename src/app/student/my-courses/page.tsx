'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, CheckCircle, Clock, Search, Filter, ArrowUpRight, 
  Calendar as CalendarIcon, Play, FileText, Award
} from "lucide-react";

// Placeholder data for enrolled courses
const enrolledCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    instructor: "Dr. Sarah Johnson",
    progress: 65,
    category: "Technology",
    image: "/images/courses/web-dev.jpg",
    nextLesson: { title: "JavaScript Promises", date: "2023-10-15T10:00:00", duration: "1 hour" },
    description: "Learn the core technologies that power the web: HTML, CSS, and JavaScript. Build responsive websites from scratch.",
    totalModules: 12,
    completedModules: 8,
    rating: 4.8,
    assignments: [
      { id: 101, title: "Create a responsive landing page", dueDate: "2023-10-18", completed: false },
      { id: 102, title: "JavaScript basics quiz", dueDate: "2023-10-20", completed: false }
    ]
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    instructor: "Prof. Michael Chen",
    progress: 30,
    category: "Data Science",
    image: "/images/courses/data-science.jpg",
    nextLesson: { title: "Introduction to Pandas", date: "2023-10-16T14:00:00", duration: "1.5 hours" },
    description: "Master the basics of data analysis, visualization, and machine learning with Python.",
    totalModules: 10,
    completedModules: 3,
    rating: 4.6,
    assignments: [
      { id: 103, title: "Data cleaning exercise", dueDate: "2023-10-19", completed: false }
    ]
  },
  {
    id: 3,
    title: "Business Communication",
    instructor: "Dr. Emily Rodriguez",
    progress: 85,
    category: "Business",
    image: "/images/courses/business-comm.jpg",
    nextLesson: { title: "Effective Email Writing", date: "2023-10-14T11:00:00", duration: "1 hour" },
    description: "Develop essential communication skills for the modern workplace. Learn to write effectively and present confidently.",
    totalModules: 8,
    completedModules: 7,
    rating: 4.9,
    assignments: [
      { id: 104, title: "Business proposal draft", dueDate: "2023-10-17", completed: true }
    ]
  }
];

// Placeholder data for recommended courses
const recommendedCourses = [
  {
    id: 4,
    title: "Advanced JavaScript",
    instructor: "Alex Thompson",
    category: "Technology",
    image: "/images/courses/advanced-js.jpg",
    description: "Take your JavaScript skills to the next level with advanced concepts like closures, prototypes, and async programming.",
    duration: "8 weeks",
    rating: 4.7,
    students: 1245
  },
  {
    id: 5,
    title: "Machine Learning Essentials",
    instructor: "Dr. Lisa Wang",
    category: "Data Science",
    image: "/images/courses/machine-learning.jpg",
    description: "Learn the fundamentals of machine learning algorithms and how to implement them using Python and scikit-learn.",
    duration: "10 weeks",
    rating: 4.9,
    students: 2130
  },
  {
    id: 6,
    title: "Project Management",
    instructor: "Robert Garcia",
    category: "Business",
    image: "/images/courses/project-management.jpg",
    description: "Master the skills needed to successfully manage projects from initiation to completion.",
    duration: "6 weeks",
    rating: 4.5,
    students: 1876
  }
];

// Placeholder data for completed courses
const completedCourses = [
  {
    id: 7,
    title: "Introduction to Python",
    instructor: "Dr. James Wilson",
    category: "Technology",
    image: "/images/courses/python-intro.jpg",
    completionDate: "2023-08-15",
    grade: "A",
    certificate: true,
    rating: 5.0
  },
  {
    id: 8,
    title: "Digital Marketing Basics",
    instructor: "Maria Lopez",
    category: "Marketing",
    image: "/images/courses/digital-marketing.jpg",
    completionDate: "2023-07-20",
    grade: "B+",
    certificate: true,
    rating: 4.2
  }
];

export default function StudentCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("enrolled");

  // Filter courses based on search query
  const filteredEnrolled = enrolledCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecommended = recommendedCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompleted = completedCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Courses</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and track your learning journey</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-8 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="enrolled" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
            <TabsTrigger value="enrolled" className="rounded-md">Enrolled Courses</TabsTrigger>
            <TabsTrigger value="recommended" className="rounded-md">Recommended</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-md">Completed</TabsTrigger>
          </TabsList>

          {/* Enrolled Courses Tab */}
          <TabsContent value="enrolled" className="space-y-6">
            {filteredEnrolled.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredEnrolled.map(course => (
                  <Card key={course.id} className="bg-white dark:bg-gray-800 shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-6">
                        <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                          </div>
                        </div>
                      </div>
                      <div className="md:w-3/4 p-6">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <Badge className="mb-2">{course.category}</Badge>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{course.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Instructor: {course.instructor}</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Button>
                              Continue Learning
                              <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Progress: {course.completedModules}/{course.totalModules} modules
                            </span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex items-start space-x-3">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                              <Play className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-white">Next Lesson</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{course.nextLesson.title}</p>
                              <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-500">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {new Date(course.nextLesson.date).toLocaleDateString()} at {new Date(course.nextLesson.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                <span className="mx-1">•</span>
                                <Clock className="h-3 w-3 mr-1" />
                                {course.nextLesson.duration}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                              <FileText className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-white">Assignments</p>
                              {course.assignments.length > 0 ? (
                                <div className="space-y-1 mt-1">
                                  {course.assignments.map(assignment => (
                                    <div key={assignment.id} className="flex items-center">
                                      <div className={`w-2 h-2 rounded-full ${assignment.completed ? 'bg-green-500' : 'bg-yellow-500'} mr-2`}></div>
                                      <p className="text-xs text-gray-600 dark:text-gray-400">{assignment.title}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-600 dark:text-gray-400">No pending assignments</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No courses found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or browse our recommendations</p>
                <Button onClick={() => {setActiveTab("recommended"); setSearchQuery("")}}>
                  Browse Recommended Courses
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Recommended Courses Tab */}
          <TabsContent value="recommended" className="space-y-6">
            {filteredRecommended.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecommended.map(course => (
                  <Card key={course.id} className="bg-white dark:bg-gray-800 shadow-md overflow-hidden flex flex-col">
                    <div className="h-40 bg-gray-100 dark:bg-gray-700 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <Badge className="absolute top-3 left-3">{course.category}</Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>Instructor: {course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{course.description}</p>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1">{course.rating}</span>
                          <span className="mx-1">•</span>
                          <span>{course.students} students</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button className="w-full">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No courses found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search criteria</p>
                <Button onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Completed Courses Tab */}
          <TabsContent value="completed" className="space-y-6">
            {filteredCompleted.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompleted.map(course => (
                  <Card key={course.id} className="bg-white dark:bg-gray-800 shadow-md overflow-hidden">
                    <div className="h-40 bg-gray-100 dark:bg-gray-700 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <Badge className="absolute top-3 left-3">{course.category}</Badge>
                      {course.certificate && (
                        <div className="absolute top-3 right-3 bg-green-100 dark:bg-green-900 p-1.5 rounded-full">
                          <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>Instructor: {course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Completion Date:</span>
                          <span className="text-sm font-medium text-gray-800 dark:text-white">
                            {new Date(course.completionDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Final Grade:</span>
                          <span className="text-sm font-medium text-gray-800 dark:text-white">{course.grade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Your Rating:</span>
                          <span className="text-sm font-medium text-yellow-500">
                            {'★'.repeat(Math.floor(course.rating))}
                            {course.rating % 1 !== 0 && '½'}
                            {'☆'.repeat(5 - Math.ceil(course.rating))}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      {course.certificate && (
                        <Button className="flex-1">
                          View Certificate
                        </Button>
                      )}
                      <Button variant="outline" className="flex-1">
                        Review Materials
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No completed courses found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchQuery ? "Try adjusting your search criteria" : "You haven't completed any courses yet"}
                </p>
                {searchQuery && (
                  <Button onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import Link from 'next/link';
import { BookOpen, Clock, Calendar as CalendarIcon, Bell, Award, BarChart2, FileText, CheckCircle } from 'lucide-react';

interface EnrolledCourse {
  id: number;
  title: string;
  category: string;
  progress: number;
  instructor: string;
  nextLesson: {
    title: string;
    date: string;
    time: string;
  };
  assignments: {
    title: string;
    dueDate: string;
    completed: boolean;
  }[];
}

interface Announcement {
  id: number;
  title: string;
  date: string;
  courseId: number;
  courseName: string;
  read: boolean;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  dateEarned: string;
  icon: string;
}

// Mock data for enrolled courses
const enrolledCourses: EnrolledCourse[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    category: "IT",
    progress: 65,
    instructor: "Dr. Sarah Johnson",
    nextLesson: {
      title: "JavaScript DOM Manipulation",
      date: "2023-08-15",
      time: "10:00 AM"
    },
    assignments: [
      {
        title: "Create a responsive landing page",
        dueDate: "2023-08-20",
        completed: false
      },
      {
        title: "HTML structure exercise",
        dueDate: "2023-08-10",
        completed: true
      }
    ]
  },
  {
    id: 2,
    title: "Certified Nursing Assistant (CNA)",
    category: "Healthcare",
    progress: 42,
    instructor: "Prof. Michael Chen",
    nextLesson: {
      title: "Patient Care Fundamentals",
      date: "2023-08-16",
      time: "2:00 PM"
    },
    assignments: [
      {
        title: "Medical terminology quiz",
        dueDate: "2023-08-18",
        completed: false
      }
    ]
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    category: "IT",
    progress: 28,
    instructor: "Dr. Emily Rodriguez",
    nextLesson: {
      title: "Introduction to Python Libraries",
      date: "2023-08-17",
      time: "11:00 AM"
    },
    assignments: [
      {
        title: "Data cleaning exercise",
        dueDate: "2023-08-25",
        completed: false
      },
      {
        title: "Python basics quiz",
        dueDate: "2023-08-12",
        completed: true
      }
    ]
  }
];

// Mock data for announcements
const announcements: Announcement[] = [
  {
    id: 1,
    title: "Schedule change for next week's Web Development class",
    date: "2023-08-12",
    courseId: 1,
    courseName: "Introduction to Web Development",
    read: false
  },
  {
    id: 2,
    title: "New resources added for CNA students",
    date: "2023-08-10",
    courseId: 2,
    courseName: "Certified Nursing Assistant (CNA)",
    read: true
  },
  {
    id: 3,
    title: "Guest lecture announcement: Data Science in Healthcare",
    date: "2023-08-08",
    courseId: 3,
    courseName: "Data Science Fundamentals",
    read: false
  }
];

// Mock data for achievements
const achievements: Achievement[] = [
  {
    id: 1,
    title: "Fast Learner",
    description: "Completed 5 lessons in a single day",
    dateEarned: "2023-08-05",
    icon: "award"
  },
  {
    id: 2,
    title: "Perfect Score",
    description: "Achieved 100% on an assignment",
    dateEarned: "2023-07-28",
    icon: "trophy"
  },
  {
    id: 3,
    title: "Consistent Learner",
    description: "Logged in for 7 consecutive days",
    dateEarned: "2023-08-10",
    icon: "calendar"
  }
];

export default function StudentDashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  // Get upcoming assignments across all courses
  const upcomingAssignments = enrolledCourses
    .flatMap(course => 
      course.assignments
        .filter(assignment => !assignment.completed)
        .map(assignment => ({
          ...assignment,
          courseId: course.id,
          courseTitle: course.title
        }))
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  // Get upcoming lessons
  const upcomingLessons = enrolledCourses
    .map(course => ({
      courseId: course.id,
      courseTitle: course.title,
      ...course.nextLesson
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate overall progress
  const overallProgress = enrolledCourses.length > 0 
    ? enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length 
    : 0;

  // Mark announcement as read
  const markAsRead = (id: number) => {
    // In a real app, this would update the database
    console.log(`Marking announcement ${id} as read`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Student Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Welcome back, Student!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="mr-2">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              View All Courses
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{Math.round(overallProgress)}%</div>
                  <Progress value={overallProgress} className="h-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Enrolled Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{enrolledCourses.length}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Across {new Set(enrolledCourses.map(course => course.category)).size} different categories
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{upcomingAssignments.length}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Next deadline: {upcomingAssignments.length > 0 ? new Date(upcomingAssignments[0].dueDate).toLocaleDateString() : 'None'}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Upcoming Assignments</CardTitle>
                    <CardDescription>Assignments due in the next 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingAssignments.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingAssignments.slice(0, 3).map((assignment, index) => (
                          <div key={index} className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-800 dark:text-gray-200">{assignment.title}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {assignment.courseTitle} • Due {new Date(assignment.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                        No upcoming assignments
                      </div>
                    )}
                  </CardContent>
                  {upcomingAssignments.length > 3 && (
                    <CardFooter>
                      <Button variant="ghost" className="w-full">View All Assignments</Button>
                    </CardFooter>
                  )}
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                    <CardDescription>Track your progress across all enrolled courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {enrolledCourses.map((course) => (
                        <div key={course.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="font-medium text-gray-800 dark:text-gray-200">{course.title}</div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{course.progress}%</div>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Upcoming Classes</CardTitle>
                    <CardDescription>Your scheduled lessons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingLessons.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingLessons.map((lesson, index) => (
                          <div key={index} className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full mr-3">
                              <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 dark:text-gray-200">{lesson.title}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {lesson.courseTitle}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(lesson.date).toLocaleDateString()} at {lesson.time}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                        No upcoming classes
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription>Latest updates from your courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {announcements.length > 0 ? (
                      <div className="space-y-4">
                        {announcements.map((announcement) => (
                          <div key={announcement.id} className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div className={`p-2 rounded-full mr-3 ${announcement.read ? 'bg-gray-100 dark:bg-gray-700' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
                              <Bell className={`h-5 w-5 ${announcement.read ? 'text-gray-500 dark:text-gray-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-800 dark:text-gray-200">{announcement.title}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {announcement.courseName} • {new Date(announcement.date).toLocaleDateString()}
                              </div>
                            </div>
                            {!announcement.read && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => markAsRead(announcement.id)}
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                        No announcements
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{course.title}</CardTitle>
                      <Badge variant="secondary">{course.category}</Badge>
                    </div>
                    <CardDescription>Instructor: {course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Next Lesson:</div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                        <div className="font-medium">{course.nextLesson.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(course.nextLesson.date).toLocaleDateString()} at {course.nextLesson.time}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      Assignments ({course.assignments.filter(a => !a.completed).length})
                    </Button>
                    <Link href={`/course-details?courseId=${course.id}`}>
                      <Button size="sm">Go to Course</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Select a date to view events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No date selected'}
                  </CardTitle>
                  <CardDescription>Your schedule for the selected date</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* This would be populated with actual events for the selected date */}
                    <div className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 dark:text-gray-200">JavaScript DOM Manipulation</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Introduction to Web Development • 10:00 AM - 11:30 AM
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Join</Button>
                    </div>
                    
                    <div className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full mr-3">
                        <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 dark:text-gray-200">Assignment Due: Create a responsive landing page</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Introduction to Web Development • Due by 11:59 PM
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Submit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-full mr-3">
                        <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <CardTitle>{achievement.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
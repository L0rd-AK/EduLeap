'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { BarChart, BookOpen, GraduationCap, TrendingUp, MessageSquare, FileText, CreditCard, Users } from 'lucide-react';

export default function StudentDashboardPage() {
  // Placeholder data
  const studentName = "Alice Smith";
  const learningProgress = 75; // in percentage
  const roiProjection = 15; // in percentage
  const graduationStatus = "On track to graduate in Q3 2024";
  const milestoneBadges = [
    { name: "Module 1 Complete", awarded: true },
    { name: "Assignment 3 Passed", awarded: true },
    { name: "Midterm Exam", awarded: false },
  ];
  const upcomingAssessments = ["Final Project", "Module 7 Quiz"];
    const completedCourses = 3; // Example number of completed courses
    const activeLoans = 1; // Example number of active loans
    const nextDueDate = "2024-08-15"; // Example next due date
    const outstandingBalance = 500; // Example outstanding balance

    const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-black py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Student Dashboard</h1>
          <Avatar>
            <AvatarImage src="https://picsum.photos/50/50" alt={studentName} />
            <AvatarFallback>{studentName.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Courses</CardTitle>
              <BookOpen className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{completedCourses}</div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                <TrendingUp className="h-4 w-4 inline-block align-middle mr-1" />
                +1 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Loans</CardTitle>
              <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{activeLoans}</div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                Next Due Date: {nextDueDate}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Learning Progress</CardTitle>
              <GraduationCap className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{learningProgress}%</div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                Target: 100%
              </p>
              <Progress value={learningProgress} max={100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">ROI Projection</CardTitle>
              <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{roiProjection}%</div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                Expected ROI upon graduation
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Learning Progress Section */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Course Progress</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Track your course completion and milestones.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-medium">Overall Completion ({learningProgress}%)</Label>
                <Progress value={learningProgress} className="w-full h-3 bg-gray-200 dark:bg-gray-700 data-[state=complete]:bg-blue-600 dark:data-[state=complete]:bg-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Milestone Badges</h3>
                <div className="flex flex-wrap gap-3">
                  {milestoneBadges.map((badge, index) => (
                    <Badge key={index} variant={badge.awarded ? "default" : "secondary"} className={
                        badge.awarded
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200'
                    }>
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Upcoming Assessments</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-1">
                  {upcomingAssessments.map((assessment, index) => (
                    <li key={index}>{assessment}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Financial Overview Section */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Financial Overview</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Track your loan and payment details.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Outstanding Balance</h3>
                <p className="text-4xl font-bold text-red-600 dark:text-red-400">${outstandingBalance}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Next Due Date</h3>
                 <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>{nextDueDate}</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start" side="bottom">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) =>
                          date < new Date("2020-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
              </div>
               <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Upcoming Payments</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">View payment schedule and history.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <Card className="mt-8 bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Link href="#" passHref>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
                Resume Course
              </Button>
            </Link>
            <Link href="/loan-application" passHref>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700 font-semibold rounded-md">
                Apply for Loan
              </Button>
            </Link>
            <Link href="/certifications" passHref>
              <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 font-semibold rounded-md">
                View Certifications
              </Button>
            </Link>
             <Link href="/help-support" passHref>
              <Button variant="secondary" className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> Support
              </Button>
            </Link>
             <Link href="/student-registration" passHref>
              <Button variant="secondary" className="font-semibold flex items-center gap-2">
               <Users className="h-5 w-5" /> Register another course
              </Button>
            </Link>
             <Link href="/reports" passHref>
              <Button variant="secondary" className="font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" /> View Reports
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Graduation Status */}
        <Card className="mt-8 bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Graduation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-lg font-medium ${graduationStatus.includes('On track') ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>{graduationStatus}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

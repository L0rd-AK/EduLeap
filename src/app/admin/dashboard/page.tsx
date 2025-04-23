'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, BarChart, GraduationCap, FileText, BookOpen, CreditCard, LayoutDashboard, ListChecks, Presentation, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast"; // Import useToast


export default function AdminDashboardPage() {
  const { toast } = useToast(); // Initialize toast

  // Placeholder data for key metrics
  const totalStudents = 1250;
  const activeLoans = 480;
  const placementRate = 85; // in percentage
  const totalRevenue = 750000; // in dollars
  const newApplications = 35;

  // Placeholder data for quick-access widgets
  const graduationCapStatus = "50/100 slots filled";
  const pendingLoanApplications = 25;
  const courseEnrollmentTrends = "Increasing"; // More descriptive indicator
  const latestReport = "Q3 2024 Performance Report";
  const taskCompletion = 60;

  // Placeholder data for recent activity and team members
  const recentActivities = [
    { id: 1, description: "Alice Smith submitted a loan application", time: "5 mins ago" },
    { id: 2, description: "Bob Johnson completed Web Development Module 3", time: "30 mins ago" },
    { id: 3, description: "Charlie Brown requested support for CNA course", time: "1 hour ago" },
  ];

   // Placeholder data for task list
    const taskList = [
        { id: 1, task: "Review Loan Applications", status: "Pending" },
        { id: 2, task: "Update Course Catalog", status: "In Progress" },
        { id: 3, task: "Generate Monthly Report", status: "Completed" },
    ];

  const teamMembers = [
    { id: 1, name: "Emily White", role: "Loan Officer" },
    { id: 2, name: "David Green", role: "Course Manager" },
  ];

    const [date, setDate] = useState<Date | undefined>(new Date());

    const handleGenerateReport = () => {
      toast({
        title: "Report Generated!",
        description: "The Q4 2024 report has been successfully generated.",
      });
    };


  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
          <Button variant="secondary" className="font-semibold flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Button>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</CardTitle>
              <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalStudents}</div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                <TrendingUp className="h-4 w-4 inline-block align-middle mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Loans</CardTitle>
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{activeLoans}</div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                <TrendingUp className="h-4 w-4 inline-block align-middle mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Placement Rate</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{placementRate}%</div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                Target: 90%
              </p>
              <Progress value={placementRate} max={100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                +5% from last quarter
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick-Access Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Graduation Cap Status</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Current status of graduation slots.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <GraduationCap className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{graduationCapStatus}</div>
                <Progress value={50} max={100} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Pending Loan Applications</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Applications awaiting review.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <CreditCard className="h-10 w-10 text-red-500 dark:text-red-400" />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{pendingLoanApplications}</div>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  <Link href="/admin/loan-management" className="text-blue-500 hover:underline">
                    View Applications
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Course Enrollment Trends</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Overview of enrollment activity.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <BarChart className="h-10 w-10 text-green-500 dark:text-green-400" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{courseEnrollmentTrends}</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">New Applications</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">New student registrations.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Users className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{newApplications}</div>
            </CardContent>
          </Card>
        </div>

        {/* Task List and Calendar Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Task List</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Manage your daily tasks.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {taskList.map(task => (
                  <li key={task.id} className="flex items-center justify-between">
                    <span className="text-gray-800 dark:text-gray-200">{task.task}</span>
                    <Badge variant="secondary">{task.status}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Calendar</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Upcoming events and deadlines.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden">
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
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Team Members Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Stay up-to-date on platform activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recentActivities.map(activity => (
                  <li key={activity.id} className="flex items-start justify-between">
                    <p className="text-gray-800 dark:text-gray-200">{activity.description}</p>
                    <span className="text-sm text-gray-500 dark:text-gray-300">{activity.time}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Team Members</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Manage and view team member profiles.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {teamMembers.map(member => (
                  <li key={member.id} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/50/50" alt={member.name} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{member.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">{member.role}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Latest Report and Task Completion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Latest Report</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">View the latest performance report.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{latestReport}</div>
               <Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  Generate Report
               </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Task Completion</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Overall task completion rate.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{taskCompletion}%</div>
              <Progress value={taskCompletion} max={100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Navigation Menu */}
        <Card className="mt-8 bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Management & Reporting</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Link href="/admin/student-management" passHref>
              <Button variant="secondary" className="font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" /> Student Management
              </Button>
            </Link>
            <Link href="/admin/course-management" passHref>
              <Button variant="secondary" className="font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Course Management
              </Button>
            </Link>
            <Link href="/admin/loan-management" passHref>
              <Button variant="secondary" className="font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Loan Management
              </Button>
            </Link>
            <Link href="/admin/reports" passHref>
              <Button variant="secondary" className="font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" /> Reports
              </Button>
            </Link>
            <Link href="/help-support" passHref>
              <Button variant="secondary" className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> Support
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


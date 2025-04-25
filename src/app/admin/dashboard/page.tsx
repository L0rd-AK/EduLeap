'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Users, DollarSign, TrendingUp, BarChart, GraduationCap, 
  FileText, BookOpen, CreditCard, LayoutDashboard, 
  ListChecks, Presentation, MessageSquare, Bell, 
  CheckCircle, AlertCircle, Clock, ArrowUpRight, 
  ArrowDownRight, ChevronRight, Filter
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeRange, setTimeRange] = useState("week");

  // Placeholder data for key metrics
  const totalStudents = 1250;
  const activeLoans = 480;
  const placementRate = 85; // in percentage
  const totalRevenue = 750000; // in dollars
  const newApplications = 35;
  const completionRate = 78; // in percentage
  const defaultRate = 3.2; // in percentage

  // Placeholder data for quick-access widgets
  const graduationCapStatus = "50/100 slots filled";
  const pendingLoanApplications = 25;
  const courseEnrollmentTrends = "Increasing"; // More descriptive indicator
  const latestReport = "Q3 2024 Performance Report";
  const taskCompletion = 60;

  // Placeholder data for recent activity
  const recentActivities = [
    { id: 1, description: "Alice Smith submitted a loan application", time: "5 mins ago", type: "loan" },
    { id: 2, description: "Bob Johnson completed Web Development Module 3", time: "30 mins ago", type: "course" },
    { id: 3, description: "Charlie Brown requested support for CNA course", time: "1 hour ago", type: "support" },
    { id: 4, description: "Diana Prince was approved for graduation", time: "2 hours ago", type: "graduation" },
    { id: 5, description: "New course 'Advanced Data Science' was published", time: "3 hours ago", type: "course" },
    { id: 6, description: "Monthly financial report is ready for review", time: "5 hours ago", type: "report" },
  ];

  // Placeholder data for task list
  const taskList = [
    { id: 1, task: "Review Loan Applications", status: "Pending", priority: "High", dueDate: "Today" },
    { id: 2, task: "Update Course Catalog", status: "In Progress", priority: "Medium", dueDate: "Tomorrow" },
    { id: 3, task: "Generate Monthly Report", status: "Completed", priority: "High", dueDate: "Yesterday" },
    { id: 4, task: "Review Graduation Applications", status: "Pending", priority: "Medium", dueDate: "In 2 days" },
    { id: 5, task: "Update Loan Terms", status: "Not Started", priority: "Low", dueDate: "Next week" },
  ];

  // Placeholder data for team members
  const teamMembers = [
    { id: 1, name: "Emily White", role: "Loan Officer", avatar: "/avatars/emily.jpg", status: "online" },
    { id: 2, name: "David Green", role: "Course Manager", avatar: "/avatars/david.jpg", status: "offline" },
    { id: 3, name: "Sarah Johnson", role: "Student Support", avatar: "/avatars/sarah.jpg", status: "online" },
    { id: 4, name: "Michael Chen", role: "Financial Analyst", avatar: "/avatars/michael.jpg", status: "away" },
  ];

  // Placeholder data for course performance
  const coursePerformance = [
    { id: 1, name: "Web Development", enrollments: 320, completionRate: 85, satisfaction: 4.7 },
    { id: 2, name: "CNA", enrollments: 280, completionRate: 92, satisfaction: 4.9 },
    { id: 3, name: "Data Science", enrollments: 210, completionRate: 78, satisfaction: 4.5 },
    { id: 4, name: "Electrician Training", enrollments: 175, completionRate: 88, satisfaction: 4.6 },
  ];

  // Placeholder data for alerts
  const alerts = [
    { id: 1, message: "5 loan applications require immediate review", type: "warning", time: "1 hour ago" },
    { id: 2, message: "Graduation cap for CNA program is almost full", type: "info", time: "3 hours ago" },
    { id: 3, message: "3 students have missed payment deadlines", type: "error", time: "Yesterday" },
    { id: 4, message: "New regulatory compliance report due next week", type: "info", time: "2 days ago" },
  ];

  // Placeholder data for revenue trends
  const revenueTrends = {
    week: [12500, 15000, 13200, 16800, 14500, 17200, 19000],
    month: [68000, 72000, 65000, 78000, 82000, 75000, 88000, 92000],
    quarter: [220000, 245000, 260000, 275000],
    year: [750000, 820000, 880000, 950000]
  };

  // Placeholder data for student enrollment trends
  const enrollmentTrends = {
    week: [25, 30, 28, 35, 32, 38, 42],
    month: [120, 135, 128, 142, 150, 145, 160, 168],
    quarter: [450, 480, 520, 550],
    year: [1800, 2100, 2400, 2750]
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated!",
      description: "The Q4 2024 report has been successfully generated.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-500";
      case "In Progress": return "bg-blue-500";
      case "Completed": return "bg-green-500";
      case "Not Started": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error": return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "info": return <Bell className="h-5 w-5 text-blue-500" />;
      default: return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "loan": return <CreditCard className="h-5 w-5 text-purple-500" />;
      case "course": return <BookOpen className="h-5 w-5 text-blue-500" />;
      case "support": return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "graduation": return <GraduationCap className="h-5 w-5 text-yellow-500" />;
      case "report": return <FileText className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, Admin! Here's what's happening today.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleGenerateReport} className="bg-teal-600 hover:bg-teal-700">
              <FileText className="h-4 w-4 mr-2" /> Generate Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8 w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="tasks">Tasks & Alerts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalStudents}</div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-green-600 dark:text-green-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> +5.2%
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{activeLoans}</div>
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-green-600 dark:text-green-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> +3.8%
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Placement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{placementRate}%</div>
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-green-600 dark:text-green-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> +2.1%
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">vs last quarter</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">${(totalRevenue / 1000).toFixed(0)}K</div>
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                      <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-green-600 dark:text-green-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> +8.3%
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">vs last quarter</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-teal-600 dark:text-teal-400" />
                    Graduation Cap Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-700 dark:text-gray-300 mb-2">{graduationCapStatus}</div>
                  <Progress value={50} className="h-2" />
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/admin/graduation-cap-settings">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Settings
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                    Loan Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-700 dark:text-gray-300 mb-2">{pendingLoanApplications} pending applications</div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{newApplications} new today</Badge>
                    <Badge variant="outline">3 urgent</Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/admin/loan-management">
                    <Button variant="outline" size="sm" className="w-full">
                      Review Applications
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Course Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-700 dark:text-gray-300 mb-2">Enrollment trend: {courseEnrollmentTrends}</div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">5 courses need review</Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/admin/course-management">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Courses
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Recent Activity and Team Members */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
                  <CardDescription>Latest updates across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-600">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 dark:text-gray-200">{activity.description}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">View All Activity</Button>
                </CardFooter>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Team Members</CardTitle>
                  <CardDescription>Staff currently online</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">{member.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                            member.status === 'online' ? 'bg-green-500' : 
                            member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{member.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl font-semibold">Revenue Trends</CardTitle>
                    <CardDescription>Financial performance over time</CardDescription>
                  </div>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="quarter">Quarter</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-[300px] w-full bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 rounded-lg flex items-end justify-between p-4">
                    {revenueTrends[timeRange as keyof typeof revenueTrends].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-teal-500 dark:bg-teal-600 rounded-t-sm w-12" 
                          style={{ 
                            height: `${(value / Math.max(...revenueTrends[timeRange as keyof typeof revenueTrends])) * 250}px` 
                          }}
                        ></div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                          {timeRange === 'week' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] :
                           timeRange === 'month' ? `W${index + 1}` :
                           timeRange === 'quarter' ? `Q${index + 1}` : `Q${index + 1}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Key Performance Indicators</CardTitle>
                  <CardDescription>Critical metrics overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Completion Rate</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{completionRate}%</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Placement Rate</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{placementRate}%</span>
                      </div>
                      <Progress value={placementRate} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Loan Default Rate</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{defaultRate}%</span>
                      </div>
                      <Progress value={defaultRate * 10} className="h-2 bg-gray-200 dark:bg-gray-700">
                        <div className="h-full bg-yellow-500 rounded-full"></div>
                      </Progress>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Student Satisfaction</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4.7/5.0</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Course Performance</CardTitle>
                  <CardDescription>Enrollment and completion metrics by course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Course</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Enrollments</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Completion Rate</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Satisfaction</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coursePerformance.map((course) => (
                          <tr key={course.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                            <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">{course.name}</td>
                            <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">{course.enrollments}</td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  course.completionRate >= 85 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                  course.completionRate >= 75 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                                                    {course.completionRate}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center">
                                <span className="text-yellow-600 dark:text-yellow-400">★</span>
                                <span className="ml-1 text-gray-700 dark:text-gray-300">{course.satisfaction}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end">
                                <span className="text-green-600 dark:text-green-400 flex items-center">
                                  <ArrowUpRight className="h-3 w-3 mr-1" /> +5.2%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tasks & Alerts Tab */}
          <TabsContent value="tasks">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white dark:bg-gray-800 shadow-lg mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold">Task List</CardTitle>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                      </Button>
                    </div>
                    <CardDescription>Manage your administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {taskList.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                          <div className="flex items-start space-x-3">
                            <div className={`w-3 h-3 mt-1.5 rounded-full ${getStatusColor(task.status)}`}></div>
                            <div>
                              <h4 className="font-medium text-gray-800 dark:text-gray-200">{task.task}</h4>
                              <div className="flex items-center mt-1 space-x-2">
                                <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'outline'}>
                                  {task.priority}
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Due: {task.dueDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {task.status !== 'Completed' && (
                              <Button variant="ghost" size="sm" className="text-green-600 dark:text-green-400">
                                <CheckCircle className="h-4 w-4 mr-1" /> Mark Complete
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Tasks
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Upcoming Deadlines</CardTitle>
                    <CardDescription>Critical dates and deadlines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-full mr-4">
                          <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-gray-200">Loan Application Review Deadline</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">25 applications need review before Friday, 5:00 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full mr-4">
                          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-gray-200">Course Catalog Update</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">New courses need to be added by Monday for the new semester</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                        <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-full mr-4">
                          <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-gray-200">Quarterly Financial Report</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Report needs to be submitted to the board by next Wednesday</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-white dark:bg-gray-800 shadow-lg mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Alerts & Notifications</CardTitle>
                    <CardDescription>Important system alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="flex items-start p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                          <div className="mr-3">
                            {getAlertIcon(alert.type)}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 dark:text-gray-200">{alert.message}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Alerts
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
                    <CardDescription>Frequently used admin tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/admin/loan-management">
                        <Button variant="outline" className="w-full h-full py-6 flex flex-col items-center justify-center">
                          <CreditCard className="h-6 w-6 mb-2 text-purple-600 dark:text-purple-400" />
                          <span>Loan Management</span>
                        </Button>
                      </Link>
                      
                      <Link href="/admin/course-management">
                        <Button variant="outline" className="w-full h-full py-6 flex flex-col items-center justify-center">
                          <BookOpen className="h-6 w-6 mb-2 text-blue-600 dark:text-blue-400" />
                          <span>Course Management</span>
                        </Button>
                      </Link>
                      
                      <Link href="/admin/user-management">
                        <Button variant="outline" className="w-full h-full py-6 flex flex-col items-center justify-center">
                          <Users className="h-6 w-6 mb-2 text-green-600 dark:text-green-400" />
                          <span>User Management</span>
                        </Button>
                      </Link>
                      
                      <Link href="/admin/reports">
                        <Button variant="outline" className="w-full h-full py-6 flex flex-col items-center justify-center">
                          <BarChart className="h-6 w-6 mb-2 text-yellow-600 dark:text-yellow-400" />
                          <span>Reports</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
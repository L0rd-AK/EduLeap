'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye } from 'lucide-react'; // Import Eye icon
import React, { useState } from 'react';

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  loanStatus: string;
  graduationQueue: boolean;
}

const students: Student[] = [
  { id: 1, name: "Alice Smith", email: "alice@example.com", course: "Web Development", loanStatus: "Approved", graduationQueue: true },
  { id: 2, name: "Bob Johnson", email: "bob@example.com", course: "CNA", loanStatus: "Pending", graduationQueue: false },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", course: "Electrician Training", loanStatus: "Approved", graduationQueue: true },
  { id: 4, name: "Diana Prince", email: "diana@example.com", course: "Data Science", loanStatus: "Rejected", graduationQueue: false },
  // Add more placeholder students
];

export default function StudentManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [loanStatusFilter, setLoanStatusFilter] = useState('All');
  const [graduationQueueFilter, setGraduationQueueFilter] = useState('All');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (courseFilter === 'All' || student.course === courseFilter) &&
    (loanStatusFilter === 'All' || student.loanStatus === loanStatusFilter) &&
    (graduationQueueFilter === 'All' || student.graduationQueue === (graduationQueueFilter === 'In Queue'))
  );

  // Placeholder for viewing individual student profile
  const viewStudentProfile = (studentId: number) => {
    console.log(`Viewing profile for student ${studentId}`);
    // Implement navigation or display of individual student profile details
  };

   // Function to determine badge variant based on status
  const getStatusVariant = (status: string) => {
      switch (status) {
          case 'Approved':
              return 'default'; // Typically green or primary
          case 'Pending':
              return 'secondary'; // Typically gray or less prominent
          case 'Rejected':
              return 'destructive'; // Typically red
          default:
              return 'secondary';
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">Student Management</h1>

        <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Student List</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">View and manage student records.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Input
                placeholder="Search students by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
              <Select onValueChange={setCourseFilter} value={courseFilter}>
                <SelectTrigger className="w-full md:w-[180px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <SelectValue placeholder="Filter by Course" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <SelectItem value="All">All Courses</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="CNA">CNA</SelectItem>
                  <SelectItem value="Electrician Training">Electrician Training</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setLoanStatusFilter} value={loanStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <SelectValue placeholder="Filter by Loan Status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
               <Select onValueChange={setGraduationQueueFilter} value={graduationQueueFilter}>
                <SelectTrigger className="w-full md:w-[180px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <SelectValue placeholder="Filter by Graduation Queue" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="In Queue">In Graduation Queue</SelectItem>
                  <SelectItem value="Not In Queue">Not in Graduation Queue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead className="text-gray-700 dark:text-gray-200">Name</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Email</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Course</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Loan Status</TableHead>
                     <TableHead className="text-gray-700 dark:text-gray-200">Graduation Queue</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="border-b dark:border-gray-700">
                      <TableCell className="font-medium text-gray-900 dark:text-white">{student.name}</TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">{student.email}</TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">{student.course}</TableCell>
                      <TableCell><Badge variant={getStatusVariant(student.loanStatus)}>{student.loanStatus}</Badge></TableCell>
                       <TableCell className="text-gray-800 dark:text-gray-200">{student.graduationQueue ? 'In Queue' : 'Not in Queue'}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => viewStudentProfile(student.id)} className="flex items-center gap-1 text-blue-600 border-blue-500 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700">
                          <Eye className="h-4 w-4" /> View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

         {/* Placeholder for Individual Student Profile Details */}
        <Card className="mt-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Student Profile Details</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Select a student from the list to view their profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Placeholder for selected student&apos;s details (progress, certifications, loan history, manual override options).</p>
          </CardContent>
        </Card>

        {/* Placeholder for Graduation Queue Table */}
         <Card className="mt-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Graduation Queue</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Students currently in the queue for graduation.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-gray-600 dark:text-gray-400">Placeholder for table listing students in the graduation queue.</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

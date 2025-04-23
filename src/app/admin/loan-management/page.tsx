'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, CheckCircle2, XCircle, DollarSign, CalendarDays } from 'lucide-react'; // Import icons
import React, { useState } from 'react';

interface LoanApplication {
  id: number;
  studentName: string;
  course: string;
  amount: number;
  status: string; // e.g., Pending, Approved, Rejected
  applicationDate: string;
}

interface RepaymentRecord {
    id: number;
    loanId: number;
    studentName: string;
    dueDate: string;
    amountDue: number;
    status: string; // e.g., Paid, Pending, Defaulted
}

const loanApplications: LoanApplication[] = [
  { id: 1, studentName: "Alice Smith", course: "Web Development", amount: 3600, status: "Pending", applicationDate: "2023-10-26" },
  { id: 2, studentName: "Bob Johnson", course: "CNA", amount: 2400, status: "Approved", applicationDate: "2023-10-20" },
  { id: 3, studentName: "Charlie Brown", course: "Electrician Training", amount: 7500, status: "Rejected", applicationDate: "2023-10-18" },
  // Add more placeholder applications
];

const repaymentRecords: RepaymentRecord[] = [
    { id: 1, loanId: 2, studentName: "Bob Johnson", dueDate: "2023-11-20", amountDue: 200, status: "Pending" },
    { id: 2, loanId: 2, studentName: "Bob Johnson", dueDate: "2023-10-20", amountDue: 200, status: "Paid" },
     { id: 3, loanId: 1, studentName: "Alice Smith", dueDate: "2023-11-25", amountDue: 300, status: "Pending" },
      { id: 4, loanId: 3, studentName: "Charlie Brown", dueDate: "2023-11-01", amountDue: 500, status: "Defaulted" },
    // Add more placeholder repayment records
];

export default function LoanManagementPage() {
  const [applicationFilter, setApplicationFilter] = useState('All');
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);

  const filteredApplications = loanApplications.filter(app =>
    applicationFilter === 'All' || app.status === applicationFilter
  );

  const handleViewDetails = (application: LoanApplication) => {
    setSelectedApplication(application);
  };

  const handleApproveReject = (status: string) => {
      if(selectedApplication) {
          console.log(`Setting status for application ${selectedApplication.id} to ${status}`);
          // Implement logic to update the loan application status
          setSelectedApplication(null); // Close details after action
      }
  }

   // Function to determine badge variant based on status
  const getApplicationStatusVariant = (status: string) => {
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

   const getRepaymentStatusVariant = (status: string) => {
      switch (status) {
          case 'Paid':
              return 'default'; // Typically green or primary
          case 'Pending':
              return 'secondary'; // Typically gray or less prominent
          case 'Defaulted':
              return 'destructive'; // Typically red
          default:
              return 'secondary';
      }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">Loan Management</h1>

        <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Loan Applications</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Review and manage student loan applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
               <Select onValueChange={setApplicationFilter} value={applicationFilter}>
                <SelectTrigger className="w-full md:w-[180px] border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead className="text-gray-700 dark:text-gray-200">Student Name</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Course</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Amount</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Status</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Application Date</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id} className="border-b dark:border-gray-700">
                      <TableCell className="font-medium text-gray-900 dark:text-white">{app.studentName}</TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">{app.course}</TableCell>
                      <TableCell className="text-green-600 dark:text-green-400">${app.amount}</TableCell>
                      <TableCell><Badge variant={getApplicationStatusVariant(app.status)}>{app.status}</Badge></TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">{app.applicationDate}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(app)} className="flex items-center gap-1 text-blue-600 border-blue-500 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700">
                          <Eye className="h-4 w-4" /> View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Eligibility Verification Panel and Application Details */}
        {selectedApplication && (
            <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Application Details for {selectedApplication.studentName}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">Review application and verify eligibility.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p className="text-gray-700 dark:text-gray-300"><strong className="font-semibold">Course:</strong> {selectedApplication.course}</p>
                        <p className="text-gray-700 dark:text-gray-300"><strong className="font-semibold">Requested Amount:</strong> <span className="text-green-600 dark:text-green-400">${selectedApplication.amount}</span></p>
                         <p className="text-gray-700 dark:text-gray-300"><strong className="font-semibold">Application Date:</strong> {selectedApplication.applicationDate}</p>
                        <p className="text-gray-700 dark:text-gray-300"><strong className="font-semibold">Status:</strong> <Badge variant={getApplicationStatusVariant(selectedApplication.status)}>{selectedApplication.status}</Badge></p>
                    </div>
                     {/* Placeholder for automated checks and manual review notes */}
                     <div className="grid gap-2">
                          <Label htmlFor="review-notes" className="text-gray-700 dark:text-gray-300">Eligibility Check Notes</Label>
                          <Textarea id="review-notes" placeholder="Add manual review notes here" rows={4} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-orange-500 focus:border-orange-500" />
                     </div>
                      <div className="flex gap-4 mt-2">
                          <Button onClick={() => handleApproveReject('Approved')} className="bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" /> Approve
                          </Button>
                          <Button variant="destructive" onClick={() => handleApproveReject('Rejected')} className="font-semibold flex items-center gap-1">
                              <XCircle className="h-4 w-4" /> Reject
                          </Button>
                      </div>
                </CardContent>
            </Card>
        )}

        {/* Repayment Tracking Table */}
        <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Repayment Tracking</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Monitor loan repayment schedules and statuses.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="overflow-x-auto">
               <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead className="text-gray-700 dark:text-gray-200">Student Name</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Loan ID</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Due Date</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Amount Due</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Status</TableHead>
                     <TableHead className="text-gray-700 dark:text-gray-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {repaymentRecords.map((record) => (
                    <TableRow key={record.id} className="border-b dark:border-gray-700">
                      <TableCell className="font-medium text-gray-900 dark:text-white">{record.studentName}</TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">{record.loanId}</TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200 flex items-center gap-1"><CalendarDays className="h-4 w-4 text-blue-500" />{record.dueDate}</TableCell>
                      <TableCell className="text-red-600 dark:text-red-400">${record.amountDue}</TableCell>
                      <TableCell><Badge variant={getRepaymentStatusVariant(record.status)}>{record.status}</Badge></TableCell>
                      <TableCell>
                         {/* Placeholder for actions like mark as paid, send reminder */}
                         <Button variant="outline" size="sm" className="text-blue-600 border-blue-500 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Integration Status with Payment Gateways (Placeholder) */}
         <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Payment Gateway Integration Status</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Status of third-party payment gateway connections.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-gray-600 dark:text-gray-400">Placeholder for integration status information (e.g., connected, disconnected, errors).</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

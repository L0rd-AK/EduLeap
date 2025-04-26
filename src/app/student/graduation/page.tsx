'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Calendar, CheckCircle, Clock, Award, Download, Share2 } from 'lucide-react';

// Placeholder data - in a real app, this would come from your backend
const graduationStatus = {
  eligible: true,
  inQueue: true,
  queuePosition: 15,
  estimatedGraduationDate: "June 15, 2024",
  completedRequirements: 8,
  totalRequirements: 10,
  capStatus: "50/100 slots filled for this quarter"
};

const requirements = [
  { id: 1, name: "Complete all course modules", completed: true },
  { id: 2, name: "Pass final assessment with 80% or higher", completed: true },
  { id: 3, name: "Submit capstone project", completed: true },
  { id: 4, name: "Complete career readiness workshop", completed: true },
  { id: 5, name: "Update professional profile", completed: true },
  { id: 6, name: "Complete exit interview", completed: false },
  { id: 7, name: "Clear all financial obligations", completed: true },
  { id: 8, name: "Submit graduation application", completed: true },
  { id: 9, name: "Complete graduate survey", completed: false },
  { id: 10, name: "Verify contact information", completed: true },
];

const upcomingMilestones = [
  { id: 1, name: "Exit Interview", date: "May 10, 2024", description: "30-minute interview with program advisor" },
  { id: 2, name: "Graduate Survey Deadline", date: "May 15, 2024", description: "Required for graduation processing" },
  { id: 3, name: "Graduation Ceremony", date: "June 20, 2024", description: "Optional in-person ceremony" },
];

export default function StudentGraduationPage() {
  const [activeTab, setActiveTab] = useState("status");
  
  // Calculate progress percentage
  const progressPercentage = (graduationStatus.completedRequirements / graduationStatus.totalRequirements) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Graduation Status</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Track your progress toward graduation</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="mr-2">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Requirements
            </Button>
          </div>
        </div>

        <Tabs defaultValue="status" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="status">Graduation Status</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>

          {/* Status Tab */}
          <TabsContent value="status">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Graduation Eligibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center flex-col">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
                      <GraduationCap className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                    </div>
                    <Badge variant={graduationStatus.eligible ? "default" : "secondary"} className="mb-2">
                      {graduationStatus.eligible ? "Eligible" : "Not Yet Eligible"}
                    </Badge>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      {graduationStatus.eligible 
                        ? "You have met the basic requirements for graduation!" 
                        : "Complete all requirements to become eligible"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Graduation Queue Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center flex-col">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                      <Clock className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    {graduationStatus.inQueue ? (
                      <>
                        <Badge variant="secondary" className="mb-2">Position: {graduationStatus.queuePosition}</Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                          Estimated graduation date: {graduationStatus.estimatedGraduationDate}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-center">
                          {graduationStatus.capStatus}
                        </p>
                      </>
                    ) : (
                      <>
                        <Badge variant="outline" className="mb-2">Not In Queue</Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                          Complete all requirements to join the graduation queue
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Requirements Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center flex-col">
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-4">
                      <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {graduationStatus.completedRequirements}/{graduationStatus.totalRequirements}
                    </div>
                    <Progress value={progressPercentage} className="h-2 w-full mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {progressPercentage === 100 
                        ? "All requirements completed!" 
                        : `${Math.round(progressPercentage)}% of requirements completed`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="grid gap-1">
                  <CardTitle className="text-xl">Graduation Certificate Preview</CardTitle>
                  <CardDescription>Your certificate will be available after graduation</CardDescription>
                </div>
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center">
                  <div className="border-4 border-double border-gray-300 dark:border-gray-500 p-8 rounded-lg">
                    <h3 className="text-2xl font-serif text-gray-800 dark:text-gray-200 mb-4">Certificate of Completion</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">This certifies that</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">[Your Name]</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">has successfully completed all requirements for</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">[Program Name]</p>
                    <p className="text-gray-600 dark:text-gray-400">Awarded on [Graduation Date]</p>
                  </div>
                  <div className="mt-4 flex justify-center space-x-4">
                    <Button variant="outline" disabled className="border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button variant="outline" disabled className="border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400">
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements">
            <Card>
              <CardHeader>
                <CardTitle>Graduation Requirements</CardTitle>
                <CardDescription>Complete all requirements to be eligible for graduation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requirements.map((req) => (
                    <div key={req.id} className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        req.completed 
                          ? "bg-green-100 dark:bg-green-900/30" 
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}>
                        <CheckCircle className={`h-5 w-5 ${
                          req.completed 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-gray-400 dark:text-gray-600"
                        }`} />
                      </div>
                      <div className="ml-4 flex-grow">
                        <p className={`font-medium ${
                          req.completed 
                            ? "text-gray-800 dark:text-gray-200" 
                            : "text-gray-600 dark:text-gray-400"
                        }`}>
                          {req.name}
                        </p>
                      </div>
                      <Badge variant={req.completed ? "default" : "secondary"}>
                        {req.completed ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Graduation Milestones</CardTitle>
                <CardDescription>Important dates and events related to your graduation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-shrink-0 flex items-center mb-4 md:mb-0">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                          <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{milestone.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.date}</p>
                        </div>
                      </div>
                      <div className="md:ml-auto flex-grow md:flex-grow-0 md:text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
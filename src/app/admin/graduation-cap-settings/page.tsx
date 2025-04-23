'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, ListOrdered, BellRing } from 'lucide-react'; // Import icons
import React, { useState } from 'react';

// Placeholder course data
const courses = [
  { value: 'web-dev', label: 'Introduction to Web Development' },
  { value: 'cna', label: 'Certified Nursing Assistant (CNA)' },
  { value: 'electrician', label: 'Electrician Training Program' },
  { value: 'data-science', label: 'Data Science Fundamentals' },
];

export default function GraduationCapSettingsPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [quarterlyCap, setQuarterlyCap] = useState<string | ''>('');

  const handleCapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setQuarterlyCap(value);
    }
  };

  const handleSaveSettings = () => {
    console.log('Saving graduation cap settings:', {
      selectedCourse,
      quarterlyCap,
    });
    // Implement logic to save settings
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">Graduation Cap Settings</h1>

        <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Configure Quarterly Caps</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Set limits on the number of graduates per quarter for each program.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="course-select" className="text-gray-700 dark:text-gray-300">Select Course/Program</Label>
              <Select onValueChange={setSelectedCourse} value={selectedCourse}>
                <SelectTrigger id="course-select" className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-purple-500 focus:border-purple-500">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  {courses.map(course => (
                    <SelectItem key={course.value} value={course.value}>
                      {course.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quarterly-cap" className="text-gray-700 dark:text-gray-300">Quarterly Graduation Cap</Label>
              <Input
                id="quarterly-cap"
                type="number"
                placeholder="Enter cap limit"
                value={quarterlyCap}
                onChange={handleCapChange}
                className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <Button onClick={handleSaveSettings} disabled={!selectedCourse || quarterlyCap === ''} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2">Save Settings</Button>
          </CardContent>
        </Card>

        {/* Visual Queue Manager (Placeholder) */}
        <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="grid gap-1">
                 <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Graduation Queue Manager</CardTitle>
                 <CardDescription className="text-gray-600 dark:text-gray-400">Visualize students waiting for graduation slots.</CardDescription>
            </div>
             <ListOrdered className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Placeholder for a visual representation or table listing students in the graduation queue.</p>
          </CardContent>
        </Card>

        {/* Notifications History (Placeholder) */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <div className="grid gap-1">
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Notifications History</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Review past notifications about waitlist status.</CardDescription>
             </div>
              <BellRing className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Placeholder for a list or log of notifications sent to students regarding the graduation queue.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

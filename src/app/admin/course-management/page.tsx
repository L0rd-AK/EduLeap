'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, BookOpen } from 'lucide-react'; // Import icons
import React, { useState } from 'react';

interface Course {
  id: number;
  title: string;
  category: string;
  fee: number;
  description: string;
  modules: string;
  published: boolean;
  milestones: string[];
}

// Placeholder course data
const courses: Course[] = [
  { id: 1, title: "Web Development", category: "IT", fee: 1200, description: "Learn web development", modules: "Module 1, Module 2", published: true, milestones: ["Module 1 Complete"] },
  { id: 2, title: "CNA", category: "Healthcare", fee: 800, description: "Become a CNA", modules: "Module A, Module B", published: false, milestones: ["Module A Passed"] },
];

export default function CourseManagementPage() {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: '',
    fee: 0,
    description: '',
    modules: '',
    published: false,
    milestones: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (editingCourse) {
      setEditingCourse({ ...editingCourse, [id]: value });
    } else {
      setNewCourse({ ...newCourse, [id]: value });
    }
  };

   const handleSelectChange = (id: string, value: string) => {
     if (editingCourse) {
      setEditingCourse({ ...editingCourse, [id]: value });
    } else {
      setNewCourse({ ...newCourse, [id]: value });
    }
   }

    const handleSwitchChange = (id: string, checked: boolean) => {
     if (editingCourse) {
      setEditingCourse({ ...editingCourse, [id]: checked });
    } else {
      setNewCourse({ ...newCourse, [id]: checked });
    }
   }

  const handleAddMilestone = () => {
    if (editingCourse) {
      setEditingCourse({ ...editingCourse, milestones: [...editingCourse.milestones, ''] });
    } else {
      setNewCourse({ ...newCourse, milestones: [...newCourse.milestones, ''] });
    }
  };

  const handleMilestoneChange = (index: number, value: string) => {
    if (editingCourse) {
      const updatedMilestones = [...editingCourse.milestones];
      updatedMilestones[index] = value;
      setEditingCourse({ ...editingCourse, milestones: updatedMilestones });
    } else {
      const updatedMilestones = [...newCourse.milestones];
      updatedMilestones[index] = value;
      setNewCourse({ ...newCourse, milestones: updatedMilestones });
    }
  };

  const handleSaveCourse = () => {
    if (editingCourse) {
      console.log('Saving course:', editingCourse);
      // Implement update logic
      setEditingCourse(null);
    } else {
      console.log('Creating new course:', newCourse);
      // Implement create logic
      setNewCourse({
        title: '',
        category: '',
        fee: 0,
        description: '',
        modules: '',
        published: false,
        milestones: [],
      });
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
  };

  const handleDeleteCourse = (courseId: number) => {
    console.log(`Deleting course ${courseId}`);
    // Implement delete logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">Course Management</h1>

        <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">{editingCourse ? 'Edit Course' : 'Create New Course'}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Define and manage vocational courses.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Title</Label>
              <Input id="title" value={editingCourse ? editingCourse.title : newCourse.title} onChange={handleInputChange} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">Category</Label>
               <Select onValueChange={(value) => handleSelectChange('category', value)} value={editingCourse ? editingCourse.category : newCourse.category}>
                <SelectTrigger id="category" className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Trades">Trades</SelectItem>
                   {/* Add more categories as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fee" className="text-gray-700 dark:text-gray-300">Fee</Label>
              <Input id="fee" type="number" value={editingCourse ? editingCourse.fee : newCourse.fee} onChange={handleInputChange} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Description</Label>
              <Textarea id="description" value={editingCourse ? editingCourse.description : newCourse.description} onChange={handleInputChange} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="modules" className="text-gray-700 dark:text-gray-300">Modules</Label>
              <Input id="modules" placeholder="Comma-separated module names" value={editingCourse ? editingCourse.modules : newCourse.modules} onChange={handleInputChange} className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            {/* Milestone Configuration Tool */}
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Certification Milestones</h3>
              {(editingCourse ? editingCourse.milestones : newCourse.milestones).map((milestone, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="Milestone description"
                    value={milestone}
                    onChange={(e) => handleMilestoneChange(index, e.target.value)}
                     className="flex-grow border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                  />
                   {/* Add button to remove milestone */}
                </div>
              ))}
              <Button variant="outline" onClick={handleAddMilestone} className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700">Add Milestone</Button>
            </div>
             {/* Certificate Template Editor (Placeholder) */}
              <div className="grid gap-2">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Certificate Template</h3>
                   <p className="text-gray-600 dark:text-gray-400">Placeholder for certificate template editor (e.g., rich text editor or file upload).</p>
                   {/* Rich text editor or file upload for template */}
              </div>
            <div className="flex items-center space-x-2">
              <Switch id="published" checked={editingCourse ? editingCourse.published : newCourse.published} onCheckedChange={(checked) => handleSwitchChange('published', checked)} className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500" />
              <Label htmlFor="published" className="text-gray-700 dark:text-gray-300">Published</Label>
            </div>
            <Button onClick={handleSaveCourse} disabled={!newCourse.title && !editingCourse?.title} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2">{editingCourse ? 'Save Changes' : 'Create Course'}</Button>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Existing Courses</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">List of all vocational courses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
               <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead className="text-gray-700 dark:text-gray-200">Title</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Category</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Fee</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Published</TableHead>
                     <TableHead className="text-gray-700 dark:text-gray-200">Milestones</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id} className="border-b dark:border-gray-700">
                      <TableCell className="font-medium text-gray-900 dark:text-white flex items-center gap-2"><BookOpen className="h-4 w-4 text-blue-500" />{course.title}</TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">{course.category}</TableCell>
                      <TableCell className="text-green-600 dark:text-green-400">${course.fee}</TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">{course.published ? 'Yes' : 'No'}</TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200">{course.milestones.join(', ')}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditCourse(course)} className="flex items-center gap-1 text-purple-600 border-purple-500 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-gray-700">
                          <Edit className="h-4 w-4" /> Edit
                        </Button>
                         <Button variant="destructive" size="sm" onClick={() => handleDeleteCourse(course.id)} className="flex items-center gap-1">
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

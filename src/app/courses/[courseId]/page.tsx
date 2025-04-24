"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  fee: number;
  modules: string;
  published: boolean;
  milestones: string[];
}

// Placeholder course data - replace with actual data fetching
const courses: Course[] = [
  {
    id: 1,
    title: "Web Development",
    category: "IT",
    fee: 1200,
    description: "Learn web development",
    modules: "Module 1, Module 2",
    published: true,
    milestones: ["Module 1 Complete"],
  },
  {
    id: 2,
    title: "CNA",
    category: "Healthcare",
    fee: 800,
    description: "Become a CNA",
    modules: "Module A, Module B",
    published: false,
    milestones: ["Module A Passed"],
  },
];

async function getCourse(id: string | number) {
  // Simulate fetching course data from a database
  return courses.find((course) => course.id === Number(id));
}

export default async function CourseDetailsPage({ params }: { params: { courseId: string } }) {
  const course = await getCourse(params.courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{course.title}</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            {course.category} - Fee: ${course.fee}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Modules</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{course.modules}</p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Milestones</h3>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
            {course.milestones.map((milestone, index) => (
              <li key={index}>{milestone}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

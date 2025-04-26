"use client"

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BookOpen, Clock, DollarSign, Award, CheckCircle, Calendar, Users } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  fees: number;
  description: string;
  skills: string[];
  enrollmentStatus: string;
  instructor: string;
  startDate: string;
  modules: {
    title: string;
    description: string;
    duration: string;
  }[];
  milestones: string[];
  studentsEnrolled: number;
}

// This would typically come from an API call
const getCourse = async (id: string): Promise<Course | undefined> => {
  // Simulating API call with sample data
  const courses: Course[] = [
    {
      id: 1,
      title: "Introduction to Web Development",
      category: "IT",
      duration: "12 weeks",
      fees: 1200,
      description: "This comprehensive course covers all aspects of modern web development, from HTML and CSS fundamentals to advanced JavaScript frameworks. Students will build multiple real-world projects and develop a professional portfolio.",
      skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
      enrollmentStatus: "Open",
      instructor: "Dr. Sarah Johnson",
      startDate: "2024-09-01",
      modules: [
        {
          title: "HTML & CSS Fundamentals",
          description: "Learn the building blocks of web pages and styling",
          duration: "3 weeks"
        },
        {
          title: "JavaScript Essentials",
          description: "Master programming concepts and DOM manipulation",
          duration: "4 weeks"
        },
        {
          title: "Frontend Frameworks",
          description: "Build applications with modern frameworks like React",
          duration: "5 weeks"
        }
      ],
      milestones: [
        "Build a responsive portfolio website",
        "Create an interactive web application",
        "Develop a full-stack project with API integration"
      ],
      studentsEnrolled: 128
    },
    {
      id: 2,
      title: "Certified Nursing Assistant (CNA)",
      category: "Healthcare",
      duration: "6 weeks",
      fees: 800,
      description: "Prepare for a rewarding career in healthcare with our comprehensive CNA training program. This course combines classroom instruction with hands-on clinical experience to develop essential patient care skills.",
      skills: ["Patient Care", "Medical Terminology", "Vital Signs", "Infection Control"],
      enrollmentStatus: "Open",
      instructor: "Prof. Michael Chen",
      startDate: "2024-08-15",
      modules: [
        {
          title: "Basic Healthcare Concepts",
          description: "Introduction to healthcare principles and patient rights",
          duration: "1 week"
        },
        {
          title: "Clinical Skills",
          description: "Hands-on training in essential nursing assistant skills",
          duration: "3 weeks"
        },
        {
          title: "Clinical Practicum",
          description: "Supervised experience in healthcare settings",
          duration: "2 weeks"
        }
      ],
      milestones: [
        "Pass the skills assessment exam",
        "Complete 40 hours of clinical practice",
        "Achieve certification readiness"
      ],
      studentsEnrolled: 64
    },
    {
      id: 3,
      title: "Electrician Training Program",
      category: "Trades",
      duration: "24 weeks",
      fees: 2500,
      description: "Become a skilled electrician through our comprehensive training program. Learn electrical theory, code requirements, and practical installation techniques for residential and commercial settings.",
      skills: ["Electrical Systems", "Wiring", "Circuit Design", "Safety Protocols"],
      enrollmentStatus: "Open",
      instructor: "Robert Martinez",
      startDate: "2024-10-01",
      modules: [
        {
          title: "Electrical Theory",
          description: "Understanding electricity, circuits, and components",
          duration: "6 weeks"
        },
        {
          title: "Residential Wiring",
          description: "Installation techniques for homes and apartments",
          duration: "8 weeks"
        },
        {
          title: "Commercial Applications",
          description: "Advanced systems for business environments",
          duration: "10 weeks"
        }
      ],
      milestones: [
        "Complete basic circuit design project",
        "Pass residential wiring assessment",
        "Achieve journeyman-level skills evaluation"
      ],
      studentsEnrolled: 42
    }
  ];
  
  return courses.find(course => course.id === parseInt(id));
};

// Component that uses useSearchParams
function CourseDetailsContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (courseId) {
          const courseData = await getCourse(courseId);
          setCourse(courseData);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = () => {
    toast({
      title: "Enrollment Initiated",
      description: `You've started enrollment for ${course?.title}`,
    });
  };

  const handleApplyForLoan = () => {
    toast({
      title: "Loan Application Started",
      description: "You'll be redirected to the loan application page",
    });
    // In a real app, you would redirect to the loan application page
    // window.location.href = `/loan-application?courseId=${courseId}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Course Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link href="/course-catalog">
          <Button>Return to Course Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Link href="/course-catalog" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            ← Back to Course Catalog
          </Link>
        </div>

        {/* Course Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="secondary" className="bg-blue-700 dark:bg-blue-600 text-white">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 backdrop-blur-sm">
                    {course.enrollmentStatus}
                  </Badge>
                </div>
                <p className="text-lg opacity-90 max-w-3xl">{course.description}</p>
              </div>
              <div className="hidden md:block bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">${course.fees}</div>
                <div className="text-sm">Course Fee</div>
              </div>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Duration</div>
                <div>{course.duration}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Enrolled</div>
                <div>{course.studentsEnrolled} students</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Start Date</div>
                <div>{new Date(course.startDate).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Instructor</div>
                <div>{course.instructor}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="modules" className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <TabsList className="w-full border-b p-0 bg-transparent">
                <TabsTrigger value="modules" className="flex-1 rounded-none py-3">
                  Modules
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex-1 rounded-none py-3">
                  Skills
                </TabsTrigger>
                <TabsTrigger value="milestones" className="flex-1 rounded-none py-3">
                  Milestones
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="modules" className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Course Modules</h3>
                <div className="space-y-6">
                  {course.modules.map((module, index) => (
                    <Card key={index} className="border border-gray-200 dark:border-gray-700">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <Badge variant="outline">{module.duration}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400">{module.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Skills You'll Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1.5" />
                      {skill}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="milestones" className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Course Milestones</h3>
                <div className="space-y-4">
                  {course.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">{milestone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Enrollment Card */}
          <div>
            <Card className="sticky top-20 bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Enroll in this Course</CardTitle>
                <CardDescription>Start your journey to new skills and opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Course Fee</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">${course.fees}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Start Date</span>
                  <span className="text-gray-900 dark:text-white">{new Date(course.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="text-gray-900 dark:text-white">{course.duration}</span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Enrollment</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{course.studentsEnrolled}/150</span>
                  </div>
                  <Progress value={(course.studentsEnrolled / 150) * 100} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <Button className="w-full" onClick={handleEnroll}>
                  Enroll Now
                </Button>
                <Button variant="outline" className="w-full" onClick={handleApplyForLoan}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Apply for Loan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function CourseDetailsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <CourseDetailsContent />
    </Suspense>
  );
}
'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, DollarSign, GraduationCap, Award, BarChart2, Users } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Web Development Graduate",
      image: "/testimonials/sarah.jpg",
      quote: "EduLeap changed my life. I went from working a minimum wage job to becoming a full-stack developer in just 6 months. The loan program made it possible for me to focus on learning without financial stress."
    },
    {
      name: "Michael Chen",
      role: "Healthcare Professional",
      image: "/testimonials/michael.jpg",
      quote: "The CNA program at EduLeap was comprehensive and practical. The instructors were experienced professionals who prepared me well for the certification exam. I'm now working at a top hospital in my city."
    },
    {
      name: "Emily Rodriguez",
      role: "Data Science Student",
      image: "/testimonials/emily.jpg",
      quote: "The flexible learning schedule and personalized support have made my learning journey enjoyable. The platform's progress tracking tools keep me motivated and on track to complete my certification."
    }
  ];

  const stats = [
    { value: "95%", label: "Job Placement Rate", icon: <Users className="h-8 w-8 text-blue-500" /> },
    { value: "15,000+", label: "Students Enrolled", icon: <GraduationCap className="h-8 w-8 text-blue-500" /> },
    { value: "200+", label: "Courses Available", icon: <BookOpen className="h-8 w-8 text-blue-500" /> },
    { value: "$45K", label: "Avg. Salary Increase", icon: <DollarSign className="h-8 w-8 text-blue-500" /> }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section with Animation */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900 opacity-5 pattern-grid-lg"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 dark:text-blue-100 mb-6 leading-tight">
                Empowering <span className="text-blue-600 dark:text-blue-400">Future</span> Through Education
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-xl mb-8 max-w-2xl">
                Access vocational courses with financial support, track learning progress, and unlock your earning potential with our comprehensive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/course-catalog">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out w-full sm:w-auto">
                    Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800 font-semibold py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out w-full sm:w-auto">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 right-4 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 -left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  {/* Placeholder for hero image - replace with actual image in production */}
                  <div className="w-full h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center">
                    <GraduationCap className="h-24 w-24 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-blue-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 p-3 bg-white dark:bg-gray-600 rounded-full">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features with Icons */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">Why Choose EduLeap?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform is designed to provide comprehensive support throughout your educational journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 border-none">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-200 text-center">Financial Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Access micro-loans up to 3x course fees with flexible repayment options tailored to your financial situation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 border-none">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-200 text-center">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor your learning journey with detailed analytics and insights to help you stay on track and achieve your goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 border-none">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-200 text-center">Recognized Certifications</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Earn industry-recognized certifications that enhance your resume and open doors to better career opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Student Success Stories</h2>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  {/* Placeholder for testimonial image - replace with actual image in production */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                    <Users className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl italic mb-6">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div>
                    <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeTestimonial === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of students who have transformed their careers through our platform.
          </p>
          <Link href="/course-catalog">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg transition duration-300 ease-in-out">
              Explore Courses
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">EduLeap</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Empowering students through skills, loans, and guaranteed income.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/course-catalog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Courses</Link></li>
                <li><Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Login</Link></li>
                <li><Link href="/register" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Register</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/help-support" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Help & Support</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">FAQs</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduLeap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
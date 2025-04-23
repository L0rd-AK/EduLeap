import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50 dark:bg-gray-900 py-12">
      {/* Hero Section */}
      <section className="container mx-auto text-center mb-16 px-4">
        <h1 className="text-5xl font-extrabold text-blue-900 dark:text-blue-100 mb-6 leading-tight">
          Empowering students through <span className="text-blue-600 dark:text-blue-400">Skills, Loans,</span> and Guaranteed Income
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-xl mb-10 max-w-3xl mx-auto">
          Access vocational courses with financial support, track learning progress and unlock your earning potential with our comprehensive platform.
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="/course-catalog">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out">
              Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800 font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out">
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 px-4">
        <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-200">Access vocational courses with financial support.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Explore a wide range of high-demand vocational courses and get the financial assistance you need to enroll and succeed.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-200">Track learning progress and earning potential.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Visualize your educational journey and see your projected return on investment grow as you complete milestones.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-200">Micro-loans up to 3x course fees.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Apply for flexible micro-loans that can cover up to three times the course fees, removing financial barriers to education.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Testimonials (Placeholder) */}
      <section className="container mx-auto text-center mb-16 px-4">
        <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-6">
          Success Stories
        </h2>
        <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg p-8 italic text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 dark:border-blue-400">
          <p className="mb-4">
            &quot;EduLeap transformed my life. I was able to access quality education and secure a promising career thanks to their support and unique income-sharing model.&quot;
          </p>
          <p className="text-right font-semibold text-gray-800 dark:text-gray-200">- A Happy Graduate</p>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto text-center mt-auto py-8 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 px-4">
        <nav className="mb-4">
          <a href="#" className="hover:underline mx-3">Privacy Policy</a>
          <a href="#" className="hover:underline mx-3">Terms of Service</a>
          <a href="#" className="hover:underline mx-3">Contact Information</a>
        </nav>
        <p>© {new Date().getFullYear()} EduLeap. All rights reserved.</p>
      </footer>
    </div>
  );
}

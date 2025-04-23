'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { HelpCircle, Mail, BookOpen, Info } from 'lucide-react'; // Import icons
import React from 'react';

export default function HelpSupportPage() {
  // Placeholder FAQs
  const faqs = [
    { question: "How do I apply for a loan?", answer: "You can apply for a loan from the Course Catalog page by clicking the 'Apply for Loan' button on the course card." },
    { question: "How can I download my certificate?", answer: "Your earned certificates are available for download on the Certifications page in your student dashboard." },
    { question: "What is the graduation cap?", answer: "The graduation cap is a quarterly limit set by administrators on the number of students who can officially graduate from a program." },
    { question: "Where can I update my profile information?", answer: "You can update your personal details, password, and notification preferences on the Profile page."}
    // Add more FAQs
  ];

  // Placeholder System Status (can be dynamically fetched)
  const systemStatus = "All systems operational";
  const statusColor = systemStatus === "All systems operational" ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">Help & Support</h1>

        {/* FAQs Section */}
        <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="grid gap-1">
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Find answers to common questions.</CardDescription>
            </div>
            <HelpCircle className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          </CardHeader>
          <CardContent className="grid gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Chat / Contact Form (Placeholder) */}
        <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <div className="grid gap-1">
                <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Contact Us</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Get in touch with our support team.</CardDescription>
             </div>
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Placeholder for a live chat widget or a contact form.</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">Open Support Chat</Button>
             {/* Or a simple contact form here */}
          </CardContent>
        </Card>

        {/* Admin Resources */}
        <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <div className="grid gap-1">
              <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Admin Resources</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Access training manuals and guides.</CardDescription>
             </div>
              <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">For administrators, find helpful resources here.</p>
            <Button asChild variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-gray-700 font-semibold">
              <Link href="#">View Training Manuals (Placeholder)</Link>
            </Button>
          </CardContent>
        </Card>

        {/* System Status Indicator */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="grid gap-1">
                <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">System Status</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Check the current status of our services.</CardDescription>
              </div>
               <Info className={`h-8 w-8 ${statusColor}`} />
          </CardHeader>
          <CardContent>
            <p className={`text-lg font-semibold ${statusColor}`}>Status: {systemStatus}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

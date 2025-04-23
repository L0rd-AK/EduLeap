'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share2, Award } from 'lucide-react'; // Import Award icon
import Link from 'next/link';
import React from 'react';

interface Certificate {
  id: number;
  title: string;
  issueDate: string;
  verificationId: string;
  milestone: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Introduction to Web Development - Module 1",
    issueDate: "2023-04-15",
    verificationId: "CERT-WEB-001",
    milestone: "Completed Module 1: HTML & CSS",
  },
  {
    id: 2,
    title: "Certified Nursing Assistant - Module 2",
    issueDate: "2023-05-20",
    verificationId: "CERT-CNA-002",
    milestone: "Completed Module 2: Patient Care Fundamentals",
  },
  // Add more placeholder certificates as needed
];

export default function CertificationsPage() {
  const handleDownload = (certificateId: number) => {
    console.log(`Downloading certificate ${certificateId}`);
    // Implement download logic (e.g., generate PDF or trigger API download)
  };

  const handleShare = (certificateId: number) => {
    console.log(`Sharing certificate ${certificateId}`);
    // Implement social sharing logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-100 to-green-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">Your Certifications</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="grid gap-1">
                  <CardTitle className="text-xl font-bold text-purple-800 dark:text-purple-200">{certificate.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{certificate.milestone}</CardDescription>
                </div>
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" /> {/* Certification icon */}
              </CardHeader>
              <CardContent className="grid gap-3 text-gray-700 dark:text-gray-300 flex-grow">
                <p><strong className="font-semibold">Issued On:</strong> {certificate.issueDate}</p>
                <p><strong className="font-semibold">Verification ID:</strong> {certificate.verificationId}</p>
                {/* Placeholder for QR code */}
                <div className="w-28 h-28 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-md mx-auto mt-2">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">QR Code Placeholder</p>
                </div>
              </CardContent>
              <CardFooter className="pt-4 flex justify-center gap-4">
                <Button variant="outline" size="sm" onClick={() => handleDownload(certificate.id)} className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleShare(certificate.id)} className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}



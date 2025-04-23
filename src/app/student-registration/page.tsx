"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { KycIcon } from "@/components/icons";

// Placeholder for course data
const courses = [
  { value: 'web-dev', label: 'Introduction to Web Development' },
  { value: 'cna', label: 'Certified Nursing Assistant (CNA)' },
  { value: 'electrician', label: 'Electrician Training Program' },
  { value: 'data-science', label: 'Data Science Fundamentals' },
];

export default function StudentRegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [addressProof, setAddressProof] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Implement your registration logic here (e.g., API call).
    console.log("Registration details:", {
      name,
      email,
      phone,
      password,
      selectedCourse,
      idDocument: idDocument?.name,
      addressProof: addressProof?.name,
    });
    // After successful registration, redirect to the dashboard.
    // router.push("/student-dashboard"); // Assuming you're using Next.js router
  };

  const handleDocumentUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0] || null;
    setter(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 py-12 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">Student Registration</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Enter your details to create an account and start your journey.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Optional Course Selection */}
            <div className="grid gap-2">
              <Label htmlFor="course-select" className="text-gray-700 dark:text-gray-300">Select Course (Optional)</Label>
              <Select onValueChange={setSelectedCourse} value={selectedCourse}>
                <SelectTrigger id="course-select" className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-teal-500 focus:border-teal-500">
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

            {/* Document Upload Section */}
            <div className="grid gap-2">
              <Label htmlFor="id-document" className="flex items-center text-gray-700 dark:text-gray-300">
                <KycIcon className="mr-2 h-5 w-5 text-teal-600 dark:text-teal-400" />
                ID Document
              </Label>
              <Input
                id="id-document"
                type="file"
                onChange={(e) => handleDocumentUpload(e, setIdDocument)}
                className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 dark:file:bg-teal-800 dark:file:text-teal-100 dark:hover:file:bg-teal-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address-proof" className="flex items-center text-gray-700 dark:text-gray-300">
                <KycIcon className="mr-2 h-5 w-5 text-teal-600 dark:text-teal-400" />
                Address Proof
              </Label>
              <Input
                id="address-proof"
                type="file"
                onChange={(e) => handleDocumentUpload(e, setAddressProof)}
                 className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 dark:file:bg-teal-800 dark:file:text-teal-100 dark:hover:file:bg-teal-700"
              />
            </div>

            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

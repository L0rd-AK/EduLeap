'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  HelpCircle, 
  FileText, 
  Send, 
  Phone, 
  Mail, 
  Clock, 
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Placeholder FAQs
const faqs = [
  { 
    question: "How do I apply for a loan?", 
    answer: "You can apply for a loan from the Course Catalog page by clicking the 'Apply for Loan' button on the course card. You'll need to provide some basic financial information and may need to upload supporting documents." 
  },
  { 
    question: "How can I download my certificate?", 
    answer: "Your earned certificates are available for download on the Certifications page in your student dashboard. Look for the download button next to each certificate." 
  },
  { 
    question: "What is the graduation cap?", 
    answer: "The graduation cap is a quarterly limit set by administrators on the number of students who can officially graduate from a program. If the cap is reached, you'll be placed in a queue for the next available slot." 
  },
  { 
    question: "Where can I update my profile information?", 
    answer: "You can update your personal details, password, and notification preferences on the Profile page, accessible from the dropdown menu in the top-right corner of the navigation bar."
  },
  { 
    question: "How do I track my loan repayments?", 
    answer: "You can view your loan details, payment history, and upcoming payments on the My Loans page. The system will also send you email reminders before payments are due."
  },
  { 
    question: "What happens if I miss a loan payment?", 
    answer: "If you miss a payment, you'll receive a notification. Multiple missed payments may affect your ability to access certain features. Please contact support if you're having difficulty making payments."
  },
  { 
    question: "How do I request an extension for assignments?", 
    answer: "You can request extensions through your course page. Click on the assignment, then select 'Request Extension'. Your instructor will review your request."
  },
  { 
    question: "Can I switch to a different course?", 
    answer: "Course transfers are possible within the first two weeks of enrollment. Please submit a transfer request through the support system with your reasons for wanting to change."
  }
];

// Placeholder support resources
const resources = [
  { 
    title: "Student Handbook", 
    description: "Complete guide to policies and procedures", 
    icon: <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    link: "#"
  },
  { 
    title: "Video Tutorials", 
    description: "Step-by-step guides for using the platform", 
    icon: <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />,
    link: "#"
  },
  { 
    title: "Financial Aid Guide", 
    description: "Information about loans and repayment options", 
    icon: <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    link: "#"
  }
];

export default function StudentSupportPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contact");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the support ticket to your backend
    console.log("Submitting support ticket:", { subject, message });
    
    toast({
      title: "Support Ticket Submitted",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setSubject("");
    setMessage("");
  };
  
  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Student Support</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Get help with your courses, loans, and more</p>
          </div>
        </div>

        <Tabs defaultValue="contact" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Contact Support Tab */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Submit a Support Ticket
                    </CardTitle>
                    <CardDescription>
                      We'll respond to your inquiry as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder="Brief description of your issue"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Please provide details about your issue or question"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className="min-h-[150px] border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" /> Submit Ticket
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Contact Information
                    </CardTitle>
                    <CardDescription>
                      Alternative ways to reach our support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">Email Support</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">support@eduleap.com</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Typical response time: 24 hours
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">Phone Support</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">(555) 123-4567</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Monday-Friday, 9am-5pm EST
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">Support Hours</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Monday-Friday: 9am-8pm EST<br />
                          Saturday: 10am-4pm EST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      <button
                        className="flex justify-between items-center w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => toggleFaq(index)}
                      >
                        <span className="font-medium text-gray-800 dark:text-gray-200">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-semibold">{resource.title}</CardTitle>
                    {resource.icon}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>
                    <Button asChild variant="outline" className="w-full">
                      <a href={resource.link}>View Resource</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Course-Specific Resources
                  </CardTitle>
                  <CardDescription>
                    Access help materials for your enrolled courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    For help with specific course content, please visit your course pages. Each course includes dedicated resources, tutorials, and forums where you can ask questions.
                  </p>
                  <Button className="mr-4">
                    Go to My Courses
                  </Button>
                  <Button variant="outline">
                    Contact Course Instructor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
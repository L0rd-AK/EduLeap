'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, DollarSign, Calendar as CalendarIcon, 
  Download, FileText, AlertCircle, CheckCircle, 
  TrendingUp, Clock, ArrowRight, Info
} from "lucide-react";

// Placeholder data for active loans
const activeLoans = [
  {
    id: 1,
    type: "Tuition Loan",
    totalAmount: 15000,
    amountPaid: 4500,
    interestRate: 3.5,
    nextPayment: { amount: 250, dueDate: "2023-11-01" },
    startDate: "2022-09-01",
    endDate: "2026-09-01",
    status: "Current",
    paymentHistory: [
      { id: 301, date: "2023-10-01", amount: 250, status: "Paid" },
      { id: 302, date: "2023-09-01", amount: 250, status: "Paid" },
      { id: 303, date: "2023-08-01", amount: 250, status: "Paid" },
      { id: 304, date: "2023-07-01", amount: 250, status: "Paid" },
      { id: 305, date: "2023-06-01", amount: 250, status: "Paid" },
      { id: 306, date: "2023-05-01", amount: 250, status: "Paid" }
    ]
  },
  {
    id: 2,
    type: "Living Expenses Loan",
    totalAmount: 5000,
    amountPaid: 1000,
    interestRate: 4.0,
    nextPayment: { amount: 100, dueDate: "2023-11-05" },
    startDate: "2023-01-15",
    endDate: "2025-01-15",
    status: "Current",
    paymentHistory: [
      { id: 401, date: "2023-10-05", amount: 100, status: "Paid" },
      { id: 402, date: "2023-09-05", amount: 100, status: "Paid" },
      { id: 403, date: "2023-08-05", amount: 100, status: "Paid" },
      { id: 404, date: "2023-07-05", amount: 100, status: "Paid" }
    ]
  }
];

// Placeholder data for loan applications
const loanApplications = [
  {
    id: 101,
    type: "Books and Materials Loan",
    amount: 1200,
    submissionDate: "2023-10-05",
    status: "Under Review",
    estimatedDecisionDate: "2023-10-20"
  }
];

// Placeholder data for repayment plans
const repaymentPlans = [
  {
    id: 201,
    name: "Standard Repayment",
    description: "Fixed monthly payments over a 10-year term.",
    monthlyPayment: 350,
    totalInterest: 3500,
    totalPayment: 18500,
    term: "10 years"
  },
  {
    id: 202,
    name: "Income-Based Repayment",
    description: "Payments based on your income, adjusted annually.",
    monthlyPayment: 200,
    totalInterest: 4800,
    totalPayment: 19800,
    term: "15 years"
  },
  {
    id: 203,
    name: "Graduated Repayment",
    description: "Payments start low and increase every two years.",
    monthlyPayment: "150-450",
    totalInterest: 4200,
    totalPayment: 19200,
    term: "12 years"
  }
];

export default function StudentLoansPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [paymentAmount, setPaymentAmount] = useState("");

  // Calculate total loan amount and total paid
  const totalLoanAmount = activeLoans.reduce((sum, loan) => sum + loan.totalAmount, 0);
  const totalAmountPaid = activeLoans.reduce((sum, loan) => sum + loan.amountPaid, 0);
  const totalRemaining = totalLoanAmount - totalAmountPaid;
  const overallProgress = (totalAmountPaid / totalLoanAmount) * 100;

  // Get next upcoming payment
  const nextPayments = activeLoans
    .map(loan => ({
      loanId: loan.id,
      loanType: loan.type,
      ...loan.nextPayment
    }))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const nextPayment = nextPayments.length > 0 ? nextPayments[0] : null;

  // Handle payment submission
  const handlePayment = () => {
    // In a real app, this would process the payment
    alert(`Payment of $${paymentAmount} submitted successfully!`);
    setPaymentAmount("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Loans</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your educational financing</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <FileText className="mr-2 h-4 w-4" /> Download Statement
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
            <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
            <TabsTrigger value="active-loans" className="rounded-md">Active Loans</TabsTrigger>
            <TabsTrigger value="applications" className="rounded-md">Applications</TabsTrigger>
            <TabsTrigger value="repayment" className="rounded-md">Repayment Plans</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Total Loan Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                      <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">${totalRemaining.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Total borrowed: ${totalLoanAmount.toLocaleString()}
                    </p>
                    <div className="w-full mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Repayment Progress</span>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {Math.round(overallProgress)}%
                        </span>
                      </div>
                      <Progress value={overallProgress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Next Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  {nextPayment ? (
                    <div className="flex flex-col items-center">
                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4">
                        <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-3xl font-bold text-gray-800 dark:text-white">${nextPayment.amount}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Due on {new Date(nextPayment.dueDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      For {nextPayment.loanType}
                      </p>
                      <Button className="mt-4 w-full" onClick={() => {
                        setPaymentAmount(nextPayment.amount.toString());
                        setActiveTab("active-loans");
                      }}>
                        Make Payment
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-xl font-medium text-gray-800 dark:text-white">No payments due</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center">
                        You're all caught up with your payments
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Loan Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Active Loans</span>
                      <span className="font-medium text-gray-800 dark:text-white">{activeLoans.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Pending Applications</span>
                      <span className="font-medium text-gray-800 dark:text-white">{loanApplications.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Average Interest Rate</span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {(activeLoans.reduce((sum, loan) => sum + loan.interestRate, 0) / activeLoans.length).toFixed(2)}%
                      </span>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("applications")}>
                        Apply for New Loan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>Pay towards any of your active loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loan-select">Select Loan</Label>
                      <select
                        aria-label="Select loan for payment"
                        id="loan-select" 
                        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      >
                        <option value="all">All Loans (Split Evenly)</option>
                        {activeLoans.map(loan => (
                          <option key={loan.id} value={loan.id}>
                            {loan.type} (${(loan.totalAmount - loan.amountPaid).toLocaleString()} remaining)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-amount">Payment Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input 
                          id="payment-amount" 
                          type="number" 
                          placeholder="0.00" 
                          className="pl-9"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button className="w-full" onClick={handlePayment} disabled={!paymentAmount}>
                      Submit Payment
                    </Button>
                  </div>
                  
                  <div className="md:col-span-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Payment Tips</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Making extra payments can significantly reduce your total interest and loan term.
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Set up automatic payments to ensure you never miss a due date and potentially qualify for interest rate reductions.
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Consider targeting the loan with the highest interest rate first to save money over time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Loans Tab */}
          <TabsContent value="active-loans" className="space-y-6">
            {activeLoans.map(loan => (
              <Card key={loan.id} className="bg-white dark:bg-gray-800 shadow-md">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <CardTitle>{loan.type}</CardTitle>
                      <CardDescription>
                        Started: {new Date(loan.startDate).toLocaleDateString()} | 
                        Ends: {new Date(loan.endDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge 
                      className={loan.status === "Current" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }
                    >
                      {loan.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-gray-800 dark:text-white">${loan.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Remaining Balance</p>
                      <p className="text-xl font-bold text-gray-800 dark:text-white">
                        ${(loan.totalAmount - loan.amountPaid).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Interest Rate</p>
                      <p className="text-xl font-bold text-gray-800 dark:text-white">{loan.interestRate}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Repayment Progress</span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {Math.round((loan.amountPaid / loan.totalAmount) * 100)}%
                      </span>
                    </div>
                    <Progress value={(loan.amountPaid / loan.totalAmount) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Payment History</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loan.paymentHistory.slice(0, 5).map(payment => (
                            <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                                {new Date(payment.date).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4 text-gray-800 dark:text-gray-200">${payment.amount}</td>
                              <td className="py-3 px-4">
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  {payment.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {loan.paymentHistory.length > 5 && (
                      <div className="text-center">
                        <Button variant="link" className="text-blue-600 dark:text-blue-400">
                          View All Payment History
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button className="sm:flex-1">Make Payment</Button>
                  <Button variant="outline" className="sm:flex-1">Payment Schedule</Button>
                  <Button variant="outline" className="sm:flex-1">Loan Details</Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle>Loan Applications</CardTitle>
                <CardDescription>Track your pending loan applications</CardDescription>
              </CardHeader>
              <CardContent>
                {loanApplications.length > 0 ? (
                  <div className="space-y-4">
                    {loanApplications.map(application => (
                      <div 
                        key={application.id} 
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex flex-col md:flex-row justify-between md:items-center">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white">{application.type}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Amount: ${application.amount} | Submitted: {new Date(application.submissionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge 
                            className="mt-2 md:mt-0 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          >
                            {application.status}
                          </Badge>
                        </div>
                        <div className="mt-4 flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Estimated decision by: {new Date(application.estimatedDecisionDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No pending applications</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">You don't have any loan applications in progress</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply for a New Loan</Button>
              </CardFooter>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle>Available Loan Types</CardTitle>
                <CardDescription>Explore financing options for your education</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Tuition Loan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Cover your course fees with our low-interest tuition loans.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">Interest Rate</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">3.5% - 5.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">Term Length</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Up to 10 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">Max Amount</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">$50,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Living Expenses</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Financial support for housing, food, and other living costs.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">Interest Rate</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4.0% - 6.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">Term Length</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Up to 5 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">Max Amount</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">$15,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Books & Materials</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Funds for textbooks, equipment, and course materials.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">Interest Rate</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">3.0% - 4.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">Term Length</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Up to 2 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-500">Max Amount</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">$5,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Repayment Plans Tab */}
          <TabsContent value="repayment" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle>Repayment Plan Options</CardTitle>
                <CardDescription>Choose the repayment strategy that works best for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {repaymentPlans.map(plan => (
                    <div 
                      key={plan.id} 
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white">{plan.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{plan.description}</p>
                        </div>
                        <Button className="mt-4 md:mt-0" variant="outline">Select Plan</Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Payment</p>
                          <p className="text-lg font-medium text-gray-800 dark:text-white">
                            ${typeof plan.monthlyPayment === 'string' ? plan.monthlyPayment : plan.monthlyPayment.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Interest</p>
                          <p className="text-lg font-medium text-gray-800 dark:text-white">${plan.totalInterest.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Repayment Term</p>
                          <p className="text-lg font-medium text-gray-800 dark:text-white">{plan.term}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle>Loan Repayment Calculator</CardTitle>
                <CardDescription>Estimate your monthly payments and total cost</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loan-amount">Loan Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input id="loan-amount" type="number" placeholder="10000" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                      <Input id="interest-rate" type="number" placeholder="4.5" step="0.1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loan-term">Loan Term (years)</Label>
                      <Input id="loan-term" type="number" placeholder="10" />
                    </div>
                    <Button className="w-full">Calculate</Button>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Calculation Results</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Monthly Payment</span>
                        <span className="text-xl font-bold text-gray-800 dark:text-white">$103.64</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Total Payment</span>
                        <span className="font-medium text-gray-800 dark:text-white">$12,436.80</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Total Interest</span>
                        <span className="font-medium text-gray-800 dark:text-white">$2,436.80</span>
                      </div>
                      <div className="pt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          This is just an estimate. Actual payments may vary based on your specific loan terms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
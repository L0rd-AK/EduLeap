'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { KycIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

export default function LoanApplicationPage() {
  // Placeholder state and data
  const courseFee = 1200; // Example course fee
  const loanLimit = courseFee * 3; // 3x course fees
  const [loanAmount, setLoanAmount] = useState<string | ''>('');
  const [selectedEmiPlan, setSelectedEmiPlan] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loanStatus, setLoanStatus] = useState('Pending Submission'); // Placeholder status
  const [requiredDocument, setRequiredDocument] = useState<File | null>(null);

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and prevent exceeding the loan limit
    if (value === '' || (/^\d+$/.test(value) && parseFloat(value) <= loanLimit)) {
      setLoanAmount(value);
    }
  };

  const handleDocumentUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0] || null;
    setter(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement loan application submission logic
    console.log('Submitting loan application:', {
      loanAmount,
      selectedEmiPlan,
      agreedToTerms,
      requiredDocument: requiredDocument?.name,
    });
    // Update status after submission (example)
    setLoanStatus('Pending Approval');
  };

  // Function to determine badge variant based on status
  const getStatusVariant = (status: string) => {
      switch (status) {
          case 'Approved':
              return 'default'; // Typically green or primary
          case 'Pending':
              return 'secondary'; // Typically gray or less prominent
          case 'Rejected':
              return 'destructive'; // Typically red
          default:
              return 'secondary';
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">Loan Application</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Apply for a micro-loan to support your education.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Loan Eligibility Calculator */}
            <div className="grid gap-2">
              <Label htmlFor="loan-amount" className="text-gray-700 dark:text-gray-300">Loan Amount (Max: <span className="font-semibold text-green-600 dark:text-green-400">${loanLimit}</span>)</Label>
              <Input
                id="loan-amount"
                type="number"
                placeholder={`Enter amount (up to ${loanLimit})`}
                value={loanAmount}
                onChange={handleLoanAmountChange}
                required
                className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* EMI Plan Selector */}
            <div className="grid gap-2">
              <Label htmlFor="emi-plan" className="text-gray-700 dark:text-gray-300">Select EMI Plan</Label>
              <Select onValueChange={setSelectedEmiPlan} value={selectedEmiPlan} required>
                <SelectTrigger id="emi-plan" className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-orange-500 focus:border-orange-500">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  {/* Placeholder EMI Plans */}
                  <SelectItem value="plan-1">Plan 1 (12 months)</SelectItem>
                  <SelectItem value="plan-2">Plan 2 (18 months)</SelectItem>
                  <SelectItem value="plan-3">Plan 3 (24 months)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                required
                 className="border-gray-300 dark:border-gray-700 data-[state=checked]:bg-orange-500 data-[state=checked]:text-white dark:data-[state=checked]:bg-orange-600"
              />
              <Label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                I agree to the <a href="#" className="text-orange-600 dark:text-orange-400 hover:underline">terms and conditions</a>.
              </Label>
            </div>

            {/* Document Re-upload Option (if required) */}
            <div className="grid gap-2">
              <Label htmlFor="required-document" className="flex items-center text-gray-700 dark:text-gray-300">
                 <KycIcon className="mr-2 h-5 w-5 text-orange-600 dark:text-orange-400" />
                 Upload Required Document (if requested)
              </Label>
              <Input
                id="required-document"
                type="file"
                onChange={(e) => handleDocumentUpload(e, setRequiredDocument)}
                 className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 dark:file:bg-orange-800 dark:file:text-orange-100 dark:hover:file:bg-orange-700"
              />
            </div>

            {/* Status Tracker */}
            <div className="grid gap-2">
              <Label className="text-gray-700 dark:text-gray-300">Loan Status</Label>
              {/* Using Badge for status for better visual indication */}
              <Badge variant={getStatusVariant(loanStatus)} className="text-center py-2 text-lg font-semibold">
                 {loanStatus}
              </Badge>
            </div>

            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2" disabled={!agreedToTerms || loanAmount === '' || selectedEmiPlan === ''}>
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

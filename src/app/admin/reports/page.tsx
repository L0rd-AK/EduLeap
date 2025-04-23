'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState } from 'react';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customMetrics, setCustomMetrics] = useState<string[]>([]);
  const [reportData, setReportData] = useState<any[] | null>(null); // Placeholder for fetched report data

  const availableMetrics = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'loan-recovery', label: 'Loan Recovery Rate' },
    { value: 'placement-success', label: 'Placement Success Rate' },
    { value: 'enrollment-numbers', label: 'Enrollment Numbers' },
    // Add more available metrics
  ];

  const preBuiltReports = [
    { value: 'revenue-report', label: 'Revenue Report' },
    { value: 'loan-performance', label: 'Loan Performance Report' },
    { value: 'placement-report', label: 'Placement Report' },
    // Add more pre-built reports
  ];

  const handleGenerateReport = () => {
    console.log('Generating report:', {
      selectedReport,
      startDate,
      endDate,
      customMetrics,
    });
    // Implement logic to fetch and generate report data
    // For now, setting some placeholder data
    setReportData([
        { id: 1, metric: 'Revenue', value: '$150,000', period: 'Q3 2024' },
        { id: 2, metric: 'Loan Recovery Rate', value: '95%', period: 'Q3 2024' },
    ]);
  };

  const handleMetricToggle = (metricValue: string) => {
    setCustomMetrics(prevMetrics =>
      prevMetrics.includes(metricValue)
        ? prevMetrics.filter(m => m !== metricValue)
        : [...prevMetrics, metricValue]
    );
  };

  const handleExportReport = (format: string) => {
      console.log(`Exporting report as ${format}`);
      // Implement export logic
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Reports & Analytics</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Select a pre-built report or create a custom one.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Pre-built Reports */}
          <div className="grid gap-2">
            <Label htmlFor="pre-built-report">Select Pre-built Report</Label>
            <Select onValueChange={setSelectedReport} value={selectedReport}>
              <SelectTrigger id="pre-built-report">
                <SelectValue placeholder="Select a report" />
              </SelectTrigger>
              <SelectContent>
                {preBuiltReports.map(report => (
                  <SelectItem key={report.value} value={report.value}>
                    {report.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Report Builder (Date Range and Metrics) */}
          <div className="grid gap-2">
            <Label>Custom Report (Optional)</Label>
            <div className="flex gap-4">
              <div className="grid gap-1">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
             <div className="grid gap-1 mt-2">
                <Label>Select Metrics</Label>
                <div className="flex flex-wrap gap-2">
                    {availableMetrics.map(metric => (
                        <Button
                            key={metric.value}
                            variant={customMetrics.includes(metric.value) ? 'default' : 'outline'}
                            onClick={() => handleMetricToggle(metric.value)}
                            size="sm"
                        >
                            {metric.label}
                        </Button>
                    ))}
                </div>
             </div>
          </div>

          <Button onClick={handleGenerateReport}>Generate Report</Button>
        </CardContent>
      </Card>

      {/* Display Report Data */}
        {reportData && (
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Report Results</CardTitle>
                    <CardDescription>View the generated report data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Metric</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Period</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.metric}</TableCell>
                                        <TableCell>{row.value}</TableCell>
                                        <TableCell>{row.period}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        )}

      {/* Export Options */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Export Report</CardTitle>
          <CardDescription>Download the generated report in various formats.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button variant="outline" onClick={() => handleExportReport('PDF')}>Export as PDF</Button>
          <Button variant="outline" onClick={() => handleExportReport('CSV')}>Export as CSV</Button>
        </CardContent>
      </Card>

       {/* ROI Projection Trends (Placeholder) */}
        <Card>
            <CardHeader>
                <CardTitle>ROI Projection Trends</CardTitle>
                <CardDescription>Visualize ROI trends across student cohorts.</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-muted-foreground">Placeholder for ROI projection trend charts or data.</p>
            </CardContent>
        </Card>

    </div>
  );
}

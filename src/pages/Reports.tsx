import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart3,
  TrendingUp,
  Download,
  FileText,
  Calendar,
  Package,
  AlertTriangle,
  DollarSign,
} from 'lucide-react';

const Reports: React.FC = () => {
  const reportCategories = [
    {
      title: 'Inventory Reports',
      description: 'Current stock levels and item status',
      reports: [
        { name: 'Current Inventory Summary', description: 'Complete list of all items with current stock levels', icon: Package },
        { name: 'Low Stock Alert Report', description: 'Items below minimum stock threshold', icon: AlertTriangle },
        { name: 'Inventory Value Report', description: 'Total value of inventory by category', icon: DollarSign },
        { name: 'Item Movement History', description: 'Historical data of item movements', icon: TrendingUp },
      ]
    },
    {
      title: 'Receiving Reports',
      description: 'Material receiving and verification reports',
      reports: [
        { name: 'Monthly Receiving Summary', description: 'Summary of all materials received this month', icon: Package },
        { name: 'Supplier Performance', description: 'Delivery performance by supplier', icon: BarChart3 },
        { name: 'Receiving Discrepancies', description: 'Items with quantity or quality issues', icon: AlertTriangle },
        { name: 'Verification Status Report', description: 'Status of pending verifications', icon: FileText },
      ]
    },
    {
      title: 'Dispatch Reports',
      description: 'Outgoing material dispatch reports',
      reports: [
        { name: 'Monthly Dispatch Summary', description: 'Summary of all dispatched materials', icon: Package },
        { name: 'Pending Dispatch Requests', description: 'Outstanding dispatch requests', icon: Calendar },
        { name: 'Delivery Performance', description: 'On-time delivery statistics', icon: TrendingUp },
        { name: 'Dispatch Value Report', description: 'Value of dispatched materials by destination', icon: DollarSign },
      ]
    },
  ];

  const recentReports = [
    {
      id: '1',
      name: 'January 2024 - Inventory Summary',
      type: 'Inventory',
      generatedDate: '2024-01-31',
      size: '2.3 MB',
      format: 'PDF',
    },
    {
      id: '2',
      name: 'Q4 2023 - Supplier Performance',
      type: 'Receiving',
      generatedDate: '2024-01-15',
      size: '1.8 MB',
      format: 'Excel',
    },
    {
      id: '3',
      name: 'Weekly Dispatch Report - W4',
      type: 'Dispatch',
      generatedDate: '2024-01-28',
      size: '945 KB',
      format: 'PDF',
    },
    {
      id: '4',
      name: 'Low Stock Alert - January',
      type: 'Inventory',
      generatedDate: '2024-01-30',
      size: '1.2 MB',
      format: 'PDF',
    },
  ];

  const handleGenerateReport = (reportName: string) => {
    // In real app, this would call an API to generate the report
    console.log('Generating report:', reportName);
  };

  const handleDownloadReport = (reportId: string) => {
    // In real app, this would download the report file
    console.log('Downloading report:', reportId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Generate and download comprehensive reports for inventory management
        </p>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reportCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-medium transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-lg">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.reports.map((report, reportIndex) => (
                  <div key={reportIndex} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <report.icon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleGenerateReport(report.name)}
                      className="hover:bg-primary hover:text-primary-foreground"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Recent Reports
          </CardTitle>
          <CardDescription>
            Previously generated reports available for download
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Generated Date</TableHead>
                <TableHead>File Size</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{report.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(report.generatedDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>
                    <Badge variant={report.format === 'PDF' ? 'default' : 'secondary'}>
                      {report.format}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadReport(report.id)}
                      className="hover:bg-success hover:text-success-foreground"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-medium transition-all duration-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reports Generated</p>
                <p className="text-2xl font-bold text-foreground">247</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-success">+12% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                <p className="text-2xl font-bold text-foreground">1,394</p>
              </div>
              <Download className="h-8 w-8 text-success" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-success">+8% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Automated Reports</p>
                <p className="text-2xl font-bold text-foreground">23</p>
              </div>
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">Daily & Weekly</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Report Size</p>
                <p className="text-2xl font-bold text-foreground">45.2 MB</p>
              </div>
              <Package className="h-8 w-8 text-warning" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">Average file size</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
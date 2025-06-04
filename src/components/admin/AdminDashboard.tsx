import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ShieldIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  UsersIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  EyeIcon,
  MessageSquareIcon,
  BanIcon,
  SearchIcon,
  DownloadIcon,
  RefreshCwIcon,
} from "lucide-react";

// Mock data for admin dashboard
const pendingJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    postedBy: "john@techcorp.com",
    submittedAt: "2024-01-15",
    status: "pending",
    salary: "₹15-25 LPA",
    location: "Bangalore",
    category: "Technology",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    postedBy: "sarah@startupxyz.com",
    submittedAt: "2024-01-14",
    status: "pending",
    salary: "₹20-30 LPA",
    location: "Mumbai",
    category: "Product",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Analytics Pro",
    postedBy: "mike@analyticspro.com",
    submittedAt: "2024-01-13",
    status: "pending",
    salary: "₹18-28 LPA",
    location: "Hyderabad",
    category: "Data Science",
  },
];

const reportedContent = [
  {
    id: "1",
    type: "job_post",
    title: "Fake Job Posting",
    reportedBy: "user123@email.com",
    reason: "Fraudulent posting with unrealistic salary",
    reportedAt: "2024-01-15",
    status: "pending",
    severity: "high",
  },
  {
    id: "2",
    type: "user_profile",
    title: "Inappropriate Profile Content",
    reportedBy: "user456@email.com",
    reason: "Inappropriate profile picture and description",
    reportedAt: "2024-01-14",
    status: "reviewed",
    severity: "medium",
  },
  {
    id: "3",
    type: "company_review",
    title: "Spam Review",
    reportedBy: "user789@email.com",
    reason: "Multiple fake reviews from same IP",
    reportedAt: "2024-01-13",
    status: "pending",
    severity: "low",
  },
];

const platformAnalytics = {
  dailyActiveUsers: [
    { date: "2024-01-08", users: 1200 },
    { date: "2024-01-09", users: 1350 },
    { date: "2024-01-10", users: 1180 },
    { date: "2024-01-11", users: 1420 },
    { date: "2024-01-12", users: 1600 },
    { date: "2024-01-13", users: 1750 },
    { date: "2024-01-14", users: 1890 },
    { date: "2024-01-15", users: 2100 },
  ],
  jobViews: [
    { category: "Technology", views: 45000 },
    { category: "Finance", views: 28000 },
    { category: "Healthcare", views: 18000 },
    { category: "Marketing", views: 15000 },
    { category: "Sales", views: 12000 },
  ],
  userDistribution: [
    { name: "Job Seekers", value: 78, color: "#3b82f6" },
    { name: "Recruiters", value: 20, color: "#10b981" },
    { name: "Admins", value: 2, color: "#f59e0b" },
  ],
};

const securityEvents = [
  {
    id: "1",
    type: "suspicious_login",
    user: "user@suspicious.com",
    description: "Multiple failed login attempts from different IPs",
    timestamp: "2024-01-15 14:30:00",
    severity: "high",
    status: "investigating",
  },
  {
    id: "2",
    type: "api_abuse",
    user: "api_user_123",
    description: "Rate limit exceeded by 300% on job search API",
    timestamp: "2024-01-15 13:15:00",
    severity: "medium",
    status: "blocked",
  },
  {
    id: "3",
    type: "fake_account",
    user: "fake@email.com",
    description: "Account created with stolen company information",
    timestamp: "2024-01-15 12:00:00",
    severity: "high",
    status: "banned",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const handleJobApproval = (
    jobId: string,
    action: "approve" | "reject",
    reason?: string,
  ) => {
    toast({
      title: action === "approve" ? "Job Approved" : "Job Rejected",
      description: `Job has been ${action}d successfully${reason ? `: ${reason}` : ""}`,
    });
    // In a real app, this would make an API call
  };

  const handleReportAction = (
    reportId: string,
    action: "resolve" | "escalate" | "ban_user",
  ) => {
    toast({
      title: "Report Action Taken",
      description: `Report has been ${action.replace("_", " ")}d successfully`,
    });
    // In a real app, this would make an API call
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      case "pending":
        return "secondary";
      case "banned":
        return "destructive";
      case "investigating":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Platform management and security control center
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Security Alert Banner */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="flex items-center gap-4 p-4">
          <AlertTriangleIcon className="h-6 w-6 text-amber-600" />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-800">Security Alert</h3>
            <p className="text-sm text-amber-700">
              3 suspicious activities detected in the last hour. Review security
              events tab.
            </p>
          </div>
          <Button variant="outline" size="sm" className="border-amber-300">
            Review
          </Button>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="job-approval">Job Approval</TabsTrigger>
          <TabsTrigger value="reports">Reports & Safety</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Daily Active Users
                </CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,100</div>
                <p className="text-xs text-muted-foreground">
                  +12% from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Jobs
                </CardTitle>
                <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting approval
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Open Reports
                </CardTitle>
                <ShieldIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Require review</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Job Applications
                </CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,847</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Active Users Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={platformAnalytics.dailyActiveUsers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={platformAnalytics.userDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {platformAnalytics.userDistribution.map(
                        (entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ),
                      )}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="job-approval" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pending Job Approvals</CardTitle>
              <CardDescription>
                Review and approve job postings before they go live
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Posted By</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.postedBy}</TableCell>
                      <TableCell>{job.salary}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <EyeIcon className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Review Job Posting</DialogTitle>
                                <DialogDescription>
                                  Review the job details and decide whether to
                                  approve or reject
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium">Job Title</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {job.title}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Company</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {job.company}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">
                                      Salary Range
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {job.salary}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Location</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {job.location}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Admin Notes
                                  </h4>
                                  <Textarea placeholder="Add notes for approval/rejection..." />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleJobApproval(job.id, "reject")
                                    }
                                  >
                                    <XCircleIcon className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleJobApproval(job.id, "approve")
                                    }
                                  >
                                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reported Content</CardTitle>
              <CardDescription>
                Review and take action on reported users, jobs, and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportedContent.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <Badge variant="outline">
                          {report.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {report.title}
                      </TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {report.reason}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getSeverityColor(report.severity)}>
                          {report.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleReportAction(report.id, "resolve")
                            }
                          >
                            Resolve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleReportAction(report.id, "ban_user")
                            }
                          >
                            <BanIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Views by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={platformAnalytics.jobViews}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      New Users (This Month)
                    </span>
                    <span className="text-2xl font-bold">+2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Job Applications
                    </span>
                    <span className="text-2xl font-bold">14,293</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Active Job Postings
                    </span>
                    <span className="text-2xl font-bold">8,451</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-2xl font-bold text-green-600">
                      78%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
              <CardDescription>
                Monitor suspicious activities and security threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <Badge variant="outline">
                          {event.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {event.user}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {event.description}
                      </TableCell>
                      <TableCell className="text-sm">
                        {event.timestamp}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getSeverityColor(event.severity)}>
                          {event.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

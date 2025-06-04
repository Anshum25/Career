import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Users,
  BriefcaseIcon,
  Building2,
  AlertTriangle,
  Shield,
  TrendingUp,
  MessageSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  FilterIcon,
  SearchIcon,
  MoreHorizontalIcon,
  FlagIcon,
  UserXIcon,
  UserCheckIcon,
  DollarSignIcon,
  CalendarIcon,
  ActivityIcon,
} from "lucide-react";
import { mockJobs, mockCompanies } from "@/lib/mockData";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const systemStats = [
    {
      label: "Total Users",
      value: "15,234",
      icon: Users,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      label: "Active Jobs",
      value: "3,456",
      icon: BriefcaseIcon,
      change: "+8.2%",
      changeType: "positive",
    },
    {
      label: "Companies",
      value: "1,789",
      icon: Building2,
      change: "+15.1%",
      changeType: "positive",
    },
    {
      label: "Pending Reports",
      value: "23",
      icon: AlertTriangle,
      change: "-5",
      changeType: "positive",
    },
  ];

  const recentReports = [
    {
      id: "1",
      type: "job",
      title: "Inappropriate Job Description",
      reportedBy: "Sarah M.",
      targetId: "job-123",
      targetTitle: "Senior Developer at TechCorp",
      reason: "Discriminatory language",
      status: "pending",
      createdAt: "2 hours ago",
      severity: "high",
    },
    {
      id: "2",
      type: "user",
      title: "Spam Profile",
      reportedBy: "Mike J.",
      targetId: "user-456",
      targetTitle: "John Doe Profile",
      reason: "Multiple fake applications",
      status: "under_review",
      createdAt: "4 hours ago",
      severity: "medium",
    },
    {
      id: "3",
      type: "company",
      title: "Fake Company",
      reportedBy: "Lisa K.",
      targetId: "company-789",
      targetTitle: "FakeCorp Ltd",
      reason: "Non-existent company",
      status: "resolved",
      createdAt: "1 day ago",
      severity: "high",
    },
  ];

  const recentUsers = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "job_seeker",
      joinedAt: "2024-01-15",
      status: "active",
      applications: 12,
      avatar: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@techcorp.com",
      role: "recruiter",
      joinedAt: "2024-01-10",
      status: "active",
      jobPosts: 8,
      avatar: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Carol Wilson",
      email: "carol@example.com",
      role: "job_seeker",
      joinedAt: "2024-01-12",
      status: "suspended",
      applications: 45,
      avatar: "/placeholder.svg",
    },
  ];

  const systemMetrics = {
    userGrowth: 85,
    jobPostGrowth: 73,
    applicationRate: 92,
    platformHealth: 96,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "under_review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor platform activity and manage system operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ActivityIcon className="w-4 h-4 mr-2" />
            System Health
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <Badge
                  variant={
                    stat.changeType === "positive" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Reports */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FlagIcon className="h-5 w-5" />
                      Recent Reports
                    </CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="#" onClick={() => setActiveTab("reports")}>
                        View All
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(report.severity)}`}
                      ></div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">
                            {report.title}
                          </h4>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {report.targetTitle}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Reported by {report.reportedBy}</span>
                          <span>{report.reason}</span>
                          <span>{report.createdAt}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">User Growth</span>
                      <span className="font-medium">
                        {systemMetrics.userGrowth}%
                      </span>
                    </div>
                    <Progress
                      value={systemMetrics.userGrowth}
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Job Posts</span>
                      <span className="font-medium">
                        {systemMetrics.jobPostGrowth}%
                      </span>
                    </div>
                    <Progress
                      value={systemMetrics.jobPostGrowth}
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Applications
                      </span>
                      <span className="font-medium">
                        {systemMetrics.applicationRate}%
                      </span>
                    </div>
                    <Progress
                      value={systemMetrics.applicationRate}
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Platform Health
                      </span>
                      <span className="font-medium text-green-600">
                        {systemMetrics.platformHealth}%
                      </span>
                    </div>
                    <Progress
                      value={systemMetrics.platformHealth}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <FlagIcon className="w-4 h-4 mr-2" />
                    Review Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BriefcaseIcon className="w-4 h-4 mr-2" />
                    Review Jobs
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <UserCheckIcon className="h-4 w-4 text-green-600" />
                      <span>5 new users verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BriefcaseIcon className="h-4 w-4 text-blue-600" />
                      <span>12 jobs posted today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FlagIcon className="h-4 w-4 text-red-600" />
                      <span>3 reports resolved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-purple-600" />
                      <span>2 companies approved</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Monitor and manage platform users
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{user.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {user.role.replace("_", " ")}
                          </Badge>
                          <Badge className={getUserStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {user.email}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          Joined {new Date(user.joinedAt).toLocaleDateString()}
                        </span>
                        {user.role === "job_seeker" && (
                          <span>{user.applications} applications</span>
                        )}
                        {user.role === "recruiter" && (
                          <span>{user.jobPosts} job posts</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={
                          user.status === "suspended" ? "default" : "outline"
                        }
                        size="sm"
                      >
                        {user.status === "suspended" ? (
                          <UserCheckIcon className="h-4 w-4" />
                        ) : (
                          <UserXIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Job Management</CardTitle>
                  <CardDescription>
                    Review and moderate job postings
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Pending Review
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobs.slice(0, 5).map((job) => (
                  <div
                    key={job.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={job.company.logo}
                        alt={job.company.name}
                      />
                      <AvatarFallback>{job.company.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{job.title}</h4>
                        <div className="flex items-center gap-2">
                          {job.featured && <Badge>Featured</Badge>}
                          {job.urgent && (
                            <Badge variant="destructive">Urgent</Badge>
                          )}
                          <Badge variant="outline">Active</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {job.company.name}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>
                          {job.location.city}, {job.location.state}
                        </span>
                        <span>
                          ${job.salary.min / 1000}k - ${job.salary.max / 1000}k
                        </span>
                        <span className="capitalize">{job.workMode}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>{job.applicationsCount} applications</span>
                        <span>{job.viewsCount} views</span>
                        <span className="text-muted-foreground">
                          Posted {new Date(job.postedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Content Reports</CardTitle>
                  <CardDescription>
                    Review and moderate reported content
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Priority Queue
                  </Button>
                  <Button variant="outline" size="sm">
                    Filter by Type
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`w-4 h-4 rounded-full mt-1 ${
                        report.severity === "high"
                          ? "bg-red-500"
                          : report.severity === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{report.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {report.type}
                          </Badge>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {report.targetTitle}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>Reported by {report.reportedBy}</span>
                        <span>{report.reason}</span>
                        <span>{report.createdAt}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Content
                        </Button>
                        {report.status === "pending" && (
                          <>
                            <Button size="sm" variant="destructive">
                              <XCircleIcon className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                            <Button size="sm">
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">+24.5%</div>
                <p className="text-sm text-muted-foreground">
                  User growth this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">78.2%</div>
                <p className="text-sm text-muted-foreground">
                  Jobs filled successfully
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">$45.2k</div>
                <p className="text-sm text-muted-foreground">
                  Monthly recurring revenue
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>
                Comprehensive platform metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Advanced analytics dashboard coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

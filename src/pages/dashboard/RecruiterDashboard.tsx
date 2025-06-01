import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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
  TrendingUpIcon,
  MessageSquareIcon,
  CalendarIcon,
  PlusCircleIcon,
  EyeIcon,
  ClockIcon,
  MapPinIcon,
  FilterIcon,
  SearchIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserCheckIcon,
  DollarSignIcon,
} from "lucide-react";
import { mockJobs } from "@/lib/mockData";

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [myJobs] = useState(mockJobs.slice(0, 3)); // Mock jobs posted by this recruiter

  const stats = [
    {
      label: "Active Job Posts",
      value: "12",
      icon: BriefcaseIcon,
      change: "+3",
      changeType: "positive",
    },
    {
      label: "Total Applications",
      value: "247",
      icon: Users,
      change: "+18%",
      changeType: "positive",
    },
    {
      label: "Interviews Scheduled",
      value: "15",
      icon: CalendarIcon,
      change: "+5",
      changeType: "positive",
    },
    {
      label: "Avg. Response Time",
      value: "2.3h",
      icon: ClockIcon,
      change: "-0.5h",
      changeType: "positive",
    },
  ];

  const recentApplications = [
    {
      id: "1",
      candidateName: "Sarah Johnson",
      jobTitle: "Senior Full Stack Developer",
      appliedAt: "2 hours ago",
      status: "pending",
      score: 92,
      avatar: "/placeholder.svg",
      experience: "5 years",
      location: "San Francisco, CA",
    },
    {
      id: "2",
      candidateName: "Michael Chen",
      jobTitle: "UX/UI Designer",
      appliedAt: "4 hours ago",
      status: "reviewed",
      score: 88,
      avatar: "/placeholder.svg",
      experience: "3 years",
      location: "New York, NY",
    },
    {
      id: "3",
      candidateName: "Emily Rodriguez",
      jobTitle: "Data Scientist",
      appliedAt: "1 day ago",
      status: "interviewed",
      score: 95,
      avatar: "/placeholder.svg",
      experience: "4 years",
      location: "Austin, TX",
    },
    {
      id: "4",
      candidateName: "David Kim",
      jobTitle: "Product Marketing Manager",
      appliedAt: "1 day ago",
      status: "pending",
      score: 78,
      avatar: "/placeholder.svg",
      experience: "6 years",
      location: "Seattle, WA",
    },
  ];

  const upcomingInterviews = [
    {
      id: "1",
      candidateName: "Alice Cooper",
      jobTitle: "Frontend Developer",
      scheduledAt: "Today 3:00 PM",
      type: "Technical Interview",
      duration: "1 hour",
    },
    {
      id: "2",
      candidateName: "Bob Wilson",
      jobTitle: "Backend Developer",
      scheduledAt: "Tomorrow 10:00 AM",
      type: "Cultural Fit",
      duration: "45 mins",
    },
    {
      id: "3",
      candidateName: "Carol Davis",
      jobTitle: "DevOps Engineer",
      scheduledAt: "Friday 2:00 PM",
      type: "System Design",
      duration: "1.5 hours",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "reviewed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "interviewed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <ClockIcon className="h-3 w-3" />;
      case "reviewed":
        return <EyeIcon className="h-3 w-3" />;
      case "interviewed":
        return <UserCheckIcon className="h-3 w-3" />;
      case "rejected":
        return <XCircleIcon className="h-3 w-3" />;
      default:
        return <ClockIcon className="h-3 w-3" />;
    }
  };

  return (
    <div className="container py-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Manage your job posts and candidates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/jobs?recruiter=true">
              <SearchIcon className="w-4 h-4 mr-2" />
              Browse Candidates
            </Link>
          </Button>
          <Button asChild>
            <Link to="/jobs/post">
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Applications */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Applications</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="#" onClick={() => setActiveTab("applications")}>
                        View All
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentApplications.slice(0, 4).map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={application.avatar}
                          alt={application.candidateName}
                        />
                        <AvatarFallback>
                          {application.candidateName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            {application.candidateName}
                          </h4>
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1 capitalize">
                              {application.status}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {application.jobTitle}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{application.experience}</span>
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="h-3 w-3" />
                            {application.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <StarIcon className="h-3 w-3" />
                            {application.score}% match
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {application.appliedAt}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <Link to="/jobs/post">
                      <PlusCircleIcon className="w-4 h-4 mr-2" />
                      Post New Job
                    </Link>
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    asChild
                  >
                    <Link to="/candidates/search">
                      <SearchIcon className="w-4 h-4 mr-2" />
                      Search Candidates
                    </Link>
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    asChild
                  >
                    <Link to="/interviews/schedule">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Schedule Interview
                    </Link>
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    asChild
                  >
                    <Link to="/analytics">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Interviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="space-y-2 p-3 border rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">
                          {interview.candidateName}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {interview.duration}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {interview.jobTitle}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{interview.scheduledAt}</span>
                      </div>
                      <p className="text-xs font-medium text-primary">
                        {interview.type}
                      </p>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link to="#" onClick={() => setActiveTab("interviews")}>
                      View All Interviews
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Hiring Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Applications
                      </span>
                      <span className="font-medium">67/100</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Response Rate
                      </span>
                      <span className="font-medium">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Hires Made</span>
                      <span className="font-medium">3/5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Applications</CardTitle>
                  <CardDescription>
                    Manage candidate applications for your job posts
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={application.avatar}
                        alt={application.candidateName}
                      />
                      <AvatarFallback>
                        {application.candidateName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">
                          {application.candidateName}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1 capitalize">
                              {application.status}
                            </span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            <StarIcon className="h-3 w-3 mr-1" />
                            {application.score}%
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {application.jobTitle}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{application.experience} experience</span>
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          {application.location}
                        </span>
                        <span>{application.appliedAt}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm">
                        {application.status === "pending"
                          ? "Review"
                          : application.status === "reviewed"
                            ? "Interview"
                            : application.status === "interviewed"
                              ? "Hire"
                              : "View"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Job Posts</CardTitle>
                  <CardDescription>
                    Manage your active and draft job postings
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link to="/jobs/post">
                    <PlusCircleIcon className="h-4 w-4 mr-2" />
                    Post New Job
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myJobs.map((job) => (
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
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          {job.location.city}, {job.location.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSignIcon className="h-3 w-3" />$
                          {job.salary.min / 1000}k - ${job.salary.max / 1000}k
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {job.workMode}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {job.applicationsCount} applications
                        </span>
                        <span className="flex items-center gap-1">
                          <EyeIcon className="h-3 w-3" />
                          {job.viewsCount} views
                        </span>
                        <span className="text-muted-foreground">
                          Posted {new Date(job.postedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/jobs/${job.id}/edit`}>Edit</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link to={`/jobs/${job.id}/applications`}>
                          View Applications
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interviews Tab */}
        <TabsContent value="interviews" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Interview Schedule</CardTitle>
                  <CardDescription>
                    Manage your upcoming and past interviews
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link to="/interviews/schedule">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <CalendarIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">
                          {interview.candidateName}
                        </h4>
                        <Badge variant="outline">{interview.duration}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {interview.jobTitle}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {interview.scheduledAt}
                        </span>
                        <span className="text-primary font-medium">
                          {interview.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button size="sm">Join Meeting</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

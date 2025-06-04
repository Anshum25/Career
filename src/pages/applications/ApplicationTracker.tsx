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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  BriefcaseIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  MessageSquareIcon,
  CalendarIcon,
  MapPinIcon,
  DollarSignIcon,
  StarIcon,
  FilterIcon,
  SearchIcon,
  MoreHorizontalIcon,
  TrendingUp,
  Users,
  Send,
  Building2,
} from "lucide-react";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: {
    name: string;
    logo: string;
  };
  appliedAt: Date;
  status:
    | "pending"
    | "reviewed"
    | "interviewed"
    | "offered"
    | "rejected"
    | "withdrawn";
  stage: number; // 1-5 representing application pipeline stage
  location: string;
  salary: string;
  workMode: string;
  matchScore: number;
  lastActivity: string;
  notes?: string;
  nextStep?: string;
  interviewDate?: Date;
  responseTime?: string;
}

export default function ApplicationTracker() {
  const [activeTab, setActiveTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock applications data
  const [applications] = useState<Application[]>([
    {
      id: "1",
      jobId: "job-1",
      jobTitle: "Senior Full Stack Developer",
      company: {
        name: "TechCorp Solutions",
        logo: "/placeholder.svg",
      },
      appliedAt: new Date("2024-01-15"),
      status: "interviewed",
      stage: 4,
      location: "San Francisco, CA",
      salary: "$120k - $180k",
      workMode: "Hybrid",
      matchScore: 92,
      lastActivity: "Completed technical interview",
      nextStep: "Waiting for final round",
      interviewDate: new Date("2024-01-20"),
      responseTime: "2 days",
    },
    {
      id: "2",
      jobId: "job-2",
      jobTitle: "Product Marketing Manager",
      company: {
        name: "GrowthCo",
        logo: "/placeholder.svg",
      },
      appliedAt: new Date("2024-01-12"),
      status: "reviewed",
      stage: 2,
      location: "New York, NY",
      salary: "$80k - $120k",
      workMode: "Remote",
      matchScore: 78,
      lastActivity: "Application reviewed by HR",
      nextStep: "HR screening call",
      responseTime: "5 days",
    },
    {
      id: "3",
      jobId: "job-3",
      jobTitle: "UX/UI Designer",
      company: {
        name: "InnovateInc",
        logo: "/placeholder.svg",
      },
      appliedAt: new Date("2024-01-10"),
      status: "offered",
      stage: 5,
      location: "Austin, TX",
      salary: "$70k - $100k",
      workMode: "Hybrid",
      matchScore: 85,
      lastActivity: "Job offer received",
      nextStep: "Review offer terms",
      responseTime: "3 days",
    },
    {
      id: "4",
      jobId: "job-4",
      jobTitle: "Data Scientist",
      company: {
        name: "DataFlow Systems",
        logo: "/placeholder.svg",
      },
      appliedAt: new Date("2024-01-08"),
      status: "pending",
      stage: 1,
      location: "Seattle, WA",
      salary: "$100k - $140k",
      workMode: "On-site",
      matchScore: 88,
      lastActivity: "Application submitted",
      nextStep: "Waiting for initial review",
      responseTime: "8 days",
    },
    {
      id: "5",
      jobId: "job-5",
      jobTitle: "Frontend Developer",
      company: {
        name: "HealthTech Solutions",
        logo: "/placeholder.svg",
      },
      appliedAt: new Date("2024-01-05"),
      status: "rejected",
      stage: 2,
      location: "Boston, MA",
      salary: "$65k - $85k",
      workMode: "Remote",
      matchScore: 76,
      lastActivity: "Application declined",
      notes: "Looking for more senior experience",
      responseTime: "4 days",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "reviewed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "interviewed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "offered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "withdrawn":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
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
        return <MessageSquareIcon className="h-3 w-3" />;
      case "offered":
        return <CheckCircleIcon className="h-3 w-3" />;
      case "rejected":
        return <XCircleIcon className="h-3 w-3" />;
      case "withdrawn":
        return <XCircleIcon className="h-3 w-3" />;
      default:
        return <ClockIcon className="h-3 w-3" />;
    }
  };

  const getStageProgress = (stage: number) => {
    return (stage / 5) * 100;
  };

  const filteredApplications = applications.filter((app) => {
    if (activeTab === "all") return true;
    if (activeTab === "active")
      return ["pending", "reviewed", "interviewed"].includes(app.status);
    if (activeTab === "closed")
      return ["offered", "rejected", "withdrawn"].includes(app.status);
    return app.status === activeTab;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    reviewed: applications.filter((app) => app.status === "reviewed").length,
    interviewed: applications.filter((app) => app.status === "interviewed")
      .length,
    offered: applications.filter((app) => app.status === "offered").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

  const averageResponseTime = "4.4 days";
  const responseRate = "78%";
  const averageMatchScore = Math.round(
    applications.reduce((sum, app) => sum + app.matchScore, 0) /
      applications.length,
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Application Tracker</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <SearchIcon className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.reviewed}
            </div>
            <div className="text-xs text-muted-foreground">Reviewed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.interviewed}
            </div>
            <div className="text-xs text-muted-foreground">Interviewed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.offered}
            </div>
            <div className="text-xs text-muted-foreground">Offered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
            <div className="text-xs text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">
                  Avg. Response Time
                </div>
                <div className="text-2xl font-bold">{averageResponseTime}</div>
              </div>
              <ClockIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">
                  Response Rate
                </div>
                <div className="text-2xl font-bold">{responseRate}</div>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">
                  Avg. Match Score
                </div>
                <div className="text-2xl font-bold">{averageMatchScore}%</div>
              </div>
              <StarIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({stats.pending + stats.reviewed + stats.interviewed})
          </TabsTrigger>
          <TabsTrigger value="offered">Offered ({stats.offered})</TabsTrigger>
          <TabsTrigger value="closed">
            Closed ({stats.offered + stats.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <BriefcaseIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No applications found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "all"
                    ? "You haven't submitted any applications yet."
                    : `No applications in the ${activeTab} category.`}
                </p>
                <Button asChild>
                  <Link to="/jobs">
                    <BriefcaseIcon className="h-4 w-4 mr-2" />
                    Browse Jobs
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map((application) => (
              <Card
                key={application.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={application.company.logo}
                        alt={application.company.name}
                      />
                      <AvatarFallback>
                        {application.company.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {application.jobTitle}
                          </h3>
                          <p className="text-muted-foreground">
                            {application.company.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1 capitalize">
                              {application.status}
                            </span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            <StarIcon className="h-3 w-3 mr-1" />
                            {application.matchScore}%
                          </Badge>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          {application.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSignIcon className="h-3 w-3" />
                          {application.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {application.workMode}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          Applied {application.appliedAt.toLocaleDateString()}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Application Progress
                          </span>
                          <span className="font-medium">
                            Stage {application.stage}/5
                          </span>
                        </div>
                        <Progress
                          value={getStageProgress(application.stage)}
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Applied</span>
                          <span>Reviewed</span>
                          <span>Interviewed</span>
                          <span>Decision</span>
                          <span>Offer</span>
                        </div>
                      </div>

                      <Separator />

                      {/* Status and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Last activity:{" "}
                            </span>
                            <span className="font-medium">
                              {application.lastActivity}
                            </span>
                          </div>
                          {application.nextStep && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Next step:{" "}
                              </span>
                              <span className="font-medium text-primary">
                                {application.nextStep}
                              </span>
                            </div>
                          )}
                          {application.responseTime && (
                            <div className="text-xs text-muted-foreground">
                              Response time: {application.responseTime}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/jobs/${application.jobId}`}>
                              <EyeIcon className="h-4 w-4 mr-1" />
                              View Job
                            </Link>
                          </Button>
                          {application.status === "interviewed" && (
                            <Button variant="outline" size="sm">
                              <MessageSquareIcon className="h-4 w-4 mr-1" />
                              Follow Up
                            </Button>
                          )}
                          {application.status === "offered" && (
                            <Button size="sm">
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              Review Offer
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Notes */}
                      {application.notes && (
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Notes:{" "}
                            </span>
                            <span>{application.notes}</span>
                          </div>
                        </div>
                      )}

                      {/* Interview Date */}
                      {application.interviewDate &&
                        application.status === "interviewed" && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarIcon className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">
                                Interview scheduled for
                              </span>
                              <span className="text-blue-600">
                                {application.interviewDate.toLocaleDateString()}{" "}
                                at{" "}
                                {application.interviewDate.toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

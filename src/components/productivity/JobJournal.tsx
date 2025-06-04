import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  FileTextIcon,
  PlusIcon,
  DownloadIcon,
  CalendarIcon,
  TrendingUpIcon,
  TargetIcon,
  ClockIcon,
  StarIcon,
  MessageSquareIcon,
  EditIcon,
  FilterIcon,
  BarChart3Icon,
  MapPinIcon,
  BuildingIcon,
  DollarSignIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";

interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  applicationDate: Date;
  status:
    | "applied"
    | "screening"
    | "interview"
    | "offer"
    | "rejected"
    | "withdrawn";
  source: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes: string;
  interviewDates: Date[];
  followUpDates: Date[];
  documents: string[];
  rating: number;
  pros: string[];
  cons: string[];
  nextAction: string;
  deadline?: Date;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  progress: number;
  type: "application" | "skill" | "networking" | "interview";
  priority: "low" | "medium" | "high";
  completed: boolean;
}

interface Analytics {
  totalApplications: number;
  responseRate: number;
  interviewRate: number;
  averageResponseTime: number;
  topSources: Array<{ source: string; count: number }>;
  statusDistribution: Record<string, number>;
  salaryRange: { min: number; max: number; average: number };
  applicationTrend: Array<{ date: string; count: number }>;
}

export default function JobJournal() {
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: "1",
      jobTitle: "Senior React Developer",
      company: "TechCorp Inc.",
      location: "Bangalore",
      salary: "₹15-22 LPA",
      applicationDate: new Date("2024-01-10"),
      status: "interview",
      source: "LinkedIn",
      contactPerson: "Sarah Johnson",
      contactEmail: "sarah@techcorp.com",
      contactPhone: "+91 9876543210",
      notes:
        "Good company culture, exciting project on AI/ML integration. Technical interview scheduled for next week.",
      interviewDates: [new Date("2024-01-15"), new Date("2024-01-18")],
      followUpDates: [new Date("2024-01-12")],
      documents: ["resume.pdf", "cover_letter.pdf"],
      rating: 4,
      pros: ["Good salary", "Learning opportunities", "Remote work"],
      cons: ["Long commute", "Startup uncertainty"],
      nextAction: "Prepare for system design interview",
      deadline: new Date("2024-01-20"),
    },
    {
      id: "2",
      jobTitle: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "₹12-18 LPA",
      applicationDate: new Date("2024-01-08"),
      status: "screening",
      source: "Naukri.com",
      notes:
        "Fast-growing startup, equity options available. HR screening call completed, waiting for technical round.",
      interviewDates: [],
      followUpDates: [new Date("2024-01-16")],
      documents: ["resume.pdf"],
      rating: 5,
      pros: ["Equity options", "Fast growth", "Remote work"],
      cons: ["Lower base salary", "High pressure environment"],
      nextAction: "Follow up on technical interview schedule",
      deadline: new Date("2024-01-17"),
    },
    {
      id: "3",
      jobTitle: "Frontend Developer",
      company: "Enterprise Corp",
      location: "Mumbai",
      salary: "₹10-15 LPA",
      applicationDate: new Date("2024-01-05"),
      status: "rejected",
      source: "Company Website",
      notes:
        "Position filled internally. Good learning experience for future applications.",
      interviewDates: [],
      followUpDates: [],
      documents: ["resume.pdf", "portfolio.pdf"],
      rating: 3,
      pros: ["Stable company", "Good benefits"],
      cons: ["Lower salary", "Traditional environment"],
      nextAction: "Apply to similar roles",
    },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Apply to 20 jobs this month",
      description: "Target 20 quality applications across different platforms",
      deadline: new Date("2024-01-31"),
      progress: 65,
      type: "application",
      priority: "high",
      completed: false,
    },
    {
      id: "2",
      title: "Complete React certification",
      description: "Finish React Developer certification to strengthen profile",
      deadline: new Date("2024-02-15"),
      progress: 30,
      type: "skill",
      priority: "medium",
      completed: false,
    },
    {
      id: "3",
      title: "Network with 10 professionals",
      description: "Connect with industry professionals on LinkedIn",
      deadline: new Date("2024-01-25"),
      progress: 80,
      type: "networking",
      priority: "medium",
      completed: false,
    },
  ]);

  const [showNewApplication, setShowNewApplication] = useState(false);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  const analytics: Analytics = {
    totalApplications: applications.length,
    responseRate: 67,
    interviewRate: 33,
    averageResponseTime: 5.2,
    topSources: [
      { source: "LinkedIn", count: 8 },
      { source: "Naukri.com", count: 6 },
      { source: "Company Website", count: 4 },
    ],
    statusDistribution: {
      applied: 5,
      screening: 3,
      interview: 2,
      offer: 1,
      rejected: 2,
    },
    salaryRange: { min: 800000, max: 2200000, average: 1500000 },
    applicationTrend: [
      { date: "Week 1", count: 3 },
      { date: "Week 2", count: 5 },
      { date: "Week 3", count: 4 },
      { date: "Week 4", count: 6 },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "screening":
        return "bg-yellow-100 text-yellow-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "offer":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "withdrawn":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      case "low":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  const addNewApplication = () => {
    // Mock adding new application
    toast({
      title: "Application Added",
      description: "Your job application has been added to your journal.",
    });
    setShowNewApplication(false);
  };

  const addNewGoal = () => {
    // Mock adding new goal
    toast({
      title: "Goal Created",
      description: "Your new goal has been added to your tracker.",
    });
    setShowNewGoal(false);
  };

  const exportToPDF = () => {
    toast({
      title: "Exporting PDF...",
      description: "Your job journal is being prepared for download.",
    });
    // Mock PDF export
    setTimeout(() => {
      toast({
        title: "PDF Downloaded",
        description:
          "Your complete job journal has been downloaded successfully.",
      });
    }, 2000);
  };

  const formatSalary = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const filteredApplications = applications.filter(
    (app) => filterStatus === "all" || app.status === filterStatus,
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Search Journal</h1>
            <p className="text-muted-foreground">
              Track your job applications, progress, and insights in one
              organized place
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportToPDF}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Dialog
              open={showNewApplication}
              onOpenChange={setShowNewApplication}
            >
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Application
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Job Application</DialogTitle>
                  <DialogDescription>
                    Record a new job application to track your progress
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Title *</label>
                      <Input placeholder="e.g., Senior React Developer" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company *</label>
                      <Input placeholder="e.g., TechCorp Inc." />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input placeholder="e.g., Bangalore" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Salary Range
                      </label>
                      <Input placeholder="e.g., ₹15-22 LPA" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Application Date
                      </label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Source</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="naukri">Naukri.com</SelectItem>
                          <SelectItem value="company">
                            Company Website
                          </SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea
                      placeholder="Add any notes about this application..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating (1-5)</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Rate this opportunity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Low Interest</SelectItem>
                        <SelectItem value="2">
                          2 - Somewhat Interested
                        </SelectItem>
                        <SelectItem value="3">
                          3 - Moderately Interested
                        </SelectItem>
                        <SelectItem value="4">4 - Very Interested</SelectItem>
                        <SelectItem value="5">5 - Dream Job</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={addNewApplication}>Add Application</Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewApplication(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {analytics.totalApplications}
              </div>
              <p className="text-sm text-muted-foreground">
                Total Applications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {analytics.responseRate}%
              </div>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {analytics.interviewRate}%
              </div>
              <p className="text-sm text-muted-foreground">Interview Rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {analytics.averageResponseTime}d
              </div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {formatSalary(analytics.salaryRange.average)}
              </div>
              <p className="text-sm text-muted-foreground">Avg Target Salary</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Badge variant="outline">
                {filteredApplications.length} applications
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredApplications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">
                              {app.jobTitle}
                            </h3>
                            <Badge
                              className={getStatusColor(app.status)}
                              variant="secondary"
                            >
                              {app.status}
                            </Badge>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < app.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BuildingIcon className="h-4 w-4" />
                              {app.company}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="h-4 w-4" />
                              {app.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSignIcon className="h-4 w-4" />
                              {app.salary}
                            </div>
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              {app.applicationDate.toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquareIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {app.contactPerson && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-medium text-sm mb-2">
                            Contact Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {app.contactPerson}
                              </span>
                            </div>
                            {app.contactEmail && (
                              <div className="flex items-center gap-1">
                                <MailIcon className="h-3 w-3" />
                                {app.contactEmail}
                              </div>
                            )}
                            {app.contactPhone && (
                              <div className="flex items-center gap-1">
                                <PhoneIcon className="h-3 w-3" />
                                {app.contactPhone}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">
                          Notes & Observations
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {app.notes}
                        </p>
                      </div>

                      {app.pros.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Pros & Cons</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-xs font-medium text-green-600 mb-1">
                                Pros
                              </h5>
                              <ul className="space-y-1">
                                {app.pros.map((pro, index) => (
                                  <li
                                    key={index}
                                    className="text-sm flex items-center gap-2"
                                  >
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-xs font-medium text-red-600 mb-1">
                                Cons
                              </h5>
                              <ul className="space-y-1">
                                {app.cons.map((con, index) => (
                                  <li
                                    key={index}
                                    className="text-sm flex items-center gap-2"
                                  >
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {app.nextAction && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="font-medium text-sm text-blue-800 mb-1">
                            Next Action
                          </h4>
                          <p className="text-sm text-blue-700">
                            {app.nextAction}
                          </p>
                          {app.deadline && (
                            <p className="text-xs text-blue-600 mt-1">
                              Deadline: {app.deadline.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Goals & Targets</h2>
              <Dialog open={showNewGoal} onOpenChange={setShowNewGoal}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                    <DialogDescription>
                      Set a new goal to track your job search progress
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Goal title..." />
                    <Textarea placeholder="Goal description..." rows={3} />
                    <Input type="date" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Goal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="application">
                          Application Goal
                        </SelectItem>
                        <SelectItem value="skill">Skill Development</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="interview">
                          Interview Prep
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button onClick={addNewGoal}>Create Goal</Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowNewGoal(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`border-l-4 ${getPriorityColor(goal.priority)}`}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="capitalize">
                            {goal.type}
                          </Badge>
                          <Badge
                            variant={
                              goal.priority === "high"
                                ? "destructive"
                                : goal.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {goal.priority}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {goal.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>Due: {goal.deadline.toLocaleDateString()}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Update Progress
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topSources.map((source, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium">{source.source}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20">
                            <Progress
                              value={
                                (source.count / analytics.totalApplications) *
                                100
                              }
                            />
                          </div>
                          <span className="text-sm font-semibold">
                            {source.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.statusDistribution).map(
                      ([status, count]) => (
                        <div
                          key={status}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Badge
                              className={getStatusColor(status)}
                              variant="secondary"
                            >
                              {status}
                            </Badge>
                          </div>
                          <span className="font-semibold">{count}</span>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Salary Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatSalary(analytics.salaryRange.min)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Minimum Target
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatSalary(analytics.salaryRange.average)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Average Target
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatSalary(analytics.salaryRange.max)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maximum Target
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Interview Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border-l-4 border-blue-500 pl-3">
                        <h4 className="font-medium">System Design Interview</h4>
                        <p className="text-sm text-muted-foreground">
                          TechCorp Inc.
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Jan 18, 2024 - 2:00 PM
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-3">
                        <h4 className="font-medium">Follow-up Call</h4>
                        <p className="text-sm text-muted-foreground">
                          StartupXYZ
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Jan 16, 2024 - 11:00 AM
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border-l-4 border-red-500 pl-3">
                        <h4 className="font-medium">Interview Prep</h4>
                        <p className="text-sm text-muted-foreground">
                          System Design Review
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Due: Jan 20, 2024
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

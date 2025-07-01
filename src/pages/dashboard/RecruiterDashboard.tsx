import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart3,
  Users,
  BriefcaseIcon,
  TrendingUp,
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
  DownloadIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  MoreHorizontalIcon,
  BuildingIcon,
  UserIcon,
  SettingsIcon,
  BellIcon,
  FileTextIcon,
  PhoneIcon,
  MailIcon,
  TrendingDownIcon,
  ClockIcon as Clock,
  Calendar,
  Users2Icon,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const mockStats = {
  totalJobs: 12,
  totalApplications: 247,
  jobsFilled: 8,
  responseRate: 89,
  avgTimeToHire: 18,
  activeInterviews: 15,
};

const mockJobs = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    postedDate: "2024-01-15",
    applications: 45,
    status: "Open",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    type: "Full-time",
    description: "We're looking for an experienced full stack developer...",
  },
  {
    id: "2",
    title: "UX/UI Designer",
    postedDate: "2024-01-10",
    applications: 32,
    status: "Open",
    location: "Remote",
    salary: "$90k - $120k",
    type: "Full-time",
    description: "Join our design team to create amazing user experiences...",
  },
  {
    id: "3",
    title: "Data Scientist",
    postedDate: "2024-01-08",
    applications: 28,
    status: "Closed",
    location: "New York, NY",
    salary: "$110k - $140k",
    type: "Full-time",
    description: "Help us derive insights from complex datasets...",
  },
];

const mockApplicants = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    jobTitle: "Senior Full Stack Developer",
    matchScore: 92,
    experience: "5 years",
    skills: ["React", "Node.js", "Python", "AWS"],
    status: "Shortlisted",
    appliedDate: "2024-01-20",
    resumeUrl: "/resumes/sarah-johnson.pdf",
    location: "San Francisco, CA",
    salary: "$150k",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    jobTitle: "UX/UI Designer",
    matchScore: 88,
    experience: "3 years",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    status: "Interview",
    appliedDate: "2024-01-18",
    resumeUrl: "/resumes/michael-chen.pdf",
    location: "Remote",
    salary: "$110k",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    jobTitle: "Data Scientist",
    matchScore: 95,
    experience: "4 years",
    skills: ["Python", "R", "Machine Learning", "SQL"],
    status: "Rejected",
    appliedDate: "2024-01-16",
    resumeUrl: "/resumes/emily-rodriguez.pdf",
    location: "New York, NY",
    salary: "$130k",
  },
];

const sidebarItems = [
  { id: "overview", label: "Dashboard", icon: BarChart3 },
  { id: "jobs", label: "Job Posts", icon: BriefcaseIcon },
  { id: "applicants", label: "Applicants", icon: Users },
  { id: "company", label: "Company Profile", icon: BuildingIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

  // Handle URL parameters for section navigation
  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const handleSelectApplicant = (applicantId: string) => {
    setSelectedApplicants((prev) =>
      prev.includes(applicantId)
        ? prev.filter((id) => id !== applicantId)
        : [...prev, applicantId],
    );
  };

  const handleSelectAllApplicants = () => {
    setSelectedApplicants(
      selectedApplicants.length === mockApplicants.length
        ? []
        : mockApplicants.map((a) => a.id),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "shortlisted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "interview":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesSearch = applicant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      applicant.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Here's your recruitment overview.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link to="#" onClick={() => setIsNewJobModalOpen(true)}>
            <PlusCircleIcon className="w-4 h-4 mr-2" />
            Post New Job
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Jobs
                </p>
                <p className="text-2xl font-bold">{mockStats.totalJobs}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3 this month
                </p>
              </div>
              <BriefcaseIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Applications
                </p>
                <p className="text-2xl font-bold">
                  {mockStats.totalApplications}
                </p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +18% this week
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Jobs Filled
                </p>
                <p className="text-2xl font-bold">{mockStats.jobsFilled}</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <Target className="w-3 h-3 mr-1" />
                  67% success rate
                </p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Time to Hire
                </p>
                <p className="text-2xl font-bold">
                  {mockStats.avgTimeToHire} days
                </p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingDownIcon className="w-3 h-3 mr-1" />
                  -2 days improved
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Applications</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveSection("applicants")}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockApplicants.slice(0, 3).map((applicant) => (
                <div
                  key={applicant.id}
                  className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {applicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{applicant.name}</h4>
                      <Badge className={getStatusColor(applicant.status)}>
                        {applicant.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {applicant.jobTitle}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <StarIcon className="h-3 w-3" />
                        {applicant.matchScore}%
                      </span>
                      <span>{applicant.experience}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                onClick={() => setIsNewJobModalOpen(true)}
              >
                <PlusCircleIcon className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => setActiveSection("applicants")}
              >
                <SearchIcon className="w-4 h-4 mr-2" />
                Review Applications
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => setActiveSection("company")}
              >
                <BuildingIcon className="w-4 h-4 mr-2" />
                Update Company Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Applications</span>
                  <span className="font-medium">67/100</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Response Rate</span>
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
    </div>
  );

  const renderJobPosts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Job Posts</h1>
          <p className="text-muted-foreground">
            Manage your job listings and track their performance
          </p>
        </div>
        <Button
          onClick={() => setIsNewJobModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <PlusCircleIcon className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Posted Date
                  </TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {job.location} • {job.salary}
                        </div>
                        <div className="text-sm text-muted-foreground hidden md:block">
                          {job.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.applications}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <EyeIcon className="mr-2 h-4 w-4" />
                            View Applicants
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <EditIcon className="mr-2 h-4 w-4" />
                            Edit Job
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CopyIcon className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderApplicants = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Applicants</h1>
          <p className="text-muted-foreground">
            Review and manage candidate applications
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedApplicants.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedApplicants.length} applicant(s) selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Download Resumes
                </Button>
                <Button size="sm" variant="outline">
                  <MailIcon className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button size="sm">Update Status</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedApplicants.length === mockApplicants.length
                      }
                      onCheckedChange={handleSelectAllApplicants}
                    />
                  </TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Match %
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Experience
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Skills</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedApplicants.includes(applicant.id)}
                        onCheckedChange={() =>
                          handleSelectApplicant(applicant.id)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {applicant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{applicant.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {applicant.jobTitle}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700"
                      >
                        <StarIcon className="h-3 w-3 mr-1" />
                        {applicant.matchScore}%
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {applicant.experience}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.slice(0, 3).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {applicant.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{applicant.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(applicant.status)}>
                        {applicant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquareIcon className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>
                              Schedule Interview
                            </DropdownMenuItem>
                            <DropdownMenuItem>Shortlist</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCompanyProfile = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Company Profile</h1>
        <p className="text-muted-foreground">
          Manage your company information and branding
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="Tech Innovators Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">
                        201-1000 employees
                      </SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="San Francisco, CA" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell candidates about your company..."
                    rows={4}
                  />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" placeholder="hr@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <Button>Update Contact Info</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <BuildingIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">Upload logo</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Upload New Logo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Completeness</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  <span>Company information</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  <span>Contact details</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-yellow-600" />
                  <span>Company logo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated with application alerts and system updates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: 1,
                  type: "application",
                  title: "New application received",
                  message:
                    "Sarah Johnson applied for Senior Full Stack Developer",
                  time: "2 hours ago",
                  read: false,
                },
                {
                  id: 2,
                  type: "interview",
                  title: "Interview scheduled",
                  message: "Interview with Michael Chen scheduled for tomorrow",
                  time: "4 hours ago",
                  read: false,
                },
                {
                  id: 3,
                  type: "system",
                  title: "Job post expired",
                  message: "Your job post 'UX Designer' has expired",
                  time: "1 day ago",
                  read: true,
                },
              ].map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 p-4 border rounded-lg",
                    !notification.read && "bg-blue-50 dark:bg-blue-950",
                  )}
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  <div className="flex-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Checkbox id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Checkbox id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Checkbox id="sms-notifications" />
              </div>
              <Button variant="outline" className="w-full">
                Update Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and platform preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="HR Manager" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">Change Password</Button>
              <Button variant="outline">
                Enable Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Standard Time</SelectItem>
                    <SelectItem value="est">Eastern Standard Time</SelectItem>
                    <SelectItem value="cst">Central Standard Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full">
                Update Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "jobs":
        return renderJobPosts();
      case "applicants":
        return renderApplicants();
      case "company":
        return renderCompanyProfile();
      case "notifications":
        return renderNotifications();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main content */}
      <main className="w-full">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">{renderContent()}</div>
      </main>

      {/* New Job Modal */}
      <Dialog open={isNewJobModalOpen} onOpenChange={setIsNewJobModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <DialogDescription>
              Create a new job posting to attract the best candidates
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobLocation">Location</Label>
                <Input id="jobLocation" placeholder="e.g. San Francisco, CA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input id="salary" placeholder="e.g. $120k - $160k" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Input id="skills" placeholder="e.g. React, Node.js, Python" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  rows={6}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsNewJobModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsNewJobModalOpen(false)}>
                Post Job
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

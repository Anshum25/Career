import { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookmarkIcon,
  SearchIcon,
  FilterIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  BriefcaseIcon,
  StarIcon,
  EyeIcon,
  TrashIcon,
  HeartIcon,
  ExternalLinkIcon,
  CalendarIcon,
  SortAscIcon,
} from "lucide-react";
import { Job } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface SavedJob extends Job {
  savedAt: Date;
  notes?: string;
  priority: "high" | "medium" | "low";
  applicationStatus:
    | "not_applied"
    | "applied"
    | "interviewing"
    | "offered"
    | "rejected";
}

export default function SavedJobs() {
  const { toast } = useToast();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("savedAt");
  const [filterBy, setFilterBy] = useState("all");
  const [loading, setLoading] = useState(true);

  // Load saved jobs from localStorage on component mount
  useEffect(() => {
    const loadSavedJobs = () => {
      try {
        const saved = localStorage.getItem("savedJobs");
        if (saved) {
          const jobs = JSON.parse(saved).map((job: any) => ({
            ...job,
            savedAt: new Date(job.savedAt),
            postedAt: new Date(job.postedAt),
          }));
          setSavedJobs(jobs);
        }
      } catch (error) {
        console.error("Error loading saved jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedJobs();
  }, []);

  // Save to localStorage whenever savedJobs changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    }
  }, [savedJobs, loading]);

  const removeJob = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
    toast({
      title: "Job Removed",
      description: "Job has been removed from your saved list.",
    });
  };

  const updateJobPriority = (
    jobId: string,
    priority: "high" | "medium" | "low",
  ) => {
    setSavedJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, priority } : job)),
    );
  };

  const updateApplicationStatus = (
    jobId: string,
    status: SavedJob["applicationStatus"],
  ) => {
    setSavedJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, applicationStatus: status } : job,
      ),
    );
  };

  const addNoteToJob = (jobId: string, notes: string) => {
    setSavedJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, notes } : job)),
    );
  };

  // Filter and sort jobs
  const filteredAndSortedJobs = savedJobs
    .filter((job) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (
          !job.title.toLowerCase().includes(searchLower) &&
          !job.company.name.toLowerCase().includes(searchLower) &&
          !job.location.city.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      if (filterBy !== "all") {
        if (filterBy === "high_priority" && job.priority !== "high")
          return false;
        if (
          filterBy === "not_applied" &&
          job.applicationStatus !== "not_applied"
        )
          return false;
        if (filterBy === "applied" && job.applicationStatus !== "applied")
          return false;
        if (
          filterBy === "recent" &&
          new Date().getTime() - job.savedAt.getTime() > 7 * 24 * 60 * 60 * 1000
        )
          return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "savedAt":
          return b.savedAt.getTime() - a.savedAt.getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "company":
          return a.company.name.localeCompare(b.company.name);
        case "salary":
          return b.salary.max - a.salary.max;
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not_applied":
        return "text-gray-600 bg-gray-50";
      case "applied":
        return "text-blue-600 bg-blue-50";
      case "interviewing":
        return "text-purple-600 bg-purple-50";
      case "offered":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookmarkIcon className="h-8 w-8" />
            Saved Jobs
          </h1>
          <p className="text-muted-foreground">
            {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved for
            later
          </p>
        </div>
      </div>

      {savedJobs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookmarkIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No saved jobs yet</h3>
            <p className="text-muted-foreground mb-6">
              Start exploring jobs and save the ones you're interested in for
              later
            </p>
            <Button asChild>
              <Link to="/jobs">
                <SearchIcon className="h-4 w-4 mr-2" />
                Browse Jobs
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter & Sort</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search saved jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Filter by</label>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All jobs</SelectItem>
                      <SelectItem value="high_priority">
                        High priority
                      </SelectItem>
                      <SelectItem value="not_applied">Not applied</SelectItem>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="recent">Saved recently</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savedAt">Date saved</SelectItem>
                      <SelectItem value="title">Job title</SelectItem>
                      <SelectItem value="company">Company name</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAndSortedJobs.length} of {savedJobs.length} saved
              jobs
            </p>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {filteredAndSortedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={job.company.logo}
                        alt={job.company.name}
                      />
                      <AvatarFallback>{job.company.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg hover:text-primary">
                            <Link
                              to={`/jobs/${job.id}`}
                              className="flex items-center gap-1"
                            >
                              {job.title}
                              <ExternalLinkIcon className="h-4 w-4" />
                            </Link>
                          </h3>
                          <p className="text-muted-foreground">
                            {job.company.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(job.priority)}>
                            {job.priority} priority
                          </Badge>
                          <Badge
                            className={getStatusColor(job.applicationStatus)}
                          >
                            {job.applicationStatus.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          {job.location.city}, {job.location.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSignIcon className="h-3 w-3" />$
                          {job.salary.min / 1000}k - ${job.salary.max / 1000}k
                        </span>
                        <span className="flex items-center gap-1">
                          <BriefcaseIcon className="h-3 w-3" />
                          {job.jobType.replace("_", " ")}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {job.workMode}
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 5).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 5} more
                          </Badge>
                        )}
                      </div>

                      {/* Notes */}
                      {job.notes && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm italic">"{job.notes}"</p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookmarkIcon className="h-3 w-3" />
                            Saved {formatDistanceToNow(job.savedAt)} ago
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            Posted {formatDistanceToNow(job.postedAt)} ago
                          </span>
                          {job.matchScore && (
                            <span className="flex items-center gap-1">
                              <StarIcon className="h-3 w-3" />
                              {job.matchScore}% match
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Priority Selector */}
                          <Select
                            value={job.priority}
                            onValueChange={(value) =>
                              updateJobPriority(job.id, value as any)
                            }
                          >
                            <SelectTrigger className="w-auto h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>

                          {/* Status Selector */}
                          <Select
                            value={job.applicationStatus}
                            onValueChange={(value) =>
                              updateApplicationStatus(job.id, value as any)
                            }
                          >
                            <SelectTrigger className="w-auto h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="not_applied">
                                Not Applied
                              </SelectItem>
                              <SelectItem value="applied">Applied</SelectItem>
                              <SelectItem value="interviewing">
                                Interviewing
                              </SelectItem>
                              <SelectItem value="offered">Offered</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>

                          {/* Apply Button */}
                          {job.applicationStatus === "not_applied" && (
                            <Button size="sm" asChild>
                              <Link to={`/jobs/${job.id}/apply`}>
                                Apply Now
                              </Link>
                            </Button>
                          )}

                          {/* Remove Button */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeJob(job.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  SearchIcon,
  MapPinIcon,
  FilterIcon,
  SortAscIcon,
  BookmarkIcon,
  ClockIcon,
  DollarSignIcon,
  BriefcaseIcon,
  BuildingIcon,
  StarIcon,
  EyeIcon,
  TrendingUpIcon,
  MapIcon,
  ListIcon,
  RefreshCwIcon,
} from "lucide-react";
import { mockJobs } from "@/lib/mockData";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import JobMap from "@/components/maps/JobMap";

export default function JobSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [viewMode, setViewMode] = useState(searchParams.get("view") || "list");
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState({
    jobTypes: [] as string[],
    workModes: [] as string[],
    experienceLevels: [] as string[],
    salaryRange: [0, 200000],
    companies: [] as string[],
    skills: [] as string[],
    postedWithin: "all",
  });

  // Update URL params when search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("location", location);
    if (viewMode !== "list") params.set("view", viewMode);
    setSearchParams(params);
  }, [searchQuery, location, viewMode, setSearchParams]);

  // Filter jobs based on search criteria
  useEffect(() => {
    let filtered = jobs;

    // Text search
    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Location filter
    if (location) {
      filtered = filtered.filter(
        (job) =>
          job.location.city.toLowerCase().includes(location.toLowerCase()) ||
          job.location.state.toLowerCase().includes(location.toLowerCase()),
      );
    }

    // Job type filter
    if (filters.jobTypes.length > 0) {
      filtered = filtered.filter((job) =>
        filters.jobTypes.includes(job.jobType),
      );
    }

    // Work mode filter
    if (filters.workModes.length > 0) {
      filtered = filtered.filter((job) =>
        filters.workModes.includes(job.workMode),
      );
    }

    // Experience level filter
    if (filters.experienceLevels.length > 0) {
      filtered = filtered.filter((job) =>
        filters.experienceLevels.includes(job.experienceLevel),
      );
    }

    // Salary range filter
    filtered = filtered.filter(
      (job) =>
        job.salary.min >= filters.salaryRange[0] &&
        job.salary.max <= filters.salaryRange[1],
    );

    // Posted within filter
    if (filters.postedWithin !== "all") {
      const days = parseInt(filters.postedWithin);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      filtered = filtered.filter((job) => job.postedAt >= cutoff);
    }

    // Sort results
    switch (sortBy) {
      case "relevance":
        filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        break;
      case "date":
        filtered.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
        break;
      case "salary_high":
        filtered.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case "salary_low":
        filtered.sort((a, b) => a.salary.min - b.salary.min);
        break;
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, location, filters, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const clearFilters = () => {
    setFilters({
      jobTypes: [],
      workModes: [],
      experienceLevels: [],
      salaryRange: [0, 200000],
      companies: [],
      skills: [],
      postedWithin: "all",
    });
    setSearchQuery("");
    setLocation("");
  };

  const quickFilters = [
    { label: "Remote", value: "remote", type: "workMode" },
    { label: "Full-time", value: "full_time", type: "jobType" },
    { label: "Senior Level", value: "senior", type: "experienceLevel" },
    { label: "High Salary ($100k+)", value: "high_salary", type: "custom" },
    { label: "Recently Posted", value: "7", type: "postedWithin" },
  ];

  const handleQuickFilter = (filter: any) => {
    if (filter.type === "workMode") {
      setFilters((prev) => ({
        ...prev,
        workModes: prev.workModes.includes(filter.value)
          ? prev.workModes.filter((w) => w !== filter.value)
          : [...prev.workModes, filter.value],
      }));
    } else if (filter.type === "jobType") {
      setFilters((prev) => ({
        ...prev,
        jobTypes: prev.jobTypes.includes(filter.value)
          ? prev.jobTypes.filter((t) => t !== filter.value)
          : [...prev.jobTypes, filter.value],
      }));
    } else if (filter.type === "experienceLevel") {
      setFilters((prev) => ({
        ...prev,
        experienceLevels: prev.experienceLevels.includes(filter.value)
          ? prev.experienceLevels.filter((l) => l !== filter.value)
          : [...prev.experienceLevels, filter.value],
      }));
    } else if (filter.type === "custom" && filter.value === "high_salary") {
      setFilters((prev) => ({
        ...prev,
        salaryRange: [100000, 200000],
      }));
    } else if (filter.type === "postedWithin") {
      setFilters((prev) => ({
        ...prev,
        postedWithin: filter.value,
      }));
    }
  };

  return (
    <div className="container py-6">
      {/* Search Header */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search jobs, skills, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative min-w-[200px]">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickFilter(filter)}
              className={`${
                (filter.type === "workMode" &&
                  filters.workModes.includes(filter.value)) ||
                (filter.type === "jobType" &&
                  filters.jobTypes.includes(filter.value)) ||
                (filter.type === "experienceLevel" &&
                  filters.experienceLevels.includes(filter.value)) ||
                (filter.type === "postedWithin" &&
                  filters.postedWithin === filter.value) ||
                (filter.type === "custom" &&
                  filter.value === "high_salary" &&
                  filters.salaryRange[0] >= 100000)
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              {filter.label}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <RefreshCwIcon className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        </div>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">
              {filteredJobs.length} Jobs Found
            </h2>
            {(searchQuery || location) && (
              <div className="text-muted-foreground">
                {searchQuery && `for "${searchQuery}"`}
                {searchQuery && location && " "}
                {location && `in ${location}`}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="date">Most Recent</SelectItem>
                <SelectItem value="salary_high">Salary: High to Low</SelectItem>
                <SelectItem value="salary_low">Salary: Low to High</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-r-none"
              >
                <ListIcon className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="rounded-l-none"
              >
                <MapIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <JobFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {viewMode === "list" ? (
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No jobs found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or filters
                    </p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </CardContent>
                </Card>
              ) : (
                filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
              )}
            </div>
          ) : (
            <JobMap jobs={filteredJobs} />
          )}
        </div>
      </div>
    </div>
  );
}

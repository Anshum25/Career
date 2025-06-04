import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  SearchIcon,
  TrendingUpIcon,
  ZapIcon,
  StarIcon,
  TargetIcon,
  BrainIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  PlusIcon,
  EyeIcon,
  BookmarkeIcon,
  BriefcaseIcon,
  MapPinIcon,
  DollarSignIcon,
  ClockIcon,
  FilterIcon,
} from "lucide-react";

interface SkillMatch {
  skill: string;
  userLevel: number;
  requiredLevel: number;
  match: boolean;
  importance: "critical" | "important" | "nice-to-have";
  category: "technical" | "soft" | "domain";
}

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  remote: boolean;
  matchPercentage: number;
  skillsMatch: SkillMatch[];
  missingSkills: string[];
  strongPoints: string[];
  description: string;
  requirements: string[];
  postedDate: string;
  applicants: number;
  type: "full-time" | "part-time" | "contract";
}

interface UserProfile {
  skills: Array<{
    name: string;
    level: number;
    experience: string;
    category: "technical" | "soft" | "domain";
  }>;
  experience: string;
  location: string;
  preferences: {
    salary: { min: number; max: number };
    remote: boolean;
    jobTypes: string[];
  };
}

export default function RealTimeSkillMatcher() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);
  const [filterMatchThreshold, setFilterMatchThreshold] = useState(70);
  const { toast } = useToast();

  const mockUserProfile: UserProfile = {
    skills: [
      {
        name: "React",
        level: 85,
        experience: "3 years",
        category: "technical",
      },
      {
        name: "JavaScript",
        level: 90,
        experience: "4 years",
        category: "technical",
      },
      {
        name: "Node.js",
        level: 75,
        experience: "2 years",
        category: "technical",
      },
      {
        name: "TypeScript",
        level: 70,
        experience: "1.5 years",
        category: "technical",
      },
      {
        name: "Python",
        level: 60,
        experience: "1 year",
        category: "technical",
      },
      { name: "AWS", level: 55, experience: "8 months", category: "technical" },
      {
        name: "Communication",
        level: 88,
        experience: "5 years",
        category: "soft",
      },
      {
        name: "Team Leadership",
        level: 72,
        experience: "2 years",
        category: "soft",
      },
      {
        name: "Problem Solving",
        level: 85,
        experience: "4 years",
        category: "soft",
      },
      {
        name: "E-commerce",
        level: 65,
        experience: "2 years",
        category: "domain",
      },
    ],
    experience: "3 years",
    location: "Bangalore",
    preferences: {
      salary: { min: 800000, max: 1500000 },
      remote: true,
      jobTypes: ["full-time", "contract"],
    },
  };

  const mockJobs: JobMatch[] = [
    {
      id: "1",
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      location: "Bangalore",
      salary: "₹12-18 LPA",
      remote: true,
      matchPercentage: 87,
      skillsMatch: [
        {
          skill: "React",
          userLevel: 85,
          requiredLevel: 80,
          match: true,
          importance: "critical",
          category: "technical",
        },
        {
          skill: "JavaScript",
          userLevel: 90,
          requiredLevel: 85,
          match: true,
          importance: "critical",
          category: "technical",
        },
        {
          skill: "TypeScript",
          userLevel: 70,
          requiredLevel: 75,
          match: false,
          importance: "important",
          category: "technical",
        },
        {
          skill: "Node.js",
          userLevel: 75,
          requiredLevel: 70,
          match: true,
          importance: "important",
          category: "technical",
        },
        {
          skill: "AWS",
          userLevel: 55,
          requiredLevel: 65,
          match: false,
          importance: "nice-to-have",
          category: "technical",
        },
      ],
      missingSkills: ["GraphQL", "Docker", "Kubernetes"],
      strongPoints: [
        "React expertise",
        "Strong JavaScript skills",
        "Good Node.js experience",
      ],
      description:
        "We're looking for a Senior React Developer to join our frontend team...",
      requirements: [
        "3+ years React experience",
        "Strong JavaScript/TypeScript",
        "REST API integration",
        "Git workflow",
      ],
      postedDate: "2024-01-14",
      applicants: 45,
      type: "full-time",
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "₹10-15 LPA",
      remote: true,
      matchPercentage: 78,
      skillsMatch: [
        {
          skill: "React",
          userLevel: 85,
          requiredLevel: 75,
          match: true,
          importance: "critical",
          category: "technical",
        },
        {
          skill: "Node.js",
          userLevel: 75,
          requiredLevel: 80,
          match: false,
          importance: "critical",
          category: "technical",
        },
        {
          skill: "Python",
          userLevel: 60,
          requiredLevel: 70,
          match: false,
          importance: "important",
          category: "technical",
        },
        {
          skill: "AWS",
          userLevel: 55,
          requiredLevel: 60,
          match: false,
          importance: "important",
          category: "technical",
        },
      ],
      missingSkills: ["MongoDB", "Redis", "Microservices"],
      strongPoints: ["Solid React foundation", "Full-stack potential"],
      description: "Join our fast-growing startup as a Full Stack Developer...",
      requirements: [
        "2+ years full-stack experience",
        "React & Node.js",
        "Database design",
        "Cloud deployment",
      ],
      postedDate: "2024-01-13",
      applicants: 28,
      type: "full-time",
    },
    {
      id: "3",
      title: "Frontend Team Lead",
      company: "Enterprise Solutions",
      location: "Mumbai",
      salary: "₹18-25 LPA",
      remote: false,
      matchPercentage: 82,
      skillsMatch: [
        {
          skill: "React",
          userLevel: 85,
          requiredLevel: 85,
          match: true,
          importance: "critical",
          category: "technical",
        },
        {
          skill: "Team Leadership",
          userLevel: 72,
          requiredLevel: 75,
          match: false,
          importance: "critical",
          category: "soft",
        },
        {
          skill: "JavaScript",
          userLevel: 90,
          requiredLevel: 80,
          match: true,
          importance: "important",
          category: "technical",
        },
        {
          skill: "Communication",
          userLevel: 88,
          requiredLevel: 80,
          match: true,
          importance: "important",
          category: "soft",
        },
      ],
      missingSkills: ["Angular", "Team Management", "Architecture Design"],
      strongPoints: [
        "Strong technical leadership potential",
        "Excellent communication",
        "React expertise",
      ],
      description:
        "Lead our frontend team in building next-generation web applications...",
      requirements: [
        "5+ years frontend experience",
        "Team leadership experience",
        "React expertise",
        "Architecture skills",
      ],
      postedDate: "2024-01-12",
      applicants: 67,
      type: "full-time",
    },
  ];

  const searchJobs = async (query: string) => {
    setIsSearching(true);

    // Simulate real-time search with AI matching
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Filter jobs based on match threshold and query
    const filteredJobs = mockJobs.filter(
      (job) =>
        job.matchPercentage >= filterMatchThreshold &&
        (query === "" ||
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase())),
    );

    setJobMatches(filteredJobs);
    setIsSearching(false);

    toast({
      title: "Search Complete",
      description: `Found ${filteredJobs.length} matching jobs based on your skills.`,
    });
  };

  useEffect(() => {
    // Auto-search on load
    searchJobs("");
  }, [filterMatchThreshold]);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 85) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getMatchBadgeColor = (percentage: number) => {
    if (percentage >= 85) return "bg-green-100 text-green-800";
    if (percentage >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getSkillMatchIcon = (match: SkillMatch) => {
    if (match.match)
      return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
    if (match.importance === "critical")
      return <AlertTriangleIcon className="h-4 w-4 text-red-600" />;
    return <AlertTriangleIcon className="h-4 w-4 text-yellow-600" />;
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "critical":
        return "border-red-500 bg-red-50";
      case "important":
        return "border-yellow-500 bg-yellow-50";
      case "nice-to-have":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <BrainIcon className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold">Real-Time Skill Matcher</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered job matching that analyzes your skills in real-time and
            shows exact match percentages for each position using advanced NLP
            algorithms.
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => searchJobs(searchQuery)}
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <ZapIcon className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Match Threshold:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{filterMatchThreshold}%</span>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={filterMatchThreshold}
                    onChange={(e) =>
                      setFilterMatchThreshold(parseInt(e.target.value))
                    }
                    className="w-20"
                  />
                </div>
              </div>
              <Badge variant="outline">{jobMatches.length} jobs found</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job List */}
          <div className="lg:col-span-2 space-y-4">
            {jobMatches.map((job) => (
              <Card
                key={job.id}
                className={`cursor-pointer transition-all ${selectedJob?.id === job.id ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
              >
                <CardContent
                  className="p-6"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <Badge
                            className={getMatchBadgeColor(job.matchPercentage)}
                          >
                            {job.matchPercentage}% Match
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium">{job.company}</span>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="h-4 w-4" />
                            {job.location}
                          </div>
                          {job.remote && (
                            <Badge variant="secondary">Remote</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <DollarSignIcon className="h-4 w-4" />
                            <span className="font-medium">{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>{job.postedDate}</span>
                          </div>
                          <span className="text-muted-foreground">
                            {job.applicants} applicants
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${getMatchColor(job.matchPercentage)}`}
                        >
                          {job.matchPercentage}%
                        </div>
                        <Progress
                          value={job.matchPercentage}
                          className="w-20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Top Skills Match:</h4>
                      <div className="flex flex-wrap gap-1">
                        {job.skillsMatch.slice(0, 4).map((skill, index) => (
                          <Badge
                            key={index}
                            variant={skill.match ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {skill.skill} {skill.userLevel}%
                          </Badge>
                        ))}
                        {job.skillsMatch.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skillsMatch.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button size="sm">Apply Now</Button>
                        <Button size="sm" variant="outline">
                          <BookmarkeIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button size="sm" variant="ghost">
                        <EyeIcon className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Job Analysis */}
          <div className="space-y-6">
            {selectedJob ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TargetIcon className="h-5 w-5" />
                      Match Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold ${getMatchColor(selectedJob.matchPercentage)}`}
                      >
                        {selectedJob.matchPercentage}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Overall Match
                      </p>
                      <Progress
                        value={selectedJob.matchPercentage}
                        className="mt-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Strong Points:</h4>
                      <ul className="space-y-1">
                        {selectedJob.strongPoints.map((point, index) => (
                          <li
                            key={index}
                            className="text-sm flex items-start gap-2"
                          >
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Skills to Improve:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedJob.missingSkills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            <PlusIcon className="h-3 w-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skill Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedJob.skillsMatch.map((skill, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-l-4 ${getImportanceColor(skill.importance)}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getSkillMatchIcon(skill)}
                            <span className="font-medium">{skill.skill}</span>
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {skill.importance}
                            </Badge>
                          </div>
                          <span className="text-sm font-semibold">
                            {skill.userLevel}/{skill.requiredLevel}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Your Level</span>
                            <span>Required</span>
                          </div>
                          <div className="relative">
                            <Progress
                              value={(skill.userLevel / 100) * 100}
                              className="h-2"
                            />
                            <div
                              className="absolute top-0 h-2 w-1 bg-red-500 rounded"
                              style={{ left: `${skill.requiredLevel}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Recommended Actions:
                      </h4>
                      {selectedJob.skillsMatch
                        .filter(
                          (skill) =>
                            !skill.match && skill.importance === "critical",
                        )
                        .map((skill, index) => (
                          <div
                            key={index}
                            className="text-sm bg-red-50 p-2 rounded"
                          >
                            <p className="font-medium">
                              Urgent: Improve {skill.skill}
                            </p>
                            <p className="text-muted-foreground">
                              Gap: {skill.requiredLevel - skill.userLevel}{" "}
                              points
                            </p>
                          </div>
                        ))}

                      {selectedJob.missingSkills
                        .slice(0, 2)
                        .map((skill, index) => (
                          <div
                            key={index}
                            className="text-sm bg-yellow-50 p-2 rounded"
                          >
                            <p className="font-medium">Learn: {skill}</p>
                            <p className="text-muted-foreground">
                              This skill appears in the job requirements
                            </p>
                          </div>
                        ))}
                    </div>

                    <Button className="w-full" size="sm">
                      <TrendingUpIcon className="h-4 w-4 mr-2" />
                      Get Learning Path
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <TargetIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Select a Job</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on a job to see detailed skill analysis and match
                    breakdown
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* User Profile Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StarIcon className="h-5 w-5" />
              Your Skills Profile
            </CardTitle>
            <CardDescription>
              Update your skills and levels to get better job matches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="technical" className="space-y-4">
              <TabsList>
                <TabsTrigger value="technical">Technical Skills</TabsTrigger>
                <TabsTrigger value="soft">Soft Skills</TabsTrigger>
                <TabsTrigger value="domain">Domain Knowledge</TabsTrigger>
              </TabsList>

              {["technical", "soft", "domain"].map((category) => (
                <TabsContent
                  key={category}
                  value={category}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockUserProfile.skills
                      .filter((skill) => skill.category === category)
                      .map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <Badge variant="outline">{skill.level}%</Badge>
                          </div>
                          <Progress value={skill.level} />
                          <p className="text-xs text-muted-foreground">
                            {skill.experience} experience
                          </p>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

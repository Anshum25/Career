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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  ZapIcon,
  FileTextIcon,
  SendIcon,
  BrainIcon,
  CheckCircleIcon,
  ClockIcon,
  TargetIcon,
  SettingsIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
  AlertTriangleIcon,
  BookmarkIcon,
  FilterIcon,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "full-time" | "part-time" | "contract";
  matchScore: number;
  requirements: string[];
  description: string;
  applicationUrl: string;
  appliedAt?: Date;
  status: "pending" | "applying" | "applied" | "failed";
  coverLetter?: string;
}

interface AutoApplySettings {
  enabled: boolean;
  minMatchScore: number;
  maxApplicationsPerDay: number;
  customCoverLetter: boolean;
  coverLetterTemplate: string;
  jobTypes: string[];
  salaryRange: { min: number; max: number };
  excludeCompanies: string[];
  onlyRemote: boolean;
  applicationDelay: number; // seconds between applications
}

export default function OneClickAutoApply() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [isAutoApplying, setIsAutoApplying] = useState(false);
  const [applicationProgress, setApplicationProgress] = useState(0);
  const [settings, setSettings] = useState<AutoApplySettings>({
    enabled: false,
    minMatchScore: 75,
    maxApplicationsPerDay: 20,
    customCoverLetter: true,
    coverLetterTemplate:
      "Dear Hiring Manager,\n\nI am excited to apply for the {jobTitle} position at {companyName}. With my {experience} years of experience in {skills}, I am confident I would be a valuable addition to your team.\n\n{customParagraph}\n\nI look forward to hearing from you.\n\nBest regards,\n{userName}",
    jobTypes: ["full-time", "contract"],
    salaryRange: { min: 800000, max: 2000000 },
    excludeCompanies: [],
    onlyRemote: false,
    applicationDelay: 30,
  });

  const [jobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      location: "Bangalore",
      salary: "₹15-22 LPA",
      type: "full-time",
      matchScore: 87,
      requirements: ["React", "TypeScript", "Node.js", "3+ years experience"],
      description: "We're looking for a Senior React Developer...",
      applicationUrl: "https://techcorp.com/apply/1",
      status: "pending",
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "₹12-18 LPA",
      type: "full-time",
      matchScore: 82,
      requirements: ["React", "Node.js", "MongoDB", "AWS"],
      description: "Join our growing team as a Full Stack Engineer...",
      applicationUrl: "https://startupxyz.com/apply/2",
      status: "pending",
    },
    {
      id: "3",
      title: "Frontend Developer",
      company: "DesignCo",
      location: "Mumbai",
      salary: "₹10-15 LPA",
      type: "contract",
      matchScore: 78,
      requirements: ["React", "CSS", "JavaScript", "UI/UX collaboration"],
      description: "Looking for a creative Frontend Developer...",
      applicationUrl: "https://designco.com/apply/3",
      status: "pending",
    },
    {
      id: "4",
      title: "React Native Developer",
      company: "MobileFirst",
      location: "Delhi",
      salary: "₹14-20 LPA",
      type: "full-time",
      matchScore: 75,
      requirements: ["React Native", "Mobile development", "2+ years"],
      description: "Mobile-first company seeking React Native Developer...",
      applicationUrl: "https://mobilefirst.com/apply/4",
      status: "applied",
      appliedAt: new Date("2024-01-14"),
    },
    {
      id: "5",
      title: "Senior Frontend Lead",
      company: "Enterprise Corp",
      location: "Pune",
      salary: "₹20-28 LPA",
      type: "full-time",
      matchScore: 91,
      requirements: ["React", "Team leadership", "Architecture", "5+ years"],
      description:
        "Lead our frontend team in building enterprise applications...",
      applicationUrl: "https://enterprise.com/apply/5",
      status: "pending",
    },
  ]);

  const { toast } = useToast();

  const generateCoverLetter = (job: Job) => {
    const customParagraph = `I am particularly drawn to ${job.company} because of your innovative work in technology. My expertise in ${job.requirements.slice(0, 3).join(", ")} aligns perfectly with your requirements for the ${job.title} position.`;

    return settings.coverLetterTemplate
      .replace("{jobTitle}", job.title)
      .replace("{companyName}", job.company)
      .replace("{experience}", "3")
      .replace("{skills}", job.requirements.slice(0, 3).join(", "))
      .replace("{customParagraph}", customParagraph)
      .replace("{userName}", "Your Name");
  };

  const applyToJob = async (job: Job) => {
    // Update job status to applying
    const updatedJob = { ...job, status: "applying" as const };

    // Generate cover letter if enabled
    if (settings.customCoverLetter) {
      updatedJob.coverLetter = generateCoverLetter(job);
    }

    // Simulate application process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success/failure (90% success rate)
    const success = Math.random() > 0.1;

    if (success) {
      updatedJob.status = "applied";
      updatedJob.appliedAt = new Date();

      toast({
        title: "Application Successful!",
        description: `Successfully applied to ${job.title} at ${job.company}`,
      });
    } else {
      updatedJob.status = "failed";

      toast({
        title: "Application Failed",
        description: `Failed to apply to ${job.title}. Will retry later.`,
        variant: "destructive",
      });
    }

    return updatedJob;
  };

  const startAutoApply = async () => {
    setIsAutoApplying(true);
    setApplicationProgress(0);

    const eligibleJobs = jobs.filter(
      (job) =>
        selectedJobs.includes(job.id) &&
        job.status === "pending" &&
        job.matchScore >= settings.minMatchScore,
    );

    let appliedCount = 0;

    for (
      let i = 0;
      i < eligibleJobs.length && appliedCount < settings.maxApplicationsPerDay;
      i++
    ) {
      const job = eligibleJobs[i];

      try {
        await applyToJob(job);
        appliedCount++;

        setApplicationProgress(((i + 1) / eligibleJobs.length) * 100);

        // Delay between applications
        if (i < eligibleJobs.length - 1) {
          await new Promise((resolve) =>
            setTimeout(resolve, settings.applicationDelay * 1000),
          );
        }
      } catch (error) {
        console.error("Application error:", error);
      }
    }

    setIsAutoApplying(false);
    setApplicationProgress(100);

    toast({
      title: "Auto Apply Complete",
      description: `Successfully applied to ${appliedCount} jobs.`,
    });
  };

  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const selectAllEligible = () => {
    const eligibleJobs = jobs
      .filter(
        (job) =>
          job.status === "pending" && job.matchScore >= settings.minMatchScore,
      )
      .map((job) => job.id);
    setSelectedJobs(eligibleJobs);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-green-100 text-green-800";
      case "applying":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <ZapIcon className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold">1-Click Auto Apply</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Automatically apply to multiple jobs with AI-generated cover
            letters. Set your preferences and let our system handle the
            applications.
          </p>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Auto Apply Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enabled">Enable Auto Apply</Label>
                <Switch
                  id="enabled"
                  checked={settings.enabled}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({ ...prev, enabled: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Min Match Score: {settings.minMatchScore}%</Label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={settings.minMatchScore}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      minMatchScore: parseInt(e.target.value),
                    }))
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxApps">Max Applications/Day</Label>
                <Input
                  id="maxApps"
                  type="number"
                  min="1"
                  max="50"
                  value={settings.maxApplicationsPerDay}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      maxApplicationsPerDay: parseInt(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delay">Delay Between Apps (seconds)</Label>
                <Input
                  id="delay"
                  type="number"
                  min="10"
                  max="300"
                  value={settings.applicationDelay}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      applicationDelay: parseInt(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="customCover">Custom Cover Letters</Label>
                <Switch
                  id="customCover"
                  checked={settings.customCoverLetter}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      customCoverLetter: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="remote">Remote Only</Label>
                <Switch
                  id="remote"
                  checked={settings.onlyRemote}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({ ...prev, onlyRemote: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Job List */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TargetIcon className="h-5 w-5" />
                  Available Jobs (
                  {jobs.filter((j) => j.status === "pending").length})
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAllEligible}
                  >
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Select Eligible (
                    {
                      jobs.filter(
                        (j) =>
                          j.status === "pending" &&
                          j.matchScore >= settings.minMatchScore,
                      ).length
                    }
                    )
                  </Button>
                  <Button
                    onClick={startAutoApply}
                    disabled={selectedJobs.length === 0 || isAutoApplying}
                    className="flex items-center gap-2"
                  >
                    {isAutoApplying ? (
                      <>
                        <RefreshCwIcon className="h-4 w-4 animate-spin" />
                        Applying... ({Math.round(applicationProgress)}%)
                      </>
                    ) : (
                      <>
                        <SendIcon className="h-4 w-4" />
                        Apply to Selected ({selectedJobs.length})
                      </>
                    )}
                  </Button>
                </div>
              </div>
              {isAutoApplying && (
                <div className="space-y-2">
                  <Progress value={applicationProgress} />
                  <p className="text-sm text-muted-foreground">
                    Applying to jobs automatically... Please wait.
                  </p>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className={`border rounded-lg p-4 space-y-3 ${
                    selectedJobs.includes(job.id)
                      ? "bg-blue-50 border-blue-200"
                      : ""
                  } ${job.status !== "pending" ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedJobs.includes(job.id)}
                        onCheckedChange={() => toggleJobSelection(job.id)}
                        disabled={job.status !== "pending"}
                      />
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{job.title}</h3>
                          <Badge
                            className={getStatusColor(job.status)}
                            variant="secondary"
                          >
                            {job.status}
                          </Badge>
                          {job.status === "applied" && job.appliedAt && (
                            <span className="text-xs text-muted-foreground">
                              Applied {job.appliedAt.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium">{job.company}</span>
                          <span>{job.location}</span>
                          <span>{job.salary}</span>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {job.requirements.slice(0, 4).map((req, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div
                        className={`text-lg font-semibold ${getMatchScoreColor(job.matchScore)}`}
                      >
                        {job.matchScore}%
                      </div>
                      <p className="text-xs text-muted-foreground">Match</p>

                      {job.matchScore < settings.minMatchScore && (
                        <div className="flex items-center gap-1 text-xs text-red-600">
                          <AlertTriangleIcon className="h-3 w-3" />
                          Below threshold
                        </div>
                      )}
                    </div>
                  </div>

                  {job.status === "applying" && (
                    <div className="bg-blue-50 p-2 rounded flex items-center gap-2">
                      <RefreshCwIcon className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm text-blue-800">
                        Generating cover letter and submitting application...
                      </span>
                    </div>
                  )}

                  {job.coverLetter && (
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="font-medium text-sm mb-2">
                        Generated Cover Letter:
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {job.coverLetter.substring(0, 200)}...
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Cover Letter Template */}
        {settings.customCoverLetter && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5" />
                Cover Letter Template
              </CardTitle>
              <CardDescription>
                Customize your cover letter template. Use variables:{" "}
                {"{jobTitle}"}, {"{companyName}"}, {"{experience}"},{" "}
                {"{skills}"}, {"{userName}"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={settings.coverLetterTemplate}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    coverLetterTemplate: e.target.value,
                  }))
                }
                rows={8}
                placeholder="Enter your cover letter template..."
              />
              <div className="mt-4">
                <h4 className="font-medium mb-2">
                  Preview (for Senior React Developer at TechCorp):
                </h4>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  {generateCoverLetter(jobs[0])}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {jobs.filter((j) => j.status === "applied").length}
              </div>
              <p className="text-sm text-muted-foreground">Total Applied</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {
                  jobs.filter(
                    (j) =>
                      j.status === "pending" &&
                      j.matchScore >= settings.minMatchScore,
                  ).length
                }
              </div>
              <p className="text-sm text-muted-foreground">Eligible Jobs</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {Math.round(
                  jobs.reduce((sum, j) => sum + j.matchScore, 0) / jobs.length,
                )}
                %
              </div>
              <p className="text-sm text-muted-foreground">Avg Match Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {selectedJobs.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Selected for Apply
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

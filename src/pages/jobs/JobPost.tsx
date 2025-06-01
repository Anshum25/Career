import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BriefcaseIcon,
  MapPinIcon,
  DollarSignIcon,
  ClockIcon,
  BuildingIcon,
  Users,
  Plus,
  X,
  Save,
  Eye,
  Send,
  Calendar,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function JobPost() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    workMode: "",
    jobType: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD",
    salaryPeriod: "year",
    description: "",
    applicationDeadline: "",
    featured: false,
    urgent: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setJobData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setBenefits(benefits.filter((benefit) => benefit !== benefitToRemove));
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index));
    }
  };

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const updateResponsibility = (index: number, value: string) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const removeResponsibility = (index: number) => {
    if (responsibilities.length > 1) {
      setResponsibilities(responsibilities.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const submissionData = {
        ...jobData,
        skills: skills.filter((skill) => skill.trim()),
        benefits: benefits.filter((benefit) => benefit.trim()),
        requirements: requirements.filter((req) => req.trim()),
        responsibilities: responsibilities.filter((resp) => resp.trim()),
        status: isDraft ? "draft" : "published",
        createdAt: new Date(),
      };

      console.log("Job posting data:", submissionData);

      toast({
        title: isDraft ? "Draft Saved!" : "Job Posted Successfully!",
        description: isDraft
          ? "Your job posting has been saved as a draft."
          : "Your job posting is now live and accepting applications.",
      });

      navigate("/dashboard/recruiter");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error posting your job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const suggestedSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "Docker",
    "Kubernetes",
    "SQL",
    "MongoDB",
    "Git",
    "CSS",
    "HTML",
    "Vue.js",
    "Angular",
    "Go",
    "Rust",
  ];

  const suggestedBenefits = [
    "Health Insurance",
    "Dental Insurance",
    "Vision Insurance",
    "401(k)",
    "Stock Options",
    "Remote Work",
    "Flexible Hours",
    "Unlimited PTO",
    "Learning Budget",
    "Gym Membership",
    "Free Meals",
    "Commuter Benefits",
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <BriefcaseIcon className="h-6 w-6" />
                  Post a New Job
                </CardTitle>
                <CardDescription>
                  Create a job posting to attract top talent
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSubmit(true)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Basic Job Information */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Provide the basic information about the position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Senior Software Engineer, Marketing Manager"
                value={jobData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  value={jobData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA or Remote"
                  value={jobData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workMode">Work Mode *</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("workMode", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type *</Label>
                <Select
                  onValueChange={(value) => handleInputChange("jobType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full-time</SelectItem>
                    <SelectItem value="part_time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level *</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("experienceLevel", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="lead">Lead/Principal</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Salary Range (Optional)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salaryMin" className="text-sm">
                    Minimum
                  </Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="80000"
                    value={jobData.salaryMin}
                    onChange={(e) =>
                      handleInputChange("salaryMin", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMax" className="text-sm">
                    Maximum
                  </Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="120000"
                    value={jobData.salaryMax}
                    onChange={(e) =>
                      handleInputChange("salaryMax", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-sm">
                    Currency
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("salaryCurrency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period" className="text-sm">
                    Period
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("salaryPeriod", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year">Year</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="hour">Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Application Deadline (Optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={jobData.applicationDeadline}
                onChange={(e) =>
                  handleInputChange("applicationDeadline", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>
              Provide a detailed description of the role
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide a comprehensive description of the role, including what the candidate will be doing, the team they'll join, and what makes this opportunity special..."
                className="min-h-[150px]"
                value={jobData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
              <div className="text-xs text-muted-foreground">
                {jobData.description.length}/1000 characters
              </div>
            </div>

            <Separator />

            {/* Requirements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Requirements</Label>
                <Button variant="outline" size="sm" onClick={addRequirement}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
              {requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Requirement ${index + 1}`}
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                  />
                  {requirements.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Separator />

            {/* Responsibilities */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Responsibilities</Label>
                <Button variant="outline" size="sm" onClick={addResponsibility}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Responsibility
                </Button>
              </div>
              {responsibilities.map((responsibility, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Responsibility ${index + 1}`}
                    value={responsibility}
                    onChange={(e) =>
                      updateResponsibility(index, e.target.value)
                    }
                  />
                  {responsibilities.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeResponsibility(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Required Skills</CardTitle>
            <CardDescription>
              Add the skills and technologies required for this position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill (e.g., React, Python, AWS)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {skills.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button onClick={() => removeSkill(skill)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Suggested Skills</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!skills.includes(suggestion)) {
                        setSkills([...skills, suggestion]);
                      }
                    }}
                    disabled={skills.includes(suggestion)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits & Perks</CardTitle>
            <CardDescription>
              Highlight the benefits and perks of working at your company
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a benefit (e.g., Health Insurance, Remote Work)"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addBenefit()}
              />
              <Button onClick={addBenefit} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {benefits.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Benefits</Label>
                <div className="flex flex-wrap gap-2">
                  {benefits.map((benefit) => (
                    <Badge key={benefit} variant="secondary" className="gap-1">
                      {benefit}
                      <button onClick={() => removeBenefit(benefit)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Common Benefits</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedBenefits.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!benefits.includes(suggestion)) {
                        setBenefits([...benefits, suggestion]);
                      }
                    }}
                    disabled={benefits.includes(suggestion)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publishing Options */}
        <Card>
          <CardHeader>
            <CardTitle>Publishing Options</CardTitle>
            <CardDescription>
              Choose how you want to publish this job posting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={jobData.featured}
                onCheckedChange={(checked) =>
                  handleInputChange("featured", checked)
                }
              />
              <Label htmlFor="featured" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Featured Job Post
                <Badge variant="outline">$49/month</Badge>
              </Label>
            </div>
            <p className="text-sm text-muted-foreground ml-6">
              Featured jobs appear at the top of search results and get 3x more
              views
            </p>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgent"
                checked={jobData.urgent}
                onCheckedChange={(checked) =>
                  handleInputChange("urgent", checked)
                }
              />
              <Label htmlFor="urgent" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Urgent Hiring
                <Badge variant="outline">$19/month</Badge>
              </Label>
            </div>
            <p className="text-sm text-muted-foreground ml-6">
              Urgent jobs are highlighted and prioritized in candidate
              recommendations
            </p>
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/recruiter")}
          >
            Cancel
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSubmit(false)}
              disabled={
                isSubmitting ||
                !jobData.title ||
                !jobData.company ||
                !jobData.location
              }
              className="min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Publish Job
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

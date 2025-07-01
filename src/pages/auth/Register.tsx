import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BriefcaseIcon,
  BuildingIcon,
  UserIcon,
  LoaderIcon,
  CheckIcon,
  StarIcon,
  BrainIcon,
  VideoIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UploadIcon,
  PhoneIcon,
  GlobeIcon,
  MapPinIcon,
  GraduationCapIcon,
  CodeIcon,
  LinkedinIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { UserRole } from "@/lib/types";

interface RecruiterFormData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Company Info
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  companySize: string;
  industry: string;
  location: string;
  companyLogo: File | null;
  agreeToTerms: boolean;
}

interface JobSeekerFormData {
  // Basic Info
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Career Profile
  resume: File | null;
  desiredJobTitle: string;
  experienceLevel: string;
  skills: string[];
  education: string;
  locationPreference: string;
  employmentType: string;
  // Optional
  linkedinUrl: string;
  portfolioWebsite: string;
  githubUrl: string;
  languages: string;
  agreeToTerms: boolean;
}

export default function Register() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("job_seeker");
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  // Recruiter form data
  const [recruiterData, setRecruiterData] = useState<RecruiterFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    companySize: "",
    industry: "",
    location: "",
    companyLogo: null,
    agreeToTerms: false,
  });

  // Job seeker form data
  const [jobSeekerData, setJobSeekerData] = useState<JobSeekerFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    resume: null,
    desiredJobTitle: "",
    experienceLevel: "",
    skills: [],
    education: "",
    locationPreference: "",
    employmentType: "",
    linkedinUrl: "",
    portfolioWebsite: "",
    githubUrl: "",
    languages: "",
    agreeToTerms: false,
  });

  const totalSteps = selectedRole === "recruiter" ? 3 : 3;

  const handleRecruiterInputChange = (
    field: keyof RecruiterFormData,
    value: any,
  ) => {
    setRecruiterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleJobSeekerInputChange = (
    field: keyof JobSeekerFormData,
    value: any,
  ) => {
    setJobSeekerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setJobSeekerData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    if (selectedRole === "recruiter") {
      handleRecruiterInputChange(field as keyof RecruiterFormData, file);
    } else {
      handleJobSeekerInputChange(field as keyof JobSeekerFormData, file);
    }
  };

  const validateCurrentStep = () => {
    setError("");

    if (selectedRole === "recruiter") {
      switch (currentStep) {
        case 1:
          if (
            !recruiterData.fullName ||
            !recruiterData.email ||
            !recruiterData.phone ||
            !recruiterData.password ||
            !recruiterData.confirmPassword
          ) {
            setError("Please fill in all required fields");
            return false;
          }
          if (recruiterData.password !== recruiterData.confirmPassword) {
            setError("Passwords do not match");
            return false;
          }
          if (recruiterData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
          }
          break;
        case 2:
          if (
            !recruiterData.companyName ||
            !recruiterData.companyWebsite ||
            !recruiterData.industry ||
            !recruiterData.location
          ) {
            setError("Please fill in all required company fields");
            return false;
          }
          break;
        case 3:
          if (!recruiterData.agreeToTerms) {
            setError("Please agree to the terms and conditions");
            return false;
          }
          break;
      }
    } else {
      switch (currentStep) {
        case 1:
          if (
            !jobSeekerData.fullName ||
            !jobSeekerData.email ||
            !jobSeekerData.phone ||
            !jobSeekerData.password ||
            !jobSeekerData.confirmPassword
          ) {
            setError("Please fill in all required fields");
            return false;
          }
          if (jobSeekerData.password !== jobSeekerData.confirmPassword) {
            setError("Passwords do not match");
            return false;
          }
          if (jobSeekerData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
          }
          break;
        case 2:
          if (
            !jobSeekerData.resume ||
            !jobSeekerData.desiredJobTitle ||
            !jobSeekerData.experienceLevel ||
            jobSeekerData.skills.length === 0 ||
            !jobSeekerData.education ||
            !jobSeekerData.locationPreference
          ) {
            setError("Please fill in all required career profile fields");
            return false;
          }
          break;
        case 3:
          if (!jobSeekerData.agreeToTerms) {
            setError("Please agree to the terms and conditions");
            return false;
          }
          break;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) return;

    try {
      if (selectedRole === "recruiter") {
        await register(
          recruiterData.email,
          recruiterData.password,
          recruiterData.fullName,
          selectedRole,
          {
            phone: recruiterData.phone,
            companyName: recruiterData.companyName,
            companyWebsite: recruiterData.companyWebsite,
            companyDescription: recruiterData.companyDescription,
            companySize: recruiterData.companySize,
            industry: recruiterData.industry,
            location: recruiterData.location,
          },
        );
      } else {
        await register(
          jobSeekerData.email,
          jobSeekerData.password,
          jobSeekerData.fullName,
          selectedRole,
          {
            phone: jobSeekerData.phone,
            desiredJobTitle: jobSeekerData.desiredJobTitle,
            experienceLevel: jobSeekerData.experienceLevel,
            skills: jobSeekerData.skills,
            education: jobSeekerData.education,
            locationPreference: jobSeekerData.locationPreference,
            employmentType: jobSeekerData.employmentType,
            linkedinUrl: jobSeekerData.linkedinUrl,
            portfolioWebsite: jobSeekerData.portfolioWebsite,
            githubUrl: jobSeekerData.githubUrl,
            languages: jobSeekerData.languages,
          },
        );
      }

      navigate(
        selectedRole === "recruiter"
          ? "/dashboard/recruiter"
          : "/dashboard/seeker",
      );
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const roleFeatures = {
    job_seeker: [
      { icon: BrainIcon, text: "AI-powered job matching" },
      { icon: VideoIcon, text: "Resume builder & optimization" },
      { icon: StarIcon, text: "Interview practice & coaching" },
      { icon: CheckIcon, text: "One-click job applications" },
    ],
    recruiter: [
      { icon: BrainIcon, text: "AI candidate screening" },
      { icon: UserIcon, text: "Advanced talent search" },
      { icon: VideoIcon, text: "Interview scheduling tools" },
      { icon: CheckIcon, text: "Hiring analytics & insights" },
    ],
  };

  const skillOptions = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "HTML/CSS",
    "TypeScript",
    "Angular",
    "Vue.js",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "Figma",
    "Photoshop",
    "Project Management",
    "Data Analysis",
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Consulting",
    "Media",
    "Real Estate",
    "Automotive",
    "Aerospace",
    "Energy",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-1000 employees",
    "1000+ employees",
  ];

  const experienceLevels = [
    "Fresher (0 years)",
    "0-1 years",
    "1-3 years",
    "3-5 years",
    "5-10 years",
    "10+ years",
  ];

  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote",
    "Freelance",
  ];

  const resetForm = () => {
    setCurrentStep(1);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <Card className="w-full max-w-4xl shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center p-6 md:p-8">
          <div className="flex justify-center mb-4">
            <BriefcaseIcon className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
            Join CareerAI
          </CardTitle>
          <CardDescription className="text-base md:text-lg">
            Create your account and start your AI-powered career journey
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 md:space-y-8 p-6 md:p-8">
          {/* Role Selection */}
          <Tabs
            value={selectedRole}
            onValueChange={(value) => {
              setSelectedRole(value as UserRole);
              resetForm();
            }}
          >
            <TabsList className="grid w-full grid-cols-2 h-12 md:h-14">
              <TabsTrigger
                value="job_seeker"
                className="flex items-center gap-1 md:gap-2 text-sm md:text-base py-3"
              >
                <UserIcon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Job Seeker</span>
                <span className="sm:hidden">Seeker</span>
              </TabsTrigger>
              <TabsTrigger
                value="recruiter"
                className="flex items-center gap-1 md:gap-2 text-sm md:text-base py-3"
              >
                <BuildingIcon className="h-4 w-4 md:h-5 md:w-5" />
                Recruiter
              </TabsTrigger>
            </TabsList>

            {/* Role Benefits */}
            <div className="mt-4 md:mt-6">
              <TabsContent value="job_seeker">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 md:p-6 rounded-xl">
                  <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-blue-900 dark:text-blue-300">
                    What you'll get as a Job Seeker:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {roleFeatures.job_seeker.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 md:gap-3"
                      >
                        <feature.icon className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-medium text-blue-800 dark:text-blue-200">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recruiter">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 md:p-6 rounded-xl">
                  <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-blue-900 dark:text-blue-300">
                    What you'll get as a Recruiter:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {roleFeatures.recruiter.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 md:gap-3"
                      >
                        <feature.icon className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-medium text-blue-800 dark:text-blue-200">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <Progress
              value={(currentStep / totalSteps) * 100}
              className="h-2"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {selectedRole === "recruiter" ? (
              // RECRUITER FORM
              <>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                        <UserIcon className="h-6 w-6" />
                        Personal Information
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Tell us about yourself
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={recruiterData.fullName}
                          onChange={(e) =>
                            handleRecruiterInputChange(
                              "fullName",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={recruiterData.email}
                          onChange={(e) =>
                            handleRecruiterInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={recruiterData.phone}
                          onChange={(e) =>
                            handleRecruiterInputChange("phone", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a secure password"
                          value={recruiterData.password}
                          onChange={(e) =>
                            handleRecruiterInputChange(
                              "password",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password *
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={recruiterData.confirmPassword}
                          onChange={(e) =>
                            handleRecruiterInputChange(
                              "confirmPassword",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                        <BuildingIcon className="h-6 w-6" />
                        Company Information
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Tell us about your company
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Acme Corporation"
                          value={recruiterData.companyName}
                          onChange={(e) =>
                            handleRecruiterInputChange(
                              "companyName",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyWebsite">
                          Company Website *
                        </Label>
                        <Input
                          id="companyWebsite"
                          type="url"
                          placeholder="https://company.com"
                          value={recruiterData.companyWebsite}
                          onChange={(e) =>
                            handleRecruiterInputChange(
                              "companyWebsite",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry *</Label>
                        <Select
                          onValueChange={(value) =>
                            handleRecruiterInputChange("industry", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select
                          onValueChange={(value) =>
                            handleRecruiterInputChange("companySize", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            {companySizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="location">Company Location *</Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="City, State/Country"
                          value={recruiterData.location}
                          onChange={(e) =>
                            handleRecruiterInputChange(
                              "location",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="companyDescription">
                          Company Description (Optional)
                        </Label>
                        <Textarea
                          id="companyDescription"
                          placeholder="Brief description of your company..."
                          rows={3}
                          value={recruiterData.companyDescription}
                          onChange={(e) =>
                            handleRecruiterInputChange(
                              "companyDescription",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                        <CheckIcon className="h-6 w-6" />
                        Review & Confirm
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Almost there! Please review your information
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg border-b pb-2">
                          Personal Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Name:</span>{" "}
                            {recruiterData.fullName}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span>{" "}
                            {recruiterData.email}
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span>{" "}
                            {recruiterData.phone}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg border-b pb-2">
                          Company Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Company:</span>{" "}
                            {recruiterData.companyName}
                          </div>
                          <div>
                            <span className="font-medium">Website:</span>{" "}
                            {recruiterData.companyWebsite}
                          </div>
                          <div>
                            <span className="font-medium">Industry:</span>{" "}
                            {recruiterData.industry}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>{" "}
                            {recruiterData.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <Checkbox
                        id="terms"
                        checked={recruiterData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleRecruiterInputChange("agreeToTerms", checked)
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-blue-600 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // JOB SEEKER FORM
              <>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                        <UserIcon className="h-6 w-6" />
                        Basic Information
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Let's start with your basic details
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={jobSeekerData.fullName}
                          onChange={(e) =>
                            handleJobSeekerInputChange(
                              "fullName",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@email.com"
                          value={jobSeekerData.email}
                          onChange={(e) =>
                            handleJobSeekerInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={jobSeekerData.phone}
                          onChange={(e) =>
                            handleJobSeekerInputChange("phone", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a secure password"
                          value={jobSeekerData.password}
                          onChange={(e) =>
                            handleJobSeekerInputChange(
                              "password",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password *
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={jobSeekerData.confirmPassword}
                          onChange={(e) =>
                            handleJobSeekerInputChange(
                              "confirmPassword",
                              e.target.value,
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                        <BriefcaseIcon className="h-6 w-6" />
                        Career Profile
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Help us match you with the perfect jobs
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Resume Upload */}
                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume Upload *</Label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                          <UploadIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Click to upload your resume
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, or DOCX (max 10MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              handleFileUpload(
                                "resume",
                                e.target.files?.[0] || null,
                              )
                            }
                            className="mt-2"
                          />
                          {jobSeekerData.resume && (
                            <div className="mt-2 text-sm text-green-600 font-medium">
                              ✓ {jobSeekerData.resume.name}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="desiredJobTitle">
                            Desired Job Title *
                          </Label>
                          <Input
                            id="desiredJobTitle"
                            type="text"
                            placeholder="e.g., Frontend Developer"
                            value={jobSeekerData.desiredJobTitle}
                            onChange={(e) =>
                              handleJobSeekerInputChange(
                                "desiredJobTitle",
                                e.target.value,
                              )
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="experienceLevel">
                            Experience Level *
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              handleJobSeekerInputChange(
                                "experienceLevel",
                                value,
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              {experienceLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="education">Education *</Label>
                          <Input
                            id="education"
                            type="text"
                            placeholder="e.g., B.Tech Computer Science"
                            value={jobSeekerData.education}
                            onChange={(e) =>
                              handleJobSeekerInputChange(
                                "education",
                                e.target.value,
                              )
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="locationPreference">
                            Location Preference *
                          </Label>
                          <Input
                            id="locationPreference"
                            type="text"
                            placeholder="e.g., San Francisco, Remote"
                            value={jobSeekerData.locationPreference}
                            onChange={(e) =>
                              handleJobSeekerInputChange(
                                "locationPreference",
                                e.target.value,
                              )
                            }
                            required
                          />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="employmentType">
                            Employment Type
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              handleJobSeekerInputChange(
                                "employmentType",
                                value,
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                            <SelectContent>
                              {employmentTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Skills Selection */}
                      <div className="space-y-3">
                        <Label>Skills * (Select at least one)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {skillOptions.map((skill) => (
                            <Badge
                              key={skill}
                              variant={
                                jobSeekerData.skills.includes(skill)
                                  ? "default"
                                  : "outline"
                              }
                              className="cursor-pointer p-2 text-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900"
                              onClick={() => handleSkillToggle(skill)}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">
                          Selected skills: {jobSeekerData.skills.length}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                        <ExternalLinkIcon className="h-6 w-6" />
                        Additional Info & Confirmation
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Optional details to enhance your profile
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                        <div className="relative">
                          <LinkedinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                          <Input
                            id="linkedinUrl"
                            type="url"
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="pl-10"
                            value={jobSeekerData.linkedinUrl}
                            onChange={(e) =>
                              handleJobSeekerInputChange(
                                "linkedinUrl",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="portfolioWebsite">
                          Portfolio Website
                        </Label>
                        <div className="relative">
                          <GlobeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                          <Input
                            id="portfolioWebsite"
                            type="url"
                            placeholder="https://yourportfolio.com"
                            className="pl-10"
                            value={jobSeekerData.portfolioWebsite}
                            onChange={(e) =>
                              handleJobSeekerInputChange(
                                "portfolioWebsite",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="githubUrl">GitHub URL</Label>
                        <div className="relative">
                          <CodeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                          <Input
                            id="githubUrl"
                            type="url"
                            placeholder="https://github.com/yourusername"
                            className="pl-10"
                            value={jobSeekerData.githubUrl}
                            onChange={(e) =>
                              handleJobSeekerInputChange(
                                "githubUrl",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="languages">Languages Known</Label>
                        <Input
                          id="languages"
                          type="text"
                          placeholder="e.g., English, Spanish, French"
                          value={jobSeekerData.languages}
                          onChange={(e) =>
                            handleJobSeekerInputChange(
                              "languages",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Profile Summary */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-semibold mb-3">Profile Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Name:</span>{" "}
                          {jobSeekerData.fullName}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span>{" "}
                          {jobSeekerData.email}
                        </div>
                        <div>
                          <span className="font-medium">Desired Role:</span>{" "}
                          {jobSeekerData.desiredJobTitle}
                        </div>
                        <div>
                          <span className="font-medium">Experience:</span>{" "}
                          {jobSeekerData.experienceLevel}
                        </div>
                        <div>
                          <span className="font-medium">Education:</span>{" "}
                          {jobSeekerData.education}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span>{" "}
                          {jobSeekerData.locationPreference}
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-medium">Skills:</span>{" "}
                          {jobSeekerData.skills.join(", ")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <Checkbox
                        id="terms"
                        checked={jobSeekerData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleJobSeekerInputChange("agreeToTerms", checked)
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-blue-600 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <CheckIcon className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>

          <div className="text-center pt-4 border-t">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
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
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  resume: File | null;
  desiredJobTitle: string;
  experienceLevel: string;
  skills: string[];
  education: string;
  locationPreference: string;
  employmentType: string;
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

  const totalSteps = 3;

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

  const resetForm = () => {
    setCurrentStep(1);
    setError("");
    setRecruiterData({
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
    setJobSeekerData({
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
            !jobSeekerData.desiredJobTitle ||
            !jobSeekerData.experienceLevel ||
            jobSeekerData.skills.length === 0 ||
            !jobSeekerData.education ||
            !jobSeekerData.locationPreference
          ) {
            setError("Please fill in all required career fields");
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
    "PHP",
    "Ruby",
    "Go",
    "Swift",
    "Kotlin",
    "Machine Learning",
    "Data Science",
    "AWS",
    "Docker",
    "Kubernetes",
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Consulting",
    "Media & Entertainment",
    "Real Estate",
    "Transportation",
    "Energy",
    "Other",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-1000 employees",
    "1000+ employees",
  ];

  const experienceLevels = [
    "Fresher (0-1 years)",
    "Junior (1-3 years)",
    "Mid-level (3-6 years)",
    "Senior (6-10 years)",
    "Lead (10-15 years)",
    "Executive (15+ years)",
  ];

  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Remote",
  ];

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
            <div className="flex justify-between text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <Progress
              value={(currentStep / totalSteps) * 100}
              className="h-2 md:h-3"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-sm md:text-base">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {selectedRole === "recruiter" ? (
              // RECRUITER FORM
              <>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
                        <UserIcon className="h-5 w-5 md:h-6 md:w-6" />
                        Personal Information
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                        Tell us about yourself
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="fullName"
                          className="text-sm md:text-base"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          className="h-10 md:h-12 text-sm md:text-base"
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
                        <Label htmlFor="email" className="text-sm md:text-base">
                          Work Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          className="h-10 md:h-12 text-sm md:text-base"
                          value={recruiterData.email}
                          onChange={(e) =>
                            handleRecruiterInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm md:text-base">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="h-10 md:h-12 text-sm md:text-base"
                          value={recruiterData.phone}
                          onChange={(e) =>
                            handleRecruiterInputChange("phone", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-sm md:text-base"
                        >
                          Password *
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a strong password"
                          className="h-10 md:h-12 text-sm md:text-base"
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
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm md:text-base"
                        >
                          Confirm Password *
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="h-10 md:h-12 text-sm md:text-base"
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
                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
                        <BuildingIcon className="h-5 w-5 md:h-6 md:w-6" />
                        Company Information
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                        Tell us about your company
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="companyName"
                          className="text-sm md:text-base"
                        >
                          Company Name *
                        </Label>
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Acme Corporation"
                          className="h-10 md:h-12 text-sm md:text-base"
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
                        <Label
                          htmlFor="companyWebsite"
                          className="text-sm md:text-base"
                        >
                          Company Website *
                        </Label>
                        <Input
                          id="companyWebsite"
                          type="url"
                          placeholder="https://company.com"
                          className="h-10 md:h-12 text-sm md:text-base"
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
                        <Label
                          htmlFor="industry"
                          className="text-sm md:text-base"
                        >
                          Industry *
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleRecruiterInputChange("industry", value)
                          }
                        >
                          <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
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
                        <Label
                          htmlFor="companySize"
                          className="text-sm md:text-base"
                        >
                          Company Size
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleRecruiterInputChange("companySize", value)
                          }
                        >
                          <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
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
                        <Label
                          htmlFor="location"
                          className="text-sm md:text-base"
                        >
                          Company Location *
                        </Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="City, State/Country"
                          className="h-10 md:h-12 text-sm md:text-base"
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
                        <Label
                          htmlFor="companyDescription"
                          className="text-sm md:text-base"
                        >
                          Company Description (Optional)
                        </Label>
                        <Textarea
                          id="companyDescription"
                          placeholder="Brief description of your company..."
                          rows={3}
                          className="text-sm md:text-base"
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
                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
                        <CheckIcon className="h-5 w-5 md:h-6 md:w-6" />
                        Review & Confirm
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                        Almost there! Please review your information
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-base md:text-lg border-b pb-2">
                          Personal Information
                        </h4>
                        <div className="space-y-2 text-sm md:text-base">
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
                        <h4 className="font-semibold text-base md:text-lg border-b pb-2">
                          Company Information
                        </h4>
                        <div className="space-y-2 text-sm md:text-base">
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

                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox
                        id="agreeTermsRecruiter"
                        checked={recruiterData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleRecruiterInputChange("agreeToTerms", !!checked)
                        }
                      />
                      <Label
                        htmlFor="agreeTermsRecruiter"
                        className="text-sm md:text-base"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-blue-600 hover:underline"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // JOB SEEKER FORM
              <>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
                        <UserIcon className="h-5 w-5 md:h-6 md:w-6" />
                        Basic Information
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                        Let's start with your basic information
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="fullName"
                          className="text-sm md:text-base"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          className="h-10 md:h-12 text-sm md:text-base"
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
                        <Label htmlFor="email" className="text-sm md:text-base">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="h-10 md:h-12 text-sm md:text-base"
                          value={jobSeekerData.email}
                          onChange={(e) =>
                            handleJobSeekerInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm md:text-base">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="h-10 md:h-12 text-sm md:text-base"
                          value={jobSeekerData.phone}
                          onChange={(e) =>
                            handleJobSeekerInputChange("phone", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-sm md:text-base"
                        >
                          Password *
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a strong password"
                          className="h-10 md:h-12 text-sm md:text-base"
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
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm md:text-base"
                        >
                          Confirm Password *
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="h-10 md:h-12 text-sm md:text-base"
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
                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
                        <BrainIcon className="h-5 w-5 md:h-6 md:w-6" />
                        Career Profile
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                        Tell us about your career goals and experience
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Resume Upload */}
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base">
                          Resume Upload *
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                          <UploadIcon className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400 mb-4" />
                          <div className="space-y-2">
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                              Drop your resume here or click to browse
                            </p>
                            <p className="text-xs md:text-sm text-gray-500">
                              PDF, DOC, or DOCX (Max 5MB)
                            </p>
                          </div>
                          <Input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleFileUpload("resume", file);
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="desiredJobTitle"
                            className="text-sm md:text-base"
                          >
                            Desired Job Title *
                          </Label>
                          <Input
                            id="desiredJobTitle"
                            type="text"
                            placeholder="e.g. Software Engineer"
                            className="h-10 md:h-12 text-sm md:text-base"
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
                          <Label
                            htmlFor="experienceLevel"
                            className="text-sm md:text-base"
                          >
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
                            <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
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
                          <Label
                            htmlFor="education"
                            className="text-sm md:text-base"
                          >
                            Education *
                          </Label>
                          <Input
                            id="education"
                            type="text"
                            placeholder="e.g. B.S. Computer Science"
                            className="h-10 md:h-12 text-sm md:text-base"
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
                          <Label
                            htmlFor="locationPreference"
                            className="text-sm md:text-base"
                          >
                            Location Preference *
                          </Label>
                          <Input
                            id="locationPreference"
                            type="text"
                            placeholder="e.g. New York, Remote"
                            className="h-10 md:h-12 text-sm md:text-base"
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

                        <div className="space-y-2">
                          <Label
                            htmlFor="employmentType"
                            className="text-sm md:text-base"
                          >
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
                            <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
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
                        <Label className="text-sm md:text-base">
                          Skills * (Select all that apply)
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {skillOptions.map((skill) => (
                            <div key={skill}>
                              <Badge
                                variant={
                                  jobSeekerData.skills.includes(skill)
                                    ? "default"
                                    : "outline"
                                }
                                className="cursor-pointer w-full justify-center py-2 text-xs md:text-sm"
                                onClick={() => handleSkillToggle(skill)}
                              >
                                {skill}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs md:text-sm text-gray-500">
                          Selected: {jobSeekerData.skills.length} skills
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
                        <CheckIcon className="h-5 w-5 md:h-6 md:w-6" />
                        Additional Info & Confirmation
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                        Optional information to enhance your profile
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="linkedinUrl"
                          className="text-sm md:text-base flex items-center gap-2"
                        >
                          <LinkedinIcon className="h-4 w-4" />
                          LinkedIn URL
                        </Label>
                        <Input
                          id="linkedinUrl"
                          type="url"
                          placeholder="https://linkedin.com/in/yourname"
                          className="h-10 md:h-12 text-sm md:text-base"
                          value={jobSeekerData.linkedinUrl}
                          onChange={(e) =>
                            handleJobSeekerInputChange(
                              "linkedinUrl",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="portfolioWebsite"
                          className="text-sm md:text-base flex items-center gap-2"
                        >
                          <GlobeIcon className="h-4 w-4" />
                          Portfolio Website
                        </Label>
                        <Input
                          id="portfolioWebsite"
                          type="url"
                          placeholder="https://yourportfolio.com"
                          className="h-10 md:h-12 text-sm md:text-base"
                          value={jobSeekerData.portfolioWebsite}
                          onChange={(e) =>
                            handleJobSeekerInputChange(
                              "portfolioWebsite",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="githubUrl"
                          className="text-sm md:text-base flex items-center gap-2"
                        >
                          <CodeIcon className="h-4 w-4" />
                          GitHub URL
                        </Label>
                        <Input
                          id="githubUrl"
                          type="url"
                          placeholder="https://github.com/yourname"
                          className="h-10 md:h-12 text-sm md:text-base"
                          value={jobSeekerData.githubUrl}
                          onChange={(e) =>
                            handleJobSeekerInputChange(
                              "githubUrl",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="languages"
                          className="text-sm md:text-base"
                        >
                          Languages Known
                        </Label>
                        <Input
                          id="languages"
                          type="text"
                          placeholder="e.g. English, Spanish, French"
                          className="h-10 md:h-12 text-sm md:text-base"
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
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-xl">
                      <h4 className="font-semibold text-base md:text-lg mb-4">
                        Profile Summary
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                        <div>
                          <p>
                            <span className="font-medium">Name:</span>{" "}
                            {jobSeekerData.fullName}
                          </p>
                          <p>
                            <span className="font-medium">Email:</span>{" "}
                            {jobSeekerData.email}
                          </p>
                          <p>
                            <span className="font-medium">Desired Role:</span>{" "}
                            {jobSeekerData.desiredJobTitle}
                          </p>
                          <p>
                            <span className="font-medium">Experience:</span>{" "}
                            {jobSeekerData.experienceLevel}
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-medium">Education:</span>{" "}
                            {jobSeekerData.education}
                          </p>
                          <p>
                            <span className="font-medium">Location:</span>{" "}
                            {jobSeekerData.locationPreference}
                          </p>
                          <p>
                            <span className="font-medium">Skills:</span>{" "}
                            {jobSeekerData.skills.length} selected
                          </p>
                          <p>
                            <span className="font-medium">
                              Employment Type:
                            </span>{" "}
                            {jobSeekerData.employmentType || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeTermsSeeker"
                        checked={jobSeekerData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleJobSeekerInputChange("agreeToTerms", !!checked)
                        }
                      />
                      <Label
                        htmlFor="agreeTermsSeeker"
                        className="text-sm md:text-base"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-blue-600 hover:underline"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
              >
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <CheckIcon className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base bg-blue-600 hover:bg-blue-700"
                >
                  Next
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>

          {/* Sign In Link */}
          <div className="text-center pt-6 border-t">
            <span className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in here
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

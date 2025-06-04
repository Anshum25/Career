import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import {
  BriefcaseIcon,
  GoogleIcon,
  LinkedinIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  UserIcon,
  BuildingIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GraduationCapIcon,
} from "lucide-react";

// Custom Google Icon component
const GoogleIconComponent = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285f4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34a853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#fbbc05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#ea4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Custom LinkedIn Icon component
const LinkedinIconComponent = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077b5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function NaukriStyleAuth() {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [userType, setUserType] = useState<"jobSeeker" | "recruiter">(
    "jobSeeker",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    company: "",
    designation: "",
    experience: "",
    skills: "",
    agreeToTerms: false,
    emailNotifications: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (authMode === "register") {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (userType === "recruiter" && !formData.company)
        newErrors.company = "Company name is required";
      if (!formData.agreeToTerms)
        newErrors.agreeToTerms = "You must agree to terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (authMode === "login") {
        await login(formData.email, formData.password);
        toast({
          title: "Welcome back!",
          description: "Successfully logged in to your account.",
        });
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: userType === "jobSeeker" ? "job_seeker" : "recruiter",
          phone: formData.phone,
          location: formData.location,
          company: formData.company,
          designation: formData.designation,
          experience: formData.experience,
          skills: formData.skills,
        });
        toast({
          title: "Account created successfully!",
          description:
            "Welcome to CareerAI. Let's help you find your dream job.",
        });
      }
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Social Login",
      description: `${provider} login will be available soon.`,
    });
  };

  const renderRegistrationStep = () => {
    if (authMode === "login") return null;

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Mobile Number *</Label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Current Location</Label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter your city"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {userType === "recruiter" && (
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <div className="relative">
                  <BuildingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="Enter company name"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className={`pl-10 ${errors.company ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.company && (
                  <p className="text-sm text-red-500">{errors.company}</p>
                )}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {userType === "jobSeeker" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="experience">Work Experience</Label>
                  <div className="relative">
                    <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="experience"
                      type="text"
                      placeholder="e.g., 2 years as Software Developer"
                      value={formData.experience}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Key Skills</Label>
                  <div className="relative">
                    <GraduationCapIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="skills"
                      type="text"
                      placeholder="e.g., React, Node.js, Python"
                      value={formData.skills}
                      onChange={(e) =>
                        handleInputChange("skills", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add skills separated by commas
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="designation">Your Designation</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="designation"
                    type="text"
                    placeholder="e.g., HR Manager, Tech Recruiter"
                    value={formData.designation}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emailNotifications"
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleInputChange("emailNotifications", checked as boolean)
                  }
                />
                <Label htmlFor="emailNotifications" className="text-sm">
                  Send me relevant job alerts via email
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreeToTerms", checked as boolean)
                  }
                  className={errors.agreeToTerms ? "border-red-500" : ""}
                />
                <Label
                  htmlFor="agreeToTerms"
                  className="text-sm leading-relaxed"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-600 underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-blue-600 underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-6">
            <BriefcaseIcon className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CareerAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {authMode === "login" ? "Welcome Back!" : "Create Your Account"}
          </h1>
          <p className="text-gray-600 mt-2">
            {authMode === "login"
              ? "Sign in to your account to continue"
              : "Join millions of professionals finding their dream jobs"}
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-6">
            <Tabs
              value={authMode}
              onValueChange={(value) =>
                setAuthMode(value as "login" | "register")
              }
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Button
                      type="button"
                      variant={userType === "jobSeeker" ? "default" : "outline"}
                      onClick={() => setUserType("jobSeeker")}
                      className="flex items-center gap-2"
                    >
                      <UserIcon className="h-4 w-4" />
                      Job Seeker
                    </Button>
                    <Button
                      type="button"
                      variant={userType === "recruiter" ? "default" : "outline"}
                      onClick={() => setUserType("recruiter")}
                      className="flex items-center gap-2"
                    >
                      <BuildingIcon className="h-4 w-4" />
                      Recruiter
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {currentStep === 1 ? (
                      <>
                        {renderRegistrationStep()}
                        <Button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="w-full"
                        >
                          Continue
                        </Button>
                      </>
                    ) : (
                      <>
                        {renderRegistrationStep()}
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                            className="flex-1"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                          >
                            Create Account
                          </Button>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("Google")}
                  className="flex items-center gap-2"
                >
                  <GoogleIconComponent />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("LinkedIn")}
                  className="flex items-center gap-2"
                >
                  <LinkedinIconComponent />
                  LinkedIn
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              {authMode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setAuthMode("register")}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Create one now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setAuthMode("login")}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign in here
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            <span>Trusted by 5M+ professionals</span>
          </div>
        </div>
      </div>
    </div>
  );
}

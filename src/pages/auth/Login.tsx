import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BriefcaseIcon,
  BuildingIcon,
  UserIcon,
  LoaderIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockIcon,
  BrainIcon,
  CheckIcon,
  StarIcon,
  VideoIcon,
} from "lucide-react";
import { UserRole } from "@/lib/types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("job_seeker");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(email, password, selectedRole);

      // Redirect based on role
      if (selectedRole === "recruiter") {
        navigate("/dashboard/recruiter");
      } else {
        navigate("/dashboard/seeker");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleDemoLogin = async (role: UserRole, demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("demo123");
    setSelectedRole(role);

    try {
      await login(demoEmail, "demo123", role);
      if (role === "recruiter") {
        navigate("/dashboard/recruiter");
      } else {
        navigate("/dashboard/seeker");
      }
    } catch (err) {
      setError("Demo login failed. Please try again.");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Side - Welcome Content */}
        <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-4 md:space-y-6">
            <div className="flex justify-center lg:justify-start">
              <BriefcaseIcon className="h-12 w-12 md:h-16 md:w-16 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Welcome back to{" "}
              <span className="text-blue-600 dark:text-blue-400">CareerAI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Continue your AI-powered career journey. Find jobs, build resumes,
              and connect with opportunities that match your skills perfectly.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto lg:mx-0">
            <div className="text-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-xl md:text-2xl font-bold text-blue-600">
                500K+
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Active Users
              </div>
            </div>
            <div className="text-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-xl md:text-2xl font-bold text-green-600">
                89%
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Success Rate
              </div>
            </div>
            <div className="text-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-xl md:text-2xl font-bold text-blue-600">
                2.5M+
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                AI Matches
              </div>
            </div>
            <div className="text-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-xl md:text-2xl font-bold text-blue-600">
                125K+
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Jobs Posted
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-xl border border-gray-200 dark:border-gray-700 order-1 lg:order-2">
          <CardHeader className="text-center space-y-3 md:space-y-4 p-6 md:p-8">
            <CardTitle className="text-xl md:text-2xl font-bold">
              Sign In
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 md:space-y-6 p-6 md:p-8">
            {/* Role Selection */}
            <Tabs
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as UserRole)}
            >
              <TabsList className="grid w-full grid-cols-2 h-10 md:h-12">
                <TabsTrigger
                  value="job_seeker"
                  className="flex items-center gap-1 md:gap-2 text-xs md:text-sm py-2"
                >
                  <UserIcon className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Job Seeker</span>
                  <span className="sm:hidden">Seeker</span>
                </TabsTrigger>
                <TabsTrigger
                  value="recruiter"
                  className="flex items-center gap-1 md:gap-2 text-xs md:text-sm py-2"
                >
                  <BuildingIcon className="h-3 w-3 md:h-4 md:w-4" />
                  Recruiter
                </TabsTrigger>
              </TabsList>

              {/* Role Description */}
              <div className="mt-4">
                <TabsContent value="job_seeker">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 md:p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 text-sm md:text-base">
                      Job Seeker Access
                    </h4>
                    <div className="space-y-1">
                      {roleFeatures.job_seeker.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <feature.icon className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-blue-800 dark:text-blue-200">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="recruiter">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 md:p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 text-sm md:text-base">
                      Recruiter Access
                    </h4>
                    <div className="space-y-1">
                      {roleFeatures.recruiter.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <feature.icon className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-blue-800 dark:text-blue-200">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm md:text-base">
                  Email Address
                </Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 h-10 md:h-12 text-sm md:text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm md:text-base">
                  Password
                </Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-10 md:h-12 text-sm md:text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-target"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <Label htmlFor="remember" className="text-xs md:text-sm">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-xs md:text-sm text-blue-600 hover:underline touch-target"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full py-3 md:py-4 text-sm md:text-lg bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderIcon className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                    <span className="text-sm md:text-base">Signing in...</span>
                  </>
                ) : (
                  <span className="text-sm md:text-base">Sign In</span>
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or try demo accounts
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleDemoLogin("job_seeker", "demo.jobseeker@carerai.com")
                }
                disabled={loading}
                className="py-3 md:py-4 text-xs md:text-sm touch-target"
              >
                <UserIcon className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Demo Seeker</span>
                <span className="sm:hidden">Seeker</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleDemoLogin("recruiter", "demo.recruiter@carerai.com")
                }
                disabled={loading}
                className="py-3 md:py-4 text-xs md:text-sm touch-target"
              >
                <BuildingIcon className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                Recruiter
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t">
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline font-medium touch-target"
                >
                  Create free account
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

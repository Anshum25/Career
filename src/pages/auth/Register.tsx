import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  BriefcaseIcon,
  BuildingIcon,
  UserIcon,
  LoaderIcon,
  CheckIcon,
  StarIcon,
  BrainIcon,
  VideoIcon,
} from "lucide-react";
import { UserRole } from "@/lib/types";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [selectedRole, setSelectedRole] = useState<UserRole>("job_seeker");
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        selectedRole,
      );
      navigate("/profile/setup");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const roleFeatures = {
    job_seeker: [
      { icon: BrainIcon, text: "AI-powered job matching" },
      { icon: VideoIcon, text: "Video resume builder" },
      { icon: StarIcon, text: "Career coaching & skill assessment" },
      { icon: CheckIcon, text: "Instant interview opportunities" },
    ],
    recruiter: [
      { icon: BrainIcon, text: "AI candidate screening" },
      { icon: UserIcon, text: "Advanced candidate search" },
      { icon: VideoIcon, text: "Video interview platform" },
      { icon: CheckIcon, text: "Real-time hiring analytics" },
    ],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BriefcaseIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Join CareerAI</CardTitle>
          <CardDescription>
            Create your account and start your AI-powered career journey
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value as UserRole)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="job_seeker"
                className="flex items-center gap-2"
              >
                <UserIcon className="h-4 w-4" />
                Job Seeker
              </TabsTrigger>
              <TabsTrigger
                value="recruiter"
                className="flex items-center gap-2"
              >
                <BuildingIcon className="h-4 w-4" />
                Recruiter
              </TabsTrigger>
            </TabsList>

            <TabsContent value="job_seeker" className="space-y-4 mt-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">
                  What you'll get as a Job Seeker:
                </h3>
                <div className="space-y-2">
                  {roleFeatures.job_seeker.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <feature.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recruiter" className="space-y-4 mt-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">
                  What you'll get as a Recruiter:
                </h3>
                <div className="space-y-2">
                  {roleFeatures.recruiter.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <feature.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeToTerms", checked)
                }
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

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
import {
  BriefcaseIcon,
  BuildingIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { UserRole } from "@/lib/types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("job_seeker");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BriefcaseIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your CareerAI account to continue your journey
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
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Access AI-powered job matching, resume builder, and career
                  coaching tools.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="recruiter" className="space-y-4 mt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Find top talent with AI matching, instant interviews, and
                  smart hiring tools.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

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

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleDemoLogin("job_seeker", "demo.jobseeker@carerai.com")
              }
              disabled={loading}
            >
              <UserIcon className="mr-2 h-4 w-4" />
              Demo Seeker
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleDemoLogin("recruiter", "demo.recruiter@carerai.com")
              }
              disabled={loading}
            >
              <BuildingIcon className="mr-2 h-4 w-4" />
              Demo Recruiter
            </Button>
          </div>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

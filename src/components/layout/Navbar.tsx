import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeProvider";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BriefcaseIcon,
  SearchIcon,
  BellIcon,
  MessageSquareIcon,
  UserIcon,
  LogOutIcon,
  SettingsIcon,
  BuildingIcon,
  UsersIcon,
  MapPinIcon,
  StarIcon,
  BookmarkIcon,
} from "lucide-react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "recruiter":
        return "/dashboard/recruiter";
      case "job_seeker":
        return "/dashboard/seeker";
      default:
        return "/dashboard/seeker";
    }
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "job_seeker":
        return "Job Seeker";
      case "recruiter":
        return "Recruiter";
      case "admin":
        return "Admin";
      case "freelancer":
        return "Freelancer";
      default:
        return "User";
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <BriefcaseIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CareerAI</span>
          </Link>

          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/jobs"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                  location.pathname === "/jobs"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <SearchIcon className="h-4 w-4" />
                Find Jobs
              </Link>

              {user?.role === "job_seeker" && (
                <>
                  <Link
                    to="/resume/builder"
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                      location.pathname === "/resume/builder"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <UserIcon className="h-4 w-4" />
                    Resume
                  </Link>
                  <Link
                    to="/jobs?view=map"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
                  >
                    <MapPinIcon className="h-4 w-4" />
                    Near Me
                  </Link>
                </>
              )}

              {user?.role === "recruiter" && (
                <>
                  <Link
                    to="/dashboard/recruiter"
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                      location.pathname === "/dashboard/recruiter"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <BuildingIcon className="h-4 w-4" />
                    My Jobs
                  </Link>
                  <Link
                    to="/candidates"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
                  >
                    <UsersIcon className="h-4 w-4" />
                    Candidates
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <NotificationCenter />

              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to="/messages">
                  <MessageSquareIcon className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                    2
                  </Badge>
                </Link>
              </Button>

              {user?.role === "recruiter" && (
                <Button asChild>
                  <Link to="/jobs/post">Post Job</Link>
                </Button>
              )}

              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <Badge variant="secondary" className="w-fit text-xs">
                        {getRoleDisplay(user.role)}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center gap-2"
                    >
                      <UserIcon className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/applications"
                      className="flex items-center gap-2"
                    >
                      <BriefcaseIcon className="h-4 w-4" />
                      My Applications
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages" className="flex items-center gap-2">
                      <MessageSquareIcon className="h-4 w-4" />
                      Messages
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/saved-jobs" className="flex items-center gap-2">
                      <BookmarkIcon className="h-4 w-4" />
                      Saved Jobs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile/naukri"
                      className="flex items-center gap-2"
                    >
                      <SettingsIcon className="h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "job_seeker" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/job-alerts"
                          className="flex items-center gap-2"
                        >
                          <BellIcon className="h-4 w-4" />
                          Job Alerts
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/career-path"
                          className="flex items-center gap-2"
                        >
                          <StarIcon className="h-4 w-4" />
                          Career Path
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/find-my-match"
                          className="flex items-center gap-2"
                        >
                          <StarIcon className="h-4 w-4" />
                          Find My Match
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2"
                      >
                        <SettingsIcon className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

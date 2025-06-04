import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BrainIcon,
  TrendingUp,
  BriefcaseIcon,
  StarIcon,
  VideoIcon,
  MapPinIcon,
  ClockIcon,
  EyeIcon,
  MessageSquareIcon,
  CalendarIcon,
  AwardIcon,
  ArrowRightIcon,
  PlusIcon,
  BellIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  mockJobSeekerProfile,
  mockAIRecommendations,
  mockJobs,
} from "@/lib/mockData";

export default function JobSeekerDashboard() {
  const { user } = useAuth();
  const [profile] = useState(mockJobSeekerProfile);
  const [recommendations] = useState(mockAIRecommendations);
  const [recentJobs] = useState(mockJobs.slice(0, 3));

  const stats = [
    { label: "Profile Views", value: "127", icon: EyeIcon, change: "+12%" },
    { label: "Job Matches", value: "23", icon: BriefcaseIcon, change: "+5%" },
    { label: "Applications", value: "8", icon: TrendingUp, change: "+3" },
    {
      label: "Interview Requests",
      value: "2",
      icon: MessageSquareIcon,
      change: "+2",
    },
  ];

  const recentActivity = [
    {
      type: "application",
      title: "Applied to Senior Developer at TechCorp",
      time: "2 hours ago",
      icon: BriefcaseIcon,
    },
    {
      type: "view",
      title: "Profile viewed by InnovateInc recruiter",
      time: "5 hours ago",
      icon: EyeIcon,
    },
    {
      type: "match",
      title: "New job match: UX Designer at DesignCo",
      time: "1 day ago",
      icon: StarIcon,
    },
    {
      type: "skill",
      title: "Completed React skill assessment",
      time: "2 days ago",
      icon: AwardIcon,
    },
  ];

  return (
    <div className="container py-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your job search today
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BellIcon className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button asChild>
            <Link to="/jobs">
              <BriefcaseIcon className="w-4 h-4 mr-2" />
              Find Jobs
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Profile Strength
                  </CardTitle>
                  <CardDescription>
                    Complete your profile to increase your visibility
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {profile.resumeScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={profile.resumeScore} className="w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <StarIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      Skills & Experience
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Complete
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <VideoIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Video Resume</div>
                    <div className="text-xs text-muted-foreground">Added</div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/profile/setup">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Improve Profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainIcon className="w-5 h-5" />
                AI Career Coach
              </CardTitle>
              <CardDescription>
                Personalized recommendations to boost your career
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-muted/30"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      rec.priority === "high"
                        ? "bg-red-500"
                        : rec.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="font-medium text-sm">{rec.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {rec.description}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" asChild>
                    <Link to={rec.actionUrl || "#"}>
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recommended for You</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/jobs">
                    View All
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={job.company.logo}
                      alt={job.company.name}
                    />
                    <AvatarFallback>{job.company.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {job.company.name}
                        </p>
                      </div>
                      <Badge variant="secondary">{job.matchScore}% match</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-3 h-3" />
                        {job.location.city}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        {job.workMode}
                      </div>
                      <div>
                        ${job.salary.min / 1000}k - ${job.salary.max / 1000}k
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" asChild>
                        <Link to={`/jobs/${job.id}`}>View Details</Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        Quick Apply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/resume/builder">
                  <VideoIcon className="w-4 h-4 mr-2" />
                  Update Resume
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/jobs?view=map">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  Jobs Near Me
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/skills/assessment">
                  <AwardIcon className="w-4 h-4 mr-2" />
                  Skill Assessment
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/job-fairs">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Live Job Fairs
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AwardIcon className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {profile.badges.slice(0, 4).map((badge) => (
                  <div
                    key={badge.id}
                    className="text-center p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium">{badge.name}</div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                asChild
              >
                <Link to="/achievements">View All</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

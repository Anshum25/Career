import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BrainIcon,
  ZapIcon,
  TrophyIcon,
  MessageSquareIcon,
  FileTextIcon,
  TargetIcon,
  CalendarIcon,
  StarIcon,
  UsersIcon,
  SearchIcon,
  MicIcon,
  BarChart3Icon,
  BookmarkeIcon,
  BuildingIcon,
  BellIcon,
  MapPinIcon,
  ShieldIcon,
  DollarSignIcon,
  GraduationCapIcon,
  HeartIcon,
  TrendingUpIcon,
  PlusIcon,
  ClockIcon,
  GlobeIcon,
  LightbulbIcon,
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category:
    | "ai"
    | "automation"
    | "community"
    | "tools"
    | "assessment"
    | "admin";
  path: string;
  isNew?: boolean;
  isPremium?: boolean;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime?: string;
}

export default function FeatureHub() {
  const features: Feature[] = [
    // AI-Powered Features
    {
      id: "smart-career-builder",
      title: "Smart Career Path Builder",
      description:
        "AI-powered career roadmap with skills, courses, and timeline to reach your dream job",
      icon: <BrainIcon className="h-6 w-6" />,
      category: "ai",
      path: "/ai/career-builder",
      isNew: true,
      difficulty: "beginner",
      estimatedTime: "10 min",
    },
    {
      id: "resume-scorer",
      title: "Live Resume Scorer & Enhancer",
      description:
        "Upload resume for instant AI scoring, feedback, and optimization suggestions",
      icon: <FileTextIcon className="h-6 w-6" />,
      category: "ai",
      path: "/ai/resume-scorer",
      isNew: true,
      difficulty: "beginner",
      estimatedTime: "5 min",
    },
    {
      id: "voice-interview",
      title: "Voice & Video AI Interviews",
      description:
        "Practice interviews with AI analysis of confidence, tone, and nervousness",
      icon: <MicIcon className="h-6 w-6" />,
      category: "ai",
      path: "/ai/voice-interview",
      isPremium: true,
      difficulty: "intermediate",
      estimatedTime: "30 min",
    },
    {
      id: "skill-matcher",
      title: "Real-Time Skill Matching",
      description:
        "NLP-based job matching showing exact skill compatibility percentages",
      icon: <TargetIcon className="h-6 w-6" />,
      category: "ai",
      path: "/ai/skill-matcher",
      difficulty: "intermediate",
      estimatedTime: "15 min",
    },

    // Automation Features
    {
      id: "auto-apply",
      title: "1-Click Auto Apply",
      description:
        "Automatically apply to multiple jobs with AI-generated cover letters",
      icon: <ZapIcon className="h-6 w-6" />,
      category: "automation",
      path: "/auto-apply",
      isPremium: true,
      difficulty: "advanced",
      estimatedTime: "Setup once",
    },
    {
      id: "job-alerts",
      title: "Smart Job Alerts",
      description:
        "AI-powered job notifications with advanced filtering and matching",
      icon: <BellIcon className="h-6 w-6" />,
      category: "automation",
      path: "/job-alerts",
      difficulty: "beginner",
      estimatedTime: "5 min",
    },

    // Community Features
    {
      id: "forums",
      title: "Job Seekers Community",
      description:
        "Reddit-style forums for interview experiences, salary discussions, and advice",
      icon: <MessageSquareIcon className="h-6 w-6" />,
      category: "community",
      path: "/community/forums",
      difficulty: "beginner",
      estimatedTime: "Ongoing",
    },
    {
      id: "company-profiles",
      title: "Company Profiles & Reviews",
      description:
        "Comprehensive company information with employee reviews and ratings",
      icon: <BuildingIcon className="h-6 w-6" />,
      category: "community",
      path: "/companies",
      difficulty: "beginner",
      estimatedTime: "10 min",
    },

    // Productivity Tools
    {
      id: "job-journal",
      title: "Job Search Journal",
      description:
        "Track applications, progress, and export comprehensive PDF reports",
      icon: <BarChart3Icon className="h-6 w-6" />,
      category: "tools",
      path: "/tools/job-journal",
      difficulty: "intermediate",
      estimatedTime: "Ongoing",
    },
    {
      id: "saved-jobs",
      title: "Advanced Saved Jobs",
      description:
        "Bookmark jobs with priority levels, status tracking, and personal notes",
      icon: <BookmarkeIcon className="h-6 w-6" />,
      category: "tools",
      path: "/saved-jobs",
      difficulty: "beginner",
      estimatedTime: "5 min",
    },
    {
      id: "interview-prep",
      title: "AI Interview Preparation",
      description:
        "Interactive chatbot for interview practice with feedback and scoring",
      icon: <StarIcon className="h-6 w-6" />,
      category: "tools",
      path: "/interview-prep",
      difficulty: "intermediate",
      estimatedTime: "20 min",
    },

    // Assessment & Matching
    {
      id: "personality-test",
      title: "Personality-Career Match Test",
      description:
        "MBTI-style assessment with personalized career recommendations",
      icon: <HeartIcon className="h-6 w-6" />,
      category: "assessment",
      path: "/assessment/personality",
      difficulty: "beginner",
      estimatedTime: "15 min",
    },
    {
      id: "job-tinder",
      title: "Job Tinder - Find My Match",
      description:
        "Swipe-based job matching with AI-powered compatibility scoring",
      icon: <TrendingUpIcon className="h-6 w-6" />,
      category: "assessment",
      path: "/find-my-match",
      isNew: true,
      difficulty: "beginner",
      estimatedTime: "10 min",
    },
    {
      id: "gamification",
      title: "Gamified Job Hunt",
      description:
        "Earn points, badges, and compete on leaderboards while job searching",
      icon: <TrophyIcon className="h-6 w-6" />,
      category: "assessment",
      path: "/gamification",
      difficulty: "beginner",
      estimatedTime: "Ongoing",
    },

    // Admin Features
    {
      id: "admin-dashboard",
      title: "Admin Dashboard",
      description:
        "Comprehensive platform management with security and analytics",
      icon: <ShieldIcon className="h-6 w-6" />,
      category: "admin",
      path: "/admin/dashboard",
      difficulty: "advanced",
      estimatedTime: "Admin only",
    },

    // Enhanced Profiles
    {
      id: "naukri-profile",
      title: "Enhanced Profile Management",
      description:
        "Naukri.com-style profile with completion tracking and optimization",
      icon: <UsersIcon className="h-6 w-6" />,
      category: "tools",
      path: "/profile/naukri",
      difficulty: "beginner",
      estimatedTime: "20 min",
    },
  ];

  const categories = [
    {
      id: "ai",
      name: "AI-Powered",
      color: "bg-blue-100 text-blue-800",
      icon: <BrainIcon className="h-4 w-4" />,
    },
    {
      id: "automation",
      name: "Automation",
      color: "bg-green-100 text-green-800",
      icon: <ZapIcon className="h-4 w-4" />,
    },
    {
      id: "community",
      name: "Community",
      color: "bg-purple-100 text-purple-800",
      icon: <MessageSquareIcon className="h-4 w-4" />,
    },
    {
      id: "tools",
      name: "Productivity",
      color: "bg-orange-100 text-orange-800",
      icon: <BarChart3Icon className="h-4 w-4" />,
    },
    {
      id: "assessment",
      name: "Assessment",
      color: "bg-pink-100 text-pink-800",
      icon: <HeartIcon className="h-4 w-4" />,
    },
    {
      id: "admin",
      name: "Admin",
      color: "bg-red-100 text-red-800",
      icon: <ShieldIcon className="h-4 w-4" />,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">CareerAI Feature Hub</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive suite of AI-powered tools, automation
            features, and community resources designed to accelerate your job
            search and career growth.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              {features.length} Total Features
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {features.filter((f) => f.isNew).length} New This Month
            </Badge>
          </div>
        </div>

        {/* Category Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const categoryFeatures = features.filter(
              (f) => f.category === category.id,
            );
            return (
              <Card key={category.id} className="text-center">
                <CardContent className="p-4">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${category.color} mb-2`}
                  >
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {categoryFeatures.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Features</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features by Category */}
        {categories.map((category) => {
          const categoryFeatures = features.filter(
            (f) => f.category === category.id,
          );
          if (categoryFeatures.length === 0) return null;

          return (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${category.color}`}
                >
                  {category.icon}
                  <span className="font-semibold">
                    {category.name} Features
                  </span>
                </div>
                <Badge variant="secondary">
                  {categoryFeatures.length} tools
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryFeatures.map((feature) => (
                  <Card
                    key={feature.id}
                    className="hover:shadow-lg transition-shadow h-full"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            {feature.icon}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight">
                              {feature.title}
                            </CardTitle>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          {feature.isNew && (
                            <Badge
                              variant="default"
                              className="bg-green-100 text-green-800"
                            >
                              New
                            </Badge>
                          )}
                          {feature.isPremium && (
                            <Badge
                              variant="default"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              Premium
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="leading-relaxed">
                        {feature.description}
                      </CardDescription>

                      <div className="flex items-center justify-between text-sm">
                        <Badge
                          variant="outline"
                          className={getDifficultyColor(feature.difficulty)}
                        >
                          {feature.difficulty}
                        </Badge>
                        {feature.estimatedTime && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <ClockIcon className="h-4 w-4" />
                            {feature.estimatedTime}
                          </div>
                        )}
                      </div>

                      <Button asChild className="w-full">
                        <Link to={feature.path}>Explore Feature</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* Quick Start Guide */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LightbulbIcon className="h-6 w-6 text-blue-600" />
              Quick Start Guide
            </CardTitle>
            <CardDescription>
              New to CareerAI? Here's the recommended path to get the most out
              of our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-semibold">Complete Profile</h4>
                <p className="text-sm text-muted-foreground">
                  Set up your enhanced profile with skills and experience
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/profile/naukri">Start Here</Link>
                </Button>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <h4 className="font-semibold">Test & Assess</h4>
                <p className="text-sm text-muted-foreground">
                  Take personality test and discover your ideal career matches
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/assessment/personality">Take Test</Link>
                </Button>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-semibold">Find & Apply</h4>
                <p className="text-sm text-muted-foreground">
                  Use AI skill matching and auto-apply to relevant positions
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/ai/skill-matcher">Find Jobs</Link>
                </Button>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold text-orange-600">4</span>
                </div>
                <h4 className="font-semibold">Track & Optimize</h4>
                <p className="text-sm text-muted-foreground">
                  Monitor progress and improve with AI-powered insights
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/tools/job-journal">Track Progress</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
            <CardDescription>
              See how our features are helping job seekers worldwide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  2.5M+
                </div>
                <p className="text-sm text-muted-foreground">
                  Resumes Analyzed
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  870K+
                </div>
                <p className="text-sm text-muted-foreground">
                  Applications Automated
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  1.2M+
                </div>
                <p className="text-sm text-muted-foreground">
                  Interview Practices
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  78%
                </div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

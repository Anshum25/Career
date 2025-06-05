import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BrainIcon,
  ZapIcon,
  TrophyIcon,
  MessageSquareIcon,
  FileTextIcon,
  TargetIcon,
  MicIcon,
  BarChart3Icon,
  StarIcon,
  RocketIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon,
  TrendingUpIcon,
  UsersIcon,
  HeartIcon,
  ShieldIcon,
  DollarSignIcon,
  MapPinIcon,
  CalendarIcon,
  BookOpenIcon,
  SearchIcon,
  MessageCircleIcon,
  UserIcon,
  SettingsIcon,
  BellIcon,
  FilterIcon,
  PlusIcon,
  EyeIcon,
  RefreshCwIcon,
  FlameIcon,
} from "lucide-react";

export default function ModernHomePage() {
  const allFeatures = [
    {
      id: "smart-search",
      title: "Smart Job Search",
      description:
        "AI-powered search with advanced filters, salary ranges, and company matching",
      icon: <SearchIcon className="h-8 w-8" />,
      path: "/jobs",
      category: "Core",
      gradient: "from-blue-500 to-cyan-500",
      cta: "Start Searching",
    },
    {
      id: "ai-resume",
      title: "AI Resume Builder",
      description:
        "Build perfect resumes with AI suggestions, real-time scoring, and optimization",
      icon: <FileTextIcon className="h-8 w-8" />,
      path: "/ai/resume-scorer",
      category: "AI",
      gradient: "from-purple-500 to-pink-500",
      cta: "Build Resume",
    },
    {
      id: "job-match",
      title: "Job Match Score",
      description:
        "See your compatibility percentage with each job using NLP analysis",
      icon: <TargetIcon className="h-8 w-8" />,
      path: "/ai/skill-matcher",
      category: "AI",
      gradient: "from-green-500 to-emerald-500",
      cta: "Get Match Score",
    },
    {
      id: "company-chat",
      title: "Instant Company Chat",
      description:
        "Connect directly with recruiters through our integrated messaging system",
      icon: <MessageCircleIcon className="h-8 w-8" />,
      path: "/messages",
      category: "Communication",
      gradient: "from-orange-500 to-red-500",
      cta: "Start Chatting",
    },
    {
      id: "interview-schedule",
      title: "Schedule Interviews",
      description:
        "Smart calendar integration with automated scheduling and reminders",
      icon: <CalendarIcon className="h-8 w-8" />,
      path: "/tools/job-journal",
      category: "Productivity",
      gradient: "from-indigo-500 to-purple-500",
      cta: "Schedule Now",
    },
    {
      id: "saved-applications",
      title: "Saved Applications",
      description:
        "Track all your applications with priority levels, notes, and status updates",
      icon: <BookOpenIcon className="h-8 w-8" />,
      path: "/saved-jobs",
      category: "Tracking",
      gradient: "from-teal-500 to-blue-500",
      cta: "View Applications",
    },
    {
      id: "analytics",
      title: "Application Analytics",
      description:
        "Detailed insights with timeline view, success rates, and optimization tips",
      icon: <BarChart3Icon className="h-8 w-8" />,
      path: "/tools/job-journal",
      category: "Analytics",
      gradient: "from-yellow-500 to-orange-500",
      cta: "View Analytics",
    },
    {
      id: "profile-dashboard",
      title: "Profile & Dashboard",
      description:
        "Comprehensive profile management with completion tracking and insights",
      icon: <UserIcon className="h-8 w-8" />,
      path: "/profile/naukri",
      category: "Profile",
      gradient: "from-pink-500 to-rose-500",
      cta: "Complete Profile",
    },
    {
      id: "voice-interview",
      title: "AI Voice Interview",
      description:
        "Practice interviews with AI feedback on confidence, tone, and content",
      icon: <MicIcon className="h-8 w-8" />,
      path: "/ai/voice-interview",
      category: "AI",
      gradient: "from-violet-500 to-purple-500",
      cta: "Practice Interview",
    },
    {
      id: "auto-apply",
      title: "Auto Apply",
      description:
        "One-click application to multiple jobs with AI-generated cover letters",
      icon: <ZapIcon className="h-8 w-8" />,
      path: "/auto-apply",
      category: "Automation",
      gradient: "from-cyan-500 to-blue-500",
      cta: "Auto Apply",
    },
    {
      id: "career-path",
      title: "Career Path Builder",
      description:
        "AI creates personalized roadmap with skills, courses, and timeline",
      icon: <BrainIcon className="h-8 w-8" />,
      path: "/ai/career-builder",
      category: "AI",
      gradient: "from-emerald-500 to-teal-500",
      cta: "Build Career Path",
    },
    {
      id: "gamification",
      title: "Gamified Experience",
      description:
        "Earn points, unlock achievements, and compete on leaderboards",
      icon: <TrophyIcon className="h-8 w-8" />,
      path: "/gamification",
      category: "Engagement",
      gradient: "from-amber-500 to-yellow-500",
      cta: "Start Gaming",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      content:
        "The AI career path builder helped me identify exactly what skills I needed. Got my dream job in 6 months!",
      avatar: "/avatars/priya.jpg",
      rating: 5,
      company: "Google",
    },
    {
      name: "Rahul Gupta",
      role: "Product Manager at Flipkart",
      content:
        "Auto-apply feature saved me hours. Applied to 50+ jobs in one day with personalized cover letters.",
      avatar: "/avatars/rahul.jpg",
      rating: 5,
      company: "Flipkart",
    },
    {
      name: "Sneha Patel",
      role: "Data Scientist at Microsoft",
      content:
        "Voice interview practice boosted my confidence. The AI feedback was incredibly detailed and helpful.",
      avatar: "/avatars/sneha.jpg",
      rating: 5,
      company: "Microsoft",
    },
  ];

  const stats = [
    {
      label: "Active Users",
      value: "500K+",
      icon: <UsersIcon className="h-6 w-6" />,
      change: "+12%",
    },
    {
      label: "Success Rate",
      value: "89%",
      icon: <TrendingUpIcon className="h-6 w-6" />,
      change: "+5%",
    },
    {
      label: "AI Matches",
      value: "2.5M+",
      icon: <BrainIcon className="h-6 w-6" />,
      change: "+23%",
    },
    {
      label: "Jobs Filled",
      value: "125K+",
      icon: <StarIcon className="h-6 w-6" />,
      change: "+18%",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 overflow-x-hidden">
      {/* Hero Section - Full Width with Asymmetrical Design */}
      <section className="relative w-full min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 px-8 lg:px-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl dark:from-blue-500/10 dark:to-purple-500/10"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl dark:from-indigo-500/10 dark:to-pink-500/10"></div>
        </div>

        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content - Asymmetrical Left Side */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="text-lg px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-800 shadow-lg"
              >
                <RocketIcon className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                Next-Generation AI Job Platform
              </Badge>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">
                  Career Success
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                Transform your job search with cutting-edge AI tools, automated
                applications, and a thriving community. Join{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  500K+
                </span>{" "}
                professionals who found their dream careers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/register">
                  Start Your Journey
                  <RocketIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 hover:bg-white dark:hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/features">
                  <PlayIcon className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                    {stat.icon}
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Floating Feature Cards */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-1 gap-6">
              {/* Floating Cards with Glassmorphism */}
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white">
                      <BrainIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">
                        AI-Powered Matching
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        87% compatibility rate
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 ml-8">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                      <ZapIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">
                        Auto Apply
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        50+ jobs in minutes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                      <TrophyIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">
                        Gamified Experience
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Earn while you search
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* All Features Section - Full Width Grid */}
      <section className="w-full py-20 px-8 lg:px-20 bg-gray-50 dark:bg-slate-800">
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <Badge
              variant="outline"
              className="text-lg px-6 py-3 bg-white dark:bg-slate-700 shadow-lg"
            >
              <StarIcon className="mr-2 h-5 w-5 text-yellow-500" />
              Complete Feature Suite
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent block">
                Land Your Dream Job
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover our complete toolkit designed to accelerate your career
              success with AI-powered intelligence and automation.
            </p>
          </div>

          {/* Features Grid - Asymmetrical Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {allFeatures.map((feature, index) => (
              <Card
                key={feature.id}
                className={`group relative overflow-hidden bg-white dark:bg-slate-900 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  index === 0
                    ? "md:col-span-2 lg:col-span-2"
                    : index === 3
                      ? "lg:col-span-2"
                      : index === 7
                        ? "md:col-span-2"
                        : ""
                }`}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                    >
                      {feature.icon}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                    >
                      {feature.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <Button
                    className={`w-full bg-gradient-to-r ${feature.gradient} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                    asChild
                  >
                    <Link to={feature.path}>
                      {feature.cta}
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Action Bar */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl p-8 text-center text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg mb-6 opacity-90">
              Choose your path and begin your career transformation today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link to="/register">Create Free Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/features">Explore All Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - Full Width */}
      <section className="w-full py-20 px-8 lg:px-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 text-white">
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <Badge
              variant="outline"
              className="text-lg px-6 py-3 border-white/30 text-white bg-white/10 backdrop-blur-sm"
            >
              <HeartIcon className="mr-2 h-5 w-5" />
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold">
              Transforming Careers
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
                Across the Globe
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/10 dark:bg-slate-800/20 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-500 transform hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <blockquote className="text-lg italic leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white/30">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {testimonial.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-white/80">{testimonial.role}</div>
                        <div className="text-sm text-white/60">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Full Width Gradient */}
      <section className="w-full py-20 px-8 lg:px-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-700 dark:via-purple-700 dark:to-indigo-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Dream Career
            <span className="block text-yellow-300">Starts Here</span>
          </h2>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            Join 500,000+ professionals who've accelerated their career success
            with CareerAI's cutting-edge platform and AI-powered tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-xl px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/register">
                Start Free Today
                <CheckCircleIcon className="ml-2 h-6 w-6" />
              </Link>
            </Button>

            <div className="flex items-center gap-4 text-white/80">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30"
                  ></div>
                ))}
              </div>
              <span className="text-sm">Trusted by 500K+ users</span>
            </div>
          </div>

          <div className="text-sm text-white/70 space-x-8">
            <span>✨ No credit card required</span>
            <span>⚡ Setup in 2 minutes</span>
            <span>🛡️ Completely secure</span>
          </div>
        </div>
      </section>
    </div>
  );
}

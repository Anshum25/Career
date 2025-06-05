import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  SearchIcon,
  MessageCircleIcon,
  UserIcon,
  CalendarIcon,
  BookOpenIcon,
} from "lucide-react";

export default function ModernHomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const allFeatures = [
    {
      id: "smart-search",
      title: "Smart Job Search",
      description:
        "AI-powered search with advanced filters and company matching",
      icon: <SearchIcon className="h-6 w-6" />,
      path: "/jobs",
      category: "Core",
    },
    {
      id: "ai-resume",
      title: "AI Resume Builder",
      description:
        "Build perfect resumes with AI suggestions and real-time scoring",
      icon: <FileTextIcon className="h-6 w-6" />,
      path: "/ai/resume-scorer",
      category: "AI",
    },
    {
      id: "job-match",
      title: "Job Match Score",
      description: "See your compatibility percentage with each job using NLP",
      icon: <TargetIcon className="h-6 w-6" />,
      path: "/ai/skill-matcher",
      category: "AI",
    },
    {
      id: "company-chat",
      title: "Direct Messaging",
      description: "Connect directly with recruiters through integrated chat",
      icon: <MessageCircleIcon className="h-6 w-6" />,
      path: "/messages",
      category: "Communication",
    },
    {
      id: "interview-schedule",
      title: "Smart Scheduling",
      description: "Calendar integration with automated interview scheduling",
      icon: <CalendarIcon className="h-6 w-6" />,
      path: "/tools/job-journal",
      category: "Productivity",
    },
    {
      id: "application-tracker",
      title: "Application Tracker",
      description: "Track applications with priority levels and status updates",
      icon: <BookOpenIcon className="h-6 w-6" />,
      path: "/applications",
      category: "Tracking",
    },
    {
      id: "analytics",
      title: "Career Analytics",
      description: "Detailed insights with success rates and optimization tips",
      icon: <BarChart3Icon className="h-6 w-6" />,
      path: "/tools/job-journal",
      category: "Analytics",
    },
    {
      id: "profile-builder",
      title: "Profile Builder",
      description: "Comprehensive profile management with completion tracking",
      icon: <UserIcon className="h-6 w-6" />,
      path: "/profile/naukri",
      category: "Profile",
    },
    {
      id: "voice-interview",
      title: "AI Interview Practice",
      description:
        "Practice interviews with AI feedback on confidence and tone",
      icon: <MicIcon className="h-6 w-6" />,
      path: "/ai/voice-interview",
      category: "AI",
    },
    {
      id: "auto-apply",
      title: "Auto Apply",
      description: "One-click application with AI-generated cover letters",
      icon: <ZapIcon className="h-6 w-6" />,
      path: "/auto-apply",
      category: "Automation",
    },
    {
      id: "career-path",
      title: "Career Path Builder",
      description: "AI creates personalized roadmap with skills and timeline",
      icon: <BrainIcon className="h-6 w-6" />,
      path: "/ai/career-builder",
      category: "AI",
    },
    {
      id: "gamification",
      title: "Gamified Experience",
      description:
        "Earn points, unlock achievements, and compete on leaderboards",
      icon: <TrophyIcon className="h-6 w-6" />,
      path: "/gamification",
      category: "Engagement",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Google",
      content:
        "The AI career path builder helped me identify exactly what skills I needed. Got my dream job in 6 months!",
      avatar: "/avatars/priya.jpg",
      rating: 5,
    },
    {
      name: "Rahul Gupta",
      role: "Product Manager",
      company: "Flipkart",
      content:
        "Auto-apply feature saved me hours. Applied to 50+ jobs in one day with personalized cover letters.",
      avatar: "/avatars/rahul.jpg",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      role: "Data Scientist",
      company: "Microsoft",
      content:
        "Voice interview practice boosted my confidence. The AI feedback was incredibly detailed and helpful.",
      avatar: "/avatars/sneha.jpg",
      rating: 5,
    },
  ];

  const stats = [
    {
      label: "Active Users",
      value: "500K+",
      icon: <UsersIcon className="h-5 w-5" />,
      change: "+12%",
    },
    {
      label: "Success Rate",
      value: "89%",
      icon: <TrendingUpIcon className="h-5 w-5" />,
      change: "+5%",
    },
    {
      label: "AI Matches",
      value: "2.5M+",
      icon: <BrainIcon className="h-5 w-5" />,
      change: "+23%",
    },
    {
      label: "Jobs Filled",
      value: "125K+",
      icon: <StarIcon className="h-5 w-5" />,
      change: "+18%",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <Badge
                variant="outline"
                className="text-base px-4 py-2 bg-white/80 dark:bg-gray-800/80 border-blue-200 dark:border-blue-800"
              >
                <RocketIcon className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                AI-Powered Job Platform
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
                Land Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Dream Job
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                Transform your career with AI-powered tools, automated
                applications, and intelligent matching. Join 500K+ professionals
                who found success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                  asChild
                >
                  <Link to="/register">
                    Get Started Free
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
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
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                      {stat.icon}
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Feature Preview */}
            <motion.div variants={itemVariants} className="relative">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-600 rounded-xl text-white">
                        <BrainIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          AI-Powered Matching
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          87% compatibility rate
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl ml-8">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-600 rounded-xl text-white">
                        <ZapIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          Auto Apply
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          50+ jobs in minutes
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-600 rounded-xl text-white">
                        <TrophyIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
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
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full py-20 bg-white dark:bg-gray-900"
      >
        <div className="w-full px-6 lg:px-12 xl:px-20 space-y-16">
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <Badge variant="outline" className="text-base px-4 py-2">
              <StarIcon className="mr-2 h-4 w-4 text-yellow-500" />
              Complete Feature Suite
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Accelerate Your Career
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Discover our complete toolkit designed to help you find, apply to,
              and land your dream job with AI-powered intelligence.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 group-hover:bg-blue-100 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-all duration-300">
                        {feature.icon}
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {feature.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                      asChild
                    >
                      <Link to={feature.path}>
                        Explore
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="w-full px-6 lg:px-12 xl:px-20 space-y-16">
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <Badge variant="outline" className="text-base px-4 py-2">
              Success Stories
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Trusted by Top Professionals
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 dark:text-gray-300 italic">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={testimonial.avatar} />
                          <AvatarFallback className="bg-blue-600 text-white">
                            {testimonial.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full py-20 bg-gray-900 dark:bg-black text-white"
      >
        <div className="w-full px-6 lg:px-12 xl:px-20 text-center space-y-8">
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold"
          >
            Ready to Transform
            <span className="text-blue-400 block">Your Career?</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl max-w-3xl mx-auto text-gray-300"
          >
            Join 500,000+ professionals who've accelerated their career success
            with CareerAI's cutting-edge platform and AI-powered tools.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-white text-gray-900 hover:bg-gray-100"
              asChild
            >
              <Link to="/register">
                Start Free Today
                <CheckCircleIcon className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <div className="flex items-center gap-4 text-gray-400">
              <span>✨ No credit card required</span>
              <span>⚡ Setup in 2 minutes</span>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

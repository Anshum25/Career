import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
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
import { Input } from "@/components/ui/input";
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
  MapPinIcon,
  ClockIcon,
  HomeIcon,
  PhoneIcon,
  TruckIcon,
  ShoppingBagIcon,
  ComputerIcon,
  HeartIcon,
  BuildingIcon,
  GraduationCapIcon,
  AwardIcon,
  SparklesIcon,
  BoltIcon,
  GlobeIcon,
  ShieldIcon,
} from "lucide-react";

export default function ModernHomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleProtectedFeatureClick = (path: string) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(path);
  };

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

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

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
      label: "Jobs Posted",
      value: "125K+",
      icon: <StarIcon className="h-5 w-5" />,
      change: "+18%",
    },
  ];

  const quickActions = [
    {
      title: "Find Jobs",
      desc: "Browse 100K+ opportunities",
      icon: <SearchIcon className="h-6 w-6" />,
      path: "/jobs",
      color: "from-blue-500 to-blue-600",
      delay: 0,
    },
    {
      title: "AI Resume",
      desc: "Build & optimize your resume",
      icon: <FileTextIcon className="h-6 w-6" />,
      path: "/ai/resume-scorer",
      color: "from-purple-500 to-purple-600",
      delay: 0.1,
    },
    {
      title: "Skill Match",
      desc: "See job compatibility",
      icon: <TargetIcon className="h-6 w-6" />,
      path: "/ai/skill-matcher",
      color: "from-green-500 to-green-600",
      delay: 0.2,
    },
    {
      title: "Interview Prep",
      desc: "Practice with AI feedback",
      icon: <MicIcon className="h-6 w-6" />,
      path: "/ai/voice-interview",
      color: "from-orange-500 to-orange-600",
      delay: 0.3,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Full Screen Hero with Diagonal Split */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full h-screen flex items-center"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Diagonal Background Split */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"></div>

          {/* Floating Geometric Shapes */}
          <motion.div
            animate={floatingVariants.float}
            className="absolute top-20 left-20 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20"
          />
          <motion.div
            animate={floatingVariants.float}
            transition={{ delay: 1 }}
            className="absolute top-40 right-32 w-16 h-16 bg-purple-200 dark:bg-purple-800 rotate-45 opacity-20"
          />
          <motion.div
            animate={floatingVariants.float}
            transition={{ delay: 2 }}
            className="absolute bottom-32 left-40 w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full opacity-20"
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="relative w-full px-6 lg:px-12 xl:px-20 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
            {/* Left Side - Main Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Animated Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Badge className="text-base px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
                  <SparklesIcon className="mr-2 h-4 w-4" />
                  AI-Powered Career Platform
                </Badge>
              </motion.div>

              {/* Main Heading with Staggered Animation */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-6xl lg:text-8xl font-black leading-none"
                >
                  <span className="text-gray-900 dark:text-white">Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Dream Job
                  </span>
                  <br />
                  <span className="text-gray-900 dark:text-white">Awaits</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
                >
                  Discover opportunities with our AI-powered platform.
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {" "}
                    500K+ professionals
                  </span>{" "}
                  already found their perfect match.
                </motion.p>
              </div>

              {/* Interactive Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="relative"
              >
                <div className="relative max-w-2xl">
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <Input
                    placeholder="Search jobs by title, company, or skills..."
                    className="pl-12 pr-32 py-6 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 shadow-lg"
                    onClick={() => handleProtectedFeatureClick("/jobs")}
                  />
                  <Button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-6"
                    onClick={() => handleProtectedFeatureClick("/jobs")}
                  >
                    Search
                  </Button>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl"
                  asChild
                >
                  <Link to="/register">
                    Get Started Free
                    <RocketIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl"
                  asChild
                >
                  <Link to="/features">
                    <PlayIcon className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Link>
                </Button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                      {stat.icon}
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Interactive Cards */}
            <motion.div variants={itemVariants} className="relative">
              {/* 3D Card Stack */}
              <div className="relative perspective-1000">
                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50, rotateY: -15 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ delay: 0.5 + action.delay }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      className="group cursor-pointer"
                      onClick={() => handleProtectedFeatureClick(action.path)}
                    >
                      <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform-gpu">
                        <CardContent className="p-6 text-center space-y-4">
                          <div
                            className={`mx-auto w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            {action.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {action.desc}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Floating Achievement Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, type: "spring" }}
                  className="absolute -top-6 -right-6 z-10"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <TrophyIcon className="h-4 w-4" />
                    <span className="text-sm font-bold">#1 Platform</span>
                  </div>
                </motion.div>

                {/* Success Rate Indicator */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 }}
                  className="absolute -bottom-6 -left-6 z-10"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          89% Success Rate
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Job placements
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Job Categories Quick Access */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-purple-900"
      >
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Popular Job Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore opportunities across different industries and find your
              perfect match
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Work From Home",
                count: "50K+ Jobs",
                icon: <HomeIcon className="h-8 w-8" />,
                color: "from-blue-500 to-blue-600",
              },
              {
                name: "Full Time",
                count: "100K+ Jobs",
                icon: <BrainIcon className="h-8 w-8" />,
                color: "from-purple-500 to-purple-600",
              },
              {
                name: "Part Time",
                count: "25K+ Jobs",
                icon: <ClockIcon className="h-8 w-8" />,
                color: "from-green-500 to-green-600",
              },
              {
                name: "IT Jobs",
                count: "45K+ Jobs",
                icon: <ComputerIcon className="h-8 w-8" />,
                color: "from-orange-500 to-orange-600",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group cursor-pointer"
                onClick={() => handleProtectedFeatureClick("/jobs")}
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-8 text-center space-y-6">
                    <div
                      className={`mx-auto w-20 h-20 bg-gradient-to-r ${category.color} rounded-3xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {category.count}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trust Indicators */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full py-20 bg-white dark:bg-gray-900"
      >
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12">
              Trusted by professionals worldwide
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div variants={itemVariants} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  100% Secure
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Your data is protected with enterprise-grade security
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BoltIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  AI-Powered
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced algorithms match you with perfect opportunities
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GlobeIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Global Reach
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with opportunities from around the world
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="relative w-full px-6 lg:px-12 xl:px-20 text-center space-y-8 z-10">
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold"
          >
            Ready to Transform Your Career?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl max-w-3xl mx-auto opacity-90"
          >
            Join half a million professionals who've found their dream jobs with
            CareerAI
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-white text-purple-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl"
              asChild
            >
              <Link to="/register">
                Start Your Journey
                <RocketIcon className="ml-2 h-6 w-6" />
              </Link>
            </Button>

            <div className="text-white/80 text-sm space-y-1">
              <div>✨ No credit card required</div>
              <div>⚡ Setup in under 2 minutes</div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

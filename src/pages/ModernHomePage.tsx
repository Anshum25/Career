import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import { Textarea } from "@/components/ui/textarea";
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
  ChevronRightIcon,
  SendIcon,
  XIcon,
  MinimizeIcon,
  MaximizeIcon,
  HelpCircleIcon,
  MessageSquareIcon,
  ChevronDownIcon,
  PlusIcon,
  MailIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  InstagramIcon,
} from "lucide-react";

// AI Chatbot Component
function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm CareerAI Assistant. How can I help you today? 🤖",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const faqQuestions = [
    {
      question: "How does AI job matching work?",
      answer:
        "Our AI analyzes your skills, experience, and preferences to match you with jobs that fit your profile. It uses natural language processing to understand job descriptions and compare them with your background.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "Yes! CareerAI is completely free for job seekers. You can search jobs, get AI recommendations, and apply to positions without any cost. Premium features for recruiters are available separately.",
    },
    {
      question: "How accurate is the resume scoring?",
      answer:
        "Our AI resume scorer has 89% accuracy based on industry standards and ATS compatibility. It analyzes format, content, keywords, and provides specific improvement suggestions.",
    },
    {
      question: "Can I use this for remote jobs?",
      answer:
        "Absolutely! We have 50K+ remote job opportunities from companies worldwide. You can filter specifically for work-from-home positions in your job search.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply create a free account, upload your resume, and start browsing jobs. Our AI will immediately begin matching you with relevant opportunities based on your profile.",
    },
  ];

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    if (input.includes("job") && input.includes("search")) {
      return "You can search for jobs using our AI-powered search. Click on 'Find Jobs' in the navigation or use the search bar on the homepage. Our AI will match you with relevant opportunities! 🔍";
    }

    if (input.includes("resume")) {
      return "Our AI Resume Builder can help you create and optimize your resume! It provides real-time scoring and suggestions. You can access it from the 'My Resume' section or try our resume scorer tool. 📄";
    }

    if (input.includes("free") || input.includes("cost")) {
      return "CareerAI is completely free for job seekers! You can search jobs, get AI recommendations, and apply to positions without any cost. We believe everyone deserves access to great career opportunities. 💝";
    }

    if (
      input.includes("how") &&
      (input.includes("work") || input.includes("start"))
    ) {
      return "Getting started is easy! 1️⃣ Create a free account 2️⃣ Upload your resume 3️⃣ Browse AI-matched jobs 4️⃣ Apply with one click. Our AI handles the rest! 🚀";
    }

    if (input.includes("contact") || input.includes("support")) {
      return "You can reach our support team at support@careerai.com or use this chat for quick questions. We're here to help you succeed in your career journey! 📧";
    }

    if (input.includes("hi") || input.includes("hello")) {
      return "Hello! Welcome to CareerAI! I'm here to help you with any questions about our platform. What would you like to know? 😊";
    }

    return "That's a great question! I'd be happy to help. For specific queries, you can also check our FAQ section or contact our support team. Is there anything particular about CareerAI you'd like to know more about? 🤔";
  };

  const selectFAQ = (faq: any) => {
    const userMessage = {
      id: messages.length + 1,
      text: faq.question,
      sender: "user",
      timestamp: new Date(),
    };

    const botMessage = {
      id: messages.length + 2,
      text: faq.answer,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl"
          size="icon"
        >
          <MessageSquareIcon className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <BrainIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">CareerAI Assistant</h3>
                  <p className="text-xs opacity-90">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-6 h-6 hover:bg-white/20"
                >
                  {isMinimized ? (
                    <MaximizeIcon className="h-3 w-3" />
                  ) : (
                    <MinimizeIcon className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 hover:bg-white/20"
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* FAQ Quick Actions */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {faqQuestions.slice(0, 3).map((faq, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => selectFAQ(faq)}
                        className="text-xs h-6"
                      >
                        {faq.question.split("?")[0]}?
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything..."
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={sendMessage}
                      size="icon"
                      disabled={!inputMessage.trim()}
                    >
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ModernHomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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

  const features = [
    {
      icon: <BrainIcon className="h-8 w-8" />,
      title: "AI-Powered Matching",
      description:
        "Our advanced AI analyzes your skills, experience, and preferences to find the perfect job matches.",
      benefits: [
        "87% accuracy rate",
        "Saves 5+ hours weekly",
        "Personalized recommendations",
      ],
    },
    {
      icon: <ZapIcon className="h-8 w-8" />,
      title: "One-Click Apply",
      description:
        "Apply to multiple jobs instantly with our smart application system and AI-generated cover letters.",
      benefits: [
        "Apply to 50+ jobs/day",
        "Auto-generated letters",
        "Application tracking",
      ],
    },
    {
      icon: <BarChart3Icon className="h-8 w-8" />,
      title: "Career Analytics",
      description:
        "Get detailed insights about your job search progress, market trends, and improvement suggestions.",
      benefits: ["Real-time insights", "Market analysis", "Success tracking"],
    },
    {
      icon: <TrophyIcon className="h-8 w-8" />,
      title: "Skill Development",
      description:
        "Identify skill gaps and get personalized learning recommendations to advance your career.",
      benefits: ["Skill gap analysis", "Learning paths", "Progress tracking"],
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Google",
      content:
        "CareerAI's AI matching was incredibly accurate. I found my dream job at Google in just 2 weeks!",
      avatar: "/avatars/priya.jpg",
      rating: 5,
    },
    {
      name: "Rahul Gupta",
      role: "Product Manager",
      company: "Flipkart",
      content:
        "The auto-apply feature saved me hours. I applied to 50+ jobs in one day with personalized cover letters.",
      avatar: "/avatars/rahul.jpg",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      role: "Data Scientist",
      company: "Microsoft",
      content:
        "The interview practice tool boosted my confidence. The AI feedback was detailed and incredibly helpful.",
      avatar: "/avatars/sneha.jpg",
      rating: 5,
    },
  ];

  const faqData = [
    {
      question: "How does CareerAI's job matching work?",
      answer:
        "Our AI uses natural language processing and machine learning to analyze your resume, skills, and preferences. It then compares this with job descriptions to find matches with high compatibility scores. The system learns from your interactions to improve recommendations over time.",
    },
    {
      question: "Is CareerAI completely free?",
      answer:
        "Yes! CareerAI is 100% free for job seekers. You can search jobs, get AI recommendations, apply to positions, and access all our tools without any cost. We believe everyone deserves access to the best career opportunities.",
    },
    {
      question: "How accurate is the AI resume scoring?",
      answer:
        "Our AI resume scorer has an 89% accuracy rate based on ATS compatibility and industry standards. It analyzes format, content, keywords, and provides specific suggestions. The scoring is based on data from 100,000+ successful job applications.",
    },
    {
      question: "Can I find remote jobs on CareerAI?",
      answer:
        "Absolutely! We have 50,000+ remote job opportunities from companies worldwide. You can specifically filter for work-from-home positions, and our AI will prioritize remote-friendly matches based on your preferences.",
    },
    {
      question: "How do I get started with CareerAI?",
      answer:
        "Getting started is simple: 1) Create a free account, 2) Upload your resume, 3) Set your job preferences, 4) Start browsing AI-matched jobs. Our system begins working immediately to find relevant opportunities for you.",
    },
    {
      question: "What makes CareerAI different from other job platforms?",
      answer:
        "CareerAI combines advanced AI technology with a user-first approach. We offer real-time job matching, AI-powered resume optimization, interview practice tools, and career analytics - all free for job seekers. Our focus is on quality matches, not quantity.",
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"></div>

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

          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="relative w-full px-6 lg:px-12 xl:px-20 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
            {/* Left Side - Main Content */}
            <motion.div variants={itemVariants} className="space-y-8">
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
              <div className="relative perspective-1000">
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

      {/* About CareerAI Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full py-20 bg-white dark:bg-gray-900"
      >
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose CareerAI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              We're revolutionizing the job search experience with cutting-edge
              AI technology that connects talent with opportunity more
              efficiently than ever before.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center gap-2"
                          >
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Job Categories */}
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
              Explore Job Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From remote work to full-time positions, find opportunities across
              all industries and work arrangements
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

      {/* Success Stories */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full py-20 bg-white dark:bg-gray-900"
      >
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge variant="outline" className="text-base px-4 py-2 mb-4">
              <HeartIcon className="mr-2 h-4 w-4 text-red-500" />
              Success Stories
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Real People, Real Success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of professionals who've transformed their careers
              with CareerAI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
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
                      <blockquote className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={testimonial.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {testimonial.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
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

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about CareerAI. Can't find the answer
              you're looking for? Chat with our AI assistant!
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <button
                      onClick={() =>
                        setExpandedFAQ(expandedFAQ === index ? null : index)
                      }
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDownIcon
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                          expandedFAQ === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
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
                  Your data is protected with enterprise-grade security and
                  privacy controls
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
                  Advanced machine learning algorithms ensure the most relevant
                  job matches
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
                  Connect with opportunities from leading companies around the
                  world
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
            CareerAI's intelligent platform
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
              <div>🎯 AI matches you instantly</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}

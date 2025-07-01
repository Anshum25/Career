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
  SearchIcon,
  MessageCircleIcon,
  UsersIcon,
  TrendingUpIcon,
  HelpCircleIcon,
  SendIcon,
  XIcon,
  MinimizeIcon,
  MaximizeIcon,
  MessageSquareIcon,
  ChevronDownIcon,
  ShieldIcon,
  BoltIcon,
  GlobeIcon,
  HeartIcon,
  HomeIcon,
  ClockIcon,
  ComputerIcon,
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
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <MessageSquareIcon className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 md:bottom-24 md:right-6 w-80 md:w-96 h-[400px] md:h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-600 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <BrainIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    CareerAI Assistant
                  </h3>
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

  const stats = [
    {
      label: "Active Users",
      value: "500K+",
      icon: <UsersIcon className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      label: "Success Rate",
      value: "89%",
      icon: <TrendingUpIcon className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      label: "AI Matches",
      value: "2.5M+",
      icon: <BrainIcon className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      label: "Jobs Posted",
      value: "125K+",
      icon: <StarIcon className="h-4 w-4 md:h-5 md:w-5" />,
    },
  ];

  const features = [
    {
      icon: <BrainIcon className="h-6 w-6 md:h-8 md:w-8" />,
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
      icon: <ZapIcon className="h-6 w-6 md:h-8 md:w-8" />,
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
      icon: <BarChart3Icon className="h-6 w-6 md:h-8 md:w-8" />,
      title: "Career Analytics",
      description:
        "Get detailed insights about your job search progress, market trends, and improvement suggestions.",
      benefits: ["Real-time insights", "Market analysis", "Success tracking"],
    },
    {
      icon: <TrophyIcon className="h-6 w-6 md:h-8 md:w-8" />,
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
    <div className="w-full min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20">
            {/* Left Side - Main Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <Badge className="text-sm md:text-base px-4 py-2 bg-blue-600 text-white border-0 shadow-lg mx-auto lg:mx-0 w-fit">
                AI-Powered Career Platform
              </Badge>

              <div className="space-y-4 md:space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">
                    Your Dream Job
                  </span>
                  <br />
                  <span className="text-blue-600 dark:text-blue-400">
                    Awaits
                  </span>
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                  Discover opportunities with our AI-powered platform.{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    500K+ professionals
                  </span>{" "}
                  already found their perfect match.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto lg:mx-0">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-gray-400" />
                <Input
                  placeholder="Search jobs by title, company, or skills..."
                  className="pl-12 md:pl-14 pr-24 md:pr-32 py-4 md:py-6 text-base md:text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 shadow-lg"
                  onClick={() => handleProtectedFeatureClick("/jobs")}
                />
                <Button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-lg px-4 md:px-6"
                  onClick={() => handleProtectedFeatureClick("/jobs")}
                >
                  Search
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
                  asChild
                >
                  <Link to="/register">
                    Get Started Free
                    <RocketIcon className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                  asChild
                >
                  <Link to="/features">Learn More</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-6 md:pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Feature Cards */}
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  {
                    title: "Find Jobs",
                    desc: "Browse 100K+ opportunities",
                    icon: <SearchIcon className="h-5 w-5 md:h-6 md:w-6" />,
                    path: "/jobs",
                  },
                  {
                    title: "AI Resume",
                    desc: "Build & optimize your resume",
                    icon: <FileTextIcon className="h-5 w-5 md:h-6 md:w-6" />,
                    path: "/ai/resume-scorer",
                  },
                  {
                    title: "Skill Match",
                    desc: "See job compatibility",
                    icon: <TargetIcon className="h-5 w-5 md:h-6 md:w-6" />,
                    path: "/ai/skill-matcher",
                  },
                  {
                    title: "Interview Prep",
                    desc: "Practice with AI feedback",
                    icon: <MicIcon className="h-5 w-5 md:h-6 md:w-6" />,
                    path: "/ai/voice-interview",
                  },
                ].map((action, index) => (
                  <Card
                    key={index}
                    className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleProtectedFeatureClick(action.path)}
                  >
                    <CardContent className="p-4 md:p-6 text-center space-y-3 md:space-y-4">
                      <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {action.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Why Choose CareerAI?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              We're revolutionizing the job search experience with cutting-edge
              AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <CardContent className="p-6 md:p-8 text-center space-y-4 md:space-y-6">
                  <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="w-full py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Explore Job Categories
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From remote work to full-time positions, find opportunities across
              all industries
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                name: "Work From Home",
                count: "50K+ Jobs",
                icon: <HomeIcon className="h-6 w-6 md:h-8 md:w-8" />,
              },
              {
                name: "Full Time",
                count: "100K+ Jobs",
                icon: <BrainIcon className="h-6 w-6 md:h-8 md:w-8" />,
              },
              {
                name: "Part Time",
                count: "25K+ Jobs",
                icon: <ClockIcon className="h-6 w-6 md:h-8 md:w-8" />,
              },
              {
                name: "IT Jobs",
                count: "45K+ Jobs",
                icon: <ComputerIcon className="h-6 w-6 md:h-8 md:w-8" />,
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleProtectedFeatureClick("/jobs")}
              >
                <CardContent className="p-6 md:p-8 text-center space-y-4 md:space-y-6">
                  <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {category.count}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="w-full py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="text-base px-4 py-2 mb-4">
              <HeartIcon className="mr-2 h-4 w-4 text-red-500" />
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Real People, Real Success
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of professionals who've transformed their careers
              with CareerAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 dark:text-gray-300 italic text-base md:text-lg leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 md:h-12 md:w-12">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white">
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
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about CareerAI. Can't find the answer
              you're looking for? Chat with our AI assistant!
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {faqData.map((faq, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === index ? null : index)
                    }
                    className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pr-4">
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
                        <div className="px-4 md:px-6 pb-4 md:pb-6">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="w-full py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 md:mb-12">
              Trusted by professionals worldwide
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  100% Secure
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Your data is protected with enterprise-grade security and
                  privacy controls
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BoltIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  AI-Powered
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced machine learning algorithms ensure the most relevant
                  job matches
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GlobeIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Global Reach
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with opportunities from leading companies around the
                  world
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 md:py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Ready to Transform Your Career?
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto opacity-90">
            Join half a million professionals who've found their dream jobs with
            CareerAI's intelligent platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center pt-6 md:pt-8">
            <Button
              size="lg"
              className="text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-xl"
              asChild
            >
              <Link to="/register">
                Start Your Journey
                <RocketIcon className="ml-2 h-5 w-5 md:h-6 md:w-6" />
              </Link>
            </Button>

            <div className="text-white/80 text-sm space-y-1">
              <div>✨ No credit card required</div>
              <div>⚡ Setup in under 2 minutes</div>
              <div>🎯 AI matches you instantly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BrainIcon className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">CareerAI</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing job search with AI-powered matching and career
                tools.
              </p>
              <div className="flex space-x-4">
                <MailIcon className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <LinkedinIcon className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <TwitterIcon className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <YoutubeIcon className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <Link
                  to="/jobs"
                  className="block text-gray-400 hover:text-white"
                >
                  Find Jobs
                </Link>
                <Link
                  to="/features"
                  className="block text-gray-400 hover:text-white"
                >
                  Features
                </Link>
                <Link
                  to="/about"
                  className="block text-gray-400 hover:text-white"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* For Job Seekers */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">For Job Seekers</h4>
              <div className="space-y-2">
                <Link
                  to="/ai/resume-scorer"
                  className="block text-gray-400 hover:text-white"
                >
                  Resume Builder
                </Link>
                <Link
                  to="/ai/skill-matcher"
                  className="block text-gray-400 hover:text-white"
                >
                  Skill Matcher
                </Link>
                <Link
                  to="/ai/voice-interview"
                  className="block text-gray-400 hover:text-white"
                >
                  Interview Prep
                </Link>
                <Link
                  to="/career-advice"
                  className="block text-gray-400 hover:text-white"
                >
                  Career Advice
                </Link>
              </div>
            </div>

            {/* For Recruiters */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">For Recruiters</h4>
              <div className="space-y-2">
                <Link
                  to="/post-job"
                  className="block text-gray-400 hover:text-white"
                >
                  Post Jobs
                </Link>
                <Link
                  to="/find-candidates"
                  className="block text-gray-400 hover:text-white"
                >
                  Find Candidates
                </Link>
                <Link
                  to="/pricing"
                  className="block text-gray-400 hover:text-white"
                >
                  Pricing
                </Link>
                <Link
                  to="/enterprise"
                  className="block text-gray-400 hover:text-white"
                >
                  Enterprise
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CareerAI. All rights reserved. | Privacy Policy | Terms of
              Service
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}

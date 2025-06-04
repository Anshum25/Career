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
} from "lucide-react";

export default function EnhancedHomePage() {
  const aiFeatures = [
    {
      title: "Smart Career Path Builder",
      description:
        "AI creates personalized roadmap with skills, courses, and timeline",
      icon: <BrainIcon className="h-6 w-6" />,
      path: "/ai/career-builder",
      badge: "New",
    },
    {
      title: "Live Resume Scorer",
      description: "Instant AI analysis with optimization suggestions",
      icon: <FileTextIcon className="h-6 w-6" />,
      path: "/ai/resume-scorer",
      badge: "Popular",
    },
    {
      title: "Voice Interview Practice",
      description: "AI analyzes confidence, tone, and nervousness levels",
      icon: <MicIcon className="h-6 w-6" />,
      path: "/ai/voice-interview",
      badge: "Premium",
    },
    {
      title: "Real-Time Skill Matching",
      description: "NLP-powered job matching with compatibility scores",
      icon: <TargetIcon className="h-6 w-6" />,
      path: "/ai/skill-matcher",
      badge: "Hot",
    },
  ];

  const automationFeatures = [
    {
      title: "1-Click Auto Apply",
      description: "Apply to multiple jobs with AI-generated cover letters",
      icon: <ZapIcon className="h-6 w-6" />,
      path: "/auto-apply",
    },
    {
      title: "Smart Job Alerts",
      description: "Intelligent notifications with advanced filtering",
      icon: <TargetIcon className="h-6 w-6" />,
      path: "/job-alerts",
    },
    {
      title: "Job Search Journal",
      description: "Track applications and export detailed PDF reports",
      icon: <BarChart3Icon className="h-6 w-6" />,
      path: "/tools/job-journal",
    },
  ];

  const communityFeatures = [
    {
      title: "Job Seekers Forums",
      description: "Reddit-style community for advice and experiences",
      icon: <MessageSquareIcon className="h-6 w-6" />,
      path: "/community/forums",
    },
    {
      title: "Company Reviews",
      description: "Comprehensive company profiles with ratings",
      icon: <StarIcon className="h-6 w-6" />,
      path: "/companies",
    },
    {
      title: "Gamified Experience",
      description: "Earn points, badges, and compete on leaderboards",
      icon: <TrophyIcon className="h-6 w-6" />,
      path: "/gamification",
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
    },
    {
      name: "Rahul Gupta",
      role: "Product Manager at Flipkart",
      content:
        "Auto-apply feature saved me hours of repetitive work. Applied to 50+ jobs in one day with personalized cover letters.",
      avatar: "/avatars/rahul.jpg",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      role: "Data Scientist at Microsoft",
      content:
        "The voice interview practice with AI feedback boosted my confidence. Aced all my technical rounds!",
      avatar: "/avatars/sneha.jpg",
      rating: 5,
    },
  ];

  const stats = [
    {
      label: "Job Seekers Helped",
      value: "500K+",
      icon: <UsersIcon className="h-6 w-6" />,
    },
    {
      label: "Successful Placements",
      value: "78%",
      icon: <TrendingUpIcon className="h-6 w-6" />,
    },
    {
      label: "AI-Powered Matches",
      value: "2.5M+",
      icon: <BrainIcon className="h-6 w-6" />,
    },
    {
      label: "Interview Success Rate",
      value: "85%",
      icon: <StarIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              🚀 Next-Generation Job Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Career Success
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your job search with cutting-edge AI tools, automated
              applications, and a supportive community. Join 500K+ professionals
              who found their dream jobs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/register">
                Start Your Journey
                <RocketIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link to="/features">
                <PlayIcon className="mr-2 h-5 w-5" />
                Explore Features
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-center text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <BrainIcon className="mr-2 h-5 w-5" />
              AI-Powered Intelligence
            </Badge>
            <h2 className="text-4xl font-bold">Next-Level AI Career Tools</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of job searching with our suite of
              AI-powered tools that understand your goals and accelerate your
              career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                        {feature.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-base mt-1">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                    {feature.badge && (
                      <Badge
                        variant={
                          feature.badge === "Premium" ? "default" : "secondary"
                        }
                      >
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link to={feature.path}>
                      Try Now
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <ZapIcon className="mr-2 h-5 w-5" />
              Automation & Productivity
            </Badge>
            <h2 className="text-4xl font-bold">Automate Your Job Search</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Save hours of manual work with intelligent automation that applies
              to jobs, tracks your progress, and keeps you organized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {automationFeatures.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-100 rounded-full w-fit mx-auto text-green-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                    <Button variant="outline" asChild>
                      <Link to={feature.path}>Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <HeartIcon className="mr-2 h-5 w-5" />
              Community & Growth
            </Badge>
            <h2 className="text-4xl font-bold">Join the Community</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with fellow job seekers, share experiences, and get
              support from a community that understands your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button variant="outline" asChild>
                    <Link to={feature.path}>Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Success Stories</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Hear from professionals who transformed their careers with
              CareerAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur border-white/20 text-white"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm opacity-90">
                          {testimonial.role}
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

      {/* Quick Start Guide */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Get Started in 4 Steps</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow our proven path to career success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Create Profile",
                description:
                  "Set up your comprehensive profile with AI optimization",
                icon: <UsersIcon className="h-6 w-6" />,
                path: "/register",
              },
              {
                step: "2",
                title: "Take Assessment",
                description:
                  "Discover your personality type and ideal career matches",
                icon: <HeartIcon className="h-6 w-6" />,
                path: "/assessment/personality",
              },
              {
                step: "3",
                title: "Find & Apply",
                description:
                  "Use AI matching and automation to apply efficiently",
                icon: <TargetIcon className="h-6 w-6" />,
                path: "/ai/skill-matcher",
              },
              {
                step: "4",
                title: "Track & Succeed",
                description: "Monitor progress and optimize your strategy",
                icon: <TrophyIcon className="h-6 w-6" />,
                path: "/tools/job-journal",
              },
            ].map((item) => (
              <Card
                key={item.step}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 text-2xl font-bold">
                      {item.step}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link to={item.path}>Start Step {item.step}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl opacity-90">
            Join 500,000+ professionals who've accelerated their career success
            with CareerAI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link to="/register">
                Get Started Free
                <CheckCircleIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-gray-900"
              asChild
            >
              <Link to="/features">
                Explore All Features
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="text-sm opacity-75">
            ✨ No credit card required • ⚡ Setup in 2 minutes • 🛡️ Trusted by
            500K+ users
          </div>
        </div>
      </section>
    </div>
  );
}

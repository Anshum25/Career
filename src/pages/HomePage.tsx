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
import { Input } from "@/components/ui/input";
import {
  SearchIcon,
  BrainIcon,
  VideoIcon,
  MapPinIcon,
  UsersIcon,
  TrendingUp,
  GlobeIcon,
  ShieldIcon,
  ZapIcon,
  StarIcon,
  PlayIcon,
  ChevronRightIcon,
  BriefcaseIcon,
  BuildingIcon,
  GraduationCapIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: BrainIcon,
      title: "AI-Powered Matching",
      description:
        "Smart algorithms match you with perfect opportunities based on skills, preferences, and career goals.",
      color: "text-blue-600",
    },
    {
      icon: VideoIcon,
      title: "Video Resumes",
      description:
        "Stand out with 60-second video pitches. AI transcription helps recruiters discover your potential.",
      color: "text-purple-600",
    },
    {
      icon: MapPinIcon,
      title: "Hyperlocal Discovery",
      description:
        "Find jobs near you with commute time estimation and location-based filtering.",
      color: "text-green-600",
    },
    {
      icon: UsersIcon,
      title: "Live Job Fairs",
      description:
        "Join virtual job fairs with instant interview opportunities and real-time networking.",
      color: "text-orange-600",
    },
    {
      icon: TrendingUpIcon,
      title: "Career Coach AI",
      description:
        "Get personalized career advice, skill gap analysis, and growth recommendations.",
      color: "text-red-600",
    },
    {
      icon: GlobeIcon,
      title: "Global Opportunities",
      description:
        "Access opportunities worldwide with multi-language support and cultural matching.",
      color: "text-cyan-600",
    },
  ];

  const stats = [
    { label: "Active Jobs", value: "250K+", icon: BriefcaseIcon },
    { label: "Companies", value: "15K+", icon: BuildingIcon },
    { label: "Success Stories", value: "500K+", icon: StarIcon },
    { label: "AI Matches", value: "1M+", icon: BrainIcon },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "TechCorp",
      image: "/placeholder.svg",
      content:
        "CareerAI's AI matching found me the perfect role in just 2 weeks. The video resume feature really helped me stand out!",
      rating: 5,
    },
    {
      name: "Raj Patel",
      role: "HR Manager",
      company: "InnovateInc",
      image: "/placeholder.svg",
      content:
        "The instant interview feature revolutionized our hiring process. We can now connect with candidates in real-time.",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      role: "Marketing Manager",
      company: "GrowthCo",
      image: "/placeholder.svg",
      content:
        "The hyperlocal job discovery helped me find amazing opportunities right in my neighborhood. Game changer!",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <Badge variant="secondary" className="px-4 py-2">
              <ZapIcon className="w-4 h-4 mr-2" />
              AI-Powered Job Discovery
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your Next Career Move
              <span className="text-primary block">Powered by AI</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              Discover opportunities that match your skills, personality, and
              goals. From video resumes to instant interviews, experience the
              future of hiring.
            </p>

            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Button size="lg" className="flex-1" asChild>
                  <Link to="/register">
                    Get Started Free
                    <ChevronRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link
                    to={
                      user?.role === "recruiter"
                        ? "/dashboard/recruiter"
                        : "/dashboard/seeker"
                    }
                  >
                    Go to Dashboard
                    <ChevronRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/jobs">Find Jobs</Link>
                </Button>
              </div>
            )}

            {/* Quick Job Search */}
            <div className="w-full max-w-2xl">
              <div className="flex gap-2 p-2 bg-background rounded-lg border shadow-sm">
                <div className="flex-1 flex items-center gap-2">
                  <SearchIcon className="w-5 h-5 text-muted-foreground ml-3" />
                  <Input
                    placeholder="Search jobs, companies, or skills..."
                    className="border-0 focus-visible:ring-0 bg-transparent"
                  />
                </div>
                <Button>Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Revolutionary Features for Modern Hiring
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the next generation of job discovery with AI-powered
              matching, video resumes, and real-time hiring tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-background border flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How CareerAI Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes and discover your next opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Create Your Profile
              </h3>
              <p className="text-muted-foreground">
                Build your profile with our AI-assisted resume builder and
                optional video introduction.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Get AI Matches</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your skills, preferences, and goals to find
                perfect job matches.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Connect & Interview
              </h3>
              <p className="text-muted-foreground">
                Apply with one click and schedule instant interviews with
                interested employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              See how CareerAI has transformed careers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've found their dream jobs
            through CareerAI's intelligent matching system.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/register">
                  Start Your Journey
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/demo">
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          ) : (
            <Button size="lg" variant="secondary" asChild>
              <Link to="/jobs">
                Discover Opportunities
                <ChevronRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

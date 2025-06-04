import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  StarIcon,
  MapPinIcon,
  UsersIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  BuildingIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  LinkedinIcon,
  TwitterIcon,
  SearchIcon,
  FilterIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  CalendarIcon,
  DollarSignIcon,
  AwardIcon,
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  founded: string;
  rating: number;
  reviewCount: number;
  openJobs: number;
  salaryRange: string;
  benefits: string[];
  culture: string[];
  techStack: string[];
  workMode: string[];
}

interface Review {
  id: string;
  companyId: string;
  rating: number;
  title: string;
  pros: string;
  cons: string;
  advice: string;
  position: string;
  experience: string;
  workMode: string;
  anonymous: boolean;
  helpful: number;
  date: string;
  verified: boolean;
}

export default function CompanyProfiles() {
  const [companies] = useState<Company[]>([
    {
      id: "1",
      name: "TechCorp Solutions",
      logo: "/companies/techcorp.png",
      description:
        "Leading technology solutions provider specializing in AI, cloud computing, and digital transformation. We help businesses innovate and scale with cutting-edge technology.",
      industry: "Technology",
      size: "1000-5000 employees",
      location: "Bangalore, India",
      website: "https://techcorp.com",
      founded: "2010",
      rating: 4.2,
      reviewCount: 1247,
      openJobs: 23,
      salaryRange: "₹8L - ₹45L",
      benefits: [
        "Health Insurance",
        "Work from Home",
        "Flexible Hours",
        "Learning Budget",
        "Stock Options",
      ],
      culture: [
        "Innovation",
        "Collaboration",
        "Diversity",
        "Growth",
        "Work-Life Balance",
      ],
      techStack: ["React", "Node.js", "AWS", "Python", "MongoDB", "Kubernetes"],
      workMode: ["Remote", "Hybrid", "Office"],
    },
    {
      id: "2",
      name: "InnovateLabs",
      logo: "/companies/innovate.png",
      description:
        "Startup focused on developing next-generation mobile applications and IoT solutions. We're building the future of connected devices.",
      industry: "Mobile Technology",
      size: "50-200 employees",
      location: "Mumbai, India",
      website: "https://innovatelabs.in",
      founded: "2018",
      rating: 4.5,
      reviewCount: 89,
      openJobs: 8,
      salaryRange: "₹5L - ₹25L",
      benefits: [
        "Health Insurance",
        "Equity",
        "Learning Budget",
        "Catered Meals",
        "Gym Membership",
      ],
      culture: ["Innovation", "Fast-paced", "Ownership", "Learning"],
      techStack: ["React Native", "Flutter", "Node.js", "Firebase", "Docker"],
      workMode: ["Office", "Hybrid"],
    },
    {
      id: "3",
      name: "Global Finance Corp",
      logo: "/companies/globalfinance.png",
      description:
        "International financial services company providing banking, investment, and insurance solutions to millions of customers worldwide.",
      industry: "Financial Services",
      size: "10000+ employees",
      location: "Delhi, India",
      website: "https://globalfinance.com",
      founded: "1985",
      rating: 3.8,
      reviewCount: 2156,
      openJobs: 45,
      salaryRange: "₹12L - ₹80L",
      benefits: [
        "Health Insurance",
        "Retirement Plan",
        "Bonus",
        "Training",
        "Career Growth",
      ],
      culture: [
        "Stability",
        "Professional Growth",
        "Diversity",
        "Customer Focus",
      ],
      techStack: ["Java", "Spring", "Oracle", "Microservices", "Jenkins"],
      workMode: ["Office", "Hybrid"],
    },
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: "1",
      companyId: "1",
      rating: 4,
      title: "Great place for learning and growth",
      pros: "Excellent learning opportunities, supportive management, good work-life balance, competitive salary",
      cons: "Sometimes workload can be heavy during project deadlines, limited parking space",
      advice:
        "Focus on continuous learning and building relationships with colleagues",
      position: "Senior Software Engineer",
      experience: "3 years",
      workMode: "Hybrid",
      anonymous: true,
      helpful: 15,
      date: "2024-01-10",
      verified: true,
    },
    {
      id: "2",
      companyId: "1",
      rating: 5,
      title: "Amazing company culture",
      pros: "Innovative projects, flexible work hours, great team collaboration, modern tech stack",
      cons: "Fast-paced environment might not suit everyone",
      advice: "Be ready to learn new technologies and adapt quickly",
      position: "Product Manager",
      experience: "2 years",
      workMode: "Remote",
      anonymous: false,
      helpful: 23,
      date: "2024-01-05",
      verified: true,
    },
    {
      id: "3",
      companyId: "2",
      rating: 4,
      title: "Exciting startup experience",
      pros: "Ownership of projects, direct impact on product, equity compensation, modern office",
      cons: "Limited benefits compared to large companies, uncertain job security",
      advice:
        "Join if you're passionate about startups and can handle uncertainty",
      position: "Frontend Developer",
      experience: "1.5 years",
      workMode: "Office",
      anonymous: true,
      helpful: 8,
      date: "2024-01-08",
      verified: true,
    },
  ]);

  const [selectedCompany, setSelectedCompany] = useState<Company>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      industryFilter === "all" || company.industry === industryFilter;
    const matchesSize = sizeFilter === "all" || company.size === sizeFilter;

    return matchesSearch && matchesIndustry && matchesSize;
  });

  const companyReviews = reviews.filter(
    (review) => review.companyId === selectedCompany.id,
  );

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    companyReviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const handleFollowCompany = () => {
    toast({
      title: "Following Company",
      description: `You are now following ${selectedCompany.name}. You'll get updates about new jobs and company news.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Company List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BuildingIcon className="h-5 w-5" />
                Companies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={industryFilter}
                  onValueChange={setIndustryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Financial Services">
                      Financial Services
                    </SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sizeFilter} onValueChange={setSizeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Company Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    <SelectItem value="1-50 employees">
                      Startup (1-50)
                    </SelectItem>
                    <SelectItem value="50-200 employees">
                      Small (50-200)
                    </SelectItem>
                    <SelectItem value="200-1000 employees">
                      Medium (200-1000)
                    </SelectItem>
                    <SelectItem value="1000+ employees">
                      Large (1000+)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                {filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedCompany.id === company.id
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-accent"
                    }`}
                    onClick={() => setSelectedCompany(company)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={company.logo} alt={company.name} />
                        <AvatarFallback>
                          {company.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {company.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {renderStars(Math.floor(company.rating))}
                          <span className="text-xs text-muted-foreground">
                            {company.rating} ({company.reviewCount})
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {company.openJobs} open jobs
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Company Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Company Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={selectedCompany.logo}
                    alt={selectedCompany.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {selectedCompany.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">
                        {selectedCompany.name}
                      </h1>
                      <Button variant="outline" onClick={handleFollowCompany}>
                        Follow Company
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {renderStars(Math.floor(selectedCompany.rating))}
                        <span className="font-medium">
                          {selectedCompany.rating}
                        </span>
                        <span>({selectedCompany.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        {selectedCompany.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="h-4 w-4" />
                        {selectedCompany.size}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {selectedCompany.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <BriefcaseIcon className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-600">
                        {selectedCompany.openJobs} Open Jobs
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSignIcon className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">
                        {selectedCompany.salaryRange}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Details Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="culture">Culture</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Industry</p>
                        <p className="font-medium">
                          {selectedCompany.industry}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Founded</p>
                        <p className="font-medium">{selectedCompany.founded}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Company Size</p>
                        <p className="font-medium">{selectedCompany.size}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium">
                          {selectedCompany.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Work Modes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.workMode.map((mode) => (
                        <Badge key={mode} variant="outline">
                          {mode}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.benefits.map((benefit) => (
                      <Badge key={benefit} variant="secondary">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technology Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Reviews</CardTitle>
                  <CardDescription>
                    {selectedCompany.reviewCount} reviews •{" "}
                    {selectedCompany.rating} average rating
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Rating Distribution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Rating Distribution</h4>
                      {Object.entries(getRatingDistribution())
                        .reverse()
                        .map(([rating, count]) => (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm w-8">{rating} ⭐</span>
                            <Progress
                              value={(count / companyReviews.length) * 100}
                              className="flex-1"
                            />
                            <span className="text-sm text-muted-foreground w-8">
                              {count}
                            </span>
                          </div>
                        ))}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Quick Stats</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Recommend to friend
                          </span>
                          <span className="font-medium">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Approve of CEO
                          </span>
                          <span className="font-medium">85%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Career growth
                          </span>
                          <span className="font-medium">4.1/5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {companyReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              {renderStars(review.rating)}
                              <span className="font-medium">
                                {review.title}
                              </span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {review.position} • {review.experience} •{" "}
                              {review.workMode} • {review.date}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-green-600">
                              Pros:{" "}
                            </span>
                            <span>{review.pros}</span>
                          </div>
                          <div>
                            <span className="font-medium text-red-600">
                              Cons:{" "}
                            </span>
                            <span>{review.cons}</span>
                          </div>
                          {review.advice && (
                            <div>
                              <span className="font-medium text-blue-600">
                                Advice to Management:{" "}
                              </span>
                              <span>{review.advice}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-primary">
                              <ThumbsUpIcon className="h-4 w-4" />
                              Helpful ({review.helpful})
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary">
                              <MessageCircleIcon className="h-4 w-4" />
                              Reply
                            </button>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {review.anonymous
                              ? "Anonymous Employee"
                              : "Verified Employee"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Open Positions</CardTitle>
                  <CardDescription>
                    {selectedCompany.openJobs} active job openings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BriefcaseIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Jobs Integration Coming Soon
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      This section will show all open positions at{" "}
                      {selectedCompany.name}
                    </p>
                    <Button>View All Jobs</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="culture" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Culture</CardTitle>
                  <CardDescription>
                    Learn about the values and culture at {selectedCompany.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Core Values</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.culture.map((value) => (
                        <Badge
                          key={value}
                          variant="outline"
                          className="px-3 py-1"
                        >
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Work Environment</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Collaborative and inclusive workspace</p>
                        <p>• Regular team building activities</p>
                        <p>• Open communication culture</p>
                        <p>• Focus on employee well-being</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Growth Opportunities</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Learning and development programs</p>
                        <p>• Internal mobility opportunities</p>
                        <p>• Mentorship programs</p>
                        <p>• Conference and training budgets</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

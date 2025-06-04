import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Target,
  TrendingUp,
  BookOpen,
  Award,
  Briefcase,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Play,
  Zap,
  Brain,
  MapPin,
  DollarSign,
  Users,
  Lightbulb,
  Rocket,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CareerStep {
  id: string;
  title: string;
  description: string;
  type: "skill" | "certification" | "experience" | "education" | "project";
  timeEstimate: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: string[];
  resources: {
    title: string;
    url: string;
    type: "course" | "article" | "video" | "book" | "practice";
    provider: string;
    cost: "free" | "paid";
  }[];
  completed: boolean;
}

interface CareerPath {
  id: string;
  goalTitle: string;
  currentLevel: string;
  targetLevel: string;
  totalTimeEstimate: string;
  averageSalary: string;
  demandScore: number;
  steps: CareerStep[];
  relatedJobs: {
    title: string;
    company: string;
    salary: string;
    location: string;
  }[];
}

export default function CareerPathVisualizer() {
  const { toast } = useToast();
  const [goalInput, setGoalInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("overview");

  const generateCareerPath = async () => {
    if (!goalInput.trim()) {
      toast({
        title: "Goal Required",
        description: "Please enter your career goal to generate a path",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock career path generation based on input
      const mockPath: CareerPath = {
        id: Date.now().toString(),
        goalTitle: goalInput,
        currentLevel: "Beginner",
        targetLevel: "Professional",
        totalTimeEstimate: "12-18 months",
        averageSalary: "$85,000 - $120,000",
        demandScore: 92,
        steps: [
          {
            id: "1",
            title: "Learn Programming Fundamentals",
            description:
              "Master the basics of programming with Python - variables, loops, functions, and data structures.",
            type: "skill",
            timeEstimate: "2-3 months",
            difficulty: "beginner",
            prerequisites: [],
            resources: [
              {
                title: "Python for Everybody Specialization",
                url: "#",
                type: "course",
                provider: "Coursera",
                cost: "free",
              },
              {
                title: "Automate the Boring Stuff with Python",
                url: "#",
                type: "book",
                provider: "No Starch Press",
                cost: "free",
              },
            ],
            completed: false,
          },
          {
            id: "2",
            title: "Statistics and Mathematics Foundation",
            description:
              "Build strong mathematical foundations including statistics, linear algebra, and calculus basics.",
            type: "skill",
            timeEstimate: "2-3 months",
            difficulty: "intermediate",
            prerequisites: ["Basic programming knowledge"],
            resources: [
              {
                title: "Statistics for Data Science",
                url: "#",
                type: "course",
                provider: "Khan Academy",
                cost: "free",
              },
              {
                title: "Linear Algebra Essentials",
                url: "#",
                type: "video",
                provider: "3Blue1Brown",
                cost: "free",
              },
            ],
            completed: false,
          },
          {
            id: "3",
            title: "Data Analysis with Pandas & NumPy",
            description:
              "Learn data manipulation and analysis using Python's most popular libraries.",
            type: "skill",
            timeEstimate: "1-2 months",
            difficulty: "intermediate",
            prerequisites: ["Python fundamentals", "Basic statistics"],
            resources: [
              {
                title: "Pandas Bootcamp",
                url: "#",
                type: "course",
                provider: "DataCamp",
                cost: "paid",
              },
            ],
            completed: false,
          },
          {
            id: "4",
            title: "Machine Learning Fundamentals",
            description:
              "Understand core ML concepts: supervised/unsupervised learning, model evaluation, and common algorithms.",
            type: "skill",
            timeEstimate: "3-4 months",
            difficulty: "intermediate",
            prerequisites: ["Data analysis skills", "Statistics foundation"],
            resources: [
              {
                title: "Machine Learning Course",
                url: "#",
                type: "course",
                provider: "Andrew Ng - Coursera",
                cost: "free",
              },
            ],
            completed: false,
          },
          {
            id: "5",
            title: "Build Portfolio Projects",
            description:
              "Create 3-5 end-to-end data science projects showcasing different skills and techniques.",
            type: "project",
            timeEstimate: "2-3 months",
            difficulty: "intermediate",
            prerequisites: ["ML fundamentals", "Data analysis skills"],
            resources: [
              {
                title: "Kaggle Competitions",
                url: "#",
                type: "practice",
                provider: "Kaggle",
                cost: "free",
              },
            ],
            completed: false,
          },
          {
            id: "6",
            title: "AWS Certified Data Analytics",
            description:
              "Get certified in cloud data analytics to demonstrate enterprise-level skills.",
            type: "certification",
            timeEstimate: "1-2 months",
            difficulty: "advanced",
            prerequisites: ["Portfolio projects", "Cloud basics"],
            resources: [
              {
                title: "AWS Data Analytics Prep Course",
                url: "#",
                type: "course",
                provider: "A Cloud Guru",
                cost: "paid",
              },
            ],
            completed: false,
          },
        ],
        relatedJobs: [
          {
            title: "Junior Data Scientist",
            company: "TechCorp",
            salary: "$70,000 - $90,000",
            location: "San Francisco, CA",
          },
          {
            title: "Data Analyst",
            company: "DataFlow Inc",
            salary: "$60,000 - $80,000",
            location: "New York, NY",
          },
          {
            title: "ML Engineer",
            company: "AI Innovations",
            salary: "$90,000 - $130,000",
            location: "Seattle, WA",
          },
        ],
      };

      setCareerPath(mockPath);
      toast({
        title: "Career Path Generated!",
        description: `Created a personalized path for: ${goalInput}`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to generate career path. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleStepCompletion = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "skill":
        return <Brain className="h-5 w-5" />;
      case "certification":
        return <Award className="h-5 w-5" />;
      case "experience":
        return <Briefcase className="h-5 w-5" />;
      case "education":
        return <BookOpen className="h-5 w-5" />;
      case "project":
        return <Rocket className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 bg-green-50";
      case "intermediate":
        return "text-yellow-600 bg-yellow-50";
      case "advanced":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return <Play className="h-4 w-4" />;
      case "video":
        return <Play className="h-4 w-4" />;
      case "book":
        return <BookOpen className="h-4 w-4" />;
      case "article":
        return <BookOpen className="h-4 w-4" />;
      case "practice":
        return <Target className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const completionPercentage = careerPath
    ? (completedSteps.size / careerPath.steps.length) * 100
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Brain className="h-10 w-10 text-primary" />
            AI Career Path Visualizer
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized, AI-powered career guidance with step-by-step
            learning paths, skill recommendations, and job market insights
            tailored to your goals.
          </p>
        </div>

        {/* Goal Input */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              What's your career goal?
            </CardTitle>
            <CardDescription>
              Tell us what you want to become and we'll create a personalized
              learning path
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="e.g., I want to become a data scientist, software engineer, product manager..."
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="flex-1"
                disabled={isAnalyzing}
              />
              <Button
                onClick={generateCareerPath}
                disabled={isAnalyzing || !goalInput.trim()}
                className="min-w-[140px]"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Path
                  </>
                )}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">
                Popular goals:
              </span>
              {[
                "Data Scientist",
                "Software Engineer",
                "Product Manager",
                "UX Designer",
                "DevOps Engineer",
              ].map((goal) => (
                <Button
                  key={goal}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setGoalInput(`I want to become a ${goal.toLowerCase()}`)
                  }
                  disabled={isAnalyzing}
                >
                  {goal}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Path Results */}
        {careerPath && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">
                    {careerPath.totalTimeEstimate}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Estimated Time
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-lg font-bold">
                    {careerPath.averageSalary}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Salary
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">
                    {careerPath.demandScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Market Demand
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold">
                    {completionPercentage.toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>
                  Track your journey towards becoming a{" "}
                  {careerPath.goalTitle.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {completedSteps.size} of {careerPath.steps.length} steps
                      completed
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {completionPercentage.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Detailed Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Learning Path</TabsTrigger>
                <TabsTrigger value="jobs">Related Jobs</TabsTrigger>
                <TabsTrigger value="insights">Market Insights</TabsTrigger>
              </TabsList>

              {/* Learning Path */}
              <TabsContent value="overview" className="space-y-6">
                <div className="space-y-6">
                  {careerPath.steps.map((step, index) => {
                    const isCompleted = completedSteps.has(step.id);
                    const isNext =
                      index === 0 ||
                      completedSteps.has(careerPath.steps[index - 1]?.id);

                    return (
                      <Card
                        key={step.id}
                        className={`transition-all ${isCompleted ? "opacity-75" : ""}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-full ${isCompleted ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
                            >
                              {isCompleted ? (
                                <CheckCircle className="h-6 w-6" />
                              ) : (
                                getStepIcon(step.type)
                              )}
                            </div>

                            <div className="flex-1 space-y-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold mb-2">
                                    {step.title}
                                  </h3>
                                  <p className="text-muted-foreground mb-3">
                                    {step.description}
                                  </p>

                                  <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge
                                      variant="outline"
                                      className="capitalize"
                                    >
                                      {step.type}
                                    </Badge>
                                    <Badge
                                      className={getDifficultyColor(
                                        step.difficulty,
                                      )}
                                    >
                                      {step.difficulty}
                                    </Badge>
                                    <Badge variant="secondary">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {step.timeEstimate}
                                    </Badge>
                                  </div>

                                  {step.prerequisites.length > 0 && (
                                    <div className="mb-4">
                                      <span className="text-sm font-medium">
                                        Prerequisites:{" "}
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        {step.prerequisites.join(", ")}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <Button
                                  variant={
                                    isCompleted ? "secondary" : "outline"
                                  }
                                  onClick={() => toggleStepCompletion(step.id)}
                                  className={isNext ? "" : "opacity-50"}
                                >
                                  {isCompleted ? "Completed" : "Mark Complete"}
                                </Button>
                              </div>

                              {step.resources.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-3">
                                    Learning Resources
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {step.resources.map(
                                      (resource, resourceIndex) => (
                                        <div
                                          key={resourceIndex}
                                          className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                        >
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                              {getResourceIcon(resource.type)}
                                              <span className="font-medium text-sm">
                                                {resource.title}
                                              </span>
                                            </div>
                                            <Badge
                                              variant={
                                                resource.cost === "free"
                                                  ? "secondary"
                                                  : "outline"
                                              }
                                              className="text-xs"
                                            >
                                              {resource.cost}
                                            </Badge>
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                            {resource.provider} •{" "}
                                            {resource.type}
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Related Jobs */}
              <TabsContent value="jobs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Jobs You Can Apply For</CardTitle>
                    <CardDescription>
                      Positions available once you complete this career path
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {careerPath.relatedJobs.map((job, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {job.company}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {job.salary}
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Job
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Market Insights */}
              <TabsContent value="insights" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Market Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Job Growth (5-year)</span>
                          <span className="font-medium text-green-600">
                            +22%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Competition Level</span>
                          <span className="font-medium text-yellow-600">
                            Moderate
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Remote Opportunities</span>
                          <span className="font-medium text-blue-600">87%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Top Skills in Demand
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          "Python",
                          "Machine Learning",
                          "SQL",
                          "Data Visualization",
                          "Statistics",
                        ].map((skill, index) => (
                          <div
                            key={skill}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm">{skill}</span>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={90 - index * 10}
                                className="w-20 h-2"
                              />
                              <span className="text-xs text-muted-foreground">
                                {90 - index * 10}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}

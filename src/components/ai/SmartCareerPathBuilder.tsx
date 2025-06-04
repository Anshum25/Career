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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  TrendingUpIcon,
  TargetIcon,
  ClockIcon,
  StarIcon,
  BrainIcon,
  RocketIcon,
  CheckCircleIcon,
  PlayIcon,
  BookOpenIcon,
  DollarSignIcon,
  MapPinIcon,
  CalendarIcon,
  ZapIcon,
} from "lucide-react";

interface CareerStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  type: "skill" | "certification" | "experience" | "course";
  cost: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  resources: Array<{
    title: string;
    type: "course" | "certification" | "project" | "book";
    url: string;
    cost: string;
  }>;
}

interface CareerPath {
  targetRole: string;
  currentLevel: string;
  timeToAchieve: string;
  salaryIncrease: string;
  matchScore: number;
  steps: CareerStep[];
  milestones: Array<{
    title: string;
    month: number;
    description: string;
  }>;
}

export default function SmartCareerPathBuilder() {
  const [dreamJob, setDreamJob] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [experience, setExperience] = useState("");
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateCareerPath = async () => {
    setIsGenerating(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockCareerPath: CareerPath = {
      targetRole: dreamJob,
      currentLevel: currentRole,
      timeToAchieve: "18-24 months",
      salaryIncrease: "40-60%",
      matchScore: 87,
      steps: [
        {
          id: "1",
          title: "Master React & TypeScript",
          description:
            "Build advanced React applications with TypeScript for type safety",
          duration: "2-3 months",
          difficulty: "Intermediate",
          type: "skill",
          cost: "₹15,000",
          priority: "High",
          completed: false,
          resources: [
            {
              title: "React TypeScript Course",
              type: "course",
              url: "#",
              cost: "₹5,000",
            },
            {
              title: "TypeScript Certification",
              type: "certification",
              url: "#",
              cost: "₹10,000",
            },
          ],
        },
        {
          id: "2",
          title: "Learn System Design",
          description:
            "Understand scalable system architecture and design patterns",
          duration: "3-4 months",
          difficulty: "Advanced",
          type: "skill",
          cost: "₹20,000",
          priority: "High",
          completed: false,
          resources: [
            {
              title: "System Design Interview",
              type: "book",
              url: "#",
              cost: "₹2,000",
            },
            {
              title: "AWS Architecture Course",
              type: "course",
              url: "#",
              cost: "₹18,000",
            },
          ],
        },
        {
          id: "3",
          title: "Build Full-Stack Portfolio",
          description:
            "Create 3-4 production-ready applications showcasing your skills",
          duration: "4-5 months",
          difficulty: "Intermediate",
          type: "project",
          cost: "₹5,000",
          priority: "High",
          completed: false,
          resources: [
            {
              title: "Portfolio Project Guide",
              type: "course",
              url: "#",
              cost: "₹3,000",
            },
            {
              title: "Deployment on AWS",
              type: "course",
              url: "#",
              cost: "₹2,000",
            },
          ],
        },
        {
          id: "4",
          title: "Get AWS Certification",
          description: "Earn AWS Solutions Architect certification",
          duration: "2-3 months",
          difficulty: "Advanced",
          type: "certification",
          cost: "₹25,000",
          priority: "Medium",
          completed: false,
          resources: [
            {
              title: "AWS Cert Prep Course",
              type: "course",
              url: "#",
              cost: "₹15,000",
            },
            {
              title: "AWS Exam Fee",
              type: "certification",
              url: "#",
              cost: "₹10,000",
            },
          ],
        },
        {
          id: "5",
          title: "Leadership & Mentoring",
          description: "Develop team leadership and mentoring skills",
          duration: "6+ months",
          difficulty: "Advanced",
          type: "experience",
          cost: "₹10,000",
          priority: "Medium",
          completed: false,
          resources: [
            {
              title: "Leadership Bootcamp",
              type: "course",
              url: "#",
              cost: "₹8,000",
            },
            {
              title: "Mentoring Program",
              type: "course",
              url: "#",
              cost: "₹2,000",
            },
          ],
        },
      ],
      milestones: [
        {
          title: "Complete React/TypeScript Mastery",
          month: 3,
          description: "Build 2 complex projects",
        },
        {
          title: "System Design Knowledge",
          month: 7,
          description: "Pass mock system design interviews",
        },
        {
          title: "Portfolio Completion",
          month: 12,
          description: "Launch 4 production applications",
        },
        {
          title: "AWS Certification",
          month: 15,
          description: "Earn AWS Solutions Architect cert",
        },
        {
          title: "Senior Role Ready",
          month: 18,
          description: "Apply for senior positions",
        },
      ],
    };

    setCareerPath(mockCareerPath);
    setIsGenerating(false);

    toast({
      title: "Career Path Generated!",
      description: "Your personalized career roadmap is ready.",
    });
  };

  const toggleStepCompletion = (stepId: string) => {
    if (!careerPath) return;

    setCareerPath((prev) => ({
      ...prev!,
      steps: prev!.steps.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step,
      ),
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "border-red-500 bg-red-50";
      case "Medium":
        return "border-yellow-500 bg-yellow-50";
      case "Low":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  const completedSteps =
    careerPath?.steps.filter((step) => step.completed).length || 0;
  const totalSteps = careerPath?.steps.length || 0;
  const progressPercentage =
    totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <BrainIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">AI Career Path Builder</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your dream job and current position. Our AI will create a
            personalized roadmap with skills, courses, certifications, and
            timeline to achieve your career goals.
          </p>
        </div>

        {!careerPath ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="h-5 w-5" />
                Build Your Career Path
              </CardTitle>
              <CardDescription>
                Tell us about your career goals and we'll create a personalized
                roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dreamJob">Dream Job Title *</Label>
                <Input
                  id="dreamJob"
                  placeholder="e.g., Senior Full Stack Developer, Product Manager"
                  value={dreamJob}
                  onChange={(e) => setDreamJob(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentRole">Current Role *</Label>
                <Input
                  id="currentRole"
                  placeholder="e.g., Junior Developer, Software Engineer"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  placeholder="e.g., 2 years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>

              <Button
                onClick={generateCareerPath}
                disabled={!dreamJob || !currentRole || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <ZapIcon className="h-4 w-4 mr-2 animate-spin" />
                    AI is analyzing your path...
                  </>
                ) : (
                  <>
                    <RocketIcon className="h-4 w-4 mr-2" />
                    Generate My Career Path
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TargetIcon className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Target Role</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {careerPath.targetRole}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Timeline</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {careerPath.timeToAchieve}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSignIcon className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Salary Increase</span>
                    </div>
                    <p className="text-lg font-semibold text-green-600">
                      {careerPath.salaryIncrease}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Match Score</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={careerPath.matchScore}
                        className="flex-1"
                      />
                      <span className="text-lg font-semibold">
                        {careerPath.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUpIcon className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm font-semibold">
                      {completedSteps}/{totalSteps} steps completed
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Keep going! You're {progressPercentage.toFixed(0)}% of the
                    way to your dream job.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="roadmap" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="roadmap" className="space-y-4">
                {careerPath.steps.map((step, index) => (
                  <Card
                    key={step.id}
                    className={`border-l-4 ${getPriorityColor(step.priority)}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                                Step {index + 1}
                              </span>
                              <Badge
                                variant="outline"
                                className={getDifficultyColor(step.difficulty)}
                              >
                                {step.difficulty}
                              </Badge>
                              <Badge variant="secondary">{step.type}</Badge>
                            </div>
                            <Badge
                              variant={
                                step.priority === "High"
                                  ? "destructive"
                                  : step.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {step.priority} Priority
                            </Badge>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {step.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              {step.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSignIcon className="h-4 w-4" />
                              {step.cost}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((resource, idx) => (
                              <Button key={idx} variant="outline" size="sm">
                                <BookOpenIcon className="h-4 w-4 mr-2" />
                                {resource.title}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <Button
                            variant={step.completed ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleStepCompletion(step.id)}
                          >
                            {step.completed ? (
                              <>
                                <CheckCircleIcon className="h-4 w-4 mr-2" />
                                Completed
                              </>
                            ) : (
                              <>
                                <PlayIcon className="h-4 w-4 mr-2" />
                                Start
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="milestones" className="space-y-4">
                <div className="relative">
                  {careerPath.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-4 pb-8">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                        {index < careerPath.milestones.length - 1 && (
                          <div className="w-0.5 h-16 bg-blue-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{milestone.title}</h3>
                          <Badge variant="outline">
                            Month {milestone.month}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {careerPath.steps
                    .flatMap((step) => step.resources)
                    .map((resource, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{resource.title}</h4>
                              <p className="text-sm text-muted-foreground capitalize">
                                {resource.type}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{resource.cost}</p>
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setCareerPath(null)}>
                Build New Path
              </Button>
              <Button>
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule Learning Plan
              </Button>
              <Button variant="outline">Export to PDF</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

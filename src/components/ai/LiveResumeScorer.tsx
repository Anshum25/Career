import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  FileTextIcon,
  UploadIcon,
  DownloadIcon,
  ZapIcon,
  TrendingUpIcon,
  StarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  BrainIcon,
  TargetIcon,
  RefreshCwIcon,
} from "lucide-react";

interface ResumeScore {
  overall: number;
  sections: {
    format: number;
    content: number;
    keywords: number;
    experience: number;
    skills: number;
    education: number;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
    suggestions: string[];
    missingKeywords: string[];
  };
  atsCompatibility: number;
  industryMatch: number;
}

interface Enhancement {
  id: string;
  type: "add" | "modify" | "remove";
  section: string;
  current: string;
  suggested: string;
  impact: "high" | "medium" | "low";
  reason: string;
}

export default function LiveResumeScorer() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeScore, setResumeScore] = useState<ResumeScore | null>(null);
  const [enhancements, setEnhancements] = useState<Enhancement[]>([]);
  const [targetJob, setTargetJob] = useState("Full Stack Developer");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type === "application/pdf") {
        setResumeFile(file);
        analyzeResume(file);
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
    },
    [],
  );

  const analyzeResume = async (file: File) => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const mockScore: ResumeScore = {
      overall: 73,
      sections: {
        format: 85,
        content: 70,
        keywords: 60,
        experience: 80,
        skills: 75,
        education: 90,
      },
      feedback: {
        strengths: [
          "Clear and professional formatting",
          "Strong technical skills section",
          "Relevant work experience",
          "Good education background",
        ],
        improvements: [
          "Add more quantifiable achievements",
          "Include industry-specific keywords",
          "Optimize for ATS systems",
          "Add a professional summary",
        ],
        suggestions: [
          "Use action verbs to start bullet points",
          "Include metrics and numbers",
          "Tailor keywords for target role",
          "Add relevant certifications",
        ],
        missingKeywords: [
          "React",
          "Node.js",
          "AWS",
          "Agile",
          "CI/CD",
          "Docker",
        ],
      },
      atsCompatibility: 68,
      industryMatch: 78,
    };

    const mockEnhancements: Enhancement[] = [
      {
        id: "1",
        type: "add",
        section: "Summary",
        current: "No professional summary",
        suggested:
          "Add a compelling 3-4 line professional summary highlighting your key skills and experience",
        impact: "high",
        reason:
          "Professional summary helps recruiters quickly understand your value proposition",
      },
      {
        id: "2",
        type: "modify",
        section: "Experience",
        current: "Developed web applications",
        suggested:
          "Developed 5+ responsive web applications using React and Node.js, serving 10,000+ monthly users",
        impact: "high",
        reason:
          "Adding specific numbers and technologies makes achievements more impactful",
      },
      {
        id: "3",
        type: "add",
        section: "Skills",
        current: "JavaScript, HTML, CSS",
        suggested: "Add: React, Node.js, AWS, Docker, MongoDB, TypeScript",
        impact: "medium",
        reason: "These are key technologies for full stack development roles",
      },
      {
        id: "4",
        type: "modify",
        section: "Projects",
        current: "Built a todo app",
        suggested:
          "Developed a full-stack task management application with React frontend, Node.js backend, and MongoDB database, deployed on AWS with 99.9% uptime",
        impact: "high",
        reason:
          "Detailed project descriptions with tech stack and metrics show technical depth",
      },
    ];

    setResumeScore(mockScore);
    setEnhancements(mockEnhancements);
    setIsAnalyzing(false);

    toast({
      title: "Resume Analyzed!",
      description: `Your resume scored ${mockScore.overall}/100. Check the detailed feedback.`,
    });
  };

  const enhanceResume = async () => {
    setIsEnhancing(true);

    // Simulate AI enhancement
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update score after enhancement
    setResumeScore((prev) =>
      prev
        ? {
            ...prev,
            overall: Math.min(prev.overall + 15, 95),
            sections: {
              format: prev.sections.format,
              content: Math.min(prev.sections.content + 20, 95),
              keywords: Math.min(prev.sections.keywords + 25, 95),
              experience: Math.min(prev.sections.experience + 10, 95),
              skills: Math.min(prev.sections.skills + 15, 95),
              education: prev.sections.education,
            },
            atsCompatibility: Math.min(prev.atsCompatibility + 20, 95),
            industryMatch: Math.min(prev.industryMatch + 12, 95),
          }
        : null,
    );

    setIsEnhancing(false);

    toast({
      title: "Resume Enhanced!",
      description: "Your resume has been optimized with AI suggestions.",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "D";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      case "low":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <BrainIcon className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold">AI Resume Scorer & Enhancer</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and get instant AI-powered scoring, feedback, and
            enhancement suggestions. Optimize for ATS systems and target roles.
          </p>
        </div>

        {!resumeFile ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5" />
                Upload Your Resume
              </CardTitle>
              <CardDescription>
                Upload your resume in PDF format for instant AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">
                  Drag & drop your resume here
                </p>
                <p className="text-muted-foreground mb-4">
                  or click to browse files
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload">
                  <Button className="cursor-pointer">
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Choose PDF File
                  </Button>
                </label>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Supported format: PDF • Max size: 10MB
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {isAnalyzing ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ZapIcon className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-semibold mb-2">
                    Analyzing Your Resume...
                  </h3>
                  <p className="text-muted-foreground">
                    Our AI is evaluating format, content, keywords, and ATS
                    compatibility
                  </p>
                  <Progress value={67} className="mt-4 max-w-sm mx-auto" />
                </CardContent>
              </Card>
            ) : (
              resumeScore && (
                <>
                  {/* Score Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                          <span className={getScoreColor(resumeScore.overall)}>
                            {resumeScore.overall}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-lg px-3 py-1"
                          >
                            {getScoreGrade(resumeScore.overall)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Overall Score
                        </p>
                        <Progress
                          value={resumeScore.overall}
                          className="mt-2"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold mb-2">
                          <span
                            className={getScoreColor(
                              resumeScore.atsCompatibility,
                            )}
                          >
                            {resumeScore.atsCompatibility}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ATS Compatible
                        </p>
                        <Progress
                          value={resumeScore.atsCompatibility}
                          className="mt-2"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl font-bold mb-2">
                          <span
                            className={getScoreColor(resumeScore.industryMatch)}
                          >
                            {resumeScore.industryMatch}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Industry Match
                        </p>
                        <Progress
                          value={resumeScore.industryMatch}
                          className="mt-2"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 text-center">
                        <Button
                          onClick={enhanceResume}
                          disabled={isEnhancing}
                          className="w-full"
                        >
                          {isEnhancing ? (
                            <>
                              <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />
                              Enhancing...
                            </>
                          ) : (
                            <>
                              <ZapIcon className="h-4 w-4 mr-2" />
                              Enhance Resume
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          AI-powered optimization
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Tabs defaultValue="sections" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="sections">Section Scores</TabsTrigger>
                      <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
                      <TabsTrigger value="enhancements">
                        Enhancements
                      </TabsTrigger>
                      <TabsTrigger value="keywords">Keywords</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sections" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(resumeScore.sections).map(
                          ([section, score]) => (
                            <Card key={section}>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium capitalize">
                                    {section}
                                  </h4>
                                  <Badge
                                    variant="outline"
                                    className={getScoreColor(score)}
                                  >
                                    {score}/100
                                  </Badge>
                                </div>
                                <Progress value={score} />
                              </CardContent>
                            </Card>
                          ),
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="feedback" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-600">
                              <CheckCircleIcon className="h-5 w-5" />
                              Strengths
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {resumeScore.feedback.strengths.map(
                                (strength, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm">{strength}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-600">
                              <AlertTriangleIcon className="h-5 w-5" />
                              Areas for Improvement
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {resumeScore.feedback.improvements.map(
                                (improvement, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm">
                                      {improvement}
                                    </span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-blue-600">
                            <StarIcon className="h-5 w-5" />
                            AI Suggestions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {resumeScore.feedback.suggestions.map(
                              (suggestion, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-sm">{suggestion}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="enhancements" className="space-y-4">
                      {enhancements.map((enhancement) => (
                        <Card
                          key={enhancement.id}
                          className={`border-l-4 ${getImpactColor(enhancement.impact)}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className="capitalize"
                                  >
                                    {enhancement.type}
                                  </Badge>
                                  <Badge variant="secondary">
                                    {enhancement.section}
                                  </Badge>
                                  <Badge
                                    variant={
                                      enhancement.impact === "high"
                                        ? "destructive"
                                        : enhancement.impact === "medium"
                                          ? "default"
                                          : "secondary"
                                    }
                                  >
                                    {enhancement.impact} impact
                                  </Badge>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-sm font-medium">
                                    Current:
                                  </p>
                                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                    {enhancement.current}
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-sm font-medium">
                                    Suggested:
                                  </p>
                                  <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
                                    {enhancement.suggested}
                                  </p>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                  {enhancement.reason}
                                </p>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  Apply
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <XCircleIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="keywords" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TargetIcon className="h-5 w-5" />
                            Missing Keywords for {targetJob}
                          </CardTitle>
                          <CardDescription>
                            Add these keywords to improve your resume's ATS
                            compatibility
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {resumeScore.feedback.missingKeywords.map(
                              (keyword, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-blue-50"
                                >
                                  + {keyword}
                                </Badge>
                              ),
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-center gap-4">
                    <Button variant="outline">
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Upload New Resume
                    </Button>
                    <Button>
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Download Enhanced Resume
                    </Button>
                    <Button variant="outline">
                      <TrendingUpIcon className="h-4 w-4 mr-2" />
                      View Improvement History
                    </Button>
                  </div>
                </>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

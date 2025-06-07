import React, { useState, useCallback, useRef } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  SparklesIcon,
  AwardIcon,
  EyeIcon,
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
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setResumeFile(file);
    await analyzeResume(file);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const analyzeResume = async (file: File) => {
    setIsAnalyzing(true);

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock AI analysis results
      const mockScore: ResumeScore = {
        overall: Math.floor(Math.random() * 30) + 70, // Score between 70-100
        sections: {
          format: Math.floor(Math.random() * 20) + 80,
          content: Math.floor(Math.random() * 25) + 65,
          keywords: Math.floor(Math.random() * 40) + 50,
          experience: Math.floor(Math.random() * 25) + 70,
          skills: Math.floor(Math.random() * 20) + 75,
          education: Math.floor(Math.random() * 15) + 85,
        },
        feedback: {
          strengths: [
            "Clear and professional formatting",
            "Strong technical skills section",
            "Relevant work experience",
            "Good use of action verbs",
          ],
          improvements: [
            "Add more quantifiable achievements",
            "Include relevant keywords for ATS",
            "Expand skills section",
            "Add project descriptions",
          ],
          suggestions: [
            "Use bullet points for better readability",
            "Include metrics and numbers",
            "Add certifications if available",
            "Tailor content to job description",
          ],
          missingKeywords: [
            "React.js",
            "Node.js",
            "TypeScript",
            "AWS",
            "Docker",
            "Kubernetes",
          ],
        },
        atsCompatibility: Math.floor(Math.random() * 20) + 75,
        industryMatch: Math.floor(Math.random() * 25) + 70,
      };

      setResumeScore(mockScore);
      generateEnhancements(mockScore);

      toast({
        title: "Analysis Complete!",
        description: `Your resume scored ${mockScore.overall}/100. Check the insights below.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description:
          "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateEnhancements = (score: ResumeScore) => {
    const mockEnhancements: Enhancement[] = [
      {
        id: "1",
        type: "add",
        section: "Experience",
        current: "Developed web applications",
        suggested:
          "Developed 5+ responsive web applications using React.js, increasing user engagement by 40%",
        impact: "high",
        reason:
          "Adding metrics and specific technologies makes your experience more compelling",
      },
      {
        id: "2",
        type: "modify",
        section: "Skills",
        current: "JavaScript, HTML, CSS",
        suggested:
          "JavaScript (ES6+), TypeScript, React.js, Node.js, HTML5, CSS3, Tailwind CSS",
        impact: "medium",
        reason:
          "More specific and modern technology stack shows current expertise",
      },
      {
        id: "3",
        type: "add",
        section: "Projects",
        current: "",
        suggested:
          "E-commerce Platform - Built a full-stack e-commerce solution with payment integration",
        impact: "high",
        reason: "Projects demonstrate practical application of your skills",
      },
    ];
    setEnhancements(mockEnhancements);
  };

  const applyEnhancement = async (enhancementId: string) => {
    setIsEnhancing(true);

    // Simulate enhancement application
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setEnhancements((prev) => prev.filter((e) => e.id !== enhancementId));

    toast({
      title: "Enhancement Applied",
      description:
        "Your resume has been updated with the suggested improvement.",
    });

    setIsEnhancing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Resume Scorer & Enhancer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get instant AI-powered feedback and improve your resume score
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UploadIcon className="h-5 w-5" />
                  Upload Resume
                </CardTitle>
                <CardDescription>
                  Upload your resume to get instant AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Drag and Drop Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FileTextIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Drag and drop your resume here, or click to select
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAnalyzing}
                  >
                    <UploadIcon className="h-4 w-4 mr-2" />
                    {isAnalyzing ? "Analyzing..." : "Choose File"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </div>

                {resumeFile && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <FileTextIcon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium truncate">
                      {resumeFile.name}
                    </span>
                  </div>
                )}

                {/* Target Job Input */}
                <div className="space-y-2">
                  <Label htmlFor="target-job">Target Job Title</Label>
                  <Input
                    id="target-job"
                    value={targetJob}
                    onChange={(e) => setTargetJob(e.target.value)}
                    placeholder="e.g., Full Stack Developer"
                  />
                </div>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <RefreshCwIcon className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Analyzing resume...</span>
                    </div>
                    <Progress value={66} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {resumeScore ? (
              <Tabs defaultValue="score" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="score">Score Analysis</TabsTrigger>
                  <TabsTrigger value="enhancements">Enhancements</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="score" className="space-y-6">
                  {/* Overall Score */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Overall Score</span>
                        <Badge className={getScoreColor(resumeScore.overall)}>
                          {getScoreLabel(resumeScore.overall)}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold mb-2">
                          <span className={getScoreColor(resumeScore.overall)}>
                            {resumeScore.overall}
                          </span>
                          <span className="text-gray-400">/100</span>
                        </div>
                        <Progress
                          value={resumeScore.overall}
                          className="w-full h-3"
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(resumeScore.sections).map(
                          ([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-1">
                                {key}
                              </div>
                              <div
                                className={`text-lg font-semibold ${getScoreColor(value)}`}
                              >
                                {value}%
                              </div>
                              <Progress
                                value={value}
                                className="w-full h-2 mt-1"
                              />
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Feedback Cards */}
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
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{strength}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-600">
                          <AlertTriangleIcon className="h-5 w-5" />
                          Improvements
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
                                <AlertTriangleIcon className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{improvement}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* ATS & Industry Match */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BrainIcon className="h-5 w-5" />
                          ATS Compatibility
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-2">
                            <span
                              className={getScoreColor(
                                resumeScore.atsCompatibility,
                              )}
                            >
                              {resumeScore.atsCompatibility}%
                            </span>
                          </div>
                          <Progress
                            value={resumeScore.atsCompatibility}
                            className="w-full"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TargetIcon className="h-5 w-5" />
                          Industry Match
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold mb-2">
                            <span
                              className={getScoreColor(
                                resumeScore.industryMatch,
                              )}
                            >
                              {resumeScore.industryMatch}%
                            </span>
                          </div>
                          <Progress
                            value={resumeScore.industryMatch}
                            className="w-full"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="enhancements" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <SparklesIcon className="h-5 w-5" />
                        AI Enhancements
                      </CardTitle>
                      <CardDescription>
                        Apply these suggestions to improve your resume score
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {enhancements.map((enhancement) => (
                        <div
                          key={enhancement.id}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
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
                                <span className="text-sm font-medium">
                                  {enhancement.section}
                                </span>
                              </div>

                              {enhancement.current && (
                                <div>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Current:
                                  </span>
                                  <p className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                                    {enhancement.current}
                                  </p>
                                </div>
                              )}

                              <div>
                                <span className="text-sm text-green-600 dark:text-green-400">
                                  Suggested:
                                </span>
                                <p className="text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded mt-1">
                                  {enhancement.suggested}
                                </p>
                              </div>

                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {enhancement.reason}
                              </p>
                            </div>

                            <Button
                              size="sm"
                              onClick={() => applyEnhancement(enhancement.id)}
                              disabled={isEnhancing}
                              className="ml-4"
                            >
                              {isEnhancing ? "Applying..." : "Apply"}
                            </Button>
                          </div>
                        </div>
                      ))}

                      {enhancements.length === 0 && (
                        <div className="text-center py-8">
                          <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-2" />
                          <p className="text-gray-600 dark:text-gray-400">
                            Great! No enhancements needed. Your resume looks
                            excellent!
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preview">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <EyeIcon className="h-5 w-5" />
                        Resume Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <FileTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Resume preview will be available here
                        </p>
                        <Button variant="outline">
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Download Enhanced Resume
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Resume Uploaded
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload your resume to get started with AI-powered analysis
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Upload Resume
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

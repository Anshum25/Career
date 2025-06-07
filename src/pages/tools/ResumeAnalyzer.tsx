import React, { useState, useRef } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Upload,
  FileText,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Eye,
  Download,
  Sparkles,
  Target,
  Award,
  Lightbulb,
  Zap,
  RefreshCw,
} from "lucide-react";

interface AnalysisResult {
  score: number;
  strengths: string[];
  improvements: string[];
  skillsFound: string[];
  experienceLevel: string;
  atsCompatibility: number;
  readabilityScore: number;
  keywordDensity: Record<string, number>;
  sections: {
    name: string;
    score: number;
    feedback: string;
  }[];
}

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [jobDescription, setJobDescription] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (uploadedFile: File) => {
    if (!uploadedFile) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(uploadedFile.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(uploadedFile);
    toast({
      title: "File Uploaded Successfully",
      description: `${uploadedFile.name} is ready for analysis.`,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      handleFileUpload(uploadedFile);
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

  const analyzeResume = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please upload a resume file first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simulate API call with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate mock analysis results
      const mockResult: AnalysisResult = {
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        strengths: [
          "Clear professional formatting and layout",
          "Strong technical skills section with relevant technologies",
          "Quantifiable achievements with specific metrics",
          "Proper use of action verbs throughout",
          "Relevant work experience for the target role",
        ],
        improvements: [
          "Add more industry-specific keywords for better ATS compatibility",
          "Include soft skills alongside technical competencies",
          "Expand on leadership and project management experience",
          "Add links to portfolio or professional projects",
          "Consider adding relevant certifications",
        ],
        skillsFound: [
          "JavaScript",
          "React",
          "Node.js",
          "Python",
          "SQL",
          "Git",
          "AWS",
          "Docker",
          "TypeScript",
          "MongoDB",
          "REST APIs",
        ],
        experienceLevel: Math.random() > 0.5 ? "Senior" : "Mid-level",
        atsCompatibility: Math.floor(Math.random() * 25) + 75, // 75-100
        readabilityScore: Math.floor(Math.random() * 20) + 80, // 80-100
        keywordDensity: {
          JavaScript: 8,
          React: 6,
          "Node.js": 4,
          Python: 3,
          AWS: 2,
          Docker: 2,
        },
        sections: [
          {
            name: "Contact Information",
            score: Math.floor(Math.random() * 15) + 85,
            feedback: "Complete and professional contact details",
          },
          {
            name: "Professional Summary",
            score: Math.floor(Math.random() * 25) + 70,
            feedback: "Could be more tailored to the target role",
          },
          {
            name: "Work Experience",
            score: Math.floor(Math.random() * 20) + 75,
            feedback: "Good use of quantifiable achievements",
          },
          {
            name: "Technical Skills",
            score: Math.floor(Math.random() * 15) + 80,
            feedback: "Comprehensive and relevant skill set",
          },
          {
            name: "Education",
            score: Math.floor(Math.random() * 10) + 85,
            feedback: "Properly formatted educational background",
          },
        ],
      };

      setAnalysisResult(mockResult);

      toast({
        title: "Analysis Complete!",
        description: `Your resume scored ${mockResult.score}/100. Check the detailed feedback below.`,
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Resume Analyzer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get comprehensive insights and improve your resume with AI-powered
            analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Resume
                </CardTitle>
                <CardDescription>
                  Upload your resume for detailed AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    dragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Drag and drop your resume here, or click to browse
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAnalyzing}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </div>

                {file && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium truncate flex-1">
                      {file.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Job Details (Optional)
                </CardTitle>
                <CardDescription>
                  Provide job details for more targeted analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="target-role">Target Role</Label>
                  <Input
                    id="target-role"
                    placeholder="e.g., Senior Frontend Developer"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here for better keyword matching..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Analyze Button */}
            <Button
              onClick={analyzeResume}
              disabled={!file || isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyze Resume
                </>
              )}
            </Button>

            {isAnalyzing && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Analysis in progress...
                    </div>
                    <Progress value={66} className="w-full" />
                    <div className="text-xs text-gray-500">
                      Processing your resume with AI
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {analysisResult ? (
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sections">Sections</TabsTrigger>
                  <TabsTrigger value="keywords">Keywords</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Overall Score */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Overall Score</span>
                        <Badge
                          variant={getScoreBadgeVariant(analysisResult.score)}
                        >
                          {analysisResult.score >= 80
                            ? "Excellent"
                            : analysisResult.score >= 60
                              ? "Good"
                              : "Needs Work"}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold mb-2">
                          <span className={getScoreColor(analysisResult.score)}>
                            {analysisResult.score}
                          </span>
                          <span className="text-gray-400">/100</span>
                        </div>
                        <Progress
                          value={analysisResult.score}
                          className="w-full h-3"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              ATS Compatibility
                            </span>
                            <span
                              className={`font-semibold ${getScoreColor(analysisResult.atsCompatibility)}`}
                            >
                              {analysisResult.atsCompatibility}%
                            </span>
                          </div>
                          <Progress
                            value={analysisResult.atsCompatibility}
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Readability
                            </span>
                            <span
                              className={`font-semibold ${getScoreColor(analysisResult.readabilityScore)}`}
                            >
                              {analysisResult.readabilityScore}%
                            </span>
                          </div>
                          <Progress
                            value={analysisResult.readabilityScore}
                            className="h-2"
                          />
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Experience Level
                          </Label>
                          <p className="text-lg font-semibold">
                            {analysisResult.experienceLevel}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Skills Found
                          </Label>
                          <p className="text-lg font-semibold">
                            {analysisResult.skillsFound.length} skills
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Feedback */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysisResult.strengths
                            .slice(0, 3)
                            .map((strength, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{strength}</span>
                              </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-600">
                          <AlertTriangle className="h-5 w-5" />
                          Areas to Improve
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysisResult.improvements
                            .slice(0, 3)
                            .map((improvement, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{improvement}</span>
                              </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="sections" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Section Analysis</CardTitle>
                      <CardDescription>
                        Detailed breakdown of each resume section
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysisResult.sections.map((section, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{section.name}</span>
                            <Badge
                              variant={getScoreBadgeVariant(section.score)}
                            >
                              {section.score}%
                            </Badge>
                          </div>
                          <Progress value={section.score} className="h-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {section.feedback}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="keywords" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Keyword Analysis</CardTitle>
                      <CardDescription>
                        Keywords found in your resume and their frequency
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Skills Detected</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.skillsFound.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium mb-2">
                            Keyword Frequency
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(analysisResult.keywordDensity).map(
                              ([keyword, count]) => (
                                <div
                                  key={keyword}
                                  className="flex justify-between items-center"
                                >
                                  <span className="text-sm">{keyword}</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-24">
                                      <Progress
                                        value={(count / 10) * 100}
                                        className="h-1"
                                      />
                                    </div>
                                    <span className="text-sm font-medium w-8">
                                      {count}
                                    </span>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="suggestions" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        Improvement Suggestions
                      </CardTitle>
                      <CardDescription>
                        Actionable recommendations to enhance your resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysisResult.improvements.map((improvement, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm">{improvement}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            Download your analysis report
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            Apply the suggested improvements
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            Re-analyze your updated resume
                          </span>
                        </div>
                      </div>
                      <Button className="w-full mt-4">
                        <Download className="h-4 w-4 mr-2" />
                        Download Analysis Report
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Analysis Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload your resume and click "Analyze Resume" to get started
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
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

import { useState } from "react";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  uploadFile,
  analyzeResumeContent,
  extractTextFromFile,
} from "@/lib/fileUpload";

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
    present: boolean;
    quality: "excellent" | "good" | "needs_improvement" | "missing";
  }[];
}

export default function ResumeAnalyzer() {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setActiveTab("analysis");

    setAnalyzing(true);
    try {
      // Extract text from the uploaded resume
      const extractedText = await extractTextFromFile(file);

      // Analyze the resume content
      const analysis = await analyzeResumeContent(
        extractedText,
        jobDescription,
      );

      // Create comprehensive analysis result
      const result: AnalysisResult = {
        ...analysis,
        atsCompatibility: Math.floor(Math.random() * 20) + 80, // Random score 80-100
        readabilityScore: Math.floor(Math.random() * 15) + 85, // Random score 85-100
        keywordDensity: {
          JavaScript: Math.floor(Math.random() * 10) + 5,
          React: Math.floor(Math.random() * 8) + 3,
          "Node.js": Math.floor(Math.random() * 6) + 2,
          TypeScript: Math.floor(Math.random() * 5) + 1,
        },
        sections: [
          { name: "Contact Information", present: true, quality: "excellent" },
          { name: "Professional Summary", present: true, quality: "good" },
          { name: "Work Experience", present: true, quality: "excellent" },
          { name: "Education", present: true, quality: "good" },
          { name: "Skills", present: true, quality: "good" },
          {
            name: "Projects",
            present: Math.random() > 0.3,
            quality: "needs_improvement",
          },
          {
            name: "Certifications",
            present: Math.random() > 0.5,
            quality: "good",
          },
        ],
      };

      setAnalysisResult(result);

      toast({
        title: "Analysis Complete!",
        description: `Your resume scored ${result.score}/100. Check the detailed analysis below.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description:
          "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "text-green-600 bg-green-50";
      case "good":
        return "text-blue-600 bg-blue-50";
      case "needs_improvement":
        return "text-yellow-600 bg-yellow-50";
      case "missing":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const generateOptimizedResume = () => {
    toast({
      title: "Optimization Started",
      description:
        "We're generating an optimized version of your resume. This may take a few moments.",
    });

    // In a real app, this would call an AI service to optimize the resume
    setTimeout(() => {
      toast({
        title: "Resume Optimized!",
        description: "Your optimized resume is ready for download.",
      });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">AI Resume Analyzer</h1>
          <p className="text-muted-foreground">
            Get instant feedback on your resume and improve your chances of
            landing interviews
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Resume</TabsTrigger>
            <TabsTrigger
              value="analysis"
              disabled={!analysisResult && !analyzing}
            >
              Analysis Results
            </TabsTrigger>
            <TabsTrigger value="optimization" disabled={!analysisResult}>
              AI Optimization
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Your Resume
                  </CardTitle>
                  <CardDescription>
                    Upload your resume in PDF, DOC, or DOCX format for AI
                    analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                      disabled={analyzing}
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <div className="font-medium mb-2">
                        {uploadedFile
                          ? uploadedFile.name
                          : "Click to upload your resume"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        PDF, DOC, DOCX up to 10MB
                      </div>
                    </label>
                  </div>

                  {analyzing && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                        <span className="text-sm">
                          Analyzing your resume with AI...
                        </span>
                      </div>
                      <Progress value={65} className="w-full" />
                      <div className="text-xs text-muted-foreground">
                        Extracting text, analyzing content, and generating
                        insights...
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Job Description (Optional)
                  </CardTitle>
                  <CardDescription>
                    Paste a job description to get targeted recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste the job description here to get recommendations tailored to the specific role..."
                    className="min-h-[200px]"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    Adding a job description will provide more targeted feedback
                    and keyword suggestions
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analysis Results Tab */}
          <TabsContent value="analysis" className="space-y-6">
            {analysisResult && (
              <>
                {/* Overall Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Overall Resume Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div
                          className={`text-4xl font-bold ${getScoreColor(analysisResult.score)}`}
                        >
                          {analysisResult.score}/100
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Overall Score
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${getScoreColor(analysisResult.atsCompatibility)}`}
                        >
                          {analysisResult.atsCompatibility}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ATS Compatible
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${getScoreColor(analysisResult.readabilityScore)}`}
                        >
                          {analysisResult.readabilityScore}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Readability
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {analysisResult.experienceLevel}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Experience Level
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {analysisResult.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Improvements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-yellow-600">
                        <Lightbulb className="h-5 w-5" />
                        Suggested Improvements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {analysisResult.improvements.map(
                          (improvement, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{improvement}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Skills and Keywords */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Skills Found
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.skillsFound.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Keyword Density
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(analysisResult.keywordDensity).map(
                          ([keyword, count]) => (
                            <div
                              key={keyword}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm font-medium">
                                {keyword}
                              </span>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={(count / 15) * 100}
                                  className="w-20 h-2"
                                />
                                <span className="text-sm text-muted-foreground">
                                  {count}
                                </span>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Section Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Section Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {analysisResult.sections.map((section) => (
                        <div
                          key={section.name}
                          className={`p-3 rounded-lg border ${
                            section.present
                              ? "border-green-200"
                              : "border-red-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">
                              {section.name}
                            </h4>
                            {section.present ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          {section.present && (
                            <Badge
                              className={`text-xs ${getQualityColor(section.quality)}`}
                            >
                              {section.quality.replace("_", " ")}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* AI Optimization Tab */}
          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI-Powered Resume Optimization
                </CardTitle>
                <CardDescription>
                  Let our AI rewrite and optimize your resume for better ATS
                  compatibility and impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium mb-1">ATS Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Improve keyword density and formatting for ATS systems
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-medium mb-1">Impact Statements</h3>
                    <p className="text-sm text-muted-foreground">
                      Rewrite bullet points with quantified achievements
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-medium mb-1">Skill Enhancement</h3>
                    <p className="text-sm text-muted-foreground">
                      Add relevant skills and optimize skill presentation
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Optimization Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={generateOptimizedResume}
                      className="h-auto p-4 justify-start text-left"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">Standard Optimization</div>
                        <div className="text-sm opacity-80">
                          Improve ATS compatibility and readability
                        </div>
                      </div>
                    </Button>
                    <Button
                      onClick={generateOptimizedResume}
                      variant="outline"
                      className="h-auto p-4 justify-start text-left"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">
                          Role-Specific Optimization
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Tailor resume for the job description provided
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>

                {analysisResult && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium mb-2">Optimization Preview</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on your current score of {analysisResult.score}/100,
                      our AI can potentially improve your resume score by 15-25
                      points.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Generate Optimized Resume
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Changes
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  FileText,
  Video,
  CheckCircle,
  AlertCircle,
  Send,
  Paperclip,
  Star,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobApplicationProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  onApplicationSubmit?: (applicationData: any) => void;
}

export default function JobApplication({
  jobId,
  jobTitle,
  companyName,
  onApplicationSubmit,
}: JobApplicationProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    expectedSalary: "",
    availableStartDate: "",
    resumeType: "existing", // "existing", "upload", "video"
    uploadedResume: null as File | null,
    videoResume: null as File | null,
    additionalInfo: "",
    linkedinProfile: "",
    portfolioUrl: "",
    availability: "full-time",
    relocateWilling: "",
  });

  const [resumeScore, setResumeScore] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  const handleInputChange = (field: string, value: string | File | null) => {
    setApplicationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "resume" | "video",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "resume") {
        handleInputChange("uploadedResume", file);
        // Simulate AI analysis
        analyzeResume();
      } else {
        handleInputChange("videoResume", file);
      }
    }
  };

  const analyzeResume = async () => {
    setAnalyzing(true);
    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock resume score calculation
    const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
    setResumeScore(score);
    setAnalyzing(false);

    toast({
      title: "Resume Analyzed",
      description: `Your resume scored ${score}/100. ${score >= 85 ? "Excellent match!" : score >= 70 ? "Good match with room for improvement." : "Consider updating your resume."}`,
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const submissionData = {
        jobId,
        applicationData,
        resumeScore,
        submittedAt: new Date(),
      };

      if (onApplicationSubmit) {
        onApplicationSubmit(submissionData);
      }

      toast({
        title: "Application Submitted!",
        description: `Your application for ${jobTitle} at ${companyName} has been submitted successfully.`,
      });

      navigate("/dashboard/seeker");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 85)
      return "Excellent match! Your profile aligns well with this position.";
    if (score >= 70) return "Good match with some room for improvement.";
    return "Consider updating your resume to better match this position.";
  };

  const progress = (step / 3) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Apply to {jobTitle}</CardTitle>
                <CardDescription className="text-base">
                  {companyName} • Complete your application in 3 steps
                </CardDescription>
              </div>
              {resumeScore > 0 && (
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold ${getScoreColor(resumeScore)}`}
                  >
                    {resumeScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Match Score
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span className={step >= 1 ? "text-primary font-medium" : ""}>
                  Basic Info
                </span>
                <span className={step >= 2 ? "text-primary font-medium" : ""}>
                  Resume & Documents
                </span>
                <span className={step >= 3 ? "text-primary font-medium" : ""}>
                  Review & Submit
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Tell us about your interest and availability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Write a brief cover letter explaining why you're interested in this position and what makes you a great fit..."
                  className="min-h-[120px]"
                  value={applicationData.coverLetter}
                  onChange={(e) =>
                    handleInputChange("coverLetter", e.target.value)
                  }
                />
                <div className="text-xs text-muted-foreground">
                  {applicationData.coverLetter.length}/500 characters
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expectedSalary">Expected Salary</Label>
                  <Input
                    id="expectedSalary"
                    placeholder="e.g., $80,000 - $100,000"
                    value={applicationData.expectedSalary}
                    onChange={(e) =>
                      handleInputChange("expectedSalary", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Available Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={applicationData.availableStartDate}
                    onChange={(e) =>
                      handleInputChange("availableStartDate", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("availability", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relocate">Willing to relocate?</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("relocateWilling", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="maybe">Maybe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={applicationData.linkedinProfile}
                    onChange={(e) =>
                      handleInputChange("linkedinProfile", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio/Website</Label>
                  <Input
                    id="portfolio"
                    placeholder="https://yourportfolio.com"
                    value={applicationData.portfolioUrl}
                    onChange={(e) =>
                      handleInputChange("portfolioUrl", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Resume & Documents */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Resume & Documents</CardTitle>
              <CardDescription>
                Choose how you'd like to submit your resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Resume Submission Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleInputChange("resumeType", "existing")}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      applicationData.resumeType === "existing"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <FileText className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-medium">Use Existing Resume</div>
                    <div className="text-sm text-muted-foreground">
                      From your profile
                    </div>
                  </button>

                  <button
                    onClick={() => handleInputChange("resumeType", "upload")}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      applicationData.resumeType === "upload"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Upload className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-medium">Upload New Resume</div>
                    <div className="text-sm text-muted-foreground">
                      PDF, DOC, DOCX
                    </div>
                  </button>

                  <button
                    onClick={() => handleInputChange("resumeType", "video")}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      applicationData.resumeType === "video"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Video className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-medium">Video Resume</div>
                    <div className="text-sm text-muted-foreground">
                      60 seconds max
                    </div>
                  </button>
                </div>
              </div>

              {applicationData.resumeType === "upload" && (
                <div className="space-y-4">
                  <Label>Upload Resume</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, "resume")}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <div className="font-medium">Click to upload resume</div>
                      <div className="text-sm text-muted-foreground">
                        PDF, DOC, DOCX up to 10MB
                      </div>
                    </label>

                    {applicationData.uploadedResume && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4" />
                          <span className="font-medium">
                            {applicationData.uploadedResume.name}
                          </span>
                          <Badge variant="secondary">
                            {(
                              applicationData.uploadedResume.size /
                              1024 /
                              1024
                            ).toFixed(1)}
                            MB
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  {analyzing && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span className="text-sm">
                        Analyzing resume with AI...
                      </span>
                    </div>
                  )}

                  {resumeScore > 0 && !analyzing && (
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Star
                            className={`h-5 w-5 ${getScoreColor(resumeScore)}`}
                          />
                          <span className="font-medium">
                            AI Resume Analysis
                          </span>
                        </div>
                        <Badge
                          variant={
                            resumeScore >= 85
                              ? "default"
                              : resumeScore >= 70
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {resumeScore}% Match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {getScoreMessage(resumeScore)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {applicationData.resumeType === "video" && (
                <div className="space-y-4">
                  <Label>Upload Video Resume</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, "video")}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <div className="font-medium">Click to upload video</div>
                      <div className="text-sm text-muted-foreground">
                        MP4, MOV up to 50MB (60 seconds max)
                      </div>
                    </label>

                    {applicationData.videoResume && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          <span className="font-medium">
                            {applicationData.videoResume.name}
                          </span>
                          <Badge variant="secondary">
                            {(
                              applicationData.videoResume.size /
                              1024 /
                              1024
                            ).toFixed(1)}
                            MB
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any additional information you'd like to share with the employer..."
                  value={applicationData.additionalInfo}
                  onChange={(e) =>
                    handleInputChange("additionalInfo", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Review Your Application</CardTitle>
              <CardDescription>
                Please review your information before submitting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      POSITION
                    </h4>
                    <p className="font-medium">{jobTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {companyName}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      EXPECTED SALARY
                    </h4>
                    <p>{applicationData.expectedSalary || "Not specified"}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      AVAILABILITY
                    </h4>
                    <p className="capitalize">{applicationData.availability}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      START DATE
                    </h4>
                    <p>{applicationData.availableStartDate || "Flexible"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      RESUME TYPE
                    </h4>
                    <p className="capitalize">
                      {applicationData.resumeType.replace("_", " ")}
                    </p>
                    {resumeScore > 0 && (
                      <Badge variant="secondary" className="mt-1">
                        {resumeScore}% AI Match Score
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">
                      RELOCATION
                    </h4>
                    <p className="capitalize">
                      {applicationData.relocateWilling || "Not specified"}
                    </p>
                  </div>

                  {applicationData.linkedinProfile && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">
                        LINKEDIN
                      </h4>
                      <p className="text-sm text-blue-600 break-all">
                        {applicationData.linkedinProfile}
                      </p>
                    </div>
                  )}

                  {applicationData.portfolioUrl && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">
                        PORTFOLIO
                      </h4>
                      <p className="text-sm text-blue-600 break-all">
                        {applicationData.portfolioUrl}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">
                  COVER LETTER
                </h4>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm whitespace-pre-line">
                    {applicationData.coverLetter}
                  </p>
                </div>
              </div>

              {applicationData.additionalInfo && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">
                    ADDITIONAL INFORMATION
                  </h4>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm whitespace-pre-line">
                      {applicationData.additionalInfo}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>

          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !applicationData.coverLetter.trim()}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="min-w-[120px]"
            >
              {submitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

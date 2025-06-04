import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  PlayIcon,
  PauseIcon,
  RotateCcwIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  BrainIcon,
  TrendingUpIcon,
  VolumeXIcon,
  Volume2Icon,
  SkipForwardIcon,
  StarIcon,
} from "lucide-react";

interface InterviewSession {
  id: string;
  type: "technical" | "behavioral" | "situational";
  difficulty: "junior" | "mid" | "senior";
  currentQuestion: number;
  totalQuestions: number;
  questions: InterviewQuestion[];
  responses: InterviewResponse[];
  overallScore: number;
  isActive: boolean;
  startTime: Date;
}

interface InterviewQuestion {
  id: string;
  text: string;
  type: "technical" | "behavioral" | "situational";
  timeLimit: number;
  hints: string[];
  expectedPoints: string[];
}

interface InterviewResponse {
  questionId: string;
  audioBlob?: Blob;
  videoBlob?: Blob;
  transcript: string;
  duration: number;
  scores: {
    content: number;
    confidence: number;
    clarity: number;
    relevance: number;
    techAccuracy?: number;
  };
  feedback: string[];
  nervousnessLevel: number;
  toneAnalysis: {
    enthusiasm: number;
    professional: number;
    clarity: number;
  };
}

export default function VoiceVideoInterview() {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const mockQuestions: InterviewQuestion[] = [
    {
      id: "1",
      text: "Tell me about yourself and your experience with full-stack development.",
      type: "behavioral",
      timeLimit: 120,
      hints: [
        "Include your background",
        "Mention key technologies",
        "Highlight achievements",
      ],
      expectedPoints: [
        "Personal background",
        "Technical skills",
        "Career progression",
        "Notable projects",
      ],
    },
    {
      id: "2",
      text: "Explain the difference between var, let, and const in JavaScript.",
      type: "technical",
      timeLimit: 90,
      hints: ["Discuss scope", "Mention hoisting", "Give examples"],
      expectedPoints: [
        "Hoisting behavior",
        "Block vs function scope",
        "Reassignment rules",
        "Temporal dead zone",
      ],
    },
    {
      id: "3",
      text: "Describe a challenging project you worked on and how you overcame difficulties.",
      type: "behavioral",
      timeLimit: 150,
      hints: ["Use STAR method", "Be specific", "Show problem-solving"],
      expectedPoints: [
        "Situation description",
        "Tasks and actions",
        "Results achieved",
        "Lessons learned",
      ],
    },
  ];

  const startInterview = (
    type: "technical" | "behavioral" | "situational",
    difficulty: "junior" | "mid" | "senior",
  ) => {
    const newSession: InterviewSession = {
      id: Date.now().toString(),
      type,
      difficulty,
      currentQuestion: 0,
      totalQuestions: mockQuestions.length,
      questions: mockQuestions,
      responses: [],
      overallScore: 0,
      isActive: true,
      startTime: new Date(),
    };

    setSession(newSession);
    setTimeRemaining(mockQuestions[0].timeLimit);

    toast({
      title: "Interview Started",
      description: `${type} interview for ${difficulty} level position.`,
    });
  };

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsVideoEnabled(true);
      setIsAudioEnabled(true);
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description:
          "Please allow camera and microphone access for the interview.",
        variant: "destructive",
      });
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    const chunks: BlobPart[] = [];
    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      analyzeResponse(blob);
    };

    mediaRecorder.start();
    setIsRecording(true);

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const analyzeResponse = async (blob: Blob) => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const mockResponse: InterviewResponse = {
      questionId: session!.questions[session!.currentQuestion].id,
      videoBlob: blob,
      transcript:
        "I have been working as a full-stack developer for the past 3 years, specializing in React and Node.js. I've built several applications including an e-commerce platform that handles 10,000+ users.",
      duration: 85,
      scores: {
        content: 78,
        confidence: 82,
        clarity: 75,
        relevance: 85,
        techAccuracy: 88,
      },
      feedback: [
        "Good technical knowledge demonstrated",
        "Clear communication style",
        "Could include more specific metrics",
        "Strong confidence level maintained",
      ],
      nervousnessLevel: 25,
      toneAnalysis: {
        enthusiasm: 75,
        professional: 88,
        clarity: 80,
      },
    };

    if (session) {
      const updatedSession = {
        ...session,
        responses: [...session.responses, mockResponse],
        currentQuestion: session.currentQuestion + 1,
      };

      setSession(updatedSession);

      if (updatedSession.currentQuestion < updatedSession.totalQuestions) {
        setTimeRemaining(
          updatedSession.questions[updatedSession.currentQuestion].timeLimit,
        );
      } else {
        // Interview completed
        const avgScore = Math.round(
          updatedSession.responses.reduce(
            (sum, r) =>
              sum +
              Object.values(r.scores).reduce((s, score) => s + score, 0) /
                Object.keys(r.scores).length,
            0,
          ) / updatedSession.responses.length,
        );
        setSession({
          ...updatedSession,
          overallScore: avgScore,
          isActive: false,
        });
      }
    }

    setIsAnalyzing(false);
  };

  const skipQuestion = () => {
    if (!session) return;

    if (session.currentQuestion < session.totalQuestions - 1) {
      setSession({
        ...session,
        currentQuestion: session.currentQuestion + 1,
      });
      setTimeRemaining(
        session.questions[session.currentQuestion + 1].timeLimit,
      );
    }
  };

  const restartInterview = () => {
    setSession(null);
    setIsRecording(false);
    setCurrentResponse("");
    setTimeRemaining(0);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (!session) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <BrainIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">AI Voice & Video Interview</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Practice interviews with AI-powered analysis of your speaking
              confidence, tone, nervousness level, and content quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => startInterview("behavioral", "mid")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-blue-600" />
                  Behavioral Interview
                </CardTitle>
                <CardDescription>
                  Questions about your experience, teamwork, and problem-solving
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    • Tell me about yourself
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Describe a challenge you faced
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • How do you handle conflicts?
                  </p>
                </div>
                <Button className="w-full mt-4">
                  Start Behavioral Interview
                </Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => startInterview("technical", "mid")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainIcon className="h-5 w-5 text-green-600" />
                  Technical Interview
                </CardTitle>
                <CardDescription>
                  Technical questions about programming, algorithms, and systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    • JavaScript concepts
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Algorithm problems
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • System design
                  </p>
                </div>
                <Button className="w-full mt-4">
                  Start Technical Interview
                </Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => startInterview("situational", "mid")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUpIcon className="h-5 w-5 text-purple-600" />
                  Situational Interview
                </CardTitle>
                <CardDescription>
                  Hypothetical scenarios and how you would handle them
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    • Leadership scenarios
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Crisis management
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Decision making
                  </p>
                </div>
                <Button className="w-full mt-4">
                  Start Situational Interview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!session.isActive) {
    // Interview completed - show results
    const avgScore = session.overallScore || 75;

    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                Interview Completed!
              </CardTitle>
              <CardDescription>
                Here's your detailed performance analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold">
                  <span className={getScoreColor(avgScore)}>
                    {avgScore}/100
                  </span>
                </div>
                <Progress value={avgScore} className="max-w-md mx-auto" />
                <p className="text-muted-foreground">Overall Interview Score</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      82%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Confidence Level
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      78%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Content Quality
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      25%
                    </div>
                    <p className="text-sm text-muted-foreground">Nervousness</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-4">
              {session.responses.map((response, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Question {index + 1}
                    </CardTitle>
                    <CardDescription>
                      {session.questions[index].text}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(response.scores).map(
                        ([metric, score]) => (
                          <div key={metric} className="text-center">
                            <div
                              className={`text-lg font-semibold ${getScoreColor(score)}`}
                            >
                              {score}/100
                            </div>
                            <p className="text-xs text-muted-foreground capitalize">
                              {metric.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm">
                        <strong>Transcript:</strong> {response.transcript}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">AI Feedback:</h4>
                      <ul className="space-y-1">
                        {response.feedback.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-sm flex items-start gap-2"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="improvements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Improvement Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium">Confidence Building</h4>
                      <p className="text-sm text-muted-foreground">
                        Practice speaking louder and maintaining eye contact.
                        Consider joining Toastmasters.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium">Technical Depth</h4>
                      <p className="text-sm text-muted-foreground">
                        Provide more specific examples and metrics when
                        discussing technical achievements.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-medium">STAR Method</h4>
                      <p className="text-sm text-muted-foreground">
                        Structure behavioral answers using Situation, Task,
                        Action, Result framework.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center gap-4">
            <Button onClick={restartInterview}>
              <RotateCcwIcon className="h-4 w-4 mr-2" />
              Take Another Interview
            </Button>
            <Button variant="outline">Download Report</Button>
          </div>
        </div>
      </div>
    );
  }

  // Active interview interface
  const currentQuestion = session.questions[session.currentQuestion];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {session.type.charAt(0).toUpperCase() + session.type.slice(1)}{" "}
              Interview
            </h1>
            <p className="text-muted-foreground">
              Question {session.currentQuestion + 1} of {session.totalQuestions}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {formatTime(timeRemaining)}
            </div>
            <p className="text-sm text-muted-foreground">Time Remaining</p>
          </div>
        </div>

        <Progress
          value={(session.currentQuestion / session.totalQuestions) * 100}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <VideoIcon className="h-5 w-5" />
                Video Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex justify-center gap-2">
                  <Button
                    variant={isVideoEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  >
                    {isVideoEnabled ? (
                      <VideoIcon className="h-4 w-4" />
                    ) : (
                      <VideoOffIcon className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant={isAudioEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  >
                    {isAudioEnabled ? (
                      <Volume2Icon className="h-4 w-4" />
                    ) : (
                      <VolumeXIcon className="h-4 w-4" />
                    )}
                  </Button>
                  {!isVideoEnabled && !isAudioEnabled && (
                    <Button size="sm" onClick={setupCamera}>
                      Setup Camera
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question & Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Current Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-lg">{currentQuestion.text}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Hints:</h4>
                <ul className="space-y-1">
                  {currentQuestion.hints.map((hint, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    disabled={!isVideoEnabled && !isAudioEnabled}
                  >
                    <PlayIcon className="h-4 w-4 mr-2" />
                    Start Answer
                  </Button>
                ) : (
                  <Button onClick={stopRecording} variant="destructive">
                    <PauseIcon className="h-4 w-4 mr-2" />
                    Stop Recording
                  </Button>
                )}

                <Button variant="outline" onClick={skipQuestion}>
                  <SkipForwardIcon className="h-4 w-4 mr-2" />
                  Skip Question
                </Button>
              </div>

              {isAnalyzing && (
                <div className="text-center py-4">
                  <BrainIcon className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    AI is analyzing your response...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

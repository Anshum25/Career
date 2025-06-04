import { useState, useRef, useEffect } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BotIcon,
  UserIcon,
  SendIcon,
  MicIcon,
  StopCircleIcon,
  PlayIcon,
  RefreshCwIcon,
  BookIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  BrainIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  questionType?:
    | "behavioral"
    | "technical"
    | "situational"
    | "company"
    | "general";
  rating?: number;
  feedback?: string;
}

interface InterviewSession {
  id: string;
  jobTitle: string;
  company: string;
  duration: number;
  questionsAsked: number;
  score: number;
  startedAt: Date;
  completedAt?: Date;
}

export default function InterviewPrepBot() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [interviewType, setInterviewType] = useState<
    "behavioral" | "technical" | "mixed"
  >("mixed");
  const [difficulty, setDifficulty] = useState<
    "beginner" | "intermediate" | "advanced"
  >("intermediate");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(
    null,
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample questions database
  const questionDatabase = {
    behavioral: [
      "Tell me about a time when you faced a difficult challenge at work and how you overcame it.",
      "Describe a situation where you had to work with a difficult team member.",
      "Can you give me an example of a time you showed leadership?",
      "Tell me about a time you failed and what you learned from it.",
      "Describe a situation where you had to adapt to significant changes at work.",
    ],
    technical: [
      "How would you optimize a slow-performing database query?",
      "Explain the difference between REST and GraphQL APIs.",
      "How do you handle state management in a React application?",
      "What are the key principles of object-oriented programming?",
      "How would you design a scalable system for handling millions of users?",
    ],
    situational: [
      "How would you handle a situation where you disagree with your manager's decision?",
      "What would you do if you discovered a security vulnerability in production?",
      "How would you prioritize your tasks when everything seems urgent?",
      "What would you do if a project deadline was moved up by two weeks?",
      "How would you approach learning a new technology that's critical for your role?",
    ],
    company: [
      "Why do you want to work at our company?",
      "What do you know about our company culture?",
      "How do you see yourself contributing to our team?",
      "What attracts you to this specific role?",
      "Where do you see yourself in 5 years at our company?",
    ],
  };

  const startInterview = () => {
    if (!selectedJobTitle.trim()) {
      toast({
        title: "Job Title Required",
        description: "Please enter the job title you're preparing for.",
        variant: "destructive",
      });
      return;
    }

    const session: InterviewSession = {
      id: Date.now().toString(),
      jobTitle: selectedJobTitle,
      company: selectedCompany || "Generic Company",
      duration: 0,
      questionsAsked: 0,
      score: 0,
      startedAt: new Date(),
    };

    setCurrentSession(session);
    setSessionStarted(true);

    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      content: `Welcome to your interview preparation session for the ${selectedJobTitle} position${selectedCompany ? ` at ${selectedCompany}` : ""}! I'm your AI interviewer. Let's start with some questions to help you practice. Are you ready to begin?`,
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);

    // Ask first question after a brief delay
    setTimeout(() => {
      askNextQuestion();
    }, 2000);
  };

  const askNextQuestion = () => {
    setIsTyping(true);

    setTimeout(
      () => {
        let questionType: keyof typeof questionDatabase;

        if (interviewType === "behavioral") {
          questionType = Math.random() > 0.7 ? "company" : "behavioral";
        } else if (interviewType === "technical") {
          questionType = Math.random() > 0.7 ? "situational" : "technical";
        } else {
          const types: (keyof typeof questionDatabase)[] = [
            "behavioral",
            "technical",
            "situational",
            "company",
          ];
          questionType = types[Math.floor(Math.random() * types.length)];
        }

        const questions = questionDatabase[questionType];
        const randomQuestion =
          questions[Math.floor(Math.random() * questions.length)];

        const questionMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content: randomQuestion,
          timestamp: new Date(),
          questionType,
        };

        setMessages((prev) => [...prev, questionMessage]);
        setIsTyping(false);

        if (currentSession) {
          setCurrentSession((prev) =>
            prev
              ? {
                  ...prev,
                  questionsAsked: prev.questionsAsked + 1,
                }
              : null,
          );
        }
      },
      1000 + Math.random() * 2000,
    ); // Random delay 1-3 seconds
  };

  const simulateResponse = (userAnswer: string) => {
    setIsTyping(true);

    setTimeout(
      () => {
        // Simple AI feedback simulation
        const responses = [
          "Great answer! I particularly liked how you structured your response using the STAR method. Let's move on to the next question.",
          "Good response. You could strengthen this by providing more specific metrics or outcomes. Here's another question for you:",
          "Excellent example! Your communication skills really come through. Let's continue with:",
          "Nice work. Consider adding more details about the impact of your actions next time. Moving on:",
          "Solid answer. I can see you have good problem-solving skills. Here's your next challenge:",
        ];

        const feedback =
          responses[Math.floor(Math.random() * responses.length)];
        const rating = Math.floor(Math.random() * 3) + 3; // Random rating 3-5

        const feedbackMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content: feedback,
          timestamp: new Date(),
          rating,
          feedback: feedback.split(".")[0], // First sentence as feedback
        };

        setMessages((prev) => [...prev, feedbackMessage]);
        setIsTyping(false);

        // Ask next question after feedback
        setTimeout(() => {
          if (currentSession && currentSession.questionsAsked < 10) {
            askNextQuestion();
          } else {
            endSession();
          }
        }, 3000);
      },
      2000 + Math.random() * 2000,
    ); // Random delay 2-4 seconds
  };

  const endSession = () => {
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        completedAt: new Date(),
        duration: Math.floor(
          (Date.now() - currentSession.startedAt.getTime()) / 1000,
        ),
        score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
      };

      const summaryMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: `Great job! You've completed your interview practice session. You answered ${completedSession.questionsAsked} questions with an overall performance score of ${completedSession.score}/100. Here are some key takeaways:\n\n• Focus on providing specific examples with measurable outcomes\n• Use the STAR method (Situation, Task, Action, Result) for behavioral questions\n• Practice explaining technical concepts in simple terms\n• Research the company culture and values more deeply\n\nWould you like to start another practice session?`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, summaryMessage]);
      setCurrentSession(completedSession);

      toast({
        title: "Session Complete!",
        description: `You scored ${completedSession.score}/100. Great practice session!`,
      });
    }
  };

  const handleSendMessage = () => {
    if (!input.trim() || !sessionStarted) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    simulateResponse(input.trim());
  };

  const resetSession = () => {
    setMessages([]);
    setSessionStarted(false);
    setCurrentSession(null);
    setInput("");
    setIsTyping(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Recording Stopped",
        description: "Voice input feature coming soon!",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description:
          "Speak your answer clearly. This feature is simulated for demo purposes.",
      });

      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        setInput("This would be your transcribed voice response...");
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainIcon className="h-5 w-5" />
              Interview Setup
            </CardTitle>
            <CardDescription>Configure your practice session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title *</label>
              <Input
                placeholder="e.g., Senior Software Engineer"
                value={selectedJobTitle}
                onChange={(e) => setSelectedJobTitle(e.target.value)}
                disabled={sessionStarted}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company (Optional)</label>
              <Input
                placeholder="e.g., Google, Microsoft"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                disabled={sessionStarted}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Type</label>
              <Select
                value={interviewType}
                onValueChange={(value) => setInterviewType(value as any)}
                disabled={sessionStarted}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mixed">Mixed Questions</SelectItem>
                  <SelectItem value="behavioral">Behavioral Focus</SelectItem>
                  <SelectItem value="technical">Technical Focus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty Level</label>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as any)}
                disabled={sessionStarted}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!sessionStarted ? (
              <Button onClick={startInterview} className="w-full">
                <PlayIcon className="h-4 w-4 mr-2" />
                Start Interview
              </Button>
            ) : (
              <Button
                onClick={resetSession}
                variant="outline"
                className="w-full"
              >
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                New Session
              </Button>
            )}

            {currentSession && (
              <div className="space-y-2 pt-4 border-t">
                <div className="text-sm font-medium">Session Stats</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Questions: {currentSession.questionsAsked}/10</div>
                  <div>
                    Duration:{" "}
                    {Math.floor(
                      (Date.now() - currentSession.startedAt.getTime()) /
                        1000 /
                        60,
                    )}
                    m
                  </div>
                  {currentSession.completedAt && (
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-3 w-3" />
                      Score: {currentSession.score}/100
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BotIcon className="h-5 w-5" />
              AI Interview Practice
            </CardTitle>
            <CardDescription>
              Practice with our AI interviewer and get real-time feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <ScrollArea className="h-96 p-4">
              {messages.length === 0 && !sessionStarted ? (
                <div className="text-center py-8">
                  <BotIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Ready to Practice?
                  </h3>
                  <p className="text-muted-foreground">
                    Set up your interview preferences and start practicing with
                    our AI interviewer
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.type === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        {message.type === "bot" ? (
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <BotIcon className="h-4 w-4" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-blue-500 text-white">
                            <UserIcon className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div
                        className={`flex-1 space-y-2 ${message.type === "user" ? "text-right" : ""}`}
                      >
                        <div
                          className={`p-3 rounded-lg ${
                            message.type === "user"
                              ? "bg-blue-500 text-white ml-auto max-w-[80%]"
                              : "bg-muted max-w-[90%]"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">
                            {message.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.questionType && (
                            <Badge variant="outline" className="text-xs">
                              {message.questionType}
                            </Badge>
                          )}
                          {message.rating && (
                            <div className="flex items-center gap-1">
                              <StarIcon className="h-3 w-3 fill-current text-yellow-500" />
                              <span>{message.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <BotIcon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            {sessionStarted && (
              <>
                <Separator />
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type your answer here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        disabled={isTyping}
                      />
                    </div>
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      onClick={toggleRecording}
                      disabled={isTyping}
                    >
                      {isRecording ? (
                        <StopCircleIcon className="h-4 w-4" />
                      ) : (
                        <MicIcon className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isTyping}
                      size="sm"
                    >
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    💡 Tip: Use the STAR method (Situation, Task, Action,
                    Result) for behavioral questions
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

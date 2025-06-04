import React, { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  BrainIcon,
  UserIcon,
  StarIcon,
  TrendingUpIcon,
  TargetIcon,
  LightbulbIcon,
  HeartIcon,
  ZapIcon,
  ShieldIcon,
  GlobeIcon,
  PieChartIcon,
  RefreshCwIcon,
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: Array<{
    text: string;
    traits: Record<string, number>;
  }>;
}

interface PersonalityResult {
  type: string;
  title: string;
  description: string;
  traits: Record<string, number>;
  careerMatches: CareerMatch[];
  strengths: string[];
  workStyle: string[];
  teamRole: string;
  motivators: string[];
  stressors: string[];
  developmentAreas: string[];
}

interface CareerMatch {
  title: string;
  match: number;
  description: string;
  salaryRange: string;
  growth: string;
  keySkills: string[];
  workEnvironment: string;
}

export default function PersonalityCareerTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const questions: Question[] = [
    {
      id: "1",
      text: "How do you prefer to work on projects?",
      options: [
        {
          text: "I like to plan everything in detail before starting",
          traits: { structure: 3, planning: 2, detail: 2 },
        },
        {
          text: "I prefer to dive in and figure things out as I go",
          traits: { flexibility: 3, spontaneity: 2, adaptability: 2 },
        },
        {
          text: "I like to have a general plan but stay flexible",
          traits: { balance: 2, adaptability: 1, planning: 1 },
        },
        {
          text: "I work best with clear deadlines and milestones",
          traits: { structure: 2, results: 2, organization: 2 },
        },
      ],
    },
    {
      id: "2",
      text: "In team meetings, you typically:",
      options: [
        {
          text: "Speak up early and often with ideas",
          traits: { extraversion: 3, leadership: 2, communication: 2 },
        },
        {
          text: "Listen first, then contribute thoughtfully",
          traits: { introversion: 2, analysis: 2, reflection: 2 },
        },
        {
          text: "Focus on the practical aspects and next steps",
          traits: { action: 3, pragmatism: 2, results: 1 },
        },
        {
          text: "Ask questions to understand different perspectives",
          traits: { curiosity: 2, empathy: 2, collaboration: 2 },
        },
      ],
    },
    {
      id: "3",
      text: "What motivates you most at work?",
      options: [
        {
          text: "Solving complex problems and learning new things",
          traits: { learning: 3, problemSolving: 3, curiosity: 2 },
        },
        {
          text: "Helping others and making a positive impact",
          traits: { empathy: 3, service: 3, relationships: 2 },
        },
        {
          text: "Achieving goals and being recognized for results",
          traits: { achievement: 3, recognition: 2, results: 2 },
        },
        {
          text: "Having autonomy and creative freedom",
          traits: { independence: 3, creativity: 3, flexibility: 2 },
        },
      ],
    },
    {
      id: "4",
      text: "How do you handle stress and pressure?",
      options: [
        {
          text: "I stay calm and focus on finding solutions",
          traits: { resilience: 3, problemSolving: 2, stability: 2 },
        },
        {
          text: "I work harder and put in extra hours",
          traits: { persistence: 3, dedication: 2, workEthic: 2 },
        },
        {
          text: "I step back to gain perspective and recharge",
          traits: { reflection: 2, selfCare: 2, wisdom: 2 },
        },
        {
          text: "I seek support from colleagues or mentors",
          traits: { collaboration: 2, communication: 2, relationships: 2 },
        },
      ],
    },
    {
      id: "5",
      text: "What type of work environment energizes you?",
      options: [
        {
          text: "Fast-paced, dynamic, with lots of variety",
          traits: { energy: 3, adaptability: 2, variety: 2 },
        },
        {
          text: "Quiet, focused, with minimal distractions",
          traits: { concentration: 3, detail: 2, depth: 2 },
        },
        {
          text: "Collaborative, social, with team interaction",
          traits: { collaboration: 3, extraversion: 2, teamwork: 2 },
        },
        {
          text: "Structured, organized, with clear processes",
          traits: { structure: 3, organization: 2, predictability: 2 },
        },
      ],
    },
    {
      id: "6",
      text: "When making decisions, you rely most on:",
      options: [
        {
          text: "Data, facts, and logical analysis",
          traits: { analysis: 3, logic: 3, objectivity: 2 },
        },
        {
          text: "Intuition and gut feelings",
          traits: { intuition: 3, creativity: 2, insight: 2 },
        },
        {
          text: "Past experience and proven methods",
          traits: { experience: 2, tradition: 2, reliability: 2 },
        },
        {
          text: "Input from others and consensus building",
          traits: { collaboration: 2, empathy: 2, democracy: 2 },
        },
      ],
    },
    {
      id: "7",
      text: "What describes your communication style?",
      options: [
        {
          text: "Direct, clear, and to the point",
          traits: { directness: 3, clarity: 2, efficiency: 2 },
        },
        {
          text: "Warm, supportive, and encouraging",
          traits: { empathy: 3, support: 2, positivity: 2 },
        },
        {
          text: "Detailed, thorough, and precise",
          traits: { detail: 3, precision: 2, thoroughness: 2 },
        },
        {
          text: "Inspiring, enthusiastic, and motivating",
          traits: { inspiration: 3, enthusiasm: 2, leadership: 2 },
        },
      ],
    },
    {
      id: "8",
      text: "How do you approach learning new skills?",
      options: [
        {
          text: "I prefer hands-on practice and experimentation",
          traits: { experiential: 3, practical: 2, action: 2 },
        },
        {
          text: "I like to study theory first, then apply it",
          traits: { theoretical: 2, planning: 2, depth: 2 },
        },
        {
          text: "I learn best through discussion and collaboration",
          traits: { social: 2, collaboration: 2, communication: 2 },
        },
        {
          text: "I prefer structured courses and formal training",
          traits: { structure: 2, formal: 2, organization: 2 },
        },
      ],
    },
  ];

  const calculatePersonality = () => {
    const traits: Record<string, number> = {};

    // Aggregate trait scores from all answers
    Object.values(answers).forEach((answerId, questionIndex) => {
      const question = questions[questionIndex];
      const selectedOption = question.options[parseInt(answerId)];

      Object.entries(selectedOption.traits).forEach(([trait, score]) => {
        traits[trait] = (traits[trait] || 0) + score;
      });
    });

    // Determine dominant traits and personality type
    const sortedTraits = Object.entries(traits).sort(([, a], [, b]) => b - a);
    const topTraits = sortedTraits.slice(0, 5);

    // Mock personality analysis based on top traits
    const personalityTypes = {
      "Creative Innovator": {
        title: "The Creative Innovator",
        description:
          "You thrive on creativity, innovation, and finding new solutions. You're naturally curious and enjoy exploring possibilities.",
        careerMatches: [
          {
            title: "UX/UI Designer",
            match: 92,
            description: "Perfect blend of creativity and problem-solving",
            salaryRange: "₹6-18 LPA",
            growth: "High demand",
            keySkills: ["Design Thinking", "Prototyping", "User Research"],
            workEnvironment: "Creative, collaborative teams",
          },
          {
            title: "Product Manager",
            match: 87,
            description: "Innovate and guide product development",
            salaryRange: "₹12-35 LPA",
            growth: "Excellent growth",
            keySkills: ["Strategy", "Analysis", "Communication"],
            workEnvironment: "Cross-functional leadership",
          },
          {
            title: "Software Architect",
            match: 84,
            description: "Design and innovate technical solutions",
            salaryRange: "₹18-45 LPA",
            growth: "Senior technical path",
            keySkills: ["System Design", "Leadership", "Innovation"],
            workEnvironment: "Technical leadership",
          },
        ],
        strengths: [
          "Creative problem solving",
          "Innovation",
          "Adaptability",
          "Vision",
        ],
        workStyle: [
          "Flexible schedules",
          "Autonomous work",
          "Creative freedom",
          "Variety in tasks",
        ],
        teamRole: "The Innovator - brings fresh ideas and creative solutions",
        motivators: [
          "Creative challenges",
          "Learning opportunities",
          "Making impact",
          "Recognition",
        ],
        stressors: [
          "Rigid processes",
          "Micromanagement",
          "Repetitive tasks",
          "Lack of autonomy",
        ],
        developmentAreas: [
          "Attention to detail",
          "Following through",
          "Structure",
          "Documentation",
        ],
      },
      "Analytical Thinker": {
        title: "The Analytical Thinker",
        description:
          "You excel at breaking down complex problems, analyzing data, and making logical decisions based on facts.",
        careerMatches: [
          {
            title: "Data Scientist",
            match: 94,
            description:
              "Perfect fit for analytical and problem-solving skills",
            salaryRange: "₹8-25 LPA",
            growth: "Very high demand",
            keySkills: ["Python/R", "Statistics", "Machine Learning"],
            workEnvironment: "Research-focused, analytical",
          },
          {
            title: "Software Engineer",
            match: 89,
            description: "Logical thinking and problem-solving focus",
            salaryRange: "₹6-22 LPA",
            growth: "Stable, high demand",
            keySkills: ["Programming", "Algorithms", "System Design"],
            workEnvironment: "Technical, detail-oriented",
          },
          {
            title: "Business Analyst",
            match: 86,
            description: "Bridge between business and technology",
            salaryRange: "₹5-18 LPA",
            growth: "Good growth potential",
            keySkills: ["Analysis", "Communication", "Process Improvement"],
            workEnvironment: "Business-focused, analytical",
          },
        ],
        strengths: [
          "Logical reasoning",
          "Problem solving",
          "Attention to detail",
          "Critical thinking",
        ],
        workStyle: [
          "Quiet workspace",
          "Deep focus time",
          "Clear requirements",
          "Logical processes",
        ],
        teamRole: "The Analyzer - provides data-driven insights and solutions",
        motivators: [
          "Complex challenges",
          "Learning new technologies",
          "Optimization",
          "Precision",
        ],
        stressors: [
          "Ambiguous requirements",
          "Rushed decisions",
          "Constant interruptions",
          "Unclear goals",
        ],
        developmentAreas: [
          "Communication skills",
          "Presentation skills",
          "Leadership",
          "Business acumen",
        ],
      },
      "People Leader": {
        title: "The People Leader",
        description:
          "You're naturally drawn to helping others succeed, building relationships, and creating positive team dynamics.",
        careerMatches: [
          {
            title: "Engineering Manager",
            match: 91,
            description: "Lead and develop technical teams",
            salaryRange: "₹15-40 LPA",
            growth: "Leadership track",
            keySkills: ["Leadership", "Technical Knowledge", "Communication"],
            workEnvironment: "Team-focused, collaborative",
          },
          {
            title: "HR Business Partner",
            match: 88,
            description: "Strategic HR role with business impact",
            salaryRange: "₹8-22 LPA",
            growth: "Good growth in HR",
            keySkills: ["People Management", "Strategy", "Communication"],
            workEnvironment: "People-focused, strategic",
          },
          {
            title: "Scrum Master",
            match: 85,
            description: "Facilitate team success and agile processes",
            salaryRange: "₹7-18 LPA",
            growth: "Agile leadership path",
            keySkills: ["Facilitation", "Agile", "Team Dynamics"],
            workEnvironment: "Team facilitation, collaborative",
          },
        ],
        strengths: ["Leadership", "Communication", "Empathy", "Team building"],
        workStyle: [
          "Collaborative environment",
          "People interaction",
          "Mentoring others",
          "Team meetings",
        ],
        teamRole: "The Leader - guides and motivates the team toward success",
        motivators: [
          "Helping others grow",
          "Team success",
          "Recognition",
          "Making impact",
        ],
        stressors: [
          "Conflict",
          "Isolation",
          "Lack of team interaction",
          "Unclear expectations",
        ],
        developmentAreas: [
          "Technical skills",
          "Data analysis",
          "Strategic thinking",
          "Delegation",
        ],
      },
    };

    // Simple algorithm to determine personality type based on top traits
    let personalityType = "Analytical Thinker"; // default

    if (traits.creativity > 10 || traits.innovation > 8) {
      personalityType = "Creative Innovator";
    } else if (traits.leadership > 8 || traits.empathy > 10) {
      personalityType = "People Leader";
    }

    return {
      type: personalityType,
      ...personalityTypes[personalityType as keyof typeof personalityTypes],
      traits,
    };
  };

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      completeTest();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const completeTest = async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const personalityResult = calculatePersonality();
    setResult(personalityResult);
    setIsCompleted(true);
    setIsAnalyzing(false);

    toast({
      title: "Assessment Complete!",
      description: "Your personality profile and career matches are ready.",
    });
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setResult(null);
  };

  if (isAnalyzing) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="p-12 text-center">
            <BrainIcon className="h-16 w-16 text-blue-600 mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold mb-4">
              Analyzing Your Personality...
            </h2>
            <p className="text-muted-foreground mb-6">
              Our AI is processing your responses to create your personalized
              career profile
            </p>
            <Progress value={75} className="max-w-md mx-auto" />
            <p className="text-sm text-muted-foreground mt-4">
              This may take a few moments...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCompleted && result) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Personality Assessment Complete
            </Badge>
            <h1 className="text-3xl font-bold">{result.title}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {result.description}
            </p>
          </div>

          {/* Career Matches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="h-5 w-5" />
                Top Career Matches
              </CardTitle>
              <CardDescription>
                Based on your personality profile, these careers align best with
                your traits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.careerMatches.map((career, index) => (
                  <Card key={index} className="border-l-4 border-blue-500">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{career.title}</h3>
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-800"
                          >
                            {career.match}% Match
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {career.description}
                        </p>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Salary:
                            </span>
                            <span className="font-medium">
                              {career.salaryRange}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Growth:
                            </span>
                            <span className="font-medium">{career.growth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Environment:
                            </span>
                            <span className="font-medium">
                              {career.workEnvironment}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Key Skills:</h4>
                          <div className="flex flex-wrap gap-1">
                            {career.keySkills.map((skill, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personality Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LightbulbIcon className="h-5 w-5" />
                  Development Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.developmentAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartIcon className="h-5 w-5" />
                  What Motivates You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.motivators.map((motivator, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{motivator}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ZapIcon className="h-5 w-5" />
                  Ideal Work Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.workStyle.map((style, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>{style}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Team Role */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Your Team Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-blue-600 mb-2">
                {result.teamRole}
              </p>
              <p className="text-muted-foreground">
                This describes how you naturally contribute to team dynamics and
                collaborative efforts.
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button onClick={restartTest} variant="outline">
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Take Test Again
            </Button>
            <Button>
              <TargetIcon className="h-4 w-4 mr-2" />
              Find Matching Jobs
            </Button>
            <Button variant="outline">Download Report</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <BrainIcon className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold">
              Personality-Career Match Test
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover your personality type and get personalized career
            recommendations based on your traits, work style, and preferences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  Question {currentQuestion + 1} of {questions.length}
                </CardTitle>
                <CardDescription>
                  Choose the answer that best describes you
                </CardDescription>
              </div>
              <Badge variant="outline">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                Complete
              </Badge>
            </div>
            <Progress
              value={((currentQuestion + 1) / questions.length) * 100}
            />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {questions[currentQuestion].text}
              </h2>

              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent"
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>

              <Button
                onClick={nextQuestion}
                disabled={!answers[currentQuestion]}
              >
                {currentQuestion === questions.length - 1
                  ? "Complete Test"
                  : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Info */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">8</div>
                <p className="text-sm text-muted-foreground">Questions</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">5 min</div>
                <p className="text-sm text-muted-foreground">Duration</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  AI-Powered
                </div>
                <p className="text-sm text-muted-foreground">Analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

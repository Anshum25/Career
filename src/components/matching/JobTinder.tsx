import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  X,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  TrendingUp,
  Zap,
  RotateCcw,
  Settings,
  Filter,
  Sparkles,
  Building,
  Calendar,
  Eye,
} from "lucide-react";
import { Job } from "@/lib/types";
import { mockJobs } from "@/lib/mockData";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface SwipeAction {
  type: "like" | "pass";
  jobId: string;
  timestamp: Date;
}

interface MatchScore {
  overall: number;
  skills: number;
  salary: number;
  location: number;
  experience: number;
  culture: number;
}

interface JobWithMatch extends Job {
  matchScore: MatchScore;
  aiInsights: string[];
  whyMatch: string;
}

export default function JobTinder() {
  const { saveJob } = useSavedJobs();
  const { toast } = useToast();
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [jobs, setJobs] = useState<JobWithMatch[]>([]);
  const [swipeActions, setSwipeActions] = useState<SwipeAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Initialize jobs with AI match scores
  useEffect(() => {
    const initializeJobs = async () => {
      setIsLoading(true);

      // Simulate AI matching analysis
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const jobsWithScores: JobWithMatch[] = mockJobs
        .slice(0, 10)
        .map((job) => {
          const skills = Math.random() * 40 + 60; // 60-100
          const salary = Math.random() * 30 + 70; // 70-100
          const location = Math.random() * 50 + 50; // 50-100
          const experience = Math.random() * 35 + 65; // 65-100
          const culture = Math.random() * 40 + 60; // 60-100
          const overall =
            (skills + salary + location + experience + culture) / 5;

          return {
            ...job,
            matchScore: {
              overall: Math.round(overall),
              skills: Math.round(skills),
              salary: Math.round(salary),
              location: Math.round(location),
              experience: Math.round(experience),
              culture: Math.round(culture),
            },
            aiInsights: [
              "Strong technical skill alignment",
              "Salary matches your expectations",
              "Great company culture fit",
              "Located in your preferred area",
            ].slice(0, Math.floor(Math.random() * 3) + 2),
            whyMatch: [
              "Your React expertise perfectly matches their tech stack",
              "The salary range aligns with your career level",
              "Company values match your work preferences",
              "This role offers the growth opportunities you're seeking",
              "Your experience in startups fits their company culture",
            ][Math.floor(Math.random() * 5)],
          };
        });

      // Sort by match score
      jobsWithScores.sort(
        (a, b) => b.matchScore.overall - a.matchScore.overall,
      );

      setJobs(jobsWithScores);
      setIsLoading(false);

      toast({
        title: "Jobs Ready!",
        description: `Found ${jobsWithScores.length} personalized job matches for you`,
      });
    };

    initializeJobs();
  }, [toast]);

  const currentJob = jobs[currentJobIndex];
  const hasMoreJobs = currentJobIndex < jobs.length;

  const handleSwipe = (action: "like" | "pass") => {
    if (!currentJob) return;

    const swipeAction: SwipeAction = {
      type: action,
      jobId: currentJob.id,
      timestamp: new Date(),
    };

    setSwipeActions((prev) => [...prev, swipeAction]);

    if (action === "like") {
      saveJob(currentJob, "high");
      toast({
        title: "Job Liked! ❤️",
        description: `${currentJob.title} at ${currentJob.company.name} saved to your list`,
      });
    }

    // Move to next job
    if (currentJobIndex < jobs.length - 1) {
      setCurrentJobIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const undoLastSwipe = () => {
    if (swipeActions.length === 0) return;

    setSwipeActions((prev) => prev.slice(0, -1));
    if (currentJobIndex > 0) {
      setCurrentJobIndex((prev) => prev - 1);
    }
    setShowResults(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Determine swipe action based on drag distance
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        handleSwipe("like");
      } else {
        handleSwipe("pass");
      }
    }

    setDragOffset({ x: 0, y: 0 });
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getCardRotation = () => {
    const rotation = dragOffset.x * 0.1;
    return Math.max(-15, Math.min(15, rotation));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center space-y-4">
          <div className="animate-pulse">
            <Heart className="h-16 w-16 mx-auto text-pink-500 mb-4" />
          </div>
          <h2 className="text-2xl font-bold">Finding Your Perfect Matches</h2>
          <p className="text-muted-foreground">
            Our AI is analyzing thousands of jobs to find the best matches for
            you...
          </p>
          <Progress value={65} className="max-w-sm mx-auto" />
        </div>
      </div>
    );
  }

  if (showResults || !hasMoreJobs) {
    const likedJobs = swipeActions.filter((action) => action.type === "like");

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              Matching Complete!
            </CardTitle>
            <CardDescription>
              You've reviewed all available matches
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">
                    {likedJobs.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Jobs Liked
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-600">
                    {swipeActions.filter((a) => a.type === "pass").length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Jobs Passed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round(
                      (likedJobs.length / swipeActions.length) * 100,
                    ) || 0}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Match Rate
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => (window.location.href = "/saved-jobs")}
              >
                <Heart className="h-4 w-4 mr-2" />
                View Your Liked Jobs
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCurrentJobIndex(0);
                  setSwipeActions([]);
                  setShowResults(false);
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentJob) {
    return <div>No more jobs available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Heart className="h-6 w-6 text-pink-500" />
            Find My Match
          </h1>
          <p className="text-muted-foreground">
            {currentJobIndex + 1} of {jobs.length} • Swipe right to save, left
            to pass
          </p>
          <Progress
            value={((currentJobIndex + 1) / jobs.length) * 100}
            className="max-w-sm mx-auto"
          />
        </div>

        {/* Job Card */}
        <div className="relative h-[600px] perspective-1000">
          <Card
            ref={cardRef}
            className={`absolute inset-0 cursor-grab active:cursor-grabbing select-none transition-transform duration-200 ${
              isDragging ? "z-20" : ""
            }`}
            style={{
              transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotateZ(${getCardRotation()}deg)`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Swipe Indicators */}
            {isDragging && (
              <>
                <div
                  className={`absolute top-4 right-4 p-2 rounded-full transition-opacity ${
                    dragOffset.x > 50 ? "opacity-100 bg-green-100" : "opacity-0"
                  }`}
                >
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <div
                  className={`absolute top-4 left-4 p-2 rounded-full transition-opacity ${
                    dragOffset.x < -50 ? "opacity-100 bg-red-100" : "opacity-0"
                  }`}
                >
                  <X className="h-8 w-8 text-red-600" />
                </div>
              </>
            )}

            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={currentJob.company.logo}
                      alt={currentJob.company.name}
                    />
                    <AvatarFallback>
                      {currentJob.company.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">
                      {currentJob.title}
                    </CardTitle>
                    <CardDescription>{currentJob.company.name}</CardDescription>
                  </div>
                </div>
                <Badge
                  className={`${getMatchColor(currentJob.matchScore.overall)} font-bold`}
                >
                  {currentJob.matchScore.overall}% Match
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Job Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {currentJob.location.city}, {currentJob.location.state}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>
                    ${currentJob.salary.min / 1000}k - $
                    {currentJob.salary.max / 1000}k
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span className="capitalize">
                    {currentJob.jobType.replace("_", " ")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="capitalize">{currentJob.workMode}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Posted {formatDistanceToNow(currentJob.postedAt)} ago
                  </span>
                </div>
              </div>

              {/* AI Insights */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Why This Matches You
                </h4>
                <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                  {currentJob.whyMatch}
                </p>
                <div className="space-y-2">
                  {currentJob.aiInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Match Breakdown */}
              <div className="space-y-3">
                <h4 className="font-medium">Match Breakdown</h4>
                <div className="space-y-2">
                  {[
                    { label: "Skills", score: currentJob.matchScore.skills },
                    { label: "Salary", score: currentJob.matchScore.salary },
                    {
                      label: "Location",
                      score: currentJob.matchScore.location,
                    },
                    {
                      label: "Experience",
                      score: currentJob.matchScore.experience,
                    },
                    { label: "Culture", score: currentJob.matchScore.culture },
                  ].map(({ label, score }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{label}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={score} className="w-20 h-2" />
                        <span className="text-xs font-medium w-8">
                          {score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h4 className="font-medium">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {currentJob.skills.slice(0, 6).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16 p-0 border-red-200 hover:border-red-300 hover:bg-red-50"
            onClick={() => handleSwipe("pass")}
          >
            <X className="h-8 w-8 text-red-600" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-12 h-12 p-0"
            onClick={undoLastSwipe}
            disabled={swipeActions.length === 0}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>

          <Button
            size="lg"
            className="rounded-full w-16 h-16 p-0 bg-pink-600 hover:bg-pink-700"
            onClick={() => handleSwipe("like")}
          >
            <Heart className="h-8 w-8" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs">
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            <Building className="h-3 w-3 mr-1" />
            Company Info
          </Button>
        </div>
      </div>
    </div>
  );
}

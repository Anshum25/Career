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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  TrophyIcon,
  StarIcon,
  ZapIcon,
  TargetIcon,
  FlameIcon,
  CrownIcon,
  GiftIcon,
  TrendingUpIcon,
  CalendarIcon,
  CheckCircleIcon,
  AwardIcon,
  LockIcon,
  UnlockIcon,
  RocketIcon,
  DiamondIcon,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  category:
    | "applications"
    | "profile"
    | "interviews"
    | "networking"
    | "learning";
}

interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  totalPoints: number;
  weeklyPoints: number;
  rank: number;
  streak: number;
  achievements: Achievement[];
  activities: Activity[];
}

interface Activity {
  id: string;
  type:
    | "job_applied"
    | "profile_updated"
    | "interview_completed"
    | "skill_added"
    | "resume_uploaded";
  description: string;
  points: number;
  timestamp: Date;
  multiplier?: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: Date;
  progress: number;
  maxProgress: number;
  completed: boolean;
  type: "daily" | "weekly" | "monthly";
  difficulty: "easy" | "medium" | "hard";
}

export default function GamifiedJobHunt() {
  const { toast } = useToast();

  const [user] = useState<User>({
    id: "1",
    name: "Alex Kumar",
    avatar: "/avatars/alex.jpg",
    level: 12,
    totalPoints: 8450,
    weeklyPoints: 1280,
    rank: 23,
    streak: 7,
    achievements: [
      {
        id: "1",
        title: "First Steps",
        description: "Applied to your first job",
        icon: "🎯",
        rarity: "common",
        points: 50,
        unlocked: true,
        unlockedAt: new Date("2024-01-01"),
        progress: 1,
        maxProgress: 1,
        category: "applications",
      },
      {
        id: "2",
        title: "Persistent Applicant",
        description: "Applied to 10 jobs in a week",
        icon: "💪",
        rarity: "rare",
        points: 200,
        unlocked: true,
        unlockedAt: new Date("2024-01-08"),
        progress: 10,
        maxProgress: 10,
        category: "applications",
      },
      {
        id: "3",
        title: "Interview Master",
        description: "Complete 5 practice interviews",
        icon: "🎤",
        rarity: "epic",
        points: 300,
        unlocked: false,
        progress: 3,
        maxProgress: 5,
        category: "interviews",
      },
      {
        id: "4",
        title: "Profile Perfectionist",
        description: "Achieve 100% profile completion",
        icon: "✨",
        rarity: "rare",
        points: 250,
        unlocked: true,
        unlockedAt: new Date("2024-01-10"),
        progress: 100,
        maxProgress: 100,
        category: "profile",
      },
      {
        id: "5",
        title: "Skill Collector",
        description: "Add 20 skills to your profile",
        icon: "🧠",
        rarity: "common",
        points: 100,
        unlocked: false,
        progress: 15,
        maxProgress: 20,
        category: "profile",
      },
      {
        id: "6",
        title: "Network Builder",
        description: "Connect with 50 professionals",
        icon: "🤝",
        rarity: "epic",
        points: 400,
        unlocked: false,
        progress: 32,
        maxProgress: 50,
        category: "networking",
      },
      {
        id: "7",
        title: "Learning Machine",
        description: "Complete 10 courses",
        icon: "📚",
        rarity: "legendary",
        points: 500,
        unlocked: false,
        progress: 6,
        maxProgress: 10,
        category: "learning",
      },
    ],
    activities: [
      {
        id: "1",
        type: "job_applied",
        description: "Applied to Senior React Developer at TechCorp",
        points: 25,
        timestamp: new Date("2024-01-15T10:30:00"),
        multiplier: 2,
      },
      {
        id: "2",
        type: "interview_completed",
        description: "Completed AI interview practice session",
        points: 50,
        timestamp: new Date("2024-01-15T09:15:00"),
      },
      {
        id: "3",
        type: "profile_updated",
        description: "Updated skills section",
        points: 15,
        timestamp: new Date("2024-01-14T16:45:00"),
      },
      {
        id: "4",
        type: "skill_added",
        description: "Added TypeScript to skills",
        points: 10,
        timestamp: new Date("2024-01-14T14:20:00"),
      },
    ],
  });

  const [challenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Daily Applier",
      description: "Apply to 3 jobs today",
      reward: 75,
      deadline: new Date("2024-01-16T23:59:59"),
      progress: 2,
      maxProgress: 3,
      completed: false,
      type: "daily",
      difficulty: "easy",
    },
    {
      id: "2",
      title: "Profile Polish",
      description: "Update your profile this week",
      reward: 150,
      deadline: new Date("2024-01-21T23:59:59"),
      progress: 3,
      maxProgress: 5,
      completed: false,
      type: "weekly",
      difficulty: "medium",
    },
    {
      id: "3",
      title: "Interview Champion",
      description: "Complete 10 practice interviews this month",
      reward: 500,
      deadline: new Date("2024-01-31T23:59:59"),
      progress: 7,
      maxProgress: 10,
      completed: false,
      type: "monthly",
      difficulty: "hard",
    },
  ]);

  const [leaderboard] = useState([
    {
      rank: 1,
      name: "Priya Sharma",
      points: 12450,
      level: 18,
      streak: 15,
      avatar: "/avatars/priya.jpg",
    },
    {
      rank: 2,
      name: "Rahul Gupta",
      points: 11230,
      level: 16,
      streak: 12,
      avatar: "/avatars/rahul.jpg",
    },
    {
      rank: 3,
      name: "Sneha Patel",
      points: 10890,
      level: 15,
      streak: 8,
      avatar: "/avatars/sneha.jpg",
    },
    {
      rank: 4,
      name: "Arjun Singh",
      points: 9870,
      level: 14,
      streak: 6,
      avatar: "/avatars/arjun.jpg",
    },
    {
      rank: 5,
      name: "Kavya Reddy",
      points: 9450,
      level: 13,
      streak: 11,
      avatar: "/avatars/kavya.jpg",
    },
    // ... user's position
    {
      rank: 23,
      name: user.name,
      points: user.totalPoints,
      level: user.level,
      streak: user.streak,
      avatar: user.avatar,
      isCurrentUser: true,
    },
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50";
      case "rare":
        return "border-blue-300 bg-blue-50";
      case "epic":
        return "border-purple-300 bg-purple-50";
      case "legendary":
        return "border-yellow-300 bg-yellow-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-700";
      case "rare":
        return "text-blue-700";
      case "epic":
        return "text-purple-700";
      case "legendary":
        return "text-yellow-700";
      default:
        return "text-gray-700";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "daily":
        return <CalendarIcon className="h-4 w-4" />;
      case "weekly":
        return <TrendingUpIcon className="h-4 w-4" />;
      case "monthly":
        return <CrownIcon className="h-4 w-4" />;
      default:
        return <TargetIcon className="h-4 w-4" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "job_applied":
        return "🎯";
      case "profile_updated":
        return "👤";
      case "interview_completed":
        return "🎤";
      case "skill_added":
        return "🧠";
      case "resume_uploaded":
        return "📄";
      default:
        return "✨";
    }
  };

  const getLevelProgress = () => {
    const pointsForCurrentLevel = user.level * 500;
    const pointsForNextLevel = (user.level + 1) * 500;
    const currentProgress = user.totalPoints - pointsForCurrentLevel;
    const maxProgress = pointsForNextLevel - pointsForCurrentLevel;
    return { current: currentProgress, max: maxProgress };
  };

  const claimAchievement = (achievementId: string) => {
    toast({
      title: "Achievement Unlocked! 🎉",
      description: "You've earned a new achievement and bonus points!",
    });
  };

  const levelProgress = getLevelProgress();

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <TrophyIcon className="h-8 w-8 text-yellow-600" />
            <h1 className="text-3xl font-bold">Gamified Job Hunt</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Level up your job search! Complete challenges, earn achievements,
            and compete with other job seekers while finding your dream job.
          </p>
        </div>

        {/* User Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <StarIcon className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold">Level {user.level}</span>
              </div>
              <Progress
                value={(levelProgress.current / levelProgress.max) * 100}
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground">
                {levelProgress.current}/{levelProgress.max} XP to next level
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {user.totalPoints.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <FlameIcon className="h-5 w-5 text-orange-500" />
                <span className="text-2xl font-bold text-orange-600">
                  {user.streak}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                #{user.rank}
              </div>
              <p className="text-sm text-muted-foreground">Weekly Rank</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {user.weeklyPoints}
              </div>
              <p className="text-sm text-muted-foreground">This Week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="challenges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {challenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className={`border-l-4 ${
                    challenge.type === "daily"
                      ? "border-green-500"
                      : challenge.type === "weekly"
                        ? "border-blue-500"
                        : "border-purple-500"
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getTypeIcon(challenge.type)}
                        {challenge.title}
                      </CardTitle>
                      <div className="flex gap-1">
                        <Badge
                          className={getDifficultyColor(challenge.difficulty)}
                          variant="secondary"
                        >
                          {challenge.difficulty}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {challenge.type}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {challenge.progress}/{challenge.maxProgress}
                        </span>
                      </div>
                      <Progress
                        value={
                          (challenge.progress / challenge.maxProgress) * 100
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <GiftIcon className="h-4 w-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-700">
                          {challenge.reward} points
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(challenge.deadline).toLocaleDateString()}
                      </div>
                    </div>

                    {challenge.completed ? (
                      <Button className="w-full" disabled>
                        <CheckCircleIcon className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                    ) : challenge.progress === challenge.maxProgress ? (
                      <Button className="w-full">
                        <GiftIcon className="h-4 w-4 mr-2" />
                        Claim Reward
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        <RocketIcon className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`${getRarityColor(achievement.rarity)} ${
                    achievement.unlocked ? "" : "opacity-60"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex flex-col items-end gap-1">
                        {achievement.unlocked ? (
                          <UnlockIcon className="h-5 w-5 text-green-600" />
                        ) : (
                          <LockIcon className="h-5 w-5 text-gray-400" />
                        )}
                        <Badge
                          variant="outline"
                          className={`${getRarityTextColor(achievement.rarity)} capitalize`}
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>

                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress
                        value={
                          (achievement.progress / achievement.maxProgress) * 100
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-700">
                          {achievement.points} points
                        </span>
                      </div>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <span className="text-xs text-muted-foreground">
                          {achievement.unlockedAt.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrophyIcon className="h-5 w-5" />
                  Weekly Leaderboard
                </CardTitle>
                <CardDescription>
                  Top job seekers this week - compete and climb the ranks!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        player.isCurrentUser
                          ? "bg-blue-50 border-2 border-blue-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            player.rank === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : player.rank === 2
                                ? "bg-gray-100 text-gray-800"
                                : player.rank === 3
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {player.rank <= 3
                            ? player.rank === 1
                              ? "🥇"
                              : player.rank === 2
                                ? "🥈"
                                : "🥉"
                            : player.rank}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={player.avatar} alt={player.name} />
                          <AvatarFallback>
                            {player.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{player.name}</span>
                          {player.isCurrentUser && (
                            <Badge variant="secondary">You</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Level {player.level}</span>
                          <div className="flex items-center gap-1">
                            <FlameIcon className="h-3 w-3 text-orange-500" />
                            <span>{player.streak} day streak</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-lg">
                          {player.points.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          points
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ZapIcon className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Track your job search progress and earn points for every
                  action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="text-2xl">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {activity.multiplier && (
                            <Badge variant="secondary" className="text-xs">
                              {activity.multiplier}x
                            </Badge>
                          )}
                          <span className="font-bold text-green-600">
                            +{activity.points}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RocketIcon className="h-5 w-5" />
              Quick Actions to Earn Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-auto p-4 flex-col gap-2">
                <div className="text-2xl">🎯</div>
                <div className="text-center">
                  <div className="font-semibold">Apply to Jobs</div>
                  <div className="text-xs text-muted-foreground">
                    25 points each
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <div className="text-2xl">🎤</div>
                <div className="text-center">
                  <div className="font-semibold">Practice Interview</div>
                  <div className="text-xs text-muted-foreground">
                    50 points each
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <div className="text-2xl">👤</div>
                <div className="text-center">
                  <div className="font-semibold">Update Profile</div>
                  <div className="text-xs text-muted-foreground">
                    15 points each
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                <div className="text-2xl">📚</div>
                <div className="text-center">
                  <div className="font-semibold">Complete Course</div>
                  <div className="text-xs text-muted-foreground">
                    100 points each
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

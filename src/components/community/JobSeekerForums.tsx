import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  MessageSquareIcon,
  PlusIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageCircleIcon,
  EyeIcon,
  ClockIcon,
  TrendingUpIcon,
  FireIcon,
  StarIcon,
  PinIcon,
  FlagIcon,
  ShareIcon,
  BookmarkIcon,
  SearchIcon,
  FilterIcon,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
    badge?: string;
  };
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  comments: number;
  views: number;
  createdAt: Date;
  isPinned: boolean;
  isSolved: boolean;
  lastActivity: Date;
}

interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
  };
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  isAnswer?: boolean;
  replies: Comment[];
}

export default function JobSeekerForums() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "All Posts", count: 1247 },
    { id: "interview-experiences", name: "Interview Experiences", count: 324 },
    { id: "salary-discussions", name: "Salary Discussions", count: 198 },
    { id: "career-advice", name: "Career Advice", count: 445 },
    { id: "company-reviews", name: "Company Reviews", count: 167 },
    { id: "resume-help", name: "Resume Help", count: 89 },
    { id: "job-search-tips", name: "Job Search Tips", count: 156 },
    { id: "technical-prep", name: "Technical Prep", count: 234 },
  ];

  const posts: Post[] = [
    {
      id: "1",
      title: "Google Software Engineer Interview Experience - L4 Position",
      content:
        "Just completed my Google interview process for SWE L4 position. Here's my detailed experience with timeline, questions asked, and preparation tips...",
      author: {
        name: "TechGuru2024",
        avatar: "/avatars/techguru.jpg",
        reputation: 2847,
        badge: "Interview Expert",
      },
      category: "interview-experiences",
      tags: ["Google", "Software Engineer", "L4", "System Design"],
      upvotes: 234,
      downvotes: 8,
      comments: 67,
      views: 1847,
      createdAt: new Date("2024-01-15T10:30:00"),
      isPinned: true,
      isSolved: false,
      lastActivity: new Date("2024-01-15T16:45:00"),
    },
    {
      id: "2",
      title: "How much should I expect for 3 YOE React Developer in Bangalore?",
      content:
        "I have 3 years of experience in React, Node.js, and AWS. Currently earning 12 LPA. What salary range should I target for my next switch?",
      author: {
        name: "ReactDev123",
        avatar: "/avatars/reactdev.jpg",
        reputation: 567,
      },
      category: "salary-discussions",
      tags: ["React", "Salary", "Bangalore", "3YOE"],
      upvotes: 89,
      downvotes: 12,
      comments: 43,
      views: 892,
      createdAt: new Date("2024-01-15T08:15:00"),
      isPinned: false,
      isSolved: true,
      lastActivity: new Date("2024-01-15T14:20:00"),
    },
    {
      id: "3",
      title: "Should I switch from Startup to Product Company after 2 years?",
      content:
        "Currently working at a Series A startup for 2 years. Got offers from Flipkart and Zomato. Confused about making the switch. Need advice on pros/cons...",
      author: {
        name: "StartupGuy",
        avatar: "/avatars/startup.jpg",
        reputation: 1234,
      },
      category: "career-advice",
      tags: ["Career Switch", "Startup", "Product Company"],
      upvotes: 156,
      downvotes: 23,
      comments: 78,
      views: 1456,
      createdAt: new Date("2024-01-14T19:30:00"),
      isPinned: false,
      isSolved: false,
      lastActivity: new Date("2024-01-15T11:10:00"),
    },
    {
      id: "4",
      title: "Infosys vs TCS vs Wipro - Which is better for freshers in 2024?",
      content:
        "Got offers from all three service companies. Which one should I choose as a fresher? Looking for growth opportunities and learning curve...",
      author: {
        name: "FresherDude",
        avatar: "/avatars/fresher.jpg",
        reputation: 89,
      },
      category: "company-reviews",
      tags: ["Infosys", "TCS", "Wipro", "Fresher"],
      upvotes: 67,
      downvotes: 34,
      comments: 45,
      views: 723,
      createdAt: new Date("2024-01-14T15:45:00"),
      isPinned: false,
      isSolved: false,
      lastActivity: new Date("2024-01-15T09:30:00"),
    },
  ];

  const comments: Comment[] = [
    {
      id: "1",
      postId: "1",
      content:
        "Great detailed experience! The system design round sounds tough. How did you prepare for it?",
      author: {
        name: "SystemDesigner",
        avatar: "/avatars/designer.jpg",
        reputation: 1567,
      },
      upvotes: 23,
      downvotes: 1,
      createdAt: new Date("2024-01-15T11:00:00"),
      replies: [
        {
          id: "1-1",
          postId: "1",
          content:
            "I used Grokking the System Design Interview course and practiced with friends. Also watched a lot of YouTube videos on scalable system architectures.",
          author: {
            name: "TechGuru2024",
            avatar: "/avatars/techguru.jpg",
            reputation: 2847,
          },
          upvotes: 45,
          downvotes: 0,
          createdAt: new Date("2024-01-15T11:15:00"),
          replies: [],
        },
      ],
    },
    {
      id: "2",
      postId: "1",
      content:
        "Congrats on clearing the interviews! Did you get the offer? What was the compensation package like?",
      author: {
        name: "CuriousSeeker",
        avatar: "/avatars/curious.jpg",
        reputation: 445,
      },
      upvotes: 67,
      downvotes: 2,
      createdAt: new Date("2024-01-15T12:30:00"),
      isAnswer: true,
      replies: [],
    },
  ];

  const handleUpvote = (postId: string) => {
    toast({
      title: "Upvoted!",
      description: "Thanks for your feedback on this post.",
    });
  };

  const handleDownvote = (postId: string) => {
    toast({
      title: "Downvoted",
      description: "Your feedback has been recorded.",
    });
  };

  const createNewPost = () => {
    toast({
      title: "Post Created!",
      description: "Your post has been published to the community.",
    });
    setShowNewPost(false);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return b.upvotes + b.comments * 2 - (a.upvotes + a.comments * 2);
      case "top":
        return b.upvotes - a.upvotes;
      case "recent":
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const getTimeSince = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  if (selectedPost) {
    const postComments = comments.filter((c) => c.postId === selectedPost.id);

    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedPost(null)}>
              ← Back to Forums
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{selectedPost.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>by {selectedPost.author.name}</span>
                <span>{getTimeSince(selectedPost.createdAt)}</span>
                <div className="flex items-center gap-1">
                  <EyeIcon className="h-4 w-4" />
                  {selectedPost.views} views
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Post Content */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Voting */}
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpvote(selectedPost.id)}
                      >
                        <ThumbsUpIcon className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold">
                        {selectedPost.upvotes - selectedPost.downvotes}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownvote(selectedPost.id)}
                      >
                        <ThumbsDownIcon className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedPost.author.avatar} />
                          <AvatarFallback>
                            {selectedPost.author.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {selectedPost.author.name}
                            </span>
                            {selectedPost.author.badge && (
                              <Badge variant="secondary">
                                {selectedPost.author.badge}
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {selectedPost.author.reputation} reputation
                          </span>
                        </div>
                      </div>

                      <div className="prose max-w-none">
                        <p>{selectedPost.content}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <BookmarkIcon className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ShareIcon className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FlagIcon className="h-4 w-4 mr-2" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments */}
              <Card>
                <CardHeader>
                  <CardTitle>{selectedPost.comments} Answers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add Comment */}
                  <div className="space-y-4">
                    <Textarea placeholder="Write your answer..." rows={4} />
                    <Button>Post Answer</Button>
                  </div>

                  {/* Comments List */}
                  {postComments.map((comment) => (
                    <div key={comment.id} className="border-l-2 pl-4 space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUpIcon className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium">
                            {comment.upvotes}
                          </span>
                          <Button variant="ghost" size="sm">
                            <ThumbsDownIcon className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={comment.author.avatar} />
                              <AvatarFallback>
                                {comment.author.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {comment.author.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {comment.author.reputation} rep
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {getTimeSince(comment.createdAt)}
                            </span>
                            {comment.isAnswer && (
                              <Badge
                                variant="default"
                                className="bg-green-100 text-green-800"
                              >
                                ✓ Accepted Answer
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm">{comment.content}</p>

                          <div className="flex items-center gap-4 text-sm">
                            <Button variant="ghost" size="sm">
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm">
                              Share
                            </Button>
                          </div>

                          {/* Replies */}
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="ml-8 pt-3 border-t">
                              <div className="flex items-start gap-2">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={reply.author.avatar} />
                                  <AvatarFallback>
                                    {reply.author.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 text-sm">
                                    <span className="font-medium">
                                      {reply.author.name}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {getTimeSince(reply.createdAt)}
                                    </span>
                                  </div>
                                  <p className="text-sm mt-1">
                                    {reply.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Related Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="text-sm">
                        <h4 className="font-medium line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>{post.upvotes} votes</span>
                          <span>{post.comments} answers</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Seekers Community</h1>
            <p className="text-muted-foreground">
              Share experiences, get advice, and help fellow job seekers
            </p>
          </div>
          <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Share your experience or ask for help from the community
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Post title..." />
                <select className="w-full p-2 border rounded">
                  <option>Select Category</option>
                  {categories.slice(1).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <Textarea placeholder="Write your post content..." rows={6} />
                <Input placeholder="Tags (comma separated)" />
                <div className="flex gap-2">
                  <Button onClick={createNewPost}>Publish Post</Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewPost(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-800"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trending Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Node.js",
                    "System Design",
                    "Interview",
                    "Salary",
                    "Career Switch",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-blue-50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="recent">Recent</option>
                    <option value="trending">Trending</option>
                    <option value="top">Top Rated</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent
                    className="p-4"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex gap-4">
                      {/* Voting */}
                      <div className="flex flex-col items-center gap-1 min-w-[60px]">
                        <div className="text-sm font-semibold">
                          {post.upvotes - post.downvotes}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          votes
                        </div>
                        <div className="text-sm font-semibold">
                          {post.comments}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          answers
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {post.views}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          views
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          {post.isPinned && (
                            <PinIcon className="h-4 w-4 text-blue-600" />
                          )}
                          {post.isSolved && (
                            <CheckCircleIcon className="h-4 w-4 text-green-600" />
                          )}
                          <h3 className="font-semibold text-lg hover:text-blue-600">
                            {post.title}
                          </h3>
                        </div>

                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {post.content}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>
                                {post.author.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {post.author.name}
                            </span>
                            {post.author.badge && (
                              <Badge variant="outline" className="text-xs">
                                {post.author.badge}
                              </Badge>
                            )}
                            <span className="text-sm text-muted-foreground">
                              {post.author.reputation} rep
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {getTimeSince(post.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

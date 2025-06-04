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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  EditIcon,
  PlusIcon,
  TrashIcon,
  StarIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  AwardIcon,
  LinkIcon,
  DownloadIcon,
  EyeIcon,
  TrendingUpIcon,
  CalendarIcon,
  BuildingIcon,
  FileTextIcon,
  VerifiedIcon,
} from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  current: boolean;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  percentage: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  endorsed: number;
}

interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  profileViews: number;
  profileStrength: number;
  resumeUploaded: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profilePhotoUrl?: string;
}

export default function NaukriStyleProfile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Rahul Sharma",
    title: "Senior Full Stack Developer",
    location: "Bangalore, Karnataka",
    email: "rahul.sharma@email.com",
    phone: "+91 9876543210",
    summary:
      "Experienced Full Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. Passionate about building scalable web applications and leading development teams.",
    experience: [
      {
        id: "1",
        title: "Senior Full Stack Developer",
        company: "TechCorp Solutions",
        duration: "Jan 2022 - Present",
        location: "Bangalore",
        description:
          "Leading a team of 5 developers, architecting and developing scalable web applications using React, Node.js, and AWS. Improved application performance by 40% and reduced deployment time by 60%.",
        current: true,
      },
      {
        id: "2",
        title: "Full Stack Developer",
        company: "StartupXYZ",
        duration: "Jun 2020 - Dec 2021",
        location: "Mumbai",
        description:
          "Developed and maintained multiple client projects using MERN stack. Implemented CI/CD pipelines and worked closely with product team to deliver features on time.",
        current: false,
      },
    ],
    education: [
      {
        id: "1",
        degree: "B.Tech in Computer Science",
        institution: "IIT Delhi",
        year: "2020",
        percentage: "8.5 CGPA",
      },
      {
        id: "2",
        degree: "12th Standard",
        institution: "Delhi Public School",
        year: "2016",
        percentage: "94%",
      },
    ],
    skills: [
      { id: "1", name: "React.js", level: 90, endorsed: 23 },
      { id: "2", name: "Node.js", level: 85, endorsed: 18 },
      { id: "3", name: "TypeScript", level: 80, endorsed: 15 },
      { id: "4", name: "AWS", level: 75, endorsed: 12 },
      { id: "5", name: "MongoDB", level: 70, endorsed: 10 },
    ],
    profileViews: 1247,
    profileStrength: 85,
    resumeUploaded: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    profilePhotoUrl: "/avatars/profile.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSave = (section: string, data: any) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: data,
    }));
    setEditingSection(null);
    toast({
      title: "Profile Updated",
      description: `Your ${section} has been updated successfully.`,
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      duration: "",
      location: "",
      description: "",
      current: false,
    };
    setProfileData((prev) => ({
      ...prev,
      experience: [newExp, ...prev.experience],
    }));
    setEditingSection(`experience-${newExp.id}`);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: "",
      percentage: "",
    };
    setProfileData((prev) => ({
      ...prev,
      education: [newEdu, ...prev.education],
    }));
    setEditingSection(`education-${newEdu.id}`);
  };

  const getProfileCompletionTips = () => {
    const tips = [];
    if (!profileData.resumeUploaded) tips.push("Upload your resume");
    if (profileData.skills.length < 5) tips.push("Add more skills");
    if (profileData.experience.length < 2)
      tips.push("Add more work experience");
    if (!profileData.summary) tips.push("Write a professional summary");
    return tips;
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage
                      src={profileData.profilePhotoUrl}
                      alt={profileData.name}
                    />
                    <AvatarFallback className="text-2xl">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                  >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-xl font-bold">{profileData.name}</h2>
                    {profileData.isEmailVerified && (
                      <VerifiedIcon className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-muted-foreground">{profileData.title}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    {profileData.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <EyeIcon className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-blue-600">
                        {profileData.profileViews}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Profile Views
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUpIcon className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        {profileData.profileStrength}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Profile Strength
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Strength Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5 text-green-600" />
                Profile Strength
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span className="font-semibold">
                    {profileData.profileStrength}%
                  </span>
                </div>
                <Progress value={profileData.profileStrength} className="h-2" />
              </div>

              {getProfileCompletionTips().length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">
                    To improve your profile:
                  </h4>
                  {getProfileCompletionTips().map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      {tip}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileTextIcon className="h-4 w-4 mr-2" />
                Update Resume
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <EyeIcon className="h-4 w-4 mr-2" />
                Preview Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Contact Information</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection("contact")}
                  >
                    <EditIcon className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <MailIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{profileData.email}</p>
                        <div className="flex items-center gap-1">
                          <p className="text-sm text-muted-foreground">Email</p>
                          {profileData.isEmailVerified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{profileData.phone}</p>
                        <div className="flex items-center gap-1">
                          <p className="text-sm text-muted-foreground">
                            Mobile
                          </p>
                          {profileData.isPhoneVerified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Summary */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Professional Summary</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection("summary")}
                  >
                    <EditIcon className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  {editingSection === "summary" ? (
                    <div className="space-y-4">
                      <Textarea
                        value={profileData.summary}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            summary: e.target.value,
                          }))
                        }
                        placeholder="Write a brief summary about your professional background..."
                        rows={5}
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            handleSave("summary", profileData.summary)
                          }
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingSection(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {profileData.summary ||
                        "Add a professional summary to highlight your career achievements and goals."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Work Experience</CardTitle>
                  <Button onClick={addExperience}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profileData.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="border-l-2 border-blue-200 pl-4 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{exp.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <BuildingIcon className="h-4 w-4" />
                            <span>{exp.company}</span>
                            {exp.current && (
                              <Badge variant="secondary" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              {exp.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="h-4 w-4" />
                              {exp.location}
                            </div>
                          </div>
                          <p className="mt-2 text-muted-foreground">
                            {exp.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setEditingSection(`experience-${exp.id}`)
                            }
                          >
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Education</CardTitle>
                  <Button onClick={addEducation}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profileData.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="border-l-2 border-green-200 pl-4 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {edu.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <GraduationCapIcon className="h-4 w-4" />
                            <span>{edu.institution}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>Year: {edu.year}</span>
                            <span>Score: {edu.percentage}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setEditingSection(`education-${edu.id}`)
                            }
                          >
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Skills & Endorsements</CardTitle>
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileData.skills.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.endorsed} endorsements
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Proficiency</span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

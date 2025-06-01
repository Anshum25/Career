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
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  X,
  Download,
  Eye,
  Save,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  graduationDate: string;
  gpa?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    {
      id: "1",
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      degree: "",
      school: "",
      graduationDate: "",
      gpa: "",
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "",
      description: "",
      technologies: [],
      url: "",
    },
  ]);

  // Personal Info handlers
  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Skills handlers
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Work Experience handlers
  const addWorkExperience = () => {
    const newId = Date.now().toString();
    setWorkExperience([
      ...workExperience,
      {
        id: newId,
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
  };

  const updateWorkExperience = (
    id: string,
    field: string,
    value: string | boolean,
  ) => {
    setWorkExperience((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    );
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperience((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Education handlers
  const addEducation = () => {
    const newId = Date.now().toString();
    setEducation([
      ...education,
      {
        id: newId,
        degree: "",
        school: "",
        graduationDate: "",
        gpa: "",
      },
    ]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setEducation((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    );
  };

  const removeEducation = (id: string) => {
    setEducation((prev) => prev.filter((edu) => edu.id !== id));
  };

  // Project handlers
  const addProject = () => {
    const newId = Date.now().toString();
    setProjects([
      ...projects,
      {
        id: newId,
        name: "",
        description: "",
        technologies: [],
        url: "",
      },
    ]);
  };

  const updateProject = (
    id: string,
    field: string,
    value: string | string[],
  ) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    );
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Resume Builder</h1>
              <p className="text-muted-foreground">
                Create a professional resume
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      handlePersonalInfoChange("fullName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={personalInfo.email}
                    onChange={(e) =>
                      handlePersonalInfoChange("email", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      handlePersonalInfoChange("phone", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    value={personalInfo.location}
                    onChange={(e) =>
                      handlePersonalInfoChange("location", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  placeholder="https://johndoe.com"
                  value={personalInfo.website}
                  onChange={(e) =>
                    handlePersonalInfoChange("website", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Brief professional summary highlighting your key skills and experience..."
                  className="min-h-[100px]"
                  value={personalInfo.summary}
                  onChange={(e) =>
                    handlePersonalInfoChange("summary", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill} variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button onClick={() => removeSkill(skill)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
                <Button onClick={addWorkExperience} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {workExperience.map((exp, index) => (
                <div key={exp.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Experience {index + 1}</h4>
                    {workExperience.length > 1 && (
                      <Button
                        onClick={() => removeWorkExperience(exp.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input
                        placeholder="Software Engineer"
                        value={exp.title}
                        onChange={(e) =>
                          updateWorkExperience(exp.id, "title", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        placeholder="TechCorp Inc."
                        value={exp.company}
                        onChange={(e) =>
                          updateWorkExperience(
                            exp.id,
                            "company",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateWorkExperience(
                            exp.id,
                            "startDate",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={exp.endDate}
                        disabled={exp.current}
                        onChange={(e) =>
                          updateWorkExperience(
                            exp.id,
                            "endDate",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) =>
                        updateWorkExperience(
                          exp.id,
                          "current",
                          e.target.checked,
                        )
                      }
                      className="rounded"
                    />
                    <Label htmlFor={`current-${exp.id}`}>
                      I currently work here
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe your responsibilities and achievements..."
                      value={exp.description}
                      onChange={(e) =>
                        updateWorkExperience(
                          exp.id,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
                <Button onClick={addEducation} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={edu.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Education {index + 1}</h4>
                    {education.length > 1 && (
                      <Button
                        onClick={() => removeEducation(edu.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        placeholder="Bachelor of Science"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, "degree", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>School</Label>
                      <Input
                        placeholder="University of California"
                        value={edu.school}
                        onChange={(e) =>
                          updateEducation(edu.id, "school", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Graduation Date</Label>
                      <Input
                        type="date"
                        value={edu.graduationDate}
                        onChange={(e) =>
                          updateEducation(
                            edu.id,
                            "graduationDate",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>GPA (Optional)</Label>
                      <Input
                        placeholder="3.8"
                        value={edu.gpa}
                        onChange={(e) =>
                          updateEducation(edu.id, "gpa", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-8">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resume Preview
              </CardTitle>
              <CardDescription>
                This is how your resume will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white text-black p-6 border rounded-lg min-h-[600px] text-sm">
                {/* Header */}
                <div className="text-center border-b pb-4 mb-4">
                  <h1 className="text-2xl font-bold">
                    {personalInfo.fullName || "Your Name"}
                  </h1>
                  <div className="flex justify-center gap-4 mt-2 text-gray-600">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && (
                      <span>{personalInfo.location}</span>
                    )}
                  </div>
                  {personalInfo.website && (
                    <div className="mt-1 text-blue-600">
                      {personalInfo.website}
                    </div>
                  )}
                </div>

                {/* Summary */}
                {personalInfo.summary && (
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold border-b mb-2">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700">{personalInfo.summary}</p>
                  </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold border-b mb-2">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-1">
                      {skills.map((skill, index) => (
                        <span key={skill}>
                          {skill}
                          {index < skills.length - 1 && " • "}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Experience */}
                {workExperience.some((exp) => exp.title || exp.company) && (
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold border-b mb-2">
                      Work Experience
                    </h2>
                    {workExperience.map((exp) => (
                      <div key={exp.id} className="mb-3">
                        {(exp.title || exp.company) && (
                          <>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">
                                  {exp.title || "Job Title"}
                                </h3>
                                <p className="text-gray-600">
                                  {exp.company || "Company Name"}
                                </p>
                              </div>
                              <div className="text-gray-500 text-sm">
                                {exp.startDate &&
                                  new Date(exp.startDate).getFullYear()}
                                {exp.startDate &&
                                  (exp.endDate || exp.current) &&
                                  " - "}
                                {exp.current
                                  ? "Present"
                                  : exp.endDate &&
                                    new Date(exp.endDate).getFullYear()}
                              </div>
                            </div>
                            {exp.description && (
                              <p className="text-gray-700 mt-1 text-sm">
                                {exp.description}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {education.some((edu) => edu.degree || edu.school) && (
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold border-b mb-2">
                      Education
                    </h2>
                    {education.map((edu) => (
                      <div key={edu.id} className="mb-2">
                        {(edu.degree || edu.school) && (
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">
                                {edu.degree || "Degree"}
                              </h3>
                              <p className="text-gray-600">
                                {edu.school || "School Name"}
                              </p>
                              {edu.gpa && (
                                <p className="text-gray-500 text-sm">
                                  GPA: {edu.gpa}
                                </p>
                              )}
                            </div>
                            {edu.graduationDate && (
                              <div className="text-gray-500 text-sm">
                                {new Date(edu.graduationDate).getFullYear()}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

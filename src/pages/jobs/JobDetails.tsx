import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Building2,
  Calendar,
} from "lucide-react";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();

  // Mock job data - in a real app, this would be fetched based on the ID
  const job = {
    id: id || "1",
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $180,000",
    postedDate: "2 days ago",
    description: `We are looking for a Senior Software Engineer to join our dynamic team. 
    You will be responsible for designing, developing, and maintaining high-quality software solutions.
    
    Key Responsibilities:
    • Develop and maintain web applications using modern technologies
    • Collaborate with cross-functional teams to deliver features
    • Write clean, maintainable, and efficient code
    • Participate in code reviews and technical discussions
    • Mentor junior developers and contribute to team growth`,
    requirements: [
      "5+ years of experience in software development",
      "Strong proficiency in React, TypeScript, and Node.js",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Knowledge of database systems (SQL and NoSQL)",
      "Excellent problem-solving and communication skills",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Flexible work arrangements",
      "Professional development opportunities",
      "Unlimited PTO policy",
    ],
    tags: ["React", "TypeScript", "Node.js", "AWS", "Full-time", "Remote"],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                  <Building2 className="h-4 w-4" />
                  {job.company}
                </CardDescription>
              </div>
              <Button size="lg" className="w-fit">
                Apply Now
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{job.type}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">{job.salary}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Posted {job.postedDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {job.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Job Description */}
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {job.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{requirement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits & Perks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Apply Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="font-semibold">Ready to apply?</h3>
                <p className="text-muted-foreground text-sm">
                  Join {job.company} and take your career to the next level.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Save Job</Button>
                <Button>Apply Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

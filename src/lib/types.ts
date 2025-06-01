export type UserRole = "job_seeker" | "recruiter" | "admin" | "freelancer";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  verified: boolean;
  createdAt: Date;
  profile?: JobSeekerProfile | RecruiterProfile;
}

export interface JobSeekerProfile {
  id: string;
  userId: string;
  title?: string;
  bio?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  location: Location;
  preferences: JobPreferences;
  resumeScore: number;
  videoResumeUrl?: string;
  badges: Badge[];
  languages: string[];
}

export interface RecruiterProfile {
  id: string;
  userId: string;
  companyName: string;
  companySize: string;
  industry: string;
  location: Location;
  companyDescription?: string;
  website?: string;
  logo?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  grade?: string;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface JobPreferences {
  jobTypes: JobType[];
  workModes: WorkMode[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  industries: string[];
  locations: string[];
  commuteTolerance: number; // in km
}

export type JobType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | "freelance";
export type WorkMode = "remote" | "onsite" | "hybrid";
export type ExperienceLevel = "entry" | "mid" | "senior" | "executive";

export interface Job {
  id: string;
  title: string;
  company: Company;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: Location;
  workMode: WorkMode;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: "hour" | "month" | "year";
  };
  skills: string[];
  benefits: string[];
  postedAt: Date;
  applicationDeadline?: Date;
  applicationsCount: number;
  viewsCount: number;
  featured: boolean;
  urgent: boolean;
  matchScore?: number;
  moodTags: string[];
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  size: string;
  industry: string;
  rating: number;
  reviewsCount: number;
  website?: string;
  description?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: Date;
  category: "skill" | "achievement" | "verification" | "activity";
}

export interface AIRecommendation {
  type: "skill_gap" | "course" | "job_match" | "profile_improvement";
  title: string;
  description: string;
  actionUrl?: string;
  priority: "low" | "medium" | "high";
}

export interface LiveJobFair {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  companies: Company[];
  attendeesCount: number;
  maxAttendees?: number;
  tags: string[];
  featured: boolean;
}

export interface VideoInterview {
  id: string;
  jobId: string;
  scheduledAt: Date;
  duration: number; // in minutes
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  roomUrl: string;
  participants: {
    candidateId: string;
    recruiterId: string;
  };
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type:
    | "job_match"
    | "application_update"
    | "interview"
    | "message"
    | "achievement";
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: "text" | "file" | "voice";
  read: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status:
    | "pending"
    | "reviewed"
    | "interviewed"
    | "offered"
    | "rejected"
    | "withdrawn";
  appliedAt: Date;
  coverLetter?: string;
  resumeUrl?: string;
  videoResumeUrl?: string;
  notes?: string;
}

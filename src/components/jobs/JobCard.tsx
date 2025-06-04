import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import {
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  BookmarkIcon,
  StarIcon,
  BriefcaseIcon,
  TrendingUp,
  EyeIcon,
} from "lucide-react";
import { Job } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const { saveJob, removeSavedJob, isJobSaved } = useSavedJobs();
  const isSaved = isJobSaved(job.id);

  const handleSaveToggle = () => {
    if (isSaved) {
      removeSavedJob(job.id);
    } else {
      saveJob(job);
    }
  };

  const getWorkModeColor = (workMode: string) => {
    switch (workMode) {
      case "remote":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "hybrid":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "onsite":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getJobTypeColor = (jobType: string) => {
    switch (jobType) {
      case "full_time":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "part_time":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "contract":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "internship":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const formatJobType = (jobType: string) => {
    return jobType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatWorkMode = (workMode: string) => {
    return workMode.charAt(0).toUpperCase() + workMode.slice(1);
  };

  const formatSalary = (salary: any) => {
    const formatAmount = (amount: number) => {
      if (amount >= 1000) {
        return `$${Math.round(amount / 1000)}k`;
      }
      return `$${amount.toLocaleString()}`;
    };

    return `${formatAmount(salary.min)} - ${formatAmount(salary.max)}`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-transparent hover:border-l-primary">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <Avatar className="w-12 h-12 rounded-lg">
            <AvatarImage src={job.company.logo} alt={job.company.name} />
            <AvatarFallback className="rounded-lg">
              {job.company.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Job Details */}
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="text-lg font-semibold hover:text-primary transition-colors"
                  >
                    {job.title}
                  </Link>
                  {job.featured && (
                    <Badge variant="secondary" className="text-xs">
                      <StarIcon className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {job.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      🔥 Urgent
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Link
                    to={`/companies/${job.company.id}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {job.company.name}
                  </Link>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3" />
                    {job.company.rating} ({job.company.reviewsCount} reviews)
                  </div>
                </div>
              </div>

              {job.matchScore && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {job.matchScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Match</div>
                </div>
              )}
            </div>

            {/* Job Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                {job.location.city}, {job.location.state}
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                {formatDistanceToNow(job.postedAt, { addSuffix: true })}
              </div>
              <div className="flex items-center gap-1">
                <DollarSignIcon className="w-4 h-4" />
                {formatSalary(job.salary)} / {job.salary.period}
              </div>
              <div className="flex items-center gap-1">
                <BriefcaseIcon className="w-4 h-4" />
                {job.applicationsCount} applicants
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={getJobTypeColor(job.jobType)}>
                {formatJobType(job.jobType)}
              </Badge>
              <Badge className={getWorkModeColor(job.workMode)}>
                {formatWorkMode(job.workMode)}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {job.experienceLevel}
              </Badge>
              {job.moodTags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Skills */}
            {job.skills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 6).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 6 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                    +{job.skills.length - 6} more
                  </span>
                )}
              </div>
            )}

            {/* Job Description Preview */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {job.description}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Button size="sm" asChild>
                  <Link to={`/jobs/${job.id}`}>
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View Details
                  </Link>
                </Button>
                <Button size="sm" variant="outline">
                  Quick Apply
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveToggle}
                  className={isSaved ? "text-primary" : ""}
                >
                  <BookmarkIcon
                    className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                  />
                </Button>
                <div className="text-xs text-muted-foreground">
                  {job.viewsCount} views
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

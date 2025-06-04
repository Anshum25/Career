import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Filter,
  X,
  MapPin,
  DollarSign,
  Briefcase,
  Building,
  Clock,
  Tag,
  TrendingUp,
  Calendar,
  Search,
} from "lucide-react";

interface FiltersType {
  keywords: string;
  location: string;
  jobTypes: string[];
  workModes: string[];
  experienceLevels: string[];
  salaryRange: [number, number];
  companySize: string[];
  industries: string[];
  skills: string[];
  postedWithin: string;
  benefits: string[];
  companyName: string;
}

interface EnhancedJobFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onClearFilters: () => void;
  jobCount?: number;
}

export default function EnhancedJobFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  jobCount = 0,
}: EnhancedJobFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = useCallback(
    (key: keyof FiltersType, value: any) => {
      onFiltersChange({ ...filters, [key]: value });
    },
    [filters, onFiltersChange],
  );

  const handleArrayFilterChange = useCallback(
    (key: keyof FiltersType, value: string, checked: boolean) => {
      const currentArray = filters[key] as string[];
      const newArray = checked
        ? [...currentArray, value]
        : currentArray.filter((item) => item !== value);
      handleFilterChange(key, newArray);
    },
    [filters, handleFilterChange],
  );

  const formatSalary = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const jobTypeOptions = [
    { value: "full_time", label: "Full-time", count: 1234 },
    { value: "part_time", label: "Part-time", count: 567 },
    { value: "contract", label: "Contract", count: 890 },
    { value: "internship", label: "Internship", count: 234 },
    { value: "freelance", label: "Freelance", count: 456 },
  ];

  const workModeOptions = [
    { value: "remote", label: "Remote", count: 2341 },
    { value: "hybrid", label: "Hybrid", count: 1567 },
    { value: "onsite", label: "On-site", count: 890 },
  ];

  const experienceOptions = [
    { value: "entry", label: "Entry Level (0-2 years)", count: 567 },
    { value: "mid", label: "Mid Level (3-5 years)", count: 1234 },
    { value: "senior", label: "Senior Level (6+ years)", count: 890 },
    { value: "lead", label: "Lead/Principal", count: 345 },
    { value: "executive", label: "Executive", count: 123 },
  ];

  const companySizeOptions = [
    { value: "startup", label: "Startup (1-50)", count: 456 },
    { value: "small", label: "Small (51-200)", count: 789 },
    { value: "medium", label: "Medium (201-1000)", count: 1234 },
    { value: "large", label: "Large (1000+)", count: 567 },
  ];

  const industryOptions = [
    { value: "technology", label: "Technology", count: 2341 },
    { value: "finance", label: "Finance", count: 890 },
    { value: "healthcare", label: "Healthcare", count: 567 },
    { value: "education", label: "Education", count: 456 },
    { value: "retail", label: "Retail", count: 678 },
    { value: "manufacturing", label: "Manufacturing", count: 345 },
  ];

  const postedWithinOptions = [
    { value: "24h", label: "Last 24 hours" },
    { value: "3d", label: "Last 3 days" },
    { value: "7d", label: "Last week" },
    { value: "30d", label: "Last month" },
    { value: "all", label: "All time" },
  ];

  const popularSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "AWS",
    "Docker",
    "Kubernetes",
    "SQL",
    "MongoDB",
    "GraphQL",
    "Vue.js",
    "Angular",
    "Java",
    "C#",
    "PHP",
    "Ruby",
    "Go",
  ];

  const benefitOptions = [
    "Health Insurance",
    "Dental Insurance",
    "Vision Insurance",
    "401(k)",
    "Stock Options",
    "Remote Work",
    "Flexible Hours",
    "Unlimited PTO",
    "Learning Budget",
    "Gym Membership",
    "Free Meals",
    "Commuter Benefits",
  ];

  const activeFiltersCount =
    filters.keywords.length +
    filters.location.length +
    filters.jobTypes.length +
    filters.workModes.length +
    filters.experienceLevels.length +
    filters.companySize.length +
    filters.industries.length +
    filters.skills.length +
    filters.benefits.length +
    filters.companyName.length +
    (filters.postedWithin !== "all" ? 1 : 0) +
    (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 300000 ? 1 : 0);

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <CardTitle className="text-lg">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount}</Badge>
            )}
          </div>
          <div className="flex gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Less" : "More"} Filters
            </Button>
          </div>
        </div>
        {jobCount > 0 && (
          <CardDescription>
            Found {jobCount.toLocaleString()} jobs matching your criteria
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Keywords Search */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Search className="w-4 h-4" />
            Keywords
          </Label>
          <Input
            placeholder="Job title, skills, company..."
            value={filters.keywords}
            onChange={(e) => handleFilterChange("keywords", e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </Label>
          <Input
            placeholder="City, state, or remote"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>

        {/* Company Name */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Building className="w-4 h-4" />
            Company
          </Label>
          <Input
            placeholder="Company name"
            value={filters.companyName}
            onChange={(e) => handleFilterChange("companyName", e.target.value)}
          />
        </div>

        {/* Posted Within */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Posted Within
          </Label>
          <Select
            value={filters.postedWithin}
            onValueChange={(value) => handleFilterChange("postedWithin", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {postedWithinOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="space-y-4">
          <Label className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Salary Range
          </Label>
          <div className="px-2">
            <Slider
              value={filters.salaryRange}
              onValueChange={(value) =>
                handleFilterChange("salaryRange", value as [number, number])
              }
              max={300000}
              min={0}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{formatSalary(filters.salaryRange[0])}</span>
              <span>{formatSalary(filters.salaryRange[1])}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Job Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Job Type
          </Label>
          <div className="space-y-2">
            {jobTypeOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`job-type-${option.value}`}
                    checked={filters.jobTypes.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleArrayFilterChange(
                        "jobTypes",
                        option.value,
                        checked as boolean,
                      )
                    }
                  />
                  <Label
                    htmlFor={`job-type-${option.value}`}
                    className="text-sm"
                  >
                    {option.label}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">
                  {option.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Work Mode */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Work Mode
          </Label>
          <div className="space-y-2">
            {workModeOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`work-mode-${option.value}`}
                    checked={filters.workModes.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleArrayFilterChange(
                        "workModes",
                        option.value,
                        checked as boolean,
                      )
                    }
                  />
                  <Label
                    htmlFor={`work-mode-${option.value}`}
                    className="text-sm"
                  >
                    {option.label}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">
                  {option.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Experience Level
          </Label>
          <div className="space-y-2">
            {experienceOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`experience-${option.value}`}
                    checked={filters.experienceLevels.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleArrayFilterChange(
                        "experienceLevels",
                        option.value,
                        checked as boolean,
                      )
                    }
                  />
                  <Label
                    htmlFor={`experience-${option.value}`}
                    className="text-sm"
                  >
                    {option.label}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">
                  {option.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <>
            <Separator />

            {/* Company Size */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Building className="w-4 h-4" />
                Company Size
              </Label>
              <div className="space-y-2">
                {companySizeOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`company-size-${option.value}`}
                        checked={filters.companySize.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleArrayFilterChange(
                            "companySize",
                            option.value,
                            checked as boolean,
                          )
                        }
                      />
                      <Label
                        htmlFor={`company-size-${option.value}`}
                        className="text-sm"
                      >
                        {option.label}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {option.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Industry
              </Label>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {industryOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`industry-${option.value}`}
                          checked={filters.industries.includes(option.value)}
                          onCheckedChange={(checked) =>
                            handleArrayFilterChange(
                              "industries",
                              option.value,
                              checked as boolean,
                            )
                          }
                        />
                        <Label
                          htmlFor={`industry-${option.value}`}
                          className="text-sm"
                        >
                          {option.label}
                        </Label>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {option.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Popular Skills</Label>
              <div className="flex flex-wrap gap-2">
                {popularSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={
                      filters.skills.includes(skill) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() =>
                      handleArrayFilterChange(
                        "skills",
                        skill,
                        !filters.skills.includes(skill),
                      )
                    }
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Benefits & Perks</Label>
              <div className="grid grid-cols-2 gap-2">
                {benefitOptions.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <Checkbox
                      id={`benefit-${benefit}`}
                      checked={filters.benefits.includes(benefit)}
                      onCheckedChange={(checked) =>
                        handleArrayFilterChange(
                          "benefits",
                          benefit,
                          checked as boolean,
                        )
                      }
                    />
                    <Label htmlFor={`benefit-${benefit}`} className="text-xs">
                      {benefit}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Active Filters</Label>
              <div className="flex flex-wrap gap-1">
                {filters.keywords && (
                  <Badge variant="secondary" className="gap-1">
                    Keywords: {filters.keywords}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange("keywords", "")}
                    />
                  </Badge>
                )}
                {filters.location && (
                  <Badge variant="secondary" className="gap-1">
                    Location: {filters.location}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange("location", "")}
                    />
                  </Badge>
                )}
                {filters.companyName && (
                  <Badge variant="secondary" className="gap-1">
                    Company: {filters.companyName}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange("companyName", "")}
                    />
                  </Badge>
                )}
                {filters.jobTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="gap-1">
                    {jobTypeOptions.find((o) => o.value === type)?.label}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() =>
                        handleArrayFilterChange("jobTypes", type, false)
                      }
                    />
                  </Badge>
                ))}
                {filters.workModes.map((mode) => (
                  <Badge key={mode} variant="secondary" className="gap-1">
                    {workModeOptions.find((o) => o.value === mode)?.label}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() =>
                        handleArrayFilterChange("workModes", mode, false)
                      }
                    />
                  </Badge>
                ))}
                {filters.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() =>
                        handleArrayFilterChange("skills", skill, false)
                      }
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

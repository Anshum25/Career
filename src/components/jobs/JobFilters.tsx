import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  FilterIcon,
  XIcon,
  MapPinIcon,
  DollarSignIcon,
  BriefcaseIcon,
  BuildingIcon,
  ClockIcon,
  TagIcon,
  TrendingUp,
} from "lucide-react";

interface FiltersType {
  jobTypes: string[];
  workModes: string[];
  experienceLevels: string[];
  salaryRange: number[];
  companies: string[];
  skills: string[];
  postedWithin: string;
}

interface JobFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
}

export default function JobFilters({
  filters,
  onFiltersChange,
}: JobFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const jobTypeOptions = [
    { value: "full_time", label: "Full Time" },
    { value: "part_time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];

  const workModeOptions = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "On-site" },
  ];

  const experienceLevelOptions = [
    { value: "entry", label: "Entry Level" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior Level" },
    { value: "executive", label: "Executive" },
  ];

  const postedWithinOptions = [
    { value: "all", label: "Any time" },
    { value: "1", label: "Last 24 hours" },
    { value: "3", label: "Last 3 days" },
    { value: "7", label: "Last week" },
    { value: "14", label: "Last 2 weeks" },
    { value: "30", label: "Last month" },
  ];

  const popularSkills = [
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "JavaScript",
    "AWS",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "MongoDB",
    "Machine Learning",
    "Data Science",
    "UX Design",
    "Figma",
    "Product Management",
    "Marketing",
    "Sales",
    "Analytics",
  ];

  const topCompanies = [
    "TechCorp",
    "InnovateInc",
    "GrowthCo",
    "DataFlow Systems",
    "HealthTech Solutions",
    "AI Dynamics",
    "Cloud Solutions",
  ];

  const updateFilter = (key: keyof FiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleArrayFilter = (
    key: "jobTypes" | "workModes" | "experienceLevels" | "companies" | "skills",
    value: string,
  ) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      jobTypes: [],
      workModes: [],
      experienceLevels: [],
      salaryRange: [0, 200000],
      companies: [],
      skills: [],
      postedWithin: "all",
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.jobTypes.length > 0) count++;
    if (filters.workModes.length > 0) count++;
    if (filters.experienceLevels.length > 0) count++;
    if (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 200000) count++;
    if (filters.companies.length > 0) count++;
    if (filters.skills.length > 0) count++;
    if (filters.postedWithin !== "all") count++;
    return count;
  };

  const formatSalary = (amount: number) => {
    if (amount >= 1000) {
      return `$${Math.round(amount / 1000)}k`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FilterIcon className="w-5 h-5" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </CardTitle>
          {getActiveFiltersCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <XIcon className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Posted Within */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            Posted Within
          </Label>
          <Select
            value={filters.postedWithin}
            onValueChange={(value) => updateFilter("postedWithin", value)}
          >
            <SelectTrigger>
              <SelectValue />
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

        <Separator />

        {/* Job Type */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <BriefcaseIcon className="w-4 h-4" />
            Job Type
          </Label>
          <div className="space-y-2">
            {jobTypeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`jobType-${option.value}`}
                  checked={filters.jobTypes.includes(option.value)}
                  onCheckedChange={() =>
                    toggleArrayFilter("jobTypes", option.value)
                  }
                />
                <Label htmlFor={`jobType-${option.value}`} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Work Mode */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            Work Mode
          </Label>
          <div className="space-y-2">
            {workModeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`workMode-${option.value}`}
                  checked={filters.workModes.includes(option.value)}
                  onCheckedChange={() =>
                    toggleArrayFilter("workModes", option.value)
                  }
                />
                <Label htmlFor={`workMode-${option.value}`} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Experience Level */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <TrendingUpIcon className="w-4 h-4" />
            Experience Level
          </Label>
          <div className="space-y-2">
            {experienceLevelOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`experience-${option.value}`}
                  checked={filters.experienceLevels.includes(option.value)}
                  onCheckedChange={() =>
                    toggleArrayFilter("experienceLevels", option.value)
                  }
                />
                <Label
                  htmlFor={`experience-${option.value}`}
                  className="text-sm"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Salary Range */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <DollarSignIcon className="w-4 h-4" />
            Salary Range
          </Label>
          <div className="space-y-4">
            <Slider
              value={filters.salaryRange}
              onValueChange={(value) => updateFilter("salaryRange", value)}
              max={200000}
              min={0}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatSalary(filters.salaryRange[0])}</span>
              <span>{formatSalary(filters.salaryRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Expandable Filters */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "More Filters"}
          </Button>

          {isExpanded && (
            <div className="space-y-6">
              <Separator />

              {/* Companies */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <BuildingIcon className="w-4 h-4" />
                  Companies
                </Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {topCompanies.map((company) => (
                    <div key={company} className="flex items-center space-x-2">
                      <Checkbox
                        id={`company-${company}`}
                        checked={filters.companies.includes(company)}
                        onCheckedChange={() =>
                          toggleArrayFilter("companies", company)
                        }
                      />
                      <Label htmlFor={`company-${company}`} className="text-sm">
                        {company}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Skills */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <TagIcon className="w-4 h-4" />
                  Skills
                </Label>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                  {popularSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={filters.skills.includes(skill)}
                        onCheckedChange={() =>
                          toggleArrayFilter("skills", skill)
                        }
                      />
                      <Label htmlFor={`skill-${skill}`} className="text-sm">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Summary */}
        {getActiveFiltersCount() > 0 && (
          <div className="space-y-3">
            <Separator />
            <div>
              <Label className="text-sm font-medium">Active Filters:</Label>
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.jobTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {jobTypeOptions.find((o) => o.value === type)?.label}
                  </Badge>
                ))}
                {filters.workModes.map((mode) => (
                  <Badge key={mode} variant="secondary" className="text-xs">
                    {workModeOptions.find((o) => o.value === mode)?.label}
                  </Badge>
                ))}
                {filters.experienceLevels.map((level) => (
                  <Badge key={level} variant="secondary" className="text-xs">
                    {
                      experienceLevelOptions.find((o) => o.value === level)
                        ?.label
                    }
                  </Badge>
                ))}
                {(filters.salaryRange[0] > 0 ||
                  filters.salaryRange[1] < 200000) && (
                  <Badge variant="secondary" className="text-xs">
                    {formatSalary(filters.salaryRange[0])} -{" "}
                    {formatSalary(filters.salaryRange[1])}
                  </Badge>
                )}
                {filters.companies.slice(0, 2).map((company) => (
                  <Badge key={company} variant="secondary" className="text-xs">
                    {company}
                  </Badge>
                ))}
                {filters.skills.slice(0, 2).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

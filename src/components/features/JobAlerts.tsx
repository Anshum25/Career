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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  BellIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  FilterIcon,
  MailIcon,
  SmartphoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  DollarSignIcon,
  ClockIcon,
} from "lucide-react";

interface JobAlert {
  id: string;
  name: string;
  keywords: string[];
  locations: string[];
  experience: string;
  salaryMin: number;
  salaryMax: number;
  jobTypes: string[];
  companies: string[];
  frequency: "instant" | "daily" | "weekly";
  emailEnabled: boolean;
  smsEnabled: boolean;
  active: boolean;
  matchingJobs: number;
  lastSent: string;
  createdAt: string;
}

export default function JobAlerts() {
  const [alerts, setAlerts] = useState<JobAlert[]>([
    {
      id: "1",
      name: "React Developer Jobs",
      keywords: ["React", "Frontend", "JavaScript"],
      locations: ["Bangalore", "Mumbai", "Pune"],
      experience: "2-5 years",
      salaryMin: 800000,
      salaryMax: 1500000,
      jobTypes: ["Full-time", "Remote"],
      companies: [],
      frequency: "daily",
      emailEnabled: true,
      smsEnabled: false,
      active: true,
      matchingJobs: 23,
      lastSent: "2024-01-15",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Senior Backend Developer",
      keywords: ["Node.js", "Python", "Backend", "API"],
      locations: ["Hyderabad", "Chennai"],
      experience: "5-8 years",
      salaryMin: 1200000,
      salaryMax: 2500000,
      jobTypes: ["Full-time"],
      companies: ["Google", "Microsoft", "Amazon"],
      frequency: "instant",
      emailEnabled: true,
      smsEnabled: true,
      active: true,
      matchingJobs: 8,
      lastSent: "2024-01-15",
      createdAt: "2024-01-05",
    },
    {
      id: "3",
      name: "Product Manager Opportunities",
      keywords: ["Product Manager", "PM", "Strategy"],
      locations: ["Delhi", "Gurgaon", "Noida"],
      experience: "3-7 years",
      salaryMin: 1500000,
      salaryMax: 3000000,
      jobTypes: ["Full-time", "Contract"],
      companies: [],
      frequency: "weekly",
      emailEnabled: true,
      smsEnabled: false,
      active: false,
      matchingJobs: 12,
      lastSent: "2024-01-08",
      createdAt: "2023-12-20",
    },
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingAlert, setEditingAlert] = useState<JobAlert | null>(null);
  const [newAlert, setNewAlert] = useState<Partial<JobAlert>>({
    name: "",
    keywords: [],
    locations: [],
    experience: "",
    salaryMin: 0,
    salaryMax: 0,
    jobTypes: [],
    companies: [],
    frequency: "daily",
    emailEnabled: true,
    smsEnabled: false,
    active: true,
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");

  const { toast } = useToast();

  const handleCreateAlert = () => {
    if (!newAlert.name || !newAlert.keywords?.length) {
      toast({
        title: "Missing Information",
        description: "Please provide alert name and at least one keyword.",
        variant: "destructive",
      });
      return;
    }

    const alert: JobAlert = {
      id: Date.now().toString(),
      name: newAlert.name!,
      keywords: newAlert.keywords!,
      locations: newAlert.locations || [],
      experience: newAlert.experience || "",
      salaryMin: newAlert.salaryMin || 0,
      salaryMax: newAlert.salaryMax || 0,
      jobTypes: newAlert.jobTypes || [],
      companies: newAlert.companies || [],
      frequency: newAlert.frequency || "daily",
      emailEnabled: newAlert.emailEnabled || true,
      smsEnabled: newAlert.smsEnabled || false,
      active: true,
      matchingJobs: Math.floor(Math.random() * 50),
      lastSent: "",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setAlerts((prev) => [alert, ...prev]);
    setShowCreateDialog(false);
    setNewAlert({
      name: "",
      keywords: [],
      locations: [],
      experience: "",
      salaryMin: 0,
      salaryMax: 0,
      jobTypes: [],
      companies: [],
      frequency: "daily",
      emailEnabled: true,
      smsEnabled: false,
      active: true,
    });
    setKeywordInput("");
    setLocationInput("");
    setCompanyInput("");

    toast({
      title: "Job Alert Created",
      description: `Your job alert "${alert.name}" has been created successfully.`,
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, active: !alert.active } : alert,
      ),
    );
    toast({
      title: "Alert Updated",
      description: "Job alert status has been updated.",
    });
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "Job alert has been deleted successfully.",
    });
  };

  const addKeyword = () => {
    if (
      keywordInput.trim() &&
      !newAlert.keywords?.includes(keywordInput.trim())
    ) {
      setNewAlert((prev) => ({
        ...prev,
        keywords: [...(prev.keywords || []), keywordInput.trim()],
      }));
      setKeywordInput("");
    }
  };

  const addLocation = () => {
    if (
      locationInput.trim() &&
      !newAlert.locations?.includes(locationInput.trim())
    ) {
      setNewAlert((prev) => ({
        ...prev,
        locations: [...(prev.locations || []), locationInput.trim()],
      }));
      setLocationInput("");
    }
  };

  const addCompany = () => {
    if (
      companyInput.trim() &&
      !newAlert.companies?.includes(companyInput.trim())
    ) {
      setNewAlert((prev) => ({
        ...prev,
        companies: [...(prev.companies || []), companyInput.trim()],
      }));
      setCompanyInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setNewAlert((prev) => ({
      ...prev,
      keywords: prev.keywords?.filter((k) => k !== keyword) || [],
    }));
  };

  const removeLocation = (location: string) => {
    setNewAlert((prev) => ({
      ...prev,
      locations: prev.locations?.filter((l) => l !== location) || [],
    }));
  };

  const removeCompany = (company: string) => {
    setNewAlert((prev) => ({
      ...prev,
      companies: prev.companies?.filter((c) => c !== company) || [],
    }));
  };

  const formatSalary = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getFrequencyBadgeColor = (frequency: string) => {
    switch (frequency) {
      case "instant":
        return "default";
      case "daily":
        return "secondary";
      case "weekly":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Alerts</h1>
            <p className="text-muted-foreground">
              Get notified when jobs matching your criteria are posted
            </p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Job Alert</DialogTitle>
                <DialogDescription>
                  Set up a personalized job alert to get notified about relevant
                  opportunities
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="alertName">Alert Name *</Label>
                  <Input
                    id="alertName"
                    placeholder="e.g., React Developer Jobs"
                    value={newAlert.name}
                    onChange={(e) =>
                      setNewAlert((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Keywords *</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add skills, job titles, or keywords"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                    />
                    <Button type="button" onClick={addKeyword}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newAlert.keywords?.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {keyword}
                        <button onClick={() => removeKeyword(keyword)}>
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Locations</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add cities or locations"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addLocation()}
                    />
                    <Button type="button" onClick={addLocation}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newAlert.locations?.map((location) => (
                      <Badge
                        key={location}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <MapPinIcon className="h-3 w-3" />
                        {location}
                        <button onClick={() => removeLocation(location)}>
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select
                      value={newAlert.experience}
                      onValueChange={(value) =>
                        setNewAlert((prev) => ({ ...prev, experience: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1 years">0-1 years</SelectItem>
                        <SelectItem value="1-3 years">1-3 years</SelectItem>
                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                        <SelectItem value="5-8 years">5-8 years</SelectItem>
                        <SelectItem value="8+ years">8+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Alert Frequency</Label>
                    <Select
                      value={newAlert.frequency}
                      onValueChange={(value: "instant" | "daily" | "weekly") =>
                        setNewAlert((prev) => ({ ...prev, frequency: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">Instant</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Minimum Salary (Annual)</Label>
                    <Input
                      type="number"
                      placeholder="₹800000"
                      value={newAlert.salaryMin || ""}
                      onChange={(e) =>
                        setNewAlert((prev) => ({
                          ...prev,
                          salaryMin: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Salary (Annual)</Label>
                    <Input
                      type="number"
                      placeholder="₹1500000"
                      value={newAlert.salaryMax || ""}
                      onChange={(e) =>
                        setNewAlert((prev) => ({
                          ...prev,
                          salaryMax: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Job Types</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Full-time",
                      "Part-time",
                      "Contract",
                      "Remote",
                      "Freelance",
                      "Internship",
                    ].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={newAlert.jobTypes?.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewAlert((prev) => ({
                                ...prev,
                                jobTypes: [...(prev.jobTypes || []), type],
                              }));
                            } else {
                              setNewAlert((prev) => ({
                                ...prev,
                                jobTypes:
                                  prev.jobTypes?.filter((t) => t !== type) ||
                                  [],
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={type}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Target Companies (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add company names"
                      value={companyInput}
                      onChange={(e) => setCompanyInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addCompany()}
                    />
                    <Button type="button" onClick={addCompany}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newAlert.companies?.map((company) => (
                      <Badge
                        key={company}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <BuildingIcon className="h-3 w-3" />
                        {company}
                        <button onClick={() => removeCompany(company)}>
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Notification Preferences</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                        <span>Email Notifications</span>
                      </div>
                      <Switch
                        checked={newAlert.emailEnabled}
                        onCheckedChange={(checked) =>
                          setNewAlert((prev) => ({
                            ...prev,
                            emailEnabled: checked,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SmartphoneIcon className="h-4 w-4 text-muted-foreground" />
                        <span>SMS Notifications</span>
                      </div>
                      <Switch
                        checked={newAlert.smsEnabled}
                        onCheckedChange={(checked) =>
                          setNewAlert((prev) => ({
                            ...prev,
                            smsEnabled: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAlert}>Create Alert</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BellIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{alerts.length}</p>
                  <p className="text-sm text-muted-foreground">Total Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <SearchIcon className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {alerts.filter((a) => a.active).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {alerts.reduce((sum, alert) => sum + alert.matchingJobs, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Matching Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MailIcon className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Alerts Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`transition-all ${!alert.active ? "opacity-60" : ""}`}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{alert.name}</h3>
                        <Badge
                          variant={getFrequencyBadgeColor(alert.frequency)}
                        >
                          {alert.frequency}
                        </Badge>
                        {!alert.active && (
                          <Badge variant="secondary">Paused</Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {alert.keywords.map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="outline"
                            className="text-xs"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        {alert.locations.length > 0 && (
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="h-4 w-4" />
                            <span>
                              {alert.locations.slice(0, 2).join(", ")}
                              {alert.locations.length > 2 &&
                                ` +${alert.locations.length - 2} more`}
                            </span>
                          </div>
                        )}

                        {alert.experience && (
                          <div className="flex items-center gap-1">
                            <BriefcaseIcon className="h-4 w-4" />
                            <span>{alert.experience}</span>
                          </div>
                        )}

                        {(alert.salaryMin > 0 || alert.salaryMax > 0) && (
                          <div className="flex items-center gap-1">
                            <DollarSignIcon className="h-4 w-4" />
                            <span>
                              {alert.salaryMin > 0
                                ? formatSalary(alert.salaryMin)
                                : "Any"}{" "}
                              -{" "}
                              {alert.salaryMax > 0
                                ? formatSalary(alert.salaryMax)
                                : "Any"}
                            </span>
                          </div>
                        )}

                        {alert.lastSent && (
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>Last sent: {alert.lastSent}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {alert.matchingJobs}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          matching jobs
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAlert(alert.id)}
                        >
                          {alert.active ? "Pause" : "Resume"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteAlert(alert.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MailIcon className="h-4 w-4" />
                        <span>{alert.emailEnabled ? "Email" : "No Email"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <SmartphoneIcon className="h-4 w-4" />
                        <span>{alert.smsEnabled ? "SMS" : "No SMS"}</span>
                      </div>
                    </div>
                    <Button variant="link" size="sm">
                      View Matching Jobs →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {alerts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BellIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Job Alerts Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first job alert to get notified about relevant
                opportunities
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Your First Alert
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

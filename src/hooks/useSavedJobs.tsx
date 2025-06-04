import { useState, useEffect, useCallback } from "react";
import { Job } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface SavedJob extends Job {
  savedAt: Date;
  notes?: string;
  priority: "high" | "medium" | "low";
  applicationStatus:
    | "not_applied"
    | "applied"
    | "interviewing"
    | "offered"
    | "rejected";
}

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    const loadSavedJobs = () => {
      try {
        const saved = localStorage.getItem("savedJobs");
        if (saved) {
          const jobs = JSON.parse(saved).map((job: any) => ({
            ...job,
            savedAt: new Date(job.savedAt),
            postedAt: new Date(job.postedAt),
            applicationDeadline: job.applicationDeadline
              ? new Date(job.applicationDeadline)
              : undefined,
          }));
          setSavedJobs(jobs);
        }
      } catch (error) {
        console.error("Error loading saved jobs:", error);
        toast({
          title: "Error",
          description: "Failed to load saved jobs",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSavedJobs();
  }, [toast]);

  // Save to localStorage whenever savedJobs changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    }
  }, [savedJobs, loading]);

  const saveJob = useCallback(
    (job: Job, priority: "high" | "medium" | "low" = "medium") => {
      const savedJob: SavedJob = {
        ...job,
        savedAt: new Date(),
        priority,
        applicationStatus: "not_applied",
      };

      setSavedJobs((prev) => {
        // Check if job is already saved
        if (prev.some((savedJob) => savedJob.id === job.id)) {
          toast({
            title: "Already Saved",
            description: "This job is already in your saved list",
          });
          return prev;
        }

        toast({
          title: "Job Saved",
          description: `${job.title} at ${job.company.name} has been saved`,
        });

        return [savedJob, ...prev];
      });
    },
    [toast],
  );

  const removeSavedJob = useCallback(
    (jobId: string) => {
      setSavedJobs((prev) => {
        const job = prev.find((j) => j.id === jobId);
        if (job) {
          toast({
            title: "Job Removed",
            description: `${job.title} has been removed from your saved list`,
          });
        }
        return prev.filter((job) => job.id !== jobId);
      });
    },
    [toast],
  );

  const isJobSaved = useCallback(
    (jobId: string) => {
      return savedJobs.some((job) => job.id === jobId);
    },
    [savedJobs],
  );

  const updateJobPriority = useCallback(
    (jobId: string, priority: "high" | "medium" | "low") => {
      setSavedJobs((prev) =>
        prev.map((job) => (job.id === jobId ? { ...job, priority } : job)),
      );
    },
    [],
  );

  const updateApplicationStatus = useCallback(
    (jobId: string, status: SavedJob["applicationStatus"]) => {
      setSavedJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, applicationStatus: status } : job,
        ),
      );
    },
    [],
  );

  const addJobNote = useCallback((jobId: string, notes: string) => {
    setSavedJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, notes } : job)),
    );
  }, []);

  const getSavedJob = useCallback(
    (jobId: string) => {
      return savedJobs.find((job) => job.id === jobId);
    },
    [savedJobs],
  );

  const getJobsByStatus = useCallback(
    (status: SavedJob["applicationStatus"]) => {
      return savedJobs.filter((job) => job.applicationStatus === status);
    },
    [savedJobs],
  );

  const getJobsByPriority = useCallback(
    (priority: "high" | "medium" | "low") => {
      return savedJobs.filter((job) => job.priority === priority);
    },
    [savedJobs],
  );

  const getHighPriorityJobs = useCallback(() => {
    return getJobsByPriority("high");
  }, [getJobsByPriority]);

  const getUnappliedJobs = useCallback(() => {
    return getJobsByStatus("not_applied");
  }, [getJobsByStatus]);

  const clearAllSavedJobs = useCallback(() => {
    setSavedJobs([]);
    toast({
      title: "All Jobs Cleared",
      description: "All saved jobs have been removed",
    });
  }, [toast]);

  const exportSavedJobs = useCallback(() => {
    const dataStr = JSON.stringify(savedJobs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "saved-jobs.json";
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Your saved jobs have been exported",
    });
  }, [savedJobs, toast]);

  return {
    savedJobs,
    loading,
    saveJob,
    removeSavedJob,
    isJobSaved,
    updateJobPriority,
    updateApplicationStatus,
    addJobNote,
    getSavedJob,
    getJobsByStatus,
    getJobsByPriority,
    getHighPriorityJobs,
    getUnappliedJobs,
    clearAllSavedJobs,
    exportSavedJobs,
    totalSaved: savedJobs.length,
    highPriorityCount: savedJobs.filter((job) => job.priority === "high")
      .length,
    unappliedCount: savedJobs.filter(
      (job) => job.applicationStatus === "not_applied",
    ).length,
  };
}

// API service layer for backend integration
// This provides a clean interface for all API calls

import { Job, User, Application, Company } from "./types";

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

// Types for API responses
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// HTTP client wrapper
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem("authToken");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  async upload(
    endpoint: string,
    file: File,
    additionalData?: any,
  ): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.request(endpoint, {
      method: "POST",
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL);

// Authentication API
export const authApi = {
  login: async (
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> => {
    // Mock implementation - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockResponse = {
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        role: "job_seeker" as const,
        verified: true,
        createdAt: new Date(),
      },
      token: `mock_token_${Date.now()}`,
    };

    apiClient.setToken(mockResponse.token);
    return mockResponse;
  },

  register: async (userData: {
    email: string;
    password: string;
    name: string;
    role: "job_seeker" | "recruiter";
  }): Promise<{ user: User; token: string }> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockResponse = {
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        verified: false,
        createdAt: new Date(),
      },
      token: `mock_token_${Date.now()}`,
    };

    apiClient.setToken(mockResponse.token);
    return mockResponse;
  },

  logout: async (): Promise<void> => {
    apiClient.setToken(null);
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post<{ token: string }>("/auth/refresh");
    if (response.data?.token) {
      apiClient.setToken(response.data.token);
    }
    return response.data!;
  },

  verifyEmail: async (token: string): Promise<void> => {
    await apiClient.post("/auth/verify-email", { token });
  },

  resetPassword: async (email: string): Promise<void> => {
    await apiClient.post("/auth/reset-password", { email });
  },
};

// Jobs API
export const jobsApi = {
  getJobs: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
    jobType?: string;
    workMode?: string;
    salaryMin?: number;
    salaryMax?: number;
    experienceLevel?: string;
    skills?: string[];
    company?: string;
  }): Promise<PaginatedResponse<Job>> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { mockJobs } = await import("./mockData");

    // Apply basic filtering for demo
    let filteredJobs = [...mockJobs];

    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.name.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower),
      );
    }

    if (params?.location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.city
          .toLowerCase()
          .includes(params.location!.toLowerCase()),
      );
    }

    if (params?.jobType) {
      filteredJobs = filteredJobs.filter(
        (job) => job.jobType === params.jobType,
      );
    }

    if (params?.workMode) {
      filteredJobs = filteredJobs.filter(
        (job) => job.workMode === params.workMode,
      );
    }

    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    return {
      data: paginatedJobs,
      total: filteredJobs.length,
      page,
      limit,
      hasNext: endIndex < filteredJobs.length,
      hasPrev: page > 1,
    };
  },

  getJob: async (id: string): Promise<Job> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const { mockJobs } = await import("./mockData");
    const job = mockJobs.find((j) => j.id === id);

    if (!job) {
      throw new Error("Job not found");
    }

    return job;
  },

  createJob: async (jobData: Partial<Job>): Promise<Job> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      title: jobData.title || "",
      company:
        jobData.company ||
        ({ id: "1", name: "Company", logo: "/placeholder.svg" } as Company),
      description: jobData.description || "",
      requirements: jobData.requirements || [],
      responsibilities: jobData.responsibilities || [],
      location: jobData.location || {
        city: "",
        state: "",
        country: "USA",
        coordinates: { lat: 0, lng: 0 },
      },
      workMode: jobData.workMode || "remote",
      jobType: jobData.jobType || "full_time",
      experienceLevel: jobData.experienceLevel || "mid",
      salary: jobData.salary || {
        min: 0,
        max: 0,
        currency: "USD",
        period: "year",
      },
      skills: jobData.skills || [],
      benefits: jobData.benefits || [],
      postedAt: new Date(),
      applicationDeadline: jobData.applicationDeadline,
      applicationsCount: 0,
      viewsCount: 0,
      featured: jobData.featured || false,
      urgent: jobData.urgent || false,
      matchScore: 0,
      moodTags: jobData.moodTags || [],
    };

    return newJob;
  },

  updateJob: async (id: string, jobData: Partial<Job>): Promise<Job> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock update - in real app, this would update the job in the database
    const existingJob = await jobsApi.getJob(id);
    return { ...existingJob, ...jobData };
  },

  deleteJob: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Mock delete
  },

  applyToJob: async (
    jobId: string,
    applicationData: any,
  ): Promise<Application> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const application: Application = {
      id: Math.random().toString(36).substr(2, 9),
      jobId,
      candidateId: "current_user_id",
      status: "pending",
      appliedAt: new Date(),
      ...applicationData,
    };

    return application;
  },
};

// Applications API
export const applicationsApi = {
  getApplications: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    jobId?: string;
    candidateId?: string;
  }): Promise<PaginatedResponse<Application>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock applications data
    const mockApplications: Application[] = [
      {
        id: "1",
        jobId: "job-1",
        candidateId: "user-1",
        status: "pending",
        appliedAt: new Date("2024-01-15"),
        coverLetter: "I am very interested in this position...",
        resumeUrl: "/uploads/resume/resume-1.pdf",
      },
      // Add more mock applications as needed
    ];

    // Apply filtering
    let filteredApplications = [...mockApplications];

    if (params?.status) {
      filteredApplications = filteredApplications.filter(
        (app) => app.status === params.status,
      );
    }

    if (params?.jobId) {
      filteredApplications = filteredApplications.filter(
        (app) => app.jobId === params.jobId,
      );
    }

    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedApplications = filteredApplications.slice(
      startIndex,
      endIndex,
    );

    return {
      data: paginatedApplications,
      total: filteredApplications.length,
      page,
      limit,
      hasNext: endIndex < filteredApplications.length,
      hasPrev: page > 1,
    };
  },

  getApplication: async (id: string): Promise<Application> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock single application
    const application: Application = {
      id,
      jobId: "job-1",
      candidateId: "user-1",
      status: "pending",
      appliedAt: new Date(),
      coverLetter: "Mock cover letter content...",
      resumeUrl: "/uploads/resume/mock-resume.pdf",
    };

    return application;
  },

  updateApplicationStatus: async (
    id: string,
    status: string,
  ): Promise<Application> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const application = await applicationsApi.getApplication(id);
    return { ...application, status };
  },
};

// Users API
export const usersApi = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>("/users/profile");
    return response.data!;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>("/users/profile", userData);
    return response.data!;
  },

  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const response = await apiClient.upload("/users/avatar", file);
    return response.data!;
  },

  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }): Promise<PaginatedResponse<User>> => {
    // Mock implementation for admin
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUsers: User[] = [
      {
        id: "1",
        email: "user1@example.com",
        name: "John Doe",
        role: "job_seeker",
        verified: true,
        createdAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        email: "recruiter@company.com",
        name: "Jane Smith",
        role: "recruiter",
        verified: true,
        createdAt: new Date("2024-01-05"),
      },
    ];

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = mockUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total: mockUsers.length,
      page,
      limit,
      hasNext: endIndex < mockUsers.length,
      hasPrev: page > 1,
    };
  },
};

// Companies API
export const companiesApi = {
  getCompanies: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    industry?: string;
  }): Promise<PaginatedResponse<Company>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { mockCompanies } = await import("./mockData");

    // Apply filtering
    let filteredCompanies = [...mockCompanies];

    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredCompanies = filteredCompanies.filter(
        (company) =>
          company.name.toLowerCase().includes(searchLower) ||
          company.industry.toLowerCase().includes(searchLower),
      );
    }

    if (params?.industry) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.industry === params.industry,
      );
    }

    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

    return {
      data: paginatedCompanies,
      total: filteredCompanies.length,
      page,
      limit,
      hasNext: endIndex < filteredCompanies.length,
      hasPrev: page > 1,
    };
  },

  getCompany: async (id: string): Promise<Company> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const { mockCompanies } = await import("./mockData");
    const company = mockCompanies.find((c) => c.id === id);

    if (!company) {
      throw new Error("Company not found");
    }

    return company;
  },
};

// Analytics API (for admin/recruiters)
export const analyticsApi = {
  getDashboardStats: async (): Promise<{
    totalJobs: number;
    totalApplications: number;
    totalUsers: number;
    totalCompanies: number;
    jobsThisMonth: number;
    applicationsThisMonth: number;
    usersThisMonth: number;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      totalJobs: 3456,
      totalApplications: 12847,
      totalUsers: 15234,
      totalCompanies: 1789,
      jobsThisMonth: 234,
      applicationsThisMonth: 1678,
      usersThisMonth: 892,
    };
  },

  getJobStats: async (
    jobId: string,
  ): Promise<{
    views: number;
    applications: number;
    avgMatchScore: number;
    topSources: string[];
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      views: 1234,
      applications: 89,
      avgMatchScore: 82,
      topSources: [
        "Direct Search",
        "Company Page",
        "Job Alerts",
        "Social Media",
      ],
    };
  },
};

// Error handling utility
export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public data?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Request interceptor for handling common errors
export function handleApiError(error: any): never {
  if (error.status === 401) {
    // Unauthorized - redirect to login
    authApi.logout();
    window.location.href = "/login";
  }

  throw new ApiError(
    error.message || "An unexpected error occurred",
    error.status,
    error.data,
  );
}

// Export the API client for custom requests
export { apiClient };

// Export all APIs as a single object
export const api = {
  auth: authApi,
  jobs: jobsApi,
  applications: applicationsApi,
  users: usersApi,
  companies: companiesApi,
  analytics: analyticsApi,
};

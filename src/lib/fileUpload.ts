// File upload utilities for handling resumes, documents, and media files

export interface UploadResult {
  success: boolean;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  error?: string;
}

export interface FileValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  allowedExtensions?: string[];
}

export const FILE_TYPES = {
  RESUME: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    allowedExtensions: [".pdf", ".doc", ".docx"],
  },
  VIDEO: {
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/webm",
    ],
    allowedExtensions: [".mp4", ".mov", ".avi", ".webm"],
  },
  IMAGE: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    allowedExtensions: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  },
  DOCUMENT: {
    maxSize: 25 * 1024 * 1024, // 25MB
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ],
    allowedExtensions: [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt"],
  },
};

/**
 * Validates a file against the specified options
 */
export function validateFile(
  file: File,
  options: FileValidationOptions,
): { isValid: boolean; error?: string } {
  const { maxSize, allowedTypes, allowedExtensions } = options;

  // Check file size
  if (maxSize && file.size > maxSize) {
    return {
      isValid: false,
      error: `File size (${formatFileSize(file.size)}) exceeds maximum allowed size (${formatFileSize(maxSize)})`,
    };
  }

  // Check file type
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type "${file.type}" is not allowed. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  // Check file extension
  if (allowedExtensions) {
    const fileExtension = getFileExtension(file.name);
    if (!allowedExtensions.includes(fileExtension)) {
      return {
        isValid: false,
        error: `File extension "${fileExtension}" is not allowed. Allowed extensions: ${allowedExtensions.join(", ")}`,
      };
    }
  }

  return { isValid: true };
}

/**
 * Formats file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Gets file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
}

/**
 * Generates a unique filename
 */
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = getFileExtension(originalName);
  const baseName = originalName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9]/g, "_");

  return `${baseName}_${timestamp}_${randomString}.${extension}`;
}

/**
 * Simulated file upload function (replace with actual implementation)
 * In a real app, this would upload to cloud storage like AWS S3, Google Cloud, etc.
 */
export async function uploadFile(
  file: File,
  type: "resume" | "video" | "image" | "document",
  onProgress?: (progress: number) => void,
): Promise<UploadResult> {
  try {
    // Validate file based on type
    const validation = validateFile(
      file,
      FILE_TYPES[type.toUpperCase() as keyof typeof FILE_TYPES],
    );
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // Simulate upload progress
    if (onProgress) {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        onProgress(i);
      }
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate mock file URL (in real app, this would be the actual cloud storage URL)
    const uniqueFilename = generateUniqueFilename(file.name);
    const mockFileUrl = `/uploads/${type}/${uniqueFilename}`;

    return {
      success: true,
      fileUrl: mockFileUrl,
      fileName: file.name,
      fileSize: file.size,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Uploads multiple files
 */
export async function uploadMultipleFiles(
  files: File[],
  type: "resume" | "video" | "image" | "document",
  onProgress?: (fileIndex: number, progress: number) => void,
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const result = await uploadFile(file, type, (progress) => {
      if (onProgress) {
        onProgress(i, progress);
      }
    });
    results.push(result);
  }

  return results;
}

/**
 * Creates a file download URL (for preview purposes)
 */
export function createFilePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Revokes a file preview URL to free memory
 */
export function revokeFilePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}

/**
 * Checks if a file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

/**
 * Checks if a file is a video
 */
export function isVideoFile(file: File): boolean {
  return file.type.startsWith("video/");
}

/**
 * Checks if a file is a PDF
 */
export function isPdfFile(file: File): boolean {
  return file.type === "application/pdf";
}

/**
 * Checks if a file is a document (Word, PDF, etc.)
 */
export function isDocumentFile(file: File): boolean {
  return FILE_TYPES.DOCUMENT.allowedTypes.includes(file.type);
}

/**
 * Extracts text content from uploaded files (mock implementation)
 * In a real app, this would use OCR or document parsing libraries
 */
export async function extractTextFromFile(file: File): Promise<string> {
  // Mock text extraction - in real app, you'd use libraries like:
  // - pdf-parse for PDFs
  // - mammoth for Word docs
  // - Tesseract.js for OCR on images

  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate processing time

  if (isPdfFile(file)) {
    return `[Extracted text from PDF: ${file.name}]\n\nThis is mock extracted text from the PDF document. In a real implementation, this would contain the actual text content extracted from the PDF file using a library like pdf-parse.`;
  }

  if (isDocumentFile(file)) {
    return `[Extracted text from document: ${file.name}]\n\nThis is mock extracted text from the document. In a real implementation, this would contain the actual text content extracted from Word documents using libraries like mammoth or docx-parser.`;
  }

  return "";
}

/**
 * Analyzes resume content and provides AI scoring (mock implementation)
 */
export async function analyzeResumeContent(
  text: string,
  jobDescription?: string,
): Promise<{
  score: number;
  strengths: string[];
  improvements: string[];
  skillsFound: string[];
  experienceLevel: string;
}> {
  // Simulate AI analysis time
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock analysis results
  const commonSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "SQL",
  ];
  const skillsFound = commonSkills.slice(0, Math.floor(Math.random() * 4) + 2);

  const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100

  const strengths = [
    "Strong technical background",
    "Relevant work experience",
    "Good educational background",
    "Clear career progression",
  ].slice(0, Math.floor(Math.random() * 2) + 2);

  const improvements = [
    "Add more specific achievements with metrics",
    "Include relevant certifications",
    "Highlight leadership experience",
    "Add keywords from job description",
  ].slice(0, Math.floor(Math.random() * 2) + 1);

  const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Lead Level",
  ];
  const experienceLevel =
    experienceLevels[Math.floor(Math.random() * experienceLevels.length)];

  return {
    score,
    strengths,
    improvements,
    skillsFound,
    experienceLevel,
  };
}

// File upload hook for React components
export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = async (
    file: File,
    type: "resume" | "video" | "image" | "document",
  ): Promise<UploadResult> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const result = await uploadFile(file, type, setProgress);

      if (!result.success) {
        setError(result.error || "Upload failed");
      }

      return result;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return {
    upload,
    uploading,
    progress,
    error,
    clearError: () => setError(null),
  };
}

// React useState import for the hook
import { useState } from "react";

// Security sanitizer & file upload validator
const ALLOWED_CAD_EXTENSIONS = [".zip", ".rar", ".tar.gz", ".pdf", ".gerber", ".gbr", ".dxf", ".dwg"];
const FORBIDDEN_EXTENSIONS = [
  ".exe", ".bat", ".cmd", ".sh", ".php", ".py", ".js", ".vbs", ".msi", ".jar", ".html", ".svg"
];
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  sanitizedName?: string;
}

export function validateGerberFileUpload(
  fileName: string,
  fileSizeBytes: number
): FileValidationResult {
  const lowerName = fileName.toLowerCase().trim();

  // 1. File size check
  if (fileSizeBytes > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 50MB limit. Uploaded size: ${(fileSizeBytes / (1024 * 1024)).toFixed(1)}MB.`,
    };
  }

  // 2. Reject malicious executable extensions
  for (const forbidden of FORBIDDEN_EXTENSIONS) {
    if (lowerName.endsWith(forbidden)) {
      return {
        valid: false,
        error: `Executable or script files (${forbidden}) are strictly prohibited for security reasons.`,
      };
    }
  }

  // 3. Whitelist CAD / Gerber extensions
  const hasAllowedExt = ALLOWED_CAD_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  if (!hasAllowedExt) {
    return {
      valid: false,
      error: `Invalid file format. Please upload a CAD archive in ${ALLOWED_CAD_EXTENSIONS.join(", ")} format.`,
    };
  }

  // 4. Sanitize file name (remove path traversal & special chars)
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

  return {
    valid: true,
    sanitizedName,
  };
}

/**
 * Basic XSS sanitization for user-submitted text fields
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

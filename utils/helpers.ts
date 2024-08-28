import { ToastVariants } from "@/types";

export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
      process?.env?.NEXT_PUBLIC_VERCEL_URL &&
        process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : // If neither is set, default to localhost for local development.
        "http://localhost:3000/";

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "");
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "");

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

export const getToastRedirect = ({
  path,
  toastType,
  toastTitle,
  toastDescription = "",
  disableButton = false,
  arbitraryParams = "",
}: {
  path: string;
  toastType: ToastVariants;
  toastTitle: string;
  toastDescription: string;
  disableButton: boolean;
  arbitraryParams: string;
}): string => {
  let redirectPath = `${path}?status=${toastType}&title=${encodeURIComponent(
    toastTitle
  )}`;

  if (toastDescription) {
    redirectPath += `&description=${encodeURIComponent(toastDescription)}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) =>
  getToastRedirect({
    path,
    toastType: "error",
    toastTitle: errorName,
    toastDescription: errorDescription,
    disableButton,
    arbitraryParams,
  });

export const getStatusRedirect = (
  path: string,
  status: ToastVariants,
  statusName: string,
  statusDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) =>
  getToastRedirect({
    path,
    toastType: status,
    toastTitle: statusName,
    toastDescription: statusDescription,
    disableButton,
    arbitraryParams,
  });

export function shortenFileName(
  fileName: string,
  maxLength: number = 20
): string {
  const extension = fileName.split(".").pop();
  const nameWithoutExtension = fileName.slice(0, -extension!.length - 1);

  if (nameWithoutExtension.length <= maxLength) {
    return fileName;
  }

  const shortenedName = `${nameWithoutExtension.slice(
    0,
    maxLength - 3
  )}...${extension}`;
  return shortenedName;
}

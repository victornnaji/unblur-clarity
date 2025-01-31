// import { creditsByPlan } from "@/config";
import { ToastVariants } from "@/types";
import moment from "moment";

export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
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
  arbitraryParams = ""
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
) => {
  return getToastRedirect({
    path,
    toastType: "error",
    toastTitle: errorName,
    toastDescription: errorDescription,
    disableButton,
    arbitraryParams
  });
};

export const getStatusRedirect = (
  path: string,
  status: ToastVariants,
  statusName: string,
  statusDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) => {
  return getToastRedirect({
    path,
    toastType: status,
    toastTitle: statusName,
    toastDescription: statusDescription,
    disableButton,
    arbitraryParams
  });
};

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

export async function downloadPhoto(photoUrl: string, name: string) {
  if (!photoUrl) return;

  const response = await fetch(photoUrl);
  const blob = await response.blob();

  const fileExtension = blob.type.split("/")[1];

  const baseName = name.replace(/\.[^/.]+$/, "");

  const filename = `${baseName}_unblur-photos.${fileExtension}`;

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}

export const toDateTime = (secs: number) => {
  var t = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const formatTime = (time: string) => {
  return moment(time).fromNow();
};

export const formatName = (name: string) => {
  return name.replace(/[_\.\-\s]+/g, " ");
};

export function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export function calculateFairUpgradeCredits(
  originalPlanPrice: number,
  newPlanPrice: number,
  newPlanCredits: number,
  upgradeCost: number,
  unusedCredits: number
): number {
  // Calculate the proportion of the new plan paid for
  const proportionPaid = (originalPlanPrice + upgradeCost) / newPlanPrice;

  // Calculate remaining credits from the old plan
  const remainingOldPlanCredits = unusedCredits;

  // Calculate new credits based on the proportion of the new plan paid for
  const newCredits = Math.round(newPlanCredits * proportionPaid);

  // Sum up the credits, but cap at the maximum allowed by the new plan
  let fairCredits = Math.min(
    remainingOldPlanCredits + newCredits,
    newPlanCredits
  );

  return Math.max(fairCredits, 0);
}

// export const getCreditsForPlan = (planId: string) => {
//   const plan = Object.values(creditsByPlan).find((plan) => plan.id === planId);
//   return plan?.credits || 0;
// };

// export const getCreditAmount = (planId: string) => {
//   const creditAmount = getCreditsForPlan(planId);
//   if (!creditAmount) {
//     throw new Error("Invalid plan Id");
//   }
//   return creditAmount;
// };

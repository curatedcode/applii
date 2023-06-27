import { Status } from "@prisma/client";

function formatStatus(status: Status): string {
  switch (status) {
    case "needToApply":
      return "Need To Apply";
    case "applied":
      return "Applied";
    case "interviewing":
      return "Interviewing";
    case "denied":
      return "Denied";
  }
}

export default formatStatus;

import { Status } from "@prisma/client";
import { StatusReadable } from "../../utils/customTypes";

function formatStatus(status: Status): StatusReadable {
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

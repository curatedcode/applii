import { Status } from "@prisma/client";

function getStatusColor(status: Status): string {
  switch (status) {
    case "needToApply":
      return "orange-400";
    case "applied":
      return "blue-400";
    case "interviewing":
      return "green-400";
    case "denied":
      return "red-400";
  }
}

export default getStatusColor;

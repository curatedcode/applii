import { Status } from "@prisma/client";

export const statusArray: Status[] = [
  "needToApply",
  "applied",
  "interviewing",
  "denied",
];

export type ApplicationCard = {
  id: string;
  company: {
    name: string;
    logoUrl: string;
  };
  location: string;
  position: string;
  status: Status;
  updatedAt: string;
};

export interface ApplicationPage extends ApplicationCard {
  summary: string;
  posting: string;
  salary: number;
  benefits: string | null;
  notes: string | null;
  createdAt: string;
  appliedAt: string;
  interviewedAt: string;
  deniedAt: string;
}

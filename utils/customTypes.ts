import { Status } from "@prisma/client";
import { z } from "zod";

export const statusArray = [
  "needToApply",
  "applied",
  "interviewing",
  "denied",
] as const;

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

const minFieldError = "Field must not be blank";
const maxFieldError = "Field must not be longer than 60 characters";

export const applicationFormData = z.object({
  companyName: z
    .string()
    .min(1, { message: minFieldError })
    .max(60, { message: maxFieldError }),
  companyLogoUrl: z.string().url({ message: "Field is not a valid url" }),
  location: z
    .string()
    .min(1, { message: minFieldError })
    .max(60, { message: maxFieldError }),
  position: z
    .string()
    .min(1, { message: minFieldError })
    .max(60, { message: maxFieldError }),
  status: z.enum(statusArray),
  summary: z.string().min(1, { message: minFieldError }),
  posting: z.string().min(1, { message: minFieldError }),
  salary: z.number().min(1, { message: minFieldError }),
  benefits: z.string().nullish(),
  notes: z.string().nullish(),
});

export type ApplicationFormData = {
  readonly companyName: string;
  readonly companyLogoUrl: string;
  readonly location: string;
  readonly position: string;
  readonly status: Status;
  readonly summary: string;
  readonly posting: string;
  readonly salary: number;
  readonly benefits?: string;
  readonly notes?: string;
};

export type StatusReadable =
  | "Need To Apply"
  | "Applied"
  | "Interviewing"
  | "Denied";

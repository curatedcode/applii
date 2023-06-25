import { InferModel, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { db } from "./db";

export const applications = sqliteTable("applications", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  companyId: integer("companyId", { mode: "number" })
    .notNull()
    .references(() => companies.id),
  position: text("position").notNull(),
  location: text("location").notNull(),
  summary: text("summary").notNull(),
  posting: text("posting").notNull(),
  salary: integer("salary").notNull(),
  benefits: text("benefits"),
  status: text("status").$type<ApplicationStatus>().notNull(),
  notes: text("notes"),
  dateCreated: text("dateCreated").default(sql`CURRENT_TIMESTAMP`),
  dateApplied: text("dateApplied").default(sql`CURRENT_TIMESTAMP`),
  dateInterviewed: text("dateInterviewed").default(sql`CURRENT_TIMESTAMP`),
  dateDenied: text("dateDenied").default(sql`CURRENT_TIMESTAMP`),
});

export type ApplicationStatus =
  | "needToApply"
  | "applied"
  | "interviewing"
  | "denied";

export const applicationStatus: ApplicationStatus[] = [
  "needToApply",
  "applied",
  "interviewing",
  "denied",
];

export type Application = InferModel<typeof applications, "select">;
export type NewApplication = InferModel<typeof applications, "insert">;
export const insertApplication = async (application: NewApplication) => {
  return db.insert(applications).values(application);
};

export const companies = sqliteTable("companies", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  logoUrl: text("logoUrl").notNull(),
  notes: text("notes"),
});

export type Company = InferModel<typeof companies, "select">;
export type NewCompany = InferModel<typeof companies, "insert">;
export const insertCompany = async (company: NewCompany) => {
  return db.insert(companies).values(company);
};

export const contacts = sqliteTable("contacts", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  companyId: integer("companyId", { mode: "number" })
    .notNull()
    .references(() => companies.id),
  name: text("name").notNull(),
  phoneNumber: text("phoneNumber"),
  email: text("email"),
  notes: text("notes"),
});

export type Contact = InferModel<typeof contacts, "select">;
export type NewContact = InferModel<typeof contacts, "insert">;
export const insertContact = async (contact: NewContact) => {
  return db.insert(contacts).values(contact);
};

import { faker } from "@faker-js/faker";
import {
  NewCompany,
  applications,
  applicationStatus,
  companies,
  contacts,
  insertApplication,
  insertCompany,
  insertContact,
} from "./schema";
import { createId } from "@paralleldrive/cuid2";
import "dotenv/config";
import { db } from "./db";

async function create(applicationsToCreate: number) {
  const toCreate = Array.from({ length: applicationsToCreate })
    .fill(null)
    .map((_, i) => i);

  for await (const num of toCreate) {
    const company = await db
      .insert(companies)
      .values({
        name: faker.company.name(),
        logoUrl: faker.image.url({ height: 64, width: 64 }),
      })
      .returning({ id: companies.id })
      .all();

    db.insert(contacts)
      .values({
        companyId: company[0].id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
      })
      .returning({ id: contacts.id })
      .values();

    db.insert(applications)
      .values({
        companyId: company[0].id,
        position: num % 2 === 0 ? "Software Engineer" : "Software Developer",
        location: faker.location.city(),
        summary: faker.lorem.paragraphs(),
        posting: faker.internet.url(),
        salary: faker.number.int({ min: 40_000, max: 70_000 }),
        benefits: faker.lorem.paragraphs(),
        status: applicationStatus[num]
          ? applicationStatus[num]
          : applicationStatus[0],
      })
      .returning({ id: applications.id })
      .values();
  }
}

create(10);

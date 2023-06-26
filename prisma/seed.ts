import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { statusArray } from "../utils/customTypes";

const prisma = new PrismaClient();

async function run(applicationsToCreate: number) {
  const toCreate = Array.from({ length: applicationsToCreate })
    .fill(null)
    .map((_, i) => i);

  for await (const num of toCreate) {
    const company = await prisma.company.create({
      data: {
        name: faker.company.name(),
        logoUrl: faker.image.url({ height: 64, width: 64 }),
      },
    });

    await prisma.contact.create({
      data: {
        companyId: company.id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
      },
    });

    await prisma.application.create({
      data: {
        companyId: company.id,
        position: num % 2 === 0 ? "Software Engineer" : "Software Developer",
        location: faker.location.city(),
        summary: faker.lorem.paragraphs(),
        posting: faker.internet.url(),
        salary: faker.number.int({ min: 40_000, max: 70_000 }),
        benefits: faker.lorem.paragraphs(),
        status: statusArray[num] ? statusArray[num] : statusArray[0],
      },
    });
  }
}

run(10);

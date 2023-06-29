import {
  ApplicationFormData,
  applicationFormData,
} from "../../utils/customTypes";
import db from "../../utils/db";

export default defineEventHandler(async (e) => {
  const { data } = await readBody(e);
  const parsedData = JSON.parse(data);

  // need to fix salary as JSON turned it into a string
  const dataFixed = { ...parsedData, salary: Number(parsedData?.salary) };

  const { success } = applicationFormData.safeParse(dataFixed);
  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Data is invalid",
    });
  }

  const applicationData = dataFixed as ApplicationFormData;

  const { companyName, companyLogoUrl } = applicationData;

  return;
  await db.application.create({
    data: {
      company: {
        connectOrCreate: {
          where: { name: companyName },
          create: { name: companyName, logoUrl: companyLogoUrl },
        },
      },
      ...applicationData,
    },
  });
});

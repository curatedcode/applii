import getDate from "../../components/functions/getDate";
import { ApplicationPage } from "../../utils/customTypes";
import db from "../../utils/db";

export default defineEventHandler(
  async (e): Promise<void | ApplicationPage> => {
    const { id } = await readBody(e);

    const data = await db.application
      .findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          company: {
            select: {
              name: true,
              logoUrl: true,
            },
          },
          location: true,
          position: true,
          status: true,
          updatedAt: true,
          summary: true,
          posting: true,
          salary: true,
          benefits: true,
          notes: true,
          createdAt: true,
          appliedAt: true,
          interviewedAt: true,
          deniedAt: true,
        },
      })
      .catch((err) => console.error(err));

    if (!data) return;

    const feed = {
      ...data,
      updatedAt: getDate(data.updatedAt),
      createdAt: getDate(data.createdAt),
      appliedAt: getDate(data.appliedAt),
      interviewedAt: getDate(data.interviewedAt),
      deniedAt: getDate(data.deniedAt),
    };

    return feed;
  }
);

import getDate from "../../components/functions/getDate";
import { ApplicationCard } from "../../utils/customTypes";
import db from "../../utils/db";

export default defineEventHandler(
  async (e): Promise<void | ApplicationCard[]> => {
    const data = await db.application
      .findMany({
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
        },
      })
      .catch((err) => console.error(err));

    if (!data) return;

    const feed = data.map((data) => ({
      ...data,
      updatedAt: getDate(data.updatedAt),
    }));

    return feed;
  }
);

import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import getDate from "../../components/functions/getDate";

describe("return relative date from timestamp", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should return 1s", () => {
    // get current time
    const now = new Date();

    // get time a second ago
    const timestamp = new Date(now.getTime() - 1000);

    const dateFormatted = getDate(timestamp);

    expect(dateFormatted).toBe("1s");
  });

  it("should return 1m", () => {
    // get current time
    const now = new Date();

    // get time 1 min ago
    const timestamp = new Date(now.getTime() - 60_000);

    const dateFormatted = getDate(timestamp);

    expect(dateFormatted).toBe("1m");
  });

  it("should return 2m", () => {
    // get current time
    const now = new Date();

    // get time 2 min ago
    const timestamp = new Date(now.getTime() - 120_000);

    const dateFormatted = getDate(timestamp);

    expect(dateFormatted).toBe("2m");
  });

  it("should return 1h", () => {
    // get current time
    const now = new Date();

    // get time 1 hour ago
    const timestamp = new Date(now.getTime() - 3_600_000);

    const dateFormatted = getDate(timestamp);

    expect(dateFormatted).toBe("1h");
  });

  it("should return 2h", () => {
    // get current time
    const now = new Date();

    // get time 2 hours ago
    const timestamp = new Date(now.getTime() - 7_200_000);

    const dateFormatted = getDate(timestamp);

    expect(dateFormatted).toBe("2h");
  });

  it("should return Jun 23 2022", () => {
    // June 23 2022
    const timestamp = new Date("2022-06-23 17:23:44");

    const dateFormatted = getDate(timestamp);

    expect(dateFormatted).toBe("Jun 23 2022");
  });

  it("should return Jun 23", () => {
    // June 23 2023
    const timestamp = new Date("2023-06-23 17:23:44");

    const dateFormatted = getDate(timestamp);

    expect(dateFormatted).toBe("Jun 23");
  });
});

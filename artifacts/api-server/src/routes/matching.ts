import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import {
  db,
  caregiversTable,
  bookingsTable,
  reviewsTable,
  consultationsTable,
  emergencyRequestsTable,
} from "@workspace/db";
import {
  GetMatchingStatusResponse,
  GetDashboardStatsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/matching/status", async (_req, res): Promise<void> => {
  const [available] = await db
    .select({ count: sql<number>`count(*)` })
    .from(caregiversTable)
    .where(eq(caregiversTable.isAvailable, true));

  const availableCount = Number(available?.count ?? 0);

  const status = {
    availableCaregivers: availableCount,
    isMatchingAvailable: availableCount > 0,
    averageMatchMinutes: 10,
    activeRequests: Math.floor(availableCount * 0.3),
  };

  res.json(GetMatchingStatusResponse.parse(status));
});

router.get("/stats/dashboard", async (_req, res): Promise<void> => {
  const [
    caregiverCount,
    bookingCount,
    reviewData,
    consultationCount,
    emergencyCount,
    childCount,
    elderlyCount,
    educationCount,
    livingCount,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(caregiversTable),
    db.select({ count: sql<number>`count(*)` }).from(bookingsTable),
    db
      .select({
        count: sql<number>`count(*)`,
        avg: sql<number>`avg(rating)`,
      })
      .from(reviewsTable),
    db.select({ count: sql<number>`count(*)` }).from(consultationsTable),
    db
      .select({ count: sql<number>`count(*)` })
      .from(emergencyRequestsTable)
      .where(
        sql`date(${emergencyRequestsTable.createdAt}) = current_date`
      ),
    db
      .select({ count: sql<number>`count(*)` })
      .from(caregiversTable)
      .where(eq(caregiversTable.careType, "child")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(caregiversTable)
      .where(eq(caregiversTable.careType, "elderly")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(caregiversTable)
      .where(eq(caregiversTable.careType, "education")),
    db
      .select({ count: sql<number>`count(*)` })
      .from(caregiversTable)
      .where(eq(caregiversTable.careType, "living")),
  ]);

  const stats = {
    totalCaregivers: Number(caregiverCount[0]?.count ?? 0),
    totalBookings: Number(bookingCount[0]?.count ?? 0),
    totalReviews: Number(reviewData[0]?.count ?? 0),
    averageRating: Number(reviewData[0]?.avg ?? 0),
    totalConsultations: Number(consultationCount[0]?.count ?? 0),
    emergencyRequestsToday: Number(emergencyCount[0]?.count ?? 0),
    careTypeBreakdown: [
      { type: "child", count: Number(childCount[0]?.count ?? 0) },
      { type: "elderly", count: Number(elderlyCount[0]?.count ?? 0) },
      { type: "education", count: Number(educationCount[0]?.count ?? 0) },
      { type: "living", count: Number(livingCount[0]?.count ?? 0) },
    ],
  };

  res.json(GetDashboardStatsResponse.parse(stats));
});

export default router;

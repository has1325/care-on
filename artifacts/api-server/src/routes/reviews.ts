import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, reviewsTable, caregiversTable } from "@workspace/db";
import {
  ListReviewsQueryParams,
  CreateReviewBody,
  ListReviewsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/reviews", async (req, res): Promise<void> => {
  const parsed = ListReviewsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { caregiverId, limit } = parsed.data;

  let query = db.select().from(reviewsTable);

  if (caregiverId) {
    const reviews = await db
      .select()
      .from(reviewsTable)
      .where(eq(reviewsTable.caregiverId, caregiverId))
      .limit(limit ?? 10);
    res.json(ListReviewsResponse.parse(reviews));
    return;
  }

  const reviews = await query.limit(limit ?? 10);
  res.json(ListReviewsResponse.parse(reviews));
});

router.post("/reviews", async (req, res): Promise<void> => {
  const parsed = CreateReviewBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [caregiver] = await db
    .select()
    .from(caregiversTable)
    .where(eq(caregiversTable.id, parsed.data.caregiverId));

  if (!caregiver) {
    res.status(404).json({ error: "Caregiver not found" });
    return;
  }

  const [review] = await db
    .insert(reviewsTable)
    .values({
      ...parsed.data,
      caregiverName: caregiver.name,
      authorName: "익명 사용자",
    })
    .returning();

  res.status(201).json(review);
});

export default router;

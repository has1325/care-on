import { Router, type IRouter } from "express";
import { eq, and, gte, sql } from "drizzle-orm";
import { db, caregiversTable } from "@workspace/db";
import {
  ListCaregiversQueryParams,
  CreateCaregiverBody,
  GetCaregiverParams,
  ListCaregiversResponse,
  GetCaregiverResponse,
  GetFeaturedCaregiversResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/caregivers", async (req, res): Promise<void> => {
  const parsed = ListCaregiversQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { region, careType, gender, minExperience, available, limit, offset } =
    parsed.data;

  const conditions = [];
  if (region) conditions.push(eq(caregiversTable.region, region));
  if (careType) conditions.push(eq(caregiversTable.careType, careType));
  if (gender) conditions.push(eq(caregiversTable.gender, gender));
  if (minExperience != null)
    conditions.push(gte(caregiversTable.experienceYears, minExperience));
  if (available != null)
    conditions.push(eq(caregiversTable.isAvailable, available));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [rawCaregivers, countResult] = await Promise.all([
    db
      .select()
      .from(caregiversTable)
      .where(whereClause)
      .limit(limit ?? 12)
      .offset(offset ?? 0),
    db
      .select({ count: sql<number>`count(*)` })
      .from(caregiversTable)
      .where(whereClause),
  ]);

  const caregivers = rawCaregivers.map((c) => ({
    ...c,
    photoUrl: c.photoUrl ?? undefined,
  }));

  const total = Number(countResult[0]?.count ?? 0);
  const hasMore = (offset ?? 0) + (limit ?? 12) < total;

  res.json(ListCaregiversResponse.parse({ caregivers, total, hasMore }));
});

router.post("/caregivers", async (req, res): Promise<void> => {
  const parsed = CreateCaregiverBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [caregiver] = await db
    .insert(caregiversTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(caregiver);
});

router.get("/caregivers/featured", async (_req, res): Promise<void> => {
  const caregivers = await db
    .select()
    .from(caregiversTable)
    .where(eq(caregiversTable.isVerified, true))
    .orderBy(sql`${caregiversTable.rating} DESC`)
    .limit(6);

  const sanitized = caregivers.map((c) => ({
    ...c,
    photoUrl: c.photoUrl ?? undefined,
    videoUrl: (c as any).videoUrl ?? undefined,
  }));

  res.json(GetFeaturedCaregiversResponse.parse(sanitized));
});

router.get("/caregivers/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetCaregiverParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [caregiver] = await db
    .select()
    .from(caregiversTable)
    .where(eq(caregiversTable.id, params.data.id));

  if (!caregiver) {
    res.status(404).json({ error: "Caregiver not found" });
    return;
  }

  const sanitized = {
    ...caregiver,
    photoUrl: caregiver.photoUrl ?? undefined,
    videoUrl: (caregiver as any).videoUrl ?? undefined,
  };

  res.json(GetCaregiverResponse.parse(sanitized));
});

export default router;

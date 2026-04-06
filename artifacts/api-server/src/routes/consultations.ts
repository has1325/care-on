import { Router, type IRouter } from "express";
import { db, consultationsTable } from "@workspace/db";
import {
  CreateConsultationBody,
  ListConsultationsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/consultations", async (_req, res): Promise<void> => {
  const consultations = await db
    .select()
    .from(consultationsTable)
    .orderBy(consultationsTable.createdAt);

  res.json(ListConsultationsResponse.parse(consultations));
});

router.post("/consultations", async (req, res): Promise<void> => {
  const parsed = CreateConsultationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [consultation] = await db
    .insert(consultationsTable)
    .values({ ...parsed.data, status: "pending" })
    .returning();

  res.status(201).json(consultation);
});

export default router;

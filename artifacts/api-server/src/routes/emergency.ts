import { Router, type IRouter } from "express";
import { db, emergencyRequestsTable } from "@workspace/db";
import {
  CreateEmergencyRequestBody,
  ListEmergencyRequestsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/emergency", async (_req, res): Promise<void> => {
  const requests = await db
    .select()
    .from(emergencyRequestsTable)
    .orderBy(emergencyRequestsTable.createdAt);

  res.json(ListEmergencyRequestsResponse.parse(requests));
});

router.post("/emergency", async (req, res): Promise<void> => {
  const parsed = CreateEmergencyRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [request] = await db
    .insert(emergencyRequestsTable)
    .values({ ...parsed.data, status: "pending" })
    .returning();

  res.status(201).json(request);
});

export default router;

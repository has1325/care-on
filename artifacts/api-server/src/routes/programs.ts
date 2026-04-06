import { Router, type IRouter } from "express";
import { db, programsTable } from "@workspace/db";
import { ListProgramsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/programs", async (_req, res): Promise<void> => {
  const programs = await db.select().from(programsTable);
  res.json(ListProgramsResponse.parse(programs));
});

export default router;

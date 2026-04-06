import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, bookingsTable, caregiversTable } from "@workspace/db";
import {
  CreateBookingBody,
  GetBookingParams,
  ListBookingsResponse,
  GetBookingResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/bookings", async (_req, res): Promise<void> => {
  const bookings = await db
    .select()
    .from(bookingsTable)
    .orderBy(bookingsTable.createdAt);

  res.json(ListBookingsResponse.parse(bookings));
});

router.post("/bookings", async (req, res): Promise<void> => {
  const parsed = CreateBookingBody.safeParse(req.body);
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

  const totalAmount =
    caregiver.hourlyRate * parsed.data.hoursPerDay;

  const [booking] = await db
    .insert(bookingsTable)
    .values({
      ...parsed.data,
      caregiverName: caregiver.name,
      totalAmount,
      status: "pending",
    })
    .returning();

  res.status(201).json(GetBookingResponse.parse(booking));
});

router.get("/bookings/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetBookingParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [booking] = await db
    .select()
    .from(bookingsTable)
    .where(eq(bookingsTable.id, params.data.id));

  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }

  res.json(GetBookingResponse.parse(booking));
});

export default router;

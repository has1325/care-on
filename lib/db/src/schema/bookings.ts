import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  caregiverId: integer("caregiver_id").notNull(),
  caregiverName: text("caregiver_name").notNull(),
  careType: text("care_type").notNull(),
  region: text("region").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  hoursPerDay: integer("hours_per_day").notNull().default(4),
  status: text("status").notNull().default("pending"),
  totalAmount: integer("total_amount").notNull().default(0),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;

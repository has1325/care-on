import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const emergencyRequestsTable = pgTable("emergency_requests", {
  id: serial("id").primaryKey(),
  region: text("region").notNull(),
  careType: text("care_type").notNull(),
  requestTime: text("request_time").notNull(),
  isUrgent: boolean("is_urgent").notNull().default(true),
  description: text("description"),
  status: text("status").notNull().default("pending"),
  matchedCaregiverId: integer("matched_caregiver_id"),
  contactPhone: text("contact_phone").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertEmergencyRequestSchema = createInsertSchema(
  emergencyRequestsTable
).omit({ id: true, createdAt: true });
export type InsertEmergencyRequest = z.infer<
  typeof insertEmergencyRequestSchema
>;
export type EmergencyRequest = typeof emergencyRequestsTable.$inferSelect;

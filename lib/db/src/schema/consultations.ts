import {
  pgTable,
  text,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const consultationsTable = pgTable("consultations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  careType: text("care_type").notNull(),
  preferredTime: text("preferred_time"),
  message: text("message"),
  consultationType: text("consultation_type").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertConsultationSchema = createInsertSchema(
  consultationsTable
).omit({ id: true, createdAt: true });
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultationsTable.$inferSelect;

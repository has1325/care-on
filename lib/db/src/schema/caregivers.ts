import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  real,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const caregiversTable = pgTable("caregivers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  photoUrl: text("photo_url"),
  experienceYears: integer("experience_years").notNull().default(0),
  careType: text("care_type").notNull(),
  specialties: text("specialties").array().default([]),
  rating: real("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  region: text("region").notNull(),
  shortBio: text("short_bio").notNull(),
  fullBio: text("full_bio"),
  certificates: text("certificates").array().default([]),
  availableSchedule: text("available_schedule").array().default([]),
  videoUrl: text("video_url"),
  languages: text("languages").array().default([]),
  isAvailable: boolean("is_available").notNull().default(true),
  isVerified: boolean("is_verified").notNull().default(false),
  isInsured: boolean("is_insured").notNull().default(false),
  hourlyRate: integer("hourly_rate").notNull().default(15000),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertCaregiverSchema = createInsertSchema(caregiversTable).omit({
  id: true,
  createdAt: true,
});
export type InsertCaregiver = z.infer<typeof insertCaregiverSchema>;
export type Caregiver = typeof caregiversTable.$inferSelect;

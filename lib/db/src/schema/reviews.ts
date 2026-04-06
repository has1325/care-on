import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  caregiverId: integer("caregiver_id").notNull(),
  caregiverName: text("caregiver_name").notNull(),
  authorName: text("author_name").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  careType: text("care_type").notNull(),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviewsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviewsTable.$inferSelect;

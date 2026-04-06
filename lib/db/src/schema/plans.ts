import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const plansTable = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  weeklyVisits: integer("weekly_visits").notNull(),
  monthlyPrice: integer("monthly_price").notNull(),
  features: text("features").array().default([]),
  isPopular: boolean("is_popular").notNull().default(false),
  includesEducation: boolean("includes_education").notNull().default(false),
});

export const insertPlanSchema = createInsertSchema(plansTable).omit({
  id: true,
});
export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type Plan = typeof plansTable.$inferSelect;

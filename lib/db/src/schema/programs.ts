import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const programsTable = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  level: text("level").notNull(),
  price: integer("price").notNull().default(0),
  imageUrl: text("image_url"),
  enrolledCount: integer("enrolled_count").notNull().default(0),
});

export const insertProgramSchema = createInsertSchema(programsTable).omit({
  id: true,
});
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type Program = typeof programsTable.$inferSelect;

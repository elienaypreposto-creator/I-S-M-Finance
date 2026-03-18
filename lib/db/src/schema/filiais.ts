import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const filiaisTable = pgTable("filiais", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertFilialSchema = createInsertSchema(filiaisTable).omit({ id: true, created_at: true });
export type InsertFilial = z.infer<typeof insertFilialSchema>;
export type Filial = typeof filiaisTable.$inferSelect;

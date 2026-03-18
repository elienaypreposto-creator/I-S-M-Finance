import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const planoContasTable = pgTable("plano_contas", {
  id: serial("id").primaryKey(),
  tipo: text("tipo").notNull(), // receita, custo, despesa
  categoria: text("categoria").notNull(),
  subcategoria: text("subcategoria"),
  codigo: text("codigo"),
  ativo: boolean("ativo").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPlanoContaSchema = createInsertSchema(planoContasTable).omit({ id: true, created_at: true, updated_at: true });
export type InsertPlanoConta = z.infer<typeof insertPlanoContaSchema>;
export type PlanoConta = typeof planoContasTable.$inferSelect;

import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const departamentosTable = pgTable("departamentos", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const centrosCustosTable = pgTable("centros_custos", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  departamento_id: integer("departamento_id").references(() => departamentosTable.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertDepartamentoSchema = createInsertSchema(departamentosTable).omit({ id: true, created_at: true });
export type InsertDepartamento = z.infer<typeof insertDepartamentoSchema>;
export type Departamento = typeof departamentosTable.$inferSelect;

export const insertCentroCustoSchema = createInsertSchema(centrosCustosTable).omit({ id: true, created_at: true });
export type InsertCentroCusto = z.infer<typeof insertCentroCustoSchema>;
export type CentroCusto = typeof centrosCustosTable.$inferSelect;

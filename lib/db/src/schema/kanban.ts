import { pgTable, serial, text, integer, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usuariosTable } from "./usuarios";

export const kanbanCardsTable = pgTable("kanban_cards", {
  id: serial("id").primaryKey(),
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  coluna: text("coluna").notNull().default("solicitado"),
  responsavel_id: integer("responsavel_id").references(() => usuariosTable.id),
  prazo: date("prazo"),
  prioridade: text("prioridade").notNull().default("media"), // baixa, media, alta, urgente
  criado_por: integer("criado_por").references(() => usuariosTable.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const kanbanHistoricoTable = pgTable("kanban_historico", {
  id: serial("id").primaryKey(),
  card_id: integer("card_id").references(() => kanbanCardsTable.id).notNull(),
  coluna_anterior: text("coluna_anterior"),
  coluna_nova: text("coluna_nova"),
  comentario: text("comentario"),
  usuario_id: integer("usuario_id").references(() => usuariosTable.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertKanbanCardSchema = createInsertSchema(kanbanCardsTable).omit({ id: true, created_at: true, updated_at: true });
export type InsertKanbanCard = z.infer<typeof insertKanbanCardSchema>;
export type KanbanCard = typeof kanbanCardsTable.$inferSelect;

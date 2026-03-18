import { pgTable, serial, text, integer, numeric, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { contasBancariasTable } from "./contas-bancarias";
import { lancamentosTable } from "./lancamentos";

export const conciliacoesTable = pgTable("conciliacoes", {
  id: serial("id").primaryKey(),
  conta_id: integer("conta_id").references(() => contasBancariasTable.id).notNull(),
  periodo_inicio: date("periodo_inicio"),
  periodo_fim: date("periodo_fim"),
  status: text("status").notNull().default("pendente"), // pendente, conciliado
  arquivo_nome: text("arquivo_nome"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const itensConciliacaoTable = pgTable("itens_conciliacao", {
  id: serial("id").primaryKey(),
  conciliacao_id: integer("conciliacao_id").references(() => conciliacoesTable.id).notNull(),
  lancamento_id: integer("lancamento_id").references(() => lancamentosTable.id),
  valor_extrato: numeric("valor_extrato", { precision: 15, scale: 2 }).notNull(),
  desconto: numeric("desconto", { precision: 15, scale: 2 }).default("0"),
  acrescimo: numeric("acrescimo", { precision: 15, scale: 2 }).default("0"),
  status: text("status").notNull().default("pendente"), // pendente, vinculado, ignorado
  tipo_extrato: text("tipo_extrato").notNull(), // debito, credito
  descricao: text("descricao"),
  data: date("data"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const insertConciliacaoSchema = createInsertSchema(conciliacoesTable).omit({ id: true, created_at: true, updated_at: true });
export type InsertConciliacao = z.infer<typeof insertConciliacaoSchema>;
export type Conciliacao = typeof conciliacoesTable.$inferSelect;

export const insertItemConciliacaoSchema = createInsertSchema(itensConciliacaoTable).omit({ id: true, created_at: true, updated_at: true });
export type InsertItemConciliacao = z.infer<typeof insertItemConciliacaoSchema>;
export type ItemConciliacao = typeof itensConciliacaoTable.$inferSelect;

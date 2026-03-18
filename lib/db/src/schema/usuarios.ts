import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const usuariosTable = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  telefone: text("telefone"),
  celular: text("celular"),
  senha_hash: text("senha_hash").notNull(),
  bloqueado: boolean("bloqueado").default(false).notNull(),
  ultimo_acesso: timestamp("ultimo_acesso"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const permissoesTable = pgTable("permissoes", {
  id: serial("id").primaryKey(),
  usuario_id: serial("usuario_id").references(() => usuariosTable.id),
  permissao: text("permissao").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertUsuarioSchema = createInsertSchema(usuariosTable).omit({ id: true, created_at: true, updated_at: true });
export type InsertUsuario = z.infer<typeof insertUsuarioSchema>;
export type Usuario = typeof usuariosTable.$inferSelect;

# ISM Tecnologia - Sistema Financeiro

## Overview

Complete Financial Control & Cash Flow Management System for ISM Tecnologia. Full-stack web application with dashboards, reports, bank reconciliation, kanban, and Power BI REST API integration.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + Recharts
- **Backend API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Charts**: Recharts
- **Export**: xlsx + jsPDF
- **Icons**: Lucide React
- **Drag & Drop**: @dnd-kit/core

## Visual Identity (Dark Mode by Default)

- Background: #1E1E2E (hsl 240 23% 15%)
- Card/Panel: #2A2A3E (hsl 240 19% 20%)
- Sidebar: #1A2B5E (hsl 225 56% 23%)
- Primary blue: #3BA8DC (hsl 201 65% 55%)
- Text: #E8EAF0 (hsl 225 27% 93%)
- Success green: #27AE60
- Danger red: #E74C3C
- Amber warning: #F39C12
- Orange expenses: #E67E22
- Teal revenue: #1ABC9C
- Font: Inter (Google Fonts)

## Structure

```
artifacts/
├── api-server/          # Express 5 API server
│   └── src/routes/      # All API routes
└── ism-financeiro/      # React + Vite frontend
    └── src/
        ├── pages/       # All pages/screens
        ├── components/  # Shared components
        └── index.css    # Theme variables (dark mode)
lib/
├── api-spec/            # OpenAPI spec + Orval codegen
├── api-client-react/    # Generated React Query hooks
├── api-zod/             # Generated Zod schemas
└── db/                  # Drizzle ORM schema + DB
    └── src/schema/      # All table definitions
```

## Pages

- `/` → Dashboard with KPI cards, charts, cash flow projections
- `/kanban` → Kanban board (drag-and-drop, 5 columns)
- `/conciliacao` → Bank reconciliation list + detail
- `/lancamentos` → Financial entries (AP/AR)
- `/cadastros/parceiros` → Partners (clients, suppliers, etc.)
- `/cadastros/contas-bancarias` → Bank accounts wizard
- `/cadastros/plano-contas` → Chart of accounts (hierarchical)
- `/cadastros/metas` → Annual goals spreadsheet
- `/cadastros/departamentos` → Departments & cost centers
- `/relatorios/fechamento-mensal` → Monthly closing report
- `/relatorios/contabil-fiscal` → Accounting/fiscal report
- `/relatorios/dre` → DRE Gerencial annual table
- `/relatorios/fluxo-caixa` → Cash flow annual table
- `/relatorios/metas` → Goals vs actual report
- `/configuracoes/usuarios` → Users + permissions
- `/configuracoes/filiais` → Branches
- `/configuracoes/tokens-api` → API tokens + Swagger docs

## API

All routes under `/api/*`. Power BI REST endpoints under `/api/v1/*` with Bearer token auth.

## Database Tables

- usuarios, permissoes
- filiais
- parceiros
- contas_bancarias
- plano_contas
- metas
- lancamentos
- conciliacoes, itens_conciliacao
- kanban_cards, kanban_historico
- tokens_api
- departamentos, centros_custos

## Development Commands

- `pnpm --filter @workspace/ism-financeiro run dev` — Frontend dev server
- `pnpm --filter @workspace/api-server run dev` — Backend API server
- `pnpm --filter @workspace/db run push` — Push DB schema changes
- `pnpm --filter @workspace/api-spec run codegen` — Regenerate API client

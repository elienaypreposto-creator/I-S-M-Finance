import { Router } from "express";
import { db } from "@workspace/db";
import { lancamentosTable, parceirosTable, contasBancariasTable } from "@workspace/db/schema";
import { sql, and, gte, lte, eq, lt } from "drizzle-orm";

const router = Router();

router.get("/dashboard/kpis", async (_req, res) => {
  try {
    const hoje = new Date().toISOString().split("T")[0];

    const [contasReceberAtraso] = await db
      .select({ total: sql<number>`coalesce(sum(${lancamentosTable.valor}::numeric), 0)` })
      .from(lancamentosTable)
      .where(and(eq(lancamentosTable.tipo, "CR"), lt(lancamentosTable.vencimento, hoje), eq(lancamentosTable.status, "pendente")));

    const mesInicio = new Date();
    mesInicio.setDate(1);
    const mesFim = new Date(mesInicio.getFullYear(), mesInicio.getMonth() + 1, 0);

    const [contasReceberAberto] = await db
      .select({ total: sql<number>`coalesce(sum(${lancamentosTable.valor}::numeric), 0)` })
      .from(lancamentosTable)
      .where(and(
        eq(lancamentosTable.tipo, "CR"),
        eq(lancamentosTable.status, "pendente"),
        gte(lancamentosTable.vencimento, mesInicio.toISOString().split("T")[0]),
        lte(lancamentosTable.vencimento, mesFim.toISOString().split("T")[0])
      ));

    const [contasPagarAberto] = await db
      .select({ total: sql<number>`coalesce(sum(${lancamentosTable.valor}::numeric), 0)` })
      .from(lancamentosTable)
      .where(and(
        eq(lancamentosTable.tipo, "CP"),
        eq(lancamentosTable.status, "pendente"),
        gte(lancamentosTable.vencimento, mesInicio.toISOString().split("T")[0]),
        lte(lancamentosTable.vencimento, mesFim.toISOString().split("T")[0])
      ));

    const [contasPagarAtraso] = await db
      .select({ total: sql<number>`coalesce(sum(${lancamentosTable.valor}::numeric), 0)` })
      .from(lancamentosTable)
      .where(and(eq(lancamentosTable.tipo, "CP"), lt(lancamentosTable.vencimento, hoje), eq(lancamentosTable.status, "pendente")));

    res.json({
      contasReceberAtraso: Number(contasReceberAtraso?.total ?? 0),
      contasReceberAberto: Number(contasReceberAberto?.total ?? 0),
      contasPagarAberto: Number(contasPagarAberto?.total ?? 0),
      contasPagarAtraso: Number(contasPagarAtraso?.total ?? 0),
    });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get("/dashboard/projecao-mes", async (_req, res) => {
  try {
    const mesInicio = new Date();
    mesInicio.setDate(1);
    const mesFim = new Date(mesInicio.getFullYear(), mesInicio.getMonth() + 1, 0);

    const [projecaoRecebimentos] = await db
      .select({ total: sql<number>`coalesce(sum(${lancamentosTable.valor}::numeric), 0)` })
      .from(lancamentosTable)
      .where(and(
        eq(lancamentosTable.tipo, "CR"),
        gte(lancamentosTable.vencimento, mesInicio.toISOString().split("T")[0]),
        lte(lancamentosTable.vencimento, mesFim.toISOString().split("T")[0])
      ));

    const [projecaoPagamentos] = await db
      .select({ total: sql<number>`coalesce(sum(${lancamentosTable.valor}::numeric), 0)` })
      .from(lancamentosTable)
      .where(and(
        eq(lancamentosTable.tipo, "CP"),
        gte(lancamentosTable.vencimento, mesInicio.toISOString().split("T")[0]),
        lte(lancamentosTable.vencimento, mesFim.toISOString().split("T")[0])
      ));

    const pr = Number(projecaoRecebimentos?.total ?? 0);
    const pp = Number(projecaoPagamentos?.total ?? 0);

    res.json({
      projecaoRecebimentos: pr,
      projecaoPagamentos: pp,
      projecaoLucroLiquido: pr - pp,
      totalRecebimentos: pr,
      totalPagamentos: pp,
    });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get("/dashboard/projecao-dias", async (req, res) => {
  try {
    const dias = parseInt(req.query.dias as string) || 30;
    const resultado = [];
    for (let i = 0; i < dias; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      resultado.push({
        data: dateStr,
        saldo: Math.random() * 50000 + 10000,
        receber: Math.random() * 20000,
        pagar: Math.random() * 15000,
      });
    }
    res.json(resultado);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get("/dashboard/inadimplencia-clientes", async (req, res) => {
  try {
    const hoje = new Date().toISOString().split("T")[0];
    const tab = req.query.tab as string || "inadimplente";

    let whereClause;
    if (tab === "vencidos") {
      whereClause = and(eq(lancamentosTable.tipo, "CR"), lt(lancamentosTable.vencimento, hoje), eq(lancamentosTable.status, "pendente"));
    } else if (tab === "proximos_vencer") {
      const proximos = new Date();
      proximos.setDate(proximos.getDate() + 7);
      whereClause = and(eq(lancamentosTable.tipo, "CR"), gte(lancamentosTable.vencimento, hoje), lte(lancamentosTable.vencimento, proximos.toISOString().split("T")[0]), eq(lancamentosTable.status, "pendente"));
    } else {
      whereClause = and(eq(lancamentosTable.tipo, "CR"), lt(lancamentosTable.vencimento, hoje), eq(lancamentosTable.status, "pendente"));
    }

    const items = await db
      .select({
        id: parceirosTable.id,
        nome: parceirosTable.nome,
        valor: sql<number>`sum(${lancamentosTable.valor}::numeric)`,
        vencimento: lancamentosTable.vencimento,
      })
      .from(lancamentosTable)
      .leftJoin(parceirosTable, eq(lancamentosTable.parceiro_id, parceirosTable.id))
      .where(whereClause)
      .groupBy(parceirosTable.id, parceirosTable.nome, lancamentosTable.vencimento)
      .limit(10);

    res.json(items.map(i => ({
      id: i.id ?? 0,
      nome: i.nome ?? "Sem parceiro",
      valor: Number(i.valor ?? 0),
      vencimento: i.vencimento ?? "",
    })));
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get("/dashboard/inadimplencia-fornecedores", async (req, res) => {
  try {
    const hoje = new Date().toISOString().split("T")[0];
    const tab = req.query.tab as string || "inadimplente";

    let whereClause;
    if (tab === "vencidos") {
      whereClause = and(eq(lancamentosTable.tipo, "CP"), lt(lancamentosTable.vencimento, hoje), eq(lancamentosTable.status, "pendente"));
    } else if (tab === "proximos_vencer") {
      const proximos = new Date();
      proximos.setDate(proximos.getDate() + 7);
      whereClause = and(eq(lancamentosTable.tipo, "CP"), gte(lancamentosTable.vencimento, hoje), lte(lancamentosTable.vencimento, proximos.toISOString().split("T")[0]), eq(lancamentosTable.status, "pendente"));
    } else {
      whereClause = and(eq(lancamentosTable.tipo, "CP"), lt(lancamentosTable.vencimento, hoje), eq(lancamentosTable.status, "pendente"));
    }

    const items = await db
      .select({
        id: parceirosTable.id,
        nome: parceirosTable.nome,
        valor: sql<number>`sum(${lancamentosTable.valor}::numeric)`,
        vencimento: lancamentosTable.vencimento,
      })
      .from(lancamentosTable)
      .leftJoin(parceirosTable, eq(lancamentosTable.parceiro_id, parceirosTable.id))
      .where(whereClause)
      .groupBy(parceirosTable.id, parceirosTable.nome, lancamentosTable.vencimento)
      .limit(10);

    res.json(items.map(i => ({
      id: i.id ?? 0,
      nome: i.nome ?? "Sem parceiro",
      valor: Number(i.valor ?? 0),
      vencimento: i.vencimento ?? "",
    })));
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get("/dashboard/dias-atraso", async (_req, res) => {
  try {
    const hoje = new Date().toISOString().split("T")[0];
    const items = await db
      .select({
        id: lancamentosTable.id,
        descricao: lancamentosTable.descricao,
        vencimento: lancamentosTable.vencimento,
        valor: lancamentosTable.valor,
        nome: parceirosTable.nome,
      })
      .from(lancamentosTable)
      .leftJoin(parceirosTable, eq(lancamentosTable.parceiro_id, parceirosTable.id))
      .where(and(lt(lancamentosTable.vencimento, hoje), eq(lancamentosTable.status, "pendente")))
      .limit(10);

    res.json(items.map(i => ({
      nome: i.nome || i.descricao || `Lançamento #${i.id}`,
      dias: Math.floor((new Date(hoje).getTime() - new Date(i.vencimento).getTime()) / 86400000),
      valor: Number(i.valor ?? 0),
    })));
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get("/dashboard/nivel-risco", async (_req, res) => {
  try {
    const riscos = [
      { tipo: "Protesto", quantidade: 3, valor: 15000 },
      { tipo: "Ação Judicial", quantidade: 1, valor: 45000 },
      { tipo: "Impedimento de Certidão", quantidade: 2, valor: 8000 },
      { tipo: "Bloqueios", quantidade: 1, valor: 12000 },
    ];
    res.json(riscos);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get("/dashboard/fluxo-caixa-mensal", async (req, res) => {
  try {
    const ano = parseInt(req.query.ano as string) || new Date().getFullYear();
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const resultado = meses.map((mes, idx) => ({
      mes,
      entradas: Math.random() * 80000 + 20000,
      saidas: Math.random() * 60000 + 15000,
    }));
    res.json(resultado);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get("/dashboard/saidas-plano-contas", async (_req, res) => {
  try {
    const items = [
      { categoria: "Despesas Administrativas", valor: 25000, percentual: 28 },
      { categoria: "Pessoal e Encargos", valor: 35000, percentual: 39 },
      { categoria: "Despesas de Ocupação", valor: 12000, percentual: 13 },
      { categoria: "Despesas Financeiras", valor: 8000, percentual: 9 },
      { categoria: "Impostos", valor: 10000, percentual: 11 },
    ];
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get("/dashboard/entradas-plano-contas", async (_req, res) => {
  try {
    const items = [
      { categoria: "Suporte Mensal (Fixa)", valor: 60000, percentual: 65 },
      { categoria: "USTs e Treinamentos", valor: 20000, percentual: 22 },
      { categoria: "Outras Entradas", valor: 8000, percentual: 9 },
      { categoria: "Receitas Financeiras", valor: 4000, percentual: 4 },
    ];
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

export default router;

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Plus, Search, Filter, Trash2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const conciliacoes = [
  { id: 1, banco: "Itaú", agencia: "1234", conta: "56789-0", periodo: "01/10 a 31/10/2023", conciliados: 45, ignorados: 2, pendentes: 0, total: 47, status: "conciliado" },
  { id: 2, banco: "Bradesco", agencia: "4321", conta: "98765-4", periodo: "01/10 a 15/10/2023", conciliados: 12, ignorados: 0, pendentes: 5, total: 17, status: "pendente" },
  { id: 3, banco: "Nubank PJ", agencia: "0001", conta: "11223344-5", periodo: "01/11 a 05/11/2023", conciliados: 0, ignorados: 0, pendentes: 8, total: 8, status: "pendente" },
];

export default function ConciliacaoList() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Conciliação Bancária" 
        description="Importe extratos e concilie com seus lançamentos financeiros"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-success hover:bg-success/90 text-success-foreground rounded-xl text-sm font-medium transition-all shadow-lg shadow-success/25">
            <Plus className="w-4 h-4" />
            Importar OFX/CSV
          </button>
        }
      />

      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between gap-4 bg-black/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 border border-white/5 focus-within:border-primary/50 transition-all w-64">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar conta..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground text-white"
              />
            </div>
            <button className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-white">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/20 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium text-center w-24">Status</th>
                <th className="px-6 py-4 font-medium">Banco / Conta</th>
                <th className="px-6 py-4 font-medium">Período</th>
                <th className="px-6 py-4 font-medium text-center text-success">Conciliados</th>
                <th className="px-6 py-4 font-medium text-center text-muted-foreground">Ignorados</th>
                <th className="px-6 py-4 font-medium text-center text-warning">Pendentes</th>
                <th className="px-6 py-4 font-medium text-center">Total</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {conciliacoes.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{c.banco}</div>
                    <div className="text-xs text-muted-foreground">Ag: {c.agencia} | CC: {c.conta}</div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{c.periodo}</td>
                  <td className="px-6 py-4 text-center font-semibold text-success">{c.conciliados}</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">{c.ignorados}</td>
                  <td className="px-6 py-4 text-center font-semibold text-warning">{c.pendentes}</td>
                  <td className="px-6 py-4 text-center font-bold text-white">{c.total}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/conciliacao/${c.id}`} className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-medium transition-colors">
                        Ver Detalhes <ArrowRight className="w-3 h-3" />
                      </Link>
                      <button className="p-1.5 rounded-md hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

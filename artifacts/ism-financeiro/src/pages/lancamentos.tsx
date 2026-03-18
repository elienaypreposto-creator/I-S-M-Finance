import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Calendar as CalendarIcon
} from "lucide-react";

// Mock data
const mockLancamentos = [
  { id: 1, tipo: "CR", vencimento: "2023-10-15", competencia: "2023-10", conta: "Itaú CC", parceiro: "Tech Solutions S.A.", descricao: "Mensalidade Outubro", valor: 15000, status: "recebido" },
  { id: 2, tipo: "CP", vencimento: "2023-10-10", competencia: "2023-10", conta: "Itaú CC", parceiro: "Amazon Web Services", descricao: "Hospedagem Cloud", valor: 4500, status: "pago" },
  { id: 3, tipo: "CP", vencimento: "2023-10-20", competencia: "2023-10", conta: "Bradesco", parceiro: "Office Supplies Ltda", descricao: "Materiais de Escritório", valor: 850, status: "pendente" },
  { id: 4, tipo: "CR", vencimento: "2023-10-05", competencia: "2023-10", conta: "Itaú CC", parceiro: "Global Industries", descricao: "Projeto Setup", valor: 35000, status: "atrasado" },
  { id: 5, tipo: "CP", vencimento: "2023-10-25", competencia: "2023-10", conta: "Nubank", parceiro: "João Silva (Dev)", descricao: "Serviços Dev", valor: 8000, status: "pendente" },
];

export default function Lancamentos() {
  const [activeTab, setActiveTab] = useState("todos");

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Lançamentos Financeiros" 
        description="Gerencie suas contas a pagar e a receber"
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all">
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
              <Plus className="w-4 h-4" />
              Novo Lançamento
            </button>
          </>
        }
      />

      <div className="glass-panel rounded-2xl flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex bg-black/20 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('todos')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'todos' ? 'bg-white/10 text-white shadow-sm' : 'text-muted-foreground hover:text-white'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => setActiveTab('receber')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'receber' ? 'bg-success/20 text-success shadow-sm' : 'text-muted-foreground hover:text-success'}`}
            >
              A Receber
            </button>
            <button 
              onClick={() => setActiveTab('pagar')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'pagar' ? 'bg-orange-500/20 text-orange-400 shadow-sm' : 'text-muted-foreground hover:text-orange-400'}`}
            >
              A Pagar
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 border border-white/5 focus-within:border-primary/50 transition-all">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar lançamentos..." 
                className="bg-transparent border-none outline-none text-sm w-full sm:w-64 placeholder:text-muted-foreground text-white"
              />
            </div>
            <button className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-white">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/20 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium w-12">Tipo</th>
                <th className="px-6 py-4 font-medium">Vencimento</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Conta</th>
                <th className="px-6 py-4 font-medium">Parceiro</th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">Descrição</th>
                <th className="px-6 py-4 font-medium text-right">Valor</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockLancamentos.filter(l => activeTab === 'todos' || (activeTab === 'receber' ? l.tipo === 'CR' : l.tipo === 'CP')).map((l) => (
                <tr key={l.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${l.tipo === 'CR' ? 'bg-success/10 text-success' : 'bg-orange-500/10 text-orange-500'}`}>
                      {l.tipo === 'CR' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      {formatDate(l.vencimento)}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-muted-foreground">{l.conta}</td>
                  <td className="px-6 py-4 font-medium text-white">{l.parceiro}</td>
                  <td className="px-6 py-4 hidden lg:table-cell text-muted-foreground max-w-[200px] truncate" title={l.descricao}>{l.descricao}</td>
                  <td className={`px-6 py-4 text-right font-bold ${l.tipo === 'CR' ? 'text-success' : 'text-foreground'}`}>
                    {l.tipo === 'CP' && '-'}{formatCurrency(l.valor)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-muted-foreground bg-black/10">
          <div>Mostrando 1 a 5 de 42 resultados</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-50">Anterior</button>
            <button className="px-3 py-1 rounded bg-primary text-white font-medium">1</button>
            <button className="px-3 py-1 rounded hover:bg-white/5">2</button>
            <button className="px-3 py-1 rounded hover:bg-white/5">3</button>
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
}

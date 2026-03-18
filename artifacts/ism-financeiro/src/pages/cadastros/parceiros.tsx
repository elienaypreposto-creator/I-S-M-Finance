import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Plus, Search, Download, Edit2, Trash2, Ban } from "lucide-react";

const parceiros = [
  { id: 1, tipo: "PJ", nome: "Tech Solutions S.A.", documento: "12.345.678/0001-90", tipos: ["Cliente", "Fornecedor"], status: "ativo" },
  { id: 2, tipo: "PF", nome: "João da Silva", documento: "123.456.789-00", tipos: ["Funcionário"], status: "ativo" },
  { id: 3, tipo: "PJ", nome: "Amazon Web Services", documento: "98.765.432/0001-10", tipos: ["Fornecedor"], status: "inativo" },
  { id: 4, tipo: "PF", nome: "Maria Oliveira", documento: "987.654.321-11", tipos: ["Sócio(a)"], status: "ativo" },
];

export default function Parceiros() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Parceiros" 
        description="Cadastro de clientes, fornecedores, funcionários e sócios"
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all">
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-all shadow-lg shadow-primary/25">
              <Plus className="w-4 h-4" />
              Novo Cadastro
            </button>
          </>
        }
      />

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/10">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 border border-white/5 focus-within:border-primary/50 transition-all w-72">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou documento..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/20 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium w-16">Tipo</th>
                <th className="px-6 py-4 font-medium">Nome / Razão Social</th>
                <th className="px-6 py-4 font-medium">CPF/CNPJ</th>
                <th className="px-6 py-4 font-medium">Classificação</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {parceiros.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded">
                      {p.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{p.nome}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.documento}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {p.tipos.map(t => (
                        <span key={t} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full border border-primary/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-colors" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-warning/20 text-muted-foreground hover:text-warning transition-colors" title="Bloquear">
                        <Ban className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors" title="Excluir">
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

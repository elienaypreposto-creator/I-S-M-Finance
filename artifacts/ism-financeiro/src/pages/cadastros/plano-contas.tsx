import { PageHeader } from "@/components/shared/page-header";
import { Plus, Settings } from "lucide-react";

export default function PlanoContas() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Plano de Contas" 
        description="Estrutura hierárquica de categorias financeiras"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-all shadow-lg shadow-primary/25">
            <Plus className="w-4 h-4" />
            Nova Categoria
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Receitas */}
        <div className="glass-panel rounded-2xl overflow-hidden border-teal-500/20">
          <div className="bg-teal-500/20 p-4 border-b border-teal-500/30 flex justify-between items-center">
            <h3 className="font-bold text-teal-400">Receitas (+)</h3>
            <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded">Grupo 1.0</span>
          </div>
          <div className="p-4 space-y-2">
            {['1.01 Receita de Serviços', '1.02 Outras Entradas', '1.03 Receitas Financeiras'].map(cat => (
              <div key={cat} className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center hover:bg-white/10 cursor-pointer transition-colors group">
                <span className="text-sm font-medium text-white">{cat}</span>
                <Settings className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            <button className="w-full py-2 border-2 border-dashed border-white/10 rounded-lg text-sm text-muted-foreground hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2 mt-4">
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>
        </div>

        {/* Custos */}
        <div className="glass-panel rounded-2xl overflow-hidden border-blue-500/20">
          <div className="bg-blue-500/20 p-4 border-b border-blue-500/30 flex justify-between items-center">
            <h3 className="font-bold text-blue-400">Custos (CSP) (-)</h3>
            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Grupo 2.0</span>
          </div>
          <div className="p-4 space-y-2">
            {['2.01 Folha PJ', '2.02 Fornecedores CSP', '2.03 Pessoal e Encargos'].map(cat => (
              <div key={cat} className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center hover:bg-white/10 cursor-pointer transition-colors group">
                <span className="text-sm font-medium text-white">{cat}</span>
                <Settings className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            <button className="w-full py-2 border-2 border-dashed border-white/10 rounded-lg text-sm text-muted-foreground hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2 mt-4">
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>
        </div>

        {/* Despesas */}
        <div className="glass-panel rounded-2xl overflow-hidden border-orange-500/20">
          <div className="bg-orange-500/20 p-4 border-b border-orange-500/30 flex justify-between items-center">
            <h3 className="font-bold text-orange-400">Despesas (-)</h3>
            <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">Grupo 3.0</span>
          </div>
          <div className="p-4 space-y-2">
            {['3.01 Administrativas', '3.02 Despesa Pessoal', '3.03 Ocupação', '3.04 Financeiras'].map(cat => (
              <div key={cat} className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center hover:bg-white/10 cursor-pointer transition-colors group">
                <span className="text-sm font-medium text-white">{cat}</span>
                <Settings className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            <button className="w-full py-2 border-2 border-dashed border-white/10 rounded-lg text-sm text-muted-foreground hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2 mt-4">
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

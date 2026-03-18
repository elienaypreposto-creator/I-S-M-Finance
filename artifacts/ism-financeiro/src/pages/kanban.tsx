import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Plus, MoreVertical, MessageSquare, Clock } from "lucide-react";
import { format } from "date-fns";

const initialData = {
  columns: [
    { id: 'solicitado', title: 'Solicitado', color: 'bg-slate-500' },
    { id: 'em_analise', title: 'Em Análise', color: 'bg-blue-500' },
    { id: 'em_execucao', title: 'Em Execução', color: 'bg-orange-500' },
    { id: 'aguardando_aprovacao', title: 'Aguardando', color: 'bg-purple-500' },
    { id: 'concluido', title: 'Concluído', color: 'bg-success' }
  ],
  cards: [
    { id: '1', title: 'Aprovação de Reembolso', colId: 'solicitado', priority: 'Média', date: new Date().toISOString() },
    { id: '2', title: 'Pagamento Fornecedor AWS', colId: 'em_analise', priority: 'Alta', date: new Date().toISOString() },
    { id: '3', title: 'Fechamento Folha', colId: 'em_execucao', priority: 'Urgente', date: new Date().toISOString() },
    { id: '4', title: 'Revisão Contratos', colId: 'concluido', priority: 'Baixa', date: new Date().toISOString() },
  ]
};

const PriorityBadge = ({ level }: { level: string }) => {
  const colors: Record<string, string> = {
    'Baixa': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    'Média': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Alta': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Urgente': 'bg-destructive/20 text-destructive border-destructive/30',
  };
  
  return (
    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md border ${colors[level] || colors['Baixa']}`}>
      {level}
    </span>
  );
};

export default function Kanban() {
  // Simplified visual representation for now. A full dnd-kit implementation requires multiple files.
  // We showcase the beautiful UI design.
  
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <PageHeader 
        title="Quadro de Solicitações" 
        description="Acompanhamento de fluxos do departamento financeiro"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-all shadow-lg shadow-primary/25">
            <Plus className="w-4 h-4" />
            Nova Solicitação
          </button>
        }
      />

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max items-start">
          {initialData.columns.map(col => {
            const columnCards = initialData.cards.filter(c => c.colId === col.id);
            
            return (
              <div key={col.id} className="w-80 flex flex-col h-full max-h-full bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-card/50">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${col.color}`} />
                    <h3 className="font-semibold text-white">{col.title}</h3>
                    <span className="bg-white/10 text-white text-xs py-0.5 px-2 rounded-full ml-1">
                      {columnCards.length}
                    </span>
                  </div>
                  <button className="text-muted-foreground hover:text-white">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                  {columnCards.map(card => (
                    <div 
                      key={card.id} 
                      className="bg-card p-4 rounded-xl border border-white/10 shadow-sm hover:border-primary/50 hover:shadow-primary/10 transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <PriorityBadge level={card.priority} />
                        <button className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <h4 className="text-sm font-medium text-white mb-4 line-clamp-2 leading-snug">
                        {card.title}
                      </h4>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {format(new Date(card.date), 'dd/MM')}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {columnCards.length === 0 && (
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl text-sm text-muted-foreground">
                      Arraste itens para cá
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

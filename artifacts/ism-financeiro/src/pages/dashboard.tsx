import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  AlertCircle, 
  Clock,
  Download
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { formatCurrency } from "@/lib/utils";

// Mock Data for beautiful presentation
const kpiData = {
  contasReceberAtraso: 15420.50,
  contasReceberAberto: 89300.00,
  contasPagarAberto: 45200.00,
  contasPagarAtraso: 3100.00
};

const projectionData = [
  { data: '01/10', saldo: 150000, receber: 5000, pagar: 2000 },
  { data: '05/10', saldo: 153000, receber: 10000, pagar: 8000 },
  { data: '10/10', saldo: 155000, receber: 15000, pagar: 5000 },
  { data: '15/10', saldo: 165000, receber: 20000, pagar: 12000 },
  { data: '20/10', saldo: 173000, receber: 8000, pagar: 15000 },
  { data: '25/10', saldo: 166000, receber: 5000, pagar: 20000 },
  { data: '30/10', saldo: 151000, receber: 25000, pagar: 10000 },
];

const inadimplenciaClientes = [
  { id: 1, nome: "Tech Solutions S.A.", valor: 5400 },
  { id: 2, nome: "Global Industries", valor: 3200 },
  { id: 3, nome: "Inova Sistemas", valor: 1850 },
  { id: 4, nome: "Alpha Consultoria", valor: 980 },
];

const inadimplenciaFornecedores = [
  { id: 1, nome: "Amazon Web Services", valor: 1200 },
  { id: 2, nome: "Google Cloud", valor: 850 },
  { id: 3, nome: "Office Supplies Ltda", valor: 450 },
];

const fluxoCaixaData = [
  { mes: 'Jan', entradas: 120000, saidas: 90000 },
  { mes: 'Fev', entradas: 135000, saidas: 95000 },
  { mes: 'Mar', entradas: 140000, saidas: 105000 },
  { mes: 'Abr', entradas: 130000, saidas: 110000 },
  { mes: 'Mai', entradas: 155000, saidas: 98000 },
  { mes: 'Jun', entradas: 165000, saidas: 102000 },
];

const saidasPlanoContas = [
  { name: 'Folha PJ', value: 45000, color: '#3BA8DC' },
  { name: 'Fornecedores CSP', value: 25000, color: '#E67E22' },
  { name: 'Impostos', value: 15000, color: '#E74C3C' },
  { name: 'Despesas Admin', value: 10000, color: '#F39C12' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-white font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Painel de Controle" 
        description="Visão geral financeira e indicadores da ISM Tecnologia"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all">
            <Download className="w-4 h-4" />
            Exportar Relatório
          </button>
        }
      />

      {/* Row 1: KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="A Receber (Atraso)" 
          value={formatCurrency(kpiData.contasReceberAtraso)} 
          icon={<Clock className="w-6 h-6" />}
          colorClass="text-teal-400"
          trend="12%" trendUp={false}
        />
        <MetricCard 
          title="A Receber (Mês)" 
          value={formatCurrency(kpiData.contasReceberAberto)} 
          icon={<ArrowDownRight className="w-6 h-6" />}
          colorClass="text-success"
          trend="8%" trendUp={true}
        />
        <MetricCard 
          title="A Pagar (Mês)" 
          value={formatCurrency(kpiData.contasPagarAberto)} 
          icon={<ArrowUpRight className="w-6 h-6" />}
          colorClass="text-orange-400"
          trend="3%" trendUp={false}
        />
        <MetricCard 
          title="A Pagar (Atraso)" 
          value={formatCurrency(kpiData.contasPagarAtraso)} 
          icon={<AlertCircle className="w-6 h-6" />}
          colorClass="text-destructive"
          trend="5%" trendUp={false}
        />
      </div>

      {/* Row 2: Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Situação no Mês Atual</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Projeção de Recebimentos</span>
                <span className="font-semibold text-success">{formatCurrency(125000)}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Projeção de Pagamentos</span>
                <span className="font-semibold text-destructive">{formatCurrency(85000)}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-destructive h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Lucro Líquido Projetado</span>
                <span className="text-xl font-bold text-primary">{formatCurrency(40000)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Projeção Próximos 30 Dias</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none">
              <option value="15">15 Dias</option>
              <option value="30">30 Dias</option>
              <option value="60">60 Dias</option>
            </select>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="data" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val/1000}k`} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="saldo" name="Saldo" stroke="#3BA8DC" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="receber" name="Receber" stroke="#27AE60" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="pagar" name="Pagar" stroke="#E74C3C" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Inadimplência Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-white/5 flex gap-4">
            <button className="text-sm font-semibold text-white border-b-2 border-primary pb-1">Inadimplência Clientes</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-white pb-1 transition-colors">A Vencer</button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Cliente</th>
                  <th className="px-5 py-3 font-medium text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inadimplenciaClientes.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3 font-medium text-white">{item.nome}</td>
                    <td className="px-5 py-3 text-right text-destructive font-semibold">{formatCurrency(item.valor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-white/5 flex gap-4">
            <button className="text-sm font-semibold text-white border-b-2 border-orange-500 pb-1">Inadimplência Fornecedores</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-white pb-1 transition-colors">A Vencer</button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Fornecedor</th>
                  <th className="px-5 py-3 font-medium text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inadimplenciaFornecedores.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3 font-medium text-white">{item.nome}</td>
                    <td className="px-5 py-3 text-right text-orange-400 font-semibold">{formatCurrency(item.valor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 4: Visão Financeira */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Visão Financeira (Anual)</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[300px]">
            <h4 className="text-sm font-medium text-muted-foreground mb-4 text-center">Fluxo de Caixa Mensal</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fluxoCaixaData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="mes" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val/1000}k`} />
                <RechartsTooltip cursor={{fill: '#ffffff05'}} content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="entradas" name="Entradas" fill="#27AE60" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="saidas" name="Saídas" fill="#E74C3C" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-[300px] flex flex-col items-center">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Saídas por Categoria</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={saidasPlanoContas}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {saidasPlanoContas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

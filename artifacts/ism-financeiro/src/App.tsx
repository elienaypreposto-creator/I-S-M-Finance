import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "./components/layout/app-layout";
import NotFound from "@/pages/not-found";

// Pages
import Dashboard from "./pages/dashboard";
import Kanban from "./pages/kanban";
import Lancamentos from "./pages/lancamentos";
import ConciliacaoList from "./pages/conciliacao/index";
import Parceiros from "./pages/cadastros/parceiros";
import PlanoContas from "./pages/cadastros/plano-contas";

const queryClient = new QueryClient();

// Placeholder for un-implemented explicit pages to ensure links don't hard crash
function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl text-primary">🚧</span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Página em Construção</h2>
      <p className="text-muted-foreground max-w-md">
        Esta tela está sendo desenvolvida e estará disponível na próxima atualização do sistema.
      </p>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/kanban" component={Kanban} />
      <Route path="/lancamentos" component={Lancamentos} />
      <Route path="/conciliacao" component={ConciliacaoList} />
      
      {/* Cadastros */}
      <Route path="/cadastros/parceiros" component={Parceiros} />
      <Route path="/cadastros/plano-contas" component={PlanoContas} />
      <Route path="/cadastros/:any*" component={ComingSoon} />
      
      {/* Relatorios & Config */}
      <Route path="/relatorios/:any*" component={ComingSoon} />
      <Route path="/configuracoes/:any*" component={ComingSoon} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppLayout>
            <Router />
          </AppLayout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

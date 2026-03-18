import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  colorClass?: string;
}

export function MetricCard({ title, value, icon, trend, trendUp, colorClass = "text-primary" }: MetricCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-white/5 shadow-lg relative overflow-hidden group hover:border-white/10 transition-colors">
      <div className={cn("absolute top-0 left-0 w-1 h-full", colorClass.replace("text-", "bg-"))} />
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight text-white">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn("text-xs font-medium", trendUp ? "text-success" : "text-destructive")}>
                {trendUp ? "+" : "-"}{trend}
              </span>
              <span className="text-xs text-muted-foreground">vs. último mês</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl bg-white/5", colorClass)}>
          {icon}
        </div>
      </div>
      
      {/* Decorative gradient blob */}
      <div className={cn("absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-10", colorClass.replace("text-", "bg-"))} />
    </div>
  );
}

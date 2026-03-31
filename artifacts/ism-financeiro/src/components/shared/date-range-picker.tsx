import { useState, useRef, useEffect } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Check 
} from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval, startOfDay, subDays, setMonth, setYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  startDate: string; // ISO string
  endDate: string; // ISO string
  onChange: (start: string, end: string) => void;
  className?: string;
}

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function DateRangePicker({ startDate, endDate, onChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStart, setTempStart] = useState<Date>(startDate ? new Date(startDate + "T00:00:00") : new Date());
  const [tempEnd, setTempEnd] = useState<Date>(endDate ? new Date(endDate + "T00:00:00") : new Date());
  const [viewDate, setViewDate] = useState<Date>(tempStart);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = () => {
    onChange(format(tempStart, "yyyy-MM-dd"), format(tempEnd, "yyyy-MM-dd"));
    setIsOpen(false);
  };

  const handlePreset = (days: number) => {
    const end = startOfDay(new Date());
    const start = subDays(end, days - 1);
    setTempStart(start);
    setTempEnd(end);
    setViewDate(start);
  };

  const handleToday = () => {
    const today = startOfDay(new Date());
    setTempStart(today);
    setTempEnd(today);
    setViewDate(today);
  };

  const renderCalendar = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days = eachDayOfInterval({ start, end });
    
    // Fill empty days at start
    const startPadding = start.getDay();
    const padding = Array.from({ length: startPadding }).map((_, i) => <div key={`pad-${i}`} />);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4 mb-2">
           <span className="text-sm font-bold text-white capitalize">
             {format(date, "MMM yyyy", { locale: ptBR })}
           </span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map(d => (
            <div key={d} className="text-[10px] font-bold text-muted-foreground text-center py-1">{d}</div>
          ))}
          {padding}
          {days.map(day => {
            const isSelected = isSameDay(day, tempStart) || isSameDay(day, tempEnd);
            const isInRange = isWithinInterval(day, { start: tempStart < tempEnd ? tempStart : tempEnd, end: tempStart < tempEnd ? tempEnd : tempStart });
            
            return (
              <button
                key={day.toISOString()}
                onClick={() => {
                  if (isSameDay(day, tempStart)) return;
                  if (tempStart && !tempEnd) {
                    if (day < tempStart) { setTempEnd(tempStart); setTempStart(day); }
                    else setTempEnd(day);
                  } else {
                    setTempStart(day);
                    setTempEnd(null as any);
                  }
                }}
                className={cn(
                  "h-8 w-8 text-xs rounded-lg flex items-center justify-center transition-all",
                  isSelected ? "bg-primary text-white font-bold" : 
                  isInRange ? "bg-primary/20 text-primary" : "hover:bg-white/5 text-muted-foreground"
                )}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-black/20 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all text-xs font-medium text-white shadow-lg"
      >
        <CalendarIcon className="w-3.5 h-3.5 text-primary" />
        {startDate ? format(new Date(startDate + "T00:00:00"), "dd/MM/yyyy") : "Início"}
        <span className="text-muted-foreground/40">até</span>
        {endDate ? format(new Date(endDate + "T00:00:00"), "dd/MM/yyyy") : "Fim"}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-3 p-6 bg-card border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] w-[750px] animate-in fade-in slide-in-from-top-2">
          {/* Header Facet: Presets */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-2">Últimos</span>
              {[7, 15, 30].map(d => (
                <button key={d} onClick={() => handlePreset(d)} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold text-white transition-all">
                  {d} Dias
                </button>
              ))}
            </div>
            <button onClick={handleToday} className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest">
              Apenas Hoje
            </button>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Input & Calendar Section */}
            <div className="col-span-8 flex flex-col gap-6">
               <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">De</label>
                    <div className="flex items-center gap-2 p-2 bg-black/40 border border-white/5 rounded-xl text-xs font-bold text-white">
                      <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                      {format(tempStart, "dd/MM/yyyy")}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Até</label>
                    <div className="flex items-center gap-2 p-2 bg-black/40 border border-white/5 rounded-xl text-xs font-bold text-white">
                      <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                      {tempEnd ? format(tempEnd, "dd/MM/yyyy") : "--/--/----"}
                    </div>
                  </div>
               </div>

               <div className="flex gap-8">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <button onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-1 hover:bg-white/10 rounded-lg text-white">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-1 hover:bg-white/10 rounded-lg text-white">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    {renderCalendar(viewDate)}
                  </div>
                  <div className="flex-1">
                    <div className="h-6" /> {/* Placeholder to align with prev nav */}
                    {renderCalendar(addMonths(viewDate, 1))}
                  </div>
               </div>
            </div>

            {/* Month/Year Selector Section */}
            <div className="col-span-4 border-l border-white/5 pl-8 space-y-6">
               <div className="flex items-center justify-between">
                 <button onClick={() => setViewDate(setYear(viewDate, viewDate.getFullYear() - 1))} className="p-1 hover:bg-white/10 rounded-lg text-white">
                    <ChevronLeft className="w-4 h-4" />
                 </button>
                 <span className="text-sm font-black text-white">{viewDate.getFullYear()}</span>
                 <button onClick={() => setViewDate(setYear(viewDate, viewDate.getFullYear() + 1))} className="p-1 hover:bg-white/10 rounded-lg text-white">
                    <ChevronRight className="w-4 h-4" />
                 </button>
               </div>

               <div className="grid grid-cols-2 gap-2">
                  {MONTHS.map((m, i) => {
                    const isSelected = viewDate.getMonth() === i;
                    return (
                      <button 
                        key={m} 
                        onClick={() => setViewDate(setMonth(viewDate, i))}
                        className={cn(
                          "px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all text-left",
                          isSelected ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {m}
                      </button>
                    );
                  })}
               </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            <button onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 hover:bg-destructive/10 text-white hover:text-destructive text-xs font-black transition-all">
               <X className="w-3.5 h-3.5" /> CANCELAR
            </button>
            <button onClick={handleApply} className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-black shadow-lg shadow-primary/20 transition-all">
               APLICAR PERÍODO <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { mockCalendarEvents } from '../lib/mock-data';

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth] = useState(new Date(2026, 2, 1)); // March 2026

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const getEventsForDate = (day: number) => {
    const dateStr = `2026-03-${String(day).padStart(2, '0')}`;
    return mockCalendarEvents.filter(event => event.date === dateStr);
  };

  const selectedEvents = selectedDate ? mockCalendarEvents.filter(e => e.date === selectedDate) : [];

  const getEventBadgeVariant = (type: string) => {
    const variants: Record<string, 'success' | 'info' | 'warning' | 'secondary'> = {
      'IPO': 'success',
      'Earnings': 'info',
      'Dividend': 'warning',
      'Split': 'secondary',
    };
    return variants[type] || 'default';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">Calendar</h1>
        <p className="text-[14px] text-muted-foreground">
          Track corporate actions and important dates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <GlassCard className="p-4 md:p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] font-semibold text-foreground">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-[12px] font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `2026-03-${String(day).padStart(2, '0')}`;
                const events = getEventsForDate(day);
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`aspect-square rounded-lg p-2 text-left transition-all ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : events.length > 0
                        ? 'bg-accent hover:bg-accent/80'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <div className="text-[14px] font-medium mb-1">{day}</div>
                    {events.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {events.slice(0, 2).map((event, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              event.type === 'IPO' ? 'bg-success' :
                              event.type === 'Earnings' ? 'bg-blue-500' :
                              event.type === 'Dividend' ? 'bg-amber-500' :
                              'bg-secondary'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Event Details Panel */}
        <div>
          {selectedDate ? (
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-semibold text-foreground">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedEvents.map((event) => (
                    <div key={event.id} className="p-4 rounded-lg bg-accent/50">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[12px] font-bold text-primary">
                            {event.stockCode.substring(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold text-foreground">
                            {event.stockCode}
                          </p>
                          <p className="text-[12px] text-muted-foreground truncate">
                            {event.stockName}
                          </p>
                        </div>
                      </div>
                      <Badge variant={getEventBadgeVariant(event.type)} className="mb-2">
                        {event.type}
                      </Badge>
                      <p className="text-[13px] text-foreground">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] text-muted-foreground text-center py-8">
                  No events on this date
                </p>
              )}
            </GlassCard>
          ) : (
            <GlassCard className="p-6">
              <p className="text-[14px] text-muted-foreground text-center py-8">
                Select a date to view events
              </p>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Legend */}
      <GlassCard className="p-4">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="text-[12px] font-medium text-muted-foreground">Legend:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-[12px] text-foreground">IPO</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-[12px] text-foreground">Earnings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-[12px] text-foreground">Dividend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-[12px] text-foreground">Stock Split</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
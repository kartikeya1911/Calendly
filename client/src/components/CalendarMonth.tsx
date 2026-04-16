import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarMonthProps = {
  monthDate: dayjs.Dayjs;
  selectedDate: string;
  onChangeMonth: (next: dayjs.Dayjs) => void;
  onSelectDate: (value: string) => void;
};

export function CalendarMonth({
  monthDate,
  selectedDate,
  onChangeMonth,
  onSelectDate,
}: CalendarMonthProps) {
  const start = monthDate.startOf("month").startOf("week");
  const end = monthDate.endOf("month").endOf("week");
  const today = dayjs().format("YYYY-MM-DD");

  const days: dayjs.Dayjs[] = [];
  let cursor = start;
  while (cursor.isBefore(end) || cursor.isSame(end, "day")) {
    days.push(cursor);
    cursor = cursor.add(1, "day");
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={() => onChangeMonth(monthDate.subtract(1, "month"))}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border-0 bg-transparent"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <h3 className="text-base font-semibold text-text-primary">
          {monthDate.format("MMMM YYYY")}
        </h3>
        <button
          type="button"
          onClick={() => onChangeMonth(monthDate.add(1, "month"))}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border-0 bg-transparent"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <span
            key={day}
            className="text-center text-[11px] font-semibold text-text-muted tracking-wide"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const iso = day.format("YYYY-MM-DD");
          const isSelected = iso === selectedDate;
          const isOtherMonth = !day.isSame(monthDate, "month");
          const isToday = iso === today;
          const isPast = day.isBefore(dayjs(), "day");

          return (
            <button
              key={iso}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(iso)}
              className={`
                relative aspect-square flex items-center justify-center
                text-sm font-medium rounded-full transition-all duration-200
                border-0 cursor-pointer
                ${isSelected
                  ? "bg-brand text-white shadow-md shadow-brand/25"
                  : isToday
                    ? "bg-brand-50 text-brand font-semibold"
                    : isOtherMonth || isPast
                      ? "text-gray-300 cursor-default bg-transparent"
                      : "text-text-primary hover:bg-brand-50 hover:text-brand bg-transparent"
                }
              `}
            >
              {day.date()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

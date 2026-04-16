import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { availabilityApi } from "../api";
import type { AvailabilityRule } from "../types";
import { Check, Globe, Clock } from "lucide-react";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIMEZONES = [
  "Asia/Kolkata",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
  "Pacific/Auckland",
  "UTC",
];

export function AvailabilityPage() {
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    availabilityApi.get().then((data) => {
      setTimezone(data.timezone);
      setRules(data.rules);
    });
  }, []);

  function toggleDay(dayIndex: number) {
    const existing = rules.find((rule) => rule.dayOfWeek === dayIndex);
    if (existing) {
      setRules((prev) => prev.filter((rule) => rule.dayOfWeek !== dayIndex));
    } else {
      setRules((prev) => [
        ...prev,
        { dayOfWeek: dayIndex, startTime: "09:00", endTime: "17:00" },
      ]);
    }
  }

  function updateRule(dayIndex: number, field: "startTime" | "endTime", value: string) {
    setRules((prev) =>
      prev.map((rule) =>
        rule.dayOfWeek === dayIndex ? { ...rule, [field]: value } : rule
      )
    );
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    await availabilityApi.update({
      timezone,
      rules: rules
        .map((rule) => ({
          dayOfWeek: rule.dayOfWeek,
          startTime: rule.startTime,
          endTime: rule.endTime,
        }))
        .sort((a, b) => a.dayOfWeek - b.dayOfWeek),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Availability</h2>
        <p className="text-sm text-text-secondary mt-1">
          Set your weekly schedule so invitees know when you're available.
        </p>
      </div>

      <form onSubmit={onSave} className="space-y-6">
        {/* Timezone Selector */}
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-brand" />
            <label className="text-sm font-semibold text-text-primary">Timezone</label>
          </div>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full max-w-sm border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-brand focus:ring-2 focus:ring-brand/10 outline-none transition-all bg-white cursor-pointer"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Weekly Schedule */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand" />
              <h3 className="text-sm font-semibold text-text-primary">Weekly Hours</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {DAYS.map((label, dayIndex) => {
              const rule = rules.find((item) => item.dayOfWeek === dayIndex);
              const enabled = Boolean(rule);
              const isWeekend = dayIndex === 0 || dayIndex === 6;

              return (
                <div
                  key={label}
                  className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${
                    enabled ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleDay(dayIndex)}
                    className={`
                      relative flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-opacity-75
                      ${enabled ? "bg-brand" : "bg-gray-200"}
                    `}
                  >
                    <span
                      className={`
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                        ${enabled ? "translate-x-5" : "translate-x-0"}
                      `}
                    />
                  </button>

                  {/* Day name */}
                  <span
                    className={`w-24 text-sm font-semibold ${
                      enabled ? "text-text-primary" : "text-text-muted"
                    }`}
                  >
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{SHORT_DAYS[dayIndex]}</span>
                    {isWeekend && (
                      <span className="ml-1.5 text-[10px] text-text-muted font-normal hidden sm:inline">
                        (weekend)
                      </span>
                    )}
                  </span>

                  {/* Time range */}
                  {enabled ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={rule?.startTime}
                        onChange={(e) => updateRule(dayIndex, "startTime", e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:border-brand focus:ring-2 focus:ring-brand/10 outline-none transition-all bg-white"
                      />
                      <span className="text-xs text-text-muted font-medium">to</span>
                      <input
                        type="time"
                        value={rule?.endTime}
                        onChange={(e) => updateRule(dayIndex, "endTime", e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:border-brand focus:ring-2 focus:ring-brand/10 outline-none transition-all bg-white"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-text-muted">Unavailable</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-dark transition-colors shadow-sm shadow-brand/20 cursor-pointer border-0"
          >
            Save Availability
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-success font-medium animate-fade-in">
              <Check className="w-4 h-4" />
              Saved successfully
            </span>
          )}
        </div>
      </form>
    </section>
  );
}

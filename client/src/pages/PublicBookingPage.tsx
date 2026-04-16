import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { CalendarMonth } from "../components/CalendarMonth";
import { publicApi } from "../api";
import type { PublicEventType, Slot } from "../types";
import { Clock, Globe, Calendar, Video, ArrowRight, Loader2 } from "lucide-react";

export function PublicBookingPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();

  const [eventType, setEventType] = useState<PublicEventType | null>(null);
  const [monthDate, setMonthDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    publicApi.eventType(slug).then(setEventType);
  }, [slug]);

  useEffect(() => {
    setSelectedSlot(null);
    setLoadingSlots(true);
    publicApi
      .slots(slug, selectedDate)
      .then((data) => setSlots(data.slots))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, slug]);

  const selectedLabel = useMemo(() => {
    if (!selectedSlot) return "";
    return dayjs(selectedSlot.startsAt).format("dddd, MMMM D • h:mm A");
  }, [selectedSlot]);

  async function onBook(e: FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;

    try {
      setError("");
      setSubmitting(true);
      const meeting = await publicApi.book(slug, {
        startsAt: selectedSlot.startsAt,
        name: form.name,
        email: form.email,
      });
      navigate(`/book/${slug}/confirm`, { state: { meeting } });
    } catch {
      setError("This time slot was just booked. Please choose another time.");
      const refreshed = await publicApi.slots(slug, selectedDate);
      setSlots(refreshed.slots);
      setSelectedSlot(null);
    } finally {
      setSubmitting(false);
    }
  }

  if (!eventType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-text-secondary">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Loading booking page...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      {/* Branding */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-sm">
          <Calendar className="w-4 h-4 text-brand" />
          <span className="text-xs font-semibold text-brand">Calendly</span>
        </div>
      </div>

      {/* Booking Card */}
      <div className="max-w-[1100px] mx-auto bg-white rounded-2xl border border-border shadow-lg shadow-gray-200/50 overflow-hidden animate-slide-up">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px]">
          {/* Left: Event Info */}
          <section className="p-6 lg:border-r border-border">
            <div className="space-y-4">
              <div>
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-brand">
                    {eventType.hostName.charAt(0)}
                  </span>
                </div>
                <p className="text-sm font-medium text-text-secondary">
                  {eventType.hostName}
                </p>
                <h2 className="text-xl font-bold text-text-primary mt-1">
                  {eventType.name}
                </h2>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <Clock className="w-4 h-4 text-text-muted shrink-0" />
                  <span>{eventType.durationMinutes} min</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <Video className="w-4 h-4 text-text-muted shrink-0" />
                  <span>Web conferencing details provided upon confirmation</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <Globe className="w-4 h-4 text-text-muted shrink-0" />
                  <span>{eventType.timezone.replace(/_/g, " ")}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Center: Calendar */}
          <section className="p-6 border-t lg:border-t-0 lg:border-r border-border">
            <h3 className="text-base font-semibold text-text-primary mb-4">
              Select a Date & Time
            </h3>
            <CalendarMonth
              monthDate={monthDate}
              selectedDate={selectedDate}
              onChangeMonth={setMonthDate}
              onSelectDate={setSelectedDate}
            />
          </section>

          {/* Right: Time Slots */}
          <section className="p-6 border-t lg:border-t-0">
            <h3 className="text-sm font-semibold text-text-primary mb-1">
              {dayjs(selectedDate).format("dddd, MMMM D")}
            </h3>
            <p className="text-xs text-text-muted mb-4">
              {slots.length} {slots.length === 1 ? "slot" : "slots"} available
            </p>

            {loadingSlots ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-brand" />
              </div>
            ) : (
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {slots.map((slot) => {
                  const isChosen = selectedSlot?.startsAt === slot.startsAt;
                  return (
                    <button
                      key={slot.startsAt}
                      type="button"
                      onClick={() => setSelectedSlot(isChosen ? null : slot)}
                      className={`
                        w-full py-2.5 px-4 rounded-lg text-sm font-semibold
                        border transition-all duration-200 cursor-pointer
                        ${
                          isChosen
                            ? "bg-brand text-white border-brand shadow-md shadow-brand/20"
                            : "bg-white text-brand border-brand/30 hover:border-brand hover:bg-brand-50"
                        }
                      `}
                    >
                      {slot.label}
                    </button>
                  );
                })}
                {!slots.length && (
                  <div className="text-center py-8">
                    <Clock className="w-8 h-8 text-text-muted mx-auto mb-2" />
                    <p className="text-sm text-text-muted">
                      No available times for this date.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Booking Form */}
            {selectedSlot && (
              <form
                onSubmit={onBook}
                className="mt-5 pt-5 border-t border-gray-100 space-y-3 animate-fade-in"
              >
                <p className="text-xs font-medium text-brand">{selectedLabel}</p>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Name
                  </label>
                  <input
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand focus:ring-2 focus:ring-brand/10 outline-none transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand focus:ring-2 focus:ring-brand/10 outline-none transition-all bg-white"
                  />
                </div>
                {error && (
                  <p className="text-xs text-danger font-medium bg-danger-light rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-brand text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-60 cursor-pointer border-0"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Schedule Event
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-xs text-text-muted">
          Powered by{" "}
          <a href="/" className="text-brand font-semibold no-underline hover:underline">
            Calendly Clone
          </a>
        </p>
      </div>
    </div>
  );
}

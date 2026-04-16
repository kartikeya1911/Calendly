import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { meetingsApi } from "../api";
import type { Meeting } from "../types";
import { Calendar, Clock, Mail, User, XCircle } from "lucide-react";

export function MeetingsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  async function load(type: "upcoming" | "past") {
    setLoading(true);
    setMeetings(await meetingsApi.list(type));
    setLoading(false);
  }

  useEffect(() => {
    load(tab);
  }, [tab]);

  async function cancelMeeting(id: number) {
    if (!confirm("Cancel this meeting? The invitee will be notified.")) return;
    await meetingsApi.cancel(id);
    await load(tab);
  }


  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Meetings</h2>
        <p className="text-sm text-text-secondary mt-1">
          Review and manage your scheduled meetings.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-6">
        <button
          type="button"
          onClick={() => setTab("upcoming")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer border-0 ${
            tab === "upcoming"
              ? "bg-white text-text-primary shadow-sm"
              : "bg-transparent text-text-secondary hover:text-text-primary"
          }`}
        >
          Upcoming
        </button>
        <button
          type="button"
          onClick={() => setTab("past")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer border-0 ${
            tab === "past"
              ? "bg-white text-text-primary shadow-sm"
              : "bg-transparent text-text-secondary hover:text-text-primary"
          }`}
        >
          Past
        </button>
      </div>

      {/* Meeting Cards */}
      <div className="space-y-3">
        {loading ? (
          // Skeleton loading
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-border p-5 animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-48" />
                  <div className="h-3 bg-gray-100 rounded w-32" />
                  <div className="h-3 bg-gray-100 rounded w-56" />
                </div>
              </div>
            </div>
          ))
        ) : meetings.length ? (
          meetings.map((meeting, i) => {
            const meetingDate = dayjs(meeting.startsAt);
            const endDate = dayjs(meeting.endsAt);
            const isToday = meetingDate.isSame(dayjs(), "day");

            return (
              <div
                key={meeting.id}
                className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all duration-200 group animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Date badge */}
                  <div
                    className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl shrink-0 ${
                      isToday
                        ? "bg-brand text-white"
                        : tab === "upcoming"
                          ? "bg-brand-50 text-brand"
                          : "bg-gray-100 text-text-muted"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase leading-tight">
                      {meetingDate.format("MMM")}
                    </span>
                    <span className="text-xl font-bold leading-tight">
                      {meetingDate.format("DD")}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-text-primary truncate">
                        {meeting.eventType.name}
                      </h3>
                      {isToday && tab === "upcoming" && (
                        <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded-full font-semibold">
                          TODAY
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {meetingDate.format("h:mm A")} – {endDate.format("h:mm A")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {meeting.inviteeName}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        {meeting.inviteeEmail}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-1.5">
                      {meetingDate.format("dddd, MMMM D, YYYY")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {tab === "upcoming" && (
                      <button
                        type="button"
                        onClick={() => cancelMeeting(meeting.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-danger bg-danger-light rounded-lg hover:bg-red-100 transition-colors cursor-pointer border-0"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <Calendar className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              {tab === "upcoming" ? "No upcoming meetings" : "No past meetings"}
            </h3>
            <p className="text-sm text-text-secondary">
              {tab === "upcoming"
                ? "When someone books a meeting with you, it will appear here."
                : "Your completed meetings will show up here."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

import dayjs from "dayjs";
import { Link, useLocation, useParams } from "react-router-dom";
import { CheckCircle2, Calendar, Clock, User, Mail, ArrowLeft, Video } from "lucide-react";

export function BookingConfirmationPage() {
  const { slug = "" } = useParams();
  const location = useLocation();
  const meeting = (location.state as { meeting?: any } | null)?.meeting;

  if (!meeting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-border shadow-lg p-8 text-center max-w-md w-full animate-slide-up">
          <Calendar className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">Booking not found</h2>
          <p className="text-sm text-text-secondary mb-6">
            It seems like this booking may have expired or doesn't exist.
          </p>
          <Link
            to={`/book/${slug}`}
            className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-dark transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to booking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl border border-border shadow-lg max-w-lg w-full overflow-hidden animate-slide-up">
        {/* Success header */}
        <div className="bg-gradient-to-r from-brand to-blue-600 px-8 py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">You are scheduled</h2>
          <p className="text-sm text-white/80">
            A calendar invitation has been sent to your email address.
          </p>
        </div>

        {/* Meeting details */}
        <div className="px-8 py-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-brand mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Event</p>
                <p className="text-sm font-semibold text-text-primary">
                  {meeting.eventType.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-brand mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Host</p>
                <p className="text-sm font-semibold text-text-primary">{meeting.host.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-brand mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide">When</p>
                <p className="text-sm font-semibold text-text-primary">
                  {dayjs(meeting.startsAt).format("dddd, MMMM D, YYYY")}
                </p>
                <p className="text-sm text-text-secondary">
                  {dayjs(meeting.startsAt).format("h:mm A")} –{" "}
                  {dayjs(meeting.endsAt).format("h:mm A")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-brand mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Invitee</p>
                <p className="text-sm font-semibold text-text-primary">
                  {meeting.inviteeName}
                </p>
                <p className="text-sm text-text-secondary">{meeting.inviteeEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Video className="w-4 h-4 text-brand mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
                  Location
                </p>
                <p className="text-sm text-text-secondary">
                  Web conferencing details will be sent to your email
                </p>
              </div>
            </div>
          </div>

          <Link
            to={`/book/${slug}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors no-underline"
          >
            Schedule another meeting
          </Link>
        </div>
      </div>
    </div>
  );
}

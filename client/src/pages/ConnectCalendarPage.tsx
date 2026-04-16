import { useEffect, useState } from "react";
import { Check, Link as LinkIcon, Shield, AlertCircle } from "lucide-react";

const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export function ConnectCalendarPage() {
  const [status, setStatus] = useState<{ connected: boolean; email: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${backendUrl}/api/google/status`)
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Integrations</h2>
        <p className="text-sm text-text-secondary mt-1">
          Connect your calendars and tools to prevent double-bookings.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Google icon */}
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="text-base font-semibold text-text-primary">Google Calendar</h3>
              <p className="text-sm text-text-secondary mt-0.5">
                Check for conflicts and add new events to your calendar automatically.
              </p>

              {loading ? (
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-brand border-t-transparent animate-spin" />
                  <span className="text-sm text-text-muted">Checking connection...</span>
                </div>
              ) : status?.connected ? (
                <div className="mt-4 flex items-center gap-3 bg-success-light rounded-lg px-4 py-3">
                  <Check className="w-4 h-4 text-success shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-success">Connected</p>
                    <p className="text-xs text-text-secondary">
                      Syncing with {status.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Shield className="w-3.5 h-3.5" />
                    <span>We only read your calendar to check availability</span>
                  </div>
                  <a
                    href={`${backendUrl}/api/auth/google`}
                    className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors no-underline shadow-sm shadow-brand/20"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Connect Google Calendar
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="mt-4 bg-blue-50 rounded-xl border border-blue-100 p-4 flex gap-3">
        <AlertCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-text-primary">Why connect your calendar?</p>
          <p className="text-xs text-text-secondary mt-1">
            When connected, your booking page will automatically hide time slots that conflict
            with events on your Google Calendar. This prevents double-bookings without any
            manual effort.
          </p>
        </div>
      </div>
    </section>
  );
}

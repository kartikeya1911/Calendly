import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const teamFeatures = [
  "Multi-person and co-hosted meetings",
  "Round Robin meeting distribution",
  "Meeting reminders, follow-ups, and notifications",
  "Connect payment tools like PayPal or Stripe",
  "Remove Calendly branding",
];

const trustedLogos = [
  { name: "Dropbox", src: "/images/dropbox-customer-logo.svg" },
  { name: "Zendesk", src: "/images/zendesk-customer-logo.svg" },
  { name: "L'Oréal", src: "/images/loreal-customer-logo.svg" },
];

export function SignupPage() {
  const [email, setEmail] = useState("");

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Navigate to event-types (simulated signup)
    window.location.href = "/event-types";
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ─────────── NAV ─────────── */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[64px] px-8">
          <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
            <img src="/images/logo.svg" alt="Calendly" className="h-8" />
          </Link>
          <Link
            to="/login"
            className="px-5 py-2 border border-[#0b3558] text-[#0b3558] rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors no-underline"
          >
            Log In
          </Link>
        </div>
      </header>

      {/* ─────────── MAIN ─────────── */}
      <main className="max-w-[1080px] mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* ═══════ LEFT: Signup Form ═══════ */}
          <div>
            <h1 className="text-[32px] font-extrabold text-[#0b3558] leading-tight tracking-tight">
              Create your free account
            </h1>
            <p className="text-[15px] text-[#486581] mt-2">
              No credit card required. Upgrade anytime.
            </p>

            {/* Email form */}
            <form onSubmit={handleEmailSubmit} className="mt-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#0b3558] placeholder:text-[#94a3b8] focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 bg-white"
                required
              />
              <button
                type="submit"
                className="w-full mt-4 bg-[#006BFF] text-white py-3.5 rounded-full text-sm font-semibold hover:bg-[#0052cc] transition-colors cursor-pointer border-0"
              >
                Continue with email
              </button>
            </form>

            {/* OR divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-[#94a3b8] font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* OAuth buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={`${import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"}/api/auth/google`}
                className="flex items-center gap-3 bg-white border border-gray-300 text-[#0b3558] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors no-underline"
              >
                <img src="/images/Google__G__Logo.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-white border border-gray-300 text-[#0b3558] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors no-underline"
              >
                <img src="/images/microsoftLogo.svg" alt="Microsoft" className="w-5 h-5" />
                Continue with Microsoft
              </a>
            </div>

            <p className="text-xs text-[#94a3b8] mt-4">
              Continue with Google or Microsoft to connect your calendar.
            </p>

            {/* Already have account */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-[15px] text-[#0b3558]">
                Already have an account?{" "}
                <Link
                  to="/event-types"
                  className="text-brand font-semibold no-underline hover:underline inline-flex items-center gap-1"
                >
                  Log In <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>

          {/* ═══════ RIGHT: Teams plan trial ═══════ */}
          <div className="hidden lg:block">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 border border-brand/20 rounded-full mb-6">
              <span className="text-sm font-semibold text-brand">Try Teams plan free</span>
            </div>

            <h2 className="text-[28px] font-extrabold text-[#0b3558] leading-tight tracking-tight">
              Explore premium features with your free 14-day Teams plan trial
            </h2>

            {/* Feature list */}
            <ul className="space-y-4 mt-8">
              {teamFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span className="text-[15px] text-[#486581] leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Trusted logos */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-xs text-[#94a3b8] mb-4">
                Join leading companies using the #1 scheduling tool
              </p>
              <div className="flex items-center gap-8">
                {trustedLogos.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    className="h-5 opacity-60 grayscale"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Mic2,
  Share2,
  Settings2,
} from "lucide-react";
import { LandingNav } from "../components/LandingNav";

/* ─────────────────────── TRUSTED LOGOS ─────────────────────── */

const trustedLogos = [
  { name: "Dropbox", src: "/images/dropbox-customer-logo.svg" },
  { name: "Compass", src: "/images/compass-customer-logo.svg" },
  { name: "Gong", src: "/images/Gong-logo.svg" },
  { name: "Zendesk", src: "/images/zendesk-customer-logo.svg" },
  { name: "Vonage", src: "/images/VonageLogo.svg" },
  { name: "L'Oréal", src: "/images/loreal-customer-logo.svg" },
  { name: "DoorDash", src: "/images/doordash-customer-logo.svg" },
  { name: "Lyft", src: "/images/lyft-customer-logo.svg" },
];

/* ─────────────────────── INTEGRATIONS ─────────────────────── */

const integrationIcons = [
  { name: "Zoom", src: "/images/Zoom.svg" },
  { name: "Salesforce", src: "/images/saleforce.svg" },
  { name: "Google Calendar", src: "/images/google-calendar.svg" },
  { name: "Slack", src: "/images/slack-logo-icon.svg" },
  { name: "Typeform", src: "/images/TypeformIcon.svg" },
  { name: "Gmail", src: "/images/gmail-icon.svg" },
  { name: "Outlook", src: "/images/outlook.svg" },
  { name: "Chrome", src: "/images/Chrome.svg" },
  { name: "Webex", src: "/images/webex-logomark-01.svg" },
  { name: "HubSpot", src: "/images/hubspot.svg" },
  { name: "Active Campaign", src: "/images/activecampaign-logo-icon.svg" },
  { name: "Intercom", src: "/images/intercom.svg" },
  { name: "LinkedIn", src: "/images/linkedin.svg" },
  { name: "Stripe", src: "/images/stripe-logo.svg" },
  { name: "Microsoft Teams", src: "/images/teams.svg" },
  { name: "Zapier", src: "/images/zapier-icon.svg" },
  { name: "PayPal", src: "/images/paypal-icon.svg" },
];


/* ─────────────────────── CUSTOMER STATS ─────────────────────── */

const customerStats = [
  { stat: "169%", label: "return on investment", color: "#006BFF" },
  { stat: "160%", label: "increase in customers reached", color: "#e89a1d" },
  { stat: "20%", label: "decrease in scheduling time", color: "#e89a1d" },
];

/* ─────────────────────── SECURITY BADGES ─────────────────────── */

const securityBadges = [
  { name: "SOC 2", src: "/images/Security-SOC.svg" },
  { name: "PCI DSS", src: "/images/Security-DSS.svg" },
  { name: "GDPR", src: "/images/Security-GDPR.svg" },
  { name: "ISO 27001", src: "/images/ISO-IEC_27001-2.svg" },
  { name: "STAR", src: "/images/Security-Star.svg" },
  { name: "CCPA", src: "/images/Security-CCPA.svg" },
];

export function LandingPage() {

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <LandingNav />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute"
            style={{
              top: "-80px",
              right: "-60px",
              width: "600px",
              height: "600px",
              background: "linear-gradient(135deg, #00a0ff 0%, #006BFF 100%)",
              borderRadius: "40% 60% 60% 40% / 50% 40% 60% 50%",
              opacity: 0.85,
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "-120px",
              right: "-100px",
              width: "500px",
              height: "500px",
              background: "linear-gradient(135deg, #ff40ff 0%, #d946ef 50%, #8b5cf6 100%)",
              borderRadius: "50% 50% 40% 60% / 40% 60% 40% 60%",
              opacity: 0.7,
            }}
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-12 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center min-h-[520px]">
            {/* Left: Copy */}
            <div>
              <h1 className="text-[56px] lg:text-[64px] font-extrabold text-[#0b3558] leading-[1.05] tracking-[-0.02em]">
                Easy
                <br />
                scheduling
                <br />
                ahead
              </h1>
              <p className="text-[17px] text-[#486581] mt-5 max-w-[420px] leading-relaxed">
                Join 20 million professionals who easily book meetings with the #1 scheduling tool.
              </p>

              <div className="flex flex-col gap-3 mt-8 max-w-[320px]">
                <a
                  href="http://localhost:4000/api/auth/google"
                  className="flex items-center gap-3 bg-white border border-gray-200 text-[#0b3558] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors no-underline shadow-sm"
                >
                  <img src="/images/Google__G__Logo.svg" alt="Google" className="w-5 h-5" />
                  Sign up with Google
                </a>
                <Link
                  to="/signup"
                  className="flex items-center gap-3 bg-white border border-gray-200 text-[#0b3558] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors no-underline shadow-sm"
                >
                  <img src="/images/microsoftLogo.svg" alt="Microsoft" className="w-5 h-5" />
                  Sign up with Microsoft
                </Link>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-[#94a3b8]">
                <span>OR</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Link to="/signup" className="text-xs text-brand font-medium underline no-underline hover:underline">
                  Sign up free with email
                </Link>
                <span className="text-xs text-[#94a3b8]">. No credit card required</span>
              </div>
            </div>

            {/* Right: Booking page card */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative z-10 bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-gray-300/40 p-7 max-w-[480px] w-full">
                <h3 className="text-lg font-bold text-[#0b3558] mb-6 leading-snug">
                  Share your booking page
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center">
                        <span className="text-[8px] text-white font-bold">A</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#0b3558]">ACME Inc.</span>
                    </div>
                    <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">Follows by</p>
                    <p className="text-sm font-bold text-[#0b3558] mt-0.5">Client Check-in</p>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#486581]">
                        <div className="w-3 h-3 rounded-full bg-gray-200" />
                        Zoom
                      </div>
                    </div>
                    {/* Mini calendar */}
                    <div className="mt-3 grid grid-cols-7 gap-px text-[8px] text-center text-[#94a3b8]">
                      {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                        <span key={d} className="font-medium text-[#486581]">{d}</span>
                      ))}
                      {Array.from({length: 31}, (_, i) => (
                        <span
                          key={i}
                          className={i === 22 ? "bg-brand text-white rounded-full w-4 h-4 flex items-center justify-center mx-auto" : "py-0.5"}
                        >
                          {i + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <p className="text-[10px] text-[#94a3b8] mb-3">Select a Date & Time</p>
                    <p className="text-xs font-semibold text-[#0b3558] mb-3">Monday, Jul 22</p>
                    <div className="space-y-1.5">
                      {["9:00am", "9:30am", "10:00am", "10:30am", "11:00am"].map((t, i) => (
                        <div
                          key={t}
                          className={`text-[11px] font-medium rounded-md px-3 py-1.5 border text-center ${
                            i === 1
                              ? "bg-brand text-white border-brand"
                              : "text-brand border-brand/30 hover:bg-brand/5"
                          }`}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUSTED BY ═══════════════════ */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-8 py-8">
          <p className="text-center text-sm text-[#486581] mb-6">
            Trusted by more than <strong className="text-[#0b3558]">100,000</strong> of the world's leading organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedLogos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                className="h-6 opacity-50 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CALENDLY MAKES SCHEDULING SIMPLE ═══════════════════ */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-[48px] font-extrabold text-[#0b3558] tracking-tight leading-[1.1]">
              Calendly makes scheduling simple
            </h2>
            <p className="text-lg text-[#486581] mt-5 leading-relaxed max-w-2xl mx-auto">
              Calendly's easy enough for individual users, and powerful enough to meet the needs of
              enterprise organizations — including 86% of the Fortune 500 companies.
            </p>
            <Link
              to="/signup"
              className="inline-block mt-6 px-6 py-2.5 border border-[#0b3558] text-[#0b3558] rounded-full text-sm font-medium hover:bg-gray-50 transition-colors no-underline"
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONNECT YOUR CALENDARS ═══════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/images/Logomark.svg" alt="" className="w-7 h-7" />
                <h2 className="text-[32px] font-extrabold text-[#0b3558] tracking-tight leading-tight">
                  Connect your calendars
                </h2>
              </div>
              <p className="text-[15px] text-[#486581] leading-relaxed max-w-md mb-8">
                Calendly connects up to six calendars to automate scheduling with real-time availability.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Sparkles, label: "Add your availability" },
                  { icon: Mic2, label: "Connect conferencing tools" },
                  { icon: Settings2, label: "Customize your event types" },
                  { icon: Share2, label: "Share your scheduling link" },
                ].map((step) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <step.icon className="w-4 h-4 text-brand" />
                    </div>
                    <p className="text-sm font-medium text-[#0b3558]">{step.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Connect calendar card */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-8 -right-8 w-[300px] h-[300px] bg-gradient-to-br from-[#00a0ff] to-[#d946ef] rounded-[40%_60%_60%_40%/50%_40%_60%_50%] opacity-15" />
              <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl p-6 max-w-sm ml-auto">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold text-brand bg-blue-50 px-2 py-0.5 rounded">Availability</span>
                  <h4 className="text-sm font-semibold text-[#0b3558]">Connect existing calendar</h4>
                </div>
                {/* Google */}
                <div className="border border-gray-200 rounded-xl p-4 mb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <img src="/images/Google__G__Logo.svg" alt="Google" className="w-5 h-5" />
                    <span className="text-base font-bold text-[#0b3558]">Google</span>
                  </div>
                  <a href="#" className="flex items-center justify-between text-sm text-[#486581] py-2 border-t border-gray-100 no-underline hover:text-brand">
                    Google calendars <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
                {/* Microsoft */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <img src="/images/microsoftLogo.svg" alt="Microsoft" className="w-5 h-5" />
                    <span className="text-base font-bold text-[#0b3558]">Microsoft</span>
                  </div>
                  <a href="#" className="flex items-center justify-between text-sm text-[#486581] py-2 border-t border-gray-100 no-underline hover:text-brand">
                    Outlook calendars <ChevronRight className="w-4 h-4" />
                  </a>
                  <a href="#" className="flex items-center justify-between text-sm text-[#486581] py-2 border-t border-gray-100 no-underline hover:text-brand">
                    Exchange calendars <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ INTEGRATIONS GRID ═══════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <div>
              <h2 className="text-[40px] font-extrabold text-[#0b3558] tracking-tight leading-tight">
                Connect Calendly to the tools you already use
              </h2>
              <p className="text-[15px] text-[#486581] mt-4 leading-relaxed">
                Boost productivity with 100+ integrations
              </p>
              <a href="#" className="flex items-center gap-1 text-sm font-medium text-[#0b3558] mt-2 no-underline hover:text-brand transition-colors">
                View all integrations <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-7 gap-3">
              {integrationIcons.map((icon) => (
                <div
                  key={icon.name}
                  className="w-14 h-14 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:shadow-md hover:border-brand/20 transition-all p-2.5"
                  title={icon.name}
                >
                  <img src={icon.src} alt={icon.name} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Google & Microsoft suite cards */}
          <div className="grid sm:grid-cols-2 gap-5 mt-12">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <img src="/images/Google__G__Logo.svg" alt="Google" className="w-5 h-5" />
                <h3 className="text-base font-bold text-[#0b3558]">Google suite</h3>
              </div>
              <p className="text-sm text-[#486581] leading-relaxed">
                Get your job done faster by connecting Calendly to Google Calendar, Meet, Analytics, and more.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <img src="/images/microsoftLogo.svg" alt="Microsoft" className="w-5 h-5" />
                <h3 className="text-base font-bold text-[#0b3558]">Microsoft suite</h3>
              </div>
              <p className="text-sm text-[#486581] leading-relaxed">
                Make your day easier with Calendly integrations for Microsoft Teams, Outlook, Azure SSO, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ MORE THAN A SCHEDULING LINK ═══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-[48px] font-extrabold text-[#0b3558] tracking-tight leading-[1.1]">
            More than a scheduling link
          </h2>
          <p className="text-lg text-[#486581] mt-5 leading-relaxed max-w-2xl mx-auto">
            Calendly's functionality goes way beyond just a scheduling link, with customizable,
            automated features to help you and your team achieve goals faster.
          </p>
          <Link
            to="/signup"
            className="inline-block mt-6 px-6 py-2.5 border border-[#0b3558] text-[#0b3558] rounded-full text-sm font-medium hover:bg-gray-50 transition-colors no-underline"
          >
            Sign up for free
          </Link>
        </div>
      </section>



      {/* ═══════════════════ CUSTOMER STORIES ═══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-[40px] font-extrabold text-[#0b3558] tracking-tight leading-tight">
                Discover how businesses grow<br />with Calendly
              </h2>
              <a href="#" className="flex items-center gap-1 text-sm font-medium text-[#0b3558] mt-3 no-underline hover:text-brand">
                View customer stories <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-[#486581] hover:border-brand hover:text-brand transition-colors cursor-pointer bg-white">
                ←
              </button>
              <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-[#486581] hover:border-brand hover:text-brand transition-colors cursor-pointer bg-white">
                →
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {customerStats.map((item, i) => (
              <div
                key={item.stat}
                className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col justify-between min-h-[280px] relative overflow-hidden group hover:shadow-lg transition-all"
              >
                {/* Decorative blob */}
                <div
                  className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-tr-[100%] transition-transform group-hover:scale-110"
                  style={{
                    background: item.color,
                    opacity: 0.9,
                  }}
                />
                <div>
                  <p className="text-[56px] font-extrabold leading-none" style={{ color: item.color }}>
                    {item.stat}
                  </p>
                  <p className="text-base text-[#486581] mt-2">{item.label}</p>
                </div>
                <a
                  href="#"
                  className="relative z-10 flex items-center gap-1 text-sm font-semibold no-underline mt-6"
                  style={{ color: i === 0 ? "white" : "#0b3558" }}
                >
                  Read now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SECURITY ═══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-[48px] font-extrabold text-[#0b3558] tracking-tight leading-[1.1]">
            Built to keep your organization secure
          </h2>

          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            {securityBadges.map((badge) => (
              <img key={badge.name} src={badge.src} alt={badge.name} className="h-16 hover:scale-105 transition-transform" />
            ))}
          </div>

          <p className="text-[15px] text-[#486581] mt-10 leading-relaxed max-w-xl mx-auto">
            Keep your scheduling data secure with enterprise-grade admin management, security
            integrations, data governance, compliance audits, and privacy protections.
          </p>
          <a href="#" className="flex items-center gap-1 text-sm font-medium text-[#0b3558] mt-4 no-underline hover:text-brand justify-center">
            Learn more <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ═══════════════════ POWER UP CTA ═══════════════════ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <h2 className="text-[40px] font-extrabold text-[#0b3558] tracking-tight leading-tight">
              Power up your<br />scheduling
            </h2>
            <div className="flex flex-col items-start md:items-end gap-3">
              <p className="text-[15px] text-[#486581]">Get started in seconds — for free.</p>
              <div className="flex gap-3">
                <Link
                  to="/signup"
                  className="px-6 py-2.5 border border-[#0b3558] text-[#0b3558] rounded-full text-sm font-medium hover:bg-gray-50 transition-colors no-underline"
                >
                  Start for free
                </Link>
                <a href="#" className="px-6 py-2.5 bg-[#0b3558] text-white rounded-full text-sm font-medium hover:bg-[#0a2540] transition-colors no-underline">
                  Get a demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t border-gray-100 bg-white pt-12 pb-8">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {[
              {
                title: "Product",
                links: [
                  "Scheduling automation", "Meeting Notetaker", "Payments",
                  "Customizable availability", "Mobile apps", "Browser extensions",
                  "Meeting routing", "Event Types", "Email & website embeds",
                  "Reminders & follow-ups", "Meeting polls", "Analytics", "Admin management",
                ],
              },
              {
                title: "Integrations",
                links: [
                  "Google ecosystem", "Microsoft ecosystem", "Calendars",
                  "Video conferencing", "Payment processors", "Sales & CRM",
                  "Recruiting & ATS", "Email messaging", "Embed Calendly",
                  "Analytics", "API & connectors", "Security & compliance",
                ],
              },
              {
                title: "Calendly",
                links: [
                  "Pricing", "Product overview", "Solutions",
                  "For individuals", "For small businesses", "For large companies",
                  "Compare", "Security", "Sign up for free", "Talk to sales", "Get a demo",
                ],
              },
              {
                title: "Resources",
                links: [
                  "Help center", "Resource center", "Blog",
                  "Customer stories", "Learning hub", "Calendly community",
                  "Developer tools", "Release notes",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold text-[#0b3558] mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-[#486581] hover:text-[#0b3558] transition-colors no-underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="text-sm font-bold text-[#0b3558] mb-4">Company</h4>
              <ul className="space-y-2">
                {["About us", "Careers", "Privacy", "Terms"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#486581] hover:text-[#0b3558] transition-colors no-underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/logo.svg" alt="Calendly" className="h-6" />
            </div>
            <p className="text-xs text-[#94a3b8]">
              © 2024 Calendly Clone. Built for demonstration purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

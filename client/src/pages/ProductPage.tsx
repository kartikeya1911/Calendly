import { Link } from "react-router-dom";
import {
  CalendarDays,
  StickyNote,
  CreditCard,
  LayoutGrid,
  Puzzle,
  Smartphone,
  AppWindow,
  Settings,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Zap,
  Users,
  BarChart3,
  Globe,
  Clock,
  Video,
  ChevronDown,
} from "lucide-react";
import { LandingNav } from "../components/LandingNav";

/* ─────────── DATA ─────────── */

const coreProducts = [
  {
    icon: CalendarDays,
    title: "Scheduling",
    desc: "Eliminate the back-and-forth of scheduling. Share your availability, let invitees pick a time, and watch your calendar fill itself.",
    color: "#006BFF",
    features: ["One-on-one meetings", "Group events", "Round-robin routing", "Collective scheduling"],
  },
  {
    icon: StickyNote,
    title: "Notetaker",
    desc: "AI-powered meeting notes that capture key takeaways, action items, and follow-ups — so you can focus on the conversation.",
    color: "#7c3aed",
    features: ["Auto transcription", "Action item extraction", "Meeting summaries", "Searchable archive"],
  },
  {
    icon: CreditCard,
    title: "Payments",
    desc: "Collect payments at the time of booking. Perfect for consultants, coaches, and service professionals.",
    color: "#059669",
    features: ["Stripe integration", "PayPal support", "Custom pricing", "Automatic invoicing"],
  },
];

const platformFeatures = [
  { icon: Puzzle, title: "Integrations", desc: "Connect with 100+ tools including Salesforce, HubSpot, Zoom, and Google Calendar." },
  { icon: Smartphone, title: "Mobile App", desc: "Manage your schedule on the go with our iOS and Android apps." },
  { icon: AppWindow, title: "Browser Extension", desc: "Schedule directly from Gmail, LinkedIn, or any website with one click." },
  { icon: Settings, title: "Admin Controls", desc: "Centralized management with role-based access, usage analytics, and branding controls." },
  { icon: ShieldCheck, title: "Security & Compliance", desc: "SOC 2 Type II certified, GDPR compliant, with SSO/SAML support.", hasBadges: true },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Track meeting volume, popular times, conversion rates, and team performance." },
];

const stats = [
  { value: "20M+", label: "Users worldwide" },
  { value: "100K+", label: "Organizations" },
  { value: "500M+", label: "Meetings booked" },
  { value: "100+", label: "Integrations" },
];

const whyCalendly = [
  { icon: Clock, title: "Save 4+ hours/week", desc: "Eliminate scheduling emails and focus on what matters." },
  { icon: Users, title: "Delight your invitees", desc: "Professional booking experience that reflects your brand." },
  { icon: Zap, title: "Automate workflows", desc: "Reminders, follow-ups, and routing — all on autopilot." },
  { icon: Globe, title: "Go global", desc: "Automatic timezone detection for seamless international scheduling." },
  { icon: Video, title: "Video conferencing", desc: "Auto-add Zoom, Teams, or Google Meet links to every meeting." },
  { icon: LayoutGrid, title: "Customizable pages", desc: "Match your booking page to your brand with colors, logos, and messaging." },
];

export function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute"
            style={{
              top: "-120px",
              right: "-100px",
              width: "700px",
              height: "700px",
              background: "linear-gradient(135deg, #006BFF 0%, #00a0ff 50%, #60d5fa 100%)",
              borderRadius: "40% 60% 60% 40% / 50% 40% 60% 50%",
              opacity: 0.12,
            }}
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-8 pt-20 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left max-w-xl">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">Product</p>
              <h1 className="text-[52px] font-extrabold text-[#0b3558] leading-[1.08] tracking-[-0.02em]">
                The scheduling platform that works for you
              </h1>
              <p className="text-lg text-[#486581] mt-5 leading-relaxed">
                From simple 1:1 meetings to complex multi-host scheduling, Calendly adapts to your workflow
                and eliminates the friction of finding the right time.
              </p>
              <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="flex items-center gap-2 bg-[#006BFF] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0052cc] transition-all shadow-lg shadow-brand/20 no-underline"
                >
                  Start for free <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#overview" className="flex items-center gap-1 text-sm font-medium text-[#0b3558] hover:text-brand transition-colors no-underline">
                  See product overview <ChevronDown className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <img
                src="/images/collect_payments_100__2_.png"
                alt="Collect payments with Calendly"
                className="max-w-full rounded-2xl shadow-2xl shadow-brand/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-[1280px] mx-auto px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-[#006BFF]">{s.value}</p>
                <p className="text-sm text-[#486581] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Products */}
      <section className="max-w-[1280px] mx-auto px-8 py-24" id="overview">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#0b3558] tracking-tight">Core Products</h2>
          <p className="text-lg text-[#486581] mt-4">Three powerful tools, one unified platform.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {coreProducts.map((product) => (
            <div
              key={product.title}
              className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-brand/20 transition-all duration-300 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{ background: `${product.color}12` }}
              >
                <product.icon className="w-7 h-7" style={{ color: product.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#0b3558] mb-3">{product.title}</h3>
              <p className="text-sm text-[#486581] leading-relaxed mb-6">{product.desc}</p>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#486581]">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Features */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-2">Platform</p>
            <h2 className="text-4xl font-extrabold text-[#0b3558] tracking-tight">Built for scale</h2>
            <p className="text-lg text-[#486581] mt-4">Enterprise-ready features that grow with your team.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-brand/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-brand group-hover:scale-110 transition-all duration-300">
                  <f.icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-[#0b3558] mb-2">{f.title}</h3>
                <p className="text-sm text-[#486581] leading-relaxed">{f.desc}</p>
                {'hasBadges' in f && f.hasBadges && (
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    <img src="/images/Security-SOC.svg" alt="SOC 2" className="h-8" />
                    <img src="/images/Security-GDPR.svg" alt="GDPR" className="h-8" />
                    <img src="/images/Security-CCPA.svg" alt="CCPA" className="h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Calendly */}
      <section className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#0b3558] tracking-tight">
            Why choose Calendly?
          </h2>
          <p className="text-lg text-[#486581] mt-4">Join 20 million professionals who trust Calendly.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyCalendly.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#0b3558] mb-1">{item.title}</h3>
                <p className="text-sm text-[#486581] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#006BFF] py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Ready to simplify your scheduling?
          </h2>
          <p className="text-blue-100 mt-4 text-lg">
            Start free — no credit card required.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-[#006BFF] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors no-underline mt-8"
          >
            Get started for free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-[1280px] mx-auto px-8 py-8 text-center">
          <p className="text-xs text-[#94a3b8]">© 2024 Calendly Clone. Built for demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
}

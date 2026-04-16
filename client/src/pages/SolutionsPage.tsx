import { Link } from "react-router-dom";
import {
  User,
  Building2,
  Building,
  ShoppingCart,
  Megaphone,
  HeartHandshake,
  UserSearch,
  GraduationCap,
  Cpu,
  Landmark,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { LandingNav } from "../components/LandingNav";

/* ─────────── DATA ─────────── */

const bySize = [
  {
    icon: User,
    title: "Individuals",
    subtitle: "For solopreneurs & freelancers",
    desc: "Streamline your scheduling with a professional booking page. Eliminate email chains and let clients book time on your terms.",
    features: ["Personal booking page", "1:1 meetings", "Calendar sync", "Email confirmations"],
    color: "#006BFF",
  },
  {
    icon: Building2,
    title: "Small Business",
    subtitle: "For growing teams (2-100)",
    desc: "Coordinate team schedules, automate client onboarding workflows, and provide a seamless booking experience across your team.",
    features: ["Team scheduling", "Round-robin routing", "Shared event types", "Group events"],
    color: "#7c3aed",
  },
  {
    icon: Building,
    title: "Enterprise",
    subtitle: "For large organizations (100+)",
    desc: "Enterprise-grade scheduling with admin controls, SSO, compliance certifications, and a dedicated customer success manager.",
    features: ["SSO/SAML", "Admin management", "Advanced analytics", "Dedicated CSM"],
    color: "#059669",
  },
];

const byTeam = [
  {
    icon: ShoppingCart,
    title: "Sales",
    desc: "Accelerate pipeline velocity with instant lead routing, CRM integration, and automated follow-ups.",
    stat: "40%",
    statLabel: "faster deal cycles",
    highlights: ["Lead routing & round-robin", "Salesforce & HubSpot sync", "Meeting-to-revenue tracking"],
  },
  {
    icon: Megaphone,
    title: "Marketing",
    desc: "Convert website visitors into booked demos. Embed scheduling on landing pages and track campaign ROI.",
    stat: "2x",
    statLabel: "more qualified demos",
    highlights: ["Embeddable widgets", "UTM tracking", "Routing by segment"],
  },
  {
    icon: HeartHandshake,
    title: "Customer Success",
    desc: "Streamline onboarding, QBRs, and renewal check-ins with automated scheduling workflows.",
    stat: "30%",
    statLabel: "reduced churn",
    highlights: ["Automated check-ins", "Custom workflows", "NPS follow-ups"],
  },
  {
    icon: UserSearch,
    title: "Recruiting",
    desc: "Eliminate interview scheduling headaches. Coordinate panels, manage candidate flow, and reduce time-to-hire.",
    stat: "50%",
    statLabel: "faster scheduling",
    highlights: ["Panel scheduling", "ATS integrations", "Candidate experience"],
  },
];

const byIndustry = [
  { icon: GraduationCap, title: "Education", desc: "Office hours, advising sessions, and parent-teacher conferences — simplified." },
  { icon: Cpu, title: "Technology", desc: "Demo scheduling, sprint planning, and cross-functional syncs at scale." },
  { icon: Landmark, title: "Financial Services", desc: "Client consultations, compliance meetings, and wealth management reviews." },
  { icon: Briefcase, title: "Professional Services", desc: "Client intake, project kickoffs, and recurring advisory sessions." },
];

const successStories = [
  { company: "TechCorp", quote: "Calendly reduced our sales cycle by 40% and doubled our demo-to-close rate.", role: "VP of Sales", name: "Sarah M." },
  { company: "EduPlatform", quote: "Our advisors save 5 hours per week on scheduling. Students love the self-service booking.", role: "Director of Ops", name: "James L." },
  { company: "FinanceFirst", quote: "Enterprise security features gave us confidence. SSO and audit logs were must-haves.", role: "CTO", name: "Priya K." },
];

export function SolutionsPage() {
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
              left: "-100px",
              width: "700px",
              height: "700px",
              background: "linear-gradient(135deg, #7c3aed 0%, #006BFF 50%, #60d5fa 100%)",
              borderRadius: "50% 40% 60% 40% / 40% 60% 40% 60%",
              opacity: 0.1,
            }}
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-8 pt-20 pb-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-[#7c3aed] uppercase tracking-wider mb-3">Solutions</p>
            <h1 className="text-[52px] font-extrabold text-[#0b3558] leading-[1.08] tracking-[-0.02em]">
              Built for every team, every size
            </h1>
            <p className="text-lg text-[#486581] mt-5 max-w-2xl mx-auto leading-relaxed">
              Whether you're a solo entrepreneur or a Fortune 500 company, Calendly has a scheduling solution
              tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* By Business Size */}
      <section className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#0b3558] tracking-tight">By Business Size</h2>
          <p className="text-lg text-[#486581] mt-4">Find the right fit for your organization.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {bySize.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-brand/20 transition-all duration-300 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${item.color}12` }}
              >
                <item.icon className="w-7 h-7" style={{ color: item.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#0b3558]">{item.title}</h3>
              <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mt-1 mb-3">{item.subtitle}</p>
              <p className="text-sm text-[#486581] leading-relaxed mb-6">{item.desc}</p>
              <ul className="space-y-2">
                {item.features.map((f) => (
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

      {/* By Team */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-2">By Team</p>
            <h2 className="text-4xl font-extrabold text-[#0b3558] tracking-tight">
              Purpose-built for your team
            </h2>
            <p className="text-lg text-[#486581] mt-4">Specialized features for every department.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {byTeam.map((team) => (
              <div
                key={team.title}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-brand group-hover:scale-110 transition-all">
                      <team.icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b3558]">{team.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-[#006BFF]">{team.stat}</p>
                    <p className="text-xs text-[#486581]">{team.statLabel}</p>
                  </div>
                </div>
                <p className="text-sm text-[#486581] leading-relaxed mb-4">{team.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {team.highlights.map((h) => (
                    <span key={h} className="px-3 py-1 bg-blue-50 text-brand text-xs font-medium rounded-full">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Industry */}
      <section className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-2">By Industry</p>
          <h2 className="text-4xl font-extrabold text-[#0b3558] tracking-tight">
            Trusted across industries
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {byIndustry.map((ind) => (
            <div
              key={ind.title}
              className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg hover:border-brand/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand group-hover:scale-110 transition-all">
                <ind.icon className="w-6 h-6 text-brand group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base font-semibold text-[#0b3558] mb-2">{ind.title}</h3>
              <p className="text-sm text-[#486581] leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#0b3558] tracking-tight">What our customers say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story) => (
              <div key={story.company} className="bg-white rounded-2xl border border-gray-200 p-8">
                <p className="text-sm text-[#486581] leading-relaxed italic mb-6">"{story.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-[#7c3aed] flex items-center justify-center text-white text-sm font-bold">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0b3558]">{story.name}</p>
                    <p className="text-xs text-[#486581]">{story.role} at {story.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#006BFF] to-[#7c3aed] py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Find the right solution for your team
          </h2>
          <p className="text-white/80 mt-4 text-lg">Start free or talk to sales for a custom plan.</p>
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-[#006BFF] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors no-underline"
            >
              Get started free <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors no-underline border border-white/20"
            >
              Talk to sales
            </a>
          </div>
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

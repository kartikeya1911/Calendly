import {
  BookOpen,
  Code2,
  Map,
  Rss,
  PlayCircle,
  Globe,
  HelpCircle,
  MessagesSquare,
  Phone,
  Sparkles,
  Award,
  Newspaper,
  ArrowRight,
  ExternalLink,
  FileText,
  Video,
  Lightbulb,
  GraduationCap,
  Search,
  ChevronRight,
} from "lucide-react";
import { LandingNav } from "../components/LandingNav";

/* ─────────── DATA ─────────── */

const gettingStarted = [
  {
    icon: BookOpen,
    title: "Learning Hub",
    desc: "Structured learning paths, video tutorials, and step-by-step guides to help you master Calendly.",
    tag: "Popular",
    color: "#006BFF",
    links: ["Getting started guide", "Advanced scheduling", "Team administration"],
  },
  {
    icon: Code2,
    title: "Developer Docs",
    desc: "Full API reference, webhooks documentation, and SDKs for building custom integrations with Calendly.",
    tag: "Technical",
    color: "#059669",
    links: ["API Reference", "Webhooks", "OAuth guide"],
  },
  {
    icon: Map,
    title: "Product Tour",
    desc: "See Calendly in action with an interactive walkthrough of our most popular features.",
    tag: "Interactive",
    color: "#7c3aed",
    links: ["Start the tour", "Feature highlights", "What's new"],
  },
];

const discover = [
  {
    icon: Rss,
    title: "Blog",
    desc: "Tips, best practices, and insights on scheduling, productivity, and team collaboration.",
    articles: [
      { title: "10 Ways to Reduce No-Shows", date: "Apr 10, 2024" },
      { title: "The Future of Meeting Scheduling", date: "Apr 5, 2024" },
      { title: "How to Set Boundaries with Your Calendar", date: "Mar 28, 2024" },
    ],
  },
  {
    icon: PlayCircle,
    title: "Ebooks & Webinars",
    desc: "In-depth content from scheduling experts, customer stories, and product deep-dives.",
    articles: [
      { title: "The State of Scheduling 2024", date: "Ebook" },
      { title: "Scaling Sales with Automation", date: "Webinar" },
      { title: "Customer Success Playbook", date: "Ebook" },
    ],
  },
  {
    icon: Globe,
    title: "About Us",
    desc: "Learn about our mission to help people and organizations spend time on what matters most.",
    articles: [
      { title: "Our Story", date: "" },
      { title: "Leadership Team", date: "" },
      { title: "Careers at Calendly", date: "" },
    ],
  },
];

const supportOptions = [
  {
    icon: HelpCircle,
    title: "Help Center",
    desc: "Search our comprehensive knowledge base with hundreds of articles, FAQs, and troubleshooting guides.",
    cta: "Browse articles",
    color: "#006BFF",
  },
  {
    icon: MessagesSquare,
    title: "Community",
    desc: "Connect with other Calendly users, share tips, ask questions, and vote on feature requests.",
    cta: "Join community",
    color: "#7c3aed",
  },
  {
    icon: Phone,
    title: "Contact Us",
    desc: "Reach our support team via email, chat, or schedule a call. Enterprise customers get priority support.",
    cta: "Get in touch",
    color: "#059669",
  },
];

const extras = [
  { icon: Sparkles, title: "What's New", desc: "Stay up to date with the latest product features and improvements.", tag: "Updated weekly" },
  { icon: Award, title: "Customer Stories", desc: "See how leading organizations use Calendly to grow faster.", tag: "50+ stories" },
  { icon: Newspaper, title: "Newsroom", desc: "Press releases, media resources, and company announcements.", tag: "Press" },
];

const quickLinks = [
  { icon: GraduationCap, label: "Certification Program" },
  { icon: Video, label: "Video Library" },
  { icon: Lightbulb, label: "Feature Requests" },
  { icon: FileText, label: "System Status" },
];

export function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute"
            style={{
              top: "-100px",
              right: "-150px",
              width: "600px",
              height: "600px",
              background: "linear-gradient(135deg, #059669 0%, #006BFF 50%, #7c3aed 100%)",
              borderRadius: "50% 40% 60% 40% / 40% 60% 40% 60%",
              opacity: 0.08,
            }}
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-8 pt-20 pb-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">Resources</p>
            <h1 className="text-[52px] font-extrabold text-[#0b3558] leading-[1.08] tracking-[-0.02em]">
              Everything you need to succeed
            </h1>
            <p className="text-lg text-[#486581] mt-5 max-w-2xl mx-auto leading-relaxed">
              Guides, tutorials, API docs, community forums, and expert support — all in one place.
            </p>

            {/* Search-like bar */}
            <div className="mt-8 max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
              <input
                type="text"
                placeholder="Search resources, articles, docs..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 shadow-sm"
              />
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 rounded-full text-xs font-medium text-[#0b3558] hover:bg-blue-50 hover:text-brand transition-all no-underline"
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#0b3558] tracking-tight">Get Started</h2>
          <p className="text-lg text-[#486581] mt-4">Learn, build, and explore at your own pace.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {gettingStarted.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-brand/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${item.color}12` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: `${item.color}12`, color: item.color }}
                >
                  {item.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0b3558] mb-2">{item.title}</h3>
              <p className="text-sm text-[#486581] leading-relaxed mb-6">{item.desc}</p>
              <div className="space-y-2 border-t border-gray-100 pt-4">
                {item.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="flex items-center justify-between text-sm text-[#0b3558] hover:text-brand transition-colors no-underline py-1 group/link"
                  >
                    {link}
                    <ChevronRight className="w-4 h-4 text-[#94a3b8] group-hover/link:text-brand group-hover/link:translate-x-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discover */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-2">Discover</p>
            <h2 className="text-4xl font-extrabold text-[#0b3558] tracking-tight">Learn from the best</h2>
            <p className="text-lg text-[#486581] mt-4">
              Articles, webinars, and stories from the Calendly community.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {discover.map((section) => (
              <div key={section.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-brand group-hover:scale-110 transition-all">
                      <section.icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0b3558]">{section.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-[#486581] leading-relaxed">{section.desc}</p>
                </div>
                <div className="px-6 py-4 space-y-3">
                  {section.articles.map((article) => (
                    <a
                      key={article.title}
                      href="#"
                      className="flex items-center justify-between text-sm no-underline group/link"
                    >
                      <span className="text-[#0b3558] hover:text-brand transition-colors font-medium">
                        {article.title}
                      </span>
                      {article.date && (
                        <span className="text-xs text-[#94a3b8] shrink-0 ml-3">{article.date}</span>
                      )}
                    </a>
                  ))}
                </div>
                <div className="px-6 pb-5">
                  <a
                    href="#"
                    className="flex items-center gap-1 text-sm font-medium text-brand hover:text-[#0052cc] transition-colors no-underline"
                  >
                    View all <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-2">Support</p>
          <h2 className="text-4xl font-extrabold text-[#0b3558] tracking-tight">We're here to help</h2>
          <p className="text-lg text-[#486581] mt-4">Multiple ways to get answers and connect with our team.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {supportOptions.map((opt) => (
            <div key={opt.title} className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-xl transition-all group">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110"
                style={{ background: `${opt.color}12` }}
              >
                <opt.icon className="w-7 h-7" style={{ color: opt.color }} />
              </div>
              <h3 className="text-lg font-bold text-[#0b3558] mb-2">{opt.title}</h3>
              <p className="text-sm text-[#486581] leading-relaxed mb-6">{opt.desc}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors no-underline"
                style={{ background: `${opt.color}12`, color: opt.color }}
              >
                {opt.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Extras Row */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-[1280px] mx-auto px-8 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {extras.map((item) => (
              <a key={item.title} href="#" className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-brand/20 transition-all no-underline group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-brand transition-colors">
                  <item.icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#0b3558]">{item.title}</h3>
                    <span className="text-[10px] bg-gray-100 text-[#486581] px-2 py-0.5 rounded-full font-medium">{item.tag}</span>
                  </div>
                  <p className="text-xs text-[#486581] mt-0.5">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#94a3b8] shrink-0 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-extrabold text-[#0b3558] tracking-tight">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-[#486581] mt-4">Our team is just a click away.</p>
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#006BFF] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0052cc] transition-colors no-underline shadow-lg shadow-brand/20"
            >
              Contact support <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-gray-100 text-[#0b3558] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors no-underline"
            >
              Join community
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

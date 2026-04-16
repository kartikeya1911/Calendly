import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ChevronDown,
  Check,
} from "lucide-react";
import { LandingNav } from "../components/LandingNav";

/* ─────────────────────── PLANS ─────────────────────── */

const plans = [
  {
    name: "Free",
    sub: "For personal use",
    price: "Always free",
    priceNum: "",
    cta: "Get started",
    ctaStyle: "outline" as const,
    highlight: false,
    freeLabel: "Free features:",
    sections: [
      {
        title: "Scheduling",
        features: [
          "1 event type",
          "Connect 1 calendar",
          "Customize availability",
          "Add video conferencing",
          "Customize your booking page",
          "Mobile apps",
          "Browser extensions",
        ],
      },
    ],
  },
  {
    name: "Standard",
    sub: "For professionals and small teams",
    price: "$10",
    priceMonthly: "$12",
    priceSuffix: "/seat/mo",
    save: "Save 16%",
    cta: "Try for free",
    ctaStyle: "filled" as const,
    highlight: false,
    freeLabel: "Free features, plus:",
    sections: [
      {
        title: "Scheduling",
        features: [
          "Unlimited event types",
          "Connect multiple calendars",
          "Connect Hubspot, Mailchimp",
          "Connect Stripe, Paypal",
          "Connect with Zapier, webhooks",
          "Automate meeting reminders",
          "Automate scheduling outreach",
          "24/7 chat support",
        ],
      },
    ],
  },
  {
    name: "Teams",
    sub: "For growing businesses",
    price: "$16",
    priceMonthly: "$20",
    priceSuffix: "/seat/mo",
    save: "Save 20%",
    cta: "Try for free",
    ctaStyle: "filled" as const,
    highlight: true,
    freeLabel: "Standard features, plus:",
    sections: [
      {
        title: "Scheduling",
        features: [
          "Send meetings to Salesforce",
          "Share Round-robin meetings",
          "Qualify & route leads",
          "Connect Hubspot, Marketo, Pardot",
          "Advanced admin features",
        ],
      },
      {
        title: "Security add-on",
        features: ["Single Sign-On"],
      },
    ],
  },
  {
    name: "Enterprise",
    sub: "For large companies",
    price: "Starts at $15k",
    priceSuffix: "/yr",
    cta: "Contact sales",
    ctaStyle: "filled" as const,
    highlight: false,
    freeLabel: "Teams features, plus:",
    sections: [
      {
        title: "Scheduling",
        features: [
          "Route with Salesforce lookup",
          "Connect Microsoft Dynamics",
          "Dedicated account support",
        ],
      },
      {
        title: "Security",
        features: [
          "Enable SSO & SAML",
          "Domain control",
          "Audit log compliance",
          "Data deletion API",
          "Security and legal reviews",
        ],
      },
    ],
  },
];

/* ─────────────────────── COMPARE FEATURES DATA ─────────────────────── */

type FeatureValue = boolean | string | "";
interface CompareFeature {
  name: string;
  free: FeatureValue;
  standard: FeatureValue;
  teams: FeatureValue;
  enterprise: FeatureValue;
}
interface CompareSection {
  title: string;
  features: CompareFeature[];
}

const compareSections: CompareSection[] = [
  {
    title: "Scheduling",
    features: [
      { name: "One-on-one meeting types", free: "1", standard: "Unlimited", teams: "Unlimited", enterprise: "Unlimited" },
      { name: "Connect calendars", free: "1", standard: "6", teams: "6", enterprise: "6" },
      { name: "Unlimited meetings", free: true, standard: true, teams: true, enterprise: true },
      { name: "Customize your booking link", free: true, standard: true, teams: true, enterprise: true },
      { name: "Mobile app & browser extension", free: true, standard: true, teams: true, enterprise: true },
      { name: "Meeting polls and one-off meetings", free: true, standard: true, teams: true, enterprise: true },
      { name: "View contact profiles and scheduling activity", free: true, standard: true, teams: true, enterprise: true },
      { name: "Control your meeting availability", free: true, standard: true, teams: true, enterprise: true },
      { name: "Multi-person meeting types", free: "", standard: "Unlimited", teams: "Unlimited", enterprise: "Unlimited" },
      { name: "Round robin meeting distribution", free: "", standard: "", teams: "Unlimited", enterprise: "Unlimited" },
      { name: "Share availability from contact profiles", free: "", standard: true, teams: true, enterprise: true },
      { name: "Book meetings on behalf of others", free: "", standard: true, teams: true, enterprise: true },
      { name: "Automate meeting reminders", free: "", standard: true, teams: true, enterprise: true },
      { name: "Automate scheduling outreach", free: "", standard: true, teams: true, enterprise: true },
      { name: "Add a meeting cancellation policy", free: "", standard: true, teams: true, enterprise: true },
      { name: "Create forms and screen invitees based on responses", free: "", standard: "", teams: true, enterprise: true },
    ],
  },
];

/* ─────────────────────── FAQ DATA ─────────────────────── */

const faqItems = [
  {
    question: "What happens at the end of my trial?",
    answer: "At the end of your 14-day trial, your account will be automatically moved to the Free plan. You won't lose any data, but you'll lose access to premium features. You can upgrade at any time to regain access.",
  },
  {
    question: "Which plan is best for me and my team?",
    answer: "The Free plan is great for individuals just getting started. Standard is ideal for professionals and small teams who need multiple event types and integrations. Teams is best for growing businesses that need advanced routing and CRM integrations. Enterprise is designed for large organizations with complex security and compliance needs.",
  },
  {
    question: "Can we try Calendly with multiple users?",
    answer: "Yes! You can start a 14-day free trial of the Teams plan to see how Calendly works for your entire team. No credit card is required to start a trial.",
  },
  {
    question: "What does the renewal process look like?",
    answer: "Your subscription will automatically renew at the end of each billing cycle (monthly or annually). You'll receive an email notification before renewal. You can cancel or change your plan at any time from your account settings.",
  },
  {
    question: "How do I upgrade or downgrade?",
    answer: "You can upgrade or downgrade your plan at any time from your account settings. When upgrading, you'll be charged the prorated difference. When downgrading, the change will take effect at the end of your current billing period.",
  },
  {
    question: "We're a non-profit organization, is there special pricing available?",
    answer: "Yes, Calendly offers special pricing for qualified non-profit organizations. Please contact our sales team to learn more about our non-profit discount program.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and ACH bank transfers for annual plans. Enterprise customers can also pay by invoice.",
  },
];

/* ─────────────────────── PRICING PAGE ─────────────────────── */

export function PricingPage() {
  const [billingYearly, setBillingYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const renderCellValue = (value: FeatureValue) => {
    if (value === true) {
      return (
        <div className="w-6 h-6 rounded-full bg-[#e8f1ff] flex items-center justify-center mx-auto">
          <Check className="w-3.5 h-3.5 text-[#006BFF]" />
        </div>
      );
    }
    if (typeof value === "string" && value !== "") {
      return <span className="text-sm text-[#0b3558] font-medium">{value}</span>;
    }
    return <span className="text-gray-300">—</span>;
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <LandingNav />

      {/* ═══════════════════ PRICING HERO ═══════════════════ */}
      <section className="pt-16 pb-24 bg-[#f8fafc]" id="pricing">
        <div className="max-w-[1280px] mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-[52px] font-extrabold text-[#0b3558] tracking-tight leading-[1.1]">
              Pick the perfect plan<br />for your team
            </h1>

            {/* Billing Toggle */}
            <div className="flex items-center justify-end gap-4 mt-8">
              <label
                className={`flex items-center gap-2 text-sm cursor-pointer transition-colors ${
                  billingYearly ? "text-[#0b3558] font-semibold" : "text-[#486581]"
                }`}
                onClick={() => setBillingYearly(true)}
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    billingYearly ? "border-[#006BFF]" : "border-gray-300"
                  }`}
                >
                  {billingYearly && <span className="w-2 h-2 rounded-full bg-[#006BFF]" />}
                </span>
                Billed yearly
              </label>
              <label
                className={`flex items-center gap-2 text-sm cursor-pointer transition-colors ${
                  !billingYearly ? "text-[#0b3558] font-semibold" : "text-[#486581]"
                }`}
                onClick={() => setBillingYearly(false)}
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    !billingYearly ? "border-[#006BFF]" : "border-gray-300"
                  }`}
                >
                  {!billingYearly && <span className="w-2 h-2 rounded-full bg-[#006BFF]" />}
                </span>
                Billed monthly
              </label>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow ${
                  plan.highlight
                    ? "border-2 border-brand relative"
                    : "border border-gray-200"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-4 bg-[#ff6b00] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                    Recommended plan
                  </span>
                )}

                <p className="text-lg font-bold text-[#0b3558] italic">{plan.name}</p>
                <p className="text-xs text-[#486581] mt-0.5">{plan.sub}</p>

                <div className="mt-4 mb-5">
                  {plan.priceNum !== undefined && plan.priceNum === "" ? (
                    <p className="text-[28px] font-extrabold text-[#0b3558] leading-tight">{plan.price}</p>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-[32px] font-extrabold text-[#0b3558]">
                        {!billingYearly && plan.priceMonthly ? plan.priceMonthly : plan.price}
                      </span>
                      {plan.priceSuffix && <span className="text-sm text-[#486581]">{plan.priceSuffix}</span>}
                      {billingYearly && plan.save && (
                        <span className="text-xs text-[#006BFF] font-semibold ml-2">
                          {plan.save}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <Link
                  to="/signup"
                  className={`block w-full py-2.5 rounded-full text-sm font-semibold transition-all text-center no-underline border mb-6 ${
                    plan.ctaStyle === "filled"
                      ? "bg-[#006BFF] text-white border-[#006BFF] hover:bg-[#0052cc]"
                      : "bg-white text-[#0b3558] border-[#0b3558] hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>

                <p className="text-xs text-[#486581] mb-3">{plan.freeLabel}</p>

                {plan.sections.map((section) => (
                  <div key={section.title} className="mb-4">
                    <p className="text-sm font-bold text-[#0b3558] mb-2">{section.title}</p>
                    <ul className="space-y-2">
                      {section.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-[13px] text-[#486581] leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-[#006BFF] shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ COMPARE FEATURES TABLE ═══════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          {/* Header Row */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-4 mb-10 items-end">
            <div>
              <h2 className="text-[36px] font-extrabold text-[#0b3558] tracking-tight leading-tight">
                Compare features
              </h2>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#0b3558] italic">Free</p>
              <p className="text-sm text-[#486581] mt-0.5">Always free</p>
              <Link
                to="/signup"
                className="inline-block mt-3 px-6 py-2 rounded-full text-xs font-semibold bg-[#006BFF] text-white no-underline hover:bg-[#0052cc] transition-colors"
              >
                Get started
              </Link>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#0b3558] italic">Standard</p>
              <p className="text-sm text-[#486581] mt-0.5">
                <span className="text-lg font-extrabold text-[#0b3558]">
                  {billingYearly ? "$10" : "$12"}
                </span>
                <span className="text-xs text-[#486581]">/seat/mo</span>
              </p>
              <Link
                to="/signup"
                className="inline-block mt-3 px-6 py-2 rounded-full text-xs font-semibold bg-[#006BFF] text-white no-underline hover:bg-[#0052cc] transition-colors"
              >
                Try for free
              </Link>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#0b3558] italic">Teams</p>
              <p className="text-sm text-[#486581] mt-0.5">
                <span className="text-lg font-extrabold text-[#0b3558]">
                  {billingYearly ? "$16" : "$20"}
                </span>
                <span className="text-xs text-[#486581]">/seat/mo</span>
              </p>
              <Link
                to="/signup"
                className="inline-block mt-3 px-6 py-2 rounded-full text-xs font-semibold bg-[#006BFF] text-white no-underline hover:bg-[#0052cc] transition-colors"
              >
                Try for free
              </Link>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#0b3558] italic">Enterprise</p>
              <p className="text-sm text-[#486581] mt-0.5">Contact us</p>
              <Link
                to="/signup"
                className="inline-block mt-3 px-6 py-2 rounded-full text-xs font-semibold bg-[#006BFF] text-white no-underline hover:bg-[#0052cc] transition-colors"
              >
                Contact sales
              </Link>
            </div>
          </div>

          {/* Feature Sections */}
          {compareSections.map((section) => (
            <div key={section.title} className="mb-8">
              <h3 className="text-xl font-bold text-[#0b3558] mb-4 pb-3 border-b-2 border-gray-200">
                {section.title}
              </h3>
              {section.features.map((feature, idx) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-4 py-4 items-center ${
                    idx < section.features.length - 1 ? "border-b border-gray-100" : ""
                  } hover:bg-gray-50/50 transition-colors -mx-3 px-3 rounded`}
                >
                  <p className="text-sm text-[#486581] underline decoration-dotted underline-offset-4 cursor-help">
                    {feature.name}
                  </p>
                  <div className="text-center">{renderCellValue(feature.free)}</div>
                  <div className="text-center">{renderCellValue(feature.standard)}</div>
                  <div className="text-center">{renderCellValue(feature.teams)}</div>
                  <div className="text-center">{renderCellValue(feature.enterprise)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-[36px] font-extrabold text-[#0b3558] tracking-tight text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-0">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex items-center gap-4 w-full py-5 text-left bg-transparent border-0 cursor-pointer group"
                >
                  <span
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      openFaq === idx
                        ? "border-[#006BFF] bg-[#006BFF] text-white"
                        : "border-gray-300 text-gray-400 group-hover:border-[#006BFF] group-hover:text-[#006BFF]"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                  <span className="text-base font-semibold text-[#0b3558] group-hover:text-[#006BFF] transition-colors">
                    {item.question}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openFaq === idx ? "200px" : "0px",
                    opacity: openFaq === idx ? 1 : 0,
                  }}
                >
                  <p className="text-sm text-[#486581] leading-relaxed pl-12 pb-5">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
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

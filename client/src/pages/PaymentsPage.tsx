import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LandingNav } from "../components/LandingNav";

export function PaymentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8 relative z-10 text-center">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-4">
            Calendly Payments
          </p>
          <h1 className="text-[52px] font-extrabold text-[#0b3558] tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Book meetings and accept payments, all at once
          </h1>
          <p className="text-xl text-[#486581] max-w-2xl mx-auto mb-10 leading-relaxed">
            Eliminate no-shows and make collecting fees seamless. Connect Stripe or PayPal to your scheduling flow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="bg-[#006BFF] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0052cc] transition-colors no-underline inline-flex items-center gap-2"
            >
              Start for free
            </Link>
            <a
              href="#"
              className="text-[#0b3558] border border-[#0b3558] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors no-underline inline-flex items-center gap-2"
            >
              Contact sales
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid md:grid-cols-2 flex-col-reverse md:flex-row items-center gap-16 mb-24">
            <div>
              <h2 className="text-[40px] font-extrabold text-[#0b3558] tracking-tight leading-tight mb-6">
                Connect your preferred payment provider
              </h2>
              <p className="text-lg text-[#486581] leading-relaxed mb-6">
                Integrate Stripe or PayPal in minutes. Calendly routes payments directly to your account immediately after booking.
              </p>
              <ul className="space-y-3">
                {[
                  "Secure integration with Stripe and PayPal",
                  "Support for multiple currencies",
                  "Automated receipts sent to clients",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-[#0b3558]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <span className="text-gray-400 font-medium">Stripe / PayPal Integration UI</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 items-center gap-16">
            <div className="order-2 md:order-1 relative">
              <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 -rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <span className="text-gray-400 font-medium">Checkout Flow UI</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-[40px] font-extrabold text-[#0b3558] tracking-tight leading-tight mb-6">
                Reduce no-shows and cancellations
              </h2>
              <p className="text-lg text-[#486581] leading-relaxed mb-6">
                When clients pay upfront, they are far more likely to show up. Use Calendly Payments to require full payments or a non-refundable deposit.
              </p>
              <ul className="space-y-3">
                {[
                  "Require payment to confirm booking",
                  "Set your own refund policies",
                  "Streamline your accounting process",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-[#0b3558]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-[40px] font-extrabold text-[#0b3558] tracking-tight mb-6">
            Ready to start accepting payments?
          </h2>
          <p className="text-lg text-[#486581] mb-10">
            Join millions of professionals who use Calendly to manage their scheduling and payments in one place.
          </p>
          <Link
            to="/signup"
            className="bg-[#006BFF] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0052cc] transition-colors no-underline inline-flex items-center gap-2"
          >
            Sign up for free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t border-gray-100 bg-[#f8fafc] pt-12 pb-8">
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <p className="text-xs text-[#94a3b8]">
            © 2024 Calendly Clone. Built for demonstration purposes.
          </p>
        </div>
      </footer>
    </div>
  );
}

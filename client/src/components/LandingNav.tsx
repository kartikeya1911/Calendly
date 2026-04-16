import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Globe,
  Sparkles,
  CalendarDays,
  StickyNote,
  CreditCard,
  LayoutGrid,
  Puzzle,
  Smartphone,
  AppWindow,
  ShieldCheck,
  Settings,
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
  BookOpen,
  Code2,
  Map,
  Rss,
  PlayCircle,
  Award,
  Newspaper,
  HelpCircle,
  MessagesSquare,
  Phone,
} from "lucide-react";

/* ─────────────────────── DROPDOWN DATA ─────────────────────── */

const productMenu = {
  columns: [
    {
      heading: "Product",
      items: [
        { icon: CalendarDays, label: "Scheduling", desc: "Simplified booking", to: "/product" },
        { icon: StickyNote, label: "Notetaker", desc: "Meeting recaps and action items" },
        { icon: CreditCard, label: "Payments", desc: "Flexible ways to get paid", to: "/payments" },
        { icon: LayoutGrid, label: "Product overview", desc: "Why choose Calendly", to: "/product" },
      ],
    },
    {
      heading: "Platform",
      items: [
        { icon: Puzzle, label: "Integrations" },
        { icon: Smartphone, label: "Mobile app" },
        { icon: AppWindow, label: "Browser extension" },
        { icon: Settings, label: "Admin controls" },
        { icon: ShieldCheck, label: "Security" },
      ],
    },
  ],
};

const solutionsMenu = {
  columns: [
    {
      heading: "By business size",
      items: [
        { icon: User, label: "Individuals", desc: "For solopreneurs" },
        { icon: Building2, label: "Small business", desc: "For growing businesses" },
        { icon: Building, label: "Large companies", desc: "For enterprise" },
      ],
    },
    {
      heading: "By team",
      items: [
        { icon: ShoppingCart, label: "Sales" },
        { icon: Megaphone, label: "Marketing" },
        { icon: HeartHandshake, label: "Customer success" },
        { icon: UserSearch, label: "Recruiting" },
      ],
    },
    {
      heading: "By industry",
      items: [
        { icon: GraduationCap, label: "Education" },
        { icon: Cpu, label: "Technology" },
        { icon: Landmark, label: "Financial Services" },
        { icon: Briefcase, label: "Professional Services" },
      ],
    },
  ],
};

const resourcesMenu = {
  columns: [
    {
      heading: "Get started",
      items: [
        { icon: BookOpen, label: "Learning hub", desc: "Structured paths and guides" },
        { icon: Code2, label: "Developer docs", desc: "Build with Calendly API" },
        { icon: Map, label: "Product tour", desc: "See Calendly in action" },
      ],
    },
    {
      heading: "Discover",
      items: [
        { icon: Rss, label: "Blog", desc: "Tips and best practices" },
        { icon: PlayCircle, label: "Ebooks & webinars", desc: "Expert insights" },
        { icon: Globe, label: "About us", desc: "Discover our mission" },
      ],
    },
    {
      heading: "Support",
      items: [
        { icon: HelpCircle, label: "Help center", desc: "Search articles and FAQs" },
        { icon: MessagesSquare, label: "Community", desc: "Connect with other users" },
        { icon: Phone, label: "Contact us", desc: "Connect with support" },
      ],
    },
  ],
  extra: [
    { icon: Sparkles, label: "What's new", desc: "Product updates" },
    { icon: Award, label: "Customer stories", desc: "Calendly success stories" },
    { icon: Newspaper, label: "Newsroom", desc: "Company news and press" },
  ],
};

/* ─────────────────────── DROPDOWN COMPONENT ─────────────────────── */

type DropdownColumn = {
  heading: string;
  items: { icon: any; label: string; desc?: string }[];
};

function NavDropdown({
  label,
  columns,
  extra,
  page,
  isOpen,
  onOpen,
  onClose,
}: {
  label: string;
  columns: DropdownColumn[];
  extra?: { icon: any; label: string; desc?: string }[];
  page?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onOpen();
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 150);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={page || "#"}
        className={`flex items-center gap-1 text-sm font-medium transition-colors cursor-pointer bg-transparent border-0 px-0 py-2 no-underline ${
          isOpen ? "text-brand" : "text-[#0b3558] hover:text-brand"
        }`}
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      {isOpen && (
        <>
          {/* Invisible bridge so mouse can travel to the panel */}
          <div className="absolute top-full left-0 w-full h-3" />
          <div
            className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-white rounded-xl border border-gray-200 shadow-xl shadow-gray-200/60 animate-fade-in z-50"
            style={{ minWidth: columns.length >= 3 ? "680px" : columns.length === 2 ? "520px" : "300px" }}
          >
            <div className="p-6">
              <div className={`grid gap-8 ${columns.length >= 3 ? "grid-cols-3" : columns.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                {columns.map((col) => (
                  <div key={col.heading}>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                      {col.heading}
                    </p>
                    <div className="space-y-1">
                      {col.items.map((item: any) => {
                        const content = (
                          <>
                            <item.icon className="w-5 h-5 text-brand mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                            <div>
                              <p className="text-sm font-medium text-[#0b3558] group-hover:text-brand transition-colors">
                                {item.label}
                              </p>
                              {item.desc && (
                                <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                                  {item.desc}
                                </p>
                              )}
                            </div>
                          </>
                        );

                        if (item.to) {
                          return (
                            <Link
                              key={item.label}
                              to={item.to}
                              className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors no-underline group"
                            >
                              {content}
                            </Link>
                          );
                        }

                        return (
                          <a
                            key={item.label}
                            href="#"
                            className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors no-underline group"
                          >
                            {content}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra row */}
            {extra && extra.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/60 rounded-b-xl">
                <div className="flex gap-6">
                  {extra.map((item) => (
                    <a
                      key={item.label}
                      href="#"
                      className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand transition-colors no-underline"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* View all link */}
            {page && (
              <div className={`border-t border-gray-100 px-6 py-3 ${extra && extra.length > 0 ? '' : 'bg-gray-50/60 rounded-b-xl'}`}>
                <Link
                  to={page}
                  className="flex items-center gap-1 text-sm font-medium text-brand hover:text-[#0052cc] transition-colors no-underline"
                >
                  View all {label.toLowerCase()} →
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────── EXPORTED NAV COMPONENT ─────────────────────── */

export function LandingNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Top-bar (English / Talk to sales) */}
      <div className="bg-white border-b border-gray-50">
        <div className="max-w-[1280px] mx-auto flex items-center justify-end gap-4 px-8 py-1.5">
          <button className="flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors bg-transparent border-0 cursor-pointer">
            <Globe className="w-3.5 h-3.5" />
            English
            <ChevronDown className="w-3 h-3" />
          </button>
          <a href="#" className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors no-underline">
            Talk to sales
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[60px] px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
          <img src="/images/logo.svg" alt="Calendly" className="h-8" />
        </Link>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-6 ml-12">
          <NavDropdown
            label="Product"
            columns={productMenu.columns}
            page="/product"
            isOpen={openMenu === "product"}
            onOpen={() => setOpenMenu("product")}
            onClose={() => setOpenMenu(null)}
          />
          <NavDropdown
            label="Solutions"
            columns={solutionsMenu.columns}
            page="/solutions"
            isOpen={openMenu === "solutions"}
            onOpen={() => setOpenMenu("solutions")}
            onClose={() => setOpenMenu(null)}
          />
          <NavDropdown
            label="Resources"
            columns={resourcesMenu.columns}
            extra={resourcesMenu.extra}
            page="/resources"
            isOpen={openMenu === "resources"}
            onOpen={() => setOpenMenu("resources")}
            onClose={() => setOpenMenu(null)}
          />
          <Link
            to="/pricing"
            className="text-sm font-medium text-[#0b3558] hover:text-brand transition-colors no-underline"
          >
            Pricing
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex text-sm font-medium text-[#0b3558] hover:text-brand transition-colors no-underline"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-[#006BFF] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#0052cc] transition-colors no-underline"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

import { NavLink, Link } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { Calendar, Clock, Settings, Link as LinkIcon } from "lucide-react";

const links = [
  { to: "/event-types", label: "Event Types", icon: LinkIcon },
  { to: "/availability", label: "Availability", icon: Clock },
  { to: "/meetings", label: "Meetings", icon: Calendar },
  { to: "/connect-calendar", label: "Integrations", icon: Settings },
];

export function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">
                Scheduling Platform
              </p>
              <h1 className="text-lg font-bold text-text-primary leading-tight">
                Calendly
              </h1>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-brand">RJ</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-border py-6 px-3 hidden md:flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 no-underline ${
                  isActive
                    ? "bg-brand-light text-brand shadow-sm"
                    : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon
                    className={`w-[18px] h-[18px] ${
                      isActive ? "text-brand" : "text-text-muted"
                    }`}
                  />
                  {link.label}
                </>
              )}
            </NavLink>
          ))}
        </aside>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 flex justify-around py-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 text-[11px] font-medium no-underline ${
                  isActive ? "text-brand" : "text-text-muted"
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              {link.label.split(" ")[0]}
            </NavLink>
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 pb-24 md:pb-8">
          <div className="max-w-4xl mx-auto animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}

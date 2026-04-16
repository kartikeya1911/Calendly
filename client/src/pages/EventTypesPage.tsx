import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { eventTypeApi } from "../api";
import type { EventType } from "../types";
import {
  Plus,
  Pencil,
  Trash2,
  Copy,
  ExternalLink,
  Clock,
  Link as LinkIcon,
  X,
  Check,
} from "lucide-react";

const emptyForm = { name: "", slug: "", durationMinutes: 30 };

export function EventTypesPage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  async function load() {
    setEventTypes(await eventTypeApi.list());
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (editingId) {
      await eventTypeApi.update(editingId, form);
    } else {
      await eventTypeApi.create(form);
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    await load();
  }

  async function onDelete(id: number) {
    if (!confirm("Delete this event type? All associated meetings will be removed.")) return;
    await eventTypeApi.remove(id);
    await load();
  }

  function onEdit(item: EventType) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      slug: item.slug,
      durationMinutes: item.durationMinutes,
    });
    setShowForm(true);
  }

  function onCopyLink(slug: string) {
    navigator.clipboard.writeText(`${window.location.origin}/book/${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  }

  function autoSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 40);
  }

  const durationColors: Record<number, string> = {
    15: "bg-emerald-50 text-emerald-700 border-emerald-200",
    30: "bg-blue-50 text-blue-700 border-blue-200",
    45: "bg-violet-50 text-violet-700 border-violet-200",
    60: "bg-amber-50 text-amber-700 border-amber-200",
  };

  function getDurationColor(mins: number) {
    return durationColors[mins] || "bg-gray-50 text-gray-700 border-gray-200";
  }

  const borderColors = [
    "border-l-blue-500",
    "border-l-violet-500",
    "border-l-emerald-500",
    "border-l-amber-500",
    "border-l-rose-500",
    "border-l-cyan-500",
  ];

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Event Types</h2>
          <p className="text-sm text-text-secondary mt-1">
            Create and manage your public booking links.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm(emptyForm);
          }}
          className="flex items-center gap-2 bg-brand text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-dark transition-colors shadow-sm shadow-brand/20 cursor-pointer border-0"
        >
          <Plus className="w-4 h-4" />
          New Event Type
        </button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-border p-6 mb-6 animate-fade-in shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {editingId ? "Edit Event Type" : "New Event Type"}
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border-0 bg-transparent"
            >
              <X className="w-5 h-5 text-text-muted" />
            </button>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Event name
              </label>
              <input
                placeholder="e.g. Quick Chat, Product Demo"
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm((s) => ({
                    ...s,
                    name,
                    slug: editingId ? s.slug : autoSlug(name),
                  }));
                }}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-brand focus:ring-2 focus:ring-brand/10 outline-none transition-all bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  URL slug
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/10 bg-white">
                  <span className="text-xs text-text-muted pl-3 pr-1 select-none">/book/</span>
                  <input
                    value={form.slug}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                      }))
                    }
                    required
                    className="flex-1 border-0 px-1 py-2.5 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Duration (minutes)
                </label>
                <select
                  value={form.durationMinutes}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, durationMinutes: Number(e.target.value) }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-brand focus:ring-2 focus:ring-brand/10 outline-none transition-all bg-white cursor-pointer"
                >
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={45}>45 min</option>
                  <option value={60}>60 min</option>
                  <option value={90}>90 min</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-brand text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-dark transition-colors cursor-pointer border-0"
              >
                {editingId ? "Save Changes" : "Create Event Type"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="text-text-secondary px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200 bg-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Event Type Cards */}
      <div className="space-y-3">
        {eventTypes.map((item, i) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl border border-border border-l-4 ${borderColors[i % borderColors.length]} p-5 shadow-sm hover:shadow-md transition-all duration-200 group animate-fade-in`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-semibold text-text-primary truncate">
                    {item.name}
                  </h3>
                  {!item.isActive && (
                    <span className="text-[11px] bg-gray-100 text-text-muted px-2 py-0.5 rounded-full font-medium">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5" />
                    /book/{item.slug}
                  </span>
                  <span
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${getDurationColor(item.durationMinutes)}`}
                  >
                    <Clock className="w-3 h-3" />
                    {item.durationMinutes} min
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => onCopyLink(item.slug)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border-0 bg-transparent"
                  title="Copy booking link"
                >
                  {copiedSlug === item.slug ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4 text-text-muted" />
                  )}
                </button>
                <a
                  href={`/book/${item.slug}`}
                  target="_blank"
                  rel="noopener"
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Preview booking page"
                >
                  <ExternalLink className="w-4 h-4 text-text-muted" />
                </a>
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer border-0 bg-transparent"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4 text-brand" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer border-0 bg-transparent"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-danger" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {!eventTypes.length && !showForm && (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <LinkIcon className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-text-primary mb-1">No event types yet</h3>
            <p className="text-sm text-text-secondary mb-4">
              Create your first event type to start accepting bookings.
            </p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="bg-brand text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-brand-dark transition-colors cursor-pointer border-0"
            >
              Create Event Type
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

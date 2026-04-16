import axios from "axios";
import type { AvailabilityRule, EventType, Meeting, PublicEventType, Slot } from "./types";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"}/api`,
});

export const eventTypeApi = {
  list: async () => (await api.get<EventType[]>("/event-types")).data,
  create: async (payload: { name: string; slug: string; durationMinutes: number }) =>
    (await api.post<EventType>("/event-types", payload)).data,
  update: async (
    id: number,
    payload: { name: string; slug: string; durationMinutes: number; isActive?: boolean }
  ) => (await api.put<EventType>(`/event-types/${id}`, payload)).data,
  remove: async (id: number) => api.delete(`/event-types/${id}`),
};

export const availabilityApi = {
  get: async () =>
    (await api.get<{ timezone: string; rules: AvailabilityRule[] }>("/availability")).data,
  update: async (payload: { timezone: string; rules: AvailabilityRule[] }) =>
    (await api.put("/availability", payload)).data,
};

export const meetingsApi = {
  list: async (type: "upcoming" | "past") =>
    (await api.get<Meeting[]>(`/meetings?type=${type}`)).data,
  cancel: async (id: number) => (await api.patch(`/meetings/${id}/cancel`)).data,
  reschedule: async (id: number, payload: { startsAt: string; endsAt: string }) =>
    (await api.patch(`/meetings/${id}/reschedule`, payload)).data,
};

export const publicApi = {
  eventType: async (slug: string) =>
    (await api.get<PublicEventType>(`/public/${slug}`)).data,
  slots: async (slug: string, date: string) =>
    (await api.get<{ slots: Slot[] }>(`/public/${slug}/slots?date=${date}`)).data,
  book: async (slug: string, payload: { startsAt: string; name: string; email: string }) =>
    (await api.post(`/public/${slug}/book`, payload)).data,
};

export const googleApi = {
  status: async () =>
    (await api.get<{ connected: boolean; email: string | null }>(`/google/status`)).data,
};

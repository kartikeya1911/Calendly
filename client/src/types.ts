export type EventType = {
  id: number;
  userId: number;
  name: string;
  slug: string;
  durationMinutes: number;
  isActive: boolean;
  createdAt?: string;
};

export type AvailabilityRule = {
  id?: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export type Meeting = {
  id: number;
  inviteeName: string;
  inviteeEmail: string;
  startsAt: string;
  endsAt: string;
  status: string;
  eventType: EventType;
  host?: { name: string; email: string };
};

export type PublicEventType = {
  id: number;
  name: string;
  slug: string;
  durationMinutes: number;
  hostName: string;
  timezone: string;
};

export type Slot = {
  startsAt: string;
  endsAt: string;
  label: string;
};

# 📅 Calendly Clone — Full-Stack Scheduling Platform

A production-quality, full-stack scheduling and meeting booking platform inspired by [Calendly.com](https://calendly.com). Built with React, Node.js, MySQL, and Google Calendar integration.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js) ![MySQL](https://img.shields.io/badge/MySQL-8-orange?logo=mysql) ![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)

---

## 🎯 Project Agenda

Build a **pixel-perfect Calendly clone** that replicates the core scheduling workflow:

1. **Public-facing marketing pages** matching Calendly's real design
2. **User signup & Google OAuth** authentication flow
3. **Event type management** (create, edit, delete scheduling links)
4. **Configurable availability** (weekly hours, timezone support)
5. **Public booking page** (calendar view, time slot selection, booking form)
6. **Meeting management** (view upcoming/past, cancel meetings)
7. **Google Calendar sync** (auto-create events in user's calendar)

---

## ✨ Features

### 🌐 Marketing & Landing Pages

| Page | Route | Description |
|------|-------|-------------|
| **Landing Page** | `/` | Pixel-perfect Calendly.com homepage with hero section, trusted logos, integrations grid, pricing cards, customer stories, security badges, and full footer |
| **Product Page** | `/product` | Core products (Scheduling, Notetaker, Payments), platform features, security badges, and "Why Calendly" section |
| **Solutions Page** | `/solutions` | Solutions by business size, team function, and industry with customer testimonials |
| **Resources Page** | `/resources` | Learning hub, developer docs, blog, community, and support resources |
| **Signup Page** | `/signup` | Calendly-style signup with email + Google/Microsoft OAuth + Teams trial promo |

**Navigation Features:**
- Shared `LandingNav` component across all public pages
- Hover-triggered mega-menu dropdowns (Product, Solutions, Resources) with 150ms debounce
- Top bar with language selector and "Talk to sales" link
- Responsive layout with Calendly branding

### 🔐 Authentication

- **Google OAuth 2.0** — Sign up / Log in with Google account
- Auto-connects Google Calendar upon OAuth signup
- Stores OAuth refresh token for persistent calendar access
- Session-based user identification

### 📋 Event Types Management (`/event-types`)

- **Create** event types with custom name, URL slug, and duration (15/30/60 min)
- **Edit** existing event types inline
- **Delete** event types with confirmation
- **Toggle** active/inactive status
- **Copy** public booking link to clipboard
- Each event type generates a unique public URL: `/book/:slug`

### ⏰ Availability Settings (`/availability`)

- Configure available **days of the week** (toggle each day on/off)
- Set **start/end times** per day
- **Timezone** selection from global timezone list
- Real-time preview of configured schedule
- Availability rules stored per-user in the database

### 📆 Public Booking Page (`/book/:slug`)

- **Calendar month view** — navigate between months
- **Date selection** — highlights available dates, grays out unavailable
- **Time slot generation** — auto-computed from availability rules + event duration
- **Double-booking prevention** — already-booked slots are excluded in real time
- **Booking form** — collects invitee name and email
- **Confirmation page** (`/book/:slug/confirm`) — displays meeting details after booking
- **Google Calendar integration** — auto-creates event in host's Google Calendar

### 📊 Meetings Dashboard (`/meetings`)

- **Upcoming meetings** tab — future bookings with invitee details
- **Past meetings** tab — historical records
- **Cancel meeting** — with status update (BOOKED → CANCELED)
- Displays meeting date, time, duration, invitee name/email, and event type

### 🔗 Google Calendar Integration (`/connect-calendar`)

- Connect/disconnect Google Calendar
- OAuth2 flow with Google API
- Auto-sync: new bookings create events in host's Google Calendar
- Stored refresh tokens for persistent access

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript | UI components & SPA routing |
| **Build Tool** | Vite | Fast dev server & HMR |
| **Styling** | Tailwind CSS | Utility-first responsive design |
| **Icons** | Lucide React | Consistent icon library |
| **Routing** | React Router v6 | Client-side navigation |
| **Backend** | Node.js + Express | REST API server |
| **ORM** | Prisma | Type-safe database client |
| **Database** | MySQL 8 | Relational data storage |
| **Auth** | Google OAuth 2.0 | User authentication |
| **Calendar** | Google Calendar API | Meeting sync |

---

## 📁 Project Structure

```
Calendly/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── images/                  # Logos, icons, badges (SVG/PNG)
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminLayout.tsx      # Sidebar + header layout for admin pages
│   │   │   ├── CalendarMonth.tsx    # Reusable month calendar component
│   │   │   └── LandingNav.tsx       # Shared nav with hover dropdowns
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx      # Homepage (matches Calendly.com)
│   │   │   ├── ProductPage.tsx      # Product features page
│   │   │   ├── SolutionsPage.tsx    # Solutions by size/team/industry
│   │   │   ├── ResourcesPage.tsx    # Resources hub page
│   │   │   ├── SignupPage.tsx       # Signup with OAuth + email
│   │   │   ├── EventTypesPage.tsx   # CRUD for event types
│   │   │   ├── AvailabilityPage.tsx # Weekly availability settings
│   │   │   ├── MeetingsPage.tsx     # Upcoming/past meetings
│   │   │   ├── ConnectCalendarPage.tsx # Google Calendar connection
│   │   │   ├── PublicBookingPage.tsx   # Public calendar + slots
│   │   │   └── BookingConfirmationPage.tsx # Post-booking confirmation
│   │   ├── App.tsx                  # Route definitions
│   │   ├── main.tsx                 # App entry point
│   │   └── index.css                # Global styles + Tailwind
│   ├── index.html
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── server/                          # Express Backend
│   ├── prisma/
│   │   ├── schema.prisma            # Database models
│   │   ├── seed.js                  # Seed data for dev
│   │   └── migrations/              # DB migration history
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── eventTypeController.js   # Event type CRUD handlers
│   │   │   ├── availabilityController.js # Availability CRUD handlers
│   │   │   ├── meetingController.js      # Meeting list/cancel handlers
│   │   │   └── publicController.js       # Public booking + slot generation
│   │   ├── services/
│   │   │   ├── eventTypeService.js   # Event type business logic
│   │   │   ├── availabilityService.js # Availability business logic
│   │   │   ├── meetingService.js      # Meeting creation + cancellation
│   │   │   ├── timeService.js         # Time slot computation
│   │   │   └── googleService.js       # Google Calendar API integration
│   │   ├── routes/
│   │   │   ├── auth.js               # Google OAuth routes
│   │   │   ├── eventTypes.js         # /api/event-types
│   │   │   ├── availability.js       # /api/availability
│   │   │   ├── meetings.js           # /api/meetings
│   │   │   └── public.js             # /api/public (booking endpoints)
│   │   ├── middleware/
│   │   │   └── errorHandler.js       # Global error handler
│   │   ├── config/
│   │   │   └── database.js           # DB connection config
│   │   ├── db.js                     # Prisma client instance
│   │   ├── google.js                 # Google OAuth client setup
│   │   ├── time.js                   # Timezone utilities
│   │   ├── constants.js              # App constants
│   │   └── index.js                  # Express app entry
│   ├── .env                          # Environment variables
│   └── package.json
│
├── images/                           # Source brand assets
│   ├── logo.svg                      # Calendly logo
│   ├── *.svg                         # Customer logos, integration icons,
│   └── *.png                         #   security badges, etc.
│
└── README.md
```

---

## 🗄️ Database Schema

```
┌─────────────────────┐       ┌─────────────────────┐
│        User          │       │     EventType        │
├─────────────────────┤       ├─────────────────────┤
│ id (PK)             │──┐    │ id (PK)             │
│ name                │  │    │ userId (FK)         │──┐
│ email (unique)      │  │    │ name                │  │
│ timezone            │  │    │ slug (unique)       │  │
│ googleId            │  │    │ durationMinutes     │  │
│ googleEmail         │  ├───▶│ isActive            │  │
│ googleRefreshToken  │  │    │ createdAt           │  │
│ googleAccessToken   │  │    │ updatedAt           │  │
│ googleCalendarConn. │  │    └─────────────────────┘  │
│ createdAt           │  │                             │
│ updatedAt           │  │    ┌─────────────────────┐  │
└─────────────────────┘  │    │      Meeting         │  │
                         │    ├─────────────────────┤  │
┌─────────────────────┐  │    │ id (PK)             │  │
│  AvailabilityRule    │  │    │ eventTypeId (FK)    │◀─┘
├─────────────────────┤  │    │ hostId (FK)         │◀─┐
│ id (PK)             │  │    │ inviteeName         │  │
│ userId (FK)         │◀─┘    │ inviteeEmail        │  │
│ dayOfWeek (0-6)     │       │ startsAt            │  │
│ startTime           │       │ endsAt              │  │
│ endTime             │       │ status (enum)       │  │
│ createdAt           │       │ googleCalEventId    │  │
│ updatedAt           │       │ createdAt           │  │
└─────────────────────┘       │ updatedAt           │  │
                              └─────────────────────┘  │
                                        │              │
                         User.id ◀──────┘──────────────┘
```

**Meeting Status Enum:** `BOOKED` | `CANCELED`

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/auth/google` | Initiate Google OAuth flow |
| `GET` | `/api/auth/google/callback` | OAuth callback (creates/updates user) |

### Event Types
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/event-types` | List all event types |
| `POST` | `/api/event-types` | Create new event type |
| `PUT` | `/api/event-types/:id` | Update event type |
| `DELETE` | `/api/event-types/:id` | Delete event type |

### Availability
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/availability` | Get availability rules |
| `PUT` | `/api/availability` | Update availability rules |

### Meetings
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/meetings` | List all meetings (upcoming + past) |
| `PATCH` | `/api/meetings/:id/cancel` | Cancel a meeting |

### Public Booking
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/public/:slug` | Get event type details by slug |
| `GET` | `/api/public/:slug/slots?date=YYYY-MM-DD` | Get available time slots |
| `POST` | `/api/public/:slug/book` | Book a meeting |

---

## 🚀 Local Setup

### Prerequisites

- **Node.js** 20+
- **MySQL** 8+
- **Google Cloud Console** project (for OAuth + Calendar API)

### 1. Clone & Install

```bash
git clone <repository-url>
cd Calendly
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/calendly_clone"
PORT=4000
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:4000/api/auth/google/callback"
FRONTEND_URL="http://localhost:5173"
```

Initialize database:

```bash
npx prisma db push
npm run seed
```

Start the server:

```bash
npm run dev
```

> 🟢 Backend running at **http://localhost:4000**

### 3. Frontend Setup

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Start the dev server:

```bash
npm run dev
```

> 🟢 Frontend running at **http://localhost:5173**

### 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google Calendar API**
4. Create OAuth 2.0 credentials (Web Application)
5. Set authorized redirect URI: `http://localhost:4000/api/auth/google/callback`
6. Copy Client ID and Secret to `server/.env`

---

## 📍 Application Routes

### Public Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Calendly.com homepage clone |
| `/product` | Product Page | Features & platform overview |
| `/solutions` | Solutions Page | Solutions by size, team, industry |
| `/resources` | Resources Page | Docs, blog, support hub |
| `/signup` | Signup Page | Create account with Google/email |
| `/book/:slug` | Booking Page | Public calendar & booking flow |
| `/book/:slug/confirm` | Confirmation | Post-booking success page |

### Admin Pages (Authenticated)
| Route | Page | Description |
|-------|------|-------------|
| `/event-types` | Event Types | Create/edit/delete meeting types |
| `/availability` | Availability | Configure weekly schedule |
| `/meetings` | Meetings | View upcoming & past meetings |
| `/connect-calendar` | Calendar Sync | Connect Google Calendar |

---

## 🖼️ Brand Assets Used

The `images/` folder contains real Calendly brand assets used for authentic UI:

- **Customer Logos:** Dropbox, Compass, Gong, Zendesk, Vonage, L'Oréal, DoorDash, Lyft, HackerOne, Carnival, Indiana University, Muck Rack, Smith.ai, UT Austin
- **Integration Icons:** Zoom, Google Calendar, Slack, Teams, Salesforce, HubSpot, Stripe, Zapier, PayPal, Gmail, Outlook, Intercom, LinkedIn, Chrome, Webex, ActiveCampaign, Typeform
- **Security Badges:** SOC 2, PCI DSS, GDPR, ISO 27001, STAR Level One, CCPA
- **Brand:** Calendly logo (SVG + PNG), Logomark
- **Auth:** Google logo, Microsoft logo

---

## 🔄 Key Workflows

### Booking Flow
```
Invitee visits /book/:slug
       ↓
Sees calendar month view
       ↓
Selects available date
       ↓
Time slots generated (availability - existing bookings)
       ↓
Selects time slot
       ↓
Fills in name + email
       ↓
POST /api/public/:slug/book
       ↓
Meeting created in DB
       ↓
Google Calendar event created (if connected)
       ↓
Redirected to /book/:slug/confirm
```

### Signup Flow
```
User clicks "Get started" / "Sign up"
       ↓
Navigates to /signup
       ↓
Option A: "Continue with Google" → OAuth flow → auto-calendar connect
Option B: "Continue with email" → creates account → /event-types
       ↓
Redirected to /event-types (admin dashboard)
```

---

## 🧪 Seed Data

Running `npm run seed` in the server creates:

- **1 default user** (admin)
- **3 event types:** "Intro Call" (30min), "Quick Chat" (15min), "Consultation" (60min)
- **Availability rules:** Mon–Fri, 9:00 AM – 5:00 PM (Asia/Kolkata)
- **2 sample meetings:** one upcoming, one past

---

## 📝 Design Decisions

1. **Pixel-perfect Calendly UI** — Landing page, nav dropdowns, and signup page match the real Calendly.com
2. **Shared navigation component** — `LandingNav` with hover-based mega-menus ensures consistency across all public pages
3. **Real brand assets** — SVG logos and icons from the Calendly ecosystem for authenticity
4. **Service-layer architecture** — Business logic separated into services (timeService, meetingService, googleService)
5. **Slot generation algorithm** — Computes available slots by subtracting existing bookings from availability window, respecting event duration
6. **Google Calendar sync** — Uses refresh tokens for persistent access without re-auth

---

## 📄 License

This project is built for **educational/demonstration purposes** only. Calendly is a registered trademark of Calendly LLC.

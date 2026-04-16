import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import { AvailabilityPage } from "./pages/AvailabilityPage";
import { BookingConfirmationPage } from "./pages/BookingConfirmationPage";
import { ConnectCalendarPage } from "./pages/ConnectCalendarPage";
import { EventTypesPage } from "./pages/EventTypesPage";
import { LandingPage } from "./pages/LandingPage";
import { MeetingsPage } from "./pages/MeetingsPage";
import { ProductPage } from "./pages/ProductPage";
import { PublicBookingPage } from "./pages/PublicBookingPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { SignupPage } from "./pages/SignupPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { PricingPage } from "./pages/PricingPage";
import { PaymentsPage } from "./pages/PaymentsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<SignupPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route
        path="/event-types"
        element={
          <AdminLayout>
            <EventTypesPage />
          </AdminLayout>
        }
      />
      <Route
        path="/availability"
        element={
          <AdminLayout>
            <AvailabilityPage />
          </AdminLayout>
        }
      />
      <Route
        path="/meetings"
        element={
          <AdminLayout>
            <MeetingsPage />
          </AdminLayout>
        }
      />
      <Route
        path="/connect-calendar"
        element={
          <AdminLayout>
            <ConnectCalendarPage />
          </AdminLayout>
        }
      />
      <Route path="/book/:slug" element={<PublicBookingPage />} />
      <Route path="/book/:slug/confirm" element={<BookingConfirmationPage />} />
    </Routes>
  );
}

export default App;

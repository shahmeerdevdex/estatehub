import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PropertyListing from "./pages/PropertyListing";
import Contact from "./pages/Contact";
import AddProperty from "./pages/AddProperty";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import MaintenanceRequests from "./pages/MaintenanceRequests";
import PropertyDetail from "./pages/PropertyDetail";
import Payments from "./pages/Payments";
import Appointments from "./pages/Appointments";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import PropertyIntake from "./pages/PropertyIntake";
import SecureProperty from "./pages/SecureProperty";
import FinesViolationsCheck from "./pages/FinesViolationsCheck";
import InspectionRequest from "./pages/InspectionRequest";
import MarketReadinessEstimate from "./pages/MarketReadinessEstimate";
import Pricing from "./pages/Pricing";
import Unauthorized from "./pages/Unauthorized";
import { ChatProvider } from "./contexts/ChatContext";
import { ChatWidget } from "./components/chat/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ChatProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/properties" element={<PropertyListing />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetails />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected Routes (any authenticated user) */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Property Owner Routes */}
              <Route 
                path="/start-property-intake" 
                element={
                  <ProtectedRoute requiredRoles={['owner', 'asset_manager', 'admin']}>
                    <PropertyIntake />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/secure-property" 
                element={
                  <ProtectedRoute requiredRoles={['owner', 'asset_manager', 'admin']}>
                    <SecureProperty />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/fines-violations-check" 
                element={
                  <ProtectedRoute requiredRoles={['owner', 'asset_manager', 'admin']}>
                    <FinesViolationsCheck />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/inspection-request" 
                element={
                  <ProtectedRoute requiredRoles={['owner', 'asset_manager', 'admin']}>
                    <InspectionRequest />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/market-readiness-estimate" 
                element={
                  <ProtectedRoute requiredRoles={['owner', 'asset_manager', 'admin']}>
                    <MarketReadinessEstimate />
                  </ProtectedRoute>
                } 
              />
              
              {/* Tenant Routes */}
              <Route 
                path="/properties/:id" 
                element={
                  <ProtectedRoute>
                    <PropertyDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payments" 
                element={
                  <ProtectedRoute>
                    <Payments />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/appointments" 
                element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/maintenance" 
                element={
                  <ProtectedRoute>
                    <MaintenanceRequests />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/add-property" 
                element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <AddProperty />
                  </ProtectedRoute>
                } 
              />
              
              {/* Legacy/Placeholder Routes */}
              <Route path="/support" element={<NotFound />} />
              <Route path="/rent-collection" element={<NotFound />} />
              <Route path="/eviction-support" element={<NotFound />} />
              <Route path="/broker-tools" element={<NotFound />} />
              <Route path="/institutional" element={<NotFound />} />
              <Route path="/onboarding" element={<NotFound />} />
              <Route path="/how-it-works" element={<NotFound />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Chat Widget - appears on all pages */}
            <ChatWidget />
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

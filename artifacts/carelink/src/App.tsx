import { Switch, Route, Router as WouterRouter, useParams } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import FloatingButtons from "@/components/FloatingButtons";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import CaregiversPage from "@/pages/caregivers";
import CaregiverDetailPage from "@/pages/caregiver-detail";
import EmergencyPage from "@/pages/emergency";
import PricingPage from "@/pages/pricing";
import ProgramsPage from "@/pages/programs";
import ReviewsPage from "@/pages/reviews";
import ConsultationPage from "@/pages/consultation";
import MypagePage from "@/pages/mypage";
import AdminPage from "@/pages/admin";
import JobsPage from "@/pages/jobs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function CaregiverDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  return <CaregiverDetailPage id={id ?? "0"} />;
}

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/caregivers" component={CaregiversPage} />
        <Route path="/caregivers/:id" component={CaregiverDetailWrapper} />
        <Route path="/emergency" component={EmergencyPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/programs" component={ProgramsPage} />
        <Route path="/reviews" component={ReviewsPage} />
        <Route path="/jobs" component={JobsPage} />
        <Route path="/consultation" component={ConsultationPage} />
        <Route path="/mypage" component={MypagePage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
      <FloatingButtons />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base="">
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

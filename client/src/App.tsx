import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import BiblePage from "@/pages/bible";
import AudioPage from "@/pages/audio";
import CommunityPage from "@/pages/community";
import PrayerPage from "@/pages/prayer";
import GroupsPage from "@/pages/groups";
import EventsPage from "@/pages/events";
import SettingsPage from "@/pages/settings";
import ReadingPlansPage from "@/pages/plans";
import CoursesPage from "@/pages/courses";
import KidsPage from "@/pages/kids";
import AuthPage from "@/pages/auth";
import DevotionalPage from "@/pages/devotional";
import ForumsPage from "@/pages/forums";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="/login">
        <AuthPage initialTab="login" />
      </Route>
      <Route path="/register">
        <AuthPage initialTab="register" />
      </Route>

      <Route path="/dashboard" component={Dashboard} />
      <Route path="/devotional" component={DevotionalPage} />
      <Route path="/bible" component={BiblePage} />
      <Route path="/audio" component={AudioPage} />
      <Route path="/community" component={CommunityPage} />
      <Route path="/forums" component={ForumsPage} />
      <Route path="/prayer" component={PrayerPage} />
      <Route path="/groups" component={GroupsPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/plans" component={ReadingPlansPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/kids" component={KidsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

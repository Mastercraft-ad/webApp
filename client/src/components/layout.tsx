import { Link, useLocation } from "wouter";
import { 
  BookOpen, 
  Home, 
  Music, 
  Users, 
  Heart, 
  Calendar, 
  Settings, 
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  GraduationCap,
  Bookmark,
  Library,
  Baby,
  Sun,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LayoutProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
}

export default function Layout({ children, hideSidebar = false }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Daily Devotional", href: "/devotional", icon: Sun },
    { name: "Bible Reader", href: "/bible", icon: BookOpen },
    { name: "Reading Plans", href: "/plans", icon: Bookmark },
    { name: "Courses & Learning", href: "/courses", icon: GraduationCap },
    { name: "Audio & Sermons", href: "/audio", icon: Music },
    { name: "Community", href: "/community", icon: Users },
    { name: "Forums", href: "/forums", icon: MessageSquare },
    { name: "Prayer", href: "/prayer", icon: Heart },
    { name: "Study Groups", href: "/groups", icon: Library },
    { name: "Events", href: "/events", icon: Calendar },
  ];

  if (hideSidebar) {
    return (
      <div className="min-h-screen bg-background font-sans">
        {children}
      </div>
    );
  }

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex flex-col h-full transition-all duration-300">
      <div className={cn("p-4 flex items-center", collapsed ? "justify-center" : "justify-between")}>
        <Link href="/dashboard">
          <div className={cn("flex items-center gap-2 transition-all duration-300", collapsed ? "justify-center" : "")}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
              <span className="font-serif italic">A</span>
            </div>
            {!collapsed && (
              <h1 className="text-2xl font-bold tracking-tight text-primary cursor-pointer whitespace-nowrap overflow-hidden animate-in fade-in duration-300">
                Abideon
              </h1>
            )}
          </div>
        </Link>
        {!collapsed && (
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarCollapsed(true)} className="hidden md:flex h-8 w-8 text-muted-foreground">
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 px-2 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        <div className="mb-4 py-2">
          {!collapsed && (
            <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 animate-in fade-in">
              Menu
            </p>
          )}
          {collapsed && (
             <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setIsSidebarCollapsed(false)} 
               className="mx-auto flex mb-4 h-8 w-8 text-muted-foreground hover:text-foreground"
               title="Expand Menu"
             >
               <PanelLeftOpen className="h-4 w-4" />
             </Button>
          )}
          
          {navigation.map((item) => {
            const isActive = location === item.href;
            
            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>
                      <div
                        className={cn(
                          "group flex items-center justify-center p-2 my-1 rounded-xl transition-colors cursor-pointer mx-auto w-10 h-10",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 shrink-0 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        {collapsed ? (
           <div className="flex flex-col items-center gap-2">
              <Link href="/settings">
                <div className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-xl transition-colors cursor-pointer",
                  location === "/settings" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}>
                   <Settings className="h-5 w-5" />
                </div>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="right" className="w-56 ml-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/settings">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href="/kids">
                    <DropdownMenuItem className="text-primary font-bold">
                      <Baby className="mr-2 h-4 w-4" /> Kids Mode
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/auth">
                    <DropdownMenuItem className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
           </div>
        ) : (
          <>
            <Link href="/settings">
              <div className={cn(
                "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors cursor-pointer mb-1",
                location === "/settings" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </div>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center p-4 mt-2 rounded-xl bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 overflow-hidden flex-1">
                    <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                    <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" side="top">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/settings">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/kids">
                  <DropdownMenuItem className="text-primary font-bold">
                    <Baby className="mr-2 h-4 w-4" /> Kids Mode
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/auth">
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-sans flex">
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden md:flex md:flex-col md:fixed md:inset-y-0 border-r border-border bg-card/50 backdrop-blur-sm z-50 transition-all duration-300",
        isSidebarCollapsed ? "md:w-20" : "md:w-64"
      )}>
        <SidebarContent collapsed={isSidebarCollapsed} />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-40 flex items-center justify-between px-4">
        <Link href="/dashboard">
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-white text-xs">
              <span className="font-serif italic">A</span>
            </div>
            Abideon
          </h1>
        </Link>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent collapsed={false} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300",
        isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
      )}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-md px-6 justify-between md:justify-end">
           <div className="hidden md:flex items-center flex-1 max-w-xl relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <input 
               type="text" 
               placeholder="Search scripture, sermons, people..." 
               className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-muted-foreground"
             />
           </div>

           <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
               <Bell className="h-5 w-5" />
               <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border-2 border-background"></span>
             </Button>
           </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Bell, 
  Lock, 
  CreditCard, 
  Palette, 
  Smartphone,
  Globe,
  HelpCircle,
  LogOut
} from "lucide-react";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <Card className="md:col-span-1 h-fit">
            <CardContent className="p-2">
              <nav className="space-y-1">
                {[
                  { icon: User, label: "Profile", id: "profile" },
                  { icon: Bell, label: "Notifications", id: "notifications" },
                  { icon: Palette, label: "Appearance", id: "appearance" },
                  { icon: Lock, label: "Privacy", id: "privacy" },
                  { icon: CreditCard, label: "Subscription", id: "billing" },
                  { icon: Smartphone, label: "Devices", id: "devices" },
                  { icon: HelpCircle, label: "Help", id: "help" },
                ].map((item) => (
                  <Button 
                    key={item.id} 
                    variant="ghost" 
                    className="w-full justify-start font-medium"
                  >
                    <item.icon className="mr-2 h-4 w-4" /> {item.label}
                  </Button>
                ))}
                <Separator className="my-2" />
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </nav>
            </CardContent>
          </Card>

          {/* Main Settings Content */}
          <div className="md:col-span-3 space-y-6">
             {/* Profile Section */}
             <Card>
               <CardHeader>
                 <CardTitle>Profile Information</CardTitle>
                 <CardDescription>Update your personal details and public profile.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                 <div className="flex items-center gap-4">
                   <Avatar className="h-20 w-20">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>JD</AvatarFallback>
                   </Avatar>
                   <Button variant="outline">Change Photo</Button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="firstName">First Name</Label>
                     <Input id="firstName" defaultValue="John" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="lastName">Last Name</Label>
                     <Input id="lastName" defaultValue="Doe" />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="email">Email Address</Label>
                   <Input id="email" defaultValue="john@example.com" />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="bio">Bio</Label>
                   <Input id="bio" defaultValue="Believer. Husband. Father." />
                 </div>
                 
                 <div className="flex justify-end">
                   <Button>Save Changes</Button>
                 </div>
               </CardContent>
             </Card>

             {/* Notifications */}
             <Card>
               <CardHeader>
                 <CardTitle>Notifications</CardTitle>
                 <CardDescription>Manage how you receive updates.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 {[
                   { title: "Daily Verse", desc: "Receive the verse of the day every morning." },
                   { title: "Prayer Reminders", desc: "Get reminded to pray for your list." },
                   { title: "Group Activity", desc: "New posts and comments in your groups." },
                   { title: "Sermon Releases", desc: "Notify when new sermons are available." },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="space-y-0.5">
                       <Label className="text-base">{item.title}</Label>
                       <p className="text-sm text-muted-foreground">{item.desc}</p>
                     </div>
                     <Switch defaultChecked />
                   </div>
                 ))}
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

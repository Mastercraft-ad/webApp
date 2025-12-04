import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { 
  User, 
  Bell, 
  Lock, 
  CreditCard, 
  Palette, 
  Smartphone,
  Globe,
  HelpCircle,
  LogOut,
  Shield,
  Key,
  Mail,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Laptop,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully updated.",
    });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your profile, security, and preferences.</p>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <Card className="md:col-span-3 h-fit border-none shadow-none bg-transparent md:bg-card md:shadow-sm md:border">
            <CardContent className="p-0 md:p-2">
              <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-1 pb-2 md:pb-0">
                {[
                  { icon: User, label: "Profile", id: "profile" },
                  { icon: Lock, label: "Security", id: "security" },
                  { icon: Bell, label: "Notifications", id: "notifications" },
                  { icon: Smartphone, label: "Sessions", id: "sessions" },
                  { icon: CreditCard, label: "Billing", id: "billing" },
                  { icon: Palette, label: "Appearance", id: "appearance" },
                  { icon: Shield, label: "Privacy", id: "privacy" },
                ].map((item) => (
                  <Button 
                    key={item.id} 
                    variant={activeTab === item.id ? "secondary" : "ghost"} 
                    className={`justify-start font-medium whitespace-nowrap ${activeTab === item.id ? "bg-primary/10 text-primary" : ""}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="mr-2 h-4 w-4" /> {item.label}
                  </Button>
                ))}
                <Separator className="my-2 hidden md:block" />
                <Button variant="ghost" className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10 hidden md:flex w-full">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </nav>
            </CardContent>
          </Card>

          {/* Main Settings Content */}
          <div className="md:col-span-9 space-y-6">
             {/* Profile Tab */}
             {activeTab === "profile" && (
               <div className="space-y-6 animate-in fade-in duration-300">
                 <Card>
                   <CardHeader>
                     <CardTitle>Public Profile</CardTitle>
                     <CardDescription>This information will be displayed publicly.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div className="flex items-center gap-6">
                       <div className="relative">
                         <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                           <AvatarImage src="https://github.com/shadcn.png" />
                           <AvatarFallback>JD</AvatarFallback>
                         </Avatar>
                         <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-sm">
                           <Palette className="h-4 w-4" />
                         </Button>
                       </div>
                       <div className="space-y-1">
                         <h3 className="font-medium text-lg">Profile Picture</h3>
                         <p className="text-sm text-muted-foreground">JPG, GIF or PNG. Max size of 800K.</p>
                         <div className="flex gap-2 mt-2">
                           <Button variant="outline" size="sm">Upload New</Button>
                           <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Remove</Button>
                         </div>
                       </div>
                     </div>
                     
                     <Separator />

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
                       <Label htmlFor="username">Username</Label>
                       <div className="flex">
                         <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                           abideon.com/u/
                         </span>
                         <Input id="username" className="rounded-l-none" defaultValue="johndoe" />
                       </div>
                     </div>

                     <div className="space-y-2">
                       <Label htmlFor="bio">Bio</Label>
                       <Textarea id="bio" className="resize-none min-h-[100px]" defaultValue="Believer. Husband. Father. Seeking to grow in faith daily." />
                       <p className="text-xs text-muted-foreground text-right">0/160</p>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             )}

             {/* Security Tab */}
             {activeTab === "security" && (
               <div className="space-y-6 animate-in fade-in duration-300">
                 <Card>
                   <CardHeader>
                     <CardTitle>Account Security</CardTitle>
                     <CardDescription>Manage your password and security settings.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <div className="space-y-0.5">
                           <Label className="text-base">Email Address</Label>
                           <div className="flex items-center gap-2">
                             <p className="text-sm text-muted-foreground">john@example.com</p>
                             <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 hover:bg-green-100 border-green-200 gap-1">
                               <CheckCircle2 className="h-3 w-3" /> Verified
                             </Badge>
                           </div>
                         </div>
                         <Button variant="outline" size="sm">Change Email</Button>
                       </div>
                       <Separator />
                       <div className="flex items-center justify-between">
                         <div className="space-y-0.5">
                           <Label className="text-base">Password</Label>
                           <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                         </div>
                         <Button variant="outline" size="sm">Update Password</Button>
                       </div>
                     </div>

                     <Separator />

                     <div className="space-y-4">
                       <h3 className="font-medium flex items-center gap-2">
                         <Shield className="h-4 w-4 text-primary" /> 
                         Multi-Factor Authentication (MFA)
                       </h3>
                       <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                         <div className="space-y-1">
                           <p className="font-medium">Authenticator App</p>
                           <p className="text-sm text-muted-foreground max-w-md">
                             Use an authenticator app like Google Authenticator or Authy to generate verification codes.
                           </p>
                         </div>
                         <Switch />
                       </div>
                       <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                         <div className="space-y-1">
                           <p className="font-medium">SMS Authentication</p>
                           <p className="text-sm text-muted-foreground max-w-md">
                             Receive verification codes via SMS message.
                           </p>
                         </div>
                         <Button variant="outline" size="sm">Setup</Button>
                       </div>
                     </div>
                   </CardContent>
                 </Card>

                 <Card className="border-destructive/20">
                   <CardHeader>
                     <CardTitle className="text-destructive">Danger Zone</CardTitle>
                     <CardDescription>Irreversible actions for your account.</CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="flex items-center justify-between">
                       <div className="space-y-1">
                         <p className="font-medium">Delete Account</p>
                         <p className="text-sm text-muted-foreground">
                           Permanently delete your account and all of your content.
                         </p>
                       </div>
                       <Dialog>
                         <DialogTrigger asChild>
                           <Button variant="destructive">Delete Account</Button>
                         </DialogTrigger>
                         <DialogContent>
                           <DialogHeader>
                             <DialogTitle>Are you absolutely sure?</DialogTitle>
                             <DialogDescription>
                               This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                             </DialogDescription>
                           </DialogHeader>
                           <DialogFooter>
                             <Button variant="outline">Cancel</Button>
                             <Button variant="destructive">Yes, delete my account</Button>
                           </DialogFooter>
                         </DialogContent>
                       </Dialog>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             )}

             {/* Notifications Tab */}
             {activeTab === "notifications" && (
               <div className="space-y-6 animate-in fade-in duration-300">
                 <Card>
                   <CardHeader>
                     <CardTitle>Notification Preferences</CardTitle>
                     <CardDescription>Choose what you want to be notified about.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div className="space-y-4">
                       <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-4">Activity</h3>
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
                     </div>

                     <Separator />

                     <div className="space-y-4">
                       <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-4">Security</h3>
                       <div className="flex items-center justify-between">
                         <div className="space-y-0.5">
                           <Label className="text-base">Login Alerts</Label>
                           <p className="text-sm text-muted-foreground">Notify me of new logins from unknown devices.</p>
                         </div>
                         <Switch defaultChecked />
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             )}

             {/* Sessions Tab */}
             {activeTab === "sessions" && (
               <div className="space-y-6 animate-in fade-in duration-300">
                 <Card>
                   <CardHeader>
                     <CardTitle>Active Sessions</CardTitle>
                     <CardDescription>Manage the devices where you're currently logged in.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div className="flex items-start justify-between p-4 border border-primary/20 bg-primary/5 rounded-lg">
                       <div className="flex gap-4">
                         <div className="h-10 w-10 bg-background rounded-full flex items-center justify-center border border-border">
                           <Laptop className="h-5 w-5 text-primary" />
                         </div>
                         <div>
                           <p className="font-medium flex items-center gap-2">
                             MacBook Pro
                             <Badge className="text-[10px] h-5">Current Device</Badge>
                           </p>
                           <p className="text-sm text-muted-foreground">San Francisco, US • Chrome • Active now</p>
                         </div>
                       </div>
                     </div>

                     <div className="flex items-start justify-between p-4 border border-border rounded-lg">
                       <div className="flex gap-4">
                         <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                           <Phone className="h-5 w-5 text-muted-foreground" />
                         </div>
                         <div>
                           <p className="font-medium">iPhone 13 Pro</p>
                           <p className="text-sm text-muted-foreground">San Francisco, US • Abideon App • 2 hours ago</p>
                         </div>
                       </div>
                       <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                         Revoke
                       </Button>
                     </div>

                     <div className="flex items-start justify-between p-4 border border-border rounded-lg">
                       <div className="flex gap-4">
                         <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                           <Laptop className="h-5 w-5 text-muted-foreground" />
                         </div>
                         <div>
                           <p className="font-medium">Windows PC</p>
                           <p className="text-sm text-muted-foreground">New York, US • Firefox • 3 days ago</p>
                         </div>
                       </div>
                       <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                         Revoke
                       </Button>
                     </div>
                   </CardContent>
                   <CardFooter className="bg-muted/30 border-t border-border p-4">
                     <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                       Sign Out of All Other Devices
                     </Button>
                   </CardFooter>
                 </Card>
               </div>
             )}

             {/* Privacy Tab */}
             {activeTab === "privacy" && (
               <div className="space-y-6 animate-in fade-in duration-300">
                 <Card>
                   <CardHeader>
                     <CardTitle>Privacy Settings</CardTitle>
                     <CardDescription>Control who can see your profile and activity.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <div className="space-y-0.5">
                           <Label className="text-base">Profile Visibility</Label>
                           <p className="text-sm text-muted-foreground">Who can see your profile details.</p>
                         </div>
                         <Select defaultValue="public">
                           <SelectTrigger className="w-[180px]">
                             <SelectValue placeholder="Select visibility" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="public">Everyone</SelectItem>
                             <SelectItem value="friends">Friends Only</SelectItem>
                             <SelectItem value="private">Only Me</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                       <Separator />
                       <div className="flex items-center justify-between">
                         <div className="space-y-0.5">
                           <Label className="text-base">Show Reading Activity</Label>
                           <p className="text-sm text-muted-foreground">Let friends see what you're reading.</p>
                         </div>
                         <Switch defaultChecked />
                       </div>
                       <Separator />
                       <div className="flex items-center justify-between">
                         <div className="space-y-0.5">
                           <Label className="text-base">Search Engines</Label>
                           <p className="text-sm text-muted-foreground">Allow search engines to index your profile.</p>
                         </div>
                         <Switch />
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             )}

             {/* Billing Tab */}
             {activeTab === "billing" && (
               <div className="space-y-6 animate-in fade-in duration-300">
                 <Card>
                   <CardHeader>
                     <CardTitle>Subscription Plan</CardTitle>
                     <CardDescription>Manage your subscription and billing information.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl flex items-center justify-between">
                       <div>
                         <div className="flex items-center gap-2 mb-1">
                           <h3 className="font-bold text-xl text-primary">Premium Plan</h3>
                           <Badge>Active</Badge>
                         </div>
                         <p className="text-muted-foreground text-sm">Billed annually. Next billing date: Dec 24, 2025</p>
                       </div>
                       <div className="text-right">
                         <p className="font-bold text-xl">$59.99</p>
                         <p className="text-xs text-muted-foreground">/year</p>
                       </div>
                     </div>
                     
                     <div className="flex gap-2">
                       <Button variant="outline">Cancel Subscription</Button>
                       <Button>Upgrade Plan</Button>
                     </div>
                   </CardContent>
                 </Card>

                 <Card>
                   <CardHeader>
                     <CardTitle>Payment Methods</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-6 bg-foreground rounded text-background text-[8px] flex items-center justify-center font-bold">
                           VISA
                         </div>
                         <div>
                           <p className="font-medium">Visa ending in 4242</p>
                           <p className="text-xs text-muted-foreground">Expires 12/28</p>
                         </div>
                       </div>
                       <Button variant="ghost" size="sm">Edit</Button>
                     </div>
                     <Button variant="outline" className="w-full border-dashed">+ Add Payment Method</Button>
                   </CardContent>
                 </Card>
               </div>
             )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

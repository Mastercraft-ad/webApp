import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Users, 
  MapPin, 
  Calendar, 
  ArrowRight,
  MessageSquare
} from "lucide-react";

export default function GroupsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero / Search */}
        <div className="relative rounded-3xl overflow-hidden bg-muted h-64 flex items-center justify-center text-center px-4">
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            alt="Groups"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Find Your Community</h1>
            <p className="text-muted-foreground mb-8 text-lg">Connect with others, grow in faith, and do life together.</p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search by topic, location, or name..." 
                className="w-full h-12 pl-10 pr-4 rounded-full bg-background border border-border shadow-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
        </div>

        {/* My Groups */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Groups</h2>
            <Button variant="outline">Manage Groups</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Young Professionals", next: "Tue, 7:00 PM", loc: "Coffee House", members: 18, img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" },
              { name: "Marriage Ministry", next: "Sun, 9:00 AM", loc: "Room 302", members: 24, img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop" }
            ].map((group, i) => (
              <Card key={i} className="overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex h-full">
                  <div className="w-1/3 relative">
                    <img src={group.img} className="absolute inset-0 w-full h-full object-cover" alt={group.name} />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">Member</Badge>
                      <div className="flex -space-x-2">
                         {[1,2,3].map(m => (
                           <Avatar key={m} className="h-6 w-6 border-2 border-background">
                             <AvatarImage src={`https://i.pravatar.cc/150?u=${i * 10 + m}`} />
                           </Avatar>
                         ))}
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{group.name}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Next: {group.next}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> {group.loc}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">Dashboard</Button>
                      <Button variant="outline" size="icon" className="h-9 w-9"><MessageSquare className="h-4 w-4" /></Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Discover */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Discover New Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[1, 2, 3, 4, 5, 6].map((i) => (
               <Card key={i} className="hover:shadow-lg transition-all">
                 <div className="h-48 bg-muted relative">
                   <img 
                     src={`https://images.unsplash.com/photo-${1530000000000 + i}?q=80&w=600&auto=format&fit=crop`} 
                     className="w-full h-full object-cover" 
                     alt="Group"
                   />
                   <Badge className="absolute top-4 left-4 bg-white text-black hover:bg-white">Open</Badge>
                 </div>
                 <CardContent className="p-6">
                   <h3 className="font-bold text-lg mb-2">Foundations of Faith</h3>
                   <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                     A 6-week journey exploring the core beliefs of Christianity. Perfect for new believers or those asking questions.
                   </p>
                   <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                     <span className="flex items-center gap-1"><Users className="h-4 w-4" /> 12/20 spots</span>
                     <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Main Hall</span>
                   </div>
                   <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                     View Details <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

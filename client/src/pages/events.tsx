import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Calendar as CalendarIcon, ExternalLink, Share2 } from "lucide-react";

export default function EventsPage() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <Card>
             <CardContent className="p-4">
               <Calendar className="rounded-md border w-full" />
             </CardContent>
           </Card>

           <Card>
             <CardContent className="p-6">
               <h3 className="font-bold text-lg mb-4">Filters</h3>
               <div className="space-y-3">
                 {['Worship Services', 'Small Groups', 'Outreach', 'Youth', 'Kids', 'Online'].map((filter) => (
                   <div key={filter} className="flex items-center gap-2">
                     <div className="h-4 w-4 rounded border border-primary bg-primary/20"></div>
                     <span className="text-sm font-medium">{filter}</span>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
        </div>

        {/* Events List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h1 className="text-3xl font-bold">Upcoming Events</h1>
             <Button variant="outline">Sync to Calendar</Button>
          </div>

          {[
            { title: "Sunday Service: Grace Revealed", date: "Sunday, Oct 24", time: "9:00 AM & 11:00 AM", loc: "Main Sanctuary", type: "Worship", img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop" },
            { title: "Fall Festival Outreach", date: "Saturday, Oct 30", time: "2:00 PM - 6:00 PM", loc: "City Park", type: "Outreach", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop" },
            { title: "Youth Night: Glow Party", date: "Friday, Oct 29", time: "7:00 PM", loc: "Youth Center", type: "Youth", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop" },
          ].map((event, i) => (
            <Card key={i} className="overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-48 h-48 sm:h-auto relative">
                <img src={event.img} className="absolute inset-0 w-full h-full object-cover" alt={event.title} />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-white/90 text-black hover:bg-white">{event.type}</Badge>
                </div>
              </div>
              <CardContent className="flex-1 p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-bold text-primary uppercase tracking-wider">{event.date}</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Share2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{event.title}</h3>
                
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {event.loc}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button>Register Now</Button>
                  <Button variant="outline">Details <ExternalLink className="ml-2 h-3 w-3" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

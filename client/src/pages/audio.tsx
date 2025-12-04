import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  ListMusic, 
  Clock, 
  Download,
  MoreVertical,
  Heart
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function AudioPage() {
  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Featured Hero */}
        <div className="flex-shrink-0 mb-8">
           <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
             <img 
               src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               alt="Worship Concert"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
             <div className="absolute bottom-0 left-0 p-8 text-white">
               <Badge className="mb-3 bg-primary hover:bg-primary">New Release</Badge>
               <h1 className="text-4xl font-bold mb-2">Sunday Worship Live</h1>
               <p className="text-white/80 mb-6 max-w-xl">Experience the powerful worship session from this Sunday's service featuring the new choir anthem.</p>
               <div className="flex gap-3">
                 <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90">
                   <Play className="mr-2 h-5 w-5 fill-current" /> Play Now
                 </Button>
                 <Button size="lg" variant="outline" className="rounded-full text-white border-white/30 hover:bg-white/20 hover:text-white bg-black/30 backdrop-blur-sm">
                   <Heart className="mr-2 h-5 w-5" /> Save to Library
                 </Button>
               </div>
             </div>
           </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 min-h-0 flex gap-8">
          <div className="flex-1 overflow-y-auto pr-4">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-2xl font-bold">Recent Sermons</h2>
               <Button variant="link">View All</Button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
               {[1, 2, 3, 4, 5, 6].map((i) => (
                 <div key={i} className="group cursor-pointer">
                   <div className="relative aspect-video bg-muted rounded-xl overflow-hidden mb-3">
                     <img 
                       src={`https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=800&auto=format&fit=crop`}
                       className="w-full h-full object-cover transition-transform group-hover:scale-105"
                       alt="Thumbnail"
                     />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                         <Play className="h-6 w-6 fill-current" />
                       </div>
                     </div>
                     <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white font-medium">
                       45:20
                     </div>
                   </div>
                   <h3 className="font-bold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">Walking in Faith Part {i}</h3>
                   <p className="text-sm text-muted-foreground">Pastor David • Oct 2{i}</p>
                 </div>
               ))}
             </div>

             <div className="flex items-center justify-between mb-4">
               <h2 className="text-2xl font-bold">Worship Playlists</h2>
               <Button variant="link">View All</Button>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {['Morning Devotion', 'Deep Prayer', 'Upbeat Praise', 'Instrumental', 'Sleep'].map((name, i) => (
                 <div key={name} className="group cursor-pointer">
                   <div className="aspect-square bg-muted rounded-xl overflow-hidden mb-3 relative shadow-sm">
                     <img 
                       src={`https://images.unsplash.com/photo-${1510000000000 + i}?q=80&w=400&auto=format&fit=crop`}
                       className="w-full h-full object-cover"
                       alt="Cover"
                     />
                   </div>
                   <h3 className="font-medium text-sm text-foreground text-center">{name}</h3>
                 </div>
               ))}
             </div>
          </div>

          {/* Mini Player / Queue */}
          <div className="w-80 hidden lg:flex flex-col border-l border-border pl-8">
             <h3 className="font-bold text-lg mb-4">Up Next</h3>
             <div className="flex-1 overflow-y-auto space-y-2 pr-2">
               {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer group">
                   <div className="h-10 w-10 rounded bg-muted flex-shrink-0 overflow-hidden">
                     <img src={`https://images.unsplash.com/photo-${1520000000000 + i}?q=80&w=100&auto=format&fit=crop`} className="h-full w-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium truncate">Grace Abounds</p>
                     <p className="text-xs text-muted-foreground truncate">Worship Team</p>
                   </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                     <MoreVertical className="h-4 w-4" />
                   </Button>
                 </div>
               ))}
             </div>

             {/* Player Controls */}
             <div className="mt-6 pt-6 border-t border-border">
               <div className="aspect-square rounded-xl bg-muted overflow-hidden mb-4 shadow-lg">
                 <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div className="mb-4">
                 <h3 className="font-bold text-lg">Ocean of Mercy</h3>
                 <p className="text-muted-foreground text-sm">Hillsong United</p>
               </div>
               <div className="space-y-4">
                 <div className="w-full bg-secondary/30 h-1 rounded-full overflow-hidden">
                   <div className="bg-primary h-full w-1/3 rounded-full"></div>
                 </div>
                 <div className="flex justify-between items-center">
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><SkipBack className="h-5 w-5" /></Button>
                   <Button size="icon" className="h-12 w-12 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90"><Play className="h-6 w-6 fill-current pl-1" /></Button>
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><SkipForward className="h-5 w-5" /></Button>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

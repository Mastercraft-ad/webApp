import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Share2, 
  Heart, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Smile,
  Send,
  Users,
  Search
} from "lucide-react";

export default function CommunityPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Groups */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-lg">My Groups</h3>
                 <Button variant="ghost" size="icon" className="h-6 w-6"><Search className="h-4 w-4" /></Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Young Adults", members: 124, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=200&auto=format&fit=crop" },
                  { name: "Bible Study Wed", members: 12, image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=200&auto=format&fit=crop" },
                  { name: "Prayer Warriors", members: 45, image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=200&auto=format&fit=crop" },
                ].map((group, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <Avatar className="h-10 w-10 rounded-lg">
                      <AvatarImage src={group.image} className="object-cover" />
                      <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{group.name}</p>
                      <p className="text-xs text-muted-foreground">{group.members} members</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-xs">Discover Groups</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
           {/* Create Post */}
           <Card>
             <CardContent className="p-4">
               <div className="flex gap-4 mb-4">
                 <Avatar>
                   <AvatarImage src="https://github.com/shadcn.png" />
                   <AvatarFallback>JD</AvatarFallback>
                 </Avatar>
                 <Input placeholder="Share a prayer, verse, or thought..." className="bg-muted/30 border-none" />
               </div>
               <div className="flex justify-between items-center pt-2 border-t border-border/50">
                 <div className="flex gap-2">
                   <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2">
                     <ImageIcon className="h-4 w-4" /> Photo
                   </Button>
                   <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2">
                     <Smile className="h-4 w-4" /> Feeling
                   </Button>
                 </div>
                 <Button size="sm" className="px-6 rounded-full">Post</Button>
               </div>
             </CardContent>
           </Card>

           {/* Feed Items */}
           <Tabs defaultValue="all" className="w-full">
             <TabsList className="grid w-full grid-cols-3 mb-4">
               <TabsTrigger value="all">All Activity</TabsTrigger>
               <TabsTrigger value="following">Following</TabsTrigger>
               <TabsTrigger value="church">My Church</TabsTrigger>
             </TabsList>
             
             <TabsContent value="all" className="space-y-6">
               {[1, 2].map((i) => (
                 <Card key={i}>
                   <CardContent className="p-6">
                     <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-3">
                         <Avatar>
                           <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 10}`} />
                           <AvatarFallback>U</AvatarFallback>
                         </Avatar>
                         <div>
                           <p className="font-bold text-sm">Michael Chen</p>
                           <p className="text-xs text-muted-foreground">Young Adults Group • 3h ago</p>
                         </div>
                       </div>
                       <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                     </div>
                     
                     <p className="text-foreground mb-4">
                       Really blessed by today's sermon on grace. It's amazing how God's love meets us exactly where we are.
                     </p>
                     
                     {i === 1 && (
                       <div className="rounded-xl overflow-hidden mb-4">
                         <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop" className="w-full h-64 object-cover" />
                       </div>
                     )}

                     <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex gap-4">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-pink-500 gap-2">
                            <Heart className="h-4 w-4" /> 24
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 gap-2">
                            <MessageCircle className="h-4 w-4" /> 5
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                          <Share2 className="h-4 w-4" /> Share
                        </Button>
                     </div>
                   </CardContent>
                 </Card>
               ))}
             </TabsContent>
           </Tabs>
        </div>

        {/* Right Sidebar - Suggested */}
        <div className="lg:col-span-1 space-y-6">
           <Card>
             <CardContent className="p-4">
               <h3 className="font-bold text-lg mb-4">Suggested People</h3>
               <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <Avatar className="h-9 w-9">
                         <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 20}`} />
                         <AvatarFallback>U</AvatarFallback>
                       </Avatar>
                       <div className="min-w-0">
                         <p className="text-sm font-medium truncate">David Kim</p>
                         <p className="text-xs text-muted-foreground">New Member</p>
                       </div>
                     </div>
                     <Button size="sm" variant="secondary" className="h-7 text-xs">Follow</Button>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>

           <Card className="bg-gradient-to-br from-primary to-purple-800 text-white border-none">
             <CardContent className="p-6">
               <h3 className="font-bold text-lg mb-2">Prayer Challenge</h3>
               <p className="text-white/80 text-sm mb-4">Join 500+ members in the 30-day prayer challenge starting tomorrow.</p>
               <Button variant="secondary" className="w-full">Join Now</Button>
             </CardContent>
           </Card>
        </div>
      </div>
    </Layout>
  );
}

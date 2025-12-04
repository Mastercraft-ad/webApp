import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import devotionalBg from "@assets/generated_images/serene_morning_light_for_devotional_background.png";
import { 
  Calendar, 
  Share2, 
  Bookmark, 
  MessageCircle, 
  Heart, 
  Play,
  ChevronLeft,
  ChevronRight,
  Clock
} from "lucide-react";

export default function DevotionalPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Daily Devotional</h1>
            <p className="text-muted-foreground">Start your day with purpose and prayer.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" className="min-w-[140px]"><Calendar className="mr-2 h-4 w-4" /> Oct 24, 2025</Button>
            <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="h-64 relative">
                <img src={devotionalBg} className="w-full h-full object-cover" alt="Morning Light" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none mb-3">Faith & Trust</Badge>
                  <h2 className="text-3xl font-bold font-serif leading-tight">Waiting on God's Timing</h2>
                  <p className="text-white/80 mt-2 flex items-center gap-2">
                    <Avatar className="h-6 w-6 border border-white/50">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    By Pastor Charles Stanley • 5 min read
                  </p>
                </div>
              </div>
              <CardContent className="p-8">
                <blockquote className="border-l-4 border-primary pl-6 py-2 mb-8 bg-muted/30 rounded-r-lg">
                  <p className="text-xl font-serif italic text-foreground mb-2">
                    "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint."
                  </p>
                  <footer className="text-sm font-bold text-primary">— Isaiah 40:31 (ESV)</footer>
                </blockquote>

                <div className="prose prose-lg dark:prose-invert max-w-none font-serif leading-loose text-foreground/90">
                  <p>
                    Waiting is never easy. In a world that values instant gratification, the concept of waiting seems counterintuitive, even wasteful. Yet, in God's economy, waiting is often the workshop where our character is forged.
                  </p>
                  <p>
                    When Isaiah speaks of "waiting for the Lord," he isn't describing a passive idling. The Hebrew word used here implies an active anticipation, a hopeful entangling of our hearts with God's. It's the kind of waiting a watchman does for the morning—confident that the sun will rise, even if the night feels long.
                  </p>
                  <p>
                    Are you in a season of waiting today? Perhaps you are waiting for a breakthrough in your career, healing in your body, or restoration in a relationship. Be encouraged. God is not ignoring you. He is preparing you.
                  </p>
                  <h3>Reflection</h3>
                  <p>
                    Take a moment to list the things you are waiting for. Surrender each one to God, asking Him to reveal what He wants to teach you in the waiting room.
                  </p>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <div className="flex gap-2">
                    <Button variant="ghost" className="text-muted-foreground hover:text-pink-500 gap-2">
                      <Heart className="h-5 w-5" /> 245
                    </Button>
                    <Button variant="ghost" className="text-muted-foreground hover:text-blue-500 gap-2">
                      <MessageCircle className="h-5 w-5" /> 12 Comments
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon"><Bookmark className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discussion Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-xl">Community Reflection</h3>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea 
                        className="w-full min-h-[80px] p-3 rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Share your thoughts on today's devotional..."
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <Button size="sm">Post Comment</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Devotional Streak</h3>
                <div className="flex items-center justify-center p-6 bg-primary/5 rounded-2xl mb-4">
                   <div className="text-center">
                     <div className="text-5xl font-bold text-primary mb-1">12</div>
                     <div className="text-sm text-muted-foreground uppercase tracking-wide">Days Straight</div>
                   </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  You're doing great! 3 more days to beat your record.
                </p>
              </CardContent>
            </Card>

            <Card>
               <CardContent className="p-6">
                 <h3 className="font-bold text-lg mb-4">Related Content</h3>
                 <div className="space-y-4">
                   <div className="group flex gap-3 cursor-pointer">
                     <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                       <Play className="h-6 w-6 text-muted-foreground" />
                     </div>
                     <div>
                       <p className="font-medium text-sm group-hover:text-primary transition-colors">Podcast: The Art of Waiting</p>
                       <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> 15 min</p>
                     </div>
                   </div>
                   <div className="group flex gap-3 cursor-pointer">
                     <div className="h-16 w-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1507692049790-de58293a469d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                     </div>
                     <div>
                       <p className="font-medium text-sm group-hover:text-primary transition-colors">Plan: Peace in Anxiety</p>
                       <p className="text-xs text-muted-foreground">7 Day Plan</p>
                     </div>
                   </div>
                 </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  HandHelping, // Note: lucide might not have this, check standard icons
  CheckCircle2, 
  Clock, 
  Share2, 
  MoreHorizontal,
  Heart,
  Lock
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrayerPage() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Prayer Lists */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Prayer Journal</h1>
              <p className="text-muted-foreground">Track your prayers and intercede for others.</p>
            </div>
            <Button className="gap-2 rounded-full shadow-lg hover:shadow-xl transition-all bg-primary text-white">
              <Plus className="h-4 w-4" /> Add Prayer
            </Button>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Prayers</TabsTrigger>
              <TabsTrigger value="answered">Answered</TabsTrigger>
              <TabsTrigger value="community">Community Wall</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {[
                { title: "Healing for Sarah", category: "Health", date: "2 days ago", privacy: "Friends" },
                { title: "Job Interview Wisdom", category: "Career", date: "5 days ago", privacy: "Private" },
                { title: "Peace for the Nation", category: "World", date: "1 week ago", privacy: "Public" },
              ].map((prayer, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="mt-1">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        i === 0 ? 'bg-red-100 text-red-600' : 
                        i === 1 ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        <Heart className="h-5 w-5 fill-current opacity-20" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-lg">{prayer.title}</h3>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <Badge variant="outline">{prayer.category}</Badge>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {prayer.date}</span>
                        <span className="flex items-center gap-1">
                          {prayer.privacy === 'Private' ? <Lock className="h-3 w-3" /> : <Share2 className="h-3 w-3" />}
                          {prayer.privacy}
                        </span>
                      </div>
                      <p className="text-foreground/80 mb-4">
                        Lord, I ask for your divine intervention and peace in this situation. Guide our steps and hearts.
                      </p>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="gap-2 hover:text-green-600 hover:border-green-200">
                          <CheckCircle2 className="h-4 w-4" /> Mark Answered
                        </Button>
                        <Button variant="ghost" size="sm">Update</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="community" className="space-y-4">
              <div className="columns-1 md:columns-2 gap-4 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="break-inside-avoid mb-4 bg-gradient-to-br from-card to-muted/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 50}`} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold">Mark Robinson</p>
                          <p className="text-xs text-muted-foreground">Church Member</p>
                        </div>
                      </div>
                      <p className="text-sm mb-4">Please pray for my family as we travel this week. Safety on the roads.</p>
                      <Button size="sm" className="w-full gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-none shadow-none">
                        <Heart className="h-4 w-4" /> Praying ({12 + i})
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Stats & Inspiration */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-primary text-white border-none">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold mb-2">Prayer Streak</h3>
              <div className="text-5xl font-bold mb-2">12</div>
              <p className="text-white/80 text-sm mb-6">Days in a row</p>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={`h-8 rounded-md flex items-center justify-center text-xs ${i > 3 ? 'bg-white/20' : 'bg-white text-primary'}`}>
                    {['M','T','W','T','F','S','S'][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/60">Keep it up! Consistency builds faith.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verse on Prayer</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
              </blockquote>
              <p className="text-right text-sm font-bold text-primary">— Philippians 4:6</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

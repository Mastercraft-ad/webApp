import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Search, 
  Plus, 
  Filter,
  Pin,
  MoreHorizontal
} from "lucide-react";

export default function ForumsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Community Forums</h1>
            <p className="text-muted-foreground">Discuss theology, life, and faith with the community.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search discussions..." className="pl-9" />
            </div>
            <Button className="gap-2"><Plus className="h-4 w-4" /> New Thread</Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: "Bible Study", count: "1.2k", icon: "📖", color: "bg-blue-100 text-blue-600" },
            { name: "Prayer Requests", count: "850", icon: "🙏", color: "bg-orange-100 text-orange-600" },
            { name: "Theology", count: "2.4k", icon: "🎓", color: "bg-purple-100 text-purple-600" },
            { name: "Christian Living", count: "3.1k", icon: "🌱", color: "bg-green-100 text-green-600" },
          ].map((cat, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl ${cat.color}`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-bold">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.count} topics</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Thread List */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="latest">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
              </div>

              <TabsContent value="latest" className="space-y-4">
                {/* Pinned Thread */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-1 text-muted-foreground min-w-[40px]">
                        <Pin className="h-5 w-5 text-primary fill-current" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-lg text-primary">Community Guidelines: Please Read Before Posting</h3>
                          <Badge variant="outline">Admin</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Welcome to the Abideon forums! Let's keep our discussions grace-filled and edifying...
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> 0 replies</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 5.2k views</span>
                          <span>Last post by <span className="font-bold">Admin</span> 2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Regular Threads */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1 min-w-[40px]">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 50}`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                             <div>
                               <h3 className="font-bold text-lg hover:text-primary transition-colors">
                                 {i === 1 ? "Understanding Predestination vs Free Will" : 
                                  i === 2 ? "Best commentaries for studying Romans?" :
                                  "Prayer request for my upcoming mission trip"}
                               </h3>
                               <div className="flex gap-2 mt-1">
                                 <Badge variant="secondary" className="text-[10px] h-5">{i === 1 ? "Theology" : i === 2 ? "Bible Study" : "Missions"}</Badge>
                               </div>
                             </div>
                             <div className="flex flex-col items-end text-xs text-muted-foreground">
                               <span>2h ago</span>
                               <span className="font-bold text-foreground">12 replies</span>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
                            <span>Started by <span className="font-medium text-foreground">User{i}</span></span>
                            <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {100 * i} views</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['#SermonOnTheMount', '#FaithInAction', '#Apologetics', '#WorshipMusic', '#BibleReading'].map((tag) => (
                  <div key={tag} className="flex justify-between items-center cursor-pointer group">
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{tag}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">24 posts</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 80}`} />
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-bold">TheologyNerd{i}</p>
                      <p className="text-xs text-muted-foreground">1,240 points</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Rank {i}</Badge>
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

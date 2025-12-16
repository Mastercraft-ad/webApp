import Layout from "@/components/layout";
import headerBg from "@assets/generated_images/abstract_soft_gradient_for_dashboard_header.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  BookOpen, 
  Calendar, 
  MoreHorizontal,
  Flame,
  ChevronRight,
  Clock,
  Heart,
  CheckCircle2
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Greeting Section */}
        <div className="relative rounded-3xl overflow-hidden text-white shadow-xl">
          <div className="absolute inset-0">
            <img 
              src={headerBg} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 mix-blend-multiply"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h2 className="text-lg font-medium text-white/80 mb-2">Good Morning, John</h2>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif italic">
                  "I can do all things through Christ who strengthens me."
                </h1>
                <p className="text-white/80 font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Philippians 4:13
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center min-w-[100px] border border-white/10">
                  <Flame className="h-6 w-6 text-orange-300 mb-1" />
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-xs text-white/70 uppercase tracking-wider">Day Streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/bible" data-testid="link-daily-reading">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="font-normal">Today</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">Daily Reading</h3>
                <p className="text-muted-foreground text-sm mb-4">Romans 8:1-12</p>
                <Progress value={33} className="h-1.5 mb-2" />
                <p className="text-xs text-muted-foreground">5 mins left</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/audio" data-testid="link-sunday-sermon">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                    <Play className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="font-normal">Resume</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">Sunday Sermon</h3>
                <p className="text-muted-foreground text-sm mb-4">The Power of Grace</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>12:30 / 45:00</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/groups" data-testid="link-bible-study">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-amber-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="font-normal">Upcoming</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">Bible Study</h3>
                <p className="text-muted-foreground text-sm mb-4">Tonight at 7:00 PM</p>
                <div className="flex -space-x-2 overflow-hidden">
                  <Avatar className="inline-block h-6 w-6 ring-2 ring-background">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <Avatar className="inline-block h-6 w-6 ring-2 ring-background">
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="inline-block h-6 w-6 ring-2 ring-background">
                    <AvatarFallback>+3</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer flex flex-col justify-center items-center text-center p-6">
             <h3 className="font-serif text-2xl italic mb-2">Give</h3>
             <p className="text-primary-foreground/80 text-sm mb-4">Support your local church mission</p>
             <Button variant="secondary" size="sm" className="w-full rounded-full">
               Donate Now
             </Button>
          </Card>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Community Activity</h3>
              <Button variant="ghost" size="sm" className="text-primary">View All</Button>
            </div>

            {[1, 2, 3].map((item) => (
              <Card key={item} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${item}`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">Sarah Miller</h4>
                        <span className="text-xs text-muted-foreground">2h ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Shared a verse from <span className="text-primary font-medium cursor-pointer">Psalms 23</span>
                      </p>
                      <div className="bg-muted/30 p-4 rounded-xl border-l-4 border-primary mb-4">
                        <p className="font-serif italic text-foreground/80">"The Lord is my shepherd; I shall not want. He makes me lie down in green pastures."</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-primary">
                          <Heart className="mr-2 h-4 w-4" /> Like
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-primary">
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            {/* Prayer List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold">Prayer List</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-1 h-8 bg-orange-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mom's Surgery</p>
                    <p className="text-xs text-muted-foreground">Praying for quick recovery</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground/50 hover:text-green-500 cursor-pointer transition-colors" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-1 h-8 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Job Interview</p>
                    <p className="text-xs text-muted-foreground">Guidance and peace</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground/50 hover:text-green-500 cursor-pointer transition-colors" />
                </div>
                <Button variant="outline" className="w-full border-dashed border-2">
                  Add Prayer Request
                </Button>
              </CardContent>
            </Card>

            {/* Recommended */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Recommended For You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="group flex items-center gap-3 cursor-pointer">
                  <div className="h-16 w-24 bg-muted rounded-lg overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop" className="object-cover h-full w-full group-hover:scale-110 transition-transform" alt="Sermon" />
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">Faith in the Storm</p>
                    <p className="text-xs text-muted-foreground">Pastor Mike • 25m</p>
                  </div>
                </div>
                <div className="group flex items-center gap-3 cursor-pointer">
                  <div className="h-16 w-24 bg-muted rounded-lg overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2664&auto=format&fit=crop" className="object-cover h-full w-full group-hover:scale-110 transition-transform" alt="Course" />
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">Intro to Apologetics</p>
                    <p className="text-xs text-muted-foreground">Course • 4 Modules</p>
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

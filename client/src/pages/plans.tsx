import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle2, Flame, ArrowRight } from "lucide-react";

export default function ReadingPlansPage() {
  return (
    <Layout>
       <div className="space-y-8">
         {/* Current Plan */}
         <div className="rounded-3xl bg-primary text-primary-foreground overflow-hidden relative">
           <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/20 to-transparent hidden md:block"></div>
           <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
             <div className="max-w-xl">
               <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none">Current Plan</Badge>
               <h1 className="text-3xl md:text-4xl font-bold mb-4">The Gospels in 90 Days</h1>
               <p className="text-primary-foreground/80 mb-6 text-lg">
                 Journey through the life of Jesus as recorded by Matthew, Mark, Luke, and John.
               </p>
               <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 w-full md:w-64">
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span>Progress</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2 bg-primary-foreground/20" />
                  </div>
                  <div className="flex items-center gap-1 text-orange-300 font-bold">
                    <Flame className="h-5 w-5 fill-current" /> 12 Days
                  </div>
               </div>
               <Button size="lg" variant="secondary" className="rounded-full px-8 font-bold">
                 Continue Reading <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
             </div>
             <div className="hidden md:block">
                <div className="h-48 w-32 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 rotate-3 shadow-2xl flex items-center justify-center">
                  <span className="font-serif text-6xl font-bold opacity-20">90</span>
                </div>
             </div>
           </div>
         </div>

         {/* Browse Plans */}
         <div>
           <h2 className="text-2xl font-bold mb-6">Browse Plans</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {[
               { title: "Proverbs Wisdom", days: "31 Days", category: "Devotional", img: "https://images.unsplash.com/photo-1507692049790-de58293a469d?q=80&w=1000&auto=format&fit=crop" },
               { title: "Bible in a Year", days: "365 Days", category: "Whole Bible", img: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1000&auto=format&fit=crop" },
               { title: "Anxiety & Peace", days: "7 Days", category: "Topical", img: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=1000&auto=format&fit=crop" },
               { title: "Paul's Letters", days: "60 Days", category: "New Testament", img: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1000&auto=format&fit=crop" },
               { title: "Psalms for Sleep", days: "14 Days", category: "Topical", img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop" },
               { title: "Marriage Builder", days: "21 Days", category: "Relationships", img: "https://images.unsplash.com/photo-1516589178581-a709f9788a64?q=80&w=1000&auto=format&fit=crop" },
             ].map((plan, i) => (
               <Card key={i} className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all">
                 <div className="h-40 relative overflow-hidden">
                   <img 
                     src={plan.img} 
                     className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                     alt={plan.title} 
                   />
                   <Badge className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm hover:bg-black/70 border-none text-white">
                     {plan.category}
                   </Badge>
                 </div>
                 <CardContent className="p-4">
                   <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{plan.title}</h3>
                   <p className="text-sm text-muted-foreground mb-4">{plan.days}</p>
                   <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">Start Plan</Button>
                 </CardContent>
               </Card>
             ))}
           </div>
         </div>
       </div>
    </Layout>
  );
}

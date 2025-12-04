import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play, 
  BookOpen, 
  Music, 
  Star, 
  Trophy, 
  Gamepad2,
  ArrowLeft,
  Sun
} from "lucide-react";

export default function KidsPage() {
  return (
    <div className="min-h-screen bg-sky-100 font-sans selection:bg-yellow-200">
      {/* Kids Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b-4 border-sky-200 p-4 flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="ghost" size="lg" className="text-sky-600 hover:bg-sky-50 rounded-full font-bold">
            <ArrowLeft className="mr-2 h-6 w-6" /> Exit Kids Mode
          </Button>
        </Link>
        <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
          <Star className="h-6 w-6 text-yellow-500 fill-current animate-pulse" />
          <span className="font-black text-yellow-600 text-lg">1,250 pts</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-purple-200 border-2 border-purple-400 flex items-center justify-center">
            <span className="text-2xl">🦁</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        {/* Hero Greeting */}
        <div className="text-center mb-12 mt-4">
           <div className="inline-block bg-white p-4 rounded-3xl shadow-xl border-b-8 border-sky-200 rotate-2 mb-6">
             <h1 className="text-4xl md:text-6xl font-black text-sky-500 tracking-tight">
               Hi, Noah! <Sun className="inline h-12 w-12 text-yellow-400 fill-current animate-spin-slow" />
             </h1>
           </div>
           <p className="text-xl text-sky-700 font-bold">Ready for today's adventure with God?</p>
        </div>

        {/* Big Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="group cursor-pointer hover:scale-105 transition-transform border-b-8 border-r-8 border-purple-200 hover:border-purple-300 bg-white rounded-3xl overflow-hidden">
            <div className="h-40 bg-purple-100 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-300 to-transparent"></div>
               <BookOpen className="h-20 w-20 text-purple-500 group-hover:scale-110 transition-transform" />
            </div>
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-black text-purple-600 mb-2">Bible Stories</h2>
              <p className="text-purple-400 font-bold">Read about David & Goliath!</p>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer hover:scale-105 transition-transform border-b-8 border-r-8 border-pink-200 hover:border-pink-300 bg-white rounded-3xl overflow-hidden">
            <div className="h-40 bg-pink-100 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-pink-300 to-transparent"></div>
               <Music className="h-20 w-20 text-pink-500 group-hover:scale-110 transition-transform" />
            </div>
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-black text-pink-600 mb-2">Sing Along</h2>
              <p className="text-pink-400 font-bold">Worship songs for you!</p>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer hover:scale-105 transition-transform border-b-8 border-r-8 border-green-200 hover:border-green-300 bg-white rounded-3xl overflow-hidden">
            <div className="h-40 bg-green-100 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-green-300 to-transparent"></div>
               <Gamepad2 className="h-20 w-20 text-green-500 group-hover:scale-110 transition-transform" />
            </div>
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-black text-green-600 mb-2">Bible Games</h2>
              <p className="text-green-400 font-bold">Quizzes and Puzzles!</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Activity */}
        <div className="bg-orange-100 rounded-3xl p-8 border-4 border-orange-200 relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
             <div className="flex-1 text-center md:text-left">
               <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full font-bold text-sm mb-4">
                 DAILY CHALLENGE
               </div>
               <h2 className="text-3xl font-black text-orange-600 mb-4">Help Your Neighbor</h2>
               <p className="text-lg text-orange-800 font-medium mb-6">
                 Can you do one nice thing for someone today? Maybe share a toy or say something kind!
               </p>
               <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-black text-lg px-8 h-14 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition-all">
                 I Did It! <Trophy className="ml-2 h-6 w-6" />
               </Button>
             </div>
             <div className="flex-shrink-0">
               <div className="h-48 w-48 bg-white rounded-full flex items-center justify-center border-8 border-orange-300 shadow-lg">
                 <span className="text-8xl">🤝</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

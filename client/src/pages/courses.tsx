import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Clock, 
  Award, 
  BookOpen, 
  Users,
  Star
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CoursesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold mb-2">Courses & Learning</h1>
            <p className="text-muted-foreground">Deepen your understanding with structured courses.</p>
          </div>
          <Button variant="outline">My Certificates</Button>
        </div>

        {/* Continue Learning */}
        <Card className="bg-muted/30 border-none">
          <CardContent className="p-6">
            <h2 className="font-bold text-lg mb-4">Continue Learning</h2>
            <div className="flex gap-4 items-center">
              <div className="h-24 w-40 rounded-lg overflow-hidden flex-shrink-0 relative">
                 <img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                   <Play className="h-8 w-8 text-white fill-current" />
                 </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Understanding the Trinity</h3>
                <p className="text-sm text-muted-foreground mb-3">Module 2: The Son • 15 mins left</p>
                <div className="flex items-center gap-4 max-w-md">
                   <Progress value={45} className="h-2" />
                   <span className="text-xs font-bold text-primary">45%</span>
                </div>
              </div>
              <Button>Resume</Button>
            </div>
          </CardContent>
        </Card>

        {/* Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Foundations of Theology", instructor: "Dr. James White", duration: "4 Weeks", students: "1.2k", rating: 4.9, img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop" },
            { title: "Biblical Leadership", instructor: "Pastor John", duration: "6 Weeks", students: "850", rating: 4.8, img: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1000&auto=format&fit=crop" },
            { title: "History of the Church", instructor: "Prof. Miller", duration: "8 Weeks", students: "2.1k", rating: 5.0, img: "https://images.unsplash.com/photo-1548625361-dc87def9f566?q=80&w=1000&auto=format&fit=crop" },
            { title: "Effective Prayer", instructor: "Sarah Cohen", duration: "3 Weeks", students: "3.4k", rating: 4.9, img: "https://images.unsplash.com/photo-1445445290350-16a63cfaf7a7?q=80&w=1000&auto=format&fit=crop" },
            { title: "Apologetics 101", instructor: "Mark Lee", duration: "5 Weeks", students: "900", rating: 4.7, img: "https://images.unsplash.com/photo-1577985051167-0d49eec21977?q=80&w=1000&auto=format&fit=crop" },
            { title: "Marriage Counseling", instructor: "Team Smith", duration: "6 Weeks", students: "500", rating: 4.9, img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop" },
          ].map((course, i) => (
            <Card key={i} className="flex flex-col overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
              <div className="h-48 relative">
                <img src={course.img} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={course.title} />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 text-xs font-bold">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {course.rating}
                </div>
              </div>
              <CardContent className="flex-1 p-6 flex flex-col">
                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">with {course.instructor}</p>
                
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {course.students}
                  </div>
                </div>
                <Button className="w-full mt-4">Enroll Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

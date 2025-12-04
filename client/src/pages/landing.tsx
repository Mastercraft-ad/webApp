import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import heroImage from "@assets/generated_images/peaceful_sunrise_landscape_for_landing_page_hero.png";
import { ArrowRight, CheckCircle2, Book, Heart, Users, Play, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <Layout hideSidebar>
      <div className="flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="font-serif italic text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Abideon</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-white/80 text-sm font-medium">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Sign In</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-white text-primary hover:bg-white/90">Get Started</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt="Peaceful Sunrise" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background"></div>
          </div>

          <div className="container relative z-10 px-4 pt-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-sm font-medium">New: Study Groups are now live</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                Grow in Faith, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 font-serif italic">Together.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-body">
                A comprehensive platform for Bible study, community connection, and spiritual growth. Experience faith in a modern way.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 border border-white/10 shadow-xl shadow-primary/20">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 border-0">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-background relative z-10" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything needed for your spiritual walk</h2>
              <p className="text-muted-foreground text-lg">Designed to be your daily companion for prayer, study, and connection.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Book,
                  title: "Digital Bible Reader",
                  desc: "Distraction-free reading with multiple translations, highlighting, and smart cross-references."
                },
                {
                  icon: Users,
                  title: "Community Groups",
                  desc: "Connect with your church small groups, share prayer requests, and discuss scripture together."
                },
                {
                  icon: Heart,
                  title: "Prayer Management",
                  desc: "Organize your prayer life with lists, reminders, and shared prayer walls for your community."
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by over 500 Churches</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
               {/* Placeholders for logos */}
               <div className="text-2xl font-bold font-serif">GraceChurch</div>
               <div className="text-2xl font-bold font-serif">LifePoint</div>
               <div className="text-2xl font-bold font-serif">TheRock</div>
               <div className="text-2xl font-bold font-serif">Cornerstone</div>
               <div className="text-2xl font-bold font-serif">Hillsong</div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

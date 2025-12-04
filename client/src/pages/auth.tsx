import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import authBg from "@assets/generated_images/modern_abstract_background_for_login_page.png";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Chrome } from "lucide-react";

interface AuthPageProps {
  initialTab?: "login" | "register";
}

export default function AuthPage({ initialTab = "login" }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync tab if initialTab changes or on mount
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={authBg} className="w-full h-full object-cover opacity-50" alt="Background" />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-4">
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4 shadow-xl cursor-pointer hover:scale-105 transition-transform">
              <span className="font-serif italic text-4xl">A</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to Abideon</h1>
          <p className="text-muted-foreground mt-2">Your spiritual companion for daily growth.</p>
        </div>

        <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-md">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Create Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" placeholder="name@example.com" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="p-0 h-auto text-xs font-normal">Forgot password?</Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      className="pl-10 pr-10" 
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-10 w-10 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me for 30 days
                  </Label>
                </div>
                <Button className="w-full" size="lg" onClick={() => setLocation("/dashboard")}>
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Join our community of believers today.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first">First Name</Label>
                    <Input id="first" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last">Last Name</Label>
                    <Input id="last" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" type="email" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-pass">Password</Label>
                  <Input id="reg-pass" type="password" />
                  <p className="text-xs text-muted-foreground">Must be at least 8 characters.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-xs text-muted-foreground">
                    I agree to the <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                  </Label>
                </div>
                <Button className="w-full" size="lg" onClick={() => setLocation("/dashboard")}>
                  Create Account
                </Button>
              </CardContent>
            </TabsContent>

            <CardFooter className="flex flex-col gap-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" className="w-full">
                  <Chrome className="mr-2 h-4 w-4" /> Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg> Facebook
                </Button>
              </div>
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

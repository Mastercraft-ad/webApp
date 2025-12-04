import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import authBg from "@assets/generated_images/modern_abstract_background_for_login_page.png";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Chrome, Apple, Facebook, ArrowLeft, ShieldCheck, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthPageProps {
  initialTab?: "login" | "register";
}

type AuthView = "login" | "register" | "forgot-password" | "mfa" | "reset-sent";

export default function AuthPage({ initialTab = "login" }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useLocation();
  const [view, setView] = useState<AuthView>(initialTab);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Sync tab if initialTab changes or on mount
  useEffect(() => {
    if (initialTab === "login" || initialTab === "register") {
      setView(initialTab);
    }
  }, [initialTab]);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock MFA challenge for demo purposes
      setView("mfa");
    }, 1500);
  };

  const handleMfaVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Authentication Successful",
        description: "Welcome back to Abideon.",
      });
      setLocation("/dashboard");
    }, 1500);
  };

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created",
        description: "Please check your email to verify your account.",
      });
      setView("login");
    }, 1500);
  };

  const handleForgotPassword = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView("reset-sent");
    }, 1500);
  };

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

        <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-md overflow-hidden">
          {view === "login" || view === "register" ? (
            <Tabs value={view} onValueChange={(v) => setView(v as "login" | "register")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/50 p-1 rounded-none border-b border-border/50">
                <TabsTrigger value="login" className="rounded-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">Sign In</TabsTrigger>
                <TabsTrigger value="register" className="rounded-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">Create Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="p-6 pt-2 m-0">
                <div className="space-y-4">
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
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-xs font-normal"
                        onClick={() => setView("forgot-password")}
                      >
                        Forgot password?
                      </Button>
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
                  <Button className="w-full" size="lg" onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"} 
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="register" className="p-6 pt-2 m-0">
                <div className="space-y-4">
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
                      I agree to the <span className="underline cursor-pointer hover:text-primary">Terms of Service</span> and <span className="underline cursor-pointer hover:text-primary">Privacy Policy</span>.
                    </Label>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleRegister} disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </TabsContent>

              <div className="px-6 pb-6 flex flex-col gap-4">
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full">
                  <Button variant="outline" className="w-full">
                    <Chrome className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Apple className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Tabs>
          ) : null}

          {view === "forgot-password" && (
            <div className="p-6">
              <div className="mb-6">
                <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent text-muted-foreground mb-2" onClick={() => setView("login")}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Button>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription className="mt-2">Enter your email address and we'll send you a link to reset your password.</CardDescription>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="reset-email" placeholder="name@example.com" className="pl-10" />
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={handleForgotPassword} disabled={isLoading}>
                  {isLoading ? "Sending Link..." : "Send Reset Link"}
                </Button>
              </div>
            </div>
          )}

          {view === "reset-sent" && (
            <div className="p-6 text-center py-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Mail className="h-8 w-8" />
              </div>
              <CardTitle className="mb-2">Check your email</CardTitle>
              <CardDescription className="mb-6">
                We've sent a password reset link to your email address. Please check your inbox and spam folder.
              </CardDescription>
              <Button variant="outline" className="w-full" onClick={() => setView("login")}>
                Return to Sign In
              </Button>
            </div>
          )}

          {view === "mfa" && (
            <div className="p-6">
              <div className="mb-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription className="mt-2">
                  Enter the 6-digit code sent to your device to verify your identity.
                </CardDescription>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <Separator orientation="vertical" className="h-8 mx-2" />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <Button className="w-full" size="lg" onClick={handleMfaVerify} disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify & Login"}
                </Button>

                <div className="text-center text-sm">
                  <p className="text-muted-foreground">Didn't receive the code?</p>
                  <Button variant="link" className="p-0 h-auto text-xs">Resend Code</Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

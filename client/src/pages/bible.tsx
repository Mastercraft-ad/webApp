import Layout from "@/components/layout";
import { useState } from "react";
import { 
  Search, 
  Settings, 
  Share2, 
  Highlighter, 
  Bookmark, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Volume2,
  BookOpen,
  Library,
  FileText,
  Map,
  History,
  Languages,
  PanelRightClose,
  PanelRightOpen,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BiblePage() {
  const [fontSize, setFontSize] = useState(18);
  const [showTools, setShowTools] = useState(true);

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex gap-4">
        {/* Sidebar - Books & Chapters */}
        <div className="hidden lg:flex w-64 flex-shrink-0 flex-col bg-card border border-border rounded-xl overflow-hidden">
           <div className="p-4 border-b border-border bg-muted/30">
             <div className="relative">
               <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <input 
                 className="w-full h-9 pl-8 rounded-md bg-background border border-input text-sm" 
                 placeholder="Search book..." 
               />
             </div>
           </div>
           <ScrollArea className="flex-1">
             <div className="p-2">
               <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase">Old Testament</div>
               {['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth'].map((book) => (
                 <div key={book} className="px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors">
                   {book}
                 </div>
               ))}
               <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase mt-4">New Testament</div>
               {['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans'].map((book) => (
                 <div key={book} className="px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors">
                   {book}
                 </div>
               ))}
             </div>
           </ScrollArea>
        </div>

        {/* Main Reader */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          {/* Toolbar */}
          <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-background/50 backdrop-blur-sm">
             <div className="flex items-center gap-2">
               <Select defaultValue="NIV">
                 <SelectTrigger className="w-[100px] h-8">
                   <SelectValue placeholder="Version" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="NIV">NIV</SelectItem>
                   <SelectItem value="ESV">ESV</SelectItem>
                   <SelectItem value="KJV">KJV</SelectItem>
                   <SelectItem value="NLT">NLT</SelectItem>
                   <SelectItem value="NASB">NASB</SelectItem>
                   <SelectItem value="MSG">MSG</SelectItem>
                 </SelectContent>
               </Select>
               
               <div className="h-4 w-px bg-border mx-2"></div>
               
               <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground">
                 <ChevronLeft className="h-4 w-4 mr-1" /> Prev
               </Button>
               <span className="text-sm font-bold min-w-[100px] text-center cursor-pointer hover:bg-muted px-2 py-1 rounded">Genesis 1</span>
               <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground">
                 Next <ChevronRight className="h-4 w-4 ml-1" />
               </Button>
             </div>

             <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <Highlighter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <div className="h-4 w-px bg-border mx-2"></div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-8 gap-2 ${showTools ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
                  onClick={() => setShowTools(!showTools)}
                >
                  {showTools ? <PanelRightOpen className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
                  Tools
                </Button>
             </div>
          </div>

          {/* Text Content */}
          <ScrollArea className="flex-1 bg-[#fafafa] dark:bg-[#1a1b1e]">
            <div className="max-w-3xl mx-auto px-8 py-12">
              <h1 className="font-serif text-4xl font-bold text-center mb-8 text-foreground">The Beginning</h1>
              <div className="prose prose-lg dark:prose-invert max-w-none font-serif leading-loose text-foreground/90" style={{ fontSize: `${fontSize}px` }}>
                <p>
                  <span className="text-3xl font-bold text-primary float-left mr-2 mt-[-8px]">1</span>
                  In the beginning God created the heavens and the earth. 
                  <sup className="text-xs text-primary/50 cursor-pointer hover:text-primary ml-1 font-sans">[a]</sup>
                </p>
                <p>
                  <span className="text-xs font-bold text-muted-foreground mr-1 select-none font-sans">2</span>
                  Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.
                </p>
                <p>
                  <span className="text-xs font-bold text-muted-foreground mr-1 select-none font-sans">3</span>
                  And God said, "Let there be light," and there was light.
                </p>
                <p>
                  <span className="text-xs font-bold text-muted-foreground mr-1 select-none font-sans">4</span>
                  God saw that the light was good, and he separated the light from the darkness.
                </p>
                <p>
                  <span className="text-xs font-bold text-muted-foreground mr-1 select-none font-sans">5</span>
                  God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.
                </p>
                <p>
                  <span className="text-xs font-bold text-muted-foreground mr-1 select-none font-sans">6</span>
                  And God said, "Let there be a vault between the waters to separate water from water."
                </p>
                <p>
                  <span className="text-xs font-bold text-muted-foreground mr-1 select-none font-sans">7</span>
                  So God made the vault and separated the water under the vault from the water above it. And it was so.
                </p>
                <p>
                   <span className="bg-yellow-200/50 dark:bg-yellow-900/30 rounded px-1 -mx-1 cursor-pointer border-b-2 border-yellow-400/50">
                   <span className="text-xs font-bold text-muted-foreground mr-1 select-none font-sans">8</span>
                   God called the vault "sky." And there was evening, and there was morning—the second day.
                   </span>
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Tools Panel - Advanced */}
        {showTools && (
          <div className="w-80 flex-shrink-0 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-xl animate-in slide-in-from-right duration-300">
            <Tabs defaultValue="study" className="flex-1 flex flex-col">
               <div className="p-2 border-b border-border">
                 <TabsList className="w-full grid grid-cols-4">
                   <TabsTrigger value="study" title="Study"><Library className="h-4 w-4" /></TabsTrigger>
                   <TabsTrigger value="notes" title="Notes"><FileText className="h-4 w-4" /></TabsTrigger>
                   <TabsTrigger value="original" title="Hebrew/Greek"><Languages className="h-4 w-4" /></TabsTrigger>
                   <TabsTrigger value="maps" title="Maps"><Map className="h-4 w-4" /></TabsTrigger>
                 </TabsList>
               </div>

               <TabsContent value="study" className="flex-1 p-0 m-0">
                 <ScrollArea className="h-full">
                   <div className="p-4 space-y-6">
                     <div>
                       <h3 className="font-bold text-sm mb-2 flex items-center gap-2"><BookOpen className="h-3 w-3" /> Cross References</h3>
                       <div className="space-y-2 text-sm">
                         <div className="p-2 rounded bg-muted/50 hover:bg-muted cursor-pointer">
                           <span className="font-bold text-primary">John 1:1</span>
                           <p className="text-muted-foreground text-xs mt-1">In the beginning was the Word, and the Word was with God...</p>
                         </div>
                         <div className="p-2 rounded bg-muted/50 hover:bg-muted cursor-pointer">
                           <span className="font-bold text-primary">Psalm 33:6</span>
                           <p className="text-muted-foreground text-xs mt-1">By the word of the Lord the heavens were made...</p>
                         </div>
                       </div>
                     </div>

                     <div className="border-t border-border pt-4">
                       <h3 className="font-bold text-sm mb-2">Commentary (Matthew Henry)</h3>
                       <p className="text-sm text-muted-foreground leading-relaxed">
                         The visible world has its beginning from God. It is not eternal, as some philosophers have imagined... The Creator is God, the Father, Son, and Holy Ghost.
                       </p>
                       <Button variant="link" className="h-auto p-0 text-xs mt-2">Read Full Commentary</Button>
                     </div>
                   </div>
                 </ScrollArea>
               </TabsContent>

               <TabsContent value="notes" className="flex-1 p-0 m-0">
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-sm">My Notes</h3>
                      <Button size="sm" variant="outline" className="h-7 text-xs">+ New</Button>
                    </div>
                    <div className="flex-1 space-y-3">
                      <Card className="border-l-4 border-l-primary">
                        <CardContent className="p-3">
                           <p className="text-xs font-bold text-muted-foreground mb-1">Gen 1:1</p>
                           <p className="text-sm">Reminds me that God is outside of time. He created "the beginning."</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
               </TabsContent>

               <TabsContent value="original" className="flex-1 p-0 m-0">
                 <ScrollArea className="h-full">
                   <div className="p-4 space-y-4">
                     <div className="p-3 rounded bg-muted/30">
                       <div className="flex justify-between mb-1">
                         <span className="font-bold text-lg font-serif">בְּרֵאשִׁית</span>
                         <Badge variant="outline">H7225</Badge>
                       </div>
                       <p className="text-sm font-bold">bᵉrēʾšîṯ</p>
                       <p className="text-sm text-muted-foreground italic">in the beginning</p>
                     </div>
                     <div className="p-3 rounded bg-muted/30">
                       <div className="flex justify-between mb-1">
                         <span className="font-bold text-lg font-serif">בָּרָא</span>
                         <Badge variant="outline">H1254</Badge>
                       </div>
                       <p className="text-sm font-bold">bārāʾ</p>
                       <p className="text-sm text-muted-foreground italic">create, shape, form</p>
                     </div>
                   </div>
                 </ScrollArea>
               </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
}

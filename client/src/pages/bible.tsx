import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { 
  Search, Settings, Share2, Highlighter, Bookmark, Maximize2,
  ChevronLeft, ChevronRight, Volume2, BookOpen, Library, FileText,
  Map, History, Languages, PanelRightClose, PanelRightOpen, X,
  MoreHorizontal, Image as ImageIcon, Download, Copy, Facebook, Twitter,
  ExternalLink, Minimize2, Grid, List, Layers, Type, SplitSquareHorizontal,
  BookA, Globe, User, MapPin, Folder, FolderPlus, FileJson, FileType,
  Menu, ChevronDown
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { NotesList } from "@/components/notes/NotesList";

// Mock Data
const BOOKS = {
  OT: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'],
  NT: ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation']
};

const COMMENTARIES = [
  { id: 'mh', name: 'Matthew Henry Complete' },
  { id: 'gill', name: "Gill's Exposition" },
  { id: 'barnes', name: "Barnes' Notes" },
  { id: 'clarke', name: "Clarke's Commentary" },
  { id: 'jfb', name: "Jamieson-Fausset-Brown" },
];

const HIGHLIGHT_COLORS = [
  { id: 'yellow', color: 'bg-yellow-200/50', border: 'border-yellow-400', label: 'General' },
  { id: 'green', color: 'bg-green-200/50', border: 'border-green-400', label: 'Growth' },
  { id: 'blue', color: 'bg-blue-200/50', border: 'border-blue-400', label: 'Holy Spirit' },
  { id: 'red', color: 'bg-red-200/50', border: 'border-red-400', label: 'Salvation' },
  { id: 'purple', color: 'bg-purple-200/50', border: 'border-purple-400', label: 'Royalty' },
  { id: 'orange', color: 'bg-orange-200/50', border: 'border-orange-400', label: 'Warning' },
  { id: 'pink', color: 'bg-pink-200/50', border: 'border-pink-400', label: 'Love' },
  { id: 'gray', color: 'bg-gray-200/50', border: 'border-gray-400', label: 'Sin' },
];

export default function BiblePage() {
  const [fontSize, setFontSize] = useState(18);
  const [showTools, setShowTools] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("study");
  const [selectedCommentary, setSelectedCommentary] = useState("mh");
  const [highlights, setHighlights] = useState<Record<number, string>>({ 8: 'yellow' });
  const [bookmarks, setBookmarks] = useState<Record<number, string[]>>({}); // verseNum -> folderIds
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [interlinearMode, setInterlinearMode] = useState(false);
  const [mobileStudyOpen, setMobileStudyOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState("Genesis");
  const [selectedChapter, setSelectedChapter] = useState("1");
  const [selectedVersion, setSelectedVersion] = useState("NIV");

  const handleVerseClick = (verseNum: number) => {
    setSelectedVerse(verseNum === selectedVerse ? null : verseNum);
    // Auto-open tools when selecting a verse
    if (!showTools && verseNum !== selectedVerse) setShowTools(true);
  };

  const toggleHighlight = (colorId: string) => {
    if (selectedVerse === null) return;
    
    setHighlights(prev => {
      const newHighlights = { ...prev };
      if (newHighlights[selectedVerse] === colorId) {
        delete newHighlights[selectedVerse];
      } else {
        newHighlights[selectedVerse] = colorId;
      }
      return newHighlights;
    });
  };

  const toggleBookmark = (folderId: string = 'default') => {
    if (selectedVerse === null) return;
    setBookmarks(prev => {
      const currentFolders = prev[selectedVerse] || [];
      if (currentFolders.includes(folderId)) {
        const newFolders = currentFolders.filter(id => id !== folderId);
        if (newFolders.length === 0) {
          const { [selectedVerse]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [selectedVerse]: newFolders };
      } else {
        return { ...prev, [selectedVerse]: [...currentFolders, folderId] };
      }
    });
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Main Toolbar - Mobile */}
        <div className="md:hidden h-12 border border-border rounded-t-xl flex items-center justify-between px-2 bg-card/50 backdrop-blur-sm mb-2">
           <Sheet>
             <SheetTrigger asChild>
               <Button variant="ghost" size="sm" className="gap-1 font-bold text-sm px-2" data-testid="button-book-selector-mobile">
                 <BookOpen className="h-4 w-4" />
                 {selectedBook} {selectedChapter}
                 <ChevronDown className="h-3 w-3" />
               </Button>
             </SheetTrigger>
             <SheetContent side="bottom" className="h-[70vh] rounded-t-xl">
               <SheetHeader>
                 <SheetTitle>Select Book & Chapter</SheetTitle>
               </SheetHeader>
               <div className="mt-4">
                 <Tabs defaultValue="ot">
                   <TabsList className="grid w-full grid-cols-2">
                     <TabsTrigger value="ot">Old Testament</TabsTrigger>
                     <TabsTrigger value="nt">New Testament</TabsTrigger>
                   </TabsList>
                   <TabsContent value="ot">
                     <ScrollArea className="h-[40vh]">
                       <div className="grid grid-cols-2 gap-2 p-2">
                         {BOOKS.OT.map(b => (
                           <Button 
                             key={b} 
                             variant={selectedBook === b ? "secondary" : "ghost"} 
                             size="sm" 
                             className="justify-start text-xs"
                             onClick={() => setSelectedBook(b)}
                           >
                             {b}
                           </Button>
                         ))}
                       </div>
                     </ScrollArea>
                   </TabsContent>
                   <TabsContent value="nt">
                     <ScrollArea className="h-[40vh]">
                       <div className="grid grid-cols-2 gap-2 p-2">
                         {BOOKS.NT.map(b => (
                           <Button 
                             key={b} 
                             variant={selectedBook === b ? "secondary" : "ghost"} 
                             size="sm" 
                             className="justify-start text-xs"
                             onClick={() => setSelectedBook(b)}
                           >
                             {b}
                           </Button>
                         ))}
                       </div>
                     </ScrollArea>
                   </TabsContent>
                 </Tabs>
                 <div className="mt-4">
                   <p className="text-sm font-medium mb-2">Chapter</p>
                   <ScrollArea className="h-24">
                     <div className="flex flex-wrap gap-1">
                       {Array.from({length: 50}, (_, i) => i + 1).map(num => (
                         <Button 
                           key={num} 
                           variant={selectedChapter === num.toString() ? "secondary" : "ghost"} 
                           size="sm" 
                           className="w-10 h-8 text-xs"
                           onClick={() => setSelectedChapter(num.toString())}
                         >
                           {num}
                         </Button>
                       ))}
                     </div>
                   </ScrollArea>
                 </div>
               </div>
             </SheetContent>
           </Sheet>

           <div className="flex items-center gap-1">
             <Select value={selectedVersion} onValueChange={setSelectedVersion}>
               <SelectTrigger className="w-16 h-8 text-xs border-none bg-transparent" data-testid="select-version-mobile">
                 <SelectValue />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="NIV">NIV</SelectItem>
                 <SelectItem value="ESV">ESV</SelectItem>
                 <SelectItem value="KJV">KJV</SelectItem>
                 <SelectItem value="NASB">NASB</SelectItem>
               </SelectContent>
             </Select>
             
             <Button 
               variant="ghost" 
               size="icon" 
               className="h-8 w-8"
               onClick={() => setMobileStudyOpen(true)}
               data-testid="button-study-tools-mobile"
             >
               <Library className="h-4 w-4" />
             </Button>
           </div>
        </div>

        {/* Main Toolbar - Desktop */}
        <div className="hidden md:flex h-14 border border-border rounded-t-xl items-center justify-between px-4 bg-card/50 backdrop-blur-sm mb-2">
           <div className="flex items-center gap-2">
             <Select value={selectedBook} onValueChange={setSelectedBook}>
               <SelectTrigger className="w-[140px] h-9 border-none bg-transparent hover:bg-accent/50 focus:ring-0 font-bold" data-testid="select-book-desktop">
                 <SelectValue placeholder="Book" />
               </SelectTrigger>
               <SelectContent>
                 <div className="grid grid-cols-2 gap-2 p-2 w-[400px]">
                   <div>
                     <div className="text-xs font-bold text-muted-foreground mb-2 px-2">OT</div>
                     {BOOKS.OT.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                   </div>
                   <div>
                     <div className="text-xs font-bold text-muted-foreground mb-2 px-2">NT</div>
                     {BOOKS.NT.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                   </div>
                 </div>
               </SelectContent>
             </Select>

             <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                <SelectTrigger className="w-[70px] h-9 border-none bg-transparent hover:bg-accent/50 focus:ring-0 font-bold" data-testid="select-chapter-desktop">
                  <SelectValue placeholder="Ch" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({length: 50}, (_, i) => i + 1).map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
             </Select>

             <div className="h-4 w-px bg-border mx-1"></div>

             <Select value={selectedVersion} onValueChange={setSelectedVersion}>
               <SelectTrigger className="w-[80px] h-9 border-none bg-transparent hover:bg-accent/50 focus:ring-0" data-testid="select-version-desktop">
                 <SelectValue placeholder="Version" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="NIV">NIV</SelectItem>
                 <SelectItem value="ESV">ESV</SelectItem>
                 <SelectItem value="KJV">KJV</SelectItem>
                 <SelectItem value="NASB">NASB</SelectItem>
                 <SelectItem value="CSB">CSB</SelectItem>
               </SelectContent>
             </Select>

             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setInterlinearMode(!interlinearMode)} title="Interlinear Mode" data-testid="button-interlinear">
                <Languages className={cn("h-4 w-4", interlinearMode ? "text-primary" : "text-muted-foreground")} />
             </Button>
           </div>

           <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-1 mr-2">
                 <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                   <Type className="h-4 w-4" />
                 </Button>
                 <Slider 
                   className="w-24" 
                   min={14} 
                   max={32} 
                   step={1} 
                   value={[fontSize]} 
                   onValueChange={(val) => setFontSize(val[0])} 
                   data-testid="slider-font-size"
                 />
              </div>
              
              <Button 
                variant={showTools ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => setShowTools(!showTools)}
                className="gap-2"
                data-testid="button-study-tools-desktop"
              >
                <Library className="h-4 w-4" />
                <span className="hidden sm:inline">Study Tools</span>
              </Button>
           </div>
        </div>

        {/* Workspace - Mobile */}
        <div className="md:hidden flex-1 rounded-xl border border-border overflow-hidden bg-background">
          <div className="h-full flex flex-col bg-card">
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-3xl mx-auto pb-20">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-2">{selectedBook} {selectedChapter}</h1>
                <p className="text-center text-muted-foreground mb-6 font-sans text-xs uppercase tracking-widest">The Beginning</p>
                  
                <div className="prose dark:prose-invert max-w-none font-serif leading-relaxed transition-all" style={{ fontSize: `${Math.max(fontSize - 2, 14)}px` }}>
                  {Array.from({length: 31}, (_, i) => i + 1).map((verseNum) => {
                    const isSelected = selectedVerse === verseNum;
                    const highlightColor = highlights[verseNum];
                    const colorData = HIGHLIGHT_COLORS.find(c => c.id === highlightColor);
                    
                    return (
                      <div 
                        key={verseNum}
                        className={cn(
                          "relative py-2 px-2 -mx-2 rounded transition-colors duration-200 cursor-pointer group",
                          isSelected ? "bg-primary/10 ring-1 ring-primary/20" : "active:bg-accent/50",
                          highlightColor && colorData ? colorData.color : ""
                        )}
                        onClick={() => handleVerseClick(verseNum)}
                        data-testid={`verse-mobile-${verseNum}`}
                      >
                        <span className="text-xs font-bold text-muted-foreground mr-2 select-none font-sans relative top-[-0.3em]">{verseNum}</span>
                        
                        <span>
                          In the beginning God created the heavens and the earth.
                          {verseNum === 2 && " Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters."}
                          {verseNum === 3 && " And God said, \"Let there be light,\" and there was light."}
                          {verseNum > 3 && " Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                        </span>
                        
                        {bookmarks[verseNum] && (
                          <Bookmark className="absolute right-1 top-2 h-3 w-3 text-primary fill-primary opacity-50" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
            
            {/* Mobile Verse Actions */}
            {selectedVerse !== null && (
              <div className="border-t border-border p-2 bg-card/95 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Verse {selectedVerse}</span>
                  <div className="flex items-center gap-1">
                    {HIGHLIGHT_COLORS.slice(0, 4).map(color => (
                      <button 
                        key={color.id}
                        className={cn("w-6 h-6 rounded-full border", color.color, color.border, highlights[selectedVerse] === color.id && "ring-2 ring-offset-1 ring-primary")}
                        onClick={() => toggleHighlight(color.id)}
                        data-testid={`button-highlight-${color.id}-mobile`}
                      />
                    ))}
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleBookmark()} data-testid="button-bookmark-mobile">
                      <Bookmark className={cn("h-4 w-4", bookmarks[selectedVerse] ? "fill-primary text-primary" : "")} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" data-testid="button-share-mobile">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelectedVerse(null)} data-testid="button-close-verse-mobile">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Mobile Bottom Navigation */}
            <div className="h-12 border-t border-border flex items-center justify-between px-3 bg-card/50">
               <Button variant="ghost" size="sm" className="text-muted-foreground text-xs px-2" data-testid="button-prev-chapter-mobile">
                 <ChevronLeft className="h-4 w-4" /> Prev
               </Button>
               <ScrollArea className="flex-1 mx-2">
                 <div className="flex items-center justify-center gap-1">
                   {[1, 2, 3, 4, 5].map(ch => (
                     <div key={ch} className={cn(
                       "px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors whitespace-nowrap",
                       ch === parseInt(selectedChapter) ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                     )}>
                       {ch}
                     </div>
                   ))}
                 </div>
               </ScrollArea>
               <Button variant="ghost" size="sm" className="text-muted-foreground text-xs px-2" data-testid="button-next-chapter-mobile">
                 Next <ChevronRight className="h-4 w-4" />
               </Button>
            </div>
          </div>
        </div>

        {/* Mobile Study Tools Sheet */}
        <Sheet open={mobileStudyOpen} onOpenChange={setMobileStudyOpen}>
          <SheetContent side="right" className="w-full sm:w-[400px] p-0">
            <div className="h-full flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="border-b border-border px-4 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold">Study Tools</h2>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setMobileStudyOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <ScrollArea className="w-full whitespace-nowrap pb-2">
                    <TabsList className="w-max justify-start p-0 h-10 bg-transparent">
                      <TabsTrigger value="study" className="text-xs px-3">Study</TabsTrigger>
                      <TabsTrigger value="reference" className="text-xs px-3">Reference</TabsTrigger>
                      <TabsTrigger value="compare" className="text-xs px-3">Compare</TabsTrigger>
                      <TabsTrigger value="original" className="text-xs px-3">Original</TabsTrigger>
                      <TabsTrigger value="notes" className="text-xs px-3">Notes</TabsTrigger>
                      <TabsTrigger value="maps" className="text-xs px-3">Maps</TabsTrigger>
                    </TabsList>
                  </ScrollArea>
                </div>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="study" className="h-full m-0 overflow-hidden flex flex-col">
                    <div className="p-3 border-b border-border">
                       <Select value={selectedCommentary} onValueChange={setSelectedCommentary}>
                         <SelectTrigger className="w-full text-sm">
                           <SelectValue placeholder="Select Commentary" />
                         </SelectTrigger>
                         <SelectContent>
                           {COMMENTARIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                         </SelectContent>
                       </Select>
                    </div>
                    <ScrollArea className="flex-1">
                      <div className="p-3 space-y-4">
                        <div className="bg-muted/30 rounded-lg p-3 border border-border">
                           <h3 className="font-bold text-sm mb-2">Verse Analysis {selectedVerse ? `(v.${selectedVerse})` : ''}</h3>
                           <p className="text-xs leading-relaxed text-muted-foreground">
                             {selectedVerse === 1 
                               ? "This opening verse of the Bible serves as a formal introduction to the entire Pentateuch." 
                               : "Select a verse to see detailed commentary."}
                           </p>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm mb-2">Cross References</h3>
                          <div className="space-y-2">
                            {['John 1:1', 'Psalm 33:6', 'Isaiah 45:18'].map((ref, i) => (
                              <div key={i} className="p-2 rounded-lg border border-border bg-card text-xs">
                                <span className="font-bold text-primary">{ref}</span>
                                <p className="text-muted-foreground mt-1 line-clamp-2">
                                  In the beginning was the Word...
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="notes" className="h-full m-0 overflow-hidden flex flex-col">
                     <NotesList verseReference={`${selectedBook} ${selectedChapter}`} />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>

        {/* Workspace - Desktop */}
        <ResizablePanelGroup direction="horizontal" className="hidden md:flex flex-1 rounded-xl border border-border overflow-hidden bg-background">
          
          {/* Main Reader Panel */}
          <ResizablePanel defaultSize={70} minSize={30}>
            <div className="h-full flex flex-col bg-card">
              <ScrollArea className="flex-1 p-6 lg:p-12">
                <div className="max-w-3xl mx-auto pb-20">
                  <h1 className="font-serif text-3xl lg:text-4xl font-bold text-center mb-2">{selectedBook} {selectedChapter}</h1>
                  <p className="text-center text-muted-foreground mb-10 font-sans text-sm uppercase tracking-widest">The Beginning</p>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none font-serif leading-loose transition-all" style={{ fontSize: `${fontSize}px` }}>
                    {Array.from({length: 31}, (_, i) => i + 1).map((verseNum) => {
                      const isSelected = selectedVerse === verseNum;
                      const highlightColor = highlights[verseNum];
                      const colorData = HIGHLIGHT_COLORS.find(c => c.id === highlightColor);
                      
                      return (
                        <div 
                          key={verseNum}
                          className={cn(
                            "relative py-1 px-2 -mx-2 rounded transition-colors duration-200 cursor-pointer group",
                            isSelected ? "bg-primary/5" : "hover:bg-accent/30",
                            highlightColor && colorData ? colorData.color : ""
                          )}
                          onClick={() => handleVerseClick(verseNum)}
                        >
                          {isSelected && (
                            <div className="absolute -top-10 left-0 z-10 flex items-center gap-1 p-1 rounded-lg bg-popover shadow-lg border border-border animate-in fade-in zoom-in-95 duration-200">
                               {HIGHLIGHT_COLORS.slice(0, 4).map(color => (
                                 <button 
                                   key={color.id}
                                   className={cn("w-5 h-5 rounded-full border", color.color, color.border)}
                                   onClick={(e) => { e.stopPropagation(); toggleHighlight(color.id); }}
                                 />
                               ))}
                               <div className="w-px h-4 bg-border mx-1" />
                               
                               <Popover>
                                 <PopoverTrigger asChild>
                                   <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                                     <Bookmark className={cn("h-3 w-3", bookmarks[verseNum] ? "fill-primary text-primary" : "")} />
                                   </Button>
                                 </PopoverTrigger>
                                 <PopoverContent className="w-48 p-2" onClick={(e) => e.stopPropagation()}>
                                   <p className="text-xs font-bold mb-2 px-2">Save to Folder</p>
                                   <div className="space-y-1">
                                     <Button variant="ghost" size="sm" className="w-full justify-start h-7 text-xs" onClick={() => toggleBookmark('favorites')}>
                                       <Folder className="h-3 w-3 mr-2 text-yellow-500" /> Favorites
                                     </Button>
                                     <Button variant="ghost" size="sm" className="w-full justify-start h-7 text-xs" onClick={() => toggleBookmark('study')}>
                                       <Folder className="h-3 w-3 mr-2 text-blue-500" /> Bible Study
                                     </Button>
                                     <Button variant="ghost" size="sm" className="w-full justify-start h-7 text-xs" onClick={() => toggleBookmark('sermon')}>
                                       <Folder className="h-3 w-3 mr-2 text-green-500" /> Sermon Prep
                                     </Button>
                                     <Separator className="my-1" />
                                     <Button variant="ghost" size="sm" className="w-full justify-start h-7 text-xs">
                                       <FolderPlus className="h-3 w-3 mr-2" /> New Folder
                                     </Button>
                                   </div>
                                 </PopoverContent>
                               </Popover>

                               <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); setShowImageGenerator(true); }}>
                                 <ImageIcon className="h-3 w-3" />
                               </Button>
                               <Button variant="ghost" size="icon" className="h-6 w-6">
                                 <Share2 className="h-3 w-3" />
                               </Button>
                            </div>
                          )}
                          
                          <span className="text-xs font-bold text-muted-foreground mr-2 select-none font-sans relative top-[-0.5em]">{verseNum}</span>
                          
                          {interlinearMode ? (
                            <span className="leading-relaxed">
                               {/* Mock Interlinear Data */}
                               In the beginning <span className="text-muted-foreground text-sm block mb-1">reshith</span>
                               God <span className="text-muted-foreground text-sm block mb-1">elohim</span>
                               created <span className="text-muted-foreground text-sm block mb-1">bara</span>
                               the heavens <span className="text-muted-foreground text-sm block mb-1">shamayim</span>
                               and the earth. <span className="text-muted-foreground text-sm block mb-1">erets</span>
                            </span>
                          ) : (
                             <span>
                               In the beginning God created the heavens and the earth.
                               {verseNum === 2 && " Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters."}
                               {verseNum === 3 && " And God said, \"Let there be light,\" and there was light."}
                               {verseNum > 3 && " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                             </span>
                          )}
                          
                          {bookmarks[verseNum] && (
                            <Bookmark className="absolute right-0 top-2 h-3 w-3 text-primary fill-primary opacity-50" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollArea>
              
              {/* Bottom Navigation */}
              <div className="h-12 border-t border-border flex items-center justify-between px-6 bg-card/50">
                 <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                   <ChevronLeft className="h-4 w-4 mr-2" /> Previous Chapter
                 </Button>
                 <div className="flex items-center gap-2">
                   {['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4', 'Gen 5'].map(ch => (
                     <div key={ch} className={cn(
                       "px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors",
                       ch === 'Gen 1' ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                     )}>
                       {ch}
                     </div>
                   ))}
                 </div>
                 <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                   Next Chapter <ChevronRight className="h-4 w-4 ml-2" />
                 </Button>
              </div>
            </div>
          </ResizablePanel>

          {showTools && (
            <>
              <ResizableHandle />
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                <div className="h-full flex flex-col bg-card">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <div className="border-b border-border">
                      <ScrollArea className="w-full whitespace-nowrap">
                        <TabsList className="w-full justify-start p-0 h-12 bg-transparent">
                          <TabsTrigger value="study" className="h-full px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-accent/50">
                            <BookOpen className="h-4 w-4 mr-2" /> Study
                          </TabsTrigger>
                          <TabsTrigger value="reference" className="h-full px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-accent/50">
                            <BookA className="h-4 w-4 mr-2" /> Reference
                          </TabsTrigger>
                          <TabsTrigger value="compare" className="h-full px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-accent/50">
                            <SplitSquareHorizontal className="h-4 w-4 mr-2" /> Compare
                          </TabsTrigger>
                          <TabsTrigger value="original" className="h-full px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-accent/50">
                            <Languages className="h-4 w-4 mr-2" /> Original
                          </TabsTrigger>
                          <TabsTrigger value="notes" className="h-full px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-accent/50">
                            <FileText className="h-4 w-4 mr-2" /> Notes
                          </TabsTrigger>
                          <TabsTrigger value="maps" className="h-full px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-accent/50">
                            <Map className="h-4 w-4 mr-2" /> Maps
                          </TabsTrigger>
                        </TabsList>
                      </ScrollArea>
                    </div>

                    <div className="flex-1 overflow-hidden relative">
                      {/* Study Tab */}
                      <TabsContent value="study" className="h-full m-0 overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-border bg-muted/10">
                           <Select value={selectedCommentary} onValueChange={setSelectedCommentary}>
                             <SelectTrigger className="w-full">
                               <SelectValue placeholder="Select Commentary" />
                             </SelectTrigger>
                             <SelectContent>
                               {COMMENTARIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                             </SelectContent>
                           </Select>
                        </div>
                        <ScrollArea className="flex-1">
                          <div className="p-4 space-y-6">
                            <div className="bg-muted/30 rounded-lg p-4 border border-border">
                               <div className="flex items-center justify-between mb-2">
                                 <h3 className="font-bold text-sm flex items-center gap-2">
                                   <span className="w-1 h-4 bg-primary rounded-full"></span>
                                   Verse Analysis {selectedVerse ? `(v.${selectedVerse})` : '(General)'}
                                 </h3>
                               </div>
                               <p className="text-sm leading-relaxed text-muted-foreground">
                                 {selectedVerse === 1 
                                   ? "This opening verse of the Bible serves as a formal introduction to the entire Pentateuch. It affirms God as the absolute Originator of all that exists." 
                                   : "Select a verse to see detailed commentary and analysis specific to that passage."}
                               </p>
                            </div>

                            <div>
                              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                                <Library className="h-4 w-4 text-primary" /> 
                                Cross References
                              </h3>
                              <div className="space-y-2">
                                {['John 1:1', 'Psalm 33:6', 'Isaiah 45:18', 'Colossians 1:16', 'Hebrews 11:3'].map((ref, i) => (
                                  <div key={i} className="p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-bold text-sm text-primary group-hover:underline">{ref}</span>
                                      <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                      In the beginning was the Word, and the Word was with God, and the Word was God...
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </TabsContent>

                      {/* Reference Tab (Dictionary, Topical, etc) */}
                      <TabsContent value="reference" className="h-full m-0 overflow-hidden flex flex-col">
                        <Tabs defaultValue="dictionary" className="flex-1 flex flex-col">
                           <div className="px-4 pt-2">
                              <TabsList className="w-full grid grid-cols-3">
                                <TabsTrigger value="dictionary">Dictionary</TabsTrigger>
                                <TabsTrigger value="topical">Topical</TabsTrigger>
                                <TabsTrigger value="people">People</TabsTrigger>
                              </TabsList>
                           </div>
                           
                           <TabsContent value="dictionary" className="flex-1 p-0 m-0 mt-2">
                             <ScrollArea className="h-full">
                               <div className="p-4 space-y-4">
                                 <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search Dictionary..." className="pl-8" />
                                 </div>
                                 <div className="space-y-4">
                                   <div>
                                      <h4 className="font-bold text-primary">Creation</h4>
                                      <p className="text-sm text-muted-foreground mt-1">The act of God in bringing the universe into existence. The Bible opens with the majestic statement: "In the beginning God created..."</p>
                                   </div>
                                   <Separator />
                                   <div>
                                      <h4 className="font-bold text-primary">Cosmology</h4>
                                      <p className="text-sm text-muted-foreground mt-1">The study of the origin, evolution, and structure of the universe.</p>
                                   </div>
                                 </div>
                               </div>
                             </ScrollArea>
                           </TabsContent>

                           <TabsContent value="topical" className="flex-1 p-0 m-0 mt-2">
                             <ScrollArea className="h-full">
                               <div className="p-4 space-y-4">
                                  <div className="flex flex-wrap gap-2">
                                     {['God', 'Creation', 'Light', 'Water', 'Time', 'Life', 'Nature'].map(topic => (
                                       <Badge key={topic} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">{topic}</Badge>
                                     ))}
                                  </div>
                                  <div className="bg-muted/30 rounded-lg p-4">
                                     <h4 className="font-bold mb-2">God (Creator)</h4>
                                     <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex justify-between border-b border-border pb-1"><span>Genesis 1:1</span> <ArrowRightIcon className="h-3 w-3" /></li>
                                        <li className="flex justify-between border-b border-border pb-1"><span>Isaiah 40:28</span> <ArrowRightIcon className="h-3 w-3" /></li>
                                        <li className="flex justify-between border-b border-border pb-1"><span>Revelation 4:11</span> <ArrowRightIcon className="h-3 w-3" /></li>
                                     </ul>
                                  </div>
                               </div>
                             </ScrollArea>
                           </TabsContent>
                           
                           <TabsContent value="people" className="flex-1 p-0 m-0 mt-2">
                              <ScrollArea className="h-full">
                                 <div className="p-4 space-y-4">
                                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/10 cursor-pointer">
                                       <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                          <User className="h-5 w-5" />
                                       </div>
                                       <div>
                                          <p className="font-bold text-sm">Adam</p>
                                          <p className="text-xs text-muted-foreground">The first man.</p>
                                       </div>
                                    </div>
                                 </div>
                              </ScrollArea>
                           </TabsContent>
                        </Tabs>
                      </TabsContent>

                      {/* Compare Tab */}
                      <TabsContent value="compare" className="h-full m-0 overflow-hidden flex flex-col">
                        <ScrollArea className="flex-1">
                           <div className="p-4 space-y-6">
                              {selectedVerse ? (
                                <div className="space-y-4">
                                   <h3 className="font-bold text-center pb-2 border-b border-border">Genesis 1:{selectedVerse}</h3>
                                   
                                   <div className="space-y-1">
                                      <Badge variant="outline">NIV</Badge>
                                      <p className="text-sm leading-relaxed">In the beginning God created the heavens and the earth.</p>
                                   </div>
                                   
                                   <div className="space-y-1">
                                      <Badge variant="outline">ESV</Badge>
                                      <p className="text-sm leading-relaxed">In the beginning, God created the heavens and the earth.</p>
                                   </div>
                                   
                                   <div className="space-y-1">
                                      <Badge variant="outline">KJV</Badge>
                                      <p className="text-sm leading-relaxed font-serif">In the beginning God created the heaven and the earth.</p>
                                   </div>
                                   
                                   <div className="space-y-1">
                                      <Badge variant="outline">NASB</Badge>
                                      <p className="text-sm leading-relaxed">In the beginning God created the heavens and the earth.</p>
                                   </div>
                                   
                                   <div className="space-y-1">
                                      <Badge variant="outline">MSG</Badge>
                                      <p className="text-sm leading-relaxed italic">First this: God created the Heavens and Earth—all you see, all you don't see.</p>
                                   </div>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground text-center p-6">
                                   <SplitSquareHorizontal className="h-10 w-10 mb-4 opacity-20" />
                                   <p>Select a verse to compare translations side-by-side.</p>
                                </div>
                              )}
                           </div>
                        </ScrollArea>
                      </TabsContent>

                      {/* Original Language Tab */}
                      <TabsContent value="original" className="h-full m-0 overflow-hidden flex flex-col">
                         <div className="p-4 border-b border-border bg-muted/10 flex justify-between items-center">
                            <span className="text-sm font-medium">Hebrew / Strong's</span>
                            <Badge variant="outline" className="text-xs">BHS Text</Badge>
                         </div>
                         <ScrollArea className="flex-1">
                            <div className="p-4 space-y-4">
                               <div className="flex gap-3 items-start p-3 rounded-lg bg-accent/20 border border-border">
                                  <div className="text-right min-w-[80px]">
                                     <div className="text-2xl font-serif font-bold mb-1">בְּרֵאשִׁית</div>
                                     <div className="text-xs text-muted-foreground">bᵉrēʾšîṯ</div>
                                  </div>
                                  <div className="flex-1">
                                     <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-sm">In the beginning</span>
                                        <Badge variant="secondary" className="h-5 text-[10px]">H7225</Badge>
                                     </div>
                                     <p className="text-xs text-muted-foreground mb-2">From the same as H7218; the first, in place, time, order or rank.</p>
                                     <div className="flex gap-1 flex-wrap">
                                        <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium">Noun</span>
                                        <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium">Feminine</span>
                                     </div>
                                  </div>
                               </div>

                               <div className="flex gap-3 items-start p-3 rounded-lg bg-card border border-border hover:bg-accent/10 cursor-pointer">
                                  <div className="text-right min-w-[80px]">
                                     <div className="text-2xl font-serif font-bold mb-1">בָּרָא</div>
                                     <div className="text-xs text-muted-foreground">bārāʾ</div>
                                  </div>
                                  <div className="flex-1">
                                     <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-sm">Created</span>
                                        <Badge variant="secondary" className="h-5 text-[10px]">H1254</Badge>
                                     </div>
                                     <p className="text-xs text-muted-foreground">A primitive root; (absolutely) to create; (qualified) to cut down (a wood), select, feed (as formative processes).</p>
                                  </div>
                               </div>
                            </div>
                         </ScrollArea>
                      </TabsContent>

                      {/* Notes Tab */}
                      <TabsContent value="notes" className="h-full m-0 overflow-hidden flex flex-col">
                         <NotesList verseReference="Genesis 1" />
                      </TabsContent>

                      {/* Maps Tab */}
                      <TabsContent value="maps" className="h-full m-0 overflow-hidden flex flex-col">
                         <ScrollArea className="flex-1">
                            <div className="p-4 space-y-4">
                               <div className="aspect-video w-full bg-muted rounded-lg relative overflow-hidden group cursor-pointer border border-border">
                                  <img 
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                     <div>
                                        <h4 className="text-white font-bold text-sm">Ancient Near East</h4>
                                        <p className="text-white/80 text-xs">The World of the Patriarchs</p>
                                     </div>
                                  </div>
                               </div>

                               <div className="aspect-video w-full bg-muted rounded-lg relative overflow-hidden group cursor-pointer border border-border">
                                  <img 
                                    src="https://images.unsplash.com/photo-1501236570302-9061b2a7094b?auto=format&fit=crop&q=80&w=800" 
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                     <div>
                                        <h4 className="text-white font-bold text-sm">Garden of Eden</h4>
                                        <p className="text-white/80 text-xs">Possible Locations & Rivers</p>
                                     </div>
                                  </div>
                               </div>
                               
                               <div className="p-4 rounded-lg border border-border bg-accent/10">
                                  <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                     <History className="h-4 w-4" /> Historical Timeline
                                  </h4>
                                  <div className="relative pl-4 border-l-2 border-primary/20 space-y-4 py-2">
                                     <div className="relative">
                                        <div className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full bg-primary border-2 border-background"></div>
                                        <p className="text-xs font-bold">Creation</p>
                                        <p className="text-[10px] text-muted-foreground">Unknown Date</p>
                                     </div>
                                     <div className="relative">
                                        <div className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full bg-muted-foreground border-2 border-background"></div>
                                        <p className="text-xs font-bold">The Fall</p>
                                     </div>
                                     <div className="relative">
                                        <div className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full bg-muted-foreground border-2 border-background"></div>
                                        <p className="text-xs font-bold">Noah & The Flood</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </ScrollArea>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>

      {/* Verse Image Generator Modal */}
      <Dialog open={showImageGenerator} onOpenChange={setShowImageGenerator}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Verse Image</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
             <div className="aspect-square bg-gradient-to-br from-blue-900 to-slate-900 rounded-lg flex items-center justify-center p-6 text-center relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800')] opacity-30 bg-cover bg-center mix-blend-overlay"></div>
                <div className="relative z-10 text-white">
                   <p className="font-serif text-xl md:text-2xl font-bold leading-relaxed mb-4">
                     "In the beginning God created the heavens and the earth."
                   </p>
                   <p className="text-sm opacity-80 font-sans tracking-widest uppercase">Genesis 1:1</p>
                </div>
             </div>
             
             <div className="space-y-4">
                <div className="space-y-2">
                   <Label>Theme</Label>
                   <div className="grid grid-cols-4 gap-2">
                      {['bg-slate-900', 'bg-amber-900', 'bg-emerald-900', 'bg-rose-900'].map((bg, i) => (
                        <div key={i} className={cn("h-10 rounded cursor-pointer ring-2 ring-offset-1 ring-transparent hover:ring-primary", bg)}></div>
                      ))}
                   </div>
                </div>
                <div className="space-y-2">
                   <Label>Font Style</Label>
                   <Select defaultValue="serif">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="serif">Serif (Classic)</SelectItem>
                        <SelectItem value="sans">Sans (Modern)</SelectItem>
                        <SelectItem value="hand">Handwritten</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
                <div className="flex items-center gap-2 pt-4">
                   <Button className="flex-1 gap-2">
                     <Download className="h-4 w-4" /> Download
                   </Button>
                   <Button variant="outline" size="icon">
                     <Share2 className="h-4 w-4" />
                   </Button>
                </div>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

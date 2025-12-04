import Layout from "@/components/layout";
import { useState } from "react";
import { 
  Search, Settings, Share2, Highlighter, Bookmark, Maximize2,
  ChevronLeft, ChevronRight, Volume2, BookOpen, Library, FileText,
  Map, History, Languages, PanelRightClose, PanelRightOpen, X,
  MoreHorizontal, Image as ImageIcon, Download, Copy, Facebook, Twitter,
  ExternalLink, Minimize2, Grid, List, Layers, Type, SplitSquareHorizontal,
  BookA, Globe, User, MapPin, Folder, FolderPlus, FileJson, FileType,
  Menu, ChevronDown, ChevronUp
} from "lucide-react";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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

// Helper component for arrows
function ArrowRightIcon({ className }: { className?: string }) {
  return <ChevronRight className={className} />;
}

export default function BiblePage() {
  const [fontSize, setFontSize] = useState(18);
  const [showTools, setShowTools] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("study");
  const [selectedCommentary, setSelectedCommentary] = useState("mh");
  const [highlights, setHighlights] = useState<Record<number, string>>({ 8: 'yellow' });
  const [bookmarks, setBookmarks] = useState<Record<number, string[]>>({});
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [interlinearMode, setInterlinearMode] = useState(false);
  const [selectedBook, setSelectedBook] = useState("Genesis");
  const [selectedChapter, setSelectedChapter] = useState("1");
  const [selectedVersion, setSelectedVersion] = useState("NIV");
  
  // Mobile-specific state for inline collapsibles
  const [bookPickerOpen, setBookPickerOpen] = useState(false);
  const [mobileStudyOpen, setMobileStudyOpen] = useState(false);
  const [bookTab, setBookTab] = useState<"ot" | "nt">("ot");

  const handleVerseClick = (verseNum: number) => {
    setSelectedVerse(verseNum === selectedVerse ? null : verseNum);
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

  // Verse content component to avoid duplication
  const VerseContent = ({ verseNum, isMobile = false }: { verseNum: number; isMobile?: boolean }) => {
    const isSelected = selectedVerse === verseNum;
    const highlightColor = highlights[verseNum];
    const colorData = HIGHLIGHT_COLORS.find(c => c.id === highlightColor);
    
    return (
      <div 
        className={cn(
          "relative py-2 px-2 -mx-2 rounded transition-colors duration-200 cursor-pointer group",
          isSelected ? "bg-primary/10 ring-1 ring-primary/20" : isMobile ? "active:bg-accent/50" : "hover:bg-accent/30",
          highlightColor && colorData ? colorData.color : ""
        )}
        onClick={() => handleVerseClick(verseNum)}
        data-testid={`verse-${isMobile ? 'mobile' : 'desktop'}-${verseNum}`}
      >
        {!isMobile && isSelected && (
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
        
        <span className="text-xs font-bold text-muted-foreground mr-2 select-none font-sans relative top-[-0.3em]">{verseNum}</span>
        
        {interlinearMode ? (
          <span className="leading-relaxed">
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
            {verseNum > 3 && " Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </span>
        )}
        
        {bookmarks[verseNum] && (
          <Bookmark className="absolute right-1 top-2 h-3 w-3 text-primary fill-primary opacity-50" />
        )}
      </div>
    );
  };

  // Study Tools Content - shared between mobile and desktop
  const StudyToolsContent = ({ compact = false }: { compact?: boolean }) => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
      <div className="border-b border-border">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className={cn("w-full justify-start p-0 bg-transparent", compact ? "h-10" : "h-12")}>
            <TabsTrigger value="study" className={cn("px-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-accent/50", compact ? "h-10 text-xs" : "h-12")}>
              <BookOpen className={cn("mr-1.5", compact ? "h-3.5 w-3.5" : "h-4 w-4")} /> Study
            </TabsTrigger>
            <TabsTrigger value="reference" className={cn("px-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-accent/50", compact ? "h-10 text-xs" : "h-12")}>
              <BookA className={cn("mr-1.5", compact ? "h-3.5 w-3.5" : "h-4 w-4")} /> Ref
            </TabsTrigger>
            <TabsTrigger value="compare" className={cn("px-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-accent/50", compact ? "h-10 text-xs" : "h-12")}>
              <SplitSquareHorizontal className={cn("mr-1.5", compact ? "h-3.5 w-3.5" : "h-4 w-4")} /> Compare
            </TabsTrigger>
            <TabsTrigger value="notes" className={cn("px-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-accent/50", compact ? "h-10 text-xs" : "h-12")}>
              <FileText className={cn("mr-1.5", compact ? "h-3.5 w-3.5" : "h-4 w-4")} /> Notes
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <TabsContent value="study" className="h-full m-0 overflow-hidden flex flex-col">
          <div className={cn("border-b border-border bg-muted/10", compact ? "p-2" : "p-4")}>
            <Select value={selectedCommentary} onValueChange={setSelectedCommentary}>
              <SelectTrigger className={cn("w-full", compact && "text-sm")}>
                <SelectValue placeholder="Select Commentary" />
              </SelectTrigger>
              <SelectContent>
                {COMMENTARIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="flex-1">
            <div className={cn("space-y-4", compact ? "p-3" : "p-4")}>
              <div className="bg-muted/30 rounded-lg p-3 border border-border">
                <h3 className={cn("font-bold mb-2 flex items-center gap-2", compact ? "text-xs" : "text-sm")}>
                  <span className="w-1 h-4 bg-primary rounded-full"></span>
                  Verse Analysis {selectedVerse ? `(v.${selectedVerse})` : ''}
                </h3>
                <p className={cn("leading-relaxed text-muted-foreground", compact ? "text-xs" : "text-sm")}>
                  {selectedVerse === 1 
                    ? "This opening verse of the Bible serves as a formal introduction to the entire Pentateuch." 
                    : "Select a verse to see detailed commentary."}
                </p>
              </div>

              <div>
                <h3 className={cn("font-bold mb-2 flex items-center gap-2", compact ? "text-xs" : "text-sm")}>
                  <Library className={cn("text-primary", compact ? "h-3.5 w-3.5" : "h-4 w-4")} /> 
                  Cross References
                </h3>
                <div className="space-y-2">
                  {['John 1:1', 'Psalm 33:6', 'Isaiah 45:18'].map((ref, i) => (
                    <div key={i} className="p-2 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                      <span className={cn("font-bold text-primary", compact ? "text-xs" : "text-sm")}>{ref}</span>
                      <p className={cn("text-muted-foreground mt-1 line-clamp-2", compact ? "text-xs" : "text-xs")}>
                        In the beginning was the Word...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="reference" className="h-full m-0 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1">
            <div className={cn("space-y-4", compact ? "p-3" : "p-4")}>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search Dictionary..." className="pl-8" />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-primary text-sm">Creation</h4>
                  <p className="text-sm text-muted-foreground mt-1">The act of God in bringing the universe into existence.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-bold text-primary text-sm">Cosmology</h4>
                  <p className="text-sm text-muted-foreground mt-1">The study of the origin and structure of the universe.</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="compare" className="h-full m-0 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1">
            <div className={cn("space-y-4", compact ? "p-3" : "p-4")}>
              {selectedVerse ? (
                <div className="space-y-3">
                  <h3 className="font-bold text-center pb-2 border-b border-border text-sm">{selectedBook} {selectedChapter}:{selectedVerse}</h3>
                  {[
                    { ver: 'NIV', text: 'In the beginning God created the heavens and the earth.' },
                    { ver: 'ESV', text: 'In the beginning, God created the heavens and the earth.' },
                    { ver: 'KJV', text: 'In the beginning God created the heaven and the earth.' },
                  ].map(({ ver, text }) => (
                    <div key={ver} className="space-y-1">
                      <Badge variant="outline" className="text-xs">{ver}</Badge>
                      <p className="text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-center p-4">
                  <SplitSquareHorizontal className="h-8 w-8 mb-3 opacity-20" />
                  <p className="text-sm">Select a verse to compare translations.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="notes" className="h-full m-0 overflow-hidden flex flex-col">
          <NotesList verseReference={`${selectedBook} ${selectedChapter}`} />
        </TabsContent>
      </div>
    </Tabs>
  );

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        
        {/* ===== MOBILE LAYOUT ===== */}
        <div className="md:hidden flex flex-col flex-1">
          
          {/* Mobile Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-card/50">
            <div className="flex items-center gap-2">
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
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setInterlinearMode(!interlinearMode)}
                data-testid="button-interlinear-mobile"
              >
                <Languages className={cn("h-4 w-4", interlinearMode ? "text-primary" : "text-muted-foreground")} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                data-testid="button-settings-mobile"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Book/Chapter Picker - Inline Collapsible */}
          <Collapsible open={bookPickerOpen} onOpenChange={setBookPickerOpen}>
            <CollapsibleTrigger asChild>
              <button 
                className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border hover:bg-muted/50 transition-colors"
                data-testid="button-book-picker-mobile"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-bold">{selectedBook} {selectedChapter}</span>
                </div>
                {bookPickerOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-b border-border bg-card">
              <div className="p-3">
                {/* Testament Tabs */}
                <div className="flex gap-2 mb-3">
                  <Button 
                    variant={bookTab === "ot" ? "secondary" : "ghost"} 
                    size="sm" 
                    className="flex-1 text-xs"
                    onClick={() => setBookTab("ot")}
                  >
                    Old Testament
                  </Button>
                  <Button 
                    variant={bookTab === "nt" ? "secondary" : "ghost"} 
                    size="sm" 
                    className="flex-1 text-xs"
                    onClick={() => setBookTab("nt")}
                  >
                    New Testament
                  </Button>
                </div>
                
                {/* Books Grid */}
                <ScrollArea className="h-32">
                  <div className="grid grid-cols-3 gap-1">
                    {(bookTab === "ot" ? BOOKS.OT : BOOKS.NT).map(b => (
                      <Button 
                        key={b} 
                        variant={selectedBook === b ? "secondary" : "ghost"} 
                        size="sm" 
                        className="justify-start text-xs h-7 px-2"
                        onClick={() => {
                          setSelectedBook(b);
                        }}
                      >
                        {b.length > 10 ? b.slice(0, 10) + '...' : b}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Chapter Selection */}
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Chapter</p>
                  <ScrollArea className="h-16">
                    <div className="flex flex-wrap gap-1">
                      {Array.from({length: 50}, (_, i) => i + 1).map(num => (
                        <Button 
                          key={num} 
                          variant={selectedChapter === num.toString() ? "secondary" : "ghost"} 
                          size="sm" 
                          className="w-9 h-7 text-xs p-0"
                          onClick={() => {
                            setSelectedChapter(num.toString());
                            setBookPickerOpen(false);
                          }}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Mobile Bible Content */}
          <ScrollArea className="flex-1">
            <div className="p-4 pb-32">
              <h1 className="font-serif text-2xl font-bold text-center mb-1">{selectedBook} {selectedChapter}</h1>
              <p className="text-center text-muted-foreground mb-6 font-sans text-xs uppercase tracking-widest">The Beginning</p>
              
              <div className="prose dark:prose-invert max-w-none font-serif leading-relaxed" style={{ fontSize: `${Math.max(fontSize - 2, 14)}px` }}>
                {Array.from({length: 31}, (_, i) => i + 1).map((verseNum) => (
                  <VerseContent key={verseNum} verseNum={verseNum} isMobile={true} />
                ))}
              </div>
            </div>
          </ScrollArea>

          {/* Mobile Verse Actions - Sticky at Bottom */}
          {selectedVerse !== null && (
            <div className="sticky bottom-0 left-0 right-0 border-t border-border p-2 bg-card/95 backdrop-blur-sm z-20">
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

          {/* Mobile Chapter Navigation */}
          <div className="sticky bottom-0 left-0 right-0 h-12 border-t border-border flex items-center justify-between px-3 bg-card z-10">
            <Button variant="ghost" size="sm" className="text-muted-foreground text-xs px-2" data-testid="button-prev-chapter-mobile">
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <div className="flex items-center gap-1 overflow-x-auto">
              {[1, 2, 3, 4, 5].map(ch => (
                <button 
                  key={ch} 
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap min-w-[28px]",
                    ch === parseInt(selectedChapter) ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  )}
                  onClick={() => setSelectedChapter(ch.toString())}
                >
                  {ch}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground text-xs px-2" data-testid="button-next-chapter-mobile">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Study Tools - Inline Collapsible Section */}
          <Collapsible open={mobileStudyOpen} onOpenChange={setMobileStudyOpen}>
            <CollapsibleTrigger asChild>
              <button 
                className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 border-t border-border hover:bg-muted/70 transition-colors"
                data-testid="button-study-tools-mobile"
              >
                <div className="flex items-center gap-2">
                  <Library className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Study Tools</span>
                </div>
                {mobileStudyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t border-border bg-card">
              <div className="h-[50vh]">
                <StudyToolsContent compact={true} />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:flex flex-col flex-1">
          {/* Desktop Toolbar */}
          <div className="h-14 border border-border rounded-t-xl flex items-center justify-between px-4 bg-card/50 backdrop-blur-sm mb-2">
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

          {/* Desktop Workspace */}
          <ResizablePanelGroup direction="horizontal" className="flex-1 rounded-xl border border-border overflow-hidden bg-background">
            {/* Main Reader Panel */}
            <ResizablePanel defaultSize={70} minSize={30}>
              <div className="h-full flex flex-col bg-card">
                <ScrollArea className="flex-1 p-6 lg:p-12">
                  <div className="max-w-3xl mx-auto pb-20">
                    <h1 className="font-serif text-3xl lg:text-4xl font-bold text-center mb-2">{selectedBook} {selectedChapter}</h1>
                    <p className="text-center text-muted-foreground mb-10 font-sans text-sm uppercase tracking-widest">The Beginning</p>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none font-serif leading-loose transition-all" style={{ fontSize: `${fontSize}px` }}>
                      {Array.from({length: 31}, (_, i) => i + 1).map((verseNum) => (
                        <VerseContent key={verseNum} verseNum={verseNum} isMobile={false} />
                      ))}
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
                    <StudyToolsContent compact={false} />
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>

      {/* Image Generator Dialog */}
      <Dialog open={showImageGenerator} onOpenChange={setShowImageGenerator}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Scripture Art</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create beautiful shareable images with this verse.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg text-center font-serif italic">
              "{selectedBook} {selectedChapter}:{selectedVerse}"
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['Sunset', 'Mountains', 'Ocean', 'Forest', 'Sky', 'Minimal'].map(style => (
                <Button key={style} variant="outline" size="sm" className="text-xs">
                  {style}
                </Button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImageGenerator(false)}>Cancel</Button>
            <Button>Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

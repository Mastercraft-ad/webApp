import { useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Play, 
  Pause,
  SkipBack, 
  SkipForward, 
  Volume2,
  VolumeX,
  ListMusic, 
  Download,
  MoreVertical,
  Heart,
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  Shuffle,
  Repeat,
  Repeat1,
  Share2,
  Plus,
  X,
  Church,
  Layers,
  History,
  Timer,
  Settings2,
  FileText,
  Quote,
  Bell,
  BellOff,
  Radio,
  Mic,
  CheckCircle2,
} from "lucide-react";

const sermonCategories = [
  { id: "all", name: "All", count: 1247 },
  { id: "doctrinal", name: "Doctrinal", count: 234 },
  { id: "topical", name: "Topical", count: 412 },
  { id: "expository", name: "Expository", count: 289 },
  { id: "evangelistic", name: "Evangelistic", count: 156 },
  { id: "devotional", name: "Devotional", count: 98 },
];

const sermonSeries = [
  { id: 1, name: "Walking in Faith", sermonCount: 12, progress: 8, image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400" },
  { id: 2, name: "The Beatitudes", sermonCount: 9, progress: 3, image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400" },
  { id: 3, name: "Romans: Living by Faith", sermonCount: 16, progress: 16, image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400" },
  { id: 4, name: "Psalms of David", sermonCount: 8, progress: 0, image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=400" },
];

const churches = [
  { id: 1, name: "Grace Community Church", location: "Los Angeles, CA", sermons: 342, avatar: "GC" },
  { id: 2, name: "Elevation Church", location: "Charlotte, NC", sermons: 287, avatar: "EC" },
  { id: 3, name: "Life.Church", location: "Edmond, OK", sermons: 198, avatar: "LC" },
  { id: 4, name: "Hillsong Church", location: "Sydney, AU", sermons: 156, avatar: "HC" },
];

const preachers = [
  { id: 1, name: "Pastor John MacArthur", church: "Grace Community Church", sermons: 234, subscribed: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
  { id: 2, name: "Pastor Steven Furtick", church: "Elevation Church", sermons: 189, subscribed: false, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
  { id: 3, name: "Pastor Craig Groeschel", church: "Life.Church", sermons: 156, subscribed: true, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
  { id: 4, name: "Pastor Tim Keller", church: "Redeemer Presbyterian", sermons: 312, subscribed: false, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100" },
];

const mockSermons = [
  {
    id: 1,
    title: "The Power of Faith in Difficult Times",
    preacher: "Pastor John MacArthur",
    church: "Grace Community Church",
    date: "2024-12-01",
    duration: "45:32",
    durationSeconds: 2732,
    category: "doctrinal",
    series: "Walking in Faith",
    passage: "Hebrews 11:1-6",
    topic: "Faith",
    plays: 12453,
    rating: 4.8,
    reviews: 234,
    bookmarked: true,
    downloaded: false,
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800",
    hasTranscript: true,
  },
  {
    id: 2,
    title: "Living a Life of Purpose",
    preacher: "Pastor Steven Furtick",
    church: "Elevation Church",
    date: "2024-11-28",
    duration: "38:15",
    durationSeconds: 2295,
    category: "topical",
    series: null,
    passage: "Ephesians 2:10",
    topic: "Purpose",
    plays: 8921,
    rating: 4.6,
    reviews: 156,
    bookmarked: false,
    downloaded: true,
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800",
    hasTranscript: true,
  },
  {
    id: 3,
    title: "Grace Upon Grace",
    preacher: "Pastor Tim Keller",
    church: "Redeemer Presbyterian",
    date: "2024-11-25",
    duration: "52:18",
    durationSeconds: 3138,
    category: "expository",
    series: "Romans: Living by Faith",
    passage: "Romans 5:1-11",
    topic: "Grace",
    plays: 15678,
    rating: 4.9,
    reviews: 412,
    bookmarked: true,
    downloaded: false,
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800",
    hasTranscript: true,
  },
  {
    id: 4,
    title: "Prayer: The Key to Breakthrough",
    preacher: "Pastor Craig Groeschel",
    church: "Life.Church",
    date: "2024-11-22",
    duration: "41:45",
    durationSeconds: 2505,
    category: "topical",
    series: null,
    passage: "Matthew 6:5-13",
    topic: "Prayer",
    plays: 9234,
    rating: 4.7,
    reviews: 189,
    bookmarked: false,
    downloaded: false,
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800",
    hasTranscript: false,
  },
  {
    id: 5,
    title: "The Shepherd's Psalm",
    preacher: "Pastor John MacArthur",
    church: "Grace Community Church",
    date: "2024-11-19",
    duration: "48:22",
    durationSeconds: 2902,
    category: "expository",
    series: "Psalms of David",
    passage: "Psalm 23",
    topic: "God's Provision",
    plays: 11234,
    rating: 4.9,
    reviews: 298,
    bookmarked: false,
    downloaded: false,
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800",
    hasTranscript: true,
  },
];

const recentlyPlayed = [
  { ...mockSermons[0], lastPlayed: "2 hours ago", progress: 65 },
  { ...mockSermons[2], lastPlayed: "Yesterday", progress: 100 },
  { ...mockSermons[4], lastPlayed: "2 days ago", progress: 32 },
];

const mockQueue = [mockSermons[1], mockSermons[3], mockSermons[4]];

const mockPlaylists = [
  { id: 1, name: "Sunday Favorites", sermonCount: 24, image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400" },
  { id: 2, name: "Deep Study", sermonCount: 18, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
  { id: 3, name: "Commute", sermonCount: 32, image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400" },
  { id: 4, name: "Devotions", sermonCount: 15, image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400" },
];

export default function AudioPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(892);
  const [volume, setVolume] = useState([75]);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1");
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [isShuffled, setIsShuffled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSermon, setSelectedSermon] = useState(mockSermons[0]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [audioQuality, setAudioQuality] = useState("high");
  const [activeTab, setActiveTab] = useState("library");
  const [showQueueSheet, setShowQueueSheet] = useState(false);
  const [showPlayerSheet, setShowPlayerSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / selectedSermon.durationSeconds) * 100;

  const filteredSermons = mockSermons.filter(sermon => {
    const matchesCategory = activeCategory === "all" || sermon.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const QueuePanel = () => (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Up Next</h4>
      {mockQueue.map((sermon, i) => (
        <div 
          key={sermon.id} 
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer group"
          onClick={() => setSelectedSermon(sermon)}
          data-testid={`queue-item-${sermon.id}`}
        >
          <span className="text-sm text-muted-foreground w-5 text-center">{i + 1}</span>
          <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
            <img src={sermon.image} alt={sermon.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{sermon.title}</p>
            <p className="text-xs text-muted-foreground truncate">{sermon.preacher}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  const SermonCard = ({ sermon }: { sermon: typeof mockSermons[0] }) => (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedSermon(sermon)}
      data-testid={`card-sermon-${sermon.id}`}
    >
      <CardContent className="p-3 md:p-4">
        <div className="flex gap-3 md:gap-4">
          <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-lg overflow-hidden flex-shrink-0">
            <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
              {sermon.duration}
            </div>
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">{sermon.title}</h3>
            <p className="text-xs md:text-sm text-muted-foreground truncate">{sermon.preacher}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <Badge variant="outline" className="text-xs">{sermon.passage}</Badge>
              <Badge variant="secondary" className="text-xs">{sermon.topic}</Badge>
            </div>
            <div className="mt-auto pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{sermon.date}</span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">{sermon.plays.toLocaleString()} plays</span>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                  {sermon.bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex" onClick={(e) => e.stopPropagation()}>
                  <Download className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Add to Queue</DropdownMenuItem>
                    <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Download</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FullPlayerContent = () => (
    <div className="flex flex-col h-full p-4 md:p-6">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div className="w-full aspect-square max-w-[280px] md:max-w-[320px] rounded-xl overflow-hidden mb-6 shadow-lg">
          <img src={selectedSermon.image} alt={selectedSermon.title} className="w-full h-full object-cover" />
        </div>
        <div className="text-center mb-6 w-full">
          <h2 className="font-bold text-lg md:text-xl mb-1 line-clamp-2">{selectedSermon.title}</h2>
          <p className="text-muted-foreground text-sm md:text-base">{selectedSermon.preacher}</p>
          <p className="text-xs md:text-sm text-muted-foreground">{selectedSermon.church}</p>
        </div>
        
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={(value) => setCurrentTime(Math.floor((value[0] / 100) * selectedSermon.durationSeconds))}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{selectedSermon.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsShuffled(!isShuffled)}>
              <Shuffle className={`h-5 w-5 ${isShuffled ? 'text-primary' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}>
              <SkipBack className="h-6 w-6" />
            </Button>
            <Button size="icon" className="h-14 w-14 rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setCurrentTime(Math.min(selectedSermon.durationSeconds, currentTime + 15))}>
              <SkipForward className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setRepeatMode(repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off")}>
              {repeatMode === "one" ? <Repeat1 className="h-5 w-5 text-primary" /> : <Repeat className={`h-5 w-5 ${repeatMode === "all" ? 'text-primary' : ''}`} />}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider value={isMuted ? [0] : volume} max={100} className="w-28" onValueChange={setVolume} />
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5x</SelectItem>
                <SelectItem value="0.75">0.75x</SelectItem>
                <SelectItem value="1">1x</SelectItem>
                <SelectItem value="1.25">1.25x</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
                <SelectItem value="2">2x</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon">
              {selectedSermon.bookmarked ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <Bookmark className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 pt-4 border-t flex-wrap">
        <Button variant="outline" size="sm" onClick={() => setShowTranscript(!showTranscript)}>
          <FileText className="h-4 w-4 mr-1" />Transcript
        </Button>
        <Button variant="outline" size="sm" onClick={() => setShowNotes(!showNotes)}>
          <Quote className="h-4 w-4 mr-1" />Notes
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm"><Timer className="h-4 w-4 mr-1" />Sleep</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSleepTimer(null)}>Off</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSleepTimer(15)}>15 min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSleepTimer(30)}>30 min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSleepTimer(60)}>1 hour</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm"><Settings2 className="h-4 w-4 mr-1" />Quality</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setAudioQuality("low")}>Low (64 kbps)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAudioQuality("medium")}>Medium (128 kbps)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAudioQuality("high")}>High (320 kbps)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          {/* Header: Tabs + Search + Actions */}
          <div className="flex flex-col gap-3 mb-4 flex-shrink-0">
            {/* Tabs Row - Horizontally scrollable */}
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
              <TabsList className="inline-flex w-max gap-1">
                <TabsTrigger value="library" data-testid="tab-library" className="px-3 py-2">
                  <Radio className="h-4 w-4 mr-1.5" />
                  <span className="hidden sm:inline">Library</span>
                  <span className="sm:hidden">Lib</span>
                </TabsTrigger>
                <TabsTrigger value="series" data-testid="tab-series" className="px-3 py-2">
                  <Layers className="h-4 w-4 mr-1.5" />
                  Series
                </TabsTrigger>
                <TabsTrigger value="preachers" data-testid="tab-preachers" className="px-3 py-2">
                  <Mic className="h-4 w-4 mr-1.5" />
                  <span className="hidden md:inline">Preachers</span>
                  <span className="md:hidden">Pastors</span>
                </TabsTrigger>
                <TabsTrigger value="churches" data-testid="tab-churches" className="px-3 py-2">
                  <Church className="h-4 w-4 mr-1.5" />
                  <span className="hidden md:inline">Churches</span>
                  <span className="md:hidden">Church</span>
                </TabsTrigger>
                <TabsTrigger value="playlists" data-testid="tab-playlists" className="px-3 py-2">
                  <ListMusic className="h-4 w-4 mr-1.5" />
                  <span className="hidden md:inline">Playlists</span>
                  <span className="md:hidden">Lists</span>
                </TabsTrigger>
                <TabsTrigger value="history" data-testid="tab-history" className="px-3 py-2">
                  <History className="h-4 w-4 mr-1.5" />
                  <span className="hidden md:inline">History</span>
                  <span className="md:hidden">Recent</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Search and Actions Row */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sermons..."
                  className="pl-9 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search"
                />
              </div>
              
              {/* Queue Button (Mobile/Tablet) */}
              <Sheet open={showQueueSheet} onOpenChange={setShowQueueSheet}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden flex-shrink-0" data-testid="button-queue-mobile">
                    <ListMusic className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <SheetHeader className="mb-4">
                    <SheetTitle className="flex items-center gap-2">
                      <ListMusic className="h-5 w-5" />Queue
                    </SheetTitle>
                  </SheetHeader>
                  <QueuePanel />
                </SheetContent>
              </Sheet>

              {/* Filter Button */}
              <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="flex-shrink-0" data-testid="button-filter">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <SheetHeader className="mb-4">
                    <SheetTitle>Filter Sermons</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {sermonCategories.map(cat => (
                          <Badge
                            key={cat.id}
                            variant={activeCategory === cat.id ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => { setActiveCategory(cat.id); setShowFilterSheet(false); }}
                          >
                            {cat.name} ({cat.count})
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-3">Speaker</h4>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Any speaker" /></SelectTrigger>
                        <SelectContent>
                          {preachers.map(p => <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-3">Church</h4>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Any church" /></SelectTrigger>
                        <SelectContent>
                          {churches.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={() => setShowFilterSheet(false)}>Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Main Content with optional Queue sidebar */}
          <div className="flex-1 min-h-0 flex gap-6">
            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-0 min-w-0">
              {/* Library Tab */}
              <TabsContent value="library" className="flex-1 m-0 overflow-hidden flex flex-col">
                {/* Category Pills - Horizontally scrollable */}
                <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 mb-4 flex-shrink-0 scrollbar-none">
                  <div className="flex gap-2 w-max">
                    {sermonCategories.map(cat => (
                      <Button
                        key={cat.id}
                        variant={activeCategory === cat.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(cat.id)}
                        className="flex-shrink-0"
                        data-testid={`button-category-${cat.id}`}
                      >
                        {cat.name}
                        <Badge variant="secondary" className="ml-1.5 text-xs">{cat.count}</Badge>
                      </Button>
                    ))}
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="space-y-3 pr-4">
                    {filteredSermons.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No sermons found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    ) : (
                      filteredSermons.map(sermon => <SermonCard key={sermon.id} sermon={sermon} />)
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Series Tab */}
              <TabsContent value="series" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-4">
                    {sermonSeries.map(series => (
                      <Card key={series.id} className="cursor-pointer overflow-hidden" data-testid={`card-series-${series.id}`}>
                        <div className="relative h-32 md:h-40">
                          <img src={series.image} alt={series.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <h3 className="font-semibold text-sm md:text-base line-clamp-1">{series.name}</h3>
                            <p className="text-xs text-white/80">{series.sermonCount} sermons</p>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>{series.progress}/{series.sermonCount}</span>
                            </div>
                            <Progress value={(series.progress / series.sermonCount) * 100} className="h-2" />
                            {series.progress > 0 && series.progress < series.sermonCount && (
                              <Button size="sm" className="w-full mt-2">Continue</Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Preachers Tab */}
              <TabsContent value="preachers" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-4">
                    {preachers.map(preacher => (
                      <Card key={preacher.id} className="cursor-pointer" data-testid={`card-preacher-${preacher.id}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-14 w-14 md:h-16 md:w-16">
                              <AvatarImage src={preacher.avatar} />
                              <AvatarFallback>{preacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm md:text-base line-clamp-1">{preacher.name}</h3>
                              <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{preacher.church}</p>
                              <p className="text-xs text-muted-foreground">{preacher.sermons} sermons</p>
                            </div>
                            <Button variant={preacher.subscribed ? "secondary" : "default"} size="sm">
                              {preacher.subscribed ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Churches Tab */}
              <TabsContent value="churches" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-4">
                    {churches.map(church => (
                      <Card key={church.id} className="cursor-pointer" data-testid={`card-church-${church.id}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-14 w-14 md:h-16 md:w-16">
                              <AvatarFallback className="bg-primary text-primary-foreground">{church.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm md:text-base line-clamp-1">{church.name}</h3>
                              <p className="text-xs md:text-sm text-muted-foreground">{church.location}</p>
                              <p className="text-xs text-muted-foreground">{church.sermons} sermons</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Playlists Tab */}
              <TabsContent value="playlists" className="flex-1 m-0 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base md:text-lg font-semibold">Your Playlists</h2>
                  <Button size="sm" data-testid="button-create-playlist">
                    <Plus className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Create</span>
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100%-3rem)]">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pr-4">
                    {mockPlaylists.map(playlist => (
                      <Card key={playlist.id} className="cursor-pointer group" data-testid={`card-playlist-${playlist.id}`}>
                        <CardContent className="p-3">
                          <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                            <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button size="icon" className="h-10 w-10 rounded-full">
                                <Play className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                          <h3 className="font-medium text-sm truncate">{playlist.name}</h3>
                          <p className="text-xs text-muted-foreground">{playlist.sermonCount} sermons</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-4 pr-4">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <History className="h-4 w-4" />Continue Where You Left Off
                      </h3>
                      <div className="space-y-2">
                        {recentlyPlayed.filter(s => s.progress < 100).map(sermon => (
                          <Card key={sermon.id} className="cursor-pointer" onClick={() => setSelectedSermon(sermon)}>
                            <CardContent className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm truncate">{sermon.title}</h4>
                                  <p className="text-xs text-muted-foreground truncate">{sermon.preacher}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Progress value={sermon.progress} className="flex-1 h-1.5" />
                                    <span className="text-xs text-muted-foreground">{sermon.progress}%</span>
                                  </div>
                                </div>
                                <Button size="sm"><Play className="h-4 w-4 mr-1" />Resume</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-3">Recently Played</h3>
                      <div className="space-y-2">
                        {recentlyPlayed.map(sermon => (
                          <Card key={sermon.id} className="cursor-pointer" onClick={() => setSelectedSermon(sermon)}>
                            <CardContent className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                  <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm truncate">{sermon.title}</h4>
                                  <p className="text-xs text-muted-foreground">{sermon.preacher} | {sermon.lastPlayed}</p>
                                </div>
                                {sermon.progress === 100 && (
                                  <Badge variant="secondary" className="text-xs">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />Done
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>

            {/* Queue Sidebar (Desktop Only) */}
            <div className="w-72 hidden lg:flex flex-col border-l pl-6 flex-shrink-0">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ListMusic className="h-5 w-5" />Queue
              </h3>
              <ScrollArea className="flex-1">
                <QueuePanel />
              </ScrollArea>
            </div>
          </div>
        </Tabs>

        {/* Audio Player Bar */}
        <div className="mt-4 border-t pt-4 flex-shrink-0">
          {/* Desktop Player */}
          <div className="hidden md:flex items-center gap-4">
            <Sheet open={showPlayerSheet} onOpenChange={setShowPlayerSheet}>
              <SheetTrigger asChild>
                <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" data-testid="button-expand-player">
                  <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={selectedSermon.image} alt={selectedSermon.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-sm truncate">{selectedSermon.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{selectedSermon.preacher}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {selectedSermon.bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
                <FullPlayerContent />
              </SheetContent>
            </Sheet>

            <div className="flex flex-col items-center gap-1 flex-1 max-w-lg">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsShuffled(!isShuffled)}>
                  <Shuffle className={`h-4 w-4 ${isShuffled ? 'text-primary' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}>
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button size="icon" className="h-10 w-10 rounded-full" onClick={() => setIsPlaying(!isPlaying)} data-testid="button-play-pause">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setCurrentTime(Math.min(selectedSermon.durationSeconds, currentTime + 15))}>
                  <SkipForward className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setRepeatMode(repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off")}>
                  {repeatMode === "one" ? <Repeat1 className="h-4 w-4 text-primary" /> : <Repeat className={`h-4 w-4 ${repeatMode === "all" ? 'text-primary' : ''}`} />}
                </Button>
              </div>
              <div className="flex items-center gap-2 w-full">
                <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
                <Slider value={[progress]} max={100} step={0.1} className="flex-1" onValueChange={(value) => setCurrentTime(Math.floor((value[0] / 100) * selectedSermon.durationSeconds))} />
                <span className="text-xs text-muted-foreground w-10">{selectedSermon.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-1 justify-end">
              <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                <SelectTrigger className="w-16"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x</SelectItem>
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="1.5">1.5x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden xl:flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider value={isMuted ? [0] : volume} max={100} className="w-20" onValueChange={setVolume} />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><FileText className="h-4 w-4 mr-2" />Transcript</DropdownMenuItem>
                  <DropdownMenuItem><Quote className="h-4 w-4 mr-2" />Notes</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Share2 className="h-4 w-4 mr-2" />Share</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Player */}
          <div className="md:hidden">
            <Sheet open={showPlayerSheet} onOpenChange={setShowPlayerSheet}>
              <SheetTrigger asChild>
                <div className="flex items-center gap-3 p-2 -m-2 cursor-pointer rounded-lg">
                  <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={selectedSermon.image} alt={selectedSermon.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{selectedSermon.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{selectedSermon.preacher}</p>
                    <Progress value={progress} className="h-1 mt-1" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-10 w-10" onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}>
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10" onClick={(e) => { e.stopPropagation(); setCurrentTime(Math.min(selectedSermon.durationSeconds, currentTime + 15)); }}>
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[90vh] rounded-t-xl">
                <FullPlayerContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Play, 
  Pause,
  SkipBack, 
  SkipForward, 
  Volume2,
  VolumeX,
  ListMusic, 
  Clock, 
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
  MessageSquare,
  Star,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Church,
  User,
  Calendar,
  BookOpen,
  Tag,
  Layers,
  History,
  Timer,
  Settings2,
  FileText,
  Highlighter,
  Quote,
  Bell,
  BellOff,
  ThumbsUp,
  Send,
  Copy,
  ExternalLink,
  Headphones,
  Radio,
  Mic,
  ListPlus,
  CheckCircle2,
  PlayCircle,
  PauseCircle
} from "lucide-react";

const sermonCategories = [
  { id: "all", name: "All Sermons", count: 1247 },
  { id: "doctrinal", name: "Doctrinal", count: 234 },
  { id: "topical", name: "Topical", count: 412 },
  { id: "expository", name: "Expository", count: 289 },
  { id: "evangelistic", name: "Evangelistic", count: 156 },
  { id: "devotional", name: "Devotional", count: 98 },
  { id: "prophetic", name: "Prophetic", count: 58 },
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
    title: "Grace Upon Grace: Understanding God's Love",
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
  {
    id: 6,
    title: "Overcoming Fear with Faith",
    preacher: "Pastor Steven Furtick",
    church: "Elevation Church",
    date: "2024-11-15",
    duration: "36:48",
    durationSeconds: 2208,
    category: "evangelistic",
    series: null,
    passage: "Joshua 1:9",
    topic: "Fear",
    plays: 7856,
    rating: 4.5,
    reviews: 134,
    bookmarked: true,
    downloaded: true,
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800",
    hasTranscript: true,
  },
];

const recentlyPlayed = [
  { ...mockSermons[0], lastPlayed: "2 hours ago", progress: 65 },
  { ...mockSermons[2], lastPlayed: "Yesterday", progress: 100 },
  { ...mockSermons[4], lastPlayed: "2 days ago", progress: 32 },
];

const mockQueue = [
  mockSermons[1],
  mockSermons[3],
  mockSermons[5],
];

const mockPlaylists = [
  { id: 1, name: "Sunday Morning Favorites", sermonCount: 24, image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400" },
  { id: 2, name: "Deep Study Sessions", sermonCount: 18, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
  { id: 3, name: "Commute Listening", sermonCount: 32, image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400" },
  { id: 4, name: "Evening Devotions", sermonCount: 15, image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400" },
];

const mockComments = [
  { id: 1, user: "Sarah M.", avatar: "SM", text: "This sermon changed my perspective on faith. Pastor John really knows how to break down scripture.", timestamp: "2 hours ago", likes: 24 },
  { id: 2, user: "David K.", avatar: "DK", text: "The part about trusting God in uncertainty hit home. Sharing this with my small group.", timestamp: "5 hours ago", likes: 18 },
  { id: 3, user: "Maria L.", avatar: "ML", text: "Been listening to this series all week. So much wisdom!", timestamp: "1 day ago", likes: 45 },
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
  const [playerExpanded, setPlayerExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);

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
      sermon.church.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.passage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sermon.series && sermon.series.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between gap-4 mb-4 flex-shrink-0 flex-wrap">
            <TabsList>
              <TabsTrigger value="library" data-testid="tab-library">
                <Radio className="h-4 w-4 mr-2" />
                Library
              </TabsTrigger>
              <TabsTrigger value="series" data-testid="tab-series">
                <Layers className="h-4 w-4 mr-2" />
                Series
              </TabsTrigger>
              <TabsTrigger value="preachers" data-testid="tab-preachers">
                <Mic className="h-4 w-4 mr-2" />
                Preachers
              </TabsTrigger>
              <TabsTrigger value="churches" data-testid="tab-churches">
                <Church className="h-4 w-4 mr-2" />
                Churches
              </TabsTrigger>
              <TabsTrigger value="playlists" data-testid="tab-playlists">
                <ListMusic className="h-4 w-4 mr-2" />
                Playlists
              </TabsTrigger>
              <TabsTrigger value="history" data-testid="tab-history">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sermons, speakers, topics..."
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="button-filter"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showFilters && (
            <Card className="mb-4 flex-shrink-0">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Speaker</label>
                    <Select>
                      <SelectTrigger data-testid="select-speaker">
                        <SelectValue placeholder="Any speaker" />
                      </SelectTrigger>
                      <SelectContent>
                        {preachers.map(p => (
                          <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Church</label>
                    <Select>
                      <SelectTrigger data-testid="select-church">
                        <SelectValue placeholder="Any church" />
                      </SelectTrigger>
                      <SelectContent>
                        {churches.map(c => (
                          <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bible Passage</label>
                    <Input placeholder="e.g., John 3:16" data-testid="input-passage" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Topic</label>
                    <Select>
                      <SelectTrigger data-testid="select-topic">
                        <SelectValue placeholder="Any topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="faith">Faith</SelectItem>
                        <SelectItem value="grace">Grace</SelectItem>
                        <SelectItem value="prayer">Prayer</SelectItem>
                        <SelectItem value="love">Love</SelectItem>
                        <SelectItem value="hope">Hope</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Series</label>
                    <Select>
                      <SelectTrigger data-testid="select-series">
                        <SelectValue placeholder="Any series" />
                      </SelectTrigger>
                      <SelectContent>
                        {sermonSeries.map(s => (
                          <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date</label>
                    <Select>
                      <SelectTrigger data-testid="select-date">
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Past week</SelectItem>
                        <SelectItem value="month">Past month</SelectItem>
                        <SelectItem value="year">Past year</SelectItem>
                        <SelectItem value="all">All time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex-1 min-h-0 flex gap-6">
            <div className="flex-1 flex flex-col min-h-0">
              <TabsContent value="library" className="flex-1 m-0 overflow-hidden flex flex-col">
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 flex-shrink-0 flex-wrap">
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
                      <Badge variant="secondary" className="ml-2">{cat.count}</Badge>
                    </Button>
                  ))}
                </div>

                <ScrollArea className="flex-1">
                  <div className="space-y-3 pr-4">
                    {filteredSermons.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No sermons found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    ) : filteredSermons.map(sermon => (
                      <Card 
                        key={sermon.id} 
                        className={`cursor-pointer transition-colors ${selectedSermon.id === sermon.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedSermon(sermon)}
                        data-testid={`card-sermon-${sermon.id}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 group">
                              <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <PlayCircle className="h-10 w-10 text-white" />
                              </div>
                              <Badge className="absolute bottom-1 right-1 text-xs">{sermon.duration}</Badge>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-foreground truncate">{sermon.title}</h3>
                                  <p className="text-sm text-muted-foreground">{sermon.preacher} • {sermon.church}</p>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <Badge variant="outline" className="text-xs">
                                      <BookOpen className="h-3 w-3 mr-1" />
                                      {sermon.passage}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                      <Tag className="h-3 w-3 mr-1" />
                                      {sermon.topic}
                                    </Badge>
                                    {sermon.series && (
                                      <Badge variant="secondary" className="text-xs">
                                        <Layers className="h-3 w-3 mr-1" />
                                        {sermon.series}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    data-testid={`button-bookmark-${sermon.id}`}
                                  >
                                    {sermon.bookmarked ? (
                                      <BookmarkCheck className="h-4 w-4 text-primary" />
                                    ) : (
                                      <Bookmark className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    data-testid={`button-download-${sermon.id}`}
                                  >
                                    {sermon.downloaded ? (
                                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Download className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`button-more-${sermon.id}`}>
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <ListPlus className="h-4 w-4 mr-2" />
                                        Add to Queue
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add to Playlist
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Share2 className="h-4 w-4 mr-2" />
                                        Share
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        <FileText className="h-4 w-4 mr-2" />
                                        View Transcript
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        View Comments
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(sermon.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Headphones className="h-3 w-3" />
                                  {sermon.plays.toLocaleString()} plays
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                  {sermon.rating} ({sermon.reviews})
                                </span>
                                {sermon.hasTranscript && (
                                  <Badge variant="outline" className="text-xs">Transcript</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="series" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                    {sermonSeries.map(series => (
                      <Card key={series.id} className="cursor-pointer hover-elevate" data-testid={`card-series-${series.id}`}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={series.image} alt={series.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{series.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{series.sermonCount} sermons</p>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Progress</span>
                                  <span>{series.progress}/{series.sermonCount}</span>
                                </div>
                                <Progress value={(series.progress / series.sermonCount) * 100} className="h-2" />
                              </div>
                              {series.progress > 0 && series.progress < series.sermonCount && (
                                <Button size="sm" className="mt-2" data-testid={`button-continue-series-${series.id}`}>
                                  Continue Series
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="preachers" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                    {preachers.map(preacher => (
                      <Card key={preacher.id} className="cursor-pointer" data-testid={`card-preacher-${preacher.id}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={preacher.avatar} />
                              <AvatarFallback>{preacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold">{preacher.name}</h3>
                              <p className="text-sm text-muted-foreground">{preacher.church}</p>
                              <p className="text-xs text-muted-foreground">{preacher.sermons} sermons</p>
                            </div>
                            <Button
                              variant={preacher.subscribed ? "secondary" : "default"}
                              size="sm"
                              data-testid={`button-subscribe-${preacher.id}`}
                            >
                              {preacher.subscribed ? (
                                <>
                                  <BellOff className="h-4 w-4 mr-1" />
                                  Subscribed
                                </>
                              ) : (
                                <>
                                  <Bell className="h-4 w-4 mr-1" />
                                  Subscribe
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="churches" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                    {churches.map(church => (
                      <Card key={church.id} className="cursor-pointer" data-testid={`card-church-${church.id}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="bg-primary text-primary-foreground text-lg">{church.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold">{church.name}</h3>
                              <p className="text-sm text-muted-foreground">{church.location}</p>
                              <p className="text-xs text-muted-foreground">{church.sermons} sermons</p>
                            </div>
                            <Button variant="outline" size="sm" data-testid={`button-view-church-${church.id}`}>
                              View Sermons
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="playlists" className="flex-1 m-0 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Your Playlists</h2>
                  <Button data-testid="button-create-playlist">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Playlist
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100%-3rem)]">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-4">
                    {mockPlaylists.map(playlist => (
                      <Card key={playlist.id} className="cursor-pointer group" data-testid={`card-playlist-${playlist.id}`}>
                        <CardContent className="p-3">
                          <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                            <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button size="icon" className="h-12 w-12 rounded-full">
                                <Play className="h-6 w-6" />
                              </Button>
                            </div>
                          </div>
                          <h3 className="font-medium truncate">{playlist.name}</h3>
                          <p className="text-sm text-muted-foreground">{playlist.sermonCount} sermons</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="history" className="flex-1 m-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-4 pr-4">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <History className="h-4 w-4" />
                        Continue Where You Left Off
                      </h3>
                      <div className="space-y-2">
                        {recentlyPlayed.filter(s => s.progress < 100).map(sermon => (
                          <Card key={sermon.id} className="cursor-pointer" data-testid={`card-continue-${sermon.id}`}>
                            <CardContent className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium truncate">{sermon.title}</h4>
                                  <p className="text-sm text-muted-foreground">{sermon.preacher}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Progress value={sermon.progress} className="flex-1 h-1" />
                                    <span className="text-xs text-muted-foreground">{sermon.progress}%</span>
                                  </div>
                                </div>
                                <Button size="sm" data-testid={`button-resume-${sermon.id}`}>
                                  <Play className="h-4 w-4 mr-1" />
                                  Resume
                                </Button>
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
                          <Card key={sermon.id} className="cursor-pointer" data-testid={`card-recent-${sermon.id}`}>
                            <CardContent className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                  <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium truncate text-sm">{sermon.title}</h4>
                                  <p className="text-xs text-muted-foreground">{sermon.preacher} • {sermon.lastPlayed}</p>
                                </div>
                                {sermon.progress === 100 && (
                                  <Badge variant="secondary" className="text-xs">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Completed
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

            <div className="w-80 hidden lg:flex flex-col border-l border-border pl-6 flex-shrink-0">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ListMusic className="h-5 w-5" />
                Queue
              </h3>
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-2 pr-2">
                  {mockQueue.map((sermon, i) => (
                    <div 
                      key={sermon.id} 
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer group"
                      data-testid={`queue-item-${sermon.id}`}
                    >
                      <span className="text-sm text-muted-foreground w-4">{i + 1}</span>
                      <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                        <img src={sermon.image} alt={sermon.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{sermon.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{sermon.preacher}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100"
                        data-testid={`button-remove-queue-${sermon.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Separator className="my-4" />

              <h3 className="font-bold text-sm mb-3">Recommendations</h3>
              <ScrollArea className="flex-1">
                <div className="space-y-2 pr-2">
                  {mockSermons.slice(3, 6).map(sermon => (
                    <div 
                      key={sermon.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                      data-testid={`recommendation-${sermon.id}`}
                    >
                      <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                        <img src={sermon.image} alt={sermon.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{sermon.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{sermon.preacher}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </Tabs>

        <div className={`mt-4 border-t border-border pt-4 flex-shrink-0 transition-all ${playerExpanded ? 'pb-4' : ''}`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div 
                className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => setPlayerExpanded(!playerExpanded)}
                data-testid="button-expand-player"
              >
                <img src={selectedSermon.image} alt={selectedSermon.title} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold truncate">{selectedSermon.title}</h4>
                <p className="text-sm text-muted-foreground truncate">{selectedSermon.preacher} • {selectedSermon.church}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" data-testid="button-player-bookmark">
                  {selectedSermon.bookmarked ? (
                    <BookmarkCheck className="h-5 w-5 text-primary" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" data-testid="button-player-heart">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setIsShuffled(!isShuffled)}
                  data-testid="button-shuffle"
                >
                  <Shuffle className={`h-4 w-4 ${isShuffled ? 'text-primary' : ''}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
                  data-testid="button-skip-back-15"
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  className="h-10 w-10 rounded-full"
                  onClick={() => setIsPlaying(!isPlaying)}
                  data-testid="button-play-pause"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setCurrentTime(Math.min(selectedSermon.durationSeconds, currentTime + 15))}
                  data-testid="button-skip-forward-15"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => {
                    if (repeatMode === "off") setRepeatMode("all");
                    else if (repeatMode === "all") setRepeatMode("one");
                    else setRepeatMode("off");
                  }}
                  data-testid="button-repeat"
                >
                  {repeatMode === "one" ? (
                    <Repeat1 className="h-4 w-4 text-primary" />
                  ) : (
                    <Repeat className={`h-4 w-4 ${repeatMode === "all" ? 'text-primary' : ''}`} />
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-2 w-full max-w-md">
                <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
                <Slider
                  value={[progress]}
                  max={100}
                  step={0.1}
                  className="flex-1"
                  onValueChange={(value) => setCurrentTime(Math.floor((value[0] / 100) * selectedSermon.durationSeconds))}
                  data-testid="slider-progress"
                />
                <span className="text-xs text-muted-foreground w-10">{selectedSermon.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-1 justify-end">
              <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                <SelectTrigger className="w-20" data-testid="select-playback-speed">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x</SelectItem>
                  <SelectItem value="0.75">0.75x</SelectItem>
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="1.25">1.25x</SelectItem>
                  <SelectItem value="1.5">1.5x</SelectItem>
                  <SelectItem value="1.75">1.75x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setIsMuted(!isMuted)}
                  data-testid="button-mute"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={isMuted ? [0] : volume}
                  max={100}
                  className="w-20"
                  onValueChange={setVolume}
                  data-testid="slider-volume"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-sleep-timer">
                    <Timer className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSleepTimer(null)}>
                    Off
                    {sleepTimer === null && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSleepTimer(15)}>
                    15 minutes
                    {sleepTimer === 15 && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSleepTimer(30)}>
                    30 minutes
                    {sleepTimer === 30 && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSleepTimer(45)}>
                    45 minutes
                    {sleepTimer === 45 && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSleepTimer(60)}>
                    1 hour
                    {sleepTimer === 60 && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-audio-quality">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setAudioQuality("low")}>
                    Low Quality (64 kbps)
                    {audioQuality === "low" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAudioQuality("medium")}>
                    Medium Quality (128 kbps)
                    {audioQuality === "medium" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAudioQuality("high")}>
                    High Quality (320 kbps)
                    {audioQuality === "high" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowTranscript(!showTranscript)}
                data-testid="button-transcript"
              >
                <FileText className={`h-4 w-4 ${showTranscript ? 'text-primary' : ''}`} />
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowNotes(!showNotes)}
                data-testid="button-notes"
              >
                <Quote className={`h-4 w-4 ${showNotes ? 'text-primary' : ''}`} />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-share">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Share at Current Time
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Share to Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Share to Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Share via Email
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setPlayerExpanded(!playerExpanded)}
                data-testid="button-toggle-expand"
              >
                {playerExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {playerExpanded && (
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {showTranscript && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Transcript
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground"><span className="text-primary font-medium">[00:00]</span> Welcome everyone to today's message. We're continuing our series on faith...</p>
                        <p><span className="text-primary font-medium">[00:45]</span> Turn with me to Hebrews chapter 11. This is often called the "Hall of Faith" chapter...</p>
                        <p><span className="text-primary font-medium">[02:30]</span> Now faith is the substance of things hoped for, the evidence of things not seen...</p>
                        <p className="bg-primary/10 p-2 rounded"><span className="text-primary font-medium">[14:52]</span> What does it mean to walk by faith and not by sight? This is where we are now...</p>
                        <p><span className="text-primary font-medium">[18:20]</span> Abraham believed God, and it was credited to him as righteousness...</p>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}

              {showNotes && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Quote className="h-4 w-4" />
                      Notes & Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Textarea 
                        placeholder="Add your notes for this sermon..." 
                        className="h-20 resize-none"
                        data-testid="textarea-notes"
                      />
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm" data-testid="button-add-highlight">
                          <Highlighter className="h-3 w-3 mr-1" />
                          Add Highlight
                        </Button>
                        <Button variant="outline" size="sm" data-testid="button-add-takeaway">
                          <Star className="h-3 w-3 mr-1" />
                          Add Takeaway
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="p-2 bg-yellow-500/10 border-l-2 border-yellow-500 rounded text-sm">
                          "Faith is not believing that God can, it is knowing that God will."
                        </div>
                        <div className="p-2 bg-primary/10 border-l-2 border-primary rounded text-sm">
                          Key takeaway: Trust in God's timing, not our own.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className={showTranscript || showNotes ? '' : 'lg:col-span-3'}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Discussion ({mockComments.length})
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Your rating:</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Button
                            key={star}
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setUserRating(star)}
                            data-testid={`button-rate-${star}`}
                          >
                            <Star className={`h-4 w-4 ${star <= userRating ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a comment..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        data-testid="input-comment"
                      />
                      <Button size="icon" data-testid="button-send-comment">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <ScrollArea className="h-32">
                      <div className="space-y-3">
                        {mockComments.map(comment => (
                          <div key={comment.id} className="flex gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{comment.user}</span>
                                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{comment.text}</p>
                              <Button variant="ghost" size="sm" className="h-6 px-2 mt-1" data-testid={`button-like-comment-${comment.id}`}>
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {comment.likes}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

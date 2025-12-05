import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { 
  Play, 
  Pause,
  SkipBack, 
  SkipForward, 
  Volume2,
  VolumeX,
  Volume1,
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
  ChevronDown,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  MessageSquare,
  Star,
  Clock,
  Headphones,
  AudioLines,
  Share,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    liked: false,
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800",
    hasTranscript: true,
    transcript: `Welcome to Grace Community Church. Today we're going to be looking at Hebrews chapter 11, verses 1 through 6. This is one of the most powerful passages in all of Scripture about faith.

"Now faith is the substance of things hoped for, the evidence of things not seen." What a profound statement. Faith is not wishful thinking. Faith is not positive mental attitude. Faith is the very substance—the reality—of what we hope for.

The writer of Hebrews goes on to give us examples of men and women who lived by faith. Abel offered a better sacrifice. Enoch walked with God. Noah built an ark. Abraham left his homeland. These were people who took God at His word.

But here's what I want you to understand today: Faith is not passive. Faith is active. Faith moves us to action. When we truly believe God, it changes how we live.

In verse 6, we read: "But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him."

Notice two things about this verse. First, we must believe that God exists. That's foundational. But second—and this is crucial—we must believe that He rewards those who diligently seek Him. God is not distant. God is not disinterested. God is a rewarder.

What does this mean for you today? It means that your faith matters. Your trust in God matters. When you're going through difficult times—and we all go through them—your faith is what sustains you.`,
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
    liked: true,
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800",
    hasTranscript: true,
    transcript: `You are not an accident. Say that with me: "I am not an accident." God created you on purpose, for a purpose. Ephesians 2:10 says, "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do."

Did you catch that? God prepared works in advance for you to do. Before you were born, God had a plan. Before you took your first breath, God had a purpose for your life.

But here's what I want you to understand: Purpose is not found in perfection. Purpose is found in progress. You don't have to have it all figured out to start walking in your purpose.

Moses was a murderer. David was an adulterer. Peter denied Jesus three times. Yet God used each of them mightily. Why? Because purpose is not about your past. Purpose is about your potential in Christ.

So stop waiting for the perfect moment. Stop waiting until you feel ready. Step out in faith. Take that risk. Make that call. Start that ministry. Write that book. Launch that business.

God didn't create you to play it safe. God created you to make a difference. Your life matters. Your calling matters. Your purpose matters.`,
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
    liked: true,
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800",
    hasTranscript: true,
    transcript: `Grace. It's a word we use often in church, but do we really understand what it means? In Romans chapter 5, Paul unpacks the profound implications of grace in our lives.

"Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ, through whom we have gained access by faith into this grace in which we now stand."

Notice the phrase "this grace in which we now stand." Grace is not just a moment of forgiveness. Grace is a place where we live. We stand in grace. We're surrounded by grace. We're swimming in grace.

But here's what many Christians miss: Grace doesn't just save us from something—grace saves us for something. Grace doesn't just forgive our past—grace empowers our future.

And Paul goes even further. He says we "glory in our sufferings." Why? Because suffering produces perseverance, perseverance produces character, and character produces hope. And this hope does not put us to shame.

You see, grace reframes everything. It reframes our suffering. It reframes our failures. It reframes our future. Because of grace, nothing is wasted. Every trial, every struggle, every disappointment—God uses them all.

This is the gospel. This is the good news. We are saved by grace, we stand in grace, and we grow through grace. Grace upon grace.`,
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
    liked: false,
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800",
    hasTranscript: false,
    transcript: "",
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
    liked: false,
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800",
    hasTranscript: true,
    transcript: `"The Lord is my shepherd; I shall not want." These opening words of Psalm 23 are perhaps the most beloved in all of Scripture. David, a former shepherd himself, understood the intimate relationship between a shepherd and his sheep.

When David says "The Lord is my shepherd," he's making a personal declaration. Not "the Lord is a shepherd" or "the Lord is the shepherd." He says "my shepherd." This is personal. This is intimate.

And because the Lord is his shepherd, David can confidently say, "I shall not want." Not "I shall not want much" or "I shall not want too often." He shall not want. Period. Full stop.

"He makes me lie down in green pastures. He leads me beside still waters. He restores my soul." Notice the gentle, caring nature of our Shepherd. He doesn't drive us. He leads us. He doesn't deplete us. He restores us.

And then we come to verse 4: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me." Even in our darkest moments, we are not alone. The Shepherd is with us.

This is the comfort of Psalm 23. Not that we won't face valleys—we will. Not that we won't encounter shadows—we will. But in every valley, through every shadow, our Shepherd is with us. And that makes all the difference.`,
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

const mockComments = [
  {
    id: 1,
    userId: 1,
    userName: "Grace Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    content: "This sermon really spoke to my heart. The message about faith during difficult times is exactly what I needed to hear today.",
    timestamp: "2 hours ago",
    likes: 24,
    replies: 3,
  },
  {
    id: 2,
    userId: 2,
    userName: "Michael Chen",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    content: "Pastor's explanation of Hebrews 11 was so clear and impactful. I've listened to this sermon three times already!",
    timestamp: "5 hours ago",
    likes: 18,
    replies: 1,
  },
  {
    id: 3,
    userId: 3,
    userName: "Sarah Williams",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    content: "Amen! The part about active faith vs passive waiting was a real eye-opener for me.",
    timestamp: "1 day ago",
    likes: 42,
    replies: 7,
  },
  {
    id: 4,
    userId: 4,
    userName: "David Thompson",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    content: "Shared this with my small group. We had an amazing discussion about what it means to truly trust God.",
    timestamp: "2 days ago",
    likes: 31,
    replies: 4,
  },
];

// Audio Waveform Visualization Component
function AudioWaveform({ isPlaying, progress }: { isPlaying: boolean; progress: number }) {
  const bars = 60;
  const [heights, setHeights] = useState<number[]>(Array(bars).fill(20));

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setHeights(prev => prev.map(() => Math.random() * 80 + 20));
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex items-end justify-center gap-[2px] h-16 w-full px-4">
      {heights.map((height, i) => {
        const isPlayed = (i / bars) * 100 <= progress;
        return (
          <motion.div
            key={i}
            className={`w-1 rounded-full transition-colors ${
              isPlayed ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
            animate={{ height: isPlaying ? height : 20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

// Full Page Audio Player Component
function FullPagePlayer({ 
  sermon, 
  isPlaying, 
  currentTime, 
  volume,
  isMuted,
  playbackSpeed,
  repeatMode,
  isShuffled,
  isLiked,
  isBookmarked,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onSpeedChange,
  onRepeatChange,
  onShuffleToggle,
  onLikeToggle,
  onBookmarkToggle,
  onClose,
  onNext,
  onPrevious,
  formatTime,
  onShowToast,
  comments,
  onAddComment,
}: {
  sermon: typeof mockSermons[0];
  isPlaying: boolean;
  currentTime: number;
  volume: number[];
  isMuted: boolean;
  playbackSpeed: string;
  repeatMode: "off" | "all" | "one";
  isShuffled: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number[]) => void;
  onMuteToggle: () => void;
  onSpeedChange: (speed: string) => void;
  onRepeatChange: () => void;
  onShuffleToggle: () => void;
  onLikeToggle: () => void;
  onBookmarkToggle: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  formatTime: (seconds: number) => string;
  onShowToast: (title: string, description?: string) => void;
  comments: typeof mockComments;
  onAddComment: (content: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"player" | "comments" | "notes">("player");
  const [userNotes, setUserNotes] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newComment, setNewComment] = useState("");
  const progress = (currentTime / sermon.durationSeconds) * 100;

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/audio?sermon=${sermon.id}`;
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        onShowToast("Link Copied", "Sermon link copied to clipboard");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2000);
          onShowToast("Link Copied", "Sermon link copied to clipboard");
        } catch {
          onShowToast("Copy Failed", "Unable to copy link. Please copy manually.");
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
      onShowToast("Copy Failed", "Unable to copy link. Please try again.");
    }
    setShowShareMenu(false);
  };

  const handleWebShare = async () => {
    const shareUrl = `${window.location.origin}/audio?sermon=${sermon.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: sermon.title,
          text: `Listen to "${sermon.title}" by ${sermon.preacher}`,
          url: shareUrl,
        });
        onShowToast("Shared", "Sermon shared successfully");
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Share failed:", err);
          onShowToast("Share Failed", "Unable to share. Please try copying the link instead.");
        }
      }
    } else {
      await handleCopyLink();
    }
    setShowShareMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with back button */}
      <div className="flex items-center gap-4 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-player">
          <ChevronDown className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground truncate">Now Playing</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" data-testid="button-player-menu">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Plus className="h-4 w-4 mr-2" />Add to Playlist
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />Download
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Timer className="h-4 w-4 mr-2" />Sleep Timer
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings2 className="h-4 w-4 mr-2" />Audio Quality
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content - Full page layout like Boomplay */}
      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6">
          {/* Album Art and Info Section */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Album Art */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="relative aspect-square w-full max-w-[320px] mx-auto lg:mx-0">
                <motion.div
                  className="w-full h-full rounded-xl overflow-hidden shadow-2xl"
                  animate={{ scale: isPlaying ? 1 : 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={sermon.image} 
                    alt={sermon.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
                
                {isPlaying && (
                  <motion.div
                    className="absolute -inset-2 rounded-xl border-2 border-primary/30"
                    animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            </div>

            {/* Sermon Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{sermon.title}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{sermon.preacher.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{sermon.preacher}</p>
                  <p className="text-xs text-muted-foreground">{sermon.church}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <Button onClick={onPlayPause} data-testid="button-play-main">
                  {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button 
                  variant={isLiked ? "default" : "outline"} 
                  onClick={onLikeToggle}
                  data-testid="button-like"
                >
                  <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                  {sermon.plays.toLocaleString()}
                </Button>
                <DropdownMenu open={showShareMenu} onOpenChange={setShowShareMenu}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" data-testid="button-share">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={handleCopyLink}>
                      {copiedLink ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copiedLink ? "Copied!" : "Copy Link"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleWebShare}>
                      <Share className="h-4 w-4 mr-2" />Share via App
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" data-testid="button-comments-count">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {mockComments.length}
                </Button>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{sermon.passage}</Badge>
                {sermon.series && <Badge variant="secondary">{sermon.series}</Badge>}
                <Badge variant="secondary">{sermon.category}</Badge>
                <Badge variant="outline">{sermon.topic}</Badge>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>Date: {sermon.date}</p>
                <p>Duration: {sermon.duration}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span>{sermon.rating}</span>
                  <span className="text-muted-foreground">({sermon.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs for Comments/Notes */}
          <div className="border-b mb-4">
            <div className="flex gap-4">
              <button
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === "player" 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("player")}
                data-testid="tab-player"
              >
                <AudioLines className="h-4 w-4 inline mr-1.5" />
                Now Playing
              </button>
              <button
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === "comments" 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("comments")}
                data-testid="tab-comments"
              >
                <MessageSquare className="h-4 w-4 inline mr-1.5" />
                Comments ({comments.length})
              </button>
              <button
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === "notes" 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("notes")}
                data-testid="tab-notes"
              >
                <Quote className="h-4 w-4 inline mr-1.5" />
                Notes
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "player" && (
              <motion.div
                key="player"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Player Controls Section */}
                <div className="space-y-6">
                  {/* Waveform Visualization */}
                  <AudioWaveform isPlaying={isPlaying} progress={progress} />

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Slider
                      value={[progress]}
                      max={100}
                      step={0.1}
                      onValueChange={(value) => onSeek(Math.floor((value[0] / 100) * sermon.durationSeconds))}
                      className="cursor-pointer"
                      data-testid="slider-progress"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatTime(currentTime)}</span>
                      <span>{sermon.duration}</span>
                    </div>
                  </div>

                  {/* Main Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={onShuffleToggle}
                      className={isShuffled ? "text-primary" : ""}
                      data-testid="button-shuffle"
                    >
                      <Shuffle className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onSeek(Math.max(0, currentTime - 15))}
                      data-testid="button-rewind"
                    >
                      <RotateCcw className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={onPrevious}
                      data-testid="button-previous"
                    >
                      <SkipBack className="h-6 w-6" />
                    </Button>
                    <Button 
                      size="icon" 
                      className="h-14 w-14 rounded-full shadow-lg"
                      onClick={onPlayPause}
                      data-testid="button-play-controls"
                    >
                      {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={onNext}
                      data-testid="button-next"
                    >
                      <SkipForward className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onSeek(Math.min(sermon.durationSeconds, currentTime + 15))}
                      data-testid="button-forward"
                    >
                      <RotateCw className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={onRepeatChange}
                      className={repeatMode !== "off" ? "text-primary" : ""}
                      data-testid="button-repeat"
                    >
                      {repeatMode === "one" ? <Repeat1 className="h-5 w-5" /> : <Repeat className="h-5 w-5" />}
                    </Button>
                  </div>

                  {/* Volume and Speed Controls */}
                  <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
                    <Button variant="ghost" size="icon" onClick={onMuteToggle} data-testid="button-mute">
                      {isMuted ? <VolumeX className="h-5 w-5" /> : volume[0] < 50 ? <Volume1 className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    <Slider 
                      value={isMuted ? [0] : volume} 
                      max={100} 
                      className="flex-1" 
                      onValueChange={onVolumeChange}
                      data-testid="slider-volume"
                    />
                    <Select value={playbackSpeed} onValueChange={onSpeedChange}>
                      <SelectTrigger className="w-20" data-testid="select-speed">
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
                  </div>
                </div>
              </motion.div>
            )}

          {activeTab === "comments" && (
            <motion.div
              key="comments"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              <div className="p-4 md:p-6 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Comments</h3>
                    <Badge variant="secondary" className="text-xs">{mockComments.length}</Badge>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                    data-testid="input-comment"
                  />
                  <Button 
                    size="sm" 
                    disabled={!newComment.trim()}
                    onClick={() => {
                      onShowToast("Comment Posted", "Your comment has been added.");
                      setNewComment("");
                    }}
                    data-testid="button-post-comment"
                  >
                    Post
                  </Button>
                </div>

                <ScrollArea className="flex-1">
                  <div className="space-y-4 pr-2">
                    {mockComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3" data-testid={`comment-${comment.id}`}>
                        <Avatar className="h-9 w-9 flex-shrink-0">
                          <AvatarImage src={comment.userAvatar} />
                          <AvatarFallback>{comment.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm">{comment.userName}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-foreground mt-1">{comment.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                              <Heart className="h-3.5 w-3.5" />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>{comment.replies} replies</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </motion.div>
          )}

          {activeTab === "notes" && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              <div className="p-4 md:p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Quote className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Your Notes</h3>
                </div>
                <Textarea
                  placeholder="Write your notes, reflections, and takeaways from this sermon..."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="flex-1 min-h-[200px] resize-none"
                  data-testid="textarea-notes"
                />
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-muted-foreground">
                    {userNotes.length} characters
                  </p>
                  <Button size="sm" disabled={!userNotes.trim()} data-testid="button-save-notes">
                    <Check className="h-4 w-4 mr-1" />Save Notes
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Mini player bar at bottom */}
      {activeTab !== "player" && (
        <div className="border-t p-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
            <img src={sermon.image} alt={sermon.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{sermon.title}</p>
            <Progress value={progress} className="h-1 mt-1" />
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => onSeek(Math.max(0, currentTime - 15))}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="icon" className="rounded-full" onClick={onPlayPause} data-testid="button-play-mini">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onSeek(Math.min(sermon.durationSeconds, currentTime + 15))}>
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AudioPage() {
  const { toast } = useToast();
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
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [audioQuality, setAudioQuality] = useState("high");
  const [activeTab, setActiveTab] = useState("library");
  const [showQueueSheet, setShowQueueSheet] = useState(false);
  const [showPlayerSheet, setShowPlayerSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [comments, setComments] = useState(mockComments);
  
  const showToast = (title: string, description?: string) => {
    toast({ title, description });
  };
  
  const addComment = (content: string) => {
    const newComment = {
      id: Date.now(),
      userId: 0,
      userName: "You",
      userAvatar: "",
      content,
      timestamp: "Just now",
      likes: 0,
      replies: 0,
    };
    setComments(prev => [newComment, ...prev]);
  };
  
  // Sermon reactions state (persisted across player open/close)
  const [sermonReactions, setSermonReactions] = useState<Record<number, { liked: boolean; bookmarked: boolean }>>(() => {
    const initial: Record<number, { liked: boolean; bookmarked: boolean }> = {};
    mockSermons.forEach(s => {
      initial[s.id] = { liked: s.liked, bookmarked: s.bookmarked };
    });
    return initial;
  });

  const isCurrentSermonLiked = sermonReactions[selectedSermon.id]?.liked || false;
  const isCurrentSermonBookmarked = sermonReactions[selectedSermon.id]?.bookmarked || false;

  const toggleLike = () => {
    setSermonReactions(prev => ({
      ...prev,
      [selectedSermon.id]: {
        ...prev[selectedSermon.id],
        liked: !prev[selectedSermon.id]?.liked
      }
    }));
  };

  const toggleBookmark = () => {
    setSermonReactions(prev => ({
      ...prev,
      [selectedSermon.id]: {
        ...prev[selectedSermon.id],
        bookmarked: !prev[selectedSermon.id]?.bookmarked
      }
    }));
  };

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

  const handleSermonClick = (sermon: typeof mockSermons[0]) => {
    setSelectedSermon(sermon);
    setCurrentTime(0);
    setShowFullPlayer(true);
    setIsPlaying(true);
  };

  const handleNextSermon = () => {
    const currentIndex = mockSermons.findIndex(s => s.id === selectedSermon.id);
    const nextIndex = (currentIndex + 1) % mockSermons.length;
    setSelectedSermon(mockSermons[nextIndex]);
    setCurrentTime(0);
  };

  const handlePreviousSermon = () => {
    const currentIndex = mockSermons.findIndex(s => s.id === selectedSermon.id);
    const prevIndex = currentIndex === 0 ? mockSermons.length - 1 : currentIndex - 1;
    setSelectedSermon(mockSermons[prevIndex]);
    setCurrentTime(0);
  };

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= selectedSermon.durationSeconds) {
          if (repeatMode === "one") {
            return 0;
          } else if (repeatMode === "all") {
            handleNextSermon();
            return 0;
          } else {
            setIsPlaying(false);
            return prev;
          }
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, selectedSermon.durationSeconds, repeatMode]);

  const QueuePanel = () => (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Up Next</h4>
      {mockQueue.map((sermon, i) => (
        <div 
          key={sermon.id} 
          className="flex items-center gap-3 p-2 rounded-lg hover-elevate cursor-pointer group"
          onClick={() => handleSermonClick(sermon)}
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  const SermonCard = ({ sermon }: { sermon: typeof mockSermons[0] }) => {
    const isBookmarked = sermonReactions[sermon.id]?.bookmarked || false;
    
    const handleBookmarkClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSermonReactions(prev => ({
        ...prev,
        [sermon.id]: {
          ...prev[sermon.id],
          bookmarked: !prev[sermon.id]?.bookmarked
        }
      }));
    };

    return (
      <Card 
        className="cursor-pointer hover-elevate transition-all"
        onClick={() => handleSermonClick(sermon)}
        data-testid={`card-sermon-${sermon.id}`}
      >
        <CardContent className="p-3 md:p-4">
          <div className="flex gap-3 md:gap-4">
            <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-lg overflow-hidden flex-shrink-0 group">
              <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                </div>
              </div>
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
              <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{sermon.date}</span>
                  <span className="hidden sm:inline">|</span>
                  <span className="hidden sm:inline">{sermon.plays.toLocaleString()} plays</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBookmarkClick}>
                    {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
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
  };

  if (showFullPlayer) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        <FullPagePlayer
          sermon={selectedSermon}
          isPlaying={isPlaying}
          currentTime={currentTime}
          volume={volume}
          isMuted={isMuted}
          playbackSpeed={playbackSpeed}
          repeatMode={repeatMode}
          isShuffled={isShuffled}
          isLiked={isCurrentSermonLiked}
          isBookmarked={isCurrentSermonBookmarked}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onSeek={setCurrentTime}
          onVolumeChange={setVolume}
          onMuteToggle={() => setIsMuted(!isMuted)}
          onSpeedChange={setPlaybackSpeed}
          onRepeatChange={() => setRepeatMode(repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off")}
          onShuffleToggle={() => setIsShuffled(!isShuffled)}
          onLikeToggle={toggleLike}
          onBookmarkToggle={toggleBookmark}
          onClose={() => setShowFullPlayer(false)}
          onNext={handleNextSermon}
          onPrevious={handlePreviousSermon}
          formatTime={formatTime}
          onShowToast={showToast}
          comments={comments}
          onAddComment={addComment}
        />
      </div>
    );
  }

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
                      <Card key={series.id} className="cursor-pointer overflow-hidden hover-elevate" data-testid={`card-series-${series.id}`}>
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
                      <Card key={preacher.id} className="cursor-pointer hover-elevate" data-testid={`card-preacher-${preacher.id}`}>
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
                      <Card key={church.id} className="cursor-pointer hover-elevate" data-testid={`card-church-${church.id}`}>
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
                <div className="flex items-center justify-between mb-4 gap-2">
                  <h2 className="text-base md:text-lg font-semibold">Your Playlists</h2>
                  <Button size="sm" data-testid="button-create-playlist">
                    <Plus className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Create</span>
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100%-3rem)]">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pr-4">
                    {mockPlaylists.map(playlist => (
                      <Card key={playlist.id} className="cursor-pointer group hover-elevate" data-testid={`card-playlist-${playlist.id}`}>
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
                          <Card 
                            key={sermon.id} 
                            className="cursor-pointer hover-elevate" 
                            onClick={() => handleSermonClick(sermon)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0 relative group">
                                  <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Play className="h-5 w-5 text-white" />
                                  </div>
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
                          <Card 
                            key={sermon.id} 
                            className="cursor-pointer hover-elevate" 
                            onClick={() => handleSermonClick(sermon)}
                          >
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
            <div 
              className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer hover-elevate rounded-lg p-1 -m-1"
              onClick={() => setShowFullPlayer(true)}
              data-testid="button-expand-player"
            >
              <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img src={selectedSermon.image} alt={selectedSermon.title} className="h-full w-full object-cover" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <AudioLines className="h-5 w-5 text-white" />
                    </motion.div>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-sm truncate">{selectedSermon.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{selectedSermon.preacher}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); toggleBookmark(); }}>
                  {isCurrentSermonBookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); toggleLike(); }}>
                  <Heart className={`h-4 w-4 ${isCurrentSermonLiked ? "fill-primary text-primary" : ""}`} />
                </Button>
              </div>
            </div>

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
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setShowFullPlayer(true)}
                data-testid="button-maximize-player"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Player */}
          <div className="md:hidden">
            <div 
              className="flex items-center gap-3 p-2 -m-2 cursor-pointer rounded-lg"
              onClick={() => setShowFullPlayer(true)}
            >
              <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img src={selectedSermon.image} alt={selectedSermon.title} className="h-full w-full object-cover" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <AudioLines className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                )}
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
          </div>
        </div>
      </div>

    </Layout>
  );
}
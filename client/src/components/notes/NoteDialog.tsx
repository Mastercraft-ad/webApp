import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RichTextEditor } from './RichTextEditor'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Plus, BookOpen, ChevronRight } from 'lucide-react'
import type { Note, Category, Tag } from '@shared/schema'

interface NoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  note?: Note | null
  categories: Category[]
  tags: Tag[]
  onSave: (data: any) => void
  onCreateCategory: (name: string, color: string) => void
  onCreateTag: (name: string) => void
}

const COLOR_OPTIONS = [
  { value: 'yellow', label: 'Yellow', class: 'bg-yellow-100 border-yellow-200 text-yellow-800' },
  { value: 'blue', label: 'Blue', class: 'bg-blue-100 border-blue-200 text-blue-800' },
  { value: 'green', label: 'Green', class: 'bg-green-100 border-green-200 text-green-800' },
  { value: 'red', label: 'Red', class: 'bg-red-100 border-red-200 text-red-800' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-100 border-purple-200 text-purple-800' },
  { value: 'pink', label: 'Pink', class: 'bg-pink-100 border-pink-200 text-pink-800' },
  { value: 'gray', label: 'Gray', class: 'bg-gray-100 border-gray-200 text-gray-800' },
]

const TEMPLATE_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'sermon', label: 'Sermon Notes' },
  { value: 'study', label: 'Bible Study' },
  { value: 'devotional', label: 'Devotional' },
  { value: 'prayer', label: 'Prayer Request' },
]

// Bible books for verse linking
const BIBLE_BOOKS = [
  // Old Testament
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
  'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
  'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai',
  'Zechariah', 'Malachi',
  // New Testament
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
  'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
  'Jude', 'Revelation',
]

// Chapter counts per book (simplified - using common counts)
const CHAPTER_COUNTS: Record<string, number> = {
  'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
  'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
  '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
  'Ezra': 10, 'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150, 'Proverbs': 31,
  'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66, 'Jeremiah': 52, 'Lamentations': 5,
  'Ezekiel': 48, 'Daniel': 12, 'Hosea': 14, 'Joel': 3, 'Amos': 9, 'Obadiah': 1,
  'Jonah': 4, 'Micah': 7, 'Nahum': 3, 'Habakkuk': 3, 'Zephaniah': 3, 'Haggai': 2,
  'Zechariah': 14, 'Malachi': 4,
  'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28,
  'Romans': 16, '1 Corinthians': 16, '2 Corinthians': 13, 'Galatians': 6, 'Ephesians': 6,
  'Philippians': 4, 'Colossians': 4, '1 Thessalonians': 5, '2 Thessalonians': 3,
  '1 Timothy': 6, '2 Timothy': 4, 'Titus': 3, 'Philemon': 1, 'Hebrews': 13,
  'James': 5, '1 Peter': 5, '2 Peter': 3, '1 John': 5, '2 John': 1, '3 John': 1,
  'Jude': 1, 'Revelation': 22,
}

interface VerseLink {
  id: string
  book: string
  chapter: number
  verse?: number
  verseEnd?: number
}

export function NoteDialog({
  open,
  onOpenChange,
  note,
  categories,
  tags,
  onSave,
  onCreateCategory,
  onCreateTag,
}: NoteDialogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [color, setColor] = useState('')
  const [template, setTemplate] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTagName, setNewTagName] = useState('')
  
  // Verse linking state
  const [verseLinks, setVerseLinks] = useState<VerseLink[]>([])
  const [verseLinkOpen, setVerseLinkOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState('')
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)
  const [selectedVerse, setSelectedVerse] = useState('')
  const [selectedVerseEnd, setSelectedVerseEnd] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setCategoryId(note.categoryId || '')
      setColor(note.color || '')
      setTemplate(note.template || '')
      // Mock verse links for editing
      setVerseLinks([])
    } else {
      setTitle('')
      setContent('')
      setCategoryId('')
      setColor('')
      setTemplate('')
      setSelectedTags([])
      setVerseLinks([])
    }
  }, [note, open])

  const handleSave = () => {
    onSave({
      title,
      content,
      categoryId: categoryId || null,
      color: color || null,
      template: template || null,
      isStandalone: false,
      tags: selectedTags,
      verseLinks, // Include verse links in save data
    })
    onOpenChange(false)
  }

  const handleAddTag = () => {
    if (newTagName.trim()) {
      onCreateTag(newTagName.trim())
      setNewTagName('')
    }
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }
  
  // Verse linking functions
  const handleAddVerseLink = () => {
    if (selectedBook && selectedChapter) {
      const newLink: VerseLink = {
        id: Date.now().toString(),
        book: selectedBook,
        chapter: selectedChapter,
        verse: selectedVerse ? parseInt(selectedVerse) : undefined,
        verseEnd: selectedVerseEnd ? parseInt(selectedVerseEnd) : undefined,
      }
      setVerseLinks(prev => [...prev, newLink])
      // Reset selections
      setSelectedBook('')
      setSelectedChapter(null)
      setSelectedVerse('')
      setSelectedVerseEnd('')
      setVerseLinkOpen(false)
    }
  }
  
  const handleRemoveVerseLink = (id: string) => {
    setVerseLinks(prev => prev.filter(link => link.id !== id))
  }
  
  const formatVerseLink = (link: VerseLink) => {
    let ref = `${link.book} ${link.chapter}`
    if (link.verse) {
      ref += `:${link.verse}`
      if (link.verseEnd && link.verseEnd > link.verse) {
        ref += `-${link.verseEnd}`
      }
    }
    return ref
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle data-testid="text-note-dialog-title">
            {note ? 'Edit Note' : 'Create New Note'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              data-testid="input-note-title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger id="category" data-testid="select-note-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Category</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger id="color" data-testid="select-note-color">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Color</SelectItem>
                  {COLOR_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger id="template" data-testid="select-note-template">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Verse Linking Section */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Linked Bible Verses
            </Label>
            
            {/* Display linked verses */}
            {verseLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {verseLinks.map(link => (
                  <Badge 
                    key={link.id} 
                    variant="secondary" 
                    className="gap-1 pr-1"
                    data-testid={`badge-verse-${link.id}`}
                  >
                    <BookOpen className="h-3 w-3" />
                    {formatVerseLink(link)}
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleRemoveVerseLink(link.id)}
                      data-testid={`button-remove-verse-${link.id}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Add verse link popover */}
            <Popover open={verseLinkOpen} onOpenChange={setVerseLinkOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  data-testid="button-add-verse-link"
                >
                  <Plus className="h-4 w-4" />
                  Link a Bible Verse
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-3">
                  <div className="font-medium text-sm">Select Bible Reference</div>
                  
                  {/* Book Selection */}
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Book</Label>
                    <Select value={selectedBook} onValueChange={(v) => { setSelectedBook(v); setSelectedChapter(null); }}>
                      <SelectTrigger data-testid="select-verse-book">
                        <SelectValue placeholder="Select book" />
                      </SelectTrigger>
                      <SelectContent>
                        <ScrollArea className="h-60">
                          {BIBLE_BOOKS.map(book => (
                            <SelectItem key={book} value={book}>{book}</SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Chapter Selection */}
                  {selectedBook && (
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Chapter</Label>
                      <Select 
                        value={selectedChapter?.toString() || ''} 
                        onValueChange={(v) => setSelectedChapter(parseInt(v))}
                      >
                        <SelectTrigger data-testid="select-verse-chapter">
                          <SelectValue placeholder="Select chapter" />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="h-40">
                            {Array.from({ length: CHAPTER_COUNTS[selectedBook] || 1 }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                Chapter {i + 1}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {/* Verse Range */}
                  {selectedChapter && (
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Verse (optional)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          placeholder="From"
                          value={selectedVerse}
                          onChange={(e) => setSelectedVerse(e.target.value)}
                          className="w-20"
                          data-testid="input-verse-start"
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                          type="number"
                          min="1"
                          placeholder="To"
                          value={selectedVerseEnd}
                          onChange={(e) => setSelectedVerseEnd(e.target.value)}
                          className="w-20"
                          data-testid="input-verse-end"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Preview and Add button */}
                  {selectedBook && selectedChapter && (
                    <div className="pt-2 border-t border-border">
                      <div className="text-sm mb-2 flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-muted-foreground">Preview:</span>
                        <span className="font-medium">
                          {selectedBook} {selectedChapter}
                          {selectedVerse && `:${selectedVerse}`}
                          {selectedVerseEnd && selectedVerse && `-${selectedVerseEnd}`}
                        </span>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        className="w-full"
                        onClick={handleAddVerseLink}
                        data-testid="button-confirm-verse-link"
                      >
                        Add Verse Link
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
                  className="cursor-pointer hover-elevate"
                  onClick={() => toggleTag(tag.id)}
                  data-testid={`badge-tag-${tag.name}`}
                >
                  {tag.name}
                  {selectedTags.includes(tag.id) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="New tag name..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                data-testid="input-new-tag"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleAddTag}
                data-testid="button-add-tag"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel-note"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} data-testid="button-save-note">
            {note ? 'Update Note' : 'Create Note'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

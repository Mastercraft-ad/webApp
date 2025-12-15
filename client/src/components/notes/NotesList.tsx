import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { queryClient, apiRequest } from '@/lib/queryClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
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
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  FileText, 
  Plus, 
  MoreHorizontal, 
  Search, 
  Edit, 
  Trash, 
  Download, 
  Layers,
  Star,
  StarOff,
  CheckSquare,
  Square,
  X,
  Filter,
  Calendar as CalendarIcon,
  Share2,
  Users,
  FolderInput,
  Tag,
  BookOpen,
} from 'lucide-react'
import { NoteDialog } from './NoteDialog'
import type { Note, Category, Tag as TagType } from '@shared/schema'
import { formatDistanceToNow, format } from 'date-fns'

const COLOR_MAP: Record<string, string> = {
  yellow: 'bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-100',
  blue: 'bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100',
  green: 'bg-green-100 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-100',
  red: 'bg-red-100 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-100',
  purple: 'bg-purple-100 border-purple-200 text-purple-800 dark:bg-purple-900 dark:border-purple-700 dark:text-purple-100',
  pink: 'bg-pink-100 border-pink-200 text-pink-800 dark:bg-pink-900 dark:border-pink-700 dark:text-pink-100',
  gray: 'bg-gray-100 border-gray-200 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100',
}

const COLOR_OPTIONS = ['yellow', 'blue', 'green', 'red', 'purple', 'pink', 'gray']

interface NotesListProps {
  verseReference?: string
}

interface MockVerseLink {
  id: string
  book: string
  chapter: number
  verse?: number
  verseEnd?: number
}

interface MockShare {
  id: string
  email: string
  name: string
  avatar?: string
  permission: 'view' | 'edit'
}

export function NotesList({ verseReference }: NotesListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  
  // Advanced Filters State
  const [showFilters, setShowFilters] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [filterTag, setFilterTag] = useState<string>('')
  const [filterColor, setFilterColor] = useState<string>('')
  const [filterDateFrom, setFilterDateFrom] = useState<Date | undefined>()
  const [filterDateTo, setFilterDateTo] = useState<Date | undefined>()
  
  // Favorites/Pinned State (mockup - local state)
  const [pinnedNotes, setPinnedNotes] = useState<Set<string>>(new Set(['mock-pinned-1']))
  
  // Bulk Operations State
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set())
  
  // Share Dialog State
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [sharingNote, setSharingNote] = useState<Note | null>(null)
  const [shareEmail, setShareEmail] = useState('')
  const [sharePermission, setSharePermission] = useState<'view' | 'edit'>('view')
  // Mock shares scoped per note
  const [mockSharesPerNote, setMockSharesPerNote] = useState<Record<string, MockShare[]>>({
    'demo-note': [
      { id: '1', email: 'john@example.com', name: 'John Doe', permission: 'edit' },
      { id: '2', email: 'jane@example.com', name: 'Jane Smith', permission: 'view' },
    ]
  })
  
  // Mock verse links for demo (scoped per note)
  const [mockVerseLinks] = useState<Record<string, MockVerseLink[]>>({
    'demo-note': [
      { id: '1', book: 'John', chapter: 3, verse: 16 },
      { id: '2', book: 'Romans', chapter: 8, verse: 28, verseEnd: 30 },
    ]
  })

  const { data: notes = [], isLoading: notesLoading } = useQuery<Note[]>({
    queryKey: ['/api/notes'],
  })

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  })

  const { data: tags = [] } = useQuery<TagType[]>({
    queryKey: ['/api/tags'],
  })

  const createNoteMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest('POST', '/api/notes', data)
      const note = await res.json()
      
      if (data.tags && data.tags.length > 0) {
        for (const tagId of data.tags) {
          await apiRequest('POST', `/api/notes/${note.id}/tags/${tagId}`)
        }
      }
      
      return note
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] })
    },
  })

  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await apiRequest('PATCH', `/api/notes/${id}`, data)
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] })
    },
  })

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/notes/${id}`)
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notes'] })
    },
  })

  const createCategoryMutation = useMutation({
    mutationFn: async ({ name, color }: { name: string; color: string }) => {
      const res = await apiRequest('POST', '/api/categories', { name, color })
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] })
    },
  })

  const createTagMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await apiRequest('POST', '/api/tags', { name })
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tags'] })
    },
  })

  const handleSaveNote = (data: any) => {
    if (editingNote) {
      updateNoteMutation.mutate({ id: editingNote.id, data })
    } else {
      createNoteMutation.mutate(data)
    }
    setEditingNote(null)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setDialogOpen(true)
  }

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNoteMutation.mutate(id)
    }
  }

  const handleCreateCategory = (name: string, color: string) => {
    createCategoryMutation.mutate({ name, color })
  }

  const handleCreateTag = (name: string) => {
    createTagMutation.mutate(name)
  }
  
  // Favorites/Pin handlers
  const togglePin = (noteId: string) => {
    setPinnedNotes(prev => {
      const next = new Set(prev)
      if (next.has(noteId)) {
        next.delete(noteId)
      } else {
        next.add(noteId)
      }
      return next
    })
  }
  
  // Bulk selection handlers
  const toggleSelectNote = (noteId: string) => {
    setSelectedNotes(prev => {
      const next = new Set(prev)
      if (next.has(noteId)) {
        next.delete(noteId)
      } else {
        next.add(noteId)
      }
      return next
    })
  }
  
  const selectAllNotes = () => {
    setSelectedNotes(new Set(filteredNotes.map(n => n.id)))
  }
  
  const deselectAllNotes = () => {
    setSelectedNotes(new Set())
  }
  
  // MOCKUP: Bulk delete just shows confirmation, doesn't actually delete
  const handleBulkDelete = () => {
    if (confirm(`[MOCKUP] This would delete ${selectedNotes.size} notes. In production, this action would permanently remove these notes.`)) {
      // Mockup - just clear selection without actually deleting
      setSelectedNotes(new Set())
      setSelectionMode(false)
      alert(`[MOCKUP] ${selectedNotes.size} notes would be deleted. This is a UI demonstration.`)
    }
  }
  
  // Share handlers (mockup - scoped per note)
  const openShareDialog = (note: Note) => {
    setSharingNote(note)
    setShareDialogOpen(true)
  }
  
  // Get shares for the current note being shared
  const getCurrentNoteShares = (): MockShare[] => {
    if (!sharingNote) return []
    return mockSharesPerNote[sharingNote.id] || []
  }
  
  const handleAddShare = () => {
    if (shareEmail.trim() && sharingNote) {
      setMockSharesPerNote(prev => ({
        ...prev,
        [sharingNote.id]: [
          ...(prev[sharingNote.id] || []),
          {
            id: Date.now().toString(),
            email: shareEmail,
            name: shareEmail.split('@')[0],
            permission: sharePermission
          }
        ]
      }))
      setShareEmail('')
    }
  }
  
  const handleRemoveShare = (shareId: string) => {
    if (!sharingNote) return
    setMockSharesPerNote(prev => ({
      ...prev,
      [sharingNote.id]: (prev[sharingNote.id] || []).filter(s => s.id !== shareId)
    }))
  }
  
  // Clear filters
  const clearFilters = () => {
    setFilterCategory('')
    setFilterTag('')
    setFilterColor('')
    setFilterDateFrom(undefined)
    setFilterDateTo(undefined)
  }
  
  const hasActiveFilters = filterCategory || filterTag || filterColor || filterDateFrom || filterDateTo

  // Filter notes
  let filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Apply advanced filters
  if (filterCategory) {
    filteredNotes = filteredNotes.filter(n => n.categoryId === filterCategory)
  }
  if (filterColor) {
    filteredNotes = filteredNotes.filter(n => n.color === filterColor)
  }
  if (filterDateFrom) {
    filteredNotes = filteredNotes.filter(n => new Date(n.createdAt) >= filterDateFrom)
  }
  if (filterDateTo) {
    filteredNotes = filteredNotes.filter(n => new Date(n.createdAt) <= filterDateTo)
  }
  
  // Separate pinned and regular notes
  const pinnedNotesList = filteredNotes.filter(n => pinnedNotes.has(n.id))
  const regularNotes = filteredNotes.filter(n => !pinnedNotes.has(n.id))

  const renderNoteCard = (note: Note, isPinned: boolean = false) => (
    <div
      key={note.id}
      className={`border border-border rounded-lg p-3 bg-card shadow-sm hover-elevate ${
        selectedNotes.has(note.id) ? 'ring-2 ring-primary' : ''
      }`}
      data-testid={`card-note-${note.id}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {selectionMode && (
            <Checkbox
              checked={selectedNotes.has(note.id)}
              onCheckedChange={() => toggleSelectNote(note.id)}
              data-testid={`checkbox-note-${note.id}`}
            />
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => togglePin(note.id)}
            data-testid={`button-pin-note-${note.id}`}
          >
            {pinnedNotes.has(note.id) ? (
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            ) : (
              <StarOff className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
          {note.color && (
            <Badge
              variant="outline"
              className={COLOR_MAP[note.color] || 'bg-gray-100 border-gray-200 text-gray-800'}
              data-testid={`badge-note-color-${note.color}`}
            >
              {note.title}
            </Badge>
          )}
          {!note.color && (
            <span className="font-medium text-sm">{note.title}</span>
          )}
          <span className="text-xs text-muted-foreground" data-testid={`text-note-time-${note.id}`}>
            {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-6 w-6 p-0"
              data-testid={`button-note-menu-${note.id}`}
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleEditNote(note)}
              data-testid={`menu-edit-note-${note.id}`}
            >
              <Edit className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openShareDialog(note)}
              data-testid={`menu-share-note-${note.id}`}
            >
              <Share2 className="h-4 w-4 mr-2" /> Share
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => togglePin(note.id)}
              data-testid={`menu-pin-note-${note.id}`}
            >
              {pinnedNotes.has(note.id) ? (
                <>
                  <StarOff className="h-4 w-4 mr-2" /> Unpin
                </>
              ) : (
                <>
                  <Star className="h-4 w-4 mr-2" /> Pin
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDeleteNote(note.id)}
              className="text-destructive"
              data-testid={`menu-delete-note-${note.id}`}
            >
              <Trash className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Verse Links Display */}
      {mockVerseLinks[note.id] && mockVerseLinks[note.id].length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {mockVerseLinks[note.id].map(link => (
            <Badge 
              key={link.id} 
              variant="secondary" 
              className="text-xs cursor-pointer"
              data-testid={`badge-verse-link-${link.id}`}
            >
              <BookOpen className="h-3 w-3 mr-1" />
              {link.book} {link.chapter}:{link.verse}
              {link.verseEnd && `-${link.verseEnd}`}
            </Badge>
          ))}
        </div>
      )}
      
      <div
        className="text-sm text-foreground/90 mb-2 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: note.content }}
        data-testid={`text-note-content-${note.id}`}
      />
      
      {/* Shared with indicator - show for notes that have shares */}
      {mockSharesPerNote[note.id] && mockSharesPerNote[note.id].length > 0 && (
        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Shared with {mockSharesPerNote[note.id].length} people</span>
          <div className="flex -space-x-2 ml-1">
            {mockSharesPerNote[note.id].slice(0, 3).map(share => (
              <Avatar key={share.id} className="h-5 w-5 border-2 border-background">
                <AvatarFallback className="text-[8px]">{share.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex justify-between items-center gap-2">
        <h3 className="font-bold text-sm" data-testid="text-notes-title">My Notes</h3>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={selectionMode ? 'secondary' : 'ghost'}
            className="h-7 w-7 p-0"
            title={selectionMode ? 'Exit Selection Mode' : 'Select Multiple'}
            onClick={() => {
              setSelectionMode(!selectionMode)
              if (selectionMode) {
                setSelectedNotes(new Set())
              }
            }}
            data-testid="button-toggle-selection"
          >
            {selectionMode ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
            title="Export Notes"
            data-testid="button-export-notes"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={showFilters ? 'secondary' : 'outline'}
            className="h-7 text-xs gap-1"
            onClick={() => setShowFilters(!showFilters)}
            data-testid="button-filter-notes"
          >
            <Filter className="h-3 w-3" /> 
            Filter
            {hasActiveFilters && (
              <Badge variant="default" className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                {[filterCategory, filterTag, filterColor, filterDateFrom, filterDateTo].filter(Boolean).length}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      
      {/* Bulk Actions Bar */}
      {selectionMode && selectedNotes.size > 0 && (
        <div className="p-2 border-b border-border bg-muted/50 flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">{selectedNotes.size} selected</span>
          <div className="flex gap-1 ml-auto">
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={selectAllNotes} data-testid="button-select-all">
              Select All
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={deselectAllNotes} data-testid="button-deselect-all">
              Deselect All
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" data-testid="button-bulk-move">
              <FolderInput className="h-3 w-3" /> Move
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" data-testid="button-bulk-tag">
              <Tag className="h-3 w-3" /> Tag
            </Button>
            <Button size="sm" variant="destructive" className="h-7 text-xs gap-1" onClick={handleBulkDelete} data-testid="button-bulk-delete">
              <Trash className="h-3 w-3" /> Delete
            </Button>
          </div>
        </div>
      )}
      
      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="p-3 border-b border-border bg-muted/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Filters</span>
            {hasActiveFilters && (
              <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={clearFilters} data-testid="button-clear-filters">
                <X className="h-3 w-3 mr-1" /> Clear All
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="h-8 text-xs" data-testid="select-filter-category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Tag</Label>
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="h-8 text-xs" data-testid="select-filter-tag">
                  <SelectValue placeholder="All Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Tags</SelectItem>
                  {tags.map(tag => (
                    <SelectItem key={tag.id} value={tag.id}>{tag.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Color</Label>
              <Select value={filterColor} onValueChange={setFilterColor}>
                <SelectTrigger className="h-8 text-xs" data-testid="select-filter-color">
                  <SelectValue placeholder="All Colors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Colors</SelectItem>
                  {COLOR_OPTIONS.map(color => (
                    <SelectItem key={color} value={color}>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${COLOR_MAP[color]?.split(' ')[0]}`} />
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-8 w-full justify-start text-xs font-normal" data-testid="button-filter-date">
                    <CalendarIcon className="h-3 w-3 mr-2" />
                    {filterDateFrom || filterDateTo ? (
                      <>
                        {filterDateFrom ? format(filterDateFrom, 'MMM d') : 'Start'} - {filterDateTo ? format(filterDateTo, 'MMM d') : 'End'}
                      </>
                    ) : (
                      'Select dates'
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex gap-2 p-2">
                    <div>
                      <Label className="text-xs">From</Label>
                      <Calendar
                        mode="single"
                        selected={filterDateFrom}
                        onSelect={setFilterDateFrom}
                        className="rounded-md border"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">To</Label>
                      <Calendar
                        mode="single"
                        selected={filterDateTo}
                        onSelect={setFilterDateTo}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-1">
              {filterCategory && (
                <Badge variant="secondary" className="text-xs gap-1">
                  Category: {categories.find(c => c.id === filterCategory)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterCategory('')} />
                </Badge>
              )}
              {filterTag && (
                <Badge variant="secondary" className="text-xs gap-1">
                  Tag: {tags.find(t => t.id === filterTag)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterTag('')} />
                </Badge>
              )}
              {filterColor && (
                <Badge variant="secondary" className="text-xs gap-1">
                  Color: {filterColor}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setFilterColor('')} />
                </Badge>
              )}
              {(filterDateFrom || filterDateTo) && (
                <Badge variant="secondary" className="text-xs gap-1">
                  Date: {filterDateFrom ? format(filterDateFrom, 'MMM d') : 'Start'} - {filterDateTo ? format(filterDateTo, 'MMM d') : 'End'}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => { setFilterDateFrom(undefined); setFilterDateTo(undefined); }} />
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-notes"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {notesLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading notes...
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery || hasActiveFilters ? 'No notes found' : 'No notes yet. Create your first note!'}
            </div>
          ) : (
            <>
              {/* Pinned Notes Section */}
              {pinnedNotesList.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    PINNED ({pinnedNotesList.length})
                  </div>
                  {pinnedNotesList.map(note => renderNoteCard(note, true))}
                </div>
              )}
              
              {/* Regular Notes Section */}
              {regularNotes.length > 0 && (
                <div className="space-y-2">
                  {pinnedNotesList.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium pt-2">
                      ALL NOTES ({regularNotes.length})
                    </div>
                  )}
                  <div className="space-y-4">
                    {regularNotes.map(note => renderNoteCard(note, false))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-card">
        <Button
          className="w-full gap-2"
          onClick={() => {
            setEditingNote(null)
            setDialogOpen(true)
          }}
          data-testid="button-add-note"
        >
          <FileText className="h-4 w-4" /> Add New Note
        </Button>
      </div>

      <NoteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        note={editingNote}
        categories={categories}
        tags={tags}
        onSave={handleSaveNote}
        onCreateCategory={handleCreateCategory}
        onCreateTag={handleCreateTag}
      />
      
      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle data-testid="text-share-dialog-title">Share Note</DialogTitle>
            <DialogDescription>
              Invite others to view or edit this note
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter email address..."
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className="flex-1"
                data-testid="input-share-email"
              />
              <Select value={sharePermission} onValueChange={(v: 'view' | 'edit') => setSharePermission(v)}>
                <SelectTrigger className="w-24" data-testid="select-share-permission">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="edit">Edit</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddShare} data-testid="button-add-share">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Current Shares - scoped per note */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Shared with</Label>
              {getCurrentNoteShares().length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  Not shared with anyone yet
                </p>
              ) : (
                <div className="space-y-2">
                  {getCurrentNoteShares().map(share => (
                    <div key={share.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={share.avatar} />
                          <AvatarFallback>{share.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{share.name}</p>
                          <p className="text-xs text-muted-foreground">{share.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {share.permission === 'edit' ? 'Can Edit' : 'Can View'}
                        </Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => handleRemoveShare(share.id)}
                          data-testid={`button-remove-share-${share.id}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

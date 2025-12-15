import { useState, useRef } from 'react'
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { useToast } from '@/hooks/use-toast'
import { 
  FileText, 
  Plus, 
  MoreHorizontal, 
  Search, 
  Edit, 
  Trash, 
  Download, 
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
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Folder,
  FolderPlus,
  History,
  RotateCcw,
  Printer,
  Archive,
  ArchiveRestore,
  FileJson,
  FileDown,
  ChevronRight,
  FolderOpen,
  Pencil,
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

interface MockFolder {
  id: string
  name: string
  parentId: string | null
  noteIds: string[]
}

interface MockVersion {
  id: string
  noteId: string
  title: string
  content: string
  version: number
  createdAt: Date
}

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'category'

export function NotesList({ verseReference }: NotesListProps) {
  const { toast } = useToast()
  const printRef = useRef<HTMLDivElement>(null)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  
  // Sorting State
  const [sortOption, setSortOption] = useState<SortOption>('date-desc')
  
  // Advanced Filters State
  const [showFilters, setShowFilters] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [filterTag, setFilterTag] = useState<string>('')
  const [filterColor, setFilterColor] = useState<string>('')
  const [filterDateFrom, setFilterDateFrom] = useState<Date | undefined>()
  const [filterDateTo, setFilterDateTo] = useState<Date | undefined>()
  
  // Archive State
  const [showArchived, setShowArchived] = useState(false)
  const [archivedNotes, setArchivedNotes] = useState<Set<string>>(new Set())
  
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
  
  // Folder State
  const [folderDialogOpen, setFolderDialogOpen] = useState(false)
  const [editingFolder, setEditingFolder] = useState<MockFolder | null>(null)
  const [newFolderName, setNewFolderName] = useState('')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [folders, setFolders] = useState<MockFolder[]>([
    { id: 'folder-1', name: 'Bible Studies', parentId: null, noteIds: [] },
    { id: 'folder-2', name: 'Sermon Notes', parentId: null, noteIds: [] },
    { id: 'folder-3', name: 'Personal Devotions', parentId: null, noteIds: [] },
  ])
  const [moveToFolderDialogOpen, setMoveToFolderDialogOpen] = useState(false)
  const [noteToMove, setNoteToMove] = useState<Note | null>(null)
  
  // Version History State
  const [versionDialogOpen, setVersionDialogOpen] = useState(false)
  const [versionHistoryNote, setVersionHistoryNote] = useState<Note | null>(null)
  const [mockVersions, setMockVersions] = useState<Record<string, MockVersion[]>>({})
  
  // Export Dialog State
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [exportNote, setExportNote] = useState<Note | null>(null)

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
      // Save version before updating
      saveVersion(editingNote)
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
  
  // Version History Functions
  const saveVersion = (note: Note) => {
    const existingVersions = mockVersions[note.id] || []
    const newVersion: MockVersion = {
      id: Date.now().toString(),
      noteId: note.id,
      title: note.title,
      content: note.content,
      version: existingVersions.length + 1,
      createdAt: new Date(),
    }
    setMockVersions(prev => ({
      ...prev,
      [note.id]: [...(prev[note.id] || []), newVersion]
    }))
  }
  
  const openVersionHistory = (note: Note) => {
    setVersionHistoryNote(note)
    setVersionDialogOpen(true)
  }
  
  const restoreVersion = (version: MockVersion) => {
    if (versionHistoryNote) {
      updateNoteMutation.mutate({
        id: versionHistoryNote.id,
        data: { title: version.title, content: version.content }
      })
      toast({
        title: "Version Restored",
        description: `Restored to version ${version.version} from ${format(version.createdAt, 'MMM d, yyyy h:mm a')}`,
      })
      setVersionDialogOpen(false)
    }
  }
  
  // Archive Functions
  const toggleArchive = (noteId: string) => {
    setArchivedNotes(prev => {
      const next = new Set(prev)
      if (next.has(noteId)) {
        next.delete(noteId)
        toast({ title: "Note Unarchived", description: "Note has been restored from archive" })
      } else {
        next.add(noteId)
        toast({ title: "Note Archived", description: "Note has been moved to archive" })
      }
      return next
    })
  }
  
  // Export Functions
  const openExportDialog = (note: Note) => {
    setExportNote(note)
    setExportDialogOpen(true)
  }
  
  const exportAsMarkdown = (note: Note) => {
    const htmlToText = (html: string) => {
      const temp = document.createElement('div')
      temp.innerHTML = html
      return temp.textContent || temp.innerText || ''
    }
    
    const content = `# ${note.title}\n\n${htmlToText(note.content)}\n\n---\nCreated: ${format(new Date(note.createdAt), 'MMMM d, yyyy')}\nLast Updated: ${format(new Date(note.updatedAt), 'MMMM d, yyyy')}`
    
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${note.title.replace(/[^a-z0-9]/gi, '_')}.md`
    a.click()
    URL.revokeObjectURL(url)
    
    toast({ title: "Exported", description: "Note exported as Markdown" })
    setExportDialogOpen(false)
  }
  
  const exportAsJSON = (note: Note) => {
    const data = {
      title: note.title,
      content: note.content,
      color: note.color,
      template: note.template,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${note.title.replace(/[^a-z0-9]/gi, '_')}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    toast({ title: "Exported", description: "Note exported as JSON" })
    setExportDialogOpen(false)
  }
  
  const exportAsText = (note: Note) => {
    const htmlToText = (html: string) => {
      const temp = document.createElement('div')
      temp.innerHTML = html
      return temp.textContent || temp.innerText || ''
    }
    
    const content = `${note.title}\n${'='.repeat(note.title.length)}\n\n${htmlToText(note.content)}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${note.title.replace(/[^a-z0-9]/gi, '_')}.txt`
    a.click()
    URL.revokeObjectURL(url)
    
    toast({ title: "Exported", description: "Note exported as text file" })
    setExportDialogOpen(false)
  }
  
  // Print Function
  const printNote = (note: Note) => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${note.title}</title>
          <style>
            body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 20px; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .content { line-height: 1.6; }
            .meta { color: #666; font-size: 0.9em; margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; }
          </style>
        </head>
        <body>
          <h1>${note.title}</h1>
          <div class="content">${note.content}</div>
          <div class="meta">
            Created: ${format(new Date(note.createdAt), 'MMMM d, yyyy')} | 
            Last Updated: ${format(new Date(note.updatedAt), 'MMMM d, yyyy')}
          </div>
        </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }
  
  // Folder Functions
  const createFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: MockFolder = {
        id: `folder-${Date.now()}`,
        name: newFolderName.trim(),
        parentId: null,
        noteIds: [],
      }
      setFolders(prev => [...prev, newFolder])
      setNewFolderName('')
      setFolderDialogOpen(false)
      toast({ title: "Folder Created", description: `Created folder "${newFolder.name}"` })
    }
  }
  
  const renameFolder = () => {
    if (editingFolder && newFolderName.trim()) {
      setFolders(prev => prev.map(f => 
        f.id === editingFolder.id ? { ...f, name: newFolderName.trim() } : f
      ))
      setEditingFolder(null)
      setNewFolderName('')
      setFolderDialogOpen(false)
      toast({ title: "Folder Renamed", description: `Folder renamed to "${newFolderName.trim()}"` })
    }
  }
  
  const deleteFolder = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId)
    if (folder && confirm(`Delete folder "${folder.name}"? Notes in this folder will not be deleted.`)) {
      setFolders(prev => prev.filter(f => f.id !== folderId))
      if (selectedFolder === folderId) {
        setSelectedFolder(null)
      }
      toast({ title: "Folder Deleted", description: `Folder "${folder.name}" has been deleted` })
    }
  }
  
  const moveNoteToFolder = (noteId: string, folderId: string | null) => {
    setFolders(prev => prev.map(f => ({
      ...f,
      noteIds: f.id === folderId 
        ? [...f.noteIds.filter(id => id !== noteId), noteId]
        : f.noteIds.filter(id => id !== noteId)
    })))
    setMoveToFolderDialogOpen(false)
    setNoteToMove(null)
    toast({ 
      title: folderId ? "Note Moved" : "Note Removed from Folder", 
      description: folderId 
        ? `Note moved to "${folders.find(f => f.id === folderId)?.name}"`
        : "Note removed from folder"
    })
  }
  
  const openMoveDialog = (note: Note) => {
    setNoteToMove(note)
    setMoveToFolderDialogOpen(true)
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
    setSelectedNotes(new Set(displayedNotes.map(n => n.id)))
  }
  
  const deselectAllNotes = () => {
    setSelectedNotes(new Set())
  }
  
  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedNotes.size} notes? This action cannot be undone.`)) {
      selectedNotes.forEach(id => deleteNoteMutation.mutate(id))
      setSelectedNotes(new Set())
      setSelectionMode(false)
      toast({ title: "Notes Deleted", description: `${selectedNotes.size} notes have been deleted` })
    }
  }
  
  const handleBulkArchive = () => {
    const count = selectedNotes.size
    setArchivedNotes(prev => {
      const next = new Set(prev)
      selectedNotes.forEach(id => next.add(id))
      return next
    })
    setSelectedNotes(new Set())
    setSelectionMode(false)
    toast({ title: "Notes Archived", description: `${count} notes have been archived` })
  }
  
  // Share handlers (mockup - scoped per note)
  const openShareDialog = (note: Note) => {
    setSharingNote(note)
    setShareDialogOpen(true)
  }
  
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
      toast({ title: "Share Added", description: `Shared with ${shareEmail}` })
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
  
  // Filter by archive status
  if (showArchived) {
    filteredNotes = filteredNotes.filter(n => archivedNotes.has(n.id))
  } else {
    filteredNotes = filteredNotes.filter(n => !archivedNotes.has(n.id))
  }
  
  // Filter by folder
  if (selectedFolder) {
    const folder = folders.find(f => f.id === selectedFolder)
    if (folder) {
      filteredNotes = filteredNotes.filter(n => folder.noteIds.includes(n.id))
    }
  }
  
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
  
  // Sort notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortOption) {
      case 'date-desc':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case 'date-asc':
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      case 'title-asc':
        return a.title.localeCompare(b.title)
      case 'title-desc':
        return b.title.localeCompare(a.title)
      case 'category':
        return (a.categoryId || '').localeCompare(b.categoryId || '')
      default:
        return 0
    }
  })
  
  // Separate pinned and regular notes
  const pinnedNotesList = sortedNotes.filter(n => pinnedNotes.has(n.id))
  const regularNotes = sortedNotes.filter(n => !pinnedNotes.has(n.id))
  const displayedNotes = [...pinnedNotesList, ...regularNotes]

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
              onClick={() => openMoveDialog(note)}
              data-testid={`menu-move-note-${note.id}`}
            >
              <FolderInput className="h-4 w-4 mr-2" /> Move to Folder
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openVersionHistory(note)}
              data-testid={`menu-history-note-${note.id}`}
            >
              <History className="h-4 w-4 mr-2" /> Version History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => openExportDialog(note)}
              data-testid={`menu-export-note-${note.id}`}
            >
              <Download className="h-4 w-4 mr-2" /> Export
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => printNote(note)}
              data-testid={`menu-print-note-${note.id}`}
            >
              <Printer className="h-4 w-4 mr-2" /> Print
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => toggleArchive(note.id)}
              data-testid={`menu-archive-note-${note.id}`}
            >
              {archivedNotes.has(note.id) ? (
                <>
                  <ArchiveRestore className="h-4 w-4 mr-2" /> Unarchive
                </>
              ) : (
                <>
                  <Archive className="h-4 w-4 mr-2" /> Archive
                </>
              )}
            </DropdownMenuItem>
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
        <h3 className="font-bold text-sm" data-testid="text-notes-title">
          {showArchived ? 'Archived Notes' : 'My Notes'}
        </h3>
        <div className="flex gap-1">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                title="Sort Notes"
                data-testid="button-sort-notes"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOption('date-desc')} data-testid="sort-date-desc">
                <ArrowDown className="h-4 w-4 mr-2" /> Newest First
                {sortOption === 'date-desc' && <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('date-asc')} data-testid="sort-date-asc">
                <ArrowUp className="h-4 w-4 mr-2" /> Oldest First
                {sortOption === 'date-asc' && <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOption('title-asc')} data-testid="sort-title-asc">
                <ArrowUp className="h-4 w-4 mr-2" /> Title A-Z
                {sortOption === 'title-asc' && <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('title-desc')} data-testid="sort-title-desc">
                <ArrowDown className="h-4 w-4 mr-2" /> Title Z-A
                {sortOption === 'title-desc' && <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOption('category')} data-testid="sort-category">
                <Folder className="h-4 w-4 mr-2" /> By Category
                {sortOption === 'category' && <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Archive Toggle */}
          <Button
            size="sm"
            variant={showArchived ? 'secondary' : 'ghost'}
            className="h-7 w-7 p-0"
            title={showArchived ? 'Show Active Notes' : 'Show Archived'}
            onClick={() => setShowArchived(!showArchived)}
            data-testid="button-toggle-archive"
          >
            <Archive className="h-4 w-4" />
          </Button>
          
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
      
      {/* Folders Section */}
      <div className="p-2 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">FOLDERS</span>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 text-xs gap-1"
            onClick={() => {
              setEditingFolder(null)
              setNewFolderName('')
              setFolderDialogOpen(true)
            }}
            data-testid="button-new-folder"
          >
            <FolderPlus className="h-3 w-3" /> New
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button
            size="sm"
            variant={selectedFolder === null ? 'secondary' : 'ghost'}
            className="h-7 text-xs gap-1"
            onClick={() => setSelectedFolder(null)}
            data-testid="button-folder-all"
          >
            <FolderOpen className="h-3 w-3" /> All Notes
          </Button>
          {folders.map(folder => (
            <div key={folder.id} className="group relative">
              <Button
                size="sm"
                variant={selectedFolder === folder.id ? 'secondary' : 'ghost'}
                className="h-7 text-xs gap-1"
                onClick={() => setSelectedFolder(folder.id)}
                data-testid={`button-folder-${folder.id}`}
              >
                <Folder className="h-3 w-3" /> {folder.name}
                <Badge variant="outline" className="ml-1 h-4 px-1 text-[10px]">
                  {folder.noteIds.length}
                </Badge>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-5 w-5 p-0 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => {
                    setEditingFolder(folder)
                    setNewFolderName(folder.name)
                    setFolderDialogOpen(true)
                  }}>
                    <Pencil className="h-4 w-4 mr-2" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => deleteFolder(folder.id)}
                    className="text-destructive"
                  >
                    <Trash className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
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
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={handleBulkArchive} data-testid="button-bulk-archive">
              <Archive className="h-3 w-3" /> Archive
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
          ) : displayedNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {showArchived 
                ? 'No archived notes' 
                : searchQuery || hasActiveFilters || selectedFolder 
                  ? 'No notes found' 
                  : 'No notes yet. Create your first note!'}
            </div>
          ) : (
            <>
              {/* Pinned Notes Section */}
              {pinnedNotesList.length > 0 && !showArchived && (
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
                  {pinnedNotesList.length > 0 && !showArchived && (
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
      
      {/* Folder Dialog */}
      <Dialog open={folderDialogOpen} onOpenChange={setFolderDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editingFolder ? 'Rename Folder' : 'Create New Folder'}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="folder-name">Folder Name</Label>
            <Input
              id="folder-name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name..."
              data-testid="input-folder-name"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={editingFolder ? renameFolder : createFolder} data-testid="button-save-folder">
              {editingFolder ? 'Rename' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Move to Folder Dialog */}
      <Dialog open={moveToFolderDialogOpen} onOpenChange={setMoveToFolderDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Move Note to Folder</DialogTitle>
            <DialogDescription>
              Select a folder for "{noteToMove?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => noteToMove && moveNoteToFolder(noteToMove.id, null)}
              data-testid="button-remove-from-folder"
            >
              <X className="h-4 w-4" /> Remove from folder
            </Button>
            {folders.map(folder => (
              <Button
                key={folder.id}
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => noteToMove && moveNoteToFolder(noteToMove.id, folder.id)}
                data-testid={`button-move-to-${folder.id}`}
              >
                <Folder className="h-4 w-4" /> {folder.name}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoveToFolderDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Version History Dialog */}
      <Dialog open={versionDialogOpen} onOpenChange={setVersionDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Version History</DialogTitle>
            <DialogDescription>
              View and restore previous versions of "{versionHistoryNote?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {versionHistoryNote && (mockVersions[versionHistoryNote.id]?.length || 0) === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No previous versions yet</p>
                <p className="text-xs mt-2">Versions are saved automatically when you edit a note</p>
              </div>
            ) : (
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {versionHistoryNote && mockVersions[versionHistoryNote.id]?.slice().reverse().map(version => (
                    <div 
                      key={version.id} 
                      className="p-3 border rounded-lg bg-muted/30 hover-elevate"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">v{version.version}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(version.createdAt, 'MMM d, yyyy h:mm a')}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1"
                          onClick={() => restoreVersion(version)}
                          data-testid={`button-restore-version-${version.id}`}
                        >
                          <RotateCcw className="h-3 w-3" /> Restore
                        </Button>
                      </div>
                      <p className="text-sm font-medium">{version.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {version.content.replace(/<[^>]*>/g, '').slice(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVersionDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Export Note</DialogTitle>
            <DialogDescription>
              Choose a format to export "{exportNote?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => exportNote && exportAsMarkdown(exportNote)}
              data-testid="button-export-markdown"
            >
              <FileDown className="h-4 w-4" /> Export as Markdown (.md)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => exportNote && exportAsJSON(exportNote)}
              data-testid="button-export-json"
            >
              <FileJson className="h-4 w-4" /> Export as JSON
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => exportNote && exportAsText(exportNote)}
              data-testid="button-export-text"
            >
              <FileText className="h-4 w-4" /> Export as Plain Text (.txt)
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

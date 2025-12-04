import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { queryClient, apiRequest } from '@/lib/queryClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FileText, Plus, MoreHorizontal, Search, Edit, Trash, Download, Layers } from 'lucide-react'
import { NoteDialog } from './NoteDialog'
import type { Note, Category, Tag } from '@shared/schema'
import { formatDistanceToNow } from 'date-fns'

const COLOR_MAP: Record<string, string> = {
  yellow: 'bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-100',
  blue: 'bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100',
  green: 'bg-green-100 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-100',
  red: 'bg-red-100 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-100',
  purple: 'bg-purple-100 border-purple-200 text-purple-800 dark:bg-purple-900 dark:border-purple-700 dark:text-purple-100',
  pink: 'bg-pink-100 border-pink-200 text-pink-800 dark:bg-pink-900 dark:border-pink-700 dark:text-pink-100',
  gray: 'bg-gray-100 border-gray-200 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100',
}

interface NotesListProps {
  verseReference?: string
}

export function NotesList({ verseReference }: NotesListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const { data: notes = [], isLoading: notesLoading } = useQuery<Note[]>({
    queryKey: ['/api/notes'],
  })

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  })

  const { data: tags = [] } = useQuery<Tag[]>({
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

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex justify-between items-center gap-2">
        <h3 className="font-bold text-sm" data-testid="text-notes-title">My Notes</h3>
        <div className="flex gap-1">
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
            variant="outline"
            className="h-7 text-xs gap-1"
            data-testid="button-filter-notes"
          >
            <Layers className="h-3 w-3" /> Filter
          </Button>
        </div>
      </div>

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
              {searchQuery ? 'No notes found' : 'No notes yet. Create your first note!'}
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="border border-border rounded-lg p-3 bg-card shadow-sm hover-elevate"
                data-testid={`card-note-${note.id}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
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
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-destructive"
                        data-testid={`menu-delete-note-${note.id}`}
                      >
                        <Trash className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div
                  className="text-sm text-foreground/90 mb-2 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                  data-testid={`text-note-content-${note.id}`}
                />
              </div>
            ))
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
    </div>
  )
}

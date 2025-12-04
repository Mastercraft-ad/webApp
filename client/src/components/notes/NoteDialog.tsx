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
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'
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

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setCategoryId(note.categoryId || '')
      setColor(note.color || '')
      setTemplate(note.template || '')
    } else {
      setTitle('')
      setContent('')
      setCategoryId('')
      setColor('')
      setTemplate('')
      setSelectedTags([])
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

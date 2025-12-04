import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Table as TableIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-3',
      },
    },
  })

  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt('Enter URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border border-border rounded-md">
      <div className="border-b border-border p-2 flex flex-wrap gap-1 bg-muted/30">
        <div className="flex gap-0.5">
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-strike"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex gap-0.5">
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-h1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-h2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-h3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex gap-0.5">
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-bulletlist"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-orderedlist"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex gap-0.5">
          <Button
            type="button"
            size="sm"
            variant={editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-alignleft"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-aligncenter"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-alignright"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex gap-0.5">
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-quote"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-code"
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('link') ? 'secondary' : 'ghost'}
            onClick={addLink}
            className="h-8 w-8 p-0"
            data-testid="button-format-link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('table') ? 'secondary' : 'ghost'}
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className="h-8 w-8 p-0"
            data-testid="button-format-table"
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

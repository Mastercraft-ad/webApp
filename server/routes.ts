import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertNoteSchema,
  insertCategorySchema,
  insertTagSchema,
  insertFolderSchema,
  insertVerseLinkSchema,
  insertAttachmentSchema,
  insertNoteVersionSchema,
  insertNoteShareSchema,
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Helper function to get userId from session
  const getUserId = (req: any): string | null => {
    // For now, return a default user ID for testing
    // In production, this would come from req.session or authentication
    return "default-user-id";
  };

  // ============= Note Routes =============
  
  // Get all notes for user
  app.get("/api/notes", async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const notes = await storage.getNotesByUserId(userId);
      res.json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });

  // Get note by ID
  app.get("/api/notes/:id", async (req, res) => {
    try {
      const note = await storage.getNoteById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(note);
    } catch (error) {
      console.error("Error fetching note:", error);
      res.status(500).json({ error: "Failed to fetch note" });
    }
  });

  // Search notes
  app.get("/api/notes/search/:query", async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const notes = await storage.searchNotes(userId, req.params.query);
      res.json(notes);
    } catch (error) {
      console.error("Error searching notes:", error);
      res.status(500).json({ error: "Failed to search notes" });
    }
  });

  // Create note
  app.post("/api/notes", async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const validatedData = insertNoteSchema.parse({ ...req.body, userId });
      const note = await storage.createNote(validatedData);
      
      // Create initial version
      await storage.createNoteVersion({
        noteId: note.id,
        title: note.title,
        content: note.content,
        version: 1,
      });
      
      res.status(201).json(note);
    } catch (error) {
      console.error("Error creating note:", error);
      res.status(400).json({ error: "Failed to create note" });
    }
  });

  // Update note
  app.patch("/api/notes/:id", async (req, res) => {
    try {
      const existingNote = await storage.getNoteById(req.params.id);
      if (!existingNote) {
        return res.status(404).json({ error: "Note not found" });
      }
      
      const note = await storage.updateNote(req.params.id, req.body);
      
      // Create version history
      if (note) {
        const versions = await storage.getVersionsByNoteId(note.id);
        const nextVersion = (versions[0]?.version || 0) + 1;
        await storage.createNoteVersion({
          noteId: note.id,
          title: note.title,
          content: note.content,
          version: nextVersion,
        });
      }
      
      res.json(note);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(400).json({ error: "Failed to update note" });
    }
  });

  // Delete note
  app.delete("/api/notes/:id", async (req, res) => {
    try {
      const success = await storage.deleteNote(req.params.id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ error: "Failed to delete note" });
    }
  });

  // ============= Category Routes =============
  
  app.get("/api/categories", async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const categories = await storage.getCategoriesByUserId(userId);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const validatedData = insertCategorySchema.parse({ ...req.body, userId });
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: "Failed to create category" });
    }
  });

  app.patch("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.updateCategory(req.params.id, req.body);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Failed to update category" });
    }
  });

  app.delete("/api/categories/:id", async (req, res) => {
    try {
      const success = await storage.deleteCategory(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  // ============= Tag Routes =============
  
  app.get("/api/tags", async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const tags = await storage.getTagsByUserId(userId);
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tags" });
    }
  });

  app.get("/api/notes/:noteId/tags", async (req, res) => {
    try {
      const tags = await storage.getTagsByNoteId(req.params.noteId);
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch note tags" });
    }
  });

  app.post("/api/tags", async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const validatedData = insertTagSchema.parse({ ...req.body, userId });
      const tag = await storage.createTag(validatedData);
      res.status(201).json(tag);
    } catch (error) {
      res.status(400).json({ error: "Failed to create tag" });
    }
  });

  app.post("/api/notes/:noteId/tags/:tagId", async (req, res) => {
    try {
      await storage.addTagToNote(req.params.noteId, req.params.tagId);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to add tag to note" });
    }
  });

  app.delete("/api/notes/:noteId/tags/:tagId", async (req, res) => {
    try {
      await storage.removeTagFromNote(req.params.noteId, req.params.tagId);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to remove tag from note" });
    }
  });

  app.delete("/api/tags/:id", async (req, res) => {
    try {
      const success = await storage.deleteTag(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete tag" });
    }
  });

  // ============= Folder Routes =============
  
  app.get("/api/folders", async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const folders = await storage.getFoldersByUserId(userId);
      res.json(folders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch folders" });
    }
  });

  app.post("/api/folders", async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const validatedData = insertFolderSchema.parse({ ...req.body, userId });
      const folder = await storage.createFolder(validatedData);
      res.status(201).json(folder);
    } catch (error) {
      res.status(400).json({ error: "Failed to create folder" });
    }
  });

  app.patch("/api/folders/:id", async (req, res) => {
    try {
      const folder = await storage.updateFolder(req.params.id, req.body);
      if (folder) {
        res.json(folder);
      } else {
        res.status(404).json({ error: "Folder not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Failed to update folder" });
    }
  });

  app.delete("/api/folders/:id", async (req, res) => {
    try {
      const success = await storage.deleteFolder(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete folder" });
    }
  });

  // ============= Verse Link Routes =============
  
  app.get("/api/notes/:noteId/verses", async (req, res) => {
    try {
      const verseLinks = await storage.getVerseLinksByNoteId(req.params.noteId);
      res.json(verseLinks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch verse links" });
    }
  });

  app.post("/api/notes/:noteId/verses", async (req, res) => {
    try {
      const validatedData = insertVerseLinkSchema.parse({ 
        ...req.body, 
        noteId: req.params.noteId 
      });
      const verseLink = await storage.createVerseLink(validatedData);
      res.status(201).json(verseLink);
    } catch (error) {
      res.status(400).json({ error: "Failed to create verse link" });
    }
  });

  app.delete("/api/verses/:id", async (req, res) => {
    try {
      const success = await storage.deleteVerseLink(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete verse link" });
    }
  });

  // ============= Attachment Routes =============
  
  app.get("/api/notes/:noteId/attachments", async (req, res) => {
    try {
      const attachments = await storage.getAttachmentsByNoteId(req.params.noteId);
      res.json(attachments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attachments" });
    }
  });

  app.post("/api/notes/:noteId/attachments", async (req, res) => {
    try {
      const validatedData = insertAttachmentSchema.parse({
        ...req.body,
        noteId: req.params.noteId,
      });
      const attachment = await storage.createAttachment(validatedData);
      res.status(201).json(attachment);
    } catch (error) {
      res.status(400).json({ error: "Failed to create attachment" });
    }
  });

  app.delete("/api/attachments/:id", async (req, res) => {
    try {
      const success = await storage.deleteAttachment(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete attachment" });
    }
  });

  // ============= Version History Routes =============
  
  app.get("/api/notes/:noteId/versions", async (req, res) => {
    try {
      const versions = await storage.getVersionsByNoteId(req.params.noteId);
      res.json(versions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch versions" });
    }
  });

  // ============= Share Routes =============
  
  app.get("/api/notes/:noteId/shares", async (req, res) => {
    try {
      const shares = await storage.getSharesByNoteId(req.params.noteId);
      res.json(shares);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch shares" });
    }
  });

  app.get("/api/notes/shared/with-me", async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const notes = await storage.getSharedNotesForUser(userId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch shared notes" });
    }
  });

  app.post("/api/notes/:noteId/shares", async (req, res) => {
    try {
      const validatedData = insertNoteShareSchema.parse({
        ...req.body,
        noteId: req.params.noteId,
      });
      const share = await storage.createNoteShare(validatedData);
      res.status(201).json(share);
    } catch (error) {
      res.status(400).json({ error: "Failed to create share" });
    }
  });

  app.delete("/api/shares/:id", async (req, res) => {
    try {
      const success = await storage.deleteNoteShare(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete share" });
    }
  });

  return httpServer;
}

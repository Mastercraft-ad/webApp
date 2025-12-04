import { 
  type User, 
  type InsertUser,
  type Note,
  type InsertNote,
  type Category,
  type InsertCategory,
  type Tag,
  type InsertTag,
  type Folder,
  type InsertFolder,
  type VerseLink,
  type InsertVerseLink,
  type Attachment,
  type InsertAttachment,
  type NoteVersion,
  type InsertNoteVersion,
  type NoteShare,
  type InsertNoteShare,
  users,
  notes,
  categories,
  tags,
  noteTags,
  folders,
  verseLinks,
  attachments,
  noteVersions,
  noteShares,
} from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import { eq, and, or, like, desc, sql, inArray } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Note methods
  getNoteById(id: string): Promise<Note | undefined>;
  getNotesByUserId(userId: string): Promise<Note[]>;
  getNotesByFolderId(folderId: string): Promise<Note[]>;
  getNotesByCategoryId(categoryId: string): Promise<Note[]>;
  searchNotes(userId: string, query: string): Promise<Note[]>;
  createNote(note: InsertNote): Promise<Note>;
  updateNote(id: string, note: Partial<InsertNote>): Promise<Note | undefined>;
  deleteNote(id: string): Promise<boolean>;
  
  // Category methods
  getCategoriesByUserId(userId: string): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;
  
  // Tag methods
  getTagsByUserId(userId: string): Promise<Tag[]>;
  getTagsByNoteId(noteId: string): Promise<Tag[]>;
  createTag(tag: InsertTag): Promise<Tag>;
  addTagToNote(noteId: string, tagId: string): Promise<void>;
  removeTagFromNote(noteId: string, tagId: string): Promise<void>;
  deleteTag(id: string): Promise<boolean>;
  
  // Folder methods
  getFoldersByUserId(userId: string): Promise<Folder[]>;
  createFolder(folder: InsertFolder): Promise<Folder>;
  updateFolder(id: string, folder: Partial<InsertFolder>): Promise<Folder | undefined>;
  deleteFolder(id: string): Promise<boolean>;
  
  // Verse link methods
  getVerseLinksByNoteId(noteId: string): Promise<VerseLink[]>;
  createVerseLink(verseLink: InsertVerseLink): Promise<VerseLink>;
  deleteVerseLink(id: string): Promise<boolean>;
  
  // Attachment methods
  getAttachmentsByNoteId(noteId: string): Promise<Attachment[]>;
  createAttachment(attachment: InsertAttachment): Promise<Attachment>;
  deleteAttachment(id: string): Promise<boolean>;
  
  // Version history methods
  getVersionsByNoteId(noteId: string): Promise<NoteVersion[]>;
  createNoteVersion(version: InsertNoteVersion): Promise<NoteVersion>;
  
  // Share methods
  getSharesByNoteId(noteId: string): Promise<NoteShare[]>;
  getSharedNotesForUser(userId: string): Promise<Note[]>;
  createNoteShare(share: InsertNoteShare): Promise<NoteShare>;
  deleteNoteShare(id: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.db = drizzle(pool);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Note methods
  async getNoteById(id: string): Promise<Note | undefined> {
    const result = await this.db.select().from(notes).where(eq(notes.id, id));
    return result[0];
  }

  async getNotesByUserId(userId: string): Promise<Note[]> {
    return await this.db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(desc(notes.updatedAt));
  }

  async getNotesByFolderId(folderId: string): Promise<Note[]> {
    return await this.db
      .select()
      .from(notes)
      .where(eq(notes.folderId, folderId))
      .orderBy(desc(notes.updatedAt));
  }

  async getNotesByCategoryId(categoryId: string): Promise<Note[]> {
    return await this.db
      .select()
      .from(notes)
      .where(eq(notes.categoryId, categoryId))
      .orderBy(desc(notes.updatedAt));
  }

  async searchNotes(userId: string, query: string): Promise<Note[]> {
    const searchPattern = `%${query}%`;
    return await this.db
      .select()
      .from(notes)
      .where(
        and(
          eq(notes.userId, userId),
          or(
            like(notes.title, searchPattern),
            like(notes.content, searchPattern)
          )
        )
      )
      .orderBy(desc(notes.updatedAt));
  }

  async createNote(note: InsertNote): Promise<Note> {
    const result = await this.db.insert(notes).values(note).returning();
    return result[0];
  }

  async updateNote(id: string, note: Partial<InsertNote>): Promise<Note | undefined> {
    const result = await this.db
      .update(notes)
      .set({ ...note, updatedAt: new Date() })
      .where(eq(notes.id, id))
      .returning();
    return result[0];
  }

  async deleteNote(id: string): Promise<boolean> {
    const result = await this.db.delete(notes).where(eq(notes.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Category methods
  async getCategoriesByUserId(userId: string): Promise<Category[]> {
    return await this.db
      .select()
      .from(categories)
      .where(eq(categories.userId, userId))
      .orderBy(categories.name);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await this.db.insert(categories).values(category).returning();
    return result[0];
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const result = await this.db
      .update(categories)
      .set(category)
      .where(eq(categories.id, id))
      .returning();
    return result[0];
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await this.db.delete(categories).where(eq(categories.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Tag methods
  async getTagsByUserId(userId: string): Promise<Tag[]> {
    return await this.db
      .select()
      .from(tags)
      .where(eq(tags.userId, userId))
      .orderBy(tags.name);
  }

  async getTagsByNoteId(noteId: string): Promise<Tag[]> {
    const result = await this.db
      .select({
        id: tags.id,
        userId: tags.userId,
        name: tags.name,
        createdAt: tags.createdAt,
      })
      .from(noteTags)
      .innerJoin(tags, eq(noteTags.tagId, tags.id))
      .where(eq(noteTags.noteId, noteId));
    return result;
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const result = await this.db.insert(tags).values(tag).returning();
    return result[0];
  }

  async addTagToNote(noteId: string, tagId: string): Promise<void> {
    await this.db.insert(noteTags).values({ noteId, tagId });
  }

  async removeTagFromNote(noteId: string, tagId: string): Promise<void> {
    await this.db
      .delete(noteTags)
      .where(and(eq(noteTags.noteId, noteId), eq(noteTags.tagId, tagId)));
  }

  async deleteTag(id: string): Promise<boolean> {
    const result = await this.db.delete(tags).where(eq(tags.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Folder methods
  async getFoldersByUserId(userId: string): Promise<Folder[]> {
    return await this.db
      .select()
      .from(folders)
      .where(eq(folders.userId, userId))
      .orderBy(folders.name);
  }

  async createFolder(folder: InsertFolder): Promise<Folder> {
    const result = await this.db.insert(folders).values(folder).returning();
    return result[0];
  }

  async updateFolder(id: string, folder: Partial<InsertFolder>): Promise<Folder | undefined> {
    const result = await this.db
      .update(folders)
      .set(folder)
      .where(eq(folders.id, id))
      .returning();
    return result[0];
  }

  async deleteFolder(id: string): Promise<boolean> {
    const result = await this.db.delete(folders).where(eq(folders.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Verse link methods
  async getVerseLinksByNoteId(noteId: string): Promise<VerseLink[]> {
    return await this.db
      .select()
      .from(verseLinks)
      .where(eq(verseLinks.noteId, noteId))
      .orderBy(verseLinks.book, verseLinks.chapter, verseLinks.verse);
  }

  async createVerseLink(verseLink: InsertVerseLink): Promise<VerseLink> {
    const result = await this.db.insert(verseLinks).values(verseLink).returning();
    return result[0];
  }

  async deleteVerseLink(id: string): Promise<boolean> {
    const result = await this.db.delete(verseLinks).where(eq(verseLinks.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Attachment methods
  async getAttachmentsByNoteId(noteId: string): Promise<Attachment[]> {
    return await this.db
      .select()
      .from(attachments)
      .where(eq(attachments.noteId, noteId))
      .orderBy(attachments.createdAt);
  }

  async createAttachment(attachment: InsertAttachment): Promise<Attachment> {
    const result = await this.db.insert(attachments).values(attachment).returning();
    return result[0];
  }

  async deleteAttachment(id: string): Promise<boolean> {
    const result = await this.db.delete(attachments).where(eq(attachments.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Version history methods
  async getVersionsByNoteId(noteId: string): Promise<NoteVersion[]> {
    return await this.db
      .select()
      .from(noteVersions)
      .where(eq(noteVersions.noteId, noteId))
      .orderBy(desc(noteVersions.version));
  }

  async createNoteVersion(version: InsertNoteVersion): Promise<NoteVersion> {
    const result = await this.db.insert(noteVersions).values(version).returning();
    return result[0];
  }

  // Share methods
  async getSharesByNoteId(noteId: string): Promise<NoteShare[]> {
    return await this.db
      .select()
      .from(noteShares)
      .where(eq(noteShares.noteId, noteId));
  }

  async getSharedNotesForUser(userId: string): Promise<Note[]> {
    const sharedNoteIds = await this.db
      .select({ noteId: noteShares.noteId })
      .from(noteShares)
      .where(eq(noteShares.sharedWithUserId, userId));
    
    if (sharedNoteIds.length === 0) return [];
    
    const noteIds = sharedNoteIds.map(s => s.noteId);
    return await this.db
      .select()
      .from(notes)
      .where(inArray(notes.id, noteIds))
      .orderBy(desc(notes.updatedAt));
  }

  async createNoteShare(share: InsertNoteShare): Promise<NoteShare> {
    const result = await this.db.insert(noteShares).values(share).returning();
    return result[0];
  }

  async deleteNoteShare(id: string): Promise<boolean> {
    const result = await this.db.delete(noteShares).where(eq(noteShares.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DbStorage();

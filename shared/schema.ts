import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Categories for organizing notes
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: varchar("color", { length: 7 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Folders for organizing notes hierarchically
export const folders = pgTable("folders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  parentId: varchar("parent_id").references((): any => folders.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFolderSchema = createInsertSchema(folders).omit({
  id: true,
  createdAt: true,
});

export type InsertFolder = z.infer<typeof insertFolderSchema>;
export type Folder = typeof folders.$inferSelect;

// Main notes table with rich text content
export const notes = pgTable("notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  categoryId: varchar("category_id").references(() => categories.id, { onDelete: "set null" }),
  folderId: varchar("folder_id").references(() => folders.id, { onDelete: "set null" }),
  color: varchar("color", { length: 20 }),
  template: varchar("template", { length: 50 }),
  isStandalone: boolean("is_standalone").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notes.$inferSelect;

// Tags for notes
export const tags = pgTable("tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTagSchema = createInsertSchema(tags).omit({
  id: true,
  createdAt: true,
});

export type InsertTag = z.infer<typeof insertTagSchema>;
export type Tag = typeof tags.$inferSelect;

// Many-to-many relationship between notes and tags
export const noteTags = pgTable("note_tags", {
  noteId: varchar("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  tagId: varchar("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
});

export const insertNoteTagSchema = createInsertSchema(noteTags);
export type InsertNoteTag = z.infer<typeof insertNoteTagSchema>;
export type NoteTag = typeof noteTags.$inferSelect;

// Verse links for notes
export const verseLinks = pgTable("verse_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  noteId: varchar("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  book: text("book").notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse"),
  verseEnd: integer("verse_end"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVerseLinkSchema = createInsertSchema(verseLinks).omit({
  id: true,
  createdAt: true,
});

export type InsertVerseLink = z.infer<typeof insertVerseLinkSchema>;
export type VerseLink = typeof verseLinks.$inferSelect;

// Attachments for notes (images, audio)
export const attachments = pgTable("attachments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  noteId: varchar("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 20 }).notNull(),
  url: text("url").notNull(),
  filename: text("filename").notNull(),
  size: integer("size"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAttachmentSchema = createInsertSchema(attachments).omit({
  id: true,
  createdAt: true,
});

export type InsertAttachment = z.infer<typeof insertAttachmentSchema>;
export type Attachment = typeof attachments.$inferSelect;

// Version history for notes
export const noteVersions = pgTable("note_versions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  noteId: varchar("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  version: integer("version").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNoteVersionSchema = createInsertSchema(noteVersions).omit({
  id: true,
  createdAt: true,
});

export type InsertNoteVersion = z.infer<typeof insertNoteVersionSchema>;
export type NoteVersion = typeof noteVersions.$inferSelect;

// Note shares for collaboration
export const noteShares = pgTable("note_shares", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  noteId: varchar("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  sharedWithUserId: varchar("shared_with_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  canEdit: boolean("can_edit").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNoteShareSchema = createInsertSchema(noteShares).omit({
  id: true,
  createdAt: true,
});

export type InsertNoteShare = z.infer<typeof insertNoteShareSchema>;
export type NoteShare = typeof noteShares.$inferSelect;

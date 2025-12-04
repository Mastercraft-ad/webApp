# Abideon - Christian Web Application

## Overview

Abideon is a comprehensive Christian web application that combines Bible study, audio streaming, community features, learning, and church integration. The application provides a modern, sleek, and intuitive interface for spiritual growth and community engagement.

The platform is built as a full-stack TypeScript application with a React frontend and Express backend, designed to be mobile-first, accessible (WCAG 2.1 AAA compliant), and spiritually sophisticated without feeling dated.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type safety and developer experience
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System:**
- Radix UI primitives for accessible, unstyled components
- Shadcn/ui component library with "new-york" style variant
- Tailwind CSS v4 for utility-first styling with custom design tokens
- Framer Motion for animations and transitions
- Custom CSS variables for theming (light/dark mode support)

**Styling Approach:**
- CSS variables for dynamic theming (`--background`, `--foreground`, `--primary`, etc.)
- Custom utility classes like `hover-elevate` and `active-elevate-2` for consistent micro-interactions
- Responsive design with mobile-first breakpoints
- Font stack: Outfit (headings), Open Sans (body), Lora (serif/scripture)

**Rich Text Editing:**
- TipTap editor for note-taking functionality
- Extensions: Tables, Code blocks with syntax highlighting (lowlight), Text alignment, Links, Color, Highlights
- Supports formatted Bible study notes with verse references

**Key Frontend Features:**
- Bible reader with multiple translations, highlighting, annotations, and bookmarks
- Audio streaming for sermons and worship music
- Community feeds and social interactions
- Prayer journal with privacy controls
- Reading plans with progress tracking
- Course learning platform
- Events and group management
- Kids mode with gamification

### Backend Architecture

**Server Framework:**
- Express.js for HTTP routing and middleware
- Node.js with ES modules (type: "module" in package.json)
- TypeScript for type safety across the stack
- HTTP server created with Node's `http` module for potential WebSocket upgrades

**Development vs Production:**
- Development: Vite middleware mode with HMR at `/vite-hmr`
- Production: Compiled with esbuild, static file serving from `dist/public`
- Custom build script bundles allowlisted dependencies to reduce cold start times

**API Design:**
- RESTful endpoints under `/api/*` namespace
- JSON request/response format with error handling
- Session-based authentication (placeholder user ID for development)
- Request logging with timing and status code tracking

**Data Layer:**
- Drizzle ORM for type-safe database queries
- PostgreSQL as the primary database (configured via `DATABASE_URL`)
- Schema-first approach with Zod validation
- Migrations stored in `./migrations` directory

### Database Schema

**Core Entities:**

1. **Users** - Authentication and profile data
   - Username/password credentials
   - UUID primary keys

2. **Notes** - Bible study annotations
   - Rich text content (JSONB)
   - Verse references
   - Privacy levels (private, friends, public)
   - Color coding for organization
   - Pinning and favoriting
   - Soft deletion support

3. **Categories** - Note organization
   - User-specific color-coded categories
   - One-to-many relationship with notes

4. **Tags** - Flexible note tagging
   - Many-to-many relationship with notes via `noteTags` junction table

5. **Folders** - Hierarchical note organization
   - Self-referencing parent-child structure
   - Cascade deletion

6. **Verse Links** - Bible reference tracking
   - Links notes to specific Bible verses
   - Supports multiple verses per note

7. **Attachments** - File uploads for notes
   - File type and size tracking
   - URL storage

8. **Note Versions** - Version history
   - Tracks content changes over time
   - Enables rollback functionality

9. **Note Shares** - Collaboration
   - Share notes with specific users
   - Permission levels (view, edit)

**Data Access Pattern:**
- Storage interface abstraction layer (`IStorage`)
- Methods for CRUD operations on all entities
- Supports complex queries (search, filtering, relationships)

### External Dependencies

**UI & Styling:**
- @radix-ui/* - Accessible UI primitives (accordion, dialog, dropdown, etc.)
- tailwindcss - Utility-first CSS framework
- lucide-react - Icon library
- framer-motion - Animation library
- class-variance-authority & clsx - Dynamic className utilities

**Data Management:**
- @tanstack/react-query - Server state management
- drizzle-orm - TypeScript ORM
- drizzle-kit - Database migration tool
- pg (node-postgres) - PostgreSQL client
- zod - Schema validation

**Rich Text Editing:**
- @tiptap/react - Headless editor framework
- @tiptap/starter-kit - Essential editor extensions
- @tiptap/extension-* - Additional formatting capabilities

**Forms & Validation:**
- react-hook-form - Form state management
- @hookform/resolvers - Form validation resolvers
- zod-validation-error - Human-readable validation errors

**Development Tools:**
- @replit/vite-plugin-* - Replit-specific development enhancements
- tsx - TypeScript execution for Node.js
- esbuild - Fast JavaScript bundler
- vite - Frontend build tool

**Build & Deployment:**
- Custom build pipeline compiles both client (Vite) and server (esbuild)
- Allowlisted dependencies bundled to reduce syscalls on cold starts
- Static assets served from `dist/public` in production
- Environment-based configuration (NODE_ENV, DATABASE_URL, REPL_ID)

**Image & Asset Management:**
- Custom Vite plugin for meta tag OG images (`vite-plugin-meta-images.ts`)
- Supports opengraph images in multiple formats (PNG, JPG, JPEG)
- Auto-detects Replit deployment domain

**Planned Integrations:**
- Authentication providers: Google, Facebook, Apple (OAuth)
- Email service: nodemailer (in dependencies)
- Payment processing: Stripe
- AI capabilities: OpenAI, Google Generative AI
# Knowledger - Personal Knowledge Hub

## Project Overview
Knowledger is a personal knowledge management application built with Next.js 14, TypeScript, and Supabase. It allows users to organize learning into chapters with rich content blocks and visualize connections through an interactive knowledge graph.

**GitHub**: https://github.com/rishabh3562/Knowledger  
**Live Demo**: https://knowledger.vercel.app  
**Primary Language**: TypeScript  
**Framework**: Next.js 14 (App Router)  
**Database**: Supabase (PostgreSQL)  
**Last Updated**: 2025-12-06T08:29:38Z

## Core Features
- 📖 Chapter Management (unlimited chapters with titles, summaries, tags)
- 🧩 Rich Content Blocks (Text, Code, Image, PDF, Link blocks)
- 🔄 Drag & Drop Interface (@dnd-kit)
- 🕸️ Knowledge Graph (React Flow visualization)
- 🔐 Secure & Personal (Supabase Auth with Row Level Security)

## Tech Stack
| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| File Storage | Supabase Storage |
| UI Library | Shadcn UI + Tailwind CSS |
| Drag & Drop | @dnd-kit |
| Graph Visualization | React Flow |
| State Management | TanStack Query |
| Deployment | Vercel |

## Database Schema (from supabase.ts)
- **chapters**: Main chapter data (id, title, summary, tags, cover_image, created_at, user_id)
- **blocks**: Content blocks within chapters (id, chapter_id, type, content, file_url, position, created_at)
- **links**: Connections between chapters for knowledge graph (id, from_chapter, to_chapter, created_at)
- **keepalive_logs**: Health check logs (id, pinged_at, status, response_time_ms, error_message, metadata)

## Project Structure
```
src/
├── app/
│   ├── api/              # API routes (chapters, blocks, links, upload)
│   ├── auth/             # Authentication page
│   ├── chapters/         # Chapter pages (list, create, [id])
│   ├── graph/            # Knowledge graph visualization
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Home page
├── components/
│   ├── editor/           # Block components (Text, Code, Image, PDF, Link)
│   ├── ui/               # Shadcn UI components
│   ├── FileUpload.tsx    # File upload component
│   └── KnowledgeGraph.tsx # React Flow graph
└── lib/
    ├── auth.ts           # Server-side auth utilities
    ├── supabase.ts       # Supabase client & types
    └── utils.ts          # Helper functions
```

## Analysis Notes
- Built with modern Next.js 14 features (App Router, Server Actions, etc.)
- Strong type safety with extensive TypeScript usage
- Modular component architecture with clear separation of concerns
- Utilizes Supabase for auth, database, and storage - excellent choice for indie hackers
- Implements drag-and-drop functionality for intuitive UX
- Knowledge graph visualization provides unique value proposition for knowledge management
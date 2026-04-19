# Better Code Documentation & AI Assistance
*Inspired by: "Better Code Documentation and How AI Can Help"*

## Why Documentation Matters for a Second Brain
In a cognitive extension system, **code *is* part of your thinking**. Poorly documented code increases cognitive load, steals insight time, and breaks the flow state.

## Principles of Brain-Friendly Documentation

### 1. Documentation as Cognitive Offloading
- Good docs let you **trust the system** instead of re-deriving logic.
- Docstrings should answer: *"Why does this exist?"* and *"How does it fit my mental model?"*
- Example: A well-documented `supabase.ts` lets you focus on *what* you’re building, not *how* the client works.

### 2. AI as a Documentation Partner
- **Generate first drafts**: AI can write docstrings from function signatures and comments.
- **Keep docs in sync**: AI detects when code changes and suggests doc updates.
- **Explain complex logic**: Turn a dense algorithm into plain English (or vice versa).
- **Translate intent**: "Explain this code as if I’m a product manager" → bridges technical/non-technical thinking.

### 3. Types of Documentation That Serve Thinking
| Type | Purpose | Brain Benefit |
|------|---------|---------------|
| **Tutorials** | Learn how to use a module | Reduces onboarding friction |
| **Explanations** | Why something works the way it is | Builds mental models |
| **Reference** | Quick lookup of signatures | Saves working memory |
| **How-to Guides** | Achieve a specific goal | Supports action-oriented thinking |

### 4. The "Docs as Tests" Mindset
- If you can’t simply document a function, it might be too complex or doing too much.
- Writing docs first (like TDD) forces clarity of purpose.

### 5. Tooling & Integration
- **Linting for docstrings**: Enforce presence and quality.
- **Live preview**: See how docs render as you write (like Obsidian’s live preview).
- **AI-assisted writing**: Inline prompts: `/doc "Explain this function’s role in the auth flow"`.
- **Version-aware docs**: Link docs to specific git versions when behavior changes.

## How Knowledger’s Code Currently Scores
- ✅ Clear module separation (lib/, components/, app/api/)
- ✅ TypeScript interfaces serve as living documentation (especially `Database` type)
- ❌ **Zero JSDoc or TSDoc comments** → missing opportunity for AI assistance and quick understanding.
- ❌ No automated doc generation or linting for documentation.
- ❌ README is user-focused; developer-facing contributor guide is minimal.

## Immediate Documentation Wins
1. **Add JSDoc to all public functions** (especially in `lib/` and `components/editor/*`).
   - Start with `supabase.ts`, `auth.ts`, `utils.ts`.
2. **Enable `docco` or `typedoc`** to generate reference API docs.
3. **Add a script** that uses AI (via OpenRouter or local model) to suggest docstring improvements.
4. **Create a `CONTRIBUTING.md` section** on documentation standards (e.g., "All exported functions must have JSDoc").

## AI-Powered Documentation Workflow Example
1. You write a function: `async function getChapterLinks(id) {...}`
2. You type `/doc` or click "AI Explain"
3. AI proposes: 
   ```ts
   /**
    * Fetches all knowledge graph links originating from or pointing to a chapter.
    * Used to build the bidirectional edges in the React Flow visualization.
    * 
    * @param id - The chapter ID to query links for
    * @returns Promise<Array<{id:string, from_chapter:string, to_chapter:string, created_at:string}>>
    */
   ```
3. You accept, edit, or reject—saving time and ensuring consistency.

---
*Generated: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}*

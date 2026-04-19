# Obsidian App In-Depth Teardown: Lessons for a Cognitive Tool
*Inspired by: "Obsidian App In-Depth Product Teardown"*

## What Makes Obsidian a Second Brain Platform
Obsidian isn’t just a markdown editor—it’s a **local-first, graph-oriented thinking environment** built around three core loops: Capture → Connect → Create.

## Core Loops & How They Map to Knowledger

### 1. Capture Loop
- **Obsidian**: Quick capture via daily notes, mobile app, web clipper, voice-to-text.
- **Knowledger**: 
  - ✅ Supports capture via UI (text/code/image/PDF/link blocks).
  - ❌ No quick capture from outside the app (e.g., browser extension, mobile share sheet, CLI).
  - ❌ No daily notes or frictionless "inbox" for fleeting thoughts.

### 2. Connect Loop
- **Obsidian**: 
  - Bidirectional links (`[[note]]`) created mid-flow.
  - Graph view shows implicit and explicit connections.
  - Backlinks show "what mentions this?"
- **Knowledger**:
  - ✅ Explicit links via `links` table and graph UI.
  - ✅ Bidirectional in storage (links have direction but UI can show both ways).
  - ❌ No automatic link suggestions or backlink pane.
  - ❌ No way to see *"which blocks mention this concept?"* without querying.

### 3. Create Loop
- **Obsidian**: 
  - Embed notes, transclusions, templates, plugins.
  - Writing feels fluid with live preview, vim mode, etc.
- **Knowledger**:
  - ✅ Rich block types support varied creation modes.
  - ✅ Editing per block is smooth.
  - ❌ No transclusion (embedding one block inside another).
  - ❌ No templates for recurring chapter/types (e.g., "meeting notes", "book summary").
  - ❌ No live preview of markdown/rich text within blocks.

## Design Principles from Obsidian

### 1. Local-First, Then Cloud
- Data lives in plain markdown files on your device; sync is optional.
- **Implication for Knowledger**: Consider a local-first mode (IndexedDB or localStorage) that syncs to Supabase when online—ensures speed and privacy.

### 2. Programmability via Plugins
- Obsidian’s power comes from community plugins (kanban, calendars, spaced repetition, AI tools).
- **Implication**: Knowledger should expose a **plugin API** (e.g., webhooks, custom block types, graph hooks) so you can extend it as your thinking evolves.

### 3. Graph as First-Class Citizen
- The graph isn’t a hidden feature—it’s central to navigation.
- **Implication**: Every action should feel like it’s operating *on the graph*, not just a list of notes.

### 4. Progressive Disclosure
- Simple out-of-the-box; power features discoverable as needed.
- **Implication**: Don’t overwhelm new users with AI features—let them emerge as you use the tool.

### 5. Markdown as the Universal Substrate
- Everything is markdown (or can be rendered as such).
- **Implication**: Consider exporting blocks to markdown with frontmatter for interoperability with Obsidian, Logseq, etc.

## Specific Feature Ideas for Knowledger (Obsidian-Inspired)
| Obsidian Feature | Knowledger Adaptation |
|------------------|------------------------|
| Daily Notes | Auto-create a "Today" chapter for fleeting thoughts; link to it from graph. |
| Templates | `/template` command to insert predefined block structures (e.g., book review, bug report). |
| Backlinks pane | Sidebar showing: "These blocks link to the current one" (incoming links). |
| Graph filters | Toggle to show only links of type "inspiration", "contradiction", etc. (if you tag links). |
| Canvas | Freeform canvas to arrange blocks, images, and text spatially (beyond node-link graph). |
| Plugins system | Allow registering custom block types (e.g., math equation, Kanban card) via manifest. |
| Publish to web | One-click to publish a chapter or graph subset as a static site (like Obsidian Publish). |

## Technical Takeaways
- **Storage simplicity**: Obsidian uses files + folders; Knowledger uses Supabase. Both valid—but consider a hybrid: local file cache + remote sync.
- **Extensibility > built-in features**: The more you can plug in, the longer the tool stays relevant as your thinking evolves.
- **Speed is critical**: Cognitive flow breaks at >100ms lag. Optimize for instant block creation/linking.

---
*Generated: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}*

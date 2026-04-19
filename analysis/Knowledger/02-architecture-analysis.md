# Knowledger Architecture Analysis

## Current Structure

```
src/
├── app/
│   ├── api/               # API routes (chapters, blocks, links, upload, keepalive)
│   ├── auth/              # Authentication page
│   ├── chapters/          # Chapter pages (list, create, [id])
│   ├── graph/             # Knowledge graph visualization
│   ├── layout.tsx         # Root layout with providers
│   └── providers.tsx      # Authentication providers
├── components/
│   ├── editor/            # Block components (Text, Code, Image, PDF, Link)
│   ├── ui/                # Shadcn UI components
│   ├── FileUpload.tsx     # File upload component
│   └── KnowledgeGraph.tsx # React Flow graph
└── lib/
    ├── supabase.ts        # Supabase client & types
    ├── auth.ts            # Server-side auth utilities
    └── utils.ts           # Helper functions
```

## Layer Analysis

### 1. Presentation Layer
- **Location**: `app/` (pages/layout) + `components/` (UI components)
- **Responsibility**: UI rendering, user interaction handling
- **Observation**: Mixed concerns - some components handle data fetching directly

### 2. Application Layer  
- **Location**: `app/api/` (API routes)
- **Responsibility**: Handle HTTP requests, coordinate between presentation and data layers
- **Observation**: Thin controllers but with duplicated authentication logic

### 3. Data Access Layer
- **Location**: `lib/supabase.ts` (direct Supabase usage)
- **Responsibility**: Database operations
- **Observation**: Components and API routes both import and use Supabase directly

### 4. Business Logic
- **Location**: Scattered across components, API routes, and lib files
- **Observation**: No clear separation - logic is duplicated and hard to test

## Issues Identified

### Coupling Problems
1. **Tight component-data coupling**: Components directly import and use Supabase client
2. **Duplicated authentication**: Each API route recreates server client and fetches user
3. **Business logic scattering**: Rules spread across multiple files without clear boundaries

### Cohesion Problems
1. **Mixed concerns in lib/**: Supabase client, auth utilities, and general utils all together
2. **No service layer**: Missing abstraction for business operations
3. **Components handle multiple responsibilities**: UI state + data fetching + business logic

### Scalability Concerns
1. **Feature addition complexity**: New features require changes in multiple layers
2. **Testing difficulties**: Tight coupling makes unit testing challenging
3. **Maintenance overhead**: Changes to data access patterns require widespread updates

## Recommendations

### 1. Create a Service Layer
```
src/
└── services/
    ├── chapterService.ts     # Chapter business logic
    ├── blockService.ts       # Block business logic  
    ├── linkService.ts        # Link business logic
    └── authService.ts        # Authentication business logic
```

Services should:
- Encapsulate all Supabase interactions
- Contain business rules and validation
- Provide clean APIs for controllers and components
- Be easily mockable for testing

### 2. Refactor API Routes as Controllers
Make API routes thin layers that:
- Validate input and authentication
- Call appropriate service methods
- Format responses and handle errors
- Example transformation:

```typescript
// BEFORE (in route.ts)
export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  // ... duplicate logic in every route
}

// AFTER
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth() // Extracted auth helper
    const chapters = await chapterService.getUserChapters(user.id)
    return NextResponse.json(chapters)
  } catch (error) {
    return handleApiError(error) // Standardized error handling
  }
}
```

### 3. Improve Component Architecture
Separate concerns in components:
- **Presentational Components**: Pure UI components that receive data via props
- **Container Components**: Handle data fetching and state management
- **Custom Hooks**: Extract data fetching logic (e.g., `useChapters()`, `useBlocks(chapterId)`)

### 4. Reorganize lib/ Directory
```
src/
└── lib/
    ├── supabase/            # Supabase client and types
    │   ├── client.ts        # Client initialization
    │   └── types.ts         # Database types
    ├── auth/                # Authentication utilities
    │   └── server.ts        # Server-side auth helpers
    ├── services/            # Service layer (alternative to top-level services)
    └── utils/               # General helper functions
```

### 5. Implement Domain Organization (Optional)
For larger applications, consider organizing by domain:
```
src/
└── domains/
    ├── chapters/
    │   ├── components/
    │   ├── services/
    │   ├── hooks/
    │   └── types.ts
    ├── blocks/
    │   ├── components/
    │   ├── services/
    │   └── hooks/
    └── auth/
        ├── components/
        ├── services/
        └── hooks/
```

## Expected Benefits

### Improved Maintainability
- Changes to data access affect only service layer
- Business rules centralized in one place
- Clear boundaries between concerns

### Better Testability
- Services can be unit tested in isolation
- Components can be tested with mocked services
- API routes tested as thin controllers

### Enhanced Scalability
- New features follow established patterns
- Easy to add new service methods without affecting existing code
- Clear extension points for new domains

### Reduced Coupling
- Components depend on service abstractions, not concrete implementations
- API routes depend on services, not direct database access
- Changes in one layer minimally impact others

## Implementation Priority

1. **Extract authentication helpers** (quick win, reduces duplication)
2. **Create service layer for chapters** (core domain)
3. **Refactor chapters API routes** to use services
4. **Create custom hooks** for data fetching in components
5. **Reorganize lib/** directory structure
6. **Apply pattern to other domains** (blocks, links, etc.)

This incremental approach allows for continuous improvement without major disruptions.
# Chat Session Export — Montenegro Route Planner Setup

**Session Date**: April 16-20, 2026  
**Project**: Montenegro Route Planner  
**Repository**: https://github.com/jenniesaf/route-planner  
**Status**: Initial Setup Complete ✅

---

## Session Overview

This chat session covered the complete initial setup of the Montenegro Route Planner project, a portfolio-grade Next.js application for tourist route planning in Montenegro.

---

## Actions Completed

### 1. Project Initialization ✅

**Command Executed**:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src --import-alias "@/*" --turbopack
```

**Result**: Next.js 16.2.4 project created with:
- TypeScript
- Tailwind CSS
- App Router
- Turbopack
- ESLint

---

### 2. Folder Structure Reorganization ✅

**Actions**:
- Created `src/` directory
- Moved `app/` to `src/app/`
- Created folder structure:
  ```
  src/
  ├── app/              # Next.js routing and layouts
  ├── components/       # Shared UI components
  ├── features/         # Feature-based modules
  ├── lib/              # Business logic
  ├── data/             # Static data
  └── types/            # TypeScript types
  ```

**TypeScript Configuration Updated**:
```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

---

### 3. Documentation Created ✅

#### README.md
Comprehensive project documentation including:
- Project overview and tech stack
- Folder structure explanation
- **Project Standards & Rules**:
  - Next.js documentation index reference
  - Standards & Automation Protocol (skills usage)
  - **Guy's Custom Code Style**:
    - RTL & Logical Properties (use 'start'/'end', never 'left'/'right')
    - **Spec-Driven Development (SDD)**
    - Factory Pattern for testing
    - Assert What Matters principle
  - **Git Workflow**: Conventional Commits
  - **Folder Structure**: Fractal & Layered Hierarchy
    - Shared Layer (src root) — domain-agnostic
    - Features Layer (src/features) — self-contained modules
    - App Layer (src/app) — routing and glue
  - **Dependency Rules**: Shared → Features → App
  - Learning Protocol
  - Tech Stack Reference
  - Do Not list (secrets, commits without tests)

#### PROJECT_PLAN.md
Detailed 8-phase implementation roadmap:

1. **Phase 1: Project Setup & Architecture** ✅ COMPLETE
   - Next.js initialization
   - Folder structure
   - Environment variables

2. **Phase 2: Static Data Layer** (NEXT)
   - Create locations data (Kotor, Durmitor, Skadar Lake, etc.)
   - Create activities data (Rafting, Canyoning, ATV, etc.)
   - Define TypeScript types

3. **Phase 3: Map Component**
   - Google Maps integration
   - Interactive markers
   - Location selection

4. **Phase 4: Route Engine (Core Logic)** 🔥
   - Pure TypeScript function
   - Time calculation
   - Route validation (≤12h)
   - Timeline generation

5. **Phase 5: API Route — Route Calculation**
   - `/api/route-calc` endpoint
   - Google Maps Distance Matrix API
   - Error handling

6. **Phase 6: Pricing Engine**
   - Price calculation logic
   - `/api/pricing` endpoint
   - Configurable rules

7. **Phase 7: UI Integration**
   - Trip setup form
   - Map integration
   - Timeline display
   - Booking form

8. **Phase 8: Booking Request** (Optional)
   - Booking API
   - Data persistence

---

### 4. Git Repository Setup ✅

**Commands Executed**:
```bash
# Stage all changes
git add .

# Initial commit with conventional commits format
git commit -m "docs: add project documentation and reorganize structure

- Add comprehensive README with project standards, testing philosophy, and folder structure rules
- Add PROJECT_PLAN with detailed implementation roadmap for all 8 phases
- Reorganize project structure: move app/ to src/app/
- Create folder structure: components/, features/, lib/, data/, types/
- Configure project for portfolio-grade development"

# Connect to GitHub
git remote add origin https://github.com/jenniesaf/route-planner.git
git branch -M main
git push -u origin main
```

**Result**: Project pushed to GitHub successfully

---

### 5. Development Server Configuration ✅

**Package.json Updated**:
```json
{
  "scripts": {
    "dev": "next dev -p 3002"
  }
}
```

**Server Started**:
```bash
npm run dev
```

**Access**: http://localhost:3002  
**Status**: Running in background (Terminal ID: 314fa9ea-c769-4e1f-90dc-0750c6c3ebaf)

---

## Project Specifications

### Core Idea
One-page web app for tourists to:
- Select trip parameters (passengers, starting point, activities)
- Build custom routes from predefined destinations
- Ensure route is feasible (≤10-12 hours)
- Get price estimation
- Submit booking request

### Main Features

1. **Trip Setup**:
   - Passengers: 1-8
   - Starting points: Budva, Podgorica, Žabljak
   - Activities: Rafting, Canyoning, ATV, Jeep tours, Zipline

2. **Interactive Map**:
   - Google Maps integration
   - Predefined clickable spots
   - Location selection

3. **Route Engine** (Core Logic):
   - Calculate travel time + visit time + activity time
   - Validate total ≤ 10-12 hours
   - Auto-suggest optimizations if invalid

4. **Pricing Engine**:
   - Based on passengers, distance/time, activities

5. **Output**:
   - Route preview
   - Hour-by-hour timeline
   - Price estimation
   - "Send Request" button

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn/UI
- **Database**: Prisma + PostgreSQL (later)
- **APIs**: Google Maps API (Distance Matrix)
- **Testing**: Vitest + React Testing Library

---

## Key Decisions & Standards

### Architecture Decisions
- ✅ Start without database (hardcoded data)
- ✅ No route optimization in MVP (just validation)
- ✅ All business logic in `lib/`, not components
- ✅ REST API via Next.js API routes
- ✅ Clean separation: Shared → Features → App

### Code Style (Non-Negotiable)
- **RTL Support**: Always use CSS Logical Properties ('start'/'end', never 'left'/'right')
- **Testing**: Spec-Driven Development (SDD)
  - Write tests FIRST (Happy Path + 2 Edge Cases)
  - Use Factory Pattern for test data
  - Prevent confirmatory bias
- **Git**: Conventional Commits format
  - `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`

### Folder Structure Rules
1. **Shared Layer** (src root): Domain-agnostic, used by all
2. **Features Layer** (src/features): Self-contained modules
3. **App Layer** (src/app): Routing glue, consumes others
4. **Dependency Flow**: Shared → Features → App (never reverse)

---

## Current File Structure

```
route-planner/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── favicon.ico
│   ├── components/       # (empty, ready for Phase 3)
│   ├── features/         # (empty, ready for features)
│   ├── lib/              # (empty, ready for Phase 4)
│   ├── data/             # (empty, ready for Phase 2)
│   └── types/            # (empty, ready for Phase 2)
├── public/
├── .git/
├── .gitignore
├── .next/
├── AGENTS.md
├── CLAUDE.md
├── PROJECT_PLAN.md
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Next Steps (Ready to Implement)

### Immediate Next: Phase 2 — Static Data Layer

1. Create `src/types/index.ts`:
   ```typescript
   export type Location = {
     id: string;
     name: string;
     lat: number;
     lng: number;
     visitDuration: number; // hours
   };

   export type Activity = {
     id: string;
     name: string;
     duration: number; // hours
     price: number; // EUR
   };

   export type StartingPoint = {
     id: string;
     name: string;
     lat: number;
     lng: number;
   };

   export type TripConfig = {
     passengers: number;
     start: string;
     locations: string[];
     activities: string[];
   };

   export type RouteResult = {
     totalTime: number;
     travelTime: number;
     visitTime: number;
     activityTime: number;
     isValid: boolean;
     warnings: string[];
     timeline: TimelineItem[];
   };

   export type TimelineItem = {
     time: string;
     type: 'travel' | 'visit' | 'activity';
     location?: string;
     activity?: string;
     duration: number;
   };
   ```

2. Create `src/data/locations.ts` with Montenegro destinations
3. Create `src/data/activities.ts` with tourist activities
4. Create `src/data/startingPoints.ts` with starting locations

---

## Environment Setup Required

### Google Maps API Key
Create `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Note**: Remember to add to `.gitignore` (already configured)

---

## Testing Strategy

### Spec-Driven Development Workflow
1. Create test file with Factory function
2. Write Happy Path test first
3. Write Edge Case tests (at least 2)
4. Implement minimal code to pass all tests
5. Refactor while maintaining green state

### Example Test Structure
```typescript
// Factory Pattern
function makeTrip(overrides = {}) {
  return {
    passengers: 4,
    start: "Budva",
    locations: ["kotor", "perast"],
    activities: [],
    ...overrides
  };
}

// Happy Path
test("should calculate valid route under 12 hours", () => {
  const trip = makeTrip();
  expect(calculateRoute(trip).isValid).toBe(true);
});

// Edge Case 1
test("should fail when total time exceeds 12 hours", () => {
  const trip = makeTrip({ 
    locations: ["kotor", "durmitor", "skadar", "ostrog", "lovcen"] 
  });
  expect(calculateRoute(trip).isValid).toBe(false);
});
```

---

## Git Workflow for Milestones

Every milestone should be committed and pushed:

```bash
# Make changes
git add .
git commit -m "feat(data): add Montenegro locations and activities

- Add 7 tourist locations with coordinates and visit durations
- Add 5 activities with durations and prices
- Define TypeScript types for Location, Activity, Trip"

git push origin main
```

---

## Important Reminders

### Before Each Commit:
- ✅ Run typecheck: `npm run build` (or `tsc --noEmit`)
- ✅ Run tests: `npm test` (once set up)
- ✅ Follow Conventional Commits format

### Code Style:
- ❌ NEVER use `left` or `right` in CSS
- ✅ ALWAYS use `start`, `end`, `inline`, `block`
- ❌ NO `any` types in TypeScript
- ✅ Prefer `type` over `interface`

### Architecture:
- Business logic → `lib/`
- UI components → `components/`
- Feature modules → `features/`
- Static data → `data/`
- Types → `types/`

---

## Session Summary

**Status**: Initial project setup complete ✅  
**Repository**: https://github.com/jenniesaf/route-planner  
**Dev Server**: Running on http://localhost:3002  
**Next Phase**: Phase 2 — Static Data Layer  

**Ready to continue building when needed!**

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server (port 3002)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Git
git status              # Check changes
git add .               # Stage all
git commit -m "..."     # Commit with message
git push origin main    # Push to GitHub

# Useful
git log --oneline       # View commit history
git remote -v           # View remote URLs
```

---

**END OF CHAT EXPORT**

# Montenegro Route Planner — Implementation Plan

A modern, scalable route planner for tourists in Montenegro, built with Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, REST API, and Google Maps API. The app enables users to configure a custom day trip, see a feasible route, get a price, and submit a booking request.

---

## 🎯 Core Idea

A one-page web app that allows tourists to:
- Select trip parameters
- Build a custom route from predefined destinations
- Ensure the route is feasible (time ≤ 10–12h)
- Get price estimation
- Submit booking request

---

## 📋 Implementation Phases

### Phase 1: Project Setup & Architecture ✅

**Goal**: Initialize a Next.js 14 project with App Router, TypeScript, and Tailwind CSS.

**Tasks**:
1. ✅ Initialize Next.js 14 project with TypeScript and Tailwind CSS
2. ✅ Organize folder structure:
   - `src/app/` — pages, API routes
   - `src/components/` — shared UI components
   - `src/lib/` — business logic
   - `src/data/` — static data
   - `src/types/` — TypeScript types
   - `src/features/` — feature-based modules
   - `prisma/` — DB schema (added later)
3. Configure environment variables for Google Maps API

---

### Phase 2: Static Data Layer

**Goal**: Create a data layer for locations and activities.

**Tasks**:
1. Create `src/data/locations.ts`:
   - Export array of location objects with: id, name, lat, lng, visitDuration
   - Example locations:
     - Kotor Old Town
     - Durmitor National Park
     - Skadar Lake
     - Ostrog Monastery
     - Perast
     - Bay of Kotor
     - Lovcen National Park

2. Create `src/data/activities.ts`:
   - Export array of activity objects with: id, name, duration, price
   - Example activities:
     - Rafting (3-4 hours)
     - Canyoning (4-5 hours)
     - ATV tours (2-3 hours)
     - Jeep tours (3-4 hours)
     - Zipline (1-2 hours)

3. Create `src/data/startingPoints.ts`:
   - Export array of starting points: Budva, Podgorica, Žabljak

4. Define shared types in `src/types/index.ts`:
   - Location type
   - Activity type
   - StartingPoint type
   - TripConfig type
   - RouteResult type

---

### Phase 3: Map Component

**Goal**: Build interactive Google Maps component for location selection.

**Tasks**:
1. Create `src/lib/googleMaps.ts`:
   - Helper functions for Google Maps API
   - Load Google Maps script
   - Initialize map

2. Create `src/components/map/Map.tsx`:
   - Integrate Google Maps JS API
   - Center map on Montenegro (lat: 42.5, lng: 19.3)
   - Display map with zoom controls

3. Create `src/components/map/Marker.tsx`:
   - Render custom markers for locations
   - Handle click events
   - Show selected/unselected state

4. Add selection logic:
   - Allow users to select/deselect markers
   - Store selected locations in React state
   - Visual feedback for selected locations

---

### Phase 4: Route Engine (Core Logic) 🔥

**Goal**: Implement the core route calculation logic.

**Tasks**:
1. Create `src/lib/routeEngine.ts`:
   - Pure TypeScript function (deterministic, testable)
   - **Input**:
     - Starting point
     - Selected locations (array)
     - Selected activities (array)
     - Travel times between locations (injected from API)
   - **Output**:
     - Total travel time
     - Total visit time
     - Total activity time
     - Total trip duration
     - `isValid` (boolean: ≤ 12 hours)
     - Warnings array (if any)
     - Timeline (hour-by-hour breakdown)

2. Logic:
   - Calculate total time = travel time + visit time + activity time
   - Validate: total ≤ 12 hours
   - If invalid: generate warnings/suggestions
   - Return structured result

3. Testing:
   - Write comprehensive test suite using Vitest
   - Test happy path (valid route)
   - Test edge cases (too many stops, long activities)
   - Test with factory pattern for test data

---

### Phase 5: API Route — Route Calculation

**Goal**: Create API endpoint to calculate routes using Google Maps.

**Tasks**:
1. Create `src/app/api/route-calc/route.ts`:
   - Accept POST request with trip data:
     ```json
     {
       "start": "Budva",
       "locations": ["kotor", "perast"],
       "activities": ["rafting"],
       "passengers": 4
     }
     ```
   - Call Google Maps Distance Matrix API to get travel times
   - Use `routeEngine` to calculate total duration
   - Return JSON response:
     ```json
     {
       "totalTime": 10.5,
       "valid": true,
       "warnings": [],
       "timeline": [...],
       "travelTime": 3.5,
       "visitTime": 4.0,
       "activityTime": 3.0
     }
     ```
   - Handle errors properly (API failures, invalid input)

2. Error handling:
   - Validate request body
   - Handle Google Maps API errors
   - Return proper HTTP status codes

---

### Phase 6: Pricing Engine

**Goal**: Calculate trip price based on parameters.

**Tasks**:
1. Create `src/lib/pricingEngine.ts`:
   - Pure function for price calculation
   - **Input**:
     - Number of passengers
     - Trip duration (hours)
     - Selected activities
     - Total distance (km)
   - **Output**:
     - Base price
     - Activity costs
     - Per-person multiplier
     - Total price
   - Make pricing rules configurable

2. Pricing rules (example):
   - Base price: €50 per trip
   - Distance: €1 per km
   - Per passenger: +€20 for 2-4 passengers, +€30 for 5-8 passengers
   - Activities: Add activity prices
   - Round to nearest €5

3. Create `src/app/api/pricing/route.ts`:
   - Accept POST with trip data
   - Calculate price using `pricingEngine`
   - Return JSON:
     ```json
     {
       "basePrice": 50,
       "distancePrice": 120,
       "passengerPrice": 80,
       "activityPrice": 60,
       "totalPrice": 310
     }
     ```

4. Testing:
   - Write tests for pricing logic
   - Test different passenger counts
   - Test with/without activities

---

### Phase 7: UI Integration

**Goal**: Build user interface and connect all components.

**Tasks**:
1. Create UI components:
   - `src/components/ui/Button.tsx` — reusable button
   - `src/components/ui/Select.tsx` — dropdown select
   - `src/components/ui/Card.tsx` — card container
   - `src/components/ui/Badge.tsx` — badges for selected items

2. Create trip setup form:
   - `src/components/trip/TripForm.tsx`:
     - Select number of passengers (1-8)
     - Select starting point (Budva, Podgorica, Žabljak)
     - Select activities (checkboxes)
     - Display selected options

3. Create timeline display:
   - `src/components/trip/Timeline.tsx`:
     - Display hour-by-hour breakdown
     - Show travel time, visit time, activity time
     - Visual timeline with icons

4. Create booking form:
   - `src/components/trip/BookingForm.tsx`:
     - Name, email, phone fields
     - Date picker for trip date
     - Comments/notes textarea
     - Submit button

5. Main page integration:
   - `src/app/page.tsx`:
     - Layout: Form on left, Map on right
     - State management for trip config
     - Connect form to map (bidirectional)
     - Submit button triggers API calls
     - Display results (timeline, price, warnings)
     - Show "Send Request" button when valid

6. API integration:
   - On submit:
     1. Call `/api/route-calc` with trip data
     2. Call `/api/pricing` with trip data
     3. Display loading state
     4. Show results or errors
   - Use React hooks (useState, useEffect)
   - Add loading spinners
   - Add error handling and messages

---

### Phase 8: Booking Request (Optional, for MVP)

**Goal**: Allow users to submit booking requests.

**Tasks**:
1. Create `src/app/api/booking/route.ts`:
   - Accept POST with booking data
   - Store in-memory (array) for now
   - Return confirmation

2. Later (with DB):
   - Create Prisma schema for bookings
   - Store in PostgreSQL
   - Add admin panel to view requests

---

## 📂 File Structure Summary

```
route-planner/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Main page
│   │   ├── layout.tsx                # Root layout
│   │   ├── api/
│   │   │   ├── route-calc/
│   │   │   │   └── route.ts          # Route calculation API
│   │   │   ├── pricing/
│   │   │   │   └── route.ts          # Pricing API
│   │   │   └── booking/
│   │   │       └── route.ts          # Booking API
│   │   └── globals.css
│   ├── components/
│   │   ├── map/
│   │   │   ├── Map.tsx               # Google Maps component
│   │   │   └── Marker.tsx            # Map markers
│   │   ├── trip/
│   │   │   ├── TripForm.tsx          # Trip setup form
│   │   │   ├── Timeline.tsx          # Timeline display
│   │   │   └── BookingForm.tsx       # Booking form
│   │   └── ui/
│   │       ├── Button.tsx            # UI button
│   │       ├── Select.tsx            # UI select
│   │       ├── Card.tsx              # UI card
│   │       └── Badge.tsx             # UI badge
│   ├── lib/
│   │   ├── routeEngine.ts            # Core route calculation logic
│   │   ├── pricingEngine.ts          # Pricing logic
│   │   └── googleMaps.ts             # Google Maps helpers
│   ├── data/
│   │   ├── locations.ts              # Location data
│   │   ├── activities.ts             # Activity data
│   │   └── startingPoints.ts         # Starting points
│   ├── types/
│   │   └── index.ts                  # Shared TypeScript types
│   └── features/                     # (Future feature modules)
├── prisma/
│   └── schema.prisma                 # (Later: DB schema)
├── tests/                            # (Test files)
├── public/                           # Static assets
├── PROJECT_PLAN.md                   # This file
├── README.md                         # Project documentation
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

---

## ✅ Verification Checklist

### Manual Testing
- [ ] Trip setup: Select passengers, starting point, activities
- [ ] Map: Select/deselect locations
- [ ] Route calculation: Submit and see results
- [ ] Validation: Try invalid routes (too long)
- [ ] Pricing: Verify price calculation
- [ ] Timeline: View hour-by-hour breakdown
- [ ] Booking: Submit booking request

### Automated Testing
- [ ] Unit tests for `routeEngine`
- [ ] Unit tests for `pricingEngine`
- [ ] API tests for `/api/route-calc`
- [ ] API tests for `/api/pricing`
- [ ] Component tests for key UI components

### Edge Cases
- [ ] No locations selected
- [ ] Too many locations (> 12 hours)
- [ ] Activities causing time overflow
- [ ] Invalid starting point
- [ ] Google Maps API failure
- [ ] Invalid passenger count

---

## 🚀 Engineering Decisions

### Start Simple
- ✅ Hardcode locations and activities (no DB initially)
- ✅ No route optimization in MVP (just validation)
- ✅ In-memory booking storage (add DB later)

### Clean Architecture
- ✅ All business logic in `lib/`, not in components
- ✅ Pure functions for testing
- ✅ Separation of concerns (data, logic, UI)
- ✅ REST API via Next.js API routes

### Best Practices
- ✅ TypeScript strict mode
- ✅ Spec-Driven Development (tests first)
- ✅ Factory pattern for test data
- ✅ Conventional Commits
- ✅ CSS Logical Properties (no left/right)

---

## 🎨 Future Enhancements

1. **Route Optimization**: Auto-optimize route order for minimum time
2. **Database**: Add Prisma + PostgreSQL for bookings
3. **Admin Panel**: View and manage booking requests
4. **Multi-day Trips**: Support trips > 1 day
5. **Weather Integration**: Show weather forecast for trip date
6. **User Accounts**: Save favorite routes
7. **Email Notifications**: Send confirmation emails
8. **Payment Integration**: Accept online payments
9. **Mobile App**: React Native version
10. **Real-time Availability**: Check guide availability

---

## 📝 Notes

- Google Maps API key required (store in `.env.local`)
- Test with various combinations of locations and activities
- Focus on code quality and best practices (portfolio project)
- Document all decisions and trade-offs
- Keep commits small and focused

---

**Status**: Phase 1 Complete ✅  
**Next**: Phase 2 — Static Data Layer  
**Last Updated**: April 16, 2026

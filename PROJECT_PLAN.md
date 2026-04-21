# Montenegro Route Planner — Implementation Plan

A modern, scalable route planner for tourists in Montenegro, built with Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, REST API, and Google Maps API. The app enables users to configure a custom day trip, see a feasible route, get a price, and submit a booking request.

---

## 🎯 Core Idea

A one-page web app that allows tourists to:
- Plan **single-day or multi-day trips** in Montenegro
- Select trip parameters (passengers, starting point, **ending point**, activities)
- Build custom routes from predefined destinations via interactive map
- See **live preview** of each day's itinerary
- Ensure each day is feasible (≤ 10–12 hours)
- Get price estimation per day and total
- Submit booking request for entire trip

### Multi-Day Trip Support
- **Day trips**: Each day has a start point and end point
- **Flexible routing**: Day 1 can end in a different city than it started
- **Efficient planning**: Day 2 starts where Day 1 ended (no backtracking)
- **Automatic progression**: Completing Day 1 automatically enables Day 2 planning
- **Visual preview**: See each day's route before confirming

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
   - Export array of points: Budva, Podgorica, Žabljak
   - Note: Same locations used for both starting AND ending points

4. Define shared types in `src/types/index.ts`:
   - Location type
   - Activity type
   - StartingPoint type (also used for ending points)
   - **DayTrip type** (single day itinerary)
   - **MultiDayTrip type** (array of DayTrip)
   - TripConfig type
   - RouteResult type
   - **DayTimeline type** (day-by-day breakdown, not hourly)

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

**Goal**: Implement the core route calculation logic for **day-based trips**.

**Tasks**:
1. Create `src/lib/routeEngine.ts`:
   - Pure TypeScript function (deterministic, testable)
   - **Input**:
     - Starting point
     - **Ending point** (can be different from start)
     - Selected locations (array)
     - Selected activities (array)
     - Travel times between locations (injected from API)
   - **Output**:
     - Total travel time
     - Total visit time
     - Total activity time
     - Total trip duration (for the day)
     - `isValid` (boolean: ≤ 10-12 hours per day)
     - Warnings array (if any)
     - **Day timeline** (major stops, not hour-by-hour)
     - **Route order** (start → locations → end)

2. Logic:
   - Calculate total time = travel time (start → locations → end) + visit time + activity time
   - Validate: total ≤ 10-12 hours (per day)
   - If invalid: generate warnings/suggestions
   - Return structured result for single day

3. Create `src/lib/multiDayEngine.ts`:
   - Handles multi-day trip logic
   - Validates each day individually
   - Ensures Day N ending point = Day N+1 starting point
   - Calculates total pricing across all days

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
   - Accept POST request with **day trip data**:
     ```json
     {
       "dayNumber": 1,
       "start": "Budva",
       "end": "Podgorica",
       "locations": ["kotor", "perast"],
       "activities": ["rafting"],
       "passengers": 4
     }
     ```
   - Call Google Maps Distance Matrix API to get travel times
   - Use `routeEngine` to calculate total duration for the day
   - Return JSON response:
     ```json
     {
       "dayNumber": 1,
       "totalTime": "10 hours",
       "valid": true,
       "warnings": [],
       "timeline": [
         {"type": "travel", "from": "Budva", "to": "Kotor", "duration": "1h"},
         {"type": "visit", "location": "Kotor", "duration": "2h"},
         {"type": "activity", "name": "Rafting", "duration": "4h"},
         {"type": "travel", "from": "Kotor", "to": "Podgorica", "duration": "3h"}
       ],
       "travelTime": "4h",
       "visitTime": "2h",
       "activityTime": "4h"
     }
     ```
   - Handle errors properly (API failures, invalid input)

2. **Optional**: Create `src/app/api/multi-day-calc/route.ts`:
   - Accept array of days
   - Validate Day N end = Day N+1 start
   - Return combined result for all days
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
     - **Select ending point** (Budva, Podgorica, Žabljak)
     - Select activities (checkboxes)
     - **Day indicator**: Show which day is being planned (Day 1, Day 2, etc.)
     - Display selected options

3. **Create preview component (NEW)**:
   - `src/components/trip/DayPreview.tsx`:
     - Floating panel or sidebar
     - Shows current day's planned route
     - Selected locations for this day
     - Route visualization preview
     - Duration estimate
     - Price for the day
     - Actions:
       - ✅ "Add This Day" button (confirms day)
       - ✏️ "Modify" (adjust locations)
       - 🗑️ "Discard" (clear day and start over)

4. **Create multi-day summary (NEW)**:
   - `src/components/trip/MultiDaySummary.tsx`:
     - Shows all confirmed days
     - Each day as collapsible card:
       - Day number and route (e.g., "Day 1: Budva → Podgorica")
       - Locations visited
       - Duration and price
       - Edit and Delete buttons
     - "+ Add Another Day" button
     - Total trip price across all days

5. Create timeline display:
   - `src/components/trip/DayTimeline.tsx`:
     - **Day-by-day breakdown** (not hour-by-hour)
     - Show travel path, visit stops, activity stops
     - Visual timeline with icons:
       - 🚗 Travel segments
       - 📍 Visit locations  
       - 🚣 Activities
     - Collapsible per day (for multi-day trips)

6. Create booking form:
   - `src/components/trip/BookingForm.tsx`:
     - Name, email, phone fields
     - Date picker for **first day of trip**
     - Comments/notes textarea
     - Submit button
     - Shows **all days** in booking request

7. Main page integration:
   - `src/app/page.tsx`:
     - Layout: Form on left, Map on right
     - **State management for multi-day trips**:
       - `currentDay` (which day is being planned)
       - `completedDays` (array of confirmed days)
       - `currentDayConfig` (selections for day being planned)
     - Connect form to map (bidirectional)
     - **Preview panel** shows live updates as user clicks map
     - **Multi-day summary** shows all confirmed days
     - Submit button triggers API calls
     - Display results (timeline, price, warnings)
     - Show "Send Request" button when at least 1 day is confirmed

8. **Map interaction updates**:
   - Color-code markers by day:
     - Day 1: Blue markers
     - Day 2: Green markers
     - Day 3: Orange markers
   - Show route lines color-coded by day
   - Toggle to view specific day or all days
   - Clear visual distinction between days

9. API integration:
   - On submit:
     1. Call `/api/route-calc` for **each day**
     2. Call `/api/pricing` for **each day** and calculate total
     3. Display loading state
     4. Show results or errors
   - Use React hooks (useState, useEffect)
   - Add loading spinners
   - Add error handling and messages
   - **Multi-day validation**: Ensure Day N end = Day N+1 start

---

### Phase 8: Booking Request (Optional, for MVP)

**Goal**: Allow users to submit **multi-day** booking requests.

**Tasks**:
1. Create `src/app/api/booking/route.ts`:
   - Accept POST with **multi-day** booking data:
     ```json
     {
       "passengers": 4,
       "contactInfo": {
         "name": "Maria Schmidt",
         "email": "maria@example.com",
         "phone": "+49123456789"
       },
       "startDate": "2026-06-15",
       "days": [
         {
           "dayNumber": 1,
           "start": "Budva",
           "end": "Podgorica",
           "locations": ["kotor", "perast"],
           "activities": ["rafting"],
           "duration": "10 hours",
           "price": 280
         },
         {
           "dayNumber": 2,
           "start": "Podgorica",
           "end": "Žabljak",
           "locations": ["skadar-lake", "ostrog"],
           "activities": [],
           "duration": "8 hours",
           "price": 220
         }
       ],
       "totalPrice": 500,
       "notes": "Prefer morning departure"
     }
     ```
   - Validate all days
   - Store in-memory (array) for now
   - Return confirmation with booking ID

2. Later (with DB):
   - Create Prisma schema for multi-day bookings
   - Store in PostgreSQL
   - Add admin panel to view requests
   - Email notifications

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
│   │   │   │   └── route.ts          # Route calculation API (per day)
│   │   │   ├── multi-day-calc/
│   │   │   │   └── route.ts          # Multi-day validation API (optional)
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
│   │   │   ├── TripForm.tsx          # Trip setup form (start/end points)
│   │   │   ├── DayPreview.tsx        # Preview panel for current day
│   │   │   ├── MultiDaySummary.tsx   # Summary of all confirmed days
│   │   │   ├── DayTimeline.tsx       # Day-by-day timeline display
│   │   │   └── BookingForm.tsx       # Booking form
│   │   └── ui/
│   │       ├── Button.tsx            # UI button
│   │       ├── Select.tsx            # UI select
│   │       ├── Card.tsx              # UI card
│   │       └── Badge.tsx             # UI badge
│   ├── lib/
│   │   ├── routeEngine.ts            # Core route calculation (single day)
│   │   ├── multiDayEngine.ts         # Multi-day trip logic
│   │   ├── pricingEngine.ts          # Pricing logic
│   │   └── googleMaps.ts             # Google Maps helpers
│   ├── data/
│   │   ├── locations.ts              # Location data
│   │   ├── activities.ts             # Activity data
│   │   └── startingPoints.ts         # Starting/ending points
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
- [ ] Trip setup: Select passengers, starting point, **ending point**, activities
- [ ] Map: Select/deselect locations
- [ ] **Preview**: See live preview as locations are selected
- [ ] Route calculation: Submit and see results for one day
- [ ] **Multi-day**: Add Day 2, verify Day 2 start = Day 1 end
- [ ] **Multi-day summary**: View all confirmed days
- [ ] Validation: Try invalid routes (too long for one day)
- [ ] Pricing: Verify price calculation per day and total
- [ ] **Day editing**: Edit or delete a previously confirmed day
- [ ] Timeline: View day-by-day breakdown
- [ ] Booking: Submit multi-day booking request
- [ ] Timeline: View hour-by-hour breakdown
- [ ] Booking: Submit booking request

### Automated Testing
- [ ] Unit tests for `routeEngine`
- [ ] Unit tests for `pricingEngine`
- [ ] API tests for `/api/route-calc`
- [ ] API tests for `/api/pricing`
- [ ] Component tests for key UI components

### Edge Cases
- [ ] No locations selected for a day
- [ ] Too many locations for one day (> 10-12 hours)
- [ ] Activities causing time overflow
- [ ] Invalid starting point
- [ ] **Ending point same as starting point** (round trip)
- [ ] **Day 2 start ≠ Day 1 end** (should fail validation)
- [ ] Google Maps API failure
- [ ] Invalid passenger count
- [ ] **Deleting Day 1 when Day 2, 3 exist** (should re-validate all days)

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

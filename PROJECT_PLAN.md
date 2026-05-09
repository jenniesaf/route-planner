# Montenegro Route Planner — Implementation Plan

A modern, scalable route planner for tourists in Montenegro, built with Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, REST API, and Google Maps API. The app enables users to configure a custom day trip, see a feasible route, get a price, and submit a booking request.

---

## 🎯 Core Idea

A one-page web app that allows tourists to:
- **Choose trip type**: One-day tour, Multi-day tour, or Full vacation tour
- Plan **single-day or multi-day trips** in Montenegro
- Select trip parameters (passengers, starting point, **ending point**, activities)
- Build custom routes from predefined destinations via interactive map
- **Choose specific dates** for each day (days can be non-consecutive)
- See **live preview** of each day's itinerary
- Ensure each day is feasible (≤ 10–12 hours)
- Get price estimation on final step (Step 3)
- Submit booking request for entire trip OR special request for full vacation planning

### Trip Type Options

**1. One-Day Tour**:
- Single day trip
- Start and end points
- See price and book immediately

**2. Multi-Day Tour**:
- Multiple day trips with different start/end points
- **Non-consecutive dates allowed** (e.g., Day 1: Apr 20, Day 2: Apr 23, Day 3: Apr 25)
- Day N can end in different city than it started
- Day N+1 starts where Day N ended
- Each day selected independently with specific date

**3. Full Vacation Tour** (Special Request):
- For complete vacation planning
- Shows **attractive popup** with simple form:
  - Vacation start date
  - Vacation end date
  - Number of passengers
  - Phone number
  - Email
- Message: "We'll contact you privately to plan your perfect Montenegro vacation"
- Bypasses normal planning flow
- Goes directly to special request submission

### Multi-Day Trip Support
- **Day trips**: Each day has a start point and end point
- **Flexible routing**: Day 1 can end in a different city than it started
- **Efficient planning**: Day 2 starts where Day 1 ended (no backtracking)
- **Automatic progression**: Completing Day 1 automatically enables Day 2 planning
- **Date flexibility**: Each day can be scheduled on any future date (non-consecutive)
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
   - Export array of activity objects with: id, name, duration, price, **availableAt** (array of location IDs)
   - Example activities:
     - Rafting (3-4 hours) - Available at: Tara Canyon, Moraca Canyon
     - Canyoning (4-5 hours) - Available at: Nevidio Canyon
     - ATV tours (2-3 hours) - Available at: Durmitor, Lovcen
     - Jeep tours (3-4 hours) - Available at: Durmitor, Biogradska Gora
     - Zipline (1-2 hours) - Available at: Tara Canyon
   - **Key**: Each activity specifies which locations offer it

3. Create `src/data/startingPoints.ts`:
   - Export array of points: Budva, Podgorica, Žabljak
   - Note: Same locations used for both starting AND ending points

4. Define shared types in `src/types/index.ts`:
   - Location type
   - **Activity type** (includes `availableAt: string[]`)
   - StartingPoint type (also used for ending points)
   - **DayTrip type** (single day itinerary)
   - **MultiDayTrip type** (array of DayTrip)
   - **SelectedActivity type** (activity + location where it's done)
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
   - **Show activity availability**:
     - When an activity is selected, highlight markers that offer it
     - Add badge/icon to markers showing available activities
     - Visual distinction between regular and activity-offering locations

4. Add selection logic:
   - Allow users to select/deselect markers
   - Store selected locations in React state
   - Visual feedback for selected locations
   - **Activity filtering logic**:
     - When activity selected: highlight compatible locations on map
     - All locations remain visible
     - Users can only perform activity at locations that offer it
     - Show warning if activity selected but no compatible locations chosen

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
1. **Create trip type selector (NEW - Step 1)**:
   - `src/components/trip/TripTypeSelector.tsx`:
     - Three card options:
       - "One-Day Tour" — single day planning
       - "Multi-Day Tour" — multiple days with different start/end
       - "Full Vacation Tour" — opens special popup
     - Each card with icon, title, description
     - Click selects mode or opens popup

2. **Create full vacation popup (NEW)**:
   - `src/components/trip/FullVacationPopup.tsx`:
     - Attractive modal with Montenegro imagery
     - Header: "Plan Your Perfect Montenegro Vacation"
     - Form fields:
       - Vacation start date (date picker)
       - Vacation end date (date picker)
       - Number of passengers (1-8)
       - Phone number (with country code)
       - Email
     - CTA: "Request Vacation Planning"
     - Submits special request (bypasses normal flow)

3. Create UI components:
   - `src/components/ui/Button.tsx` — reusable button
   - `src/components/ui/Select.tsx` — dropdown select
   - `src/components/ui/Card.tsx` — card container
   - `src/components/ui/Badge.tsx` — badges for selected items
   - `src/components/ui/DatePicker.tsx` — date selection

4. Create trip configuration form:
   - `src/components/trip/TripForm.tsx`:
     - **Date picker** for current day (allows non-consecutive dates)
     - Select number of passengers (1-8)
     - Select starting point (Budva, Podgorica, Žabljak)
     - **Select ending point** (Budva, Podgorica, Žabljak)
     - **Select activities** (checkboxes):
       - When activity selected, map highlights compatible locations
       - Show count of compatible locations available
       - Disable activity if no compatible locations exist
     - **Day indicator**: Show which day is being planned (Day 1 (Apr 20), Day 2 (Apr 23), etc.)
     - Display selected options

5. **Create preview component (NEW - Step 2)**:
   - `src/components/trip/DayPreview.tsx`:
     - Floating panel or sidebar
     - Shows current day's planned route
     - **Shows date** for this day
     - Selected locations for this day
     - Route visualization preview
     - Duration estimate
     - **NO PRICE** (price shown only in Step 3)
     - Actions:
       - ✅ "Confirm This Day" button
       - ✏️ "Modify" (adjust locations)
       - 🗑️ "Discard" (clear day and start over)

6. **Create multi-day summary (NEW)**:
   - `src/components/trip/MultiDaySummary.tsx`:
     - Shows all confirmed days
     - Each day as collapsible card:
       - Day number, **date**, and route (e.g., "Day 1 (Apr 20): Budva → Podgorica")
       - Locations visited
       - Duration (**NO PRICE until Step 3**)
       - Edit and Delete buttons
     - "+ Add Another Day" button
     - **Total price only shown in Step 3**

7. Create timeline display:
   - `src/components/trip/DayTimeline.tsx`:
     - **Day-by-day breakdown** (not hour-by-hour)
     - Show travel path, visit stops, activity stops
     - Visual timeline with icons:
       - 🚗 Travel segments
       - 📍 Visit locations  
       - 🚣 Activities
     - Collapsible per day (for multi-day trips)

8. **Create price summary component (NEW - Step 3 only)**:
   - `src/components/trip/PriceSummary.tsx`:
     - Price breakdown per day
     - Total price (prominent)
     - Only rendered in Step 3
     - Clean pricing table/card

9. Create booking form:
   - `src/components/trip/BookingForm.tsx`:
     - Shown only in **Step 3**
     - Name, email, phone fields
     - **Not needed**: Date picker (dates already set per day)
     - Comments/notes textarea
     - Submit button
     - Shows summary of **all days** with dates

10. **Main page integration - 3-Step Flow**:
    - `src/app/page.tsx`:
    
    **Step 1: Trip Type Selection**
    - Show TripTypeSelector component
    - Options: One-Day, Multi-Day, Full Vacation
    - Full Vacation opens popup
    - One-Day/Multi-Day proceed to Step 2
    
    **Step 2: Plan Days (NO PRICE)**
    - Layout: Form on left, Map on right
    - **State management**:
      - `tripType` (one-day, multi-day, full-vacation)
      - `currentDay` (which day is being planned)
      - `completedDays` (array of confirmed days with dates)
      - `currentDayConfig` (selections for day being planned)
    - Show trip form (date, start/end, passengers, activities)
    - **Preview panel** shows live updates (NO PRICE)
    - **Multi-day summary** shows all confirmed days (NO PRICE)
    - "Add Another Day" for multi-day mode
    - "Continue to Booking" button (goes to Step 3)
    
    **Step 3: Price & Booking**
    - Show all confirmed days with **dates**
    - **NOW show price** (PriceSummary component)
    - Show booking form
    - Submit button sends booking request

11. **Map interaction updates**:
    - **Activity availability visualization**:
      - When activity selected: highlight/badge locations that offer it
      - All locations remain visible (don't filter/hide)
      - Visual indicators (badge, glow, special icon) for compatible locations
      - Tooltip showing available activities per location
    - **Multi-day color coding**:
      - Day 1: Blue markers
      - Day 2: Green markers
      - Day 3: Orange markers
    - Show route lines color-coded by day
    - Toggle to view specific day or all days
    - Clear visual distinction between days

12. **API integration (Step 3 only)**:
    - When user clicks "Continue to Booking" (Step 2 → Step 3):
      1. Call `/api/route-calc` for **each day**
      2. Call `/api/pricing` for **each day** and calculate total
      3. Display loading state
      4. Show price breakdown in Step 3
    - On booking submit (Step 3):
      1. Validate all data
      2. Submit to `/api/booking`
      3. Show confirmation
    - Use React hooks (useState, useEffect)
    - Add loading spinners
    - Add error handling and messages
    - **Multi-day validation**: Ensure Day N end = Day N+1 start
    
13. **Full vacation tour flow**:
    - Separate API endpoint: `/api/vacation-request`
    - Store special requests separately
    - Send confirmation email
    - Admin notification

---

### Phase 8: Booking & Special Requests

**Goal**: Allow users to submit **multi-day** booking requests AND full vacation special requests.

**Tasks**:

**A. Regular Booking API**:

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
   - Validate Day N end = Day N+1 start
   - Store in-memory (array) for now
   - Return confirmation with booking ID

**B. Full Vacation Request API**:

2. Create `src/app/api/vacation-request/route.ts`:
   - Accept POST with vacation request data:
     ```json
     {
       "vacationStart": "2026-06-01",
       "vacationEnd": "2026-06-14",
       "passengers": 4,
       "contactInfo": {
         "phone": "+49123456789",
         "email": "maria@example.com"
       }
     }
     ```
   - Store as special request (flagged differently from regular bookings)
   - Send auto-reply email to customer
   - Send admin notification
   - Return confirmation message

**C. Later Enhancements (with DB)**:

3. Database schema:
   - Create Prisma schema for multi-day bookings
   - Separate table for vacation special requests
   - Store in PostgreSQL
   
4. Admin features:
   - Admin panel to view and manage requests
   - Email notifications with templates
   - Status tracking (pending, confirmed, completed)

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
│   │   │   ├── booking/
│   │   │   │   └── route.ts          # Regular booking API
│   │   │   └── vacation-request/
│   │   │       └── route.ts          # Full vacation special request API
│   │   └── globals.css
│   ├── components/
│   │   ├── map/
│   │   │   ├── Map.tsx               # Google Maps component
│   │   │   └── Marker.tsx            # Map markers (with activity badges)
│   │   ├── trip/
│   │   │   ├── TripTypeSelector.tsx  # Step 1: Choose trip type
│   │   │   ├── FullVacationPopup.tsx # Special request popup
│   │   │   ├── TripForm.tsx          # Trip setup form (with date picker)
│   │   │   ├── DayPreview.tsx        # Live preview (no price)
│   │   │   ├── MultiDaySummary.tsx   # All confirmed days summary
│   │   │   ├── DayTimeline.tsx       # Day-by-day timeline display
│   │   │   ├── PriceSummary.tsx      # Price breakdown (Step 3 only)
│   │   │   └── BookingForm.tsx       # Booking form (Step 3)
│   │   └── ui/
│   │       ├── Button.tsx            # UI button
│   │       ├── Select.tsx            # UI select
│   │       ├── Card.tsx              # UI card
│   │       ├── Badge.tsx             # UI badge
│   │       └── DatePicker.tsx        # Date selection component
│   ├── lib/
│   │   ├── routeEngine.ts            # Core route calculation (single day)
│   │   ├── multiDayEngine.ts         # Multi-day trip logic
│   │   ├── pricingEngine.ts          # Pricing logic
│   │   └── googleMaps.ts             # Google Maps helpers
│   ├── data/
│   │   ├── locations.ts              # Location data
│   │   ├── activities.ts             # Activity data (with availableAt)
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

### Manual Testing - User Flow

**Step 1: Trip Type Selection**
- [ ] Three trip type options displayed correctly
- [ ] Full Vacation popup opens and closes properly
- [ ] Full Vacation form validation works
- [ ] Full Vacation special request submits successfully

**Step 2: Trip Planning (No Price)**
- [ ] Trip form: Select passengers (1-8)
- [ ] Trip form: Select starting point
- [ ] Trip form: Select ending point
- [ ] **Date picker**: Select date for current day
- [ ] **Activities**: Select activity, verify compatible locations highlighted on map
- [ ] **Activity badges**: Verify markers show activity availability
- [ ] Map: Click to select/deselect locations
- [ ] **Preview panel**: See live updates (route, duration, NO PRICE)
- [ ] **Confirm day**: Add day to trip
- [ ] **Multi-day summary**: View all confirmed days (with dates, NO PRICE)
- [ ] **Non-consecutive dates**: Add Day 1 (Apr 20), Day 2 (Apr 23) — verify works
- [ ] **Day editing**: Edit a previously confirmed day
- [ ] **Day deletion**: Delete a day, verify subsequent days update
- [ ] Validation: Try invalid route (>12 hours), see warnings

**Step 3: Price & Booking**
- [ ] **Price display**: Verify price appears for first time in Step 3
- [ ] **Price breakdown**: Per-day and total prices shown
- [ ] **Booking form**: Fill contact info
- [ ] **Submit**: Successfully submit booking
- [ ] **Confirmation**: See confirmation message

**Multi-Day Specific**
- [ ] Day 2 start point auto-fills from Day 1 end point
- [ ] Can add multiple days (Day 3, Day 4, etc.)
- [ ] Each day can have different date
- [ ] Multi-day color coding on map (Day 1: blue, Day 2: green, etc.)
- [ ] Route lines color-coded by day

### Automated Testing
- [ ] Unit tests for `routeEngine` (single day)
- [ ] Unit tests for `multiDayEngine` (cross-day validation)
- [ ] Unit tests for `pricingEngine`
- [ ] API tests for `/api/route-calc`
- [ ] API tests for `/api/pricing`
- [ ] API tests for `/api/booking`
- [ ] API tests for `/api/vacation-request`
- [ ] Component tests for TripTypeSelector
- [ ] Component tests for DayPreview
- [ ] Component tests for MultiDaySummary

### Edge Cases
- [ ] No locations selected for a day
- [ ] Too many locations for one day (> 10-12 hours)
- [ ] Activities causing time overflow
- [ ] **Activity selected but no compatible locations chosen** (should show warning)
- [ ] **Select location that doesn't support selected activity** (should prevent or warn)
- [ ] Invalid starting point
- [ ] **Ending point same as starting point** (round trip - should work)
- [ ] **Day 2 start ≠ Day 1 end** (should fail validation)
- [ ] **Past date selected** (should prevent or warn)
- [ ] **Date conflicts** (Day 1 date = Day 2 date, should warn)
- [ ] Google Maps API failure
- [ ] Invalid passenger count (0, negative, >8)
- [ ] **Deleting Day 1 when Day 2, 3 exist** (should re-validate all days)
- [ ] **Trying to book without confirming any days** (should prevent)
- [ ] **Price calculation failure** (show error gracefully)
- [ ] **Full vacation request with invalid dates** (end before start)

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

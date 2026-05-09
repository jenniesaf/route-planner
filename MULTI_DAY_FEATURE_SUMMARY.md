# Multi-Day Trip Planning Feature — Summary

## Core Concept Update

### Trip Type: Day-Based Planning (Not Hourly)
- Trips are organized by **full days**, not hour-by-hour
- Each day has a start point and end point
- Timeline shows day-by-day itinerary, not hourly breakdown

---

## Key Feature: Flexible Multi-Day Trips

### Starting & Ending Points
**Available Locations** (same for both):
- Budva
- Podgorica  
- Žabljak

### Activities & Location Availability
**Key Concept**: Activities are **location-specific**, not global.

**How It Works**:
- Each activity is only available at certain locations
- Example: Rafting is available in Tara Canyon (near Žabljak), not in Kotor
- When user selects an activity, map shows:
  - ✅ All locations visible
  - 🎯 Locations offering the selected activity are **highlighted/marked**
  - 📍 Regular locations shown normally

**Example**:
```
User selects "Rafting" activity:
- Map shows all 7 locations
- Tara Canyon marker: highlighted (offers Rafting)
- Kotor marker: normal (no Rafting available)
- User can only do Rafting if they select Tara Canyon
```

**How It Works**:
- **Day 1**: Start in Budva → Visit locations → End in Podgorica
- **Day 2**: Start in Podgorica (where Day 1 ended) → Visit locations → End in Žabljak
- **Day 3**: Start in Žabljak → Visit locations → End in Budva

This allows tourists to efficiently plan multi-day tours without backtracking to their original starting point each day.

---

## User Flow for Multi-Day Planning

### Step 1: Trip Type Selection
**User sees 3 options**:

**Option A: One-Day Tour**
- Single day planning
- Proceeds to standard flow

**Option B: Multi-Day Tour**
- Multiple independent day trips
- Each with its own date
- Proceeds to multi-day flow

**Option C: Full Vacation Tour** (Special)
- Shows attractive popup/modal:
  - "Plan Your Perfect Montenegro Vacation"
  - Fields:
    - Vacation start date (date picker)
    - Vacation end date (date picker)
    - Number of passengers (1-8)
    - Phone number
    - Email
  - Message: "Our team will contact you to create a personalized itinerary for your entire vacation"
  - Submit button: "Request Vacation Planning"
- Bypasses normal planning flow
- Sends special request to backend
- Shows confirmation message

### Step 2: Single Day Trip Flow
1. User selects **Day 1**
2. **Selects date** for this day
3. Chooses starting point (e.g., Budva)
4. Chooses ending point (e.g., Podgorica)
5. Clicks locations on map
6. Sees **live preview** of the trip (route, time, **NO PRICE YET**)
7. Can accept the day's plan or modify

### Step 2: Multi-Day Trip Flow
1. User completes Day 1 planning
   - **Selects specific date** for Day 1 (e.g., April 20)
   - Chooses start/end points
   - Selects locations
   - Confirms Day 1
2. **Day 2 option appears automatically**
3. Day 2 starting point = Day 1 ending point (auto-filled)
4. **User selects date for Day 2** (can be any future date, e.g., April 23 - non-consecutive)
5. User chooses Day 2 ending point
6. Clicks new locations on map
7. Sees preview for Day 2 (**NO PRICE YET**)
8. Confirms Day 2
9. Can add Day 3, Day 4, etc. as needed (each with own date)

### Step 3: Price & Booking
1. User has confirmed all desired days
2. **NOW price is calculated and shown**:
   - Price per day
   - Total price
   - Breakdown visible
3. Booking form appears
4. User fills contact info
5. Submits booking request

### Preview & Selection Interaction:
- **Map interaction**: Click locations to add to current day
- **Preview popup/panel**: Shows the planned route for current day
  - Route visualization
  - Duration estimate
  - Price for the day
  - List of locations in order
- **Actions in preview**:
  - ✅ "Add This Day" button (confirms and saves the day)
  - ✏️ "Modify" (adjust locations)
  - 🗑️ "Discard" (start over for this day)
- **Multi-day indicator**: Visual cue showing which day is being planned (Day 1, Day 2, Day 3, etc.)

---

## Trip Request Structure

### Regular Tour Request (One-Day or Multi-Day)

When user submits booking request, it includes ALL days:

```json
{
  "tripType": "multi-day",
  "passengers": 4,
  "days": [
    {
      "dayNumber": 1,
      "date": "2026-04-20",
      "start": "Budva",
      "end": "Podgorica",
      "locations": ["kotor", "perast", "lovcen"],
      "activities": [
        {
          "id": "rafting",
          "location": "tara-canyon"
        }
      ],
      "duration": "10 hours",
      "price": 280
    },
    {
      "dayNumber": 2,
      "date": "2026-04-23",
      "start": "Podgorica",
      "end": "Žabljak",
      "locations": ["skadar-lake", "ostrog"],
      "activities": [],
      "duration": "8 hours",
      "price": 220
    }
  ],
  "totalPrice": 500,
  "contactInfo": { ... }
}
```

**Note**: Days can have **non-consecutive dates** (Day 1: Apr 20, Day 2: Apr 23, skipping Apr 21-22)

### Full Vacation Tour Request (Special)

```json
{
  "tripType": "full-vacation",
  "vacationStart": "2026-06-01",
  "vacationEnd": "2026-06-14",
  "passengers": 4,
  "contactInfo": {
    "phone": "+49123456789",
    "email": "maria@example.com"
  },
  "notes": "Special request - needs personalized vacation planning"
}
```

---

## UI Changes Needed

### 1. Trip Type Selector (NEW - Step 1)
**Initial screen** showing 3 options as cards:

**Card A: One-Day Tour**
- Icon/image of day trip
- "Perfect for a quick adventure"
- Selects one-day planning mode

**Card B: Multi-Day Tour**  
- Icon/image of multi-day journey
- "Explore Montenegro at your own pace"
- Selects multi-day planning mode

**Card C: Full Vacation Tour**
- Icon/image of complete vacation
- "Let us plan your entire vacation"
- Opens special request popup

### 1b. Full Vacation Tour Popup (Special Request)
**Attractive modal** with:
- Header: "Plan Your Perfect Montenegro Vacation 🇲🇪"
- Subheader: "Our team will contact you to create a personalized itinerary for your entire stay"
- Form fields:
  - Vacation start date (date picker)
  - Vacation end date (date picker)
  - Number of passengers (1-8, stepper or dropdown)
  - Phone number (required, with country code selector)
  - Email (required)
- CTA Button: "Request Vacation Planning" (large, prominent)
- Close/back option

**Design**:
- Premium feel with Montenegro imagery
- Warm, inviting colors
- Clear value proposition
- Trust indicators

### 2. Trip Configuration Form Updates
**Add** (for One-Day and Multi-Day modes):
- **Date Picker per Day**: Each day has its own date selection field
- Starting Point Selector (Budva, Podgorica, Žabljak)
- **Ending Point Selector** (Budva, Podgorica, Žabljak)
- **Day Indicator**: "Planning Day 1 (Apr 20)", "Planning Day 2 (Apr 23)", etc.
- Activity Selection (with location indicators - see #5)
- Passenger count (1-8)

### 3. Preview Component (NEW - Step 2)
**Floating panel or sidebar** `DayPreview.tsx`:
- Current day being planned
- **Selected date** for this day
- Selected locations for this day
- Route preview visualization
- Duration estimate
- **NO PRICE** (price only shown in Step 3)
- Actions:
  - ✅ "Confirm This Day" button
  - ✏️ "Modify" (adjust selections)
  - 🗑️ "Discard" (clear and restart)

### 4. Multi-Day Summary Component (NEW)
**Shows all confirmed days** `MultiDaySummary.tsx`:

Visual example:
```
Your Planned Trip:
┌──────────────────────────────────────────┐
│ Day 1 (April 20) Budva → Podgorica     │
│ • Kotor, Perast, Rafting                │
│ • Duration: 10 hours                    │
│ • [Step 3 only: €280]          [Edit] [✕]│
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│ Day 2 (April 23) Podgorica → Žabljak   │
│ • Skadar Lake, Ostrog                   │
│ • Duration: 8 hours                     │
│ • [Step 3 only: €220]          [Edit] [✕]│
└──────────────────────────────────────────┘
                    + Add Day 3
[Step 3 only: Total: €500]
```

Features:
- Shows day number, date, route
- Collapsible to show/hide details
- Edit button (returns to planning mode for that day)
- Delete button
- "Add Another Day" button
- **Price shown only in Step 3**

### 5. Map Interaction Updates

**Activity-Specific Location Indicators**:
- All locations always visible on map
- When user selects an activity (e.g., "Rafting"):
  - Locations offering that activity get **special indicator/badge**
  - Example: Tara Canyon shows "Rafting available" badge/icon
  - Other locations remain visible but not highlighted
- Markers can show multiple activity badges if location supports multiple activities
- Design options:
  - Small activity icons on/near markers
  - Glow/highlight effect on markers
  - Popover on hover showing available activities

**Multi-Day Color Coding**:
- Day 1 locations: Blue markers
- Day 2 locations: Green markers  
- Day 3 locations: Orange markers
- Unselected locations: Gray/neutral markers

**Route Lines**:
- Color-coded by day
- Show path: start → locations → end

**View Toggles**:
- View all days together
- View specific day only
- Filter by activity availability

### 6. Timeline Display Changes
- Show day-by-day instead of hour-by-hour
- Each day is a collapsible section
- Visual flow: Day 1 → Day 2 → Day 3

### 5. Map Interaction Updates
- **Activity availability indicators**:
  - When an activity is selected, locations that offer it are highlighted
  - Example: Select "Rafting" → Tara Canyon gets special marker/badge
  - Locations without the activity remain visible but not highlighted
- Different colors/indicators for locations on different days
  - Day 1 locations: Blue markers
  - Day 2 locations: Green markers
  - Day 3 locations: Orange markers
- **Activity badges on markers**:
  - Small icons/badges showing available activities
  - Visible on hover or always visible (design decision)
- Route lines color-coded by day
- Toggle to view specific day or all days

---

## Validation Rules

### Per Day:
- Each day must be ≤ 10-12 hours
- Must have at least 1 location selected
- Starting point and ending point required

### Overall Trip:
- Minimum: 1 day
- Maximum: 7 days (or unlimited?)
- Total price calculated across all days

---

## Benefits of This Approach

1. **Efficiency**: No backtracking to starting point each day
2. **Flexibility**: Plan custom multi-day tours
3. **Realistic**: Matches how tourists actually travel
4. **Visual**: Easy to see the flow of the entire trip
5. **Simple UX**: Automatic day progression, no manual trip naming

---

## Technical Implications

### Data Structure:
- Trip becomes an array of Day objects
- Each Day has its own route calculation
- Total price = sum of all days

### API Changes:
- Route calculation accepts day-based structure
- Pricing calculated per day, then totaled
- Validation per day + overall

### State Management:
- Track current day being planned
- Store completed days
- Allow editing of previous days

---

**This approach transforms the app from single-day planning to flexible multi-day itinerary building while keeping the UX simple and intuitive.**

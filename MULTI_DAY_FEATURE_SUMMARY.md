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

**How It Works**:
- **Day 1**: Start in Budva → Visit locations → End in Podgorica
- **Day 2**: Start in Podgorica (where Day 1 ended) → Visit locations → End in Žabljak
- **Day 3**: Start in Žabljak → Visit locations → End in Budva

This allows tourists to efficiently plan multi-day tours without backtracking to their original starting point each day.

---

## User Flow for Multi-Day Planning

### Single Day Trip Flow:
1. User selects **Day 1**
2. Chooses starting point (e.g., Budva)
3. Chooses ending point (e.g., Podgorica)
4. Clicks locations on map
5. Sees **live preview** of the trip (route, time, price)
6. Can accept the day's plan or modify

### Multi-Day Trip Flow:
1. User completes Day 1 planning
2. **Day 2 option appears automatically**
3. Day 2 starting point = Day 1 ending point (auto-filled)
4. User chooses Day 2 ending point
5. Clicks new locations on map
6. Sees preview for Day 2
7. Can add Day 3, Day 4, etc. as needed

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

When user submits booking request, it includes ALL days:

```json
{
  "passenger": 4,
  "days": [
    {
      "dayNumber": 1,
      "start": "Budva",
      "end": "Podgorica",
      "locations": ["kotor", "perast", "lovcen"],
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
  "contactInfo": { ... }
}
```

---

## UI Changes Needed

### 1. Trip Configuration Form Updates
**Add**:
- **Ending Point Selector** (in addition to starting point)
- **Day Indicator**: "Planning Day 1", "Planning Day 2", etc.
- **"Add Another Day" button** (after completing current day)

### 2. Preview Component (New)
**Floating panel or sidebar** that shows:
- Current day being planned
- Selected locations for this day
- Route preview
- Duration estimate
- Price for this day
- Actions: "Add This Day", "Modify", "Discard"

### 3. Multi-Day Summary (New)
**Shows all planned days**:
```
Your Trip:
┌─────────────────────────────────────┐
│ Day 1: Budva → Podgorica           │
│ • Kotor, Perast, Rafting           │
│ • 10 hours | €280                  │
│                          [Edit] [✕] │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Day 2: Podgorica → Žabljak         │
│ • Skadar Lake, Ostrog              │
│ • 8 hours | €220                   │
│                          [Edit] [✕] │
└─────────────────────────────────────┘
                          + Add Day 3
```

### 4. Timeline Display Changes
- Show day-by-day instead of hour-by-hour
- Each day is a collapsible section
- Visual flow: Day 1 → Day 2 → Day 3

### 5. Map Interaction Updates
- Different colors/indicators for locations on different days
  - Day 1 locations: Blue markers
  - Day 2 locations: Green markers
  - Day 3 locations: Orange markers
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

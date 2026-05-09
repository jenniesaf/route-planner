# Montenegro Route Planner — Complete Storyboard

**Version**: 1.0  
**Date**: April 21, 2026  
**Project**: Montenegro Route Planner  
**Purpose**: Visual user journey from landing to booking confirmation

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Screen Flow Diagram](#screen-flow-diagram)
3. [Detailed User Journey](#detailed-user-journey)
4. [Screen-by-Screen Breakdown](#screen-by-screen-breakdown)
5. [Interaction Patterns](#interaction-patterns)
6. [Error States](#error-states)
7. [Mobile Flow](#mobile-flow)

---

## Overview

### User Personas

**Primary User**: Maria, 35, German tourist planning a 2-3 day trip in Montenegro with her family (4 people)

**Goals**:
- Plan efficient multi-day route without backtracking
- See clear pricing before booking
- Book entire trip in one request
- Understand if route is feasible

---

## Screen Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  LANDING PAGE (Initial State)                      │
│  - Empty form                                       │
│  - Map showing all available locations              │
│  - Call to action: "Plan Your Montenegro Trip"     │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│                                                     │
│  STEP 1: Trip Configuration                        │
│  - Select passengers (1-8)                          │
│  - Select starting point                            │
│  - Select ending point                              │
│  - Select optional activities                       │
│  - Day indicator: "Planning Day 1"                  │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│                                                     │
│  STEP 2: Location Selection (Interactive)          │
│  - Click locations on map                           │
│  - See LIVE PREVIEW panel updating                  │
│  - Route appears on map                             │
│  - Duration & price update in real-time             │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│                                                     │
│  STEP 3: Day Preview & Validation                  │
│  - Preview panel shows:                             │
│    • Selected locations                             │
│    • Route visualization                            │
│    • Total duration                                 │
│    • Price for day                                  │
│    • Validation status (✅ or ⚠️)                   │
│  - Actions:                                         │
│    • ✅ Add This Day (confirm)                      │
│    • ✏️ Modify                                      │
│    • 🗑️ Discard                                     │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
        ┌──────────┴──────────┐
        │                     │
        ↓                     ↓
 Single Day Trip      Multi-Day Trip
        │                     │
        ↓                     ↓
┌───────────────┐    ┌────────────────────┐
│ Skip to       │    │ Day Added to       │
│ Booking Form  │    │ Multi-Day Summary  │
└───────┬───────┘    └──────────┬─────────┘
        │                       │
        │                       ↓
        │            ┌────────────────────────┐
        │            │ "Add Another Day?"     │
        │            │ - Yes → Plan Day 2     │
        │            │ - No → Booking Form    │
        │            └──────────┬─────────────┘
        │                       │
        │                       ↓
        │            ┌────────────────────────┐
        │            │ STEP 4: Plan Day 2     │
        │            │ - Start = Day 1 End    │
        │            │ - Select new end point │
        │            │ - Repeat selection     │
        │            └──────────┬─────────────┘
        │                       │
        └───────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│                                                     │
│  STEP 5: Multi-Day Summary Review                  │
│  - All days listed with:                            │
│    • Day number & route                             │
│    • Locations                                      │
│    • Duration & price                               │
│    • Edit/Delete options                            │
│  - Total price displayed prominently                │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│                                                     │
│  STEP 6: Timeline View                             │
│  - Day-by-day breakdown                             │
│  - Visual flow: Day 1 → Day 2 → Day 3              │
│  - Each day shows:                                  │
│    • Starting point                                 │
│    • Travel → Visits → Activities                   │
│    • Ending point                                   │
│  - Collapsible sections per day                     │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│                                                     │
│  STEP 7: Booking Form                              │
│  - Name, Email, Phone (required)                    │
│  - First day date (date picker)                     │
│  - Comments/Notes (optional)                        │
│  - Review summary of entire trip                    │
│  - "Submit Booking Request" button                  │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│                                                     │
│  STEP 8: Confirmation                              │
│  - Success message                                  │
│  - Booking reference number                         │
│  - Summary of request                               │
│  - "We'll contact you within 24 hours"             │
│  - Options:                                         │
│    • Plan another trip                              │
│    • Download PDF (future)                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Detailed User Journey

### Scenario 1: Maria Plans a 2-Day Trip

**Day 1: April 21, 2026, 10:00 AM**  
**Location**: Maria's hotel room in Germany, planning Montenegro vacation

---

### Act 1: Landing & Initial Exploration (0:00 - 1:00)

**Scene 1.1: First Impression**

```
SCREEN: Landing Page (Desktop)
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Montenegro Route Planner               🌐 EN  ⚙️         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────┐   ┌───────────────────────┐  │
│  │                             │   │                       │  │
│  │  TRIP CONFIGURATION         │   │                       │  │
│  │  ─────────────────────      │   │                       │  │
│  │                             │   │     GOOGLE MAP        │  │
│  │  Planning Day 1             │   │                       │  │
│  │                             │   │   (Shows Montenegro)  │  │
│  │  👥 Passengers: [-- 4 --]  │   │                       │  │
│  │                             │   │   All locations       │  │
│  │  📍 Start: [ Budva    ▼]   │   │   shown as markers    │  │
│  │                             │   │                       │  │
│  │  🏁 End:   [ Podgorica ▼]  │   │   (gray/neutral)      │  │
│  │                             │   │                       │  │
│  │  Activities:                │   │                       │  │
│  │  ☐ Rafting (4h)             │   │                       │  │
│  │  ☐ Canyoning (4-5h)         │   │                       │  │
│  │  ☐ ATV Tours (2-3h)         │   │                       │  │
│  │  ☐ Jeep Tours (3-4h)        │   │                       │  │
│  │  ☐ Zipline (1-2h)           │   │                       │  │
│  │                             │   │                       │  │
│  │  ─────────────────────      │   │                       │  │
│  │  Click locations on map →   │   │                       │  │
│  │                             │   │                       │  │
│  └─────────────────────────────┘   └───────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Maria's Actions**:
1. Opens website URL
2. Sees clean, professional interface
3. Reads "Planning Day 1" indicator
4. Understands she can plan multiple days

**System Response**:
- Map loads with all Montenegro locations visible
- Form shows default values (empty)
- No preview panel yet (nothing selected)

---

**Scene 1.2: Configuration**

**Maria's Actions**:
1. Clicks passenger dropdown
2. Selects "4 passengers"
3. Clicks "Starting point" dropdown
4. Selects "Budva" (where she'll land)
5. Clicks "Ending point" dropdown
6. Selects "Podgorica" (wants to continue north)
7. Checks "Rafting (4h)" activity

**System Response**:
```
Form Updates:
- 👥 Passengers: 4
- 📍 Start: Budva
- 🏁 End: Podgorica
- ☑️ Rafting (4h) ← checked, turns blue
- Map highlights: Budva (start marker) and Podgorica (end marker)
```

**Visual Change**:
- Starting point (Budva) gets a green pin on map
- Ending point (Podgorica) gets a red/finish flag on map
- Activity checkbox turns blue when selected

---

### Act 2: Location Selection & Preview (1:00 - 3:00)

**Scene 2.1: First Location Click**

**Maria's Actions**:
1. Hovers over "Kotor Old Town" marker on map
2. Sees tooltip: "Kotor Old Town (2h visit)"
3. Clicks marker

**System Response**:

```
MAP CHANGES:
- Kotor marker changes from gray → blue (selected)
- Slight pulse animation on marker

PREVIEW PANEL APPEARS (sliding in from right):
┌────────────────────────────────┐
│ DAY 1 PREVIEW                  │
├────────────────────────────────┤
│                                │
│ Budva → Podgorica              │
│                                │
│ Selected Locations:            │
│ ┌────────────────────────────┐ │
│ │ 🏰 Kotor Old Town      ✕   │ │
│ │    Visit: 2 hours          │ │
│ └────────────────────────────┘ │
│                                │
│ Activities:                    │
│ • Rafting (4h)                 │
│                                │
│ ─────────────────────          │
│ Estimated Duration: 7.5h       │
│ Price: €240                    │
│ Status: ✅ Valid               │
│                                │
│ [✅ Add This Day]              │
│ [✏️ Modify]  [🗑️ Discard]      │
│                                │
└────────────────────────────────┘
```

**Calculation Behind the Scenes**:
- Travel: Budva → Kotor (45 min)
- Visit: Kotor (2h)
- Activity: Rafting (4h)
- Travel: Kotor → Podgorica (2.5h via rafting location)
- **Total: ~7.5 hours** ✅ Under 12h limit

---

**Scene 2.2: Adding More Locations**

**Maria's Actions**:
1. Clicks "Perast" marker on map

**System Response**:

```
PREVIEW PANEL UPDATES (real-time):
┌────────────────────────────────┐
│ DAY 1 PREVIEW                  │
├────────────────────────────────┤
│                                │
│ Budva → Podgorica              │
│                                │
│ Selected Locations:            │
│ ┌────────────────────────────┐ │
│ │ 🏰 Kotor Old Town      ✕   │ │
│ │    Visit: 2 hours          │ │
│ └────────────────────────────┘ │
│ ┌────────────────────────────┐ │
│ │ 🏛️ Perast             ✕   │ │
│ │    Visit: 1.5 hours        │ │
│ └────────────────────────────┘ │
│                                │
│ Activities:                    │
│ • Rafting (4h)                 │
│                                │
│ Route Visualization:           │
│ Budva → Kotor →                │
│ [Rafting] → Perast →           │
│ Podgorica                      │
│                                │
│ ─────────────────────          │
│ Estimated Duration: 10h        │
│ Price: €280                    │
│ Status: ✅ Valid               │
│                                │
│ [✅ Add This Day]              │
│ [✏️ Modify]  [🗑️ Discard]      │
│                                │
└────────────────────────────────┘
```

**Map Shows**:
- Blue route line connecting: Budva → Kotor → Perast → Podgorica
- Both Kotor and Perast markers are blue (selected)
- Route line is animated (dotted line moving)

---

**Scene 2.3: Testing Limits (Edge Case)**

**Maria's Actions**:
1. Gets curious about adding more
2. Clicks "Durmitor National Park" marker

**System Response**:

```
PREVIEW PANEL UPDATES WITH WARNING:
┌────────────────────────────────┐
│ DAY 1 PREVIEW                  │
├────────────────────────────────┤
│                                │
│ Budva → Podgorica              │
│                                │
│ Selected Locations:            │
│ • Kotor Old Town (2h)          │
│ • Perast (1.5h)                │
│ • Durmitor Nat'l Park (3h)     │
│                                │
│ Activities:                    │
│ • Rafting (4h)                 │
│                                │
│ ⚠️ WARNING                     │
│ ─────────────────────          │
│ Estimated Duration: 15.5h      │
│ Price: €380                    │
│ Status: ❌ TOO LONG            │
│                                │
│ This exceeds the 12-hour       │
│ daily limit.                   │
│                                │
│ Suggestions:                   │
│ • Remove Durmitor Park, or     │
│ • Save it for Day 2            │
│                                │
│ [❌ Cannot Add This Day]       │
│ [✏️ Modify]  [🗑️ Discard]      │
│                                │
└────────────────────────────────┘
```

**Visual Changes**:
- Preview panel background turns light red/orange
- Duration text turns red
- "Add This Day" button is disabled (grayed out)
- Warning icon appears

---

**Scene 2.4: Adjusting to Valid Route**

**Maria's Actions**:
1. Clicks ✕ on "Durmitor National Park" in preview panel
2. Route becomes valid again

**System Response**:
```
PREVIEW PANEL (back to valid state):
- Durmitor removed from list
- Duration: 10h
- Status: ✅ Valid
- "Add This Day" button enabled again
- Background returns to normal (white/light)
```

---

### Act 3: Multi-Day Planning (3:00 - 6:00)

**Scene 3.1: Confirming Day 1**

**Maria's Actions**:
1. Reviews Day 1 preview
2. Satisfied with: Budva → Kotor → Perast → Podgorica (10h, €280)
3. Clicks "✅ Add This Day" button

**System Response**:

```
TRANSITION ANIMATION:
1. Preview panel content slides up and shrinks
2. Day 1 card appears in "Multi-Day Summary" section
3. Form resets for Day 2
4. Success toast notification: "Day 1 added! ✅"

MULTI-DAY SUMMARY SECTION APPEARS:
┌────────────────────────────────────────────┐
│ YOUR TRIP SUMMARY                          │
├────────────────────────────────────────────┤
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ 📅 Day 1: Budva → Podgorica           │ │
│ │ ────────────────────────────────────  │ │
│ │ • Kotor Old Town                      │ │
│ │ • Perast                              │ │
│ │ • Rafting                             │ │
│ │                                       │ │
│ │ Duration: 10h | Price: €280          │ │
│ │                     [Edit] [Delete]  │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │     + Add Day 2                        │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ Total Price: €280                          │
│                                            │
└────────────────────────────────────────────┘

FORM AUTOMATICALLY UPDATES FOR DAY 2:
┌─────────────────────────────┐
│ TRIP CONFIGURATION          │
│ ─────────────────────       │
│                             │
│ Planning Day 2              │ ← Auto-incremented
│                             │
│ 👥 Passengers: 4            │ ← Carried over
│                             │
│ 📍 Start: Podgorica         │ ← AUTO-FILLED (Day 1 end)
│           [locked] 🔒       │ ← Cannot change
│                             │
│ 🏁 End:   [ Žabljak   ▼]   │ ← Maria can choose
│                             │
│ Activities:                 │
│ ☐ Rafting (4h)              │ ← Reset (unchecked)
│ ☐ Canyoning (4-5h)          │
│ ☐ ATV Tours (2-3h)          │
│ ☐ Jeep Tours (3-4h)         │
│ ☐ Zipline (1-2h)            │
│                             │
└─────────────────────────────┘
```

**Key Changes**:
- Day indicator: "Planning Day 1" → "Planning Day 2"
- Starting point auto-filled with "Podgorica" (locked)
- Map clears previous Day 1 selections
- Preview panel disappears (nothing selected yet for Day 2)

---

**Scene 3.2: Planning Day 2**

**Maria's Actions**:
1. Selects "Žabljak" as Day 2 ending point (mountain area)
2. Checks "ATV Tours (2-3h)" activity
3. Clicks "Skadar Lake" on map
4. Clicks "Ostrog Monastery" on map

**System Response**:

```
DAY 2 PREVIEW APPEARS:
┌────────────────────────────────┐
│ DAY 2 PREVIEW                  │
├────────────────────────────────┤
│                                │
│ Podgorica → Žabljak            │
│                                │
│ Selected Locations:            │
│ ┌────────────────────────────┐ │
│ │ 🌊 Skadar Lake         ✕   │ │
│ │    Visit: 2.5 hours        │ │
│ └────────────────────────────┘ │
│ ┌────────────────────────────┐ │
│ │ ⛪ Ostrog Monastery    ✕   │ │
│ │    Visit: 1.5 hours        │ │
│ └────────────────────────────┘ │
│                                │
│ Activities:                    │
│ • ATV Tours (2.5h)             │
│                                │
│ Route:                         │
│ Podgorica → Skadar Lake →      │
│ [ATV] → Ostrog → Žabljak       │
│                                │
│ ─────────────────────          │
│ Estimated Duration: 9h         │
│ Price: €240                    │
│ Status: ✅ Valid               │
│                                │
│ [✅ Add This Day]              │
│ [✏️ Modify]  [🗑️ Discard]      │
│                                │
└────────────────────────────────┘

MAP SHOWS:
- Day 1 route in blue (faded/transparent)
- Day 2 route in green (current/active)
- Day 2 markers are green
- Map auto-zooms to show Day 2 route
```

---

**Scene 3.3: Confirming Day 2**

**Maria's Actions**:
1. Clicks "✅ Add This Day"

**System Response**:

```
MULTI-DAY SUMMARY UPDATES:
┌────────────────────────────────────────────┐
│ YOUR TRIP SUMMARY                          │
├────────────────────────────────────────────┤
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ 📅 Day 1: Budva → Podgorica           │ │
│ │ • Kotor, Perast, Rafting              │ │
│ │ Duration: 10h | €280   [Edit] [×]    │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ 📅 Day 2: Podgorica → Žabljak         │ │
│ │ • Skadar Lake, Ostrog, ATV            │ │
│ │ Duration: 9h | €240    [Edit] [×]    │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │     + Add Day 3                        │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ ──────────────────────────────────────   │
│ Total Trip: 2 days | Total: €520          │
│                                            │
│ [📋 View Full Timeline]                    │
│ [📝 Proceed to Booking]                    │
│                                            │
└────────────────────────────────────────────┘
```

---

**Scene 3.4: Deciding to Stop at 2 Days**

**Maria's Actions**:
1. Considers adding Day 3
2. Decides 2 days is enough for this trip
3. Clicks "[📝 Proceed to Booking]" button

**System Response**:
- Scrolls smoothly to booking section
- Or opens booking form modal/panel

---

### Act 4: Timeline Review & Booking (6:00 - 8:00)

**Scene 4.1: Viewing Full Timeline**

**Maria's Actions**:
1. Before booking, clicks "[📋 View Full Timeline]"

**System Response**:

```
TIMELINE MODAL/PANEL OPENS:
┌────────────────────────────────────────────────────────┐
│ 📅 COMPLETE TRIP TIMELINE                              │
├────────────────────────────────────────────────────────┤
│                                                        │
│ ▼ DAY 1: Wednesday, June 15 - Budva → Podgorica       │
│ ┌────────────────────────────────────────────────────┐ │
│ │                                                    │ │
│ │ 08:00 AM  📍 Depart Budva                           │ │
│ │           ├── 🚗 Drive to Kotor (45 min)           │ │
│ │                                                    │ │
│ │ 08:45 AM  🏰 Arrive Kotor Old Town                 │ │
│ │           ├── 👁️ Visit (2 hours)                   │ │
│ │                                                    │ │
│ │ 10:45 AM  📍 Depart Kotor                           │ │
│ │           ├── 🚗 Drive to Perast (20 min)          │ │
│ │                                                    │ │
│ │ 11:05 AM  🏛️ Arrive Perast                         │ │
│ │           ├── 👁️ Visit (1.5 hours)                 │ │
│ │                                                    │ │
│ │ 12:35 PM  📍 Depart Perast                          │ │
│ │           ├── 🚗 Drive to Rafting (40 min)         │ │
│ │                                                    │ │
│ │ 01:15 PM  🚣 Rafting Activity                       │ │
│ │           ├── ⏱️ Duration (4 hours)                 │ │
│ │                                                    │ │
│ │ 05:15 PM  📍 End Rafting                            │ │
│ │           ├── 🚗 Drive to Podgorica (1.5 hours)    │ │
│ │                                                    │ │
│ │ 06:45 PM  🏁 Arrive Podgorica (End Day 1)          │ │
│ │                                                    │ │
│ │ Total: 10 hours 45 minutes | €280                  │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ ▼ DAY 2: Thursday, June 16 - Podgorica → Žabljak      │
│ ┌────────────────────────────────────────────────────┐ │
│ │                                                    │ │
│ │ 08:00 AM  📍 Depart Podgorica                       │ │
│ │           ├── 🚗 Drive to Skadar Lake (1 hour)     │ │
│ │                                                    │ │
│ │ 09:00 AM  🌊 Arrive Skadar Lake                    │ │
│ │           ├── 👁️ Visit (2.5 hours)                 │ │
│ │                                                    │ │
│ │ 11:30 AM  📍 Depart Skadar Lake                     │ │
│ │           ├── 🚗 Drive to ATV location (45 min)    │ │
│ │                                                    │ │
│ │ 12:15 PM  🏍️ ATV Tours                             │ │
│ │           ├── ⏱️ Duration (2.5 hours)               │ │
│ │                                                    │ │
│ │ 02:45 PM  📍 End ATV                                │ │
│ │           ├── 🚗 Drive to Ostrog (1 hour)          │ │
│ │                                                    │ │
│ │ 03:45 PM  ⛪ Arrive Ostrog Monastery               │ │
│ │           ├── 👁️ Visit (1.5 hours)                 │ │
│ │                                                    │ │
│ │ 05:15 PM  📍 Depart Ostrog                          │ │
│ │           ├── 🚗 Drive to Žabljak (2 hours)        │ │
│ │                                                    │ │
│ │ 07:15 PM  🏁 Arrive Žabljak (End Day 2)            │ │
│ │                                                    │ │
│ │ Total: 9 hours 15 minutes | €240                   │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│ TRIP TOTAL: 2 days | €520 (4 passengers)              │
│                                                        │
│ [Close Timeline] [📝 Proceed to Booking]               │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Maria's Reaction**:
- Reviews timeline carefully
- Sees realistic timing
- Confirms it's feasible
- Feels confident to book

---

**Scene 4.2: Booking Form**

**Maria's Actions**:
1. Clicks "[📝 Proceed to Booking]"
2. Booking form appears/slides in

**System Response**:

```
BOOKING FORM:
┌────────────────────────────────────────────────────────┐
│ 📝 COMPLETE YOUR BOOKING                               │
├────────────────────────────────────────────────────────┤
│                                                        │
│ Your Trip Summary:                                     │
│ ┌────────────────────────────────────────────────────┐ │
│ │ 🗓️ 2 Days - June 15-16, 2026                       │ │
│ │ 👥 4 Passengers                                     │ │
│ │ 💰 Total Price: €520                                │ │
│ │                                                    │ │
│ │ Day 1: Budva → Podgorica (10h, €280)               │ │
│ │ Day 2: Podgorica → Žabljak (9h, €240)              │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ Contact Information:                                   │
│ ┌──────────────────────────────────────┐             │
│ │ Full Name *                          │             │
│ │ [Maria Schmidt                    ]  │             │
│ └──────────────────────────────────────┘             │
│                                                        │
│ ┌──────────────────────────────────────┐             │
│ │ Email Address *                      │             │
│ │ [maria.schmidt@email.de          ]   │             │
│ └──────────────────────────────────────┘             │
│                                                        │
│ ┌──────────────────────────────────────┐             │
│ │ Phone Number *                       │             │
│ │ [+49 123 456 7890                ]   │             │
│ └──────────────────────────────────────┘             │
│                                                        │
│ Trip Details:                                          │
│ ┌──────────────────────────────────────┐             │
│ │ First Day Date *                     │             │
│ │ [📅 June 15, 2026            ▼]     │             │
│ └──────────────────────────────────────┘             │
│                                                        │
│ ┌──────────────────────────────────────┐             │
│ │ Special Requests / Notes (Optional)  │             │
│ │ [We prefer morning departures.  ]    │             │
│ │ [                               ]    │             │
│ │ [                               ]    │             │
│ └──────────────────────────────────────┘             │
│                                                        │
│ ☑️ I agree to the terms and conditions                │
│                                                        │
│ ┌────────────────────────────────────────────────┐   │
│ │  📤 SUBMIT BOOKING REQUEST                     │   │
│ └────────────────────────────────────────────────┘   │
│                                                        │
│ Note: This is a booking request. We'll contact you    │
│ within 24 hours to confirm availability and payment.  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Maria's Actions**:
1. Fills in name: "Maria Schmidt"
2. Fills in email: "maria.schmidt@email.de"
3. Fills in phone: "+49 123 456 7890"
4. Selects date: June 15, 2026
5. Adds note: "We prefer morning departures. Please confirm if 8 AM start is possible."
6. Checks terms checkbox
7. Clicks "📤 SUBMIT BOOKING REQUEST"

---

**Scene 4.3: Submission & Confirmation**

**System Response**:

```
LOADING STATE (1-2 seconds):
┌────────────────────────────────┐
│                                │
│     ⏳ Submitting request...   │
│                                │
│     Please wait...             │
│                                │
└────────────────────────────────┘

Then:

SUCCESS CONFIRMATION:
┌────────────────────────────────────────────────────────┐
│ ✅ BOOKING REQUEST SUBMITTED!                          │
├────────────────────────────────────────────────────────┤
│                                                        │
│              🎉 Thank You, Maria!                      │
│                                                        │
│ Your Montenegro trip request has been received.        │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Booking Reference: MNE-2026-04-21-1847             │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ Trip Summary:                                          │
│ • Dates: June 15-16, 2026                              │
│ • Passengers: 4                                        │
│ • Total Price: €520                                    │
│                                                        │
│ What's Next?                                           │
│ 1. We'll review your request within 24 hours           │
│ 2. You'll receive a confirmation email with:           │
│    - Final availability                                │
│    - Payment details                                   │
│    - Detailed itinerary PDF                            │
│                                                        │
│ A copy has been sent to: maria.schmidt@email.de        │
│                                                        │
│ ┌──────────────────────────┐  ┌──────────────────────┐│
│ │ 📧 Check Your Email      │  │ 🏠 Back to Home      ││
│ └──────────────────────────┘  └──────────────────────┘│
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ 🗺️ Plan Another Trip                               │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ Questions? Contact us:                                 │
│ 📧 bookings@montenegro-tours.com                       │
│ 📞 +382 XX XXX XXX                                     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Maria's Reaction**:
- Feels satisfied
- Has booking reference number
- Knows what to expect next
- Can plan another trip if desired

---

## Screen-by-Screen Breakdown

### Screen 1: Landing Page (Initial State)

**Layout**: Split-screen (40% form / 60% map)

**Left Panel**:
- Logo and navigation
- "Planning Day 1" indicator
- Trip configuration form (empty state)
- Instructional text: "Select your preferences and click locations on the map"

**Right Panel**:
- Google Maps centered on Montenegro
- All location markers visible (gray/neutral)
- Zoom controls
- Legend explaining marker types

**Call to Action**: Implicit - starts with selection

---

### Screen 2: Configuration State

**Left Panel**:
- Form fields filled:
  - Passengers selected
  - Start point selected
  - End point selected
  - Optional activities checked

**Right Panel**:
- Map shows start and end markers highlighted
- Ready for location selection

**State**: Waiting for user to click locations

---

### Screen 3: Selection State (Preview Active)

**Left Panel** (60% width now):
- Configuration form (smaller, top)
- **Multi-Day Summary** section below form (if days added)

**Center Panel** (New, 40% width):
- **Day Preview Panel**:
  - Selected locations list
  - Route visualization
  - Duration calculation
  - Price
  - Validation status
  - Action buttons

**Right Panel** (60% width):
- Map with selected locations
- Route line drawn
- Color-coded by day

**State**: Active preview, real-time updates

---

### Screen 4: Multi-Day Summary State

**Left Panel**:
- Configuration form (collapsed or hidden)
- **Multi-Day Summary** (expanded):
  - List of confirmed days
  - Each day as card
  - Edit/Delete options
  - Total price
  - Timeline button
  - Booking button

**Right Panel**:
- Map showing all days
- Toggle to view specific day or all
- Color-coded routes

**State**: Multiple days confirmed, ready for booking

---

### Screen 5: Timeline View

**Modal/Overlay**:
- Full-screen or large modal
- Day-by-day timeline
- Hour-by-hour breakdown for each day
- Collapsible sections
- Visual icons and colors

**Background**: Main app dimmed

**State**: Review mode

---

### Screen 6: Booking Form

**Layout Options**:

**Option A: Full-screen form**
- Form takes center stage
- Trip summary on side
- Clear, focused experience

**Option B: Modal/Overlay**
- Form in modal
- Background shows map and summary
- User can close and return

**State**: Final step before submission

---

### Screen 7: Confirmation

**Full-screen confirmation**:
- Success message
- Booking reference
- Summary
- Next steps
- CTAs for new actions

**State**: Terminal state (can start over or exit)

---

## Interaction Patterns

### Pattern 1: Real-Time Preview Updates

**Trigger**: User clicks location on map

**Response Timeline**:
1. *0ms*: Click registered
2. *50ms*: Marker changes color (visual feedback)
3. *100ms*: Preview panel updates (if first location, panel slides in)
4. *200ms*: Route calculation starts
5. *500-1000ms*: Duration and price update (API call if needed)
6. *1000ms*: Smooth animation complete

**Visual Feedback**:
- Marker pulse animation
- Route line draws with animation
- Numbers count up to final value
- Smooth transitions

---

### Pattern 2: Validation Feedback

**Trigger**: Invalid state (e.g., > 12 hours)

**Visual Changes**:
1. Preview panel background → light red/orange
2. Duration text → red color
3. Warning icon appears
4. Warning message displays
5. "Add This Day" button → disabled
6. Suggestions appear

**Recovery**:
- User removes a location
- Instant recalculation
- If valid: colors return to normal
- Button re-enables

---

### Pattern 3: Multi-Day Progression

**Flow**:
1. Day 1 confirmed → slides into summary
2. Form auto-resets for Day 2
3. Start point auto-filled (locked)
4. User continues selection
5. Repeat for each day

**Visual Continuity**:
- Days maintain consistent card design
- Color coding for visual separation
- Clear numbering (Day 1, Day 2, Day 3)

---

### Pattern 4: Hover States

**Map Markers**:
- Hover: Slight scale up, tooltip appears
- Click: Color change, selection confirmed
- Selected hover: Different effect (already selected)

**Buttons**:
- Hover: Slight color change, shadow increase
- Active: Pressed state
- Disabled: Reduced opacity, no pointer

**Cards**:
- Hover: Subtle shadow increase
- Click: Expand or navigate

---

## Error States

### Error 1: No Locations Selected

**Trigger**: User tries to add day without selecting locations

**Response**:
```
Preview Panel:
⚠️ No locations selected
Please click at least one location on the map.

Button: [Add This Day] (disabled)
```

---

### Error 2: Invalid Route (Too Long)

**Already covered in Scene 2.3**

---

### Error 3: Google Maps API Failure

**Trigger**: Maps API fails to load

**Response**:
```
Map Area Shows:
┌────────────────────────────────┐
│ ⚠️ Map Temporarily Unavailable │
│                                │
│ We're having trouble loading   │
│ the map. Please try:           │
│                                │
│ • Refreshing the page          │
│ • Checking your connection     │
│                                │
│ You can still browse locations │
│ from the list below.           │
│                                │
│ [Retry] [Use List View]        │
└────────────────────────────────┘
```

---

### Error 4: Booking Submission Failure

**Trigger**: Network error during booking

**Response**:
```
Error Modal:
┌────────────────────────────────┐
│ ❌ Submission Failed            │
│                                │
│ We couldn't submit your        │
│ booking request. Your data     │
│ has been saved locally.        │
│                                │
│ Please try again or contact:   │
│ bookings@example.com           │
│                                │
│ [Retry] [Save Draft] [Contact] │
└────────────────────────────────┘
```

---

### Error 5: Form Validation

**Trigger**: Missing required fields

**Response**:
- Red border on invalid fields
- Error message below field:
  ```
  Email Address *
  [                    ]
  ⚠️ Please enter a valid email address
  ```
- Submit button stays enabled
- On click: focus on first error

---

## Mobile Flow

### Mobile Layout Adaptations

**Vertical Stack**:
```
┌──────────────┐
│   Header     │
├──────────────┤
│              │
│ Trip Config  │
│              │
├──────────────┤
│              │
│  Selections  │
│  (badges)    │
│              │
├──────────────┤
│              │
│              │
│     Map      │
│  (collaps-   │
│   ible)      │
│              │
│              │
├──────────────┤
│              │
│   Preview    │
│ (floating)   │
│              │
└──────────────┘
```

### Mobile Interactions

**Preview Panel**: Bottom sheet (slides up from bottom)

**Map**: Can be minimized/expanded

**Day Summary**: Horizontal scroll cards

**Booking**: Full-screen takeover

**Timeline**: Full-screen modal

---

## Storyboard Summary

### Total Screens: 7 main states
1. Landing
2. Configuration
3. Selection (with preview)
4. Multi-day summary
5. Timeline view
6. Booking form
7. Confirmation

### Key Transitions: 12
- Landing → Configuration
- Configuration → Selection
- Selection → Preview active
- Preview → Day confirmed
- Day confirmed → Multi-day summary
- Multi-day → Next day planning
- Summary → Timeline
- Summary → Booking
- Booking → Submission
- Submission → Confirmation
- Any → Edit day
- Confirmation → New trip

### User Actions Required: ~15-25
(Depends on complexity of trip)

### Average Time: 5-10 minutes
- Single day: ~3-5 min
- Multi-day: ~7-10 min

---

**End of Storyboard**

This storyboard provides the complete user journey for the Montenegro Route Planner, from first landing to confirmation. All interactions, screens, and transitions are documented for design and development reference.

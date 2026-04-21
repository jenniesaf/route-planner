# Design Brief for Base44 — Montenegro Route Planner

---

## Project Overview

Create a modern, clean UI design for a **one-page web application** that helps tourists plan custom day trips in Montenegro. This is a portfolio-grade project that needs to look professional and be highly functional.

**Project Name**: Montenegro Route Planner  
**Type**: Single-page web application  
**Target Users**: Tourists planning day trips in Montenegro  
**Tech Stack**: Next.js, React, TypeScript, Tailwind CSS, Shadcn/UI  

---

## Core Functionality

### What the App Does:
1. **Trip Configuration**: Users select passengers (1-8), starting point, and optional activities
2. **Interactive Map**: Users select tourist destinations from a map
3. **Route Validation**: System validates the route is ≤ 10-12 hours
4. **Price Calculation**: Dynamic pricing based on selections
5. **Booking Request**: Users submit their planned trip

---

## Layout Requirements

### Desktop Layout (Primary)

**Split-screen design (50/50 or 60/40)**:

**LEFT SIDE — Configuration Panel**:
- Trip setup form
- Timeline display
- Price summary
- Booking form

**RIGHT SIDE — Interactive Map**:
- Full-height Google Maps interface
- Location markers
- Selected route visualization

---

## Required UI Components

### 1. Trip Setup Form
**Location**: Top of left panel

**Elements**:
- **Passenger Selector**: Dropdown or stepper (1-8 people)
- **Starting Point Selector**: 3 options (Budva, Podgorica, Žabljak)
- **Activities Checkboxes**: 
  - Rafting
  - Canyoning
  - ATV tours
  - Jeep tours
  - Zipline
- **Activity-Location Connection**:
  - When activity is checked, map highlights locations that offer it
  - Show count of compatible locations (e.g., "Rafting available at 2 locations")
  - Disable/gray out activity if no compatible locations available
- Visual indication of time impact for each activity

**Design Notes**:
- Clean, modern form design
- Clear labels
- Easy to scan and interact
- Should feel professional but approachable

---

### 2. Interactive Map (Google Maps)
**Location**: Right panel, full height

**Features**:
- Centered on Montenegro (lat: 42.5, lng: 19.3)
- Custom markers for locations:
  - Kotor Old Town
  - Durmitor National Park
  - Skadar Lake
  - Ostrog Monastery
  - Perast
  - Bay of Kotor
  - Lovcen National Park
  - Tara Canyon (rafting/zipline)
  - Nevidio Canyon (canyoning)
- **Activity-aware markers**:
  - Base state: Regular marker
  - Selected state: Different color/size/animation
  - **Activity available state**: Badge/icon showing available activities
  - **Highlighted state**: When activity is selected, compatible locations glow/highlight
  - Tooltip on hover showing available activities
- Route line connecting selected locations
- Zoom controls

**Design Notes**:
- Markers should be clear and clickable
- Selected markers should have distinct visual state (e.g., different color, larger, with animation)
- **Activity badges**: Small icons (e.g., 🚣 for rafting, 🙵 for ATV) on/near markers
- **Activity highlight**: When user selects "Rafting", Tara Canyon marker glows or gets special border
- All locations remain visible even when activity selected (no hiding)
- Route line should be prominent but not overwhelming

---

### 3. Location Selection Display
**Location**: Below trip setup form

**Elements**:
- List or cards of selected locations
- Remove button for each location
- Reorder capability (drag-and-drop would be nice)
- Show visit duration for each location

**Design Notes**:
- Badge-style or card-style for each selected location
- Clear affordance for removal
- Visual hierarchy showing order of visit

---

### 4. Timeline Display
**Location**: Middle of left panel

**Elements**:
- Hour-by-hour breakdown of the trip
- Visual timeline (vertical or horizontal)
- Icons for different activity types:
  - 🚗 Travel time
  - 📍 Visit time
  - 🚣 Activity time
- Time indicators
- Total time display (prominent)

**Design Notes**:
- Should be easy to quickly understand the flow
- Color-coded by activity type
- Clear total time with validation indicator (green if ≤12h, red/warning if >12h)

---

### 5. Validation/Warning Messages
**Location**: Below timeline or as floating alerts

**Types**:
- ✅ Success: "Your route is valid! Total time: 10.5 hours"
- ⚠️ Warning: "Your route exceeds 12 hours. Consider removing stops or activities."
- 💡 Suggestions: "Try removing 'Durmitor National Park' to save 4 hours"

**Design Notes**:
- Clear visual distinction (color-coded)
- Not intrusive but impossible to miss
- Actionable (should suggest solutions)

---

### 6. Price Summary
**Location**: Above booking form

**Elements**:
- Price breakdown:
  - Base price
  - Distance/time cost
  - Passenger multiplier
  - Activity costs
  - **Total price** (large, prominent)
- Currency: EUR (€)

**Design Notes**:
- Clear hierarchy (total should stand out)
- Clean pricing table or card
- Professional, trustworthy appearance

---

### 7. Booking Form
**Location**: Bottom of left panel

**Elements**:
- Name input
- Email input
- Phone input
- Date picker (trip date)
- Comments/notes textarea
- **"Send Request" button** (primary CTA)

**Design Notes**:
- Only shown when route is valid
- Primary button should be prominent and inviting
- Form should feel simple and quick to fill

---

### 8. Reusable UI Components

Create these as base components (Shadcn/UI style):

**Button**:
- Primary (main CTA)
- Secondary (supporting actions)
- Destructive (remove actions)
- Sizes: sm, md, lg

**Select/Dropdown**:
- Clean, modern dropdown
- Clear selected state

**Input Fields**:
- Text input
- Number input (for passengers)
- Focus states
- Error states

**Card**:
- Container for grouped content
- Shadow, rounded corners
- Padding options

**Badge**:
- For selected locations
- For activity tags
- Color variants

**Checkbox**:
- For activity selection
- Clear checked state

---

## Design System

### Color Palette

**Primary Colors** (Tourism/Travel Theme):
- **Primary**: Mediterranean blue (#1E40AF or similar)
- **Secondary**: Coastal teal (#0D9488)
- **Accent**: Warm coral/orange (#F97316)

**Neutral Colors**:
- Background: Light gray (#F9FAFB)
- Card/Panel: White (#FFFFFF)
- Text Primary: Dark gray (#111827)
- Text Secondary: Medium gray (#6B7280)
- Border: Light gray (#E5E7EB)

**Status Colors**:
- Success: Green (#10B981)
- Warning: Amber (#F59E0B)
- Error: Red (#EF4444)
- Info: Blue (#3B82F6)

**Map Markers**:
- Unselected: Gray or neutral
- Selected: Primary blue or accent color
- Hover: Slightly darker/animated

---

### Typography

**Font Family**: 
- Use modern, clean sans-serif (e.g., Inter, Geist, or system fonts)
- Should match Next.js Geist font if possible

**Hierarchy**:
- H1 (Main title): 32-36px, bold
- H2 (Section headings): 24-28px, semibold
- H3 (Subsections): 18-20px, semibold
- Body text: 14-16px, regular
- Small text: 12-14px, regular
- Button text: 14-16px, medium

---

### Spacing & Layout

**Spacing System** (Tailwind CSS units):
- Use standard 4px base unit (Tailwind's spacing scale)
- Component padding: 16-24px
- Section gaps: 24-32px
- Form field gaps: 12-16px

**Responsive Breakpoints**:
- Mobile: < 768px (stack vertically, map below form)
- Tablet: 768px - 1024px (adjust split ratio)
- Desktop: > 1024px (50/50 or 60/40 split)

**Border Radius**:
- Cards/Panels: 8-12px
- Buttons: 6-8px
- Inputs: 6px
- Badges: 4px or full rounded

**Shadows**:
- Light shadow for cards
- Medium shadow for modals/overlays
- Subtle shadow for buttons (hover state)

---

### Component States

**Interactive Elements**:
- Default state
- Hover state (subtle color change, slight scale/shadow)
- Active/Selected state (distinct color)
- Disabled state (reduced opacity, no pointer)
- Focus state (outline or ring for accessibility)

---

## Mobile Responsive Behavior

**Layout Changes**:
- **Mobile**: Single column layout
  1. Form section (top)
  2. Selected locations list
  3. Timeline
  4. Price summary
  5. Map (takes full width, maybe collapsible)
  6. Booking form

**Interactions**:
- Map should be touch-friendly
- Form inputs should be large enough for mobile
- Sticky CTA button at bottom on mobile

---

## User Flow & Interactions

### Step 1: Initial State
- Empty form
- Map showing all available locations
- No timeline or price (or show example)

### Step 2: User Configures Trip
- Select passengers
- Select starting point
- **Select optional activities**:
  - When activity is checked, map immediately highlights compatible locations
  - Example: Check "Rafting" → Tara Canyon marker gets highlighted/badge
  - All markers remain visible (no filtering)
  - Activity counter shows "Available at X locations"
- Map highlights starting point

### Step 3: User Selects Locations
- Click markers on map (including those offering selected activities)
- Selected locations appear in list
- **If activity was selected**: Activity automatically assigned to compatible location
- Timeline updates in real-time
- Price updates in real-time
- Validation runs (show if valid/invalid)
- Warning if activity selected but no compatible location chosen

### Step 4: Review & Adjust
- View timeline
- View price breakdown
- Remove locations if needed
- Adjust activities

### Step 5: Submit Booking
- Fill booking form
- Submit request
- Show confirmation message

---

## Key Design Principles

1. **Clarity**: Every element should have a clear purpose
2. **Hierarchy**: Important info (time, price) should stand out
3. **Feedback**: Real-time validation and updates
4. **Accessibility**: Good contrast, keyboard navigation, ARIA labels
5. **Professional**: Portfolio-grade quality
6. **Modern**: Clean, contemporary design (not dated)
7. **Trust**: Should feel reliable and professional (people are booking trips)

---

## Visual Style Preferences

**Overall Vibe**:
- Modern and clean (not cluttered)
- Professional but friendly
- Tourism/travel aesthetic (think Mediterranean, adventure, nature)
- Trustworthy (this is for booking trips)

**Avoid**:
- Over-designed or "busy" interfaces
- Too many colors or gradients
- Cluttered spacing
- Outdated UI patterns

**Inspiration**:
- Modern SaaS dashboards
- Booking.com / Airbnb (clean, functional)
- Travel agency websites (professional, inviting)
- Google Maps style integration (seamless)

---

## Deliverables Needed

1. **Main Page Design** (Desktop view)
   - Full layout with all sections
   - Light and dark mode (optional but nice)

2. **Mobile View**
   - Stacked layout
   - All key components adapted

3. **Component Library**
   - All reusable components (Button, Input, Select, Card, Badge, etc.)
   - Different states (hover, active, disabled, error)

4. **Map Integration Mock**
   - How markers should look
   - Selected vs unselected states
   - Route line style

5. **Timeline Component**
   - Visual design for hour-by-hour breakdown
   - Icons for different activity types

6. **Validation States**
   - Success message design
   - Warning message design
   - Error message design

---

## Technical Considerations

- Design must work with **Tailwind CSS** (use standard Tailwind classes)
- Compatible with **Shadcn/UI** component library
- Should work with **Google Maps embed**
- RTL support in mind (use logical properties: start/end vs left/right)
- Accessible (WCAG 2.1 AA minimum)

---

## Example User Scenario

**Maria, a tourist from Germany, wants to plan a day trip from Budva:**

1. Opens app, sees clean interface
2. Selects "4 passengers" from dropdown
3. Selects "Budva" as starting point
4. **Checks "Rafting" activity**:
   - Map immediately highlights Tara Canyon (offers rafting)
   - Other locations remain visible but not highlighted
   - Shows "Rafting available at 1 location"
5. Clicks markers on map: Kotor, Perast, **Tara Canyon**
6. Sees timeline update: 
   - 9:00 AM - Depart Budva
   - 9:45 AM - Arrive Kotor (visit: 2 hours)
   - 12:00 PM - Travel to Tara Canyon
   - 1:00 PM - **Rafting activity at Tara Canyon** (4 hours)
   - 5:30 PM - Travel to Perast (visit: 1.5 hours)
   - 7:15 PM - Return to Budva
   - **Total: 10.25 hours ✅**
7. Sees price: €320
8. Fills booking form
9. Clicks "Send Request"
10. Gets confirmation

**The design should make this flow intuitive and pleasant.**

**Note**: The activity-location connection should be visually clear — when Maria checks "Rafting", she should immediately see which locations offer it.

---

## Summary

Create a **modern, professional, single-page web app design** for Montenegro route planning with:
- Split-screen layout (form + map)
- Real-time interactive timeline
- Clear validation feedback
- Dynamic pricing display
- Mobile-responsive
- Clean, tourism-friendly aesthetic
- Built with Tailwind CSS / Shadcn/UI compatibility in mind

Focus on **clarity, usability, and professional appearance** — this is a portfolio piece that should impress potential employers.

---

**End of Design Brief**

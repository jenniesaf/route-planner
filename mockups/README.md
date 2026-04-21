# Montenegro Route Planner - HTML Mockups

Interactive HTML mockups for the Montenegro Route Planner application.

## 📁 Files

- **index.html** - Step 1: Trip Type Selection (with Full Vacation popup)
- **step2-plan-day.html** - Step 2: Plan Your Day (with live preview)
- **step3-booking.html** - Step 3: Price & Booking

## 🚀 How to Use

1. Open `index.html` in your web browser
2. Click through the workflow:
   - Choose a trip type
   - Plan your day (add locations, activities)
   - View pricing and submit booking

## ✨ Features

### Step 1: Trip Type Selection
- Three trip type cards (One-Day, Multi-Day, Full Vacation)
- Working Full Vacation modal with form
- Responsive design
- Hover effects

### Step 2: Plan Day
- Split-screen layout (form + map preview)
- Activity checkboxes with location counts
- Selected locations with remove functionality
- Live preview panel showing:
  - Day timeline
  - Route details
  - Duration calculation
  - **No price** (shown only in Step 3)
- Passenger counter
- Date picker

### Step 3: Booking
- Two-column layout:
  - Left: Trip summary with editable days
  - Right: Price breakdown + booking form
- Detailed price itemization
- Day-by-day pricing
- Booking form with validation
- Terms and conditions checkbox

## 🎨 Design System

### Colors Used
- **Primary Blue**: #1E40AF (Mediterranean Blue)
- **Secondary Teal**: #0D9488 (Coastal Teal)
- **Accent Orange**: #F97316 (Warm Coral)
- **Success Green**: #10B981
- **Warning Amber**: #fbbf24

### Typography
- System font stack
- Clear hierarchy
- Readable sizes

### Components
- Cards with hover effects
- Modals/overlays
- Form inputs with focus states
- Buttons with hover states
- Progress indicator
- Price tables

## 📱 Responsive Design

All pages adapt to different screen sizes:
- **Desktop**: Full split-screen layouts
- **Tablet**: Stacked layouts
- **Mobile**: Single column, simplified navigation

## 🔗 Navigation Flow

```
index.html (Step 1)
    ↓ Select One-Day or Multi-Day
step2-plan-day.html (Step 2)
    ↓ Confirm Day
step3-booking.html (Step 3)
    ↓ Submit Booking
index.html (Success → Back to start)
```

## 💡 Interactive Features

1. **Full Vacation Popup**: Opens modal, collects vacation details
2. **Passenger Counter**: Increment/decrement passengers
3. **Location Selection**: Visual chips with remove buttons
4. **Preview Panel**: Shows real-time day preview
5. **Form Validation**: Required fields enforced
6. **Success Alerts**: Confirmation messages

## 🎯 Design Notes for Developers

- All styles are inline CSS (easy to view/edit)
- Vanilla JavaScript (no dependencies)
- Semantic HTML structure
- Accessible forms
- Clear visual hierarchy
- Follows project design brief

## 📋 To Share with Designers

Send these files to your designers with:

1. **Visual Reference**: Open mockups in browser, take screenshots
2. **Interaction demos**: Record screen while clicking through flow
3. **Code Reference**: Designers can inspect CSS for exact spacing, colors
4. **Design System**: Colors and typography clearly documented

## 🔄 Next Steps

Designers can:
1. Use these as reference for high-fidelity designs
2. Improve visual styling while keeping layout structure
3. Add branded imagery and graphics
4. Refine color palette
5. Create design system in Figma/Sketch based on these mockups

---

**Note**: These are functional prototypes. The actual app will use Next.js, TypeScript, and proper component architecture as outlined in PROJECT_PLAN.md.

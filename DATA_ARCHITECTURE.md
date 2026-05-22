# Data Architecture Decisions — Montenegro Route Planner

## Why This Architecture

This project is built as a data-driven system. It separates:

- static data
- application logic

That separation keeps the codebase cleaner, easier to maintain, and ready for future features like admin tools or a database.

---

## Data vs. Logic

### Data

Location and configuration data should live in:

```txt
src/data/
```

Typical files:

- `locations.json`
- `activities.json`

Why:

- easier maintenance
- cleaner architecture
- scalable structure
- data can be edited without code changes
- simpler migration to a database later

### Logic

Business logic should live in:

```txt
src/lib/
```

Typical files:

- `routeEngine.ts`
- `pricingEngine.ts`
- `googleMaps.ts`

Why:

- logic belongs in functions and modules
- reusable code
- type safety
- easier testing
- clearer separation of concerns

---

## Long-Term Advantage

This approach makes future migration easy.

Today:

```txt
locations.json
```

Tomorrow:

```txt
PostgreSQL + Prisma
```

Because data and logic are separate, the core application code changes very little.

---

## What Belongs in TypeScript

Keep these in `.ts` files:

- routeEngine.ts
- pricingEngine.ts
- googleMaps.ts

Because they contain:

- functions
- calculations
- integrations
- business rules

---

## What Belongs in JSON

Keep these in JSON:

- locations
- activities
- pricing configs
- regions

Because they are:

- pure structured data
- configuration-like resources
- easy to move or replace later

---

## Scalable Structure

A scalable structure can grow like:

```txt
src/
  data/
    locations/
      coast.json
      central.json
      north.json
    activities.json
```

This supports:

- regional filtering
- lazy loading
- better maintainability
- easier administration

For MVP, one `locations.json` file is the simplest clean choice.

---

## JSON Limitations

JSON cannot contain:

- comments
- functions
- computed values

That limitation is useful here because it enforces pure data separation and keeps the architecture predictable.

Dynamic behavior belongs in TypeScript logic modules.

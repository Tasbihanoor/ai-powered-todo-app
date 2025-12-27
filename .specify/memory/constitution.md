# Full Stack Todo App Constitution

## Core Principles

### I. Premium Aesthetics First
**Visual Excellence is Mandatory.**
-   **No "Basic" Designs**: Every UI element must look polished. Use clear typography, proper spacing (whitespace), and harmonious color palettes.
-   **Tailwind Proficiency**: Use Tailwind CSS for all styling. Avoid vanilla CSS or CSS-in-JS libraries unless critical for complex animations.
-   **Micro-Interactions**: Hover states, focus rings, and transition effects are required for all interactive elements.
-   **Responsive**: Mobile-first design is non-negotiable.

### II. Explicit Architecture Partitioning
**Strict Separation of Concerns.**
-   **Server Components (Default)**: Use for data fetching, accessing the database, and keeping secrets.
-   **Client Components**: Use ONLY for interactivity (forms, onClick, useEffect). Must be marked with `'use client'`.
-   **Server Actions**: Use `src/server/actions` for ALL data mutations. NEVER use Next.js API Routes (`pages/api` or `app/api`) for internal logic.

### III. Data Integrity & Type Safety
**Trust Dynamic data, but Verify it.**
-   **Zod Validation**: ALL inputs (Server Actions, Forms, URL params) MUST be validated with Zod schemas.
-   **Strict TypeScript**: No `any` types. All database models must use inferred types from Drizzle.
-   **Migrations**: Database schema changes MUST be done via Drizzle Kit migrations. NEVER edit the production database manually.

### IV. Security by Design
**Secure Defaults.**
-   **Authentication**: All private routes must verify the `Better-Auth` session before rendering or executing logic.
-   **Authorization**: Verify user ownership of data (e.g., `todo.userId === session.user.id`) before update/delete.
-   **Secrets**: API keys and database URLs must be loaded from Environment Variables (`.env`). NEVER commit them to git.

### V. Performance & Optimization
-   **Image Optimization**: Use `next/image` with proper sizing and formats (WebP).
-   **Streaming**: Use `Suspense` and `loading.tsx` to handle async data fetching states gracefully.
-   **Font Optimization**: Use `next/font` for zero layout shift.

## Development Workflow

### 1. Planning Phase (SDD)
-   Before writing code, assume the **Architect Persona**.
-   Update `specs/todo-app/plan.md` and `tasks.md`.
-   Design the Component Hierarchy and State Flow.

### 2. Implementation Phase
-   Write the "Skeleton" (Layouts & Page structure) first.
-   Implement the "Data Layer" (Schema & DB connection) second.
-   Implement "Logic" (Server Actions) third.
-   Connect "UI" (Client Components) last.

### 3. Verification Phase
-   **Linting**: Code must pass `npm run lint`.
-   **Build**: Application must compile with `npm run build` without errors.
-   **Manual Check**: Verify "Premium" look and feel in the browser.

## Governance
This Constitution is the supreme law of the project.
**Any code violating these principles must be rejected.**
-   **Last Updated**: 2025-12-18
-   **Project**: Full Stack Todo App

<!-- 
## Foundational Principles

### I. Design Excellence as a First-Class Requirement

**A premium user experience is mandatory, not optional.**

* **No Minimal or Placeholder UI**
  Every interface element must appear intentional, refined, and production-ready. Typography, spacing, color contrast, and layout hierarchy must be carefully considered.
* **Tailwind CSS as the Single Source of Styling**
  All visual styling must be implemented using Tailwind CSS utilities. Traditional CSS files or CSS-in-JS solutions are prohibited unless a highly specialized animation or edge case requires them.
* **Mandatory Micro-Interactions**
  All interactive elements (buttons, inputs, toggles, cards) must include hover states, focus indicators, transitions, and visual feedback.
* **Mobile-First Responsiveness**
  The application must be designed for mobile screens first and progressively enhanced for tablets and desktops. Responsive behavior is non-negotiable.


### II. Explicit and Enforced Architecture Boundaries

**Separation of concerns must be strictly maintained.**

* **Server Components (Default)**
  Server Components must be used for:

  * Data fetching
  * Database access
  * Authentication checks
  * Secure logic and secrets
* **Client Components (Opt-In Only)**
  Client Components may be used **only** when interactivity is required (forms, event handlers, effects).
  All Client Components must explicitly include the `'use client'` directive.
* **Server Actions as the Only Mutation Layer**
  All create, update, and delete operations must be implemented using Server Actions located in `src/server/actions`.
  Next.js API routes (`pages/api` or `app/api`) are strictly forbidden for internal application logic.


### III. Data Integrity and Type Safety

**Dynamic data is assumed to be untrusted until validated.**

* **Zod as the Validation Authority**
  Every external input must be validated using Zod schemas, including:

  * Form submissions
  * Server Action payloads
  * URL parameters and search params
* **Strict TypeScript Discipline**
  Usage of `any` is prohibited.
  All database models must rely on inferred types generated from Drizzle ORM schemas.
* **Controlled Database Evolution**
  All schema changes must be performed through Drizzle Kit migrations.
  Direct edits to production databases are strictly forbidden.


### IV. Security-First Engineering

**Security is a default behavior, not an afterthought.**

* **Authentication Enforcement**
  All private routes and server logic must validate an active `Better-Auth` session before execution or rendering.
* **Authorization Verification**
  Ownership checks are mandatory before mutating or accessing user-specific data
  (e.g., verifying `todo.userId === session.user.id`).
* **Environment-Based Secrets Management**
  API keys, database URLs, and sensitive credentials must be stored in environment variables (`.env`).
  Secrets must never be committed to version control.


### V. Performance, Efficiency, and Optimization

**Performance is a feature of the product.**

* **Optimized Media Handling**
  All images must use `next/image` with appropriate sizing and modern formats such as WebP.
* **Async UI Management**
  React `Suspense` and `loading.tsx` must be used to gracefully handle asynchronous data loading states.
* **Font Optimization**
  All fonts must be loaded using `next/font` to eliminate layout shifts and ensure rendering stability.


## Development Workflow Standards

### 1. Planning Phase (System Design & Documentation)

* Adopt the **Architect Mindset** before writing any code.
* Update planning documents in:

  * `specs/todo-app/plan.md`
  * `tasks.md`
* Clearly define component hierarchy, state ownership, and data flow.

---

### 2. Implementation Phase

Development must follow this strict order:

1. **Structural Skeleton**
   Layouts, routing, and page structure
2. **Data Layer**
   Database schemas, ORM configuration, and connections
3. **Business Logic**
   Server Actions and validation logic
4. **User Interface**
   Client Components and interactive elements


### 3. Verification and Quality Gate

Before any change is considered complete:

* **Linting**
  Code must pass `npm run lint` with zero errors.
* **Build Validation**
  Application must compile successfully using `npm run build`.
* **Manual Review**
  Visual quality, responsiveness, and interaction polish must be verified in the browser.


## Governance and Enforcement

This document represents the **highest authority** within the project.

Any code, feature, or change that violates these principles must be **rejected or refactored** before acceptance.

* **Last Updated**: 2025-12-27
* **Project Name**: Full-Stack Todo Application
* **Document Type**: Engineering Constitution
 -->

# LivCare

An ICT apparatus for bovine diagnostics, tailored for Ugandan agriculturalists, leveraging AI-driven inference and cloud persistence.

---

## Table of Contents

- [System Synopsis](#system-synopsis)
- [Operationalization](#operationalization)
- [Architectural Topology](#architectural-topology)
- [Principal Modules](#principal-modules)
- [Authentication Paradigm](#authentication-paradigm)
- [Data Persistence](#data-persistence)
- [AI Integration](#ai-integration)
- [Styling & Theming](#styling--theming)
- [Auxiliary Scripts](#auxiliary-scripts)

---

## System Synopsis

LivCare is a multifaceted digital platform facilitating symptomatology input and subsequent AI-mediated disease conjecture for cattle. The system orchestrates user authentication, data storage, and real-time recommendation synthesis.

---

## Operationalization

To instantiate the development environment:

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
npm start
```

---

## Architectural Topology

- **Frontend:** Next.js (App Router), React 19, TailwindCSS 4, Lucide Icons
- **Backend:** Supabase (Postgres), Google Gemini AI, OpenAI (optional)
- **State & Eventing:** EventEmitter3, React Context
- **Persistence:** Supabase tables (`users`, `messages`, `responses`), localStorage (history cache)

---

## Principal Modules

- [`components/home/base`](components/home/base.tsx): Orchestrates user session, data hydration, and UI toggling.
- [`components/common/welcome-screen`](components/common/welcome-screen.tsx): Handles pre-auth and session validation.
- [`components/parts/titlebar/titlebar`](components/parts/titlebar/titlebar.tsx): Renders navigation and user controls.
- [`components/parts/history/history-dialog`](components/parts/history/history-dialog.tsx): Dialog for historical queries, hydrated from Supabase and/or localStorage.
- [`components/home/messageContainer/messageContainer`](components/home/messageContainer/messageContainer.tsx): Manages chat UI visibility and message propagation.
- [`lib/model/openAI`](lib/model/openAI.ts): AI prompt construction and response parsing.
- [`lib/database/chat/insertMessage`](lib/database/chat/insertMessage.ts): Persists user queries and AI responses.
- [`lib/auth/mainClient`](lib/auth/mainClient.ts): Supabase client instantiation.
- [`lib/auth/initalGoogleAuth`](lib/auth/initalGoogleAuth.ts): Google OAuth sign-in logic.

---

## Authentication Paradigm

- Utilizes Supabase OAuth (Google) for user identification.
- Session state is validated on each route entry; unauthenticated users are redirected.
- User metadata is persisted in the `users` table if not extant.

---

## Data Persistence

- **Remote:** Supabase tables for users, messages, and responses.
- **Local:** Browser localStorage for ephemeral history caching (see [`components/parts/history/storage/storage`](components/parts/history/storage/storage.ts)).

---

## AI Integration

- Prompts are constructed in [`lib/model/openAI`](lib/model/openAI.ts) and dispatched to Google Gemini.
- Responses are expected as strict JSON, parsed and mapped to UI.
- Error handling is minimal; malformed AI output may cause runtime exceptions.

---

## Styling & Theming

- TailwindCSS governs atomic styling.
- Theme toggling is managed via `next-themes` and custom hooks.
- Font families are injected via Next.js local font loader.

---

## Auxiliary Scripts

- `dev`: Launches Next.js in development mode.
- `build`: Compiles production assets.
- `start`: Runs the production server.
- `lint`: Executes code linting.

---

## Caveats

- The system presumes environmental variables for Supabase and Gemini API keys.
- AI output must conform to the prescribed JSON schema; deviations are not gracefully handled.
- The codebase is modular but not exhaustively documented inline.

---

## Contact

For further elucidation, consult the source or initiate a pull request.
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server (proxies /api to API_URL env var)
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint static analysis
npm run preview  # Preview production build locally
```

No test suite is configured.

## Architecture

**Stack:** React + TypeScript + Vite SPA. No CSS framework — all vanilla CSS with CSS custom properties for theming.

### Routing & Tab System

The app has three routes: `/` (RouterPage), `/login`, `/app`. The core UX is a tab-based interface where open tabs are encoded in query params (`?page=tabName`).

- `src/App.tsx` — root BrowserRouter with QueryClient provider
- `src/pages/RouterPage` — checks auth state, redirects to `/app` or `/login`
- `src/pages/AppPage` — main layout; syncs URL query params with TabStore and renders `AppTabRouter` for each open tab
- `src/pages/AppPagesRouter/AppTabRouter.tsx` — resolves tab names to components via `TAB_CONFIG`; renders with `visible`/`hidden` mode (all open tabs stay mounted)
- `src/types/constants/TabConfig.ts` — `TAB_CONFIG` maps tab base names to component + icon; tab names support dot notation for sub-IDs (`"tabName.subId"`)

### State Management

Two Zustand stores:

- `src/store/TokenStore.ts` — holds decoded JWT payload (in-memory only, no persistence)
- `src/store/TabStore.ts` — holds open tabs array + current tab; `tabs[]` is persisted to localStorage; `currentTab` is reconstructed from query params on load

### Module Structure

Feature modules live in `src/modules/` with a consistent layout:
```
ModuleName/
  components/   # Container/logic components
  ui/           # Presentational sub-components
  index.ts      # Barrel export (public API of the module)
```

### Navigation Hook

`src/hooks/useNavigateWithQuery.ts` — always use this instead of `useNavigate` when navigating within the app. It merges new search params with the current ones so tab state is preserved.

### CSS Conventions

- Each component has a colocated `.css` file (same folder, same name prefix)
- Global CSS custom properties defined in `src/index.css`: `--primary-color`, `--secondary-color`, `--background`, `--border-color`, `--error`
- Responsive breakpoints: 576px, 1024px, 1400px
- `ResizeObserver` is used in JS for element-level responsive behavior (see `Tab.tsx`)

### API & Auth

- `src/api/baseAPI.ts` — Axios instance with `/api` base URL (proxied in dev)
- `ApiResponse<T>` shape: `{ Success, MessageID, Messages, Data, Total }`
- JWT-based auth; `src/utils/jwtDispatcher.ts` parses the token payload
- Auto-login: `src/utils/storageAccountInfo.ts` persists credentials hash to localStorage under `localStorageConstants` keys; RouterPage reads this on load

### i18n

`src/i18n.tsx` — i18next with HTTP backend; language stored in localStorage; fallback `"en"`. All user-visible strings should use `useTranslation()`.

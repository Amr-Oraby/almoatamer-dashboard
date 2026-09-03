<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## BFF Process

When implementing a new feature that communicates with the backend, always follow this exact "BFF (Backend For Frontend) Process".

**Core Principles:**
- **Simplicity First**: Do NOT over-engineer. Always write the absolute simplest, most straightforward code possible.
- **Feedback**: ALWAYS use `sonner` (`toast.success` and `toast.error`) for all API mutations to provide instant user feedback on success and on error.

1. **API Setup (`features/[feature-name]/api.ts`)**: 
   - Define the endpoint calls using the global `apiClient` utility.
   - Apply the correct generic return types from `types.ts`.
2. **Types Definition (`features/[feature-name]/types.ts`)**: 
   - Based on the exact JSON response shape from the backend, write robust TypeScript interfaces.
   - Ensure that optional fields or fields that might be missing are explicitly typed as nullable (`| null`).
   - Define the payload shapes for mutations.
3. **Hooks Creation (`features/[feature-name]/hooks.ts`)**: 
   - Use `@tanstack/react-query` to create custom React hooks (`useQuery` for fetching, `useMutation` for creating/updating).
   - For mutations, include `onSuccess` and `onError` callbacks utilizing `toast` (from `sonner`) for seamless UI feedback. Call `queryClient.invalidateQueries` on success to refresh data.
4. **UI Integration**: 
   - Import and use the custom hooks directly in the UI components (e.g., pages, navbar).
   - Handle loading states (`isLoading` / `isPending`) and render the typed `.data` efficiently.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## BFF Process & Feature Structure

When implementing a new feature that communicates with the backend, always follow this exact "BFF (Backend For Frontend) Process".

Each feature located at `features/[feature-name]/` MUST follow this exact structure:
- `components/` (folder)
- `api.ts`
- `hooks.ts`
- `types.ts`

**Core Principles:**
- **Simplicity First**: Do NOT over-engineer. Always write the absolute simplest, most straightforward code possible.
- **Feedback**: ALWAYS use `sonner` (`toast.success` and `toast.error`) for all API mutations to provide instant user feedback on success and on error.

1. **Types Definition (`features/[feature-name]/types.ts`)**: 
   - Based on the exact JSON response shape from the backend, write robust TypeScript interfaces.
   - Ensure that optional fields or fields that might be missing are explicitly typed as nullable (`| null`).
   - Define the payload shapes for mutations.
2. **API Setup (`features/[feature-name]/api.ts`)**: 
   - Define the endpoint calls using the global `apiClient` utility.
   - Apply the correct generic return types from `types.ts`.
3. **Hooks Creation (`features/[feature-name]/hooks.ts`)**: 
   - Use `@tanstack/react-query` to create custom React hooks (`useQuery` for fetching, `useMutation` for creating/updating).
   - For mutations, include `onSuccess` and `onError` callbacks utilizing `toast` (from `sonner`) for seamless UI feedback. Call `queryClient.invalidateQueries` on success to refresh data.
4. **Component Architecture (`features/[feature-name]/components/`)**:
   - Create and store all UI components specific to this feature inside this folder. 
   - Keep components modular and strictly focused on this feature's domain.
5. **UI Integration**: 
   - Import and use the custom hooks from `hooks.ts` directly into the components inside your `components/` folder.
   - Handle loading states (`isLoading` / `isPending`) and render the typed `.data` efficiently.

## Data Table Implementation Process

When implementing a new page that contains a data table (e.g., `show-all` pages), follow these exact steps from start to finish. Always use the simplest, most straightforward, and most readable code possible.

1. **Bring the Data (Types & API)**:
   - **CRITICAL**: BEFORE writing any code, ALWAYS fetch the exact JSON response shape from the backend. You can do this by testing the endpoint in Postman, or by running a PowerShell script to authenticate (e.g. `/api/v1/admin/login` to get a Bearer token) and calling the endpoint directly.
   - NEVER guess the response shape. If the data is missing, unexpected, or throws an error, stop and ask for clarification.
   - Once verified, define strict TypeScript interfaces in `features/[feature-name]/types.ts`.
   - Update `features/[feature-name]/api.ts` to use these types instead of `any`.
2. **Create the Hooks (`hooks.ts`)**:
   - Create `@tanstack/react-query` hooks (e.g., `useClients`) to fetch the data, passing any necessary parameters like `page`.
3. **Build the Table Component (`components/[Feature]Table.tsx`)**:
   - Reuse existing standard table structures (like `UmrahsTable` or `ClientsTable`) for consistency.
   - For the ID/index column, DO NOT use the raw API `id`. Instead, use a calculated sequential number: `(page - 1) * (data?.meta?.per_page || 10) + row.index + 1`.
   - **CRITICAL NOTE - Translations**: Before finishing any page or component, ALWAYS verify that the `next-intl` translation keys (`t('key')`) actually exist in the `messages/ar.json` file. Missing translations will crash the page. If a translation is missing, either add it or use hardcoded text gracefully to prevent runtime errors.
4. **Integrate into the Page**:
   - Import and render the Table component inside the target page (e.g., `app/[locale]/(main)/[feature]/show-all/page.tsx`).
   - Remove any old placeholder text.
   - **IMPORTANT**: ALWAYS remove the `<EndpointBadge>` component and its import from the page once the table is finished.
5. **Commit and Push**:
   - Once the table is fully integrated and tested, commit the changes using `git add .` and `git commit -m "feat: Add [feature] table"` and push the changes to the repository.
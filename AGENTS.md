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
- `schemas.ts` (If the feature contains a form, add this file and use `zod` and `react-hook-form` with the simplest code possible)

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
6. **Commit and Push**:
   - Once the table is fully integrated and tested, commit the changes using `git add .` and `git commit -m "feat: Add [feature] table"` and push the changes to the repository.

## Show Page Implementation Process

When implementing a "show details" page for a specific entity (e.g., `app/[locale]/(main)/[feature]/show/[id]/page.tsx`), follow this exact process to ensure consistency, prevent translation errors, and maintain a premium responsive UI.

1. **Verify Requirements & Data**:
   - Determine if the entity requires a dedicated show page (e.g., if there is a lot of content or if the `id` is provided in the URL for detailed viewing).
   - Ensure the required types and endpoint for fetching a single item (e.g., `useClient(id)`) exist in the `features/[feature-name]/` structure (`types.ts`, `api.ts`, `hooks.ts`).
   - **CRITICAL**: Always verify the correct single-item API endpoint path from the backend (e.g., check if it uses a singular or plural noun like `/api/coupon/{id}` vs `/api/coupons/{id}`). Do not guess the endpoint.
   - **CRITICAL**: NEVER guess the type properties or assume they match other similar entities (e.g., don't assume `country.nationality_name` exists just because another feature has it). Always strictly check `types.ts` for the exact shape. If you are unsure or fields are missing, STOP and ask the user for clarification before proceeding.
2. **Translation Setup (CRITICAL)**:
   - **ALWAYS** check and add translation keys to BOTH `messages/ar.json` and `messages/en.json` before building the UI.
   - Missing translations in either file will cause a `MISSING_MESSAGE` runtime error and crash the page.
3. **Build the Show Page UI (`page.tsx`)**:
   - Retrieve the `id` from the URL using `useParams()` and pass it to your data fetching hook (e.g., `useClient(id)`).
   - Create a polished, responsive layout mirroring existing show pages (like the `umrahs` show page).
   - **Aesthetics & Layout**: Use `Card`, `CardContent`, and `Badge` components from `components/ui/`.
   - Use `lucide-react` icons (e.g., `Phone`, `Mail`, `User`) to make the interface visually appealing.
   - Ensure fonts are readable and sized appropriately (e.g., `text-lg`, `text-2xl` for headers, `text-base` for details) and use generous spacing/padding.
   - Use a compact header with the entity's avatar/icon, name, ID, and a status badge.
   - Use responsive grids (`grid-cols-1 md:grid-cols-2`) for displaying partitioned details (like Personal Info vs Location).
8. **Error Handling & Loading States**:
   - Handle `isLoading` with a centered spinner (`Loader2` from `lucide-react`).
   - Handle `isError` or missing data with a clean "Not Found" message using translations.
5. **Commit and Push**:
   - Once the page is tested for layout responsiveness, data mapping, and translations (in both `ar` and `en`), commit the changes using `git add .` and `git commit -m "feat: Add [feature] show page with details"` and push to the repository.

## Delete Feature Process

When implementing a delete functionality for a table item, follow this exact process:

1. **Verify the Endpoint**: Get the exact endpoint name from the user. The response shape is typically: `{ "status": "success", "message": "...", "data": null }`.
2. **API Setup (`features/[feature-name]/api.ts`)**: Add a delete function using the global `apiClient` with `{ method: 'DELETE' }`.
3. **Hooks Creation (`features/[feature-name]/hooks.ts`)**: Create a custom hook `useDelete[Feature]` using `useMutation` from `@tanstack/react-query`.
   - In `onSuccess`, display the backend message using `toast.success` and invalidate the relevant query key using `queryClient.invalidateQueries`.
   - In `onError`, display the error using `toast.error`.
4. **Component Integration (`components/[Feature]Table.tsx`)**:
   - Add a "Delete" button (text should be translated or "حذف") to the 3 dots action menu (`TableActionMenu` or similar).
   - Use Shadcn UI's `AlertDialog` to show a confirmation modal when the user clicks the delete button.
   - Only trigger the mutation hook if the user confirms the action.
5. **Commit and Push**:
   - Once the delete functionality is fully integrated and tested, commit the changes using `git add .` and `git commit -m "feat: Add delete functionality for [feature]"` and push to the repository.

## Filter Feature Process

When implementing a filtering functionality (e.g., filtering a table by status, type, etc.), follow this exact process:

1. **Verify the Requirement**: Identify the filter key (e.g., `is_paid`) and the allowed values (e.g., `0`, `1`) that the backend API expects.
2. **Translation Setup (CRITICAL)**:
   - Add translation keys for the filter placeholder (e.g., `payment_status`) and the options (e.g., `paid`, `unpaid`) in both `messages/ar.json` and `messages/en.json`.
3. **API and Hook Setup (`features/[feature-name]/api.ts` & `hooks.ts`)**:
   - Update the `get[Feature]s` API function to accept the new filter parameter and append it to the URL (using `URLSearchParams`).
   - Update the `use[Feature]s` hook to accept the filter parameter. Pass it to the API function and include it in the `queryKey` array so React Query refetches when the filter changes.
4. **Component Integration (`components/[Feature]Table.tsx`)**:
   - Read the filter value from the URL using `useSearchParams().get('filter_key')`.
   - Pass the value to the `use[Feature]s` hook.
   - Add the `<UrlFilter>` component to the `topContent` prop of the `<DataTable>` component, passing the correct `filterKey`, `placeholder`, and `options`.
5. **Commit and Push**:
   - Once the feature is finished and everything is correct, commit the changes using `git add .` and `git commit -m "feat: Add filter functionality for [feature]"` and push to the repository.
# AI T-shirt Designer

Add the uploaded designer feature while preserving all existing pages and behavior apart from its single new dashboard sidebar link and the requested saved-design listing.

## Build
1. Add a protected `/dashboard/ai-designer` page and one **AI Designer** sidebar link. Include the design idea, style, shirt-color swatches and custom picker, placement selector, responsive shirt preview, prompt display, loading/error states, Generate Again, PNG download, and Save Design. Color and placement changes update only the preview.
2. Add authenticated `POST /api/design/generate` with input validation, server-side prompt improvement, and a replaceable image-provider module. Return the improved prompt and a usable image URL; keep provider credentials on the server and use the existing Lovable AI setup.
3. Add `saved_designs` with user ownership and row-level security, plus private image storage. Add authenticated save/list operations and show each user’s saved designs in the existing My Designs page while preserving its current empty state and visual style.
4. Verify protected access, generation/loading/error behavior, immediate preview controls, downloads, and owner-only save/list behavior. Document any required configuration; avoid adding a user-supplied AI key if the existing Lovable AI service suffices.

## Technical details
- Keep the new designer within the existing authenticated dashboard route tree; use a TanStack Start API handler for the requested HTTP endpoint and the existing authentication token for access checks.
- Use the Lovable AI Gateway server-side for prompt improvement and image creation, with the workspace’s assigned defaults. Store generated PNGs in private user-scoped storage and return signed image URLs; store the owned object path with each design.
- Add the database table through the Lovable Cloud migration workflow with explicit grants and owner-scoped RLS. Do not alter existing tables or authentication behavior.
- Prefer existing semantic styling tokens and components; keep changes to the dashboard navigation and the existing My Designs placeholder limited to the requested feature.
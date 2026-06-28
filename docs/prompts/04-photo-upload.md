# Prompt: Photo Upload with Signed URLs

## Task

Let users upload profile photos. Store in S3/R2/Supabase Storage, serve via signed URLs.

## Files to modify

**Backend:**
- New: `backend/src/routes/upload.js` — `POST /upload/presign` → signed upload URL
- `backend/src/routes/auth.js` — `PATCH /profile` accepts `photos[]` URLs
- `backend/src/server.js` — mount upload router

**Frontend:**
- `app/src/screens/OnboardingScreen.tsx` — photo picker step
- `app/src/screens/ProfileScreen.tsx` — add/remove/reorder photos
- New: `app/src/api/upload.ts` — presign → upload → confirm flow

## Requirements

1. **Presigned upload flow:**
   - Client: `POST /upload/presign { filename, contentType }` → `{ uploadUrl, publicUrl }`
   - Client: `PUT` file directly to storage via `uploadUrl`
   - Client: `PATCH /profile { photos: [publicUrl, ...] }` (max 6 photos)

2. **Validation:**
   - Max 6 photos per user, max 5MB each
   - Allowed types: `image/jpeg`, `image/png`, `image/webp`
   - Server validates URL domain matches configured bucket

3. **UI:**
   - Onboarding: "Add at least 1 photo" with camera + gallery picker
   - Profile: grid of photos with +/add and x/remove
   - Loading spinner during upload
   - Placeholder avatar if no photos

4. **Storage config (env vars):**
   ```
   STORAGE_ENDPOINT=
   STORAGE_BUCKET=
   STORAGE_ACCESS_KEY=
   STORAGE_SECRET_KEY=
   STORAGE_PUBLIC_URL=
   ```

## Acceptance criteria

- [ ] User can add photos from onboarding and profile
- [ ] Photos display in Discovery cards and match list
- [ ] Upload works on Android emulator and device
- [ ] Invalid files rejected with user-friendly error
- [ ] `.env.example` updated with storage vars

## Constraints

- Use `expo-image-picker` for photo selection
- Support Cloudflare R2 or S3-compatible storage (same API)
- Do not store image binary in Postgres — URLs only
/**
 * Where the browser reaches the API.
 *
 * Only VITE_* variables are inlined into the bundle, so whatever goes here is
 * public by definition. Never put a secret in it.
 *
 * The API mounts its v1 router at /api/v1 (apps/api/src/app.ts) and listens on
 * 4000 by default (apps/api/src/config/env.ts), which is the fallback below.
 */
export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1'

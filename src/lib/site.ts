export const DEFAULT_SITE_KEY = 'f1';

/**
 * Returns the current site key for multi-site deployments.
 *
 * Contract:
 * - Uses NEXT_PUBLIC_SITE_KEY when present.
 * - Falls back to DEFAULT_SITE_KEY to keep local dev working.
 */
export function getSiteKey(): string {
  return process.env.NEXT_PUBLIC_SITE_KEY || DEFAULT_SITE_KEY;
}

/**
 * Returns the current year used for db reads.
 * Falls back to current calendar year in dev if env isn't set.
 */
export function getCurrentYear(): string {
  return (
    process.env.NEXT_PUBLIC_CURRENT_YEAR || String(new Date().getFullYear())
  );
}

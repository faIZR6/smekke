// Pre-launch gate: until this is true, every page except /coming-soon is
// rewritten to serve it, and shop-only nav links stay hidden. Set
// SITE_IS_LIVE=true in Vercel project settings and redeploy to launch —
// no code changes needed.
export const SITE_IS_LIVE = process.env.SITE_IS_LIVE === "true";

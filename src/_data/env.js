/**
 * Deploy environment.
 *
 * Search indexing is OFF by default and must be switched on deliberately.
 * The failure we are preventing: a half-finished preview gets crawled, and
 * the client's business ends up with a stray Google result pointing at an
 * unfinished site with the wrong address on it. That is far more expensive
 * to clean up than it is to avoid.
 *
 * To go live, set ALLOW_INDEXING=true in the Netlify site's environment
 * variables. Nothing else needs to change.
 *
 * Netlify supplies CONTEXT, URL, DEPLOY_PRIME_URL and BRANCH automatically.
 * See https://docs.netlify.com/configure-builds/environment-variables/
 */

const context = process.env.CONTEXT || "local";
const allowIndexing = process.env.ALLOW_INDEXING === "true";

// DEPLOY_PRIME_URL is the branch or preview URL; URL is the production one.
// Falling back to localhost keeps canonical tags sane during development.
const baseUrl =
  process.env.DEPLOY_PRIME_URL ||
  process.env.URL ||
  "http://localhost:8080";

export default {
  context,
  branch: process.env.BRANCH || "",
  isProduction: context === "production",
  allowIndexing,
  baseUrl: baseUrl.replace(/\/$/, ""),
};

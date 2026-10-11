import { cacheLife } from "next/cache";

// Cache Components rejects a bare `new Date()` during prerender. Capturing it
// inside a cache scope bakes the year into the static shell and refreshes it
// rarely (a year changes once a year), so the footer stays fully static.
export async function CurrentYear() {
  "use cache";
  cacheLife("max");
  return <>{new Date().getFullYear()}</>;
}

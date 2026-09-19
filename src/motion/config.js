import { workspaces } from "../data/portfolio";
export const motion = {
  ui: 180,
  window: 620,
  workspace: 520,
  ease: "cubic-bezier(.16,1,.3,1)",
};
export const workspaceIds = workspaces
  .filter((item) => item.label)
  .map((item) => item.id);
export function readPreference(key, fallback, session = false) {
  try {
    return (session ? sessionStorage : localStorage).getItem(key) || fallback;
  } catch {
    return fallback;
  }
}
export function savePreference(key, value, session = false) {
  try {
    (session ? sessionStorage : localStorage).setItem(key, value);
  } catch {
    /* Private storage may be unavailable. */
  }
}
export function overdrive() {
  window.dispatchEvent(new Event("arch:overdrive"));
}

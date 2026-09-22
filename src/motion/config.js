import { workspaces } from "../data/portfolio";
export const workspaceIds = workspaces
  .filter((item) => item.label)
  .map((item) => item.id);
export function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Storage is optional. */
  }
}

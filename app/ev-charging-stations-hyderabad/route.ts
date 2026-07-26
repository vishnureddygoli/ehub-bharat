import { legacyRedirect } from "../legacy-redirect";

export function GET(request: Request) {
  return legacyRedirect(request, "/government-ev-infrastructure");
}

import { legacyRedirect } from "../legacy-redirect";

export function GET(request: Request) {
  return legacyRedirect(request, "/private-fleets");
}

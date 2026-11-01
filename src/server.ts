import { paraglideMiddleware } from "./paraglide/server.js";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

export default createServerEntry({
  fetch(request, options) {
    return paraglideMiddleware(request, () => handler.fetch(request, options));
  },
});

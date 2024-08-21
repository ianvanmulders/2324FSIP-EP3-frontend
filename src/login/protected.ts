// Filename: protected.ts

import { hasRole } from "../ts/utils/auth.ts"

if (hasRole("worker") || hasRole("owner")) {
  console.log("Worker access granted.")
} else {
  location.assign(`../401/?from=${window.location.href}`)
  // Redirect to 401 if not a worker
}

import { createAuthClient } from "better-auth/react";

import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:"https://client-booknook.vercel.app",
  plugins: [
    jwtClient(),
  ],
});
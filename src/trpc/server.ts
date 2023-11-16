import "server-only";
import { headers } from "next/headers";

import { appRouter } from "@/server/api/root";
import { auth } from "@clerk/nextjs";
import { db } from "@/server/db";

export function caller() {
  return appRouter.createCaller({
    auth: auth(),
    headers: headers(),
    db,
  });
}

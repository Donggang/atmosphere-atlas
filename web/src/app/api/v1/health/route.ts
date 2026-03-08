import { NextResponse } from "next/server";

import { getEnvValidation } from "@/lib/env";

export async function GET() {
  const envValidation = getEnvValidation();

  return NextResponse.json(
    {
      status: envValidation.ok ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      checks: {
        runtimeConfig: {
          ready: envValidation.ok,
          invalidKeys: envValidation.ok ? [] : envValidation.invalidKeys,
        },
      },
    },
    { status: envValidation.ok ? 200 : 503 },
  );
}

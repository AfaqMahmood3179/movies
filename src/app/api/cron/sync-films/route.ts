import { NextRequest, NextResponse } from "next/server";
import { syncFilmsFromInternetArchive } from "@/lib/syncFilms";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Allow sufficient time for cron ingestion

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const searchParams = request.nextUrl.searchParams;
  const queryKey = searchParams.get("key");

  // Verify authorization
  // Vercel Cron sends Authorization: Bearer <CRON_SECRET>
  const isAuthorized =
    (cronSecret && authHeader === `Bearer ${cronSecret}`) ||
    (cronSecret && queryKey === cronSecret) ||
    process.env.NODE_ENV === "development";

  if (!isAuthorized) {
    return NextResponse.json(
      { error: "Unauthorized. Valid CRON_SECRET required." },
      { status: 401 }
    );
  }

  const rows = parseInt(searchParams.get("rows") || "50", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const startTime = Date.now();
  const syncResult = await syncFilmsFromInternetArchive({ rows, page });
  const durationMs = Date.now() - startTime;

  return NextResponse.json({
    status: syncResult.success ? "success" : "partial_success",
    timestamp: new Date().toISOString(),
    executionTimeMs: durationMs,
    stats: {
      totalItemsEvaluated: syncResult.totalFetched,
      qualifyingPublicDomain: syncResult.qualifyingCount,
      filmsSavedToDatabase: syncResult.addedCount,
      skippedDueToLicensing: syncResult.skippedCount,
      databaseErrors: syncResult.errorCount,
    },
    sampleAdded: syncResult.filmsAdded.slice(0, 10),
    errors: syncResult.errors,
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}

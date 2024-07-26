import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Extract job ID from the query string
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  // Send a GET request to the Prodia API
  const response = await fetch(`https://api.prodia.com/v1/job/${jobId}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-Prodia-Key": `${process.env.NEXT_PUBLIC_API_PRODIA}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: response.status }
    );
  }

  // Parse the JSON response from the Prodia API
  const data = await response.json();

  // Return the JSON response to the client
  return NextResponse.json(data);
}

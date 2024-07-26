import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Parse the JSON body of the incoming request
  const body = await req.json();

  // Send a POST request to the Prodia API
  const response = await fetch("https://api.prodia.com/v1/sd/generate", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-Prodia-Key": `${process.env.NEXT_PUBLIC_API_PRODIA}`,
    },
    body: JSON.stringify(body),
  });

  // Parse the JSON response from the Prodia API
  const data = await response.json();

  // Return the JSON response to the client
  return NextResponse.json(data, { status: response.status });
}

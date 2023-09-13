import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // const apiKey = process.env.OPENAI_API_KEY;
  const url = process.env.OPENAI_PROXY_URL + "/v1/chat/completions";
  const body = await req.json();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("Authorization") as string,
      },
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    return new Response(error as string, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  const targetUrl =
    "https://ikhwanvision.freedev.app/backend/api/categories/index.php";

  try {
    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        Referer: "https://ikhwanvision.freedev.app/",
      },
      cache: "no-store",
    });

    const responseText = await res.text();

    if (responseText.trim().startsWith("<")) {
      return NextResponse.json({ status: "error", data: [] }, { status: 403 });
    }

    const data = JSON.parse(responseText);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: "error", data: [] }, { status: 500 });
  }
}

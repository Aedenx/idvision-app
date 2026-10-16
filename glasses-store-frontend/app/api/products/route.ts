import { NextResponse } from "next/server";

export async function GET() {
  const targetUrl =
    "https://ikhwanvision.freedev.app/backend/api/products/index.php";

  try {
    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        // Menyamarkan request Vercel sebagai Chrome Browser Windows resmi
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Referer: "https://ikhwanvision.freedev.app/",
      },
      cache: "no-store",
    });

    const responseText = await res.text();

    // Jika InfinityFree mengirimkan HTML Anti-Bot bukannya JSON
    if (responseText.trim().startsWith("<")) {
      console.error("Blocked by InfinityFree Anti-Bot Protection HTML");
      return NextResponse.json(
        {
          status: "error",
          message: "Blocked by InfinityFree Anti-Bot Challenge",
          data: [],
        },
        { status: 403 },
      );
    }

    const data = JSON.parse(responseText);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Proxy Fetch Error:", error);
    return NextResponse.json({ status: "error", data: [] }, { status: 500 });
  }
}

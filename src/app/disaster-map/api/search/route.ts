import axios from "axios";

const SERVICE_KEY = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const API_URL = "https://api.mapbox.com/search/geocode/v6/forward";
const LANGUAGE = "ko";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const searchData = searchParams.get("searchData") || "";

    if (!searchData) {
      return new Response(JSON.stringify({ features: [] }), { status: 200 });
    }

    const response = await axios.get(API_URL, {
      params: {
        access_token: SERVICE_KEY,
        language: LANGUAGE,
        q: searchData,
      },
    });
    console.log(response);
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Mapbox Geocoding API 호출 실패", error);
    return new Response(JSON.stringify({ error: "Geocoding API 실패" }), {
      status: 500,
    });
  }
}

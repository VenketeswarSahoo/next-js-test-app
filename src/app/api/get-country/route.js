import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      `https://pro.ip-api.com/json/?fields=61439&key=${process.env
        .IP_TRACK_KEY}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch country data" },
      { status: 500 }
    );
  }
}

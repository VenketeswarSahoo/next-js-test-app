// app/api/passportVerification/route.js
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Get the file from the request
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 }
      );
    }

    // The token for the external API (keep this secret in your .env)
    const token = process.env.SUREPASS_TOKEN;

    // Prepare the form data for the external API
    const externalFormData = new FormData();
    externalFormData.append("file", file);

    // Make the request to the Surepass API
    const response = await axios.post(
      "https://kyc-api.surepass.io/api/v1/ocr/passport",
      externalFormData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Return the response to the client
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Passport verification failed!" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_URL || "https://adnum-highfiver.vercel.app";

  const accountAssociation = {
    header: "eyJmaWQiOjg2OTk5OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDc2ZDUwQjBFMTQ3OWE5QmEyYkQ5MzVGMUU5YTI3QzBjNjQ5QzhDMTIifQ",
    payload: "eyJkb21haW4iOiJhZG51bS1oaWdoZml2ZXIudmVyY2VsLmFwcCJ9",
    signature: "MHhlNGUwYjQ2M2U1MGY1OWIwMTA4ODljNGJlOWEwNzAzZGM2M2U5OWE0MzQ2M2NlYTJlNmUyNGMwZGQxMGQwZjA5NWEyNTBmOTgwNGU0ODNjZjc3YjNkZmU5ZWUzZmE0MDQ2NDgwOTY3NDNkNWRiYWFiM2Q3NjNhMDdjMGM3YjYxZjFi"
  };

  const frame = {
    version: "1",
    name: "HighFiver",
    iconUrl: `${appUrl}/icon.png`,
    homeUrl: appUrl,
    imageUrl: `${appUrl}/og.png`,
    buttonTitle: "Open",
    webhookUrl: `${appUrl}/api/webhook`,
    splashImageUrl: `${appUrl}/splash.png`,
    splashBackgroundColor: "#555555",
    primaryCategory: "social",
    tags: ["highfive", "social", "farcaster", "miniapp", "interaction"]
  };

  return NextResponse.json({
    accountAssociation,
    frame
  });
}

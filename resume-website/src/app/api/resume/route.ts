import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Resume API endpoint",
    status: 200,
  });
}

export async function POST(request: Request) {
  const data = await request.json();

  return NextResponse.json({
    message: "Data received",
    data,
    status: 200,
  });
}

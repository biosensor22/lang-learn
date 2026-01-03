import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(AuthOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session?.user?.email ?? undefined;
    if (!email) {
      return NextResponse.json(
        { error: "User email missing" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("User API error:", err);
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data) {
      return NextResponse.json({
        success: false,
        message: "Data user is empty",
        status: 400,
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email alredy in use" },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({ data });
    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

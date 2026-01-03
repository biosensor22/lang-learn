import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { word: rawWord } = (await req.json()) as { word: string };
    if (
      !rawWord ||
      typeof rawWord !== "string" ||
      rawWord.length < 1 ||
      rawWord.length > 100
    ) {
      return NextResponse.json({ error: "Word is required" }, { status: 400 });
    }
    const word = rawWord.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const result = await prisma.word.updateMany({
      where: {
        userId: user.id,
        name: word,
      },
      data: {
        isLearned: false,
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Word moved to Learn successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

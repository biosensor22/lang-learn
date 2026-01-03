import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import type { ListTypes } from "@/app/hooks/Words/wordsList";

const filterMap: Record<ListTypes, object> = {
  "to-learn": { isLearned: false },
  learned: { isLearned: true },
  vocabulary: { inVocab: true },
};

export async function GET(req: NextRequest) {
  const session = await getServerSession(AuthOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type") as ListTypes | null;
  if (!type || !filterMap[type]) {
    return NextResponse.json(
      { success: false, message: "Invalid or missing type" },
      { status: 400 }
    );
  }

  try {
    const wordsLearn = await prisma.word.findMany({
      where: {
        user: { email: session.user.email },
        ...filterMap[type],
      },
      orderBy: { id: "asc" },
    });
    if (wordsLearn.length === 0) {
      return NextResponse.json({
        success: true,
        message: "List of words is empty",
        wordsLearn: [],
      });
    }

    return NextResponse.json({
      success: true,
      wordsLearn,
    });
  } catch (err) {
    console.error("GET_WORDS_ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

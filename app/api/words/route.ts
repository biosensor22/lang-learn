import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route"; // Или из @/lib/auth
import { NextRequest, NextResponse } from "next/server";
import { DictionaryService } from "@/app/services/dictionary.service";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { word: rawWord } = await req.json();
    if (!rawWord || typeof rawWord !== "string") {
      return NextResponse.json({ error: "Word is required" }, { status: 400 });
    }
    const word = rawWord.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const existing = await prisma.word.findFirst({
      where: { userId: user.id, name: word },
    });
    if (existing)
      return NextResponse.json({ error: "Already exists" }, { status: 400 });

    const wordData = await DictionaryService.getFullWordInfo(word);

    await prisma.word.create({
      data: {
        name: word,
        userId: user.id,
        inVocab: true,
        isLearned: false,
        ...wordData,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { Words } from "@/app/components/ToLearn/WordEdit";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const data = (await req.json()) as Words;

    if (!data)
      return NextResponse.json({ error: "Fill the fields" }, { status: 400 });
    const { name, transcription, ruMean, examples } = data;

    if (!name?.trim() || !ruMean?.trim()) {
      return NextResponse.json(
        { error: "Required fields are empty" },
        { status: 400 }
      );
    }

    if (name.length > 100 && ruMean.length > 100) {
      return NextResponse.json(
        { error: "Name max length is 100" },
        { status: 400 }
      );
    }

    if (transcription && transcription.length > 100) {
      return NextResponse.json(
        { error: "Transcription max length is 100" },
        { status: 400 }
      );
    }

    if (examples && examples.length > 500) {
      return NextResponse.json(
        { error: "Examples max length is 500" },
        { status: 400 }
      );
    }

    await prisma.word.updateMany({
      where: {
        userId: user.id,
        name: name,
      },
      data: {
        name: name,
        transcription: transcription,
        examples: examples,
        ruMean: ruMean,
      },
    });

    return NextResponse.json({ success: true, message: "Edited successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

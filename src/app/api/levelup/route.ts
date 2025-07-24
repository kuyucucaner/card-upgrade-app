
import { dbConnect } from "@/lib/dbConnect";
import Card from "@/models/Card";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { cardId } = body;

    const card = await Card.findById(cardId);
    if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });

    if (card.progress < 100) {
      return NextResponse.json({ error: "Not enough progress" }, { status: 400 });
    }
    if (card.level >= 3) {
  return NextResponse.json({ error: "Max level reached" }, { status: 400 });
}

    card.level += 1;
    card.progress = 0;

    await card.save();

    return NextResponse.json({ level: card.level });
  } catch (error) {
    console.error("Level up error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import Card from "@/models/Card";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { userId, cardId, amount } = body;

    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const now = new Date();
    const diffMs = now.getTime() - new Date(user.lastEnergyUpdate).getTime();
    const diffMinutes = Math.floor(diffMs / (60 * 1000));

    if (diffMinutes > 0 && user.energy < 100) {
      user.energy = Math.min(100, user.energy + diffMinutes);
      user.lastEnergyUpdate = now;
    }

    if (user.energy < 1) {
      return NextResponse.json({ error: "Not enough energy" }, { status: 400 });
    }

    const card = await Card.findById(cardId);
    if (!card)
      return NextResponse.json({ error: "Card not found" }, { status: 404 });

    if (card.progress >= 100) {
      return NextResponse.json(
        { error: "Already full progress" },
        { status: 400 }
      );
    }
    if (user.energy < amount) {
  return NextResponse.json({ error: "Not enough energy" }, { status: 400 });
}

    const safeAmount = Math.max(1, Math.min(amount, 10));
    card.progress += safeAmount * 2;
    console.log("Safe Amount : ", safeAmount);

    if (card.progress > 100) card.progress = 100;

    user.energy -= safeAmount;


    await card.save();
    await user.save();

    return NextResponse.json({ progress: card.progress, energy: user.energy });
  } catch (error) {
    console.error("Progress error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

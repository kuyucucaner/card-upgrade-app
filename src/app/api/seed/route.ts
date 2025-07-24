// api/seed/route
import { dbConnect } from "@/lib/dbConnect";
import Card from "@/models/Card";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    let user = await User.findOne({ username: "demo-user" });

    if (!user) {
      user = new User({ username: "demo-user" });
      await user.save();
    }
const existingCards = await Card.find({ userId: user._id });
if (existingCards.length < 10) {
  const cardsToCreate = 10 - existingCards.length;
  const newCards = [];
  for (let i = 0; i < cardsToCreate; i++) {
    newCards.push({ userId: user._id, name: `Kart ${i + 1}` });
  }
  await Card.insertMany(newCards);
}


const allCards = await Card.find({ userId: user._id });
return NextResponse.json({
  userId: user._id,
  cards: allCards.map(card => ({
    id: card._id,
    name: card.name,
    level: card.level,
    progress: card.progress,
  })),
});

  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu" },
      { status: 500 }
    );
  }
}


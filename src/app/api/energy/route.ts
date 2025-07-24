// api/energy/route
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
  await dbConnect();
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "No userId" }, { status: 400 });

  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });


  const now = new Date();
  const diffMs = now.getTime() - new Date(user.lastEnergyUpdate).getTime();
  const diffMinutes = Math.floor(diffMs / (60 * 1000));

  if (diffMinutes > 0 && user.energy < 100) {
    const newEnergy = Math.min(100, user.energy + diffMinutes);
    user.energy = newEnergy;
    user.lastEnergyUpdate = now;
    await user.save();
  }

  return NextResponse.json({ energy: user.energy });
}catch (error) {
    console.error("Energy fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

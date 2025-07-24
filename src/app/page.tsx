"use client";

import { useState, useEffect } from "react";
import CardProgress from "@/components/CardProgress";
import LevelUpButton from "@/components/LevelUpButton";
import ProgressButton from "@/components/ProgressButton";
import axios from "axios";

interface CardType {
  id: string;
  name: string;
  level: number;
  progress: number;
}

export default function Home() {
  const [userId, setUserId] = useState("");
  const [cards, setCards] = useState<CardType[]>([]);
  const [energy, setEnergy] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setup = async () => {
      const { data } = await axios.get("/api/seed");
      setUserId(data.userId);
      setCards(data.cards);
    };
    setup();
  }, []);

useEffect(() => {
  if (!userId) return;

  const fetchEnergy = async () => {
    const { data } = await axios.get(`/api/energy?userId=${userId}`);
    setEnergy(data.energy);
  };

  // İlk çağrı
  fetchEnergy();

  // Her 60 saniyede bir tekrar çağır
  const interval = setInterval(fetchEnergy, 60000);

  // Sayfa kapandığında temizle
  return () => clearInterval(interval);
}, [userId]);


  const handleProgress = async (cardId: string, amount: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.post("/api/progress", {
        userId,
        cardId,
        amount,
      });
      setCards((prev) =>
        prev.map((c) =>
          c.id === cardId ? { ...c, progress: data.progress } : c
        )
      );
      setEnergy(data.energy);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLevelUp = async (cardId: string) => {
    try {
      const { data } = await axios.post("/api/levelup", { cardId });
      setCards((prev) =>
        prev.map((c) =>
          c.id === cardId ? { ...c, level: data.level, progress: 0 } : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kullanıcı Enerji: {energy}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
        {cards.map((card) => (
          <div key={card.id} className="border p-4 rounded shadow bg-gray">
            <h2 className="text-lg font-bold mb-2">
              {card.name} — Level {card.level}
            </h2>
            <CardProgress progress={card.progress} />
            <ProgressButton
              onClick={(amount) => handleProgress(card.id, amount)}
              disabled={card.progress >= 100}
              energy={energy}
                progress={card.progress} 
            />

            {card.progress >= 100 && card.level < 3 && (
              <LevelUpButton
                onLevelUp={() => handleLevelUp(card.id)}
                disabled={false}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

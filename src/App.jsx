import { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";

const cardValues = [
  "🍕",
  "🍔",
  "🍟",
  "🌭",
  "🍿",
  "🧂",
  "🍳",
  "🥐",
  "🍕",
  "🍔",
  "🍟",
  "🌭",
  "🍿",
  "🧂",
  "🍳",
  "🥐",
];

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[i], shuffled[j]];
    }
    return shuffled;
  };

  const intitialize = () => {
    const shuffled = shuffle(cardValues);
    console.log("original:", cardValues);
    console.log("shuffled:", JSON.stringify(shuffled));
    const final = shuffled.map((value, index) => ({
      id: `${Date.now()}-${index}`,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    console.log(
      "final:",
      final.map((c) => c.value),
    );
    setCards(final);
    setScore(0);
    setMoves(0);
    setFlipped([]);
    setMatched([]);
  };

  useEffect(() => {
    intitialize();
  }, []);
  const handleClick = (card) => {
    if (!card) return;

    if (card.isFlipped === true || card.isMatched === true) {
      return;
    }
    setMoves((prev) => prev + 1);
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      }
      return c;
    });

    setCards(newCards);

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const firstCard = cards.find((c) => c.id === newFlipped[0]);

      if (firstCard.value === card.value) {
        setMatched((prev) => [...prev, firstCard.id, card.id]);
        setScore((prev) => prev + 1);
        setFlipped([]);
        setCards((prev) =>
          prev.map((c) => {
            if (c.id === firstCard.id || c.id === card.id) {
              return { ...c, isMatched: true };
            } else {
              return c;
            }
          }),
        );
      } else {
        setTimeout(() => {
          const flippedCards = newCards.map((c) => {
            if (newFlipped.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });
          setCards(flippedCards);
        }, 1000);

        setFlipped([]);
      }
    }
  };

  return (
    <>
      <div className="app">
        <GameHeader score={score} moves={moves} onReset={intitialize} />

        <div className="cards-grid">
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={() => handleClick(card)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

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

  const intitialize = () => {
    //shuffle

    const final = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(final);
  };

  useEffect(() => {
    intitialize();
  }, []);
  const handleClick = (card) => {
    if (!card) return;
    if (card.isFlipped === true || card.isMatched === true) {
      return;
    }
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
        <GameHeader score={3} moves={10} />

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

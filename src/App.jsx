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

    if (flipped.length === 1) {
      const firstCard = cards[flipped[0]];

      if (firstCard.value === card.value) {
        alert("hi");
      }
      else{
        flip
      }
    }
  };

  return (
    <>
      <div className="app">
        <GameHeader score={3} moves={10} />

        <div className="cards-grid">
          {cards.map((card) => (
            <Card card={card} onClick={() => handleClick(card)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

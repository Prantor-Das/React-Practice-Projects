import { useEffect, useState, useCallback } from "react";

export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const initializeGame = useCallback(() => {
    const shuffled = shuffleArray(cardValues);

    const finalCards = shuffled.map((value, index) => ({ // giving more context to the card
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setIsLocked(false);
    setMoves(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
  }, [cardValues, shuffleArray]);

  useEffect(() => {
    Promise.resolve().then(() => {
      initializeGame();
    });
  }, [initializeGame]);

  const handleCardClick = (card) => {
    // Don't allow clicking if card is already flipped, matched
    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    ) {
      return;
    }

    // Update card flipped state
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped
    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];

      // Check for card are matched or not
      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 1);
          setCards((prev) =>
            prev.map((c) =>
              c.id === card.id || c.id === firstCard.id
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        // flip back card 1 and card 2 if no matched
        setTimeout(() => {
          const flippedBackCard = newCards.map((c) =>
            newFlippedCards.includes(c.id)
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(flippedBackCard);
          setIsLocked(false);
          setFlippedCards([]);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  };

  const isGameComplete = matchedCards.length === cardValues.length;

  return {
    cards,
    score,
    moves,
    isGameComplete,
    initializeGame,
    handleCardClick,
  };
};

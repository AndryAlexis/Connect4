// useSwitchPlayer.js
import { useCallback } from 'react';

export const useSwitchPlayer = (currentPlayer, setCurrentPlayer, players) => {
  return useCallback(() => {
    const nextPlayerIndex = currentPlayer.id + 1;
    const isLastPlayer = nextPlayerIndex >= players.length

    setCurrentPlayer(isLastPlayer ? players[0] : players[nextPlayerIndex])

  }, [currentPlayer, setCurrentPlayer, players])
}
import { useState } from 'react'

import Board from "../components/Board"
import PlayerIndicator from "../components/PlayerIndicator"

const App = () => {
  const COLUMNS = 9
  const ROWS = 7
  const MATCHES_FOR_WIN = 4

  const players = [
    {
      id : 0,
      name : 'Player 0',
      color : 'bg-amber-400',
      isTurn : false
    },
    {
      id : 1,
      name : 'Player 1',
      color : 'bg-rose-900',
      isTurn : true
    }
  ]

  const firstPlayer = players.filter(player => player.isTurn === true)[0]
  const [curPlayer, setCurPlayer] = useState(firstPlayer)

  const updatePlayerTurn = () => {
    const curPlayerPosition = curPlayer.id
    const nextPlayerPosition = curPlayerPosition + 1

    if (nextPlayerPosition >= players.length) {
      setCurPlayer(players[0])
      return
    }

    setCurPlayer(players[nextPlayerPosition])
  }

  return <main className="w-full h-screen grid place-items-center">
    <Board 
      amountColumns={COLUMNS} 
      amountRows={ROWS}
      curPlayer={curPlayer}
      amountPlayers={players.length}
      updatePlayerTurn={updatePlayerTurn}
      matchesForWin={MATCHES_FOR_WIN}
    />
    <div className="absolute right-4 top-4 grid gap-2">
      {
        players.map((player, i) => {
          return <PlayerIndicator 
            key={`${PlayerIndicator.displayName}${i}`} 
            ownPlayer={player}
            curPlayer={curPlayer}
          />
        })
      }
    </div>
  </main>
}

export default App
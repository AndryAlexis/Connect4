import { useState } from 'react'

import Board from "../components/Board"
import PlayerIndicator from "../components/PlayerIndicator"

const App = () => {
  const COLUMNS = 9
  const ROWS = 7
  const MATCHES_TO_WIN = 4

  const players = [
    {
      id : 0,
      name : 'Andry',
      color : '!bg-amber-400',
      isTurn : false
    },
    {
      id : 1,
      name : 'Andry Bot',
      color : '!bg-rose-900',
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

  return <div className='test-root flex h-screen w-full'>
    <main className="w-full flex justify-between items-center">
      <Board 
        amountColumns={COLUMNS} 
        amountRows={ROWS}
        curPlayer={curPlayer}
        amountPlayers={players.length}
        updatePlayerTurn={updatePlayerTurn}
        matchesToWin={MATCHES_TO_WIN}
      />
      {/* <div className="absolute right-4 top-4 grid gap-2">
        {
          players.map((player, i) => {
            return <PlayerIndicator 
              key={`${PlayerIndicator.displayName}${i}`} 
              ownPlayer={player}
              curPlayer={curPlayer}
            />
          })
        }
      </div> */}
      <input type="checkbox" name="aside-toggle" id="aside-toggle" className='absolute top-10 left-10'/>
      <aside className='h-full'>
        <div>
          <input type='text' className="" value={'Andry'}/>

        </div>
      </aside>
    </main>
  </div>
}

export default App
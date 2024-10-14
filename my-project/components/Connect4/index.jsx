import { useState, useRef } from 'react'
import Board from "../Board"
import Menu from '../Menu'

const updatePlayerTurn = (curPlayer, setCurPlayer, players) => {
  const nextPlayerPosition = curPlayer.id + 1

  if (nextPlayerPosition >= players.length) {
    setCurPlayer(players[0])
    return
  }

  setCurPlayer(players[nextPlayerPosition])
}

const showMenuChecker = ({current}) => current.checked = true
  
const App = () => {
  const GAME_SETTINGS = {
    COLUMNS: 9,
    ROWS: 7,
    MATCHES_TO_WIN: 4,
    PLAYERS: [
      { id: 0, name : 'Amber', color: 'amber', isTurn : true },
      { id: 1, name: 'Rose', color: 'rose', isTurn: false },
    ]
  }
  const {COLUMNS, ROWS, MATCHES_TO_WIN, PLAYERS} = GAME_SETTINGS

  const asideMenuRef = useRef(null)

  const [curPlayer, setCurPlayer] = useState(PLAYERS.find(player => player.isTurn === true))
  const [playerWhoWon, setPlayerWhoWon] = useState('Anybody')

  return <div className='test-root flex h-screen w-full'>
    <input
      hidden
      type="checkbox"
      name="aside-toggle"
      id="aside-toggle"
      ref={asideMenuRef}
      defaultChecked={false}
    />
    <main className="w-full flex justify-between items-center relative">
      <Board 
        amountColumns={COLUMNS} 
        amountRows={ROWS}
        curPlayer={curPlayer}
        amountPlayers={PLAYERS.length}
        updatePlayerTurn={() => updatePlayerTurn(curPlayer, setCurPlayer, PLAYERS)}
        matchesToWin={MATCHES_TO_WIN}
        showMenuChecker={() => showMenuChecker(asideMenuRef)}
        setPlayerWhoWon={setPlayerWhoWon}
      />
      <Menu playerWhoWon={playerWhoWon}/>
    </main>
  </div>
}

export default App
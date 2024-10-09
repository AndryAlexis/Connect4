import { useState, useRef } from 'react'
import Board from "../Board"

const updatePlayerTurn = (curPlayer, setCurPlayer, players) => {
  const nextPlayerPosition = curPlayer.id + 1

  if (nextPlayerPosition >= players.length) {
    setCurPlayer(players[0])
    return
  }

  setCurPlayer(players[nextPlayerPosition])
}

const toggleWinnerMenu = ({ current }) => current.checked = !current.checked
const showMenuChecker = ({current}) => current.checked = true
  
const App = () => {
  const GAME_SETTINGS = {
    COLUMNS: 9,
    ROWS: 7,
    MATCHES_TO_WIN: 4,
    PLAYERS: [
      { id: 0, name : 'Andry', color: 'amber', isTurn : true },
      { id: 1, name: 'Andry Bot', color: 'rose', isTurn: false },
    ]
  }
  const {COLUMNS, ROWS, MATCHES_TO_WIN, PLAYERS} = GAME_SETTINGS

  const asideMenuRef = useRef(null)
  const winnerMenuRef = useRef(null)

  const firstPlayer = PLAYERS.find(player => player.isTurn === true)
  const [curPlayer, setCurPlayer] = useState(firstPlayer)


  return <div className='test-root flex h-screen w-full'>
    <input
      hidden
      type="checkbox"
      name="aside-toggle"
      id="aside-toggle"
      className='absolute top-10 left-10 z-10'
      ref={asideMenuRef}
      defaultChecked={true}
    />
    <input
      hidden
      type="checkbox"
      name="winner-menu"
      id="winner-menu"
      className='absolute top-10 left-10'
      ref={winnerMenuRef}
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
        toggleWinnerMenu={() => toggleWinnerMenu(winnerMenuRef)}
      />
      <aside className='h-full relative overflow-hidden shadow-md bg-[#f0f0ff]'>
        <section className='m-4'>
          <h1 className='text-2xl font-bold border-b-[1px] pb-2'>
            Connect 4
          </h1>
          <form className="">

          </form>
        </section>

      </aside>
    </main>
  </div>
}

export default App
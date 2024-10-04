import { useState, useRef } from 'react'

import Board from "../Board"
// import PlayerIndicator from "../components/PlayerIndicator"

const App = () => {
  const COLUMNS = 9
  const ROWS = 7
  const MATCHES_TO_WIN = 4

  const players = [
    {
      id : 0,
      name : 'Andry',
      color: 'amber',
      isTurn : false
    },
    {
      id : 1,
      name : 'Andry Bot',
      color: 'rose',
      isTurn : true
    }
  ]
  const asideMenuRef = useRef(null)
  const winnerMenuRef = useRef(null)

  const firstPlayer = players.filter(player => player.isTurn === true)[0]
  const [curPlayer, setCurPlayer] = useState(firstPlayer)

  const showMenuChecker = () => asideMenuRef.current.checked = true
  const toggleWinnerMenu = () => winnerMenuRef.current.checked = !winnerMenuRef.current.checked

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
        amountPlayers={players.length}
        updatePlayerTurn={updatePlayerTurn}
        matchesToWin={MATCHES_TO_WIN}
        showMenuChecker={showMenuChecker}
        toggleWinnerMenu={toggleWinnerMenu}
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
      <aside className='h-full relative'>
        <label
          htmlFor={"aside-toggle"}
          className='absolute w-8 h-8 -left-8 top-4 grid place-content-center text-white bg-slate-400 cursor-pointer'
        >
          lol
        </label>
        <div>
          <div>
            <input type='text' value={'Andry'}/>
          </div>
          <div className='absolute inset-0 w-full h-full font-anton font-bold grid place-content-center gap-4'>
            <h2 className='text-3xl flex flex-wrap flex-col justify-center items-center'>
              <span className='text-5xl'>
                {curPlayer.name}
              </span>
              <span>
                Has Won!
              </span>
            </h2>
            <button onClick={toggleWinnerMenu} className="text-2xl bg-slate-400 border-2 border-black py-2 px-4">
              Start Again
            </button>
          </div>
        </div>

      </aside>
    </main>
  </div>
}

export default App
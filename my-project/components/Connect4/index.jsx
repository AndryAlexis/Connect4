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
        <section className='p-4 h-[inherit]'>
          <form className="flex flex-col justify-between h-full">
            <h1 className='text-2xl font-bold border-b-[1px] pb-2 mb-4'>
              Connect 4
            </h1>
            <div className="flex flex-col justify-between h-[inherit]">
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <div className='border-2 rounded-md p-2 bg-[#fef9f9] flex items-center outline-offset-2 outline-4 outline-[#FADADD] hover:outline'>
                    <input className='bg-transparent flex-1 w-full' type='text' placeholder='Player 1' />
                    <select className='bg-transparent cursor-pointer'>
                      <option value={'Rose'} selected>Rose</option>
                      <option value={'Amber'}>Amber</option>
                    </select>
                  </div>
                  <div className='border-2 rounded-md p-2 bg-[#fef9f9] flex items-center outline-offset-2 outline-4 outline-[#FADADD] hover:outline'>
                    <input className='bg-transparent flex-1 w-full' type='text' placeholder='Player 2' />
                    <select className='bg-transparent cursor-pointer'>
                      <option value={'Rose'}>Rose</option>
                      <option value={'Amber'} selected>Amber</option>
                    </select>
                  </div>
                </div>
                <button className="rounded-2xl w-full text-3xl font-bold bg-[#FFC0CB] hover:bg-[#ffb9c5] outline outline-offset-2 outline-4 outline-[#FADADD] hover:outline-[#f8d0d4] text-white">
                  +
                </button>
              </div>
              <input type="submit" value="START"/>
            </div>
          </form>
        </section>

      </aside>
    </main>
  </div>
}

export default App
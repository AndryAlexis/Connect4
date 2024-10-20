import { useState, useRef } from 'react'
import { useSwitchPlayer } from './useSwitchPlayer'
import { useOpenAsideMenu } from './useOpenAsideMenu'
import { gameSettings } from './gameSettings'
import Board from "../Board"
import Menu from '../Menu'

// App.jsx
const App = _ => {
  const { COLUMNS, ROWS, MATCHES_TO_WIN, PLAYERS } = gameSettings

  const asideMenuRef = useRef(null)
  const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.find(player => player.isTurn))
  // const [winner, setWinner] = useState('Nobody')
  const [winner, setWinner] = useState({
    name : 'Nobody',
    state : false
  })
  const boardRef = useRef(null) // Reference to the board element

  const switchPlayer = useSwitchPlayer(currentPlayer, setCurrentPlayer, PLAYERS)
  const openMenu = useOpenAsideMenu(asideMenuRef)

  const declareWinnerState = state => setWinner(prev => ({
    ...prev, state
  }))

  const declareWinnerName = name => setWinner(prev => ({
    ...prev, name
  }))

  const [columnStates, setColumnStates] = useState(
    Array(COLUMNS).fill(null).map(_ => ({
        rowPos: ROWS - 1
    }))
  )

  const updateColumnStateByPosition = (newValue, position) => {
    setColumnStates(prev => {
      const newArray = [...prev]
      newArray[position] = {rowPos: newValue}
      return newArray
    })
  }
  return (
    <div className="test-root flex h-screen w-full">
      <input
        hidden
        type="checkbox"
        name="aside-toggle"
        id="aside-toggle"
        ref={asideMenuRef}
        checked={winner.state}
        readOnly
      />

      <main className="w-full flex justify-between items-center relative">
        <Board
          amountColumns={COLUMNS}
          amountRows={ROWS}
          currentPlayer={currentPlayer}
          totalPlayers={PLAYERS.length}
          switchToNextPlayer={switchPlayer}
          matchesToWin={MATCHES_TO_WIN}
          openAsideMenu={openMenu}
          declareWinnerName={declareWinnerName}
          declareWinnerState={declareWinnerState}
          winnerState={winner.state}
          updateColumnStateByPosition={updateColumnStateByPosition}
          columnStates={columnStates}
          ref={boardRef}
        />

        <Menu
          winnerName={winner.name}
          boardRef={boardRef}
          players={PLAYERS}
          columnsLength={COLUMNS}
          rowsLength={ROWS}
          declareWinnerState={declareWinnerState}
          setColumnStates={setColumnStates}
        />
      </main>
    </div>
  )
}
export default App
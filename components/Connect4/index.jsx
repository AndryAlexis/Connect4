import { useState, useRef } from 'react'
import { useSwitchPlayer } from './useSwitchPlayer'
import { useOpenAsideMenu } from './useOpenAsideMenu'
import { gameSettings } from './gameSettings'
import { useWinnerState } from '../../src/hooks/useWinner.state'
import { useColumnState } from '../../src/hooks/useColumn.state'
import { createBoardProps, createMenuProps } from './props'
import Board from "../Board"
import Menu from '../Menu'

const Connect4 = () => {
  // ═══════════════════════════════════════════
  // Game Configuration
  // ═══════════════════════════════════════════
  const { COLUMNS, ROWS, MATCHES_TO_WIN, PLAYERS } = gameSettings

  // ═══════════════════════════════════════════
  // Refs & State
  // ═══════════════════════════════════════════
  const asideMenuRef = useRef(null)
  const boardRef = useRef(null)
  const [currentPlayer, setCurrentPlayer] = useState(
    PLAYERS.find(player => player.isTurn)
  )

  // ═══════════════════════════════════════════
  // Custom Hooks
  // ═══════════════════════════════════════════
  const { winner, declareWinnerState, declareWinnerName } = useWinnerState()
  const [ columnStates, setColumnStates, resetColumnStates ] = useColumnState()
  const switchPlayer = useSwitchPlayer(currentPlayer, setCurrentPlayer, PLAYERS)
  const openMenu = useOpenAsideMenu(asideMenuRef)

  const boardProps = createBoardProps({
    COLUMNS,
    ROWS,
    MATCHES_TO_WIN,
    currentPlayer,
    PLAYERS,
    switchPlayer,
    openMenu,
    declareWinnerName,
    declareWinnerState,
    winner,
    setColumnStates,
    columnStates
  });

  const menuProps = createMenuProps({
    winner,
    boardRef,
    PLAYERS,
    declareWinnerState,
    resetColumnStates
  });

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
        <Board {...boardProps} ref={boardRef} />
        <Menu {...menuProps} />
      </main>
    </div>
  )
}

export default Connect4
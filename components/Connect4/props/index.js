export const createBoardProps = ({
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
}) => ({
  amountColumns: COLUMNS,
  amountRows: ROWS,
  currentPlayer,
  totalPlayers: PLAYERS.length,
  switchToNextPlayer: switchPlayer,
  matchesToWin: MATCHES_TO_WIN,
  openAsideMenu: openMenu,
  declareWinnerName,
  declareWinnerState,
  winnerState: winner.state,
  setColumnStates,
  columnStates
});

export const createMenuProps = ({
  winner,
  boardRef,
  PLAYERS,
  declareWinnerState,
  resetColumnStates
}) => ({
  winnerName: winner.name,
  boardRef,
  players: PLAYERS,
  declareWinnerState,
  resetColumnStates
}); 
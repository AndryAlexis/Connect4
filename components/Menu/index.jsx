import PropTypes from 'prop-types'

/**
 * Removes the glare effect from a winning token
 * @param {HTMLElement} row - The row element containing the token
 */
const removeTokenGlare = row => {
  const GLARE = 'glare'

  if (row.classList.contains(GLARE)) {
    row.classList.remove(GLARE)
  }
}

/**
 * Removes the player ID data attribute from a token
 * @param {HTMLElement} row - The row element containing the token
 */
const removePlayerId = row => {
  const DATA_PLAYER_ID = 'data-player-id'

  if (row.hasAttribute(DATA_PLAYER_ID)) {
    row.removeAttribute(DATA_PLAYER_ID)
  }
}

/**
 * Removes player color classes from a token
 * @param {HTMLElement} row - The row element containing the token
 * @param {Array} players - Array of player objects containing color properties
 */
const removeToken = (row, players) => {
  players.forEach(({color}) => {
    if (row.classList.contains(color)) {
      row.classList.remove(color)
    }
  })
}

/**
 * Resets the game board to initial state
 * - Removes all tokens and their effects
 * - Resets column states
 * - Clears winner state
 * 
 * @param {React.RefObject} board - Reference to the game board element
 * @param {Array} players - Array of player objects
 * @param {Function} declareWinnerState - Function to update winner state
 * @param {Function} resetColumnStates - Function to reset column states
 */
const rebootGame = (
  board, 
  players, 
  declareWinnerState,
  resetColumnStates
) => {
  const {current} = board
  const {children: columns} = current.children[0]

  Array.from(columns).forEach(({children: rows}) => {
    Array.from(rows).forEach(row => {
      removeTokenGlare(row)
      removePlayerId(row)
      removeToken(row, players)
    })
  })

  resetColumnStates()
  declareWinnerState(false)
}

/**
 * Menu Component
 * Displays winner announcement and restart game button
 * 
 * @param {Object} props
 * @param {string} props.winnerName - Name of the winning player
 * @param {React.RefObject} props.boardRef - Reference to game board
 * @param {Array} props.players - Array of player objects
 * @param {Function} props.declareWinnerState - Function to update winner state
 * @param {Function} props.resetColumnStates - Function to reset column states
 */
const Menu = ({
  winnerName, 
  boardRef, 
  players,
  declareWinnerState,
  resetColumnStates
}) => {
  return <>
      <aside className='h-full relative overflow-hidden shadow-md bg-[#f0f0ff]'>
      <section className='p-4 h-[inherit] grid place-content-center gap-6'>
        <h2 className="text-3xl font-bold text-center">
          {winnerName} has won!
        </h2>
        <button
          onClick={() => rebootGame(boardRef, players, declareWinnerState, resetColumnStates)}
          className='border-2 outline outline-6 outline-[#FF91A4] hover:outline-offset-0 transition-all outline-offset-4 py-2 px-4 text-2xl bg-[#FF91A4] font-bold text-white rounded-lg cursor-pointer'
        >
          Play Again
        </button>
      </section>
    </aside>
  </>
}

// PropTypes validation
Menu.propTypes = {
  winnerName: PropTypes.string.isRequired,
  boardRef: PropTypes.object.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired
  })).isRequired,
  declareWinnerState: PropTypes.func.isRequired,
  resetColumnStates: PropTypes.func.isRequired
}

export default Menu
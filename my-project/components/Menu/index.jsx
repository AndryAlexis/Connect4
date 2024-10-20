import PropTypes from 'prop-types' // Importing PropTypes for validation

const removeTokenGlare = row => {
  const GLARE = 'glare'

  if (row.classList.contains(GLARE)) {
    row.classList.remove(GLARE)
  }
}

const removePlayerId = row => {
  const DATA_PLAYER_ID = 'data-player-id'

  if (row.hasAttribute(DATA_PLAYER_ID)) {
    row.removeAttribute(DATA_PLAYER_ID)
  }
}

const removeToken = (row, players) => {
  players.forEach(({color}) => {
    if (row.classList.contains(color)) {
      row.classList.remove(color)
    }
  })
}

const rebootColumnStates = (columns, rows, setColumnStates) => {
  setColumnStates(
    Array(columns).fill(null).map(_ => ({
      rowPos: rows - 1
    }))
  )

  const test =     Array(columns).fill(null).map(_ => ({
    rowPos: rows - 1
  }))
}

const rebootGame = (
  board, 
  players, 
  declareWinnerState,
  columnsLength,
  rowsLength,
  setColumnStates
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

  rebootColumnStates(columnsLength, rowsLength, setColumnStates)
  declareWinnerState(false)
}

const Menu = ({
  winnerName, 
  boardRef, 
  players,
  columnsLength,
  rowsLength,
  declareWinnerState,
  setColumnStates
}) => {
  return <>
      <aside className='h-full relative overflow-hidden shadow-md bg-[#f0f0ff]'>
      <section className='p-4 h-[inherit] grid place-content-center gap-6'>
        <h2 className="text-3xl font-bold text-center">
          {winnerName} has won!
        </h2>
        <button
          onClick={() => rebootGame(boardRef, players, declareWinnerState, columnsLength, rowsLength, setColumnStates)}
          className='border-2 outline outline-6 outline-[#FF91A4] hover:outline-offset-0 transition-all outline-offset-4 py-2 px-4 text-2xl bg-[#FF91A4] font-bold text-white rounded-lg cursor-pointer'
        >
          Play Again
        </button>
      </section>
    </aside>
  </>
}

Menu.propTypes = {
  winnerName: PropTypes.string.isRequired
}

export default Menu
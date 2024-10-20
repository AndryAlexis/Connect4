import { useState, useRef } from 'react'
import PropTypes from 'prop-types' // Importing PropTypes for validation
import Row from '../Row'

const Column = ({
    position,
    amountRows,
    currentPlayer,
    switchToNextPlayer,
    checkForWinner,
    incrementTotalTokensPlaced,
    playerAttribute,
    winnerState,
    updateColumnState,
    columnState
}) => {
    const columnRef = useRef(undefined)
    // const [rowPos, setRowPos] = useState(amountRows - 1)

    const rows = Array(amountRows).fill(null)

    const putTokenOnBoard = () => {
        if (columnState.rowPos < 0) return

        const lastChild = columnRef.current.children[columnState.rowPos]
        lastChild.classList.add(`${currentPlayer.color}`)
        lastChild.setAttribute(`${playerAttribute}`, currentPlayer.id)
        
        incrementTotalTokensPlaced()
    }

    const handleClick = () => {
        //If someone has won, the game has finished
        if (winnerState)
            return
        putTokenOnBoard()
        switchToNextPlayer()
        checkForWinner(position, columnState.rowPos)
        // setRowPos(rowPos - 1)
        updateColumnState(columnState.rowPos - 1)
    }

    return (
        <div
            className="test-column grid gap-4 cursor-pointer"
            onClick={handleClick}
            ref={columnRef}
        >
            {
                rows.map((_, i) => (
                    <Row key={`${Row.displayName}${i}`}></Row>
                ))
            }
        </div>
    )
}

Column.displayName = 'Column'

// Defining the expected prop types for validation
Column.propTypes = {
    position: PropTypes.number.isRequired,                  // Must be a number, required
    amountRows: PropTypes.number.isRequired,                // Must be a number, required
    currentPlayer: PropTypes.shape({                            // Must be an object with specific shape
        id: PropTypes.number.isRequired,                    // Player ID should be a required number
        color: PropTypes.string.isRequired,               // Player color should be a required string
    }).isRequired,
    switchToNextPlayer: PropTypes.func.isRequired,            // Must be a function, required
    checkForWinner: PropTypes.func.isRequired,                 // Must be a function, required
    incrementTotalTokensPlaced: PropTypes.func.isRequired, // Must be a function, required
    playerAttribute: PropTypes.string.isRequired,            // Must be a string, required
    winnerState: PropTypes.bool.isRequired,
    updateColumnState: PropTypes.func.isRequired,
}

// Exporting the component as default
export default Column

import { useState, useRef } from 'react'
import PropTypes from 'prop-types' // Importing PropTypes for validation
import Row from '../Row'

const Column = ({
    position,
    amountRows,
    curPlayer,
    updatePlayerTurn,
    checkWinner,
    updateTotalAmountTokensPlaced,
    playerAttribute,
    hasWon
}) => {
    const columnRef = useRef(undefined)
    const [rowPos, setRowPos] = useState(amountRows - 1)

    const rows = Array(amountRows).fill(null)

    const putTokenOnBoard = () => {
        if (rowPos < 0) return

        const lastChild = columnRef.current.children[rowPos]
        lastChild.classList.add(`${curPlayer.color}`)
        lastChild.setAttribute(`${playerAttribute}`, curPlayer.id)
        
        updateTotalAmountTokensPlaced()
    }

    const handleClick = (playerAttribute) => {
        //If someone has won, the game has finished
        if (hasWon)
            return
        putTokenOnBoard()
        updatePlayerTurn()
        checkWinner(position, rowPos, playerAttribute)
        setRowPos(rowPos - 1)
    }

    return (
        <div
            className="test-column grid gap-4 cursor-pointer"
            onClick={() => handleClick(playerAttribute)}
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
    curPlayer: PropTypes.shape({                            // Must be an object with specific shape
        id: PropTypes.number.isRequired,                    // Player ID should be a required number
        color: PropTypes.string.isRequired,               // Player color should be a required string
    }).isRequired,
    updatePlayerTurn: PropTypes.func.isRequired,            // Must be a function, required
    checkWinner: PropTypes.func.isRequired,                 // Must be a function, required
    updateTotalAmountTokensPlaced: PropTypes.func.isRequired, // Must be a function, required
    playerAttribute: PropTypes.string.isRequired,            // Must be a string, required
    hasWon: PropTypes.bool.isRequired
}

// Exporting the component as default
export default Column
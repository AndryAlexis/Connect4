import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Row from '../Row'

/**
 * Column component represents a single column in the Connect 4 game board
 * Handles token placement, click events, and win condition checks
 */
const Column = ({
    position,          // Column position in the grid (0-based index)
    amountRows,        // Number of rows in the column
    currentPlayer,     // Current player object with id and color
    switchToNextPlayer, // Function to switch turns between players
    checkForWinner,    // Function to check if current move created a win
    incrementTotalTokensPlaced, // Function to track total moves made
    playerAttribute,   // Data attribute name for tracking player ownership
    winnerState,       // Boolean indicating if game has been won
    setColumnStates,   // Function to update column state
    columnState        // Current state of this column (includes rowPos)
}) => {
    // Reference to the column DOM element for direct manipulation
    const columnRef = useRef(undefined)

    // Create array of null values representing empty row slots
    const rows = Array(amountRows).fill(null)

    /**
     * Places a token in the current column at the appropriate row position
     * Adds player's color class and sets data attribute for ownership
     */
    const putTokenOnBoard = () => {
        if (columnState.rowPos < 0) return // Column is full

        const lastChild = columnRef.current.children[columnState.rowPos]
        lastChild.classList.add(`${currentPlayer.color}`)
        lastChild.setAttribute(`${playerAttribute}`, currentPlayer.id)
        
        incrementTotalTokensPlaced()
    }

    /**
     * Handles column click events
     * Places token, switches player turn, and checks for win condition
     */
    const handleClick = () => {
        if (winnerState) return // Prevent moves after game is won
        
        putTokenOnBoard()
        switchToNextPlayer()
        
        if (columnState.rowPos < 1) return // No need to check win if column is now full
        
        checkForWinner(position, columnState.rowPos)
        setColumnStates(columnState.rowPos - 1) // Update available row position
    }

    return (
        <div
            className="
                column
                hover:[--_color:white]
                animate-[border-dance_17s_linear_infinite]
                grid
                gap-4
                cursor-pointer
                p-[10px]
            "
            onClick={handleClick}
            ref={columnRef}
        >
            {/* Render empty row slots */}
            {
                rows.map((_, i) => (
                    <Row key={`${Row.displayName}${i}`}></Row>
                ))
            }
        </div>
    )
}

Column.displayName = 'Column'

// PropTypes for type checking and documentation
Column.propTypes = {
    position: PropTypes.number.isRequired,                  // Column index
    amountRows: PropTypes.number.isRequired,                // Number of rows
    currentPlayer: PropTypes.shape({                        // Current player info
        id: PropTypes.number.isRequired,                    // Player identifier
        color: PropTypes.string.isRequired,                 // Player token color
    }).isRequired,
    switchToNextPlayer: PropTypes.func.isRequired,          // Turn management
    checkForWinner: PropTypes.func.isRequired,              // Win condition checker
    incrementTotalTokensPlaced: PropTypes.func.isRequired,  // Move counter
    playerAttribute: PropTypes.string.isRequired,           // DOM data attribute
    winnerState: PropTypes.bool.isRequired,                 // Game win state
    setColumnStates: PropTypes.func.isRequired,             // Column state updater
    columnState: PropTypes.object.isRequired                // Current column state
}

export default Column

import { useRef, useState } from 'react'
import PropTypes from 'prop-types' // Importing PropTypes for validation
import Column from './Column'
import BoardLine from './BoardChecker.jsx'

const Board = ({
    amountColumns,
    amountRows,
    curPlayer,
    amountPlayers,
    updatePlayerTurn,
    matchesToWin
}) => {
    const PLAYER_ATTRIBUTE = 'data-player-id' // Custom attribute to track which player placed a token

    const boardRef = useRef(undefined) // Ref to reference the entire board
    const [totalAmountOfTokensPlaced, setTotalAmountTokensPlaced] = useState(0) // Tracks the total number of tokens placed on the board

    // Create an array representing columns of the board, filled with undefined initially
    const columns = Array(amountColumns).fill(undefined)

    // Updates the total number of tokens placed by incrementing the state
    const updateTotalAmountTokensPlaced = () => setTotalAmountTokensPlaced((prev) => prev + 1)

    // Function to check if there is a winner after a token is placed
    const checkWinner = (clickedColumnPos, lastSelectedRowPos) => {
        const columns = boardRef.current.children[0].children
        const clickedColumn = columns[clickedColumnPos]
        const minTokensToWin = amountPlayers * matchesToWin - 2

        // Ensure there are enough tokens on the board before checking for a winner
        const thereAreNotMinOfTokensToWin = totalAmountOfTokensPlaced < minTokensToWin

        if (thereAreNotMinOfTokensToWin)
            return
        
        const rowsOfClickedColumn = clickedColumn.children
        const lastPlayerWhoPutToken = rowsOfClickedColumn[lastSelectedRowPos].getAttribute(PLAYER_ATTRIBUTE)

        // Create a new BoardLine instance to check for winning matches
        const boardLine = new BoardLine(PLAYER_ATTRIBUTE, matchesToWin)
        
        // Check if the current move creates a line with enough matching tokens
        const tokensWhichMatched = boardLine.checkForNumberOfMatches(
            columns,
            clickedColumnPos,
            lastSelectedRowPos,
            lastPlayerWhoPutToken,
            amountRows
        )

        // If the number of matched tokens equals the required matches to win, declare a winner
        if (tokensWhichMatched.length !== matchesToWin) {
            return
        }

        someoneHasWon(curPlayer.name, tokensWhichMatched)
    }

    const someoneHasWon = (playerName, tokensWhichMatched) => {
        console.log(playerName)
        console.log(tokensWhichMatched)
    }

    return (
        <div className='test-parent-board'>
            <div
                className='test-board'
                ref={boardRef} // Attach the ref to the article element (board container)
            >
                <div
                    className='grid gap-4 rounded-lg p-6'     
                    style={{gridTemplateColumns: `repeat(${amountColumns}, minmax(auto, 1fr))`}} // Create a grid layout for the columns
                >
                    {
                        // Render the columns of the board dynamically based on the amountColumns
                        columns.map((_, i) => (
                            <Column 
                                key={`${Column.displayName}${i}`} // Use a unique key for each column
                                position={i} // Pass the column position
                                amountRows={amountRows} // Pass the number of rows
                                curPlayer={curPlayer} // Pass the current player object
                                updatePlayerTurn={updatePlayerTurn} // Pass the function to update player turns
                                checkWinner={checkWinner} // Pass the function to check for a winner
                                updateTotalAmountTokensPlaced={updateTotalAmountTokensPlaced} // Pass the function to update token count
                                playerAttribute={PLAYER_ATTRIBUTE} // Pass the custom player attribute
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

// Defining the expected prop types for validation
Board.propTypes = {
    amountColumns: PropTypes.number.isRequired,   // Must be a number, required
    amountRows: PropTypes.number.isRequired,      // Must be a number, required
    curPlayer: PropTypes.shape({
        name: PropTypes.string.isRequired,        // curPlayer must be an object with a name property (string, required)
    }).isRequired,
    amountPlayers: PropTypes.number.isRequired,   // Must be a number, required
    updatePlayerTurn: PropTypes.func.isRequired,  // Must be a function, required
    matchesToWin: PropTypes.number.isRequired     // Must be a number, required
}

// Exporting the component as default
export default Board

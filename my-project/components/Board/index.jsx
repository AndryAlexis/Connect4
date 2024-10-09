import { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types' // Importing PropTypes for validation
import Column from './Column'
import BoardLine from './BoardChecker.jsx'
import JSConfetti from 'js-confetti'
import Tilt from 'react-vanilla-tilt'

const Board = ({
    amountColumns,
    amountRows,
    curPlayer,
    amountPlayers,
    updatePlayerTurn,
    matchesToWin,
    showMenuChecker,
    toggleWinnerMenu
}) => {
    const jsConfetti = useRef(null)

    useEffect(() => {
        jsConfetti.current = new JSConfetti()
    }, [])

    const PLAYER_ATTRIBUTE = 'data-player-id' // Custom attribute to track which player placed a token

    const hasWon = useRef(false)
    const boardRef = useRef(undefined) // Ref to reference the entire board
    const [totalAmountOfTokensPlaced, setTotalAmountTokensPlaced] = useState(0) // Tracks the total number of tokens placed on the board

    const toggleHasWon = () => hasWon.current = !hasWon.current
    // Create an array representing columns of the board, filled with undefined initially
    const columns = Array(amountColumns).fill(undefined)

    // Updates the total number of tokens placed by incrementing the state
    const updateTotalAmountTokensPlaced = () => setTotalAmountTokensPlaced(prev => prev + 1)

    // Function to check if there is a winner after a token is placed
    const checkWinner = (clickedColumnPos, lastSelectedRowPos, playerAttribute) => {
        const columns = boardRef.current.children[0].children
        const clickedColumn = columns[clickedColumnPos]
        const minTokensToWin = amountPlayers * matchesToWin - 2

        // Ensure there are enough tokens on the board before checking for a winner
        const thereAreNotMinOfTokensToWin = totalAmountOfTokensPlaced < minTokensToWin

        if (thereAreNotMinOfTokensToWin)
            return
        
        const rowsOfClickedColumn = clickedColumn.children
        const lastPlayerWhoPutToken = rowsOfClickedColumn[lastSelectedRowPos].getAttribute(playerAttribute)

        // Create a new BoardLine instance to check for winning matches
        const boardLine = new BoardLine(playerAttribute, matchesToWin)
        
        // Check if the current move creates a line with enough matching tokens
        const tokensWhichMatched = boardLine.checkForNumberOfMatches(
            columns,
            clickedColumnPos,
            lastSelectedRowPos,
            lastPlayerWhoPutToken,
            amountRows
        )

        // If the number of matched tokens equals the required matches to win, declare a winner
        if (tokensWhichMatched.length !== matchesToWin)
            return

        someoneHasWon(curPlayer.name, tokensWhichMatched)
    }

    const showConfetti = async () => {
        // async/await
        await jsConfetti.current.addConfetti()
        console.log('Confetti animation completed!')
        jsConfetti.current.clearCanvas()
    }

    const someoneHasWon = (playerName, tokensWhichMatched = []) => {
        toggleHasWon()
        showMenuChecker()
        toggleWinnerMenu()

        console.log(tokensWhichMatched)

        tokensWhichMatched.forEach(token => {
            token.classList.add('glare')
        })

        showConfetti()
    }

    return <>
        <div className='test-parent-board relative testing-bg'>
            <Tilt options={{ scale: 1 }} >
                <div
                    className='test-board'
                    ref={boardRef} // Attach the ref to the article element (board container)
                >
                    <div
                        className='grid rounded-lg p-6'     
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
                                    hasWon={hasWon.current}
                                />
                            ))
                        }
                    </div>
                </div>
            </Tilt>
            <label
                htmlFor={"aside-toggle"}
                className='absolute w-8 h-8 bg-[#f0f0ff] z-10 shadow-md top-[8px] grid place-content-center cursor-pointer left-[calc(100%-32px-8px)] rounded-full'
            >
                V
            </label>
        </div>
    </> 
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
    matchesToWin: PropTypes.number.isRequired,     // Must be a number, required
    showMenuChecker: PropTypes.func.isRequired,
    toggleWinnerMenu: PropTypes.func.isRequired
}

// Exporting the component as default
export default Board

// Import necessary dependencies
import { useRef, useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Column from './Column'
import BoardLine from './BoardChecker.jsx'
import JSConfetti from 'js-confetti' // For victory celebration effects
import Tilt from 'react-vanilla-tilt' // For tilt animation effect

/**
 * Board component represents the main Connect 4 game board
 * Handles game state, win conditions, and rendering of columns
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.amountColumns - Number of columns in the game board
 * @param {number} props.amountRows - Number of rows in the game board
 * @param {Object} props.currentPlayer - Current player's info (id, name, color)
 * @param {number} props.totalPlayers - Total number of players in the game
 * @param {Function} props.switchToNextPlayer - Function to switch turns between players
 * @param {number} props.matchesToWin - Number of tokens needed in a line to win
 * @param {Function} props.openAsideMenu - Function to open the victory menu
 * @param {Function} props.declareWinnerName - Function to set the winner's name
 * @param {Function} props.declareWinnerState - Function to update game win state
 * @param {boolean} props.winnerState - Current game win state
 * @param {Function} props.setColumnStates - Function to update column states
 * @param {Array} props.columnStates - Array tracking token positions in each column
 * @param {React.Ref} boardRef - Ref forwarded from parent for DOM access
 */
const Board = forwardRef(({
    amountColumns,
    amountRows,
    currentPlayer,
    totalPlayers,
    switchToNextPlayer,
    matchesToWin,
    openAsideMenu,
    declareWinnerName,
    declareWinnerState,
    winnerState,
    setColumnStates,
    columnStates
}, boardRef) => {
    // Reference for confetti effect instance
    const jsConfetti = useRef(null)

    // Initialize confetti effect on component mount
    useEffect(() => {
        jsConfetti.current = new JSConfetti()
    }, [])

    // Custom data attribute to track which player owns each token
    const PLAYER_ATTRIBUTE = 'data-player-id'
    
    // Track total moves to optimize win condition checking
    const [totalTokensPlaced, setTotalTokensPlaced] = useState(0)

    /**
     * Increments the count of tokens placed on the board
     * Used to determine when win checking should begin
     */
    const incrementTotalTokensPlaced = () => {
        setTotalTokensPlaced(prev => prev + 1)
    }

    /**
     * Checks if the last move resulted in a win condition
     * Only runs full check after minimum required tokens are placed
     * 
     * @param {number} clickedColumnPos - Index of column where token was placed
     * @param {number} lastSelectedRowPos - Row position of placed token
     */
    const checkForWinner = (clickedColumnPos, lastSelectedRowPos) => {
        const columns = boardRef.current.children[0].children
        const clickedColumn = columns[clickedColumnPos]
        
        // Skip win check if minimum tokens for a win haven't been placed
        const minTokensToWin = totalPlayers * matchesToWin - 2
        if (totalTokensPlaced < minTokensToWin) return

        const playerAttribute = clickedColumn.children[lastSelectedRowPos].getAttribute(PLAYER_ATTRIBUTE)
        const boardLine = new BoardLine(PLAYER_ATTRIBUTE, matchesToWin)
        
        // Check all possible winning directions from last placed token
        const matchedTokens = boardLine.checkForNumberOfMatches(
            columns,
            clickedColumnPos,
            lastSelectedRowPos,
            playerAttribute,
            amountRows
        )

        if (matchedTokens.length === matchesToWin) {
            declareVictory(currentPlayer.name, matchedTokens)
        }
    }

    /**
     * Handles victory state and triggers win animations
     * 
     * @param {string} playerName - Name of winning player
     * @param {Array} matchedTokens - Array of DOM elements forming winning line
     */
    const declareVictory = (playerName, matchedTokens) => {
        declareWinnerState(true)
        declareWinnerName(playerName)
        openAsideMenu()

        // Add visual effect to winning tokens
        matchedTokens.forEach(token => token.classList.add('glare'))
        displayConfetti()
    }

    /**
     * Displays victory confetti animation and cleans up after
     */
    const displayConfetti = async () => {
        await jsConfetti.current.addConfetti()
        jsConfetti.current.clearCanvas()
    }

    return (
        <div className='
            h-full
            flex
            justify-center
            items-center
            p-2.5
            flex-[999]
            relative
            bg-[#e5e5f7]
            [background-size:10px_10px]
            [background-image:radial-gradient(#c9c9c9_.8px,#e5e5f7_.8px)]
        '>
            {/* Wrap board in Tilt component for 3D hover effect */}
            <Tilt options={{ scale: 1 }}>
                {/* Main board container with gradient background */}
                <div className='
                    border-[3px]
                    border-solid
                    border-[rgb(88,169,255)]
                    bg-[rgb(105,198,251)]
                    bg-gradient-to-br
                    from-[rgb(78,190,255)]
                    via-[rgb(27,165,255)]
                    to-[rgb(0,124,255)]
                    relative
                    p-5
                    rounded-[10px]
                ' ref={boardRef}>
                    {/* Grid container for game columns */}
                    <div
                        className='
                            grid
                            rounded-lg
                            p-6
                            border-2
                            border-solid
                            border-[rgb(69,154,245)]
                            [box-shadow:inset_0_0_10px_rgba(0,21,111,0.5),inset_10px_0_20px_rgba(0,20,111,0.312)]
                        '
                        style={{ gridTemplateColumns: `repeat(${amountColumns}, minmax(auto, 1fr))` }}
                    >
                        {/* Generate game columns */}
                        {Array(amountColumns).fill(undefined).map((_, i) => (
                            <Column
                                key={`${Column.displayName}-${i}`}
                                position={i}
                                amountRows={amountRows}
                                currentPlayer={currentPlayer}
                                switchToNextPlayer={switchToNextPlayer}
                                checkForWinner={checkForWinner}
                                incrementTotalTokensPlaced={incrementTotalTokensPlaced}
                                playerAttribute={PLAYER_ATTRIBUTE}
                                winnerState={winnerState}
                                setColumnStates={(newValue) => setColumnStates(newValue, i)}
                                columnState={columnStates[i]}
                            />
                        ))}
                    </div>
                </div>
            </Tilt>
        </div>
    )
})

// PropTypes for type checking and documentation
Board.propTypes = {
    amountColumns: PropTypes.number.isRequired, // Number of columns in the game board
    amountRows: PropTypes.number.isRequired, // Number of rows in the game board
    currentPlayer: PropTypes.shape({
        name: PropTypes.string.isRequired, // Current player's name
    }).isRequired,
    totalPlayers: PropTypes.number.isRequired, // Total number of players in the game
    switchToNextPlayer: PropTypes.func.isRequired, // Function to switch turns
    matchesToWin: PropTypes.number.isRequired, // Number of tokens needed in a line to win
    openAsideMenu: PropTypes.func.isRequired, // Function to open the sidebar menu
    declareWinnerName: PropTypes.func.isRequired, // Function to set winner's name
    declareWinnerState: PropTypes.func.isRequired, // Function to set game's win state
    winnerState: PropTypes.bool.isRequired, // Current game win state
    setColumnStates: PropTypes.func.isRequired, // Function to update column states
    columnStates: PropTypes.array.isRequired // Array of column states
}

export default Board

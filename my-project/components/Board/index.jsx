import { useRef, useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Column from './Column'
import BoardLine from './BoardChecker.jsx'
import JSConfetti from 'js-confetti'
import Tilt from 'react-vanilla-tilt'

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
    updateColumnStateByPosition,
    columnStates
}, boardRef) => {
    // Initialize jsConfetti instance
    const jsConfetti = useRef(null)

    useEffect(() => {
        jsConfetti.current = new JSConfetti()
    }, [])

    // Constants and State
    const PLAYER_ATTRIBUTE = 'data-player-id' // Custom attribute to track player ID
    const [totalTokensPlaced, setTotalTokensPlaced] = useState(0) // Track placed tokens

    const incrementTotalTokensPlaced = () => {
        setTotalTokensPlaced(prev => prev + 1)
    }

    const checkForWinner = (clickedColumnPos, lastSelectedRowPos) => {
        const columns = boardRef.current.children[0].children
        const clickedColumn = columns[clickedColumnPos]
        const minTokensToWin = totalPlayers * matchesToWin - 2

        if (totalTokensPlaced < minTokensToWin) return

        const playerAttribute = clickedColumn.children[lastSelectedRowPos].getAttribute(PLAYER_ATTRIBUTE)
        const boardLine = new BoardLine(PLAYER_ATTRIBUTE, matchesToWin)
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

    const declareVictory = (playerName, matchedTokens) => {
        declareWinnerState(true)
        declareWinnerName(playerName)
        openAsideMenu()

        matchedTokens.forEach(token => token.classList.add('glare'))
        displayConfetti()
    }

    const displayConfetti = async () => {
        await jsConfetti.current.addConfetti()
        jsConfetti.current.clearCanvas()
    }

    // JSX for rendering the board
    return (
        <div className='test-parent-board relative testing-bg'>
            <Tilt options={{ scale: 1 }}>
                <div className='test-board' ref={boardRef}>
                    <div
                        className='grid rounded-lg p-6'
                        style={{ gridTemplateColumns: `repeat(${amountColumns}, minmax(auto, 1fr))` }}
                    >
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
                                updateColumnState={(newValue) => updateColumnStateByPosition(newValue, i)}
                                columnState={columnStates[i]}
                            />
                        ))}
                    </div>
                </div>
            </Tilt>
        </div>
    )
})

// Defining PropTypes for validation
Board.propTypes = {
    amountColumns: PropTypes.number.isRequired,
    amountRows: PropTypes.number.isRequired,
    currentPlayer: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    totalPlayers: PropTypes.number.isRequired,
    switchToNextPlayer: PropTypes.func.isRequired,
    matchesToWin: PropTypes.number.isRequired,
    openAsideMenu: PropTypes.func.isRequired,
    declareWinnerName : PropTypes.func.isRequired,
    declareWinnerState : PropTypes.func.isRequired,
    winnerState : PropTypes.bool.isRequired,
    updateColumnStateByPosition: PropTypes.func.isRequired,
    columnStates: PropTypes.array.isRequired
}

export default Board

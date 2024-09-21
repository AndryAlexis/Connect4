import { useRef, useState } from 'react'
import Column from './columns'

import BoardLine from './BoardLine.jsx'

// eslint-disable-next-line react/prop-types
const Board = ({amountColumns, amountRows, curPlayer, amountPlayers, updatePlayerTurn, matchesToWin}) => {
    const PLAYER_ATTRIBUTE = 'data-player-id'

    const boardRef = useRef(undefined)
    const [totalAmountOfTokensPlaced, setTotalAmountTokensPlaced] = useState(0)

    const columns = Array(amountColumns).fill(undefined)

    const updateTotalAmountTokensPlaced = () => setTotalAmountTokensPlaced((prev) => prev + 1)

    const checkWinner = (clickedColumnPos, lastSelectedRowPos) => {
        const columns = boardRef.current.lastElementChild.children
        const clickedColumn = columns[clickedColumnPos]
        const minTokensToWin = amountPlayers * matchesToWin - 2

        // It must be a minimum number of tokens to check if a winner exists.
        const thereAreNotMinOfTokensToWin = totalAmountOfTokensPlaced < minTokensToWin

        if (thereAreNotMinOfTokensToWin)
            return
        
        const rowsOfClickedColumn = clickedColumn.children
        const lastPlayerWhoPutToken = rowsOfClickedColumn[lastSelectedRowPos].getAttribute(PLAYER_ATTRIBUTE)

        const boardLine = new BoardLine(PLAYER_ATTRIBUTE, matchesToWin)
        
        const tokensWhichMatched = boardLine.checkForNumberOfMatches(
            columns,
            clickedColumnPos,
            lastSelectedRowPos,
            lastPlayerWhoPutToken,
            amountRows
        )

        console.log(tokensWhichMatched)
    }

    return <article 
        className={`grid place-items-center gap-4`}
        ref={boardRef}
    >
        <h1 className='text-4xl p-2'>
            Connect {matchesToWin}
        </h1>
        <div
            className='border-2 grid'     
            style={{gridTemplateColumns : `repeat(${amountColumns}, minmax(auto, 1fr))`}}
        >
            {
                columns.map((_, i) => (
                    <Column 
                        key={`${Column.displayName}${i}`}
                        position={i}
                        amountRows={amountRows}
                        curPlayer={curPlayer}
                        updatePlayerTurn={updatePlayerTurn}
                        checkWinner={checkWinner}
                        updateTotalAmountTokensPlaced={updateTotalAmountTokensPlaced}
                        playerAttribute={PLAYER_ATTRIBUTE}
                    />)
                )
            }
        </div>
    </article>
}

export default Board
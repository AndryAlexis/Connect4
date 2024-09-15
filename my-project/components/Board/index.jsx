import { useRef, useState } from 'react'
import Column from './columns'

// eslint-disable-next-line react/prop-types
const Board = ({amountColumns, amountRows, curPlayer, amountPlayers, updatePlayerTurn, matchesForWin}) => {
    const boardRef = useRef(undefined)
    const [totalAmountOfTokensPlaced, setTotalAmountTokensPlaced] = useState(0)

    const columns = Array(amountColumns).fill(undefined)

    const updateTotalAmountTokensPlaced = () => setTotalAmountTokensPlaced((prev) => prev + 1)

    const checkWinner = (clickedColumnPos, lastSelectedRowPos) => {
        const columns = boardRef.current.lastElementChild.children
        const clickedColumn = columns[clickedColumnPos]
        const amountOfTokensPlacedInColumn = amountRows - lastSelectedRowPos
        const minTokensToWin = amountPlayers * matchesForWin - 2

        console.log(`Amount tokens placed: ${totalAmountOfTokensPlaced}`)

        if (totalAmountOfTokensPlaced < minTokensToWin && amountOfTokensPlacedInColumn < matchesForWin)
            return
        
        const rowsOfClickedColumn = clickedColumn.children
        const lastPlayerWhoPutToken = rowsOfClickedColumn[lastSelectedRowPos].getAttribute('data-player-id')

        checkAmountOfMatches(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken)

        console.log('vamooosss')
    }

    const checkAmountOfMatches = (columns, clickedColumnPos, lastSelectedRowPos) => {
        //Check clicked column
        console.log(columns[clickedColumnPos])
    }

    return <article 
        className={`grid place-items-center gap-4`}
        ref={boardRef}
    >
        <h1 className='text-4xl p-2'>
            Connect {matchesForWin}
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
                    />)
                )
            }
        </div>
    </article>
}

export default Board
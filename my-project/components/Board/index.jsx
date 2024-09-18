import { useRef, useState } from 'react'
import Column from './columns'

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

        // console.log(`Amount tokens placed: ${totalAmountOfTokensPlaced}`)

        // It must be a minimum number of tokens to check if a winner exists.
        const thereAreNotMinOfTokensToWin = totalAmountOfTokensPlaced < minTokensToWin

        if (thereAreNotMinOfTokensToWin)
            return
        
        const rowsOfClickedColumn = clickedColumn.children
        const lastPlayerWhoPutToken = rowsOfClickedColumn[lastSelectedRowPos].getAttribute(PLAYER_ATTRIBUTE)

        checkAmountOfMatches(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows)

        // console.log('Someone could win')
    }

    const checkAmountOfMatches = (columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows) => {
        const thereAreNotEnoughtTokensOnLeft = clickedColumnPos < matchesToWin - 1
        const thereAreNotEnoughtTokensOnBottom = amountRows - lastSelectedRowPos < matchesToWin
        const thereAreNotEnoughtTokensOnRight = columns.length - clickedColumnPos > matchesToWin - 1
        
        if (thereAreNotEnoughtTokensOnRight) {
            console.log('RIGHT')
        }

        // if (!thereAreNotEnoughtTokensOnLeft) {
        //     console.log('LEFT YEAH')
        // }
        // if (!thereAreNotEnoughtTokensOnBottom) {
        //     console.log('BOTTOM YEAH')
        // }

        // if (thereAreNotEnoughtTokensOnLeft || thereAreNotEnoughtTokensOnBottom) {
        //     return
        // }
    

        const tokensWhichMatched = findLineOfTokens(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows)

        console.log(tokensWhichMatched)
    }

    const findLineOfTokens = (columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows) => {
        let line = undefined

        // line = checkLeftHorizontally(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken)
        // line = checkLeftDiagonally(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows)
        line = checkRightHorizontally(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows)


        return line
    }

    const checkLeftHorizontally = (columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken) => {
        let column = undefined
        let row = undefined
        let player = undefined
        let elementsThatMatched = []

        //Check the left horizontally
        for (let i = clickedColumnPos; i >= 0; i--) {
            column = columns[i]
            row = column.children[lastSelectedRowPos]
            
            player = row.getAttribute(PLAYER_ATTRIBUTE)

            if (player === lastPlayerWhoPutToken) {
                elementsThatMatched.push(row)
            } else {
                return []
            }
        }

        return elementsThatMatched
    }

    const checkLeftDiagonally = (columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows) => {
        let column = undefined
        let row = undefined
        let player = undefined
        let elementsThatMatched = []
        let diagonalPos = lastSelectedRowPos

        //Check the left horizontally
        for (let i = clickedColumnPos; i >= 0; i--) {
            column = columns[i]
            row = column.children[diagonalPos]

            console.log(row)
            console.log(columns[0].children.length)
            
            player = row.getAttribute(PLAYER_ATTRIBUTE)

            if (player === lastPlayerWhoPutToken) {
                elementsThatMatched.push(row)
            } else {
                return []
            }

            diagonalPos++

            if (diagonalPos >= amountRows) {
                return elementsThatMatched
            }
        }

        return elementsThatMatched
    }

    const checkRightHorizontally = (columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken) => {
        let column = undefined
        let row = undefined
        let player = undefined
        let elementsThatMatched = []

        //Check the left horizontally
        for (let i = clickedColumnPos; i < columns.length; i++) {
            column = columns[i]
            row = column.children[lastSelectedRowPos]
            
            player = row.getAttribute(PLAYER_ATTRIBUTE)

            if (player === lastPlayerWhoPutToken) {
                elementsThatMatched.push(row)
            }

            if (elementsThatMatched.length >= matchesToWin) {
                return elementsThatMatched
            }
        }

        return elementsThatMatched
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
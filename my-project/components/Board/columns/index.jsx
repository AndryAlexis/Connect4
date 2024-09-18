import { useState, useRef } from 'react'
import Row from '../rows'

// eslint-disable-next-line react/prop-types
const Column = ({position, amountRows, curPlayer, updatePlayerTurn, checkWinner, updateTotalAmountTokensPlaced, playerAttribute}) => {
    const columnRef = useRef(undefined)
    const [rowPos, setRowPos] = useState(amountRows - 1)

    const rows = Array(amountRows).fill(null)

    const putTokenOnBoard = () => {
        if (rowPos < 0)
            return

        const lastChild = columnRef.current.children[rowPos]
        // eslint-disable-next-line react/prop-types
        lastChild.classList.add(`${curPlayer.color}`)

        // eslint-disable-next-line react/prop-types
        lastChild.setAttribute(`${playerAttribute}`, curPlayer.id)
        
        updateTotalAmountTokensPlaced()
    }

    const handleClick = () => {
        putTokenOnBoard()
        updatePlayerTurn()

        checkWinner(position, rowPos, columnRef)

        setRowPos(rowPos - 1)
    }

    return <div
        className="border-2 p-2 grid gap-2 hover:border-black cursor-pointer"
        onClick={handleClick}
        ref={columnRef}
    >
        {
            rows.map((_, i) => (
                <Row key={`${Row.displayName}${i}`}></Row>
            ))
        }
    </div>
}

export default Column

Column.displayName = 'Column'
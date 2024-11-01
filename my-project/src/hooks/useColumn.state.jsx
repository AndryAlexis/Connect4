import { useState } from "react";
import { gameSettings } from "../../components/Connect4/gameSettings";

// Destructure constants from game settings
const { COLUMNS, ROWS } = gameSettings

export const useColumnState = _ => {
    // Initialize state array to track the lowest available position in each column
    // Each column starts with rowPos set to bottom row (ROWS - 1)
    const [columnStates, setColumnStates] = useState(
        Array(COLUMNS).fill(null).map(_ => ({
            rowPos: ROWS - 1
        }))
    )

    // Updates the lowest available position for a specific column
    // @param newValue - The new row position value
    // @param position - The column index to update
    const updateColumnStateByPosition = (newRowPosition, columnIndex) => {
        setColumnStates(prev => {
            const newArray = [...prev]
            newArray[columnIndex] = {rowPos: newRowPosition}
            return newArray
        })
    }

    // Resets all columns to their initial state
    // Sets each column's rowPos back to the bottom row (ROWS - 1)
    // Used when restarting/resetting the game
    const resetColumnStates = _ => {
        setColumnStates(Array(COLUMNS).fill(null).map(_ => ({
            rowPos: ROWS - 1
        })))
    }

    return [
        columnStates,                // Array of column states tracking lowest available positions
        updateColumnStateByPosition,  // Function to update a column's state
        resetColumnStates
    ]
}

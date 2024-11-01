import { useState } from "react";

/**
 * Custom hook to manage the winner state in the Connect 4 game
 * @returns {Object} Object containing winner state and functions to update it
 */
export const useWinnerState = () => {
    // Initialize winner state with default values
    const [winner, setWinner] = useState({
        name: 'Nobody',    // Name of the winner, defaults to 'Nobody'
        state: false       // Boolean indicating if there is a winner
    })

    /**
     * Updates the winner state (true/false)
     * @param {boolean} state - The new winner state
     */
    const declareWinnerState = state => setWinner(prev => ({
        ...prev,
        state
    }))
    
    /**
     * Updates the winner's name
     * @param {string} name - The name of the winner
     */
    const declareWinnerName = name => setWinner(prev => ({
        ...prev,
        name
    }))

    return { 
        winner,             // Current winner state object
        declareWinnerState, // Function to update winner state
        declareWinnerName   // Function to update winner name
    }
}
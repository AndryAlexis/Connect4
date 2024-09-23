
export default class BoardLine {
    constructor(playerAttribute, matchesToWin) {
        // Constants representing different directions on the board
        this.LINE_LEFT = 'onLeft'
        this.LINE_RIGHT = 'onRight'
        this.LINE_BOTTOM = 'onBottom'
        this.LINE_DIAGONAL_LEFT = 'onDiagonalLeft'
        this.LINE_DIAGONAL_RIGHT = 'onDiagonalRight'

        this.playerAttribute = playerAttribute // Attribute to identify the player (e.g., 'data-player')
        this.matchesToWin = matchesToWin // Number of matches needed to win
    }

    /**
     * Checks if there are enough tokens in any direction to possibly win.
     * @param {Array} columns - Array of columns in the board.
     * @param {number} clickedColumnPos - The column position where the last token was placed.
     * @param {number} lastSelectedRowPos - The row position where the last token was placed.
     * @param {string} lastPlayerWhoPutToken - The identifier of the last player who put a token.
     * @param {number} amountRows - Total number of rows in the board.
     * @returns {Array|undefined} - Array of matching elements if there's a win, otherwise undefined.
     */
    checkForNumberOfMatches(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows) {
        // Determine if it's possible to win in each direction
        const isLeft = clickedColumnPos >= this.matchesToWin - 1
        const isRight = columns.length - clickedColumnPos >= this.matchesToWin
        const isBottom = amountRows - lastSelectedRowPos >= this.matchesToWin

        // Create an object to track which directions have enough tokens to check for a win
        const thereAreEnoughtTokens = {
            [this.LINE_LEFT]           : isLeft,
            [this.LINE_RIGHT]          : isRight,
            [this.LINE_BOTTOM]         : isBottom,
            [this.LINE_DIAGONAL_LEFT]  : isLeft && isBottom,
            [this.LINE_DIAGONAL_RIGHT] : isRight && isBottom
        }

        // Get directions that are possible to win in
        const directionsWhichSomeoneCouldWin = Object
            .keys(thereAreEnoughtTokens)
            .filter(key => thereAreEnoughtTokens[key] === true)

        // If no direction has enough tokens to possibly win, return an empty array
        if (directionsWhichSomeoneCouldWin.length === 0)
            return []
        
        // Check all possible winning lines and return the matches if found
        const tokensWhichMatched = this.checkAllLines(
            columns,
            clickedColumnPos,
            lastSelectedRowPos,
            lastPlayerWhoPutToken,
            amountRows,
            directionsWhichSomeoneCouldWin
        )

        // If there aren't enough matches to win, return an empty array
        if (tokensWhichMatched.length < this.matchesToWin)
            return []

        return tokensWhichMatched
    }

    /**
     * Checks all potential winning lines based on possible directions.
     * @param {Array} columns - Array of columns in the board.
     * @param {number} clickedColumnPos - The column position where the last token was placed.
     * @param {number} lastSelectedRowPos - The row position where the last token was placed.
     * @param {string} lastPlayerWhoPutToken - The identifier of the last player who put a token.
     * @param {number} amountRows - Total number of rows in the board.
     * @param {Array} directionsWhichSomeoneCouldWin - Array of directions that need to be checked.
     * @returns {Array} - Array of matching elements if there's a win.
     */
    checkAllLines(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows, directionsWhichSomeoneCouldWin) {
        let line = []

        // Iterate through each possible winning direction
        for (let index = 0; index < directionsWhichSomeoneCouldWin.length; index++) {
            const direction = directionsWhichSomeoneCouldWin[index]

            line = this.checkLineAccordingDirection(
                direction,
                columns,
                clickedColumnPos,
                lastSelectedRowPos,
                lastPlayerWhoPutToken,
                amountRows
            )

            if (line.length === this.matchesToWin) {
                return line
            }
        }
        return line
    }

    checkLineAccordingDirection(
        selectedDirection,
        columns,
        clickedColumnPos,
        lastSelectedRowPos,
        lastPlayerWhoPutToken,
        amountRows
    ) {
        let line = []

        const lineCheckers = {
            [this.LINE_LEFT]: () => this.checkLeft(
                columns,
                clickedColumnPos,
                lastSelectedRowPos,
                lastPlayerWhoPutToken
            ),
            [this.LINE_RIGHT]: () => this.checkRight(
                columns,
                clickedColumnPos,
                lastSelectedRowPos,
                lastPlayerWhoPutToken
            ),
            [this.LINE_DIAGONAL_LEFT]: () => this.checkLeftDiagonally(
                columns,
                clickedColumnPos,
                lastSelectedRowPos,
                lastPlayerWhoPutToken,
                amountRows
            ),
            [this.LINE_DIAGONAL_RIGHT]: () => this.checkRightDiagonally(
                columns,
                clickedColumnPos,
                lastSelectedRowPos,
                lastPlayerWhoPutToken,
                amountRows
            ),
            [this.LINE_BOTTOM]: () => this.checkBottom(
                columns,
                clickedColumnPos,
                lastSelectedRowPos,
                lastPlayerWhoPutToken,
                amountRows
            )
        }
        line = lineCheckers[selectedDirection]()
        return line
    }

    /**
     * Checks the left line horizontally for a potential win.
     * @param {Array} columns - Array of columns in the board.
     * @param {number} clickedColumnPos - The column position where the last token was placed.
     * @param {number} lastSelectedRowPos - The row position where the last token was placed.
     * @param {string} lastPlayerWhoPutToken - The identifier of the last player who put a token.
     * @returns {Array} - Array of matching elements in the left horizontal line.
     */
    checkLeft(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken) {
        let elementsThatMatched = []
        let isSamePlayer = false
        
        // Iterate from the clicked column to the leftmost column
        for (let i = clickedColumnPos; i >= 0; i--) {
            elementsThatMatched= this.checkHorizontally(
                i,
                elementsThatMatched,
                columns,
                lastSelectedRowPos,
                lastPlayerWhoPutToken
            )

            if (!isSamePlayer) {
                return elementsThatMatched
            }
        }
        return elementsThatMatched
    }

    /**
     * Checks the right line horizontally for a potential win.
     * @param {Array} columns - Array of columns in the board.
     * @param {number} clickedColumnPos - The column position where the last token was placed.
     * @param {number} lastSelectedRowPos - The row position where the last token was placed.
     * @param {string} lastPlayerWhoPutToken - The identifier of the last player who put a token.
     * @returns {Array} - Array of matching elements in the right horizontal line.
     */
    checkRight(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken) {
        let elementsThatMatched = []
        let isSamePlayer = false

        // Iterate from the clicked column to the rightmost column
        for (let i = clickedColumnPos; i < columns.length; i++) {
            [isSamePlayer, elementsThatMatched] = this.checkHorizontally(
                i,
                elementsThatMatched,
                columns,
                lastSelectedRowPos,
                lastPlayerWhoPutToken
            )

            if (!isSamePlayer) {
                return elementsThatMatched
            }
        }
        return elementsThatMatched
    }

    checkHorizontally(iteration, elementsThatMatched, columns, lastSelectedRowPos, lastPlayerWhoPutToken) {
        let column = columns[iteration]
        let row = column.children[lastSelectedRowPos]
        let player = row.getAttribute(this.playerAttribute)
        let isSamePlayer = true

        // If the token matches the last player's, add it to the matched elements
        if (player === lastPlayerWhoPutToken) {
            elementsThatMatched.push(row)
        } else {
            isSamePlayer = false
            // If the token doesn't match, return the elements matched so far
            return [isSamePlayer, elementsThatMatched]
        }
        return [isSamePlayer, elementsThatMatched]
    }

    /**
     * Checks the left line diagonally (upwards to the left) for a potential win.
     * @param {Array} columns - Array of columns in the board.
     * @param {number} clickedColumnPos - The column position where the last token was placed.
     * @param {number} lastSelectedRowPos - The row position where the last token was placed.
     * @param {string} lastPlayerWhoPutToken - The identifier of the last player who put a token.
     * @param {number} amountRows - Total number of rows in the board.
     * @returns {Array} - Array of matching elements in the left diagonal line.
     */
    checkLeftDiagonally(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows) {
        let elementsThatMatched = []
        let diagonalPos = lastSelectedRowPos

        // Iterate from the clicked column to the leftmost column, moving diagonally upwards
        for (let i = clickedColumnPos; i >= 0; i--) {
            [elementsThatMatched, diagonalPos] = this.checkDiagonally(
                i,
                columns,
                diagonalPos,
                elementsThatMatched,
                lastPlayerWhoPutToken,
            )
            // If the diagonal position exceeds the number of rows, stop checking
            if (diagonalPos <= amountRows) {
                return elementsThatMatched
            }
        }
        return elementsThatMatched
    }

    /**
     * Checks the right line diagonally (upwards to the right) for a potential win.
     * @param {Array} columns - Array of columns in the board.
     * @param {number} clickedColumnPos - The column position where the last token was placed.
     * @param {number} lastSelectedRowPos - The row position where the last token was placed.
     * @param {string} lastPlayerWhoPutToken - The identifier of the last player who put a token.
     * @param {number} amountRows - Total number of rows in the board.
     * @returns {Array} - Array of matching elements in the right diagonal line.
     */
    checkRightDiagonally(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows) {
        let elementsThatMatched = []
        let diagonalPos = lastSelectedRowPos

        // Iterate from the clicked column to the rightmost column, moving diagonally upwards
        for (let i = clickedColumnPos; i < columns.length; i++) {
            [elementsThatMatched, diagonalPos] = this.checkDiagonally(
                i,
                columns,
                diagonalPos,
                elementsThatMatched,
                lastPlayerWhoPutToken,
            )

            // If the diagonal position exceeds the number of rows, stop checking
            if (diagonalPos >= amountRows) {
                return elementsThatMatched
            }
        }
        return elementsThatMatched
    }

    checkDiagonally(iteration, columns, diagonalPos, elementsThatMatched, lastPlayerWhoPutToken) {
        let column = columns[iteration]
        let row = column.children[diagonalPos]
        
        let player = row.getAttribute(this.playerAttribute)

        if (player === lastPlayerWhoPutToken) {
            elementsThatMatched.push(row)
        } else {
            return elementsThatMatched
        }

        diagonalPos++

        return [elementsThatMatched, diagonalPos]
    }

    /**
     * Checks the bottom line vertically for a potential win.
     * @param {Array} columns - Array of columns in the board.
     * @param {number} clickedColumnPos - The column position where the last token was placed.
     * @param {number} lastSelectedRowPos - The row position where the last token was placed.
     * @param {string} lastPlayerWhoPutToken - The identifier of the last player who put a token.
     * @param {number} amountRows - Total number of rows in the board.
     * @returns {Array} - Array of matching elements in the bottom vertical line.
     */
    checkBottom(columns, clickedColumnPos, lastSelectedRowPos, lastPlayerWhoPutToken, amountRows) {
        this.elementsThatMatched = []
        this.column = columns[clickedColumnPos]

        // Iterate from the clicked row to the bottommost row
        for (let i = lastSelectedRowPos; i < amountRows; i++) {
            this.row = this.column.children[i]

            this.player = this.row.getAttribute(this.playerAttribute)

            if (this.player === lastPlayerWhoPutToken) {
                this.elementsThatMatched.push(this.row)
            } else {
                return this.elementsThatMatched
            }
        }

        return this.elementsThatMatched
    }
}

import Token from "../Token"

/**
 * Row component represents a single cell in the Connect 4 game board
 * Renders a circular container that can hold a player's token
 * 
 * Features:
 * - 3D visual effect with highlights and shadows
 * - Fixed 56x56px dimensions
 * - Centers the token within using CSS Grid
 * - Semi-transparent blue background with gradient effects
 * 
 * @component
 * @returns {JSX.Element} A styled span element containing a Token component
 */
const Row = () => {
    return (
        <span 
            className="
                border-[5px]
                border-solid
                border-[rgba(27,137,255,0.782)]
                border-l-[rgba(255,255,255,0.605)]
                border-t-[rgba(255,255,255,0.605)]
                [box-shadow:5px_5px_10px_1px_rgba(0,55,133,0.642),inset_0_0_20px_rgba(0,0,0,0.1),inset_0_0_10px_rgba(0,0,0,0.2)]
                bg-[rgba(26,97,218,0.562)]
                w-14
                h-14
                grid
                place-content-center
                rounded-full
            "
        >
            <Token/>
        </span>
    )
}

export default Row

Row.displayName = 'Row'
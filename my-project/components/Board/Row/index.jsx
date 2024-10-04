import Token from "../Token"

const Row = () => {
    // outline outline-2 outline-white shadow-xl shadow-white
    return (
        <span 
            className="test-row w-14 h-14 grid place-content-center rounded-full"
        >
            <Token/>
        </span>
    )
}

export default Row

Row.displayName = 'Row'
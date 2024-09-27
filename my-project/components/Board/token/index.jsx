import PropTypes from "prop-types";

const Token = () => {
    return (
        <span
            className={`
                w-12 h-12 
                rounded-full 
                grid place-items-center 
                relative 
                after:rounded-full
                after:content-[''] after:absolute after:w-[75%] after:h-[75%] 
            `}
        ></span>
    )
}

Token.propTypes = {
    color : PropTypes.string
}

export default Token;

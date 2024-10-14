import PropTypes from 'prop-types' // Importing PropTypes for validation

const Menu = ({playerWhoWon = 'Default Player'}) => {

    

  return <>
      <aside className='h-full relative overflow-hidden shadow-md bg-[#f0f0ff]'>
      <section className='p-4 h-[inherit] grid place-content-center gap-6'>
        <h2 className="text-3xl font-bold text-center">
          {playerWhoWon} has won!
        </h2>
        <button className='border-2 outline outline-6 outline-[#FF91A4] hover:outline-offset-0 transition-all outline-offset-4 py-2 px-4 text-2xl bg-[#FF91A4] font-bold text-white rounded-lg cursor-pointer'>
          Play Again
        </button>
      </section>
    </aside>
  </>
}

Menu.propTypes = {
  playerWhoWon: PropTypes.string.isRequired
}

export default Menu
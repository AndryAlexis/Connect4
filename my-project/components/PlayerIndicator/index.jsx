// eslint-disable-next-line react/prop-types
const PlayerIndicator = ({ownPlayer, curPlayer}) => {
    const isOwnPlayerTheCurPlayer = ownPlayer.id === curPlayer.id

    const classes = `
        ${isOwnPlayerTheCurPlayer ? 'border-black' : ''}
        ${isOwnPlayerTheCurPlayer ? '' : 'opacity-30'}
        w-32 h-32 border-2 ${ownPlayer.color} grid place-items-center rounded-full font-bold
    `
    return <div className={classes}>
        {ownPlayer.name}
    </div>
}

export default PlayerIndicator

PlayerIndicator.displayName = 'PlayerIndicator'
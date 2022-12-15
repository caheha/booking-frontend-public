export default function Button({ onClick, title, color, outline, icon, count}) {

    // Button must have onClick prop
    if (!onClick) return;

    return (
        <button className={outline ? `btn outline ${color}` : `btn${color ? ` ${color}` : ''}`} onClick={() => onClick()}>
            {icon && <img src={icon} alt="ikon" />}
            {title}
            {count ? <span className='count'>( {count} )</span> : ''}
        </button>
    )
}
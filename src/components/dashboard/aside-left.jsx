

export default function AsideLeft({user, setComponents, setCurrentProfile}) {

    const userId = localStorage.getItem('user_id')
    const handleClick = () => {
        setCurrentProfile(userId)
        setComponents('profile')
    }

    return (
        <ul className='sidebar'>
            <li>
                <div className='user-avatar'>
                    <h1>{user ? user.username[0].toUpperCase() : ''}</h1>
                </div>
                <p>{user ? user.username : ''}</p>
            </li>
            <li onClick={() => setComponents('main')}>
                <i className='bx bx-home-alt-2'></i>
                <p>Главная</p>
            </li>
            <li onClick={() => setComponents('notifications')}>
                <i className='bx bx-bell'></i>
                <p>Уведомление</p>
            </li>
            <li onClick={() => setComponents('collection')}>
                <i className='bx bx-bookmark'></i>
                <p>Коллекция</p>
            </li>
            <li onClick={handleClick}>
                <i className='bx bx-user-circle'></i>
                <p>Мой профиль</p>
            </li>
            <li onClick={() => setComponents('card_info')}>
                <i className='bx bx-cog'></i>
                <p>Больше</p>
            </li>
            <li>
                <div className='add-post'>
                    <i className='bx bx-plus'></i>
                    <p>Новый пост</p>
                </div>
            </li>
        </ul>
    )
}
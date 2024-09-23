import {useEffect, useState} from "react";
import axios from "axios";
import './notifications.css'


export default function NotificationInfo({notification, setCurrentProfile, setNotifications, notifications, setComponents}) {
    const [user, setUser] = useState('')

    {notification ? useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/profile/${notification.sender}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []) : null}

    const deleteNotification = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/v1/notifications/${id}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
            .then(response => {
                setNotifications(notifications.filter(notification => notification.id !== id))
            })

            .catch(error => {
                console.log(error)
            })
    }

    const handleClick = () => {
        setCurrentProfile(user.id)
        setComponents('profile')
    }

    return (
        <div className="notification-info">
            {user ?
                <div className='notif'>
                    <div className='notification-into-profile' onClick={() => handleClick()}>
                        {user.image ? <img src={user.image} alt=""/> :
                            <h2>{user ? user.user.username[0].toUpperCase() : ''}</h2>}
                        <div>
                            <p>{user ? user.user.first_name : ''} {user ? user.user.last_name : ''}</p>
                            <p>{notification.message}</p>
                        </div>
                    </div>
                    <button onClick={() => deleteNotification(notification.id)}>Delete</button>
                </div>
                : null}
        </div>
    )
}
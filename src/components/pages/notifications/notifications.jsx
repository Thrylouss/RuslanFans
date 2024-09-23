import './notifications.css'
import {useEffect, useState} from "react";
import axios from "axios";
import NotificationInfo from "./notification_info.jsx";

export default function Notifications({setComponents, setCurrentProfile}) {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/notifications/', {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
            .then(response => {
                setNotifications(response.data.results.filter(notification => notification.user === parseInt(localStorage.getItem('user_id'))))
                console.log(notifications)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <div className='notifications-header'>
                <i onClick={() => setComponents('main')} className='bx bx-arrow-back'></i>
                <h2>Уведомление</h2>
            </div>

            <div className='filter-notification'>
                <p>Все</p>

            </div>
            <div>
                {notifications.length > 0 ? notifications.map((notification, index) => (
                    <div className='notification' key={index}>
                        <NotificationInfo setCurrentProfile={setCurrentProfile} setComponents={setComponents} notification={notification} setNotifications={setNotifications} notifications={notifications}/>
                    </div>
                )) : <p style={{textAlign: 'center', marginTop: '40px', fontSize: '20px', fontWeight: '700'}}>Нет уведомлений</p>}
            </div>
        </>
    )
}
import {useEffect, useState} from "react";
import axios from "axios";
import './profile_page.css'


export default function Subscribe({setActive, userID}) {

    const [data, setData] = useState({})

    const handleClick = () => {
        axios.post('http://127.0.0.1:8000/api/v1/subscriptions/', {
            user: localStorage.getItem('user_id'),
            subscribed_to: userID,
            is_active: true
        }, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
        .then(response => {
            setActive(true)
            createNotification()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const createNotification = () => {
        axios.post('http://127.0.0.1:8000/api/v1/notifications/', {
            user: userID,
            sender: localStorage.getItem('user_id'),
            message: `У вас новая подписка!`
        }, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className='profile-sub'>
            <p>Подпишитесь, чтобы видеть посты этого пользователя.</p>
            <button onClick={() => handleClick()}>Подписаться</button>
        </div>
    )
}
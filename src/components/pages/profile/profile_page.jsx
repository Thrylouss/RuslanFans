import {useEffect, useState} from "react";
import axios from "axios";
import './profile_page.css';
import PostCard from "../main/post-card.jsx";
import Subscribe from "./subscribe.jsx";


export default function ProfilePage({currentProfile, setComponents}) {
    const userID = currentProfile ? currentProfile : localStorage.getItem('user_id');
    const [profile, setProfile] = useState('');
    const currentUser = localStorage.getItem('user_id');
    const [isActive, setIsActive] = useState(false);  // Статус подписки

    useEffect(() => {
        // Проверка подписки на пользователя
        axios.get(`http://127.0.0.1:8000/api/v1/subscriptions/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
            .then(response => {
                const data = response.data.results.filter(user => user.user === parseInt(currentUser));
                const currentData = data.find(user => user.subscribed_to === parseInt(userID));

                if (currentData && currentData.is_active) {
                    setIsActive(true);  // Подписка активна
                } else {
                    setIsActive(false);  // Подписка не активна
                }
                if (currentUser === userID) {
                    setIsActive(true);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [currentUser, userID]);

    useEffect(() => {
        // Получение профиля
        axios.get(`http://127.0.0.1:8000/api/v1/profile/${userID}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
            .then(response => setProfile(response.data))
            .catch(error => console.log(error));
    }, [userID]);

    return (
        <div>
            <div className="profile-page" style={profile.header_image ? {backgroundImage: `url(${profile.header_image})`} : {backgroundColor: '#abebff'}}>
                <i onClick={() => setComponents('main')} className='bx bx-arrow-back'></i>
                <div>
                    <p>{profile ? profile.user.username : ''}</p>
                </div>
            </div>
            <div className='profile-info'>
                {profile.image ? <img src={profile.image} alt=""/> : <h2>{profile ? profile.user.username[0].toUpperCase() : ''}</h2>}
                <p>{profile ? profile.user.first_name : ''} {profile ? profile.user.last_name : ''}</p>
            </div>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <h1 style={{borderBottom: '1px solid #d2e2ff', padding: '0 0 30px 0'}}>POSTS</h1>
                {isActive ? (
                    <PostCard userID={userID}/>  // Отображение постов только если подписка активна
                ) : (
                    <Subscribe setActive={setIsActive} userID={userID}/>  // Сообщение, если подписка не активна
                )}
            </div>
            <div></div>
        </div>
    );
}

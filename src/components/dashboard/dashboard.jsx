import './dashboard.css'
import {useEffect, useState} from "react";
import axios from "axios";
import MainPage from "../pages/main/main_page.jsx";
import Notifications from "../pages/notifications/notifications.jsx";
import AsideLeft from "./aside-left.jsx";
import ProfilePage from "../pages/profile/profile_page.jsx";
import AsideRight from "./aside-right.jsx";
import './aside.css'
import CardInfo from "../pages/card_info/card_info.jsx";
import BookmarksPage from "../pages/bookmarks/bookmarks-page.jsx";



export default function Dashboard() {
    const [user, setUser] = useState('');
    const [currentProfile, setCurrentProfile] = useState('');
    const [components, setComponents] = useState(
        localStorage.getItem('components') ? localStorage.getItem('components') : 'main'
    );

    const setComponentsLocalStorage = (components) => {
        setComponents(components);
        localStorage.setItem('components', components)
    }

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/v1/auth/users/me',
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('auth_token')}`
                    }
                })
            .then((response) => {
                setUser(response.data)
                localStorage.setItem('user_id', response.data.id)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="main">
            <div className="aside-left">
                <AsideLeft user={user} setCurrentProfile={setCurrentProfile} setComponents={setComponentsLocalStorage}/>
            </div>
            <div className="main-content">
                {components === 'main' && <MainPage setComponents={setComponentsLocalStorage} setCurrentProfile={setCurrentProfile}/> }
                {components === 'notifications' && <Notifications setComponents={setComponentsLocalStorage} setCurrentProfile={setCurrentProfile} /> }
                {components === 'profile' && <ProfilePage setComponents={setComponentsLocalStorage} currentProfile={currentProfile}/> }
                {components === 'card_info' && <CardInfo setComponents={setComponentsLocalStorage}/> }
                {components === 'collection' && <BookmarksPage setComponents={setComponentsLocalStorage}/> }
            </div>
            <div className="aside-right">
                < AsideRight setCurrentProfile={setCurrentProfile}  setComponents={setComponentsLocalStorage}/>
            </div>
        </div>
    )
}
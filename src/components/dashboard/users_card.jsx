import {useEffect, useState} from "react";
import axios from "axios";

export default function AdviseCard({setComponents, currentPage, setTotalPages, refresh, query, setCurrentProfile}) {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        // Собираем параметры запроса
        const params = new URLSearchParams();
        params.append('page', currentPage);
        if (refresh > 0) params.append('random', 'true');
        if (query) params.append('search', query);  // Добавляем параметр поиска

        axios
            .get(`http://127.0.0.1:8000/api/v1/profile/?${params.toString()}`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('auth_token')}`
                }
            })
            .then((response) => {
                setProfiles(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 3));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentPage, refresh,query ]);  // Добавляем зависимость от searchQuery

    const handleClick = (profile) => {
        setCurrentProfile(profile)
        setComponents('profile')

    }

    return (
        <div className="advise-card">
            {profiles.map((profile) =>
                (
                    <div onClick={() => handleClick(profile.id)} className="profile-card" key={profile.id} style={
                        profile.header_image ?
                            {backgroundImage: `url(${profile.header_image})`} :
                            {backgroundColor: '#bababa'}
                    }>
                        <div className="user-img">
                            <div className='user-ava'>
                                {profile.image ? <img src={profile.image} alt=""/> : <h3>{profile.user.username[0].toUpperCase()}</h3>}
                            </div>
                            <p>{profile ? profile.user.username : ''}</p>
                        </div>
                        <div className="user-name"></div>
                    </div>
                )
            )}
        </div>
    )
}

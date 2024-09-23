import './main_page.css'
import PostCard from "./post-card.jsx";

export default function MainPage({setComponents, setCurrentProfile}) {

    return (
        <>
            <div className="main-header">
                <h4>Главная</h4>
                <i className='bx bx-dots-vertical-rounded'></i>
            </div>
            <div className="posts-list">
                <PostCard setComponents={setComponents} setCurrentProfile={setCurrentProfile}/>
            </div>
        </>
    )
}
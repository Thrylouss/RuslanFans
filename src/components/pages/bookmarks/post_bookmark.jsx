import {useEffect, useState} from "react";
import axios from "axios";
import './bookmarks.css'


export default function PostBookmark({post, deleteBookmark}) {
    const [bookmarksPosts, setBookmarksPosts] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/posts/${post}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        }).then(response => {
            console.log(response.data)

            setBookmarksPosts(response.data)
        })
    }, [])

    return (
        <div className='post-book'>
            <img src={bookmarksPosts.image} alt=""/>
            <div>
                <h2>{bookmarksPosts.title}</h2>
                <p>{bookmarksPosts.content}</p>
            </div>
        </div>
    )
}
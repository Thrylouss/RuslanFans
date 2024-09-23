import {useEffect, useState} from "react";
import axios from "axios";
import PostBookmark from "./post_bookmark.jsx";


export default function Bookmark() {
    const [bookmarksPosts, setBookmarksPosts] = useState('')
    const currentUser = parseInt(localStorage.getItem('user_id'))

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/bookmark/', {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
            .then(response => {
                setBookmarksPosts(response.data.results.filter(bookmark => bookmark.user === currentUser))
                console.log(bookmarksPosts)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const deleteBookmark = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/v1/bookmark/${id}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
            .then(response => {
                setBookmarksPosts(bookmarksPosts.filter(bookmark => bookmark.id !== id))
            })
            .catch(error => {
                console.log(error)
            })
    }



    return (
        <div>
            {bookmarksPosts && bookmarksPosts.map(bookmark => (
                <div key={bookmark.id}>
                    <PostBookmark post={bookmark.post} deleteBookmark={deleteBookmark}/>
                </div>
            ))}
        </div>
    )
}
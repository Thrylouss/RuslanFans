import {useEffect, useState} from "react";
import axios from "axios";
import './main_page.css'
import AddBookmark from "./add-bookmark.jsx";


export default function PostCard({setComponents, userID, setCurrentProfile}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/v1/posts/?page=1',
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('auth_token')}`
                    }
                })
            .then((response) => {
                const userId = localStorage.getItem('user_id');
                if (userID) {
                    setPosts(response.data.results.filter(post => post.profile.user.id === parseInt(userID)));
                } else {
                    setPosts(response.data.results.map(post => {
                        return {
                            ...post,
                            liked: post.likes.includes(userId)
                        }
                    }));
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [userID])

    const handleLike = (postId) => {
        axios
            .post(`http://127.0.0.1:8000/api/v1/posts/${postId}/like/`, {}, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('auth_token')}`
                }
            })
            .then((response) => {
                const userId = localStorage.getItem('user_id');
                setPosts(posts.map(post => {
                    if (post.id === postId) {
                        if (response.data.status === "liked") {

                            if (!post.likes.includes(userId)) {
                                return {
                                    ...post,
                                    likes: [...post.likes, userId],
                                    liked: true
                                };
                            }
                        } else if (response.data.status === "unliked") {
                            return {
                                ...post,
                                likes: post.likes.filter(like => like !== userId),
                                liked: false
                            };
                        }
                    }
                    return post;
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClick = (id) => {
        setCurrentProfile(id)
        setComponents('profile')
    }

    return (
        <div className="post-card">
            {posts.map((post) => {
                return (
                    <div key={post.id} className="post">
                        <div className="post-content">
                            <div style={{padding: '20px'}}>
                                <div className='post-user'>
                                    <div onClick={() => handleClick(post.profile.user.id)}>
                                        {post.profile.image ?
                                            <img src={post.profile.image} alt=""/> :
                                            <div className='user-avatar'>
                                                <h1>{post.profile.user.username[0].toUpperCase()}</h1>
                                            </div>}
                                        <h2>{post.profile.user.username}</h2>
                                    </div>
                                    <p>{post.created_at.split('T')[0].replace(/-/g, '.')}</p>
                                </div>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                            <img src={post.image} alt=""/>
                            <div className='post-footer'>
                                <div className='post-controllers'>
                                    <div onClick={()=>handleLike(post.id)}>
                                        {post.liked ? <i className='bx bxs-heart' style={{color: 'red'}}></i> : <i className='bx bx-heart'></i>}
                                        <p>{post.likes.length}</p>
                                    </div>
                                    <div>
                                        <i className='bx bx-comment'></i>
                                        <p>{post.comments.length}</p>
                                    </div>
                                    <i className='bx bx-share-alt'></i>
                                </div>
                                <AddBookmark post={post}/>
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}
import {useRef} from "react";
import axios from "axios";


export default function AuthForm({setAuth}) {
    const url = 'http://127.0.0.1:8000/api/v1/';
    const username = useRef();
    const password = useRef();

    const login = (e) => {
        e.preventDefault();
        axios
            .post(url + 'auth/token/login/', {
                username: username.current.value,
                password: password.current.value
            })
            .then((response) => {
                localStorage.setItem('auth_token', response.data.auth_token);
                setAuth(true)
            })
            .catch((error) => {
                console.log("Login failed: ", error)
            })
    }

    return (
        <div className="auth-form">
            <input type="text" placeholder="Логин" ref={username}/>
            <input type="text" placeholder="Пароль" ref={password}/>
            <button type="submit" onClick={login}>Войти</button>
        </div>
    )
}
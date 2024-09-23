// import { useState } from 'react'
import './App.css'
import AuthPage from './components/auth_page/auth_page.jsx'
import {useEffect, useState} from "react";
import Dashboard from "./components/dashboard/dashboard.jsx";

function App() {
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            setAuth(true);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            if (!localStorage.getItem('auth_token')) {
                setAuth(false);
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };

    }, []);

    return (
    <>
        {isAuth ? <Dashboard /> : <AuthPage setAuth={setAuth}/>}
    </>
  )
}

export default App

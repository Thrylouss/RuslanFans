import './auth.css'
import logo from '../../assets/logo_white.png'
import AuthForm from './auth_form.jsx'

export default function AuthPage({setAuth}) {

    return (
        <div className="auth-page">
            <div className='auth-right'>
                <div className='ar-header'>
                    <img src={logo} alt="logo" />
                    <h1>RuslanFans</h1>
                </div>
                <p>
                    Зарегистрируйтесь, чтобы поддержать любимых авторов
                </p>
            </div>
            <div className='auth-left'>
                <AuthForm setAuth={setAuth}/>
            </div>
        </div>
    )
}
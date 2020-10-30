import React, { useRef, useState } from 'react';
import axios from 'axios';
import './Login.scss';
import {useHistory} from 'react-router-dom';

function Login(){

    const [userInfoState, setUserInfoState] = useState({
        email: '',
        password: ''
    });
    const [modeState, setModeState] = useState('Login');
    const toggleBarRef = useRef<HTMLSpanElement>(null);

    let history = useHistory();

    const toggleModeState = (targetMode: string) =>{
        setModeState(targetMode);
        toggleBarRef.current?.classList.toggle('on');
    }

    const setLoginState = (e: React.ChangeEvent<HTMLInputElement>) =>{

        const {name, value} = e.target;

        setUserInfoState({
            ...userInfoState,
            [name]: value 
        })
    }


    const onSubmitForLogin = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(modeState === 'Login'){
            axios({
                method: 'post',
                url: '/api/auth/login',
                withCredentials: true,
                data: userInfoState
            }).then((res) =>{
                console.log('post_res', res.data);
                history.push('/');
            });
        }else{
            axios({
                method: 'post',
                url: '/api/auth/user',
                data: userInfoState
            }).then((res) =>{
                console.log('post_res', res.data);
            });
        }

        
    }

    // Sign In 로그인
    // Sign Up 가입
    // Sign Out 로그아웃

    return (
        <main className="bb-login__main">
            <form className="bb-login__form" onSubmit={onSubmitForLogin}>
                <div className="bb-login__form-title">
                    <h2>Bumblog</h2>
                </div>
                <div className="bb-login__input-wrapper">
                    <input type="text" name="email" placeholder="E-Mail" onChange={setLoginState} />
                    <input type="password" name="password" placeholder="Password" onChange={setLoginState} />
                </div>
                <div className="bb-login__mode-toggle">
                    <span className="bb-login__toggle-bar" ref={toggleBarRef}>{modeState}</span>
                    <div onClick={() => toggleModeState('Login')}>Login</div>
                    <div onClick={() => toggleModeState('Register')}>Register</div>
                </div>
                <button className="bb-login__submit-button" type="submit">{modeState}</button>
            </form>
        </main>
    )
}

export default Login;
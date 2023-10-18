import React, { useState } from "react";
import { DISK_ROUTE, LOGIN_ROUTE, REGISTARTION_ROUTE } from "../../utils/consts";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { login, registration } from "../../http/UserApi";



const Authorization = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function click() {
        try {
            let data;
            if (isLogin) {
                data = dispatch(login(email, password));
            } else {
                data = await registration(email, password);
            }
            navigate(DISK_ROUTE);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div style={{height: window.innerHeight - 150}} className="container d-flex justify-content-center align-items-center">
            <div className="card d-flex flex-column p-3" style={{width:400}}>
                <h1 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h1>
                <input 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Введите ваш email"
                    type="email" 
                    className="form-control mt-3"
                />
                <input 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Введите ваш password"
                    type="password" 
                    className="form-control mt-3"
                />
                <div className="d-flex justify-content-between align-items-center mt-3">
                    {isLogin ?
                        <div className="d-flex">
                            Нет аккаунта? <p><a style={{marginLeft:5}} href={REGISTARTION_ROUTE} className="link-underline-light">Зарегистрируйся</a></p>
                        </div>
                        :
                        <div className="d-flex">
                            Есть аккаунт! <p><a style={{marginLeft:5}} href={LOGIN_ROUTE} className="link-underline-light">Авторизация</a></p>
                        </div>
                    }
                    <button onClick={click} type="button" className="btn btn-outline-secondary">{isLogin ? "Войти" : "Регистрация"}</button>
                </div>
            </div>
        </div>
    );
};

export default Authorization;
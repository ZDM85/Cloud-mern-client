import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { API_URL, LOGIN_ROUTE, PROFILE_ROUTE, REGISTARTION_ROUTE } from '../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../http/UserApi';
import { getFiles, searchFile } from '../../http/fileApi';
import { showLoading } from '../../reducers/appReducer';
import avatarLogo from "../../assets/img/avatar.svg";


const NavBar = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuth);
    const currentDir = useSelector(state => state.file.currentDir);
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(false);
    const avatar = currentUser.avatar ? `${API_URL + "//" + currentUser.avatar}` : avatarLogo; 

    function logoutClick() {
        dispatch(logout())
        navigate(LOGIN_ROUTE)
    }

    function searchHandler(e) {
        setSearchName(e.target.value);
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoading());
        if (e.target.value !== "") {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFile(value))
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <nav className="navbar" style={{backgroundColor: "#e3f2fd"}}>
            <div className='container-xl'>
                <nav  style={{width: 1350}} className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">MERN CLOUD</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {isAuth && 
                            <form style={{marginRight: 500}} className="d-flex" role="search">
                                <input value={searchName} onChange={(e)=>searchHandler(e)} className="form-control me-2" type="search" placeholder="Название файла..." aria-label="Search"/>
                            </form>
                        }
                        <div className="ml-auto d-flex">
                            {!isAuth ? 
                                <div className="navbar-nav">
                                    <button onClick={()=>navigate(REGISTARTION_ROUTE)} type="button" className="btn btn-outline-secondary">Регистрация</button>
                                    <button onClick={()=>navigate(LOGIN_ROUTE)} style={{marginLeft:7}} type="button" className="btn btn-outline-secondary">Войти</button>
                                </div>
                                :
                                <div className="navbar-nav">
                                    <button onClick={logoutClick} type="button" className="btn btn-outline-secondary">Выход</button>
                                </div>
                            }
                        <img onClick={()=>navigate(PROFILE_ROUTE)} style={{cursor:'pointer', width:40,height:40,marginLeft:10}} className='navbar-profile' src={avatar} alt=''/>
                        </div>
                    </div>
                </nav>
            </div>
        </nav>
    );
}

export default NavBar;

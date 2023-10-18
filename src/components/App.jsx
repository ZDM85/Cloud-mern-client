import React, { useEffect } from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NavBar from './NavBar/NavBar';
import { DISK_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTARTION_ROUTE } from '../utils/consts';
import Authorization from './Authorization/Authorization';
import { useDispatch, useSelector } from 'react-redux';
import Disk from './disk/Disk';
import { checkAuth } from '../http/UserApi';
import Profile from './profile/Profile';



function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(checkAuth());
        }
    }, []);

    return (
        <BrowserRouter>
            <NavBar/>
            {!isAuth ?
                <Routes>
                    <Route path={REGISTARTION_ROUTE} element={<Authorization/>}/>
                    <Route path={LOGIN_ROUTE} element={<Authorization/>}/>
                    <Route path="*" element={<Navigate to={LOGIN_ROUTE}/>}/>
                </Routes>
                :
                <Routes>
                    <Route path={DISK_ROUTE} element={<Disk/>}/>
                    <Route path={PROFILE_ROUTE} element={<Profile/>}/>
                    <Route path="*" element={<Navigate to={DISK_ROUTE}/>}/>
                </Routes>
             }
        </BrowserRouter>
    );
}

export default App;

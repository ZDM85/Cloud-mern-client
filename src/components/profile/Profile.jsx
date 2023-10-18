import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../http/UserApi";
import { useNavigate } from "react-router-dom";
import { DISK_ROUTE } from "../../utils/consts";


const Profile = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

    function uploadHandler(e) {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file))
    }

    return (
        <div className="container p-3">
            <input accept="image/*" onChange={(e)=>uploadHandler(e)} type="file" placeholder="Добавить аватар"/>
            <button type="button" className="btn btn-outline-secondary" onClick={()=>dispatch(deleteAvatar())}>Удалить аватар</button>
            <button style={{marginLeft:7}} type="button" className="btn btn-outline-secondary" onClick={()=>navigate(DISK_ROUTE)}>Назад</button>
        </div>
    );
};

export default Profile;
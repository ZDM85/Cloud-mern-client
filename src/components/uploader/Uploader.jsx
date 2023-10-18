import React from "react";
import UploadFile from "./UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { hideUploader } from "../../reducers/uploadReducer";
import "./uploader.css";


const Uploader = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector(state => state.upload.isVisible);
    const files = useSelector(state => state.upload.files);

    return ( isVisible &&
        <div className="uploader">
            <div className="uploader_header">
                <div className="uploader_title">Загрузки</div>
                <button type="button" className="uploader_close btn btn-outline-dark" onClick={()=>dispatch(hideUploader())}>X</button>
            </div>
            {files.map(file => 
                <UploadFile key={file.id} file={file}/>
            )}
        </div>
    );
};

export default Uploader;
import React from "react";
import { useDispatch } from "react-redux";
import { removeFileUpload } from "../../reducers/uploadReducer";
import "./uploadfile.css";


const UploadFile = ({file}) => {
    const dispatch = useDispatch();
    
    return (
        <div className="uploadfile">
            <div className="uploadfile_header">
                <div className="uploadfile_title">{file.name}</div>
                <button type="button" className="uploadfile_remove btn btn-outline-dark" onClick={()=>dispatch(removeFileUpload(file.id))}>X</button>
            </div>
            <div className="uploadfile_progress_bar">
                <div className="uploadfile_upload_bar" style={{width: file.progress + "%"}}/>
                <div className="uploadfile_progress">{file.progress}%</div>
            </div>
        </div>
    );
};

export default UploadFile;
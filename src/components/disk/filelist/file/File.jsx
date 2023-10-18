import React from "react";
import "./file.css";
import fileLogo from "../../../../assets/img/file.svg";
import dirLogo from "../../../../assets/img/dir.svg";
import sizeFormat from "../../../../utils/sizeFormat";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile, getFiles } from "../../../../http/fileApi";

const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const fileView = useSelector(state => state.file.view);
    

    function openDirHandler() {
        if (file.type === "dir") {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    function downloadHandler(e) {
        e.stopPropagation();
        downloadFile(file);
    }

    function deleteHandler(e) {
        e.stopPropagation();
        dispatch(deleteFile(file));
        dispatch(getFiles(currentDir));
    }

    if (fileView === "list") {
        return (
            <div className="file" onClick={openDirHandler}>
                <img src={file.type === "dir" ? dirLogo : fileLogo} className="file_img"/>
                <div className="file_name">{file.name}</div>
                <div className="file_date">{file.date.slice(0,10)}</div>
                <div className="file_size">{sizeFormat(file.size)}</div>
                {file.type !== "dir" && <button  type="button" className="file_1 btn btn-outline-secondary m-1" onClick={(e)=>downloadHandler(e)}>Загрузить</button>}
                <button  type="button" className="file_2 btn btn-outline-danger m-1" onClick={(e)=>deleteHandler(e)}>Удалить</button>
            </div>
        );
    }

    
    if (fileView === "plate") {
        return (
            <div className="fileplate" onClick={openDirHandler}>
                <img src={file.type === "dir" ? dirLogo : fileLogo} className="fileplate_img"/>
                <div className="fileplate_name">{file.name}</div>
                <div className="fileplate_btns">
                    {file.type !== "dir" && <button  type="button" className="fileplate_btn fileplate_1 btn btn-outline-secondary m-1" onClick={(e)=>downloadHandler(e)}>Загрузить</button>}
                    <button  type="button" className="fileplate_btn fileplate_2 btn btn-outline-danger m-1" onClick={(e)=>deleteHandler(e)}>Удалить</button>
                </div>
            </div>
        );
    }
};

export default File;
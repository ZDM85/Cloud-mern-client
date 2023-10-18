import React from "react";
import "./filelist.css";
import { useSelector } from "react-redux";
import File from "./file/File";


const FileList = () => {
    const files = useSelector(state => state.file.files);
    const fileView = useSelector(state => state.file.view);


    if (fileView === "list") {
        return (
            <div className="filelist">
                <div className="filelist_header">
                    <div className="filelist_name">Название</div>
                    <div className="filelist_date">Дата</div>
                    <div className="filelist_size">Размер</div>
                </div>
                {files.map(file => 
                    <File key={file._id} file={file}/>    
                )}
            </div>
        );
    }

    if (fileView === "plate") {
        return (
            <div className="file-plate">
                {files.map(file => 
                    <File key={file._id} file={file}/>    
                )}
            </div>
        );
    }

    
};

export default FileList;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFile } from "../../http/fileApi";



const Popup = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const [dirName, setDirName] = useState(""); 

    function createDirHandler() {
        dispatch(createFile(currentDir, dirName));
    }

    return (
        <div className="modal fade" id="createPopup"aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <input 
                        value={dirName}
                        onChange={(e)=>setDirName(e.target.value)}
                        placeholder="Введите название папки..."
                        type="text" 
                        className="form-control mt-3"
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={()=>createDirHandler()} type="button" className="btn btn-primary">Создать</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
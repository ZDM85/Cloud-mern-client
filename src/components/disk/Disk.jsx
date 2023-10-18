import React, { useEffect, useState } from "react";
import FileList from "./filelist/FileList";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../http/fileApi";
import Popup from "./Popup";
import { deleteLastDirStack, setCurrentDir, setView } from "../../reducers/fileReducer";
import Uploader from "../uploader/Uploader";
import "./disk.css";
import plate from "../../assets/img/plate.svg";
import list from "../../assets/img/list.svg";



const Disk = () => {

    const dispatch = useDispatch();
    const dirStack = useSelector(state => state.file.dirStack);
    const currentDir = useSelector(state => state.file.currentDir);
    const loading = useSelector(state => state.app.loading);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState("type");

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function backDirHandler() {
        const backDirId = dirStack.at(-1);
        dispatch(deleteLastDirStack());
        dispatch(setCurrentDir(backDirId));
    }

    function uploadFileHandler(e) {
        const files = [...e.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
    }

    function dragEnterHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        setDragEnter(true);
    }

    function dragLeaveHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        setDragEnter(false);
    }

    function dropHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        const files = [...e.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    }

    if (loading) {
        return <div className="spinner">
                <div className="lds-dual-ring"></div>
            </div>
    }

    
    return (!dragEnter ? 
        <div className="container" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="d-flex mt-3 align-items-center">
                <div className="col-md-1">
                    <button onClick={()=>backDirHandler()} type="button" className="btn btn-outline-secondary">Назад</button>
                </div>
                <div className="col-md-1.5">
                    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#createPopup">
                        Создать папку
                    </button>
                </div>
                <div style={{marginLeft: 25}} className="col-md-6 d-flex align-items-center">
                    <div className="p-1 bg-secondary bg-opacity-10 border border-secondary rounded">
                        <label style={{cursor:"pointer"}} htmlFor="form-input" className="form-label">Загрузить</label>
                        <input multiple={true} onChange={(e)=>uploadFileHandler(e)} style={{display:"none"}} type="file" id="form-input" className="form-input"/>
                    </div>
                </div>
                <div style={{marginRight: 10}} className="col-md-1.5">
                    <select value={sort} onChange={(e)=>setSort(e.target.value)} className="form-select" aria-label="Default select example">
                        <option value="name">По имени</option>
                        <option value="type">По типу</option>
                        <option value="date">По дате</option>
                    </select>
                </div>
                <div className="col-md-1 d-flex align-items-center justify-content-between">
                    <button className="m-1 p-1 border-light" onClick={()=>dispatch(setView("plate"))}>
                        <img src={plate} alt="" width={25} height={25} className="file_plate"/>
                    </button>
                    <button className="m-1 p-1 border-light" onClick={()=>dispatch(setView("list"))}>
                        <img src={list} alt="" width={25} height={25} className="file_list"/>
                    </button>
                </div>
            </div>
            <FileList/>
            <Popup/>
            <Uploader/>            
        </div>
        :
        <div 
            style={{height: window.innerHeight - 170, fontSize:45}} 
            className="p-3 m-5 bg-secondary bg-opacity-10 border border-secondary rounded 
                d-flex justify-content-center align-items-center" 
            onDragEnter={dragEnterHandler} 
            onDragLeave={dragLeaveHandler} 
            onDragOver={dragEnterHandler}
            onDrop={dropHandler}
        >
            Перетащите файлы сюда
        </div>
    );
};

export default Disk;
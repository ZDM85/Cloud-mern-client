import $api from ".";
import { API_URL } from "../utils/consts";
import { addFile, deleteFileAction, setFile } from "../reducers/fileReducer";
import { addFileUpload, changeFileUpload, showUploader } from "../reducers/uploadReducer";
import { hideLoading, showLoading } from "../reducers/appReducer";



export const getFiles = (dirId, sort) => {
    return async dispatch => {
        try {
            dispatch(showLoading())
            let url = `${API_URL}/api/files`;
            if (dirId) {
                url = `${API_URL}/api/files?parent=${dirId}`
            }
            if (sort) {
                url = `${API_URL}/api/files?sort=${sort}`
            }
            if (dirId && sort) {
                url = `${API_URL}/api/files?parent=${dirId}&sort=${sort}`
            }
            const response = await $api.get(url);
            dispatch(setFile(response.data));
        } catch (e) {
            console.log(e.response.data.message);
        } finally {
            dispatch(hideLoading())
        }
    }
}


export const createFile = (dirId, name) => {
    return async dispatch => {
        try {
            const response = await $api.post(`${API_URL}/api/files`, 
            {
                name,
                type: "dir",
                parent: dirId
            });
            dispatch(addFile(response.data));
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export const uploadFile = (file, dirId) => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            if (dirId) {
                formData.append("parent", dirId);
            }
            let uploadFile = {name: file.name, progress: 0, id: Date.now()};
            dispatch(showUploader());
            dispatch(addFileUpload(uploadFile));
            const response = await $api.post(`${API_URL}/api/files/upload`, formData,
            {
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.event.lengthComputable ? progressEvent.total : progressEvent.event.target.gerResponseHeader("content-length") || progressEvent.event.target.gerResponseHeader("x-decompressed-content-length");
                    console.log("total", totalLength);
                    if (totalLength) {
                        let upFile = {...uploadFile};
                        upFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
                        uploadFile = {...upFile};
                        dispatch(changeFileUpload(uploadFile));
                    }
                }
            });
            dispatch(addFile(response.data));
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export const downloadFile = async(file) => {
    const response = await fetch(`${API_URL}/api/files/download?id=${file._id}`, 
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob();
        const dowloadFile = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = dowloadFile;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export const deleteFile = (file) => {
    return async dispatch => {
        try {
            const response = await $api.delete(`${API_URL}/api/files?id=${file._id}`, 
            );
            dispatch(deleteFileAction(response.data));
            alert(response.data.message);
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export const searchFile = (search) => {
    return async dispatch => {
        try {
            const response = await $api.get(`${API_URL}/api/files/search?search=${search}`, 
            );
            dispatch(setFile(response.data));
        } catch (e) {
            console.log(e.response.data.message);
        } finally {
            dispatch(hideLoading());
        }
    }
}
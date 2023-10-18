const { createSlice } = require("@reduxjs/toolkit");



const uploadReducer = createSlice({
    name: "upload",
    initialState: {
        isVisible: false,
        files: [],
    },
    reducers: {
        showUploader(state) {
            state.isVisible = true;
        },
        hideUploader(state) {
            state.isVisible = false;
        },
        addFileUpload(state, action) {
            state.files.push(action.payload);
        },
        removeFileUpload(state, action) {
            state.files = state.files.filter(file => file.id !== action.payload);
        },
        changeFileUpload(state, action) {
            state.files = state.files.map(file => file.id === action.payload.id 
                ? {...file, progress: action.payload.progress}
                : {...file}
            );
        }
    }
});

export default uploadReducer.reducer;
export const {showUploader, hideUploader, addFileUpload, removeFileUpload, changeFileUpload} = uploadReducer.actions;
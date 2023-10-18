const { createSlice } = require("@reduxjs/toolkit");



const fileReducer = createSlice({
    name: "files",
    initialState: {
        files: [],
        currentDir: null,
        dirStack: [],
        view: "list"
    },
    reducers: {
        setFile(state, action) {
            state.files = action.payload;
        },
        deleteFileAction(state, action) {
            state.files = state.files.filter(file => file._id !== action.payload);
        },
        setCurrentDir(state, action) {
            state.currentDir = action.payload;
        },
        addFile(state, action) {
            state.files.push(action.payload);
        },
        pushToStack(state, action) {
            state.dirStack.push(action.payload);
        },
        deleteLastDirStack(state) {
            state.dirStack.pop();
        },
        setView(state, action) {
            state.view = action.payload
        }
    }
});

export default fileReducer.reducer;
export const {setView, setFile, setCurrentDir, addFile, pushToStack, deleteLastDirStack, deleteFileAction} = fileReducer.actions;
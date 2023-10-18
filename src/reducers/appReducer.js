const { createSlice } = require("@reduxjs/toolkit");



const appReducer = createSlice({
    name: "app",
    initialState: {
        loading: false
    },
    reducers: {
        showLoading(state) {
            state.loading = true;
        },
        hideLoading(state) {
            state.loading = false;
        }
    }
});

export default appReducer.reducer;
export const {showLoading, hideLoading} = appReducer.actions;
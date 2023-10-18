const { createSlice } = require("@reduxjs/toolkit");



const userReducer = createSlice({
    name: "user",
    initialState: {
        isAuth: false,
        currentUser: {}
    },
    reducers: {
        setUsers(state, action) {
            state.isAuth = true;
            state.currentUser = action.payload;
        },
        logoutAction(state) {
            state.isAuth = false;
            state.currentUser = {};
        }
    }
});

export default userReducer.reducer;
export const {setUsers, logoutAction} = userReducer.actions;
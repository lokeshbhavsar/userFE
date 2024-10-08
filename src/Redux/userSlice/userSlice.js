// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    username: '',
    webSocket:false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Set user information and login status
        setUserInfo: (state, action) => {
            state.username = action.payload.username;
            state.isLoggedIn = true;
        },
        setWebSocket: (state, action) => {
            state.webSocket = !state.webSocket ;
        },
        // Log out user and clear user information
        logOut: (state) => {
            state.username = '';
            state.isLoggedIn = false;
        },
        // Reset user state to initial values
        resetUserState: () => initialState,
    },
});

export const { setUserInfo, logOut, resetUserState,setWebSocket } = userSlice.actions;
export default userSlice.reducer;

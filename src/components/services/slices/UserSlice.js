import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
        isAuthenticated: !!localStorage.getItem('userInfo'),
    },
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            state.isAuthenticated = false;
            localStorage.removeItem('userInfo');
        },
    },
});


export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;
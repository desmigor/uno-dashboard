import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    isPassword: false,
    type: null,
    success: false,
    refreshToken: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.userToken = null;
            state.refreshToken = null;
            state.userInfo = {};
            state.success = false;
            state.type = null;
        },
        login: (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.isPassword = false;
            state.type = payload.type
            state.userInfo = { full_name: payload.ac.data.full_name, email: payload.ac.data.email, profile_photo_link: payload.ac.data.profile_photo_link, type: { id: 2 } };
            state.refreshToken = payload.ac.data.refresh;
            state.userToken = payload.ac.data.access;
        },
        update_token: (state, { payload }) => {
            state.userToken = payload;
        },
        errorLogin: (state, { payload }) => {
            state.error = payload.message;
            state.isPassword = payload.isPassword;
            state.success = false;
            state.loading = false;
        }
    },

})

export const { logout, login, errorLogin, update_token } = authSlice.actions;
export default authSlice.reducer;

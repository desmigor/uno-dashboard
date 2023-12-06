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
        startLoading: (state) => {
            state.loading = true;
        },
        login: (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.isPassword = false;
            state.type = payload.type
            state.userInfo = { full_name: payload.ac.data.full_name, email: payload.ac.data.email, profile_photo_link: payload.ac.data.profile_photo_link, type: { id: payload.ac.data.groups[0].id } };
            state.refreshToken = payload.ac.data.refresh;
            state.userToken = payload.ac.data.access;
        },
        update_token: (state, { payload }) => {
            state.userToken = payload;
        },
        update_user_info: (state, { payload }) => {
            // update user info for given data (payload) and ones not given, keep the old data
            state.userInfo = { 
                full_name: payload.full_name ? payload.full_name : state.userInfo.full_name,
                email: payload.email ? payload.email : state.userInfo.email,
                profile_photo_link: payload.profile_photo_link ? payload.profile_photo_link : state.userInfo.profile_photo_link,
                type: payload.type ? payload.type : state.userInfo.type,
            };
        },
        errorLogin: (state, { payload }) => {
            state.error = payload.message;
            state.isPassword = payload.isPassword;
            state.success = false;
            state.loading = false;
        }
    },

})

export const { logout, login, errorLogin, update_token, startLoading, update_user_info } = authSlice.actions;
export default authSlice.reducer;

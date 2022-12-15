import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "auth",
    initialState: {
        id: null,
        firstname: null,
        lastname: null,
        phone: null,
        avatar: null,
        email: null,
    },
    reducers: {
        login(state, action) {
            localStorage.setItem("token", action.payload.token);
            state.id = action.payload.id;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.phone = action.payload.phone;
            state.avatar = action.payload.avatar;
            state.email = action.payload.email;
        },
        logout(state) {
            localStorage.removeItem("token");
            state.id = null;
            state.firstname = null;
            state.lastname = null;
            state.phone = null;
            state.avatar = null;
            state.email = null;
        },
        updateUserData(state, action) {
            state.id = action.payload.id;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.phone = action.payload.phone;
            state.avatar = action.payload.avatar;
            state.email = action.payload.email;
        },
        updateUser(state, action) {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
        },
        updateAvatar(state, action) {
            state.avatar = action.payload.avatar;
        },
    },
});

export const { login, updateUserData, logout, updateUser, updateAvatar } =
    userSlice.actions;
export default userSlice.reducer;

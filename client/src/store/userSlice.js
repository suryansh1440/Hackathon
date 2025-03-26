import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    mobile: "",
    verify_email: false,
    last_login:"",
    status:"",
    address_details:"",
    course:[],
    role: "",
    correctAnswer:0,
    wrongAnswer:0,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload?._id;
            state.name = action.payload?.name;
            state.email = action.payload?.email;
            state.avatar = action.payload?.avatar;
            state.mobile = action.payload?.mobile;
            state.verify_email = action.payload?.verify_email;
            state.last_login = action.payload?.last_login;
            state.status = action.payload?.status;
            state.address_details = action.payload?.address_details;
            state.course = action.payload?.course;
            state.role = action.payload?.role;
            state.correctAnswer = action.payload?.correctAnswer;
            state.wrongAnswer = action.payload?.wrongAnswer;
        },
        updateUserAvatar: (state, action) => {
            state.avatar = action.payload?.avatar;
        },
        logout: (state) => {
            state._id = "";
            state.name = "";
            state.email = "";
            state.avatar = "";
            state.mobile = "";
            state.verify_email = false;
            state.last_login = "";
            state.status = "";
            state.address_details = [];
            state.course = [];
            state.role = "";
            state.correctAnswer  = 0;
            state.wrongAnswer = 0;
        }
    }
})

export const { setUserDetails, logout, updateUserAvatar } = userSlice.actions;
export default userSlice.reducer;
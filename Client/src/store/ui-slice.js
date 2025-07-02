import {createSlice} from "@reduxjs/toolkit";

const initialState = {themeModalIsOpen:false,editProfileModalOpen:false,
    editProfileModalOpen:false,editPostId:"",theme:JSON.parse(localStorage.getItem("theme")) || {primaryColor : "",backgroundColor:""}
}

const uiSlice = createSlice({
    name:"ui",
    initialState ,
    reducers : {
        openThemeModal : state=>{
                state.themeModalIsOpen = true
        } ,
        closeThemeModal : state=>{
                state.themeModalIsOpen = false
        } ,
        openThemeModal : (state,action)=>{
                state.theme = action.payload
        } ,
        openEditProfileModal :state=>{
            state.editProfileModalOpen = true
        },
        closeEditProfileModal :state=>{
            state.editProfileModalOpen = false
        },
        openEditPostModal :(state,action)=>{
            state.editPostModalOpen = true
            state.editPostId = action.payload
        },
        closeEditPostModal :state=>{
            state.editPostModalOpen = false
        },

    }
})

export const  uiActions =uiSlice.actions;
export default uiSlice;
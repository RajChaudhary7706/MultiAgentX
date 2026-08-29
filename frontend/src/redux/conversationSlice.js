import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: "conversations",
    initialState: {
        conversations:[],
        selectedConversation:null
    },
    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload
        },
        addConversations:(state,action)=>{
            state.conversations.unshift(action.payload)
        },
        setSelectedConversations:(state,action)=>{
            state.selectedConversation=action.payload
        }
    }
})

export const {setConversations,addConversations,setSelectedConversations} = conversationSlice.actions
export default conversationSlice.reducer

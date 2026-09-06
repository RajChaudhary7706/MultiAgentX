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
        },
        setConvTitle:(state,action)=>{
            const {title,conversationId}=action.payload
            state.conversations=state.conversations.map((conv)=>(
                conv._id===conversationId?(
                    {...conv,title}
                ):conv
            ))
            if(state.selectedConversation?._id==conversationId){
                state.selectedConversation={...state.selectedConversation,title}
            }
        }
    }
})

export const {setConversations,addConversations,setSelectedConversations,setConvTitle} = conversationSlice.actions
export default conversationSlice.reducer

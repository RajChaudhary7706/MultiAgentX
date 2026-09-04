import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Nav from "./Nav";
import getMessage from "../features/getMessage";
import { setMessages } from "../redux/messageSlice";

function ChatArea() {
  const {selectedConversation} = useSelector((state) => state.conversation)
  const {messages} = useSelector((state) => state.message)
  const dispatch = useDispatch()
  useEffect(()=>{
    const getMess = async()=>{
      if(selectedConversation){
        const data = await getMessage(selectedConversation?._id)
        dispatch(setMessages(data))
      }
      
    }
    getMess()
  },[dispatch, selectedConversation])

  return (
    <div className='flex-1 flex flex-col h-screen overflow-hidden'>
      <Nav/>
      <MessageList/>
      <ChatInput/>
    </div>
  )
}

export default ChatArea;

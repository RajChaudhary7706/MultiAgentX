import React from 'react'
import api from '../utils/axios'

async function getMessage(id) {
    try{
        const {data} = await api.get(`/api/chat/get-message/${id}`)
        return data;
    }catch(error){
        console.error("Error occurred while getting message:", error)
        throw error;
    }
}

export default getMessage
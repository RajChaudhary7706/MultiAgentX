import api from '../utils/axios'

async function sendMessage(payload) {
    try {
        const { data } = await api.post('/api/agent/chat', payload)
        return data
    } catch (error) {
        console.error('Send message failed:', error?.response?.data || error?.message || error)
        return null
    }
}

export default sendMessage

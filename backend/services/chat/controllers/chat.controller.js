import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const createConversation = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        console.log("chat", userId)
        const conversation = await Conversation.create({
            userId: userId
        })
        return res.status(200).json(conversation)
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to create conversation" })
    }
}

export const getConversation = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        console.log("chat", userId)
        const conversation = await Conversation.find({
            userId: userId
        }).sort({ updateAt: -1 })

        return res.status(200).json(conversation)
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to get conversation" })
    }

}
export const updateConversation = async (req, res) => {
    try {
        const { id, title } = req.body
        const conversation = await Conversation.findByIdAndUpdate(id, { title }, { new: true })

        return res.status(200).json(conversation)
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to update conversation" })
    }
}

export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content } = req.body
        const message = await Message.create({
            conversationId,
            role,
            content
        })
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(500).json({ message: `Unable to save message ${error}` })
    }
}

export const getMessages = async (req, res) => {
    try {

        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(500).json({ message: `Unable to get message ${error}` })
    }
}
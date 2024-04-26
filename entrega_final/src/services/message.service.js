import { MessageDAO } from "../daos/index.js";
import UserService from "./user.service.js";
import { getHourAndMinutes, logger } from "../utils/index.js";

class MessageService {
    constructor() {}

    // async getAllMessages() {
    //     try {
    //         const messages = await MessageDAO.getAll();
    //         if (messages === null || messages === undefined) {
    //             logger.warn("No messages found.");
    //             return [];
    //         }
    //         return messages;
    //     } catch (err) {
    //         logger.error(`Error in getAllMessages: ${err.message}`);
    //         throw new Error(`Failed to fetch messages: ${err.message}`);
    //     }
    // }

    async getMessagesByUserId(user_id) {
        try {
            const user = await UserService.getUserById(user_id);
            if (!user) {
                logger.warn(`User not found with ID: ${user_id}`);
                return [];
            }
            return user.messages;
        } catch (err) {
            logger.error(`Error in getMessagesByUserId: ${err.message}`);
            throw new Error(`Failed to fetch messages for user ID ${user_id}: ${err.message}`);
        }
    }

    async createMessage(body, user_id) {
        try {
            const user = await UserService.getUserById(user_id);
            if (!user) {
                throw new Error(`User not found with ID: ${user_id}`);
            }
            const newMessage = {
                user_id,
                email: user.email,
                message: body.message,
                hour: getHourAndMinutes(new Date()),
                image: user.image,
            };
            const createdMessage = await MessageDAO.create(newMessage);
            await UserService.addMessageToUserById(user_id, createdMessage);
            return createdMessage;
        } catch (err) {
            logger.error(`Error in createMessage: ${err.message}`);
            throw new Error(`Failed to create message: ${err.message}`);
        }
    }

    async addReplyToMessageById(message_id, body, user_replier_id) {
        try {
            const replier = await UserService.getUserById(user_replier_id);
            if (!replier) {
                throw new Error(`User (replier) not found with ID: ${user_replier_id}`);
            }
            const message = await this.getMessageById(message_id);
            if (!message) {
                throw new Error(`Message not found with ID: ${message_id}`);
            }
            const newReply = {
                user_id: user_replier_id,
                email: replier.email,
                message: body.message,
                hour: getHourAndMinutes(new Date()),
                image: replier.image,
            };
            const messageUpdated = await MessageDAO.addReplyToMessageById(message_id, newReply);
            let messages = await this.getAllMessages();
            messages = messages.filter(message => message._id !== message_id);
            messages.push(messageUpdated);
            await UserService.updateUserMessagesById(message.user_id, messages);
            return this.getAllMessages();
        } catch (err) {
            logger.error(`Error in addReplyToMessageById: ${err.message}`);
            throw new Error(`Failed to add reply: ${err.message}`);
        }
    }
}

export default new MessageService();

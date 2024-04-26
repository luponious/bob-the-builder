import dotenv from 'dotenv';
dotenv.config();

export const config = {
    // Environment mode
    NODE_ENV: process.env.NODE_ENV || 'development',
    // Persistence type
    PERS: process.env.PERS || 'mongo',
    // Port
    PORT: process.env.PORT || 3000,
    // MongoDB URI
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/e_book_final',
    // MongoDB Atlas URI
    MONGODB_ATLAS_URI: process.env.MONGODB_ATLAS_URI || 'mongodb+srv://ADMIN_potatoe:VETO0SF01mn03yPu@monkeycluster.ahtabg2.mongodb.net/?retryWrites=true&w=majority&appName=MonkeyCluster',
    // Twilio Account SID
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
    // Twilio Auth Token
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
    // Twilio Phone Number
    TWILIO_PHONE: process.env.TWILIO_PHONE || '',
    // Nodemailer user
    NODEMAILER_USER: process.env.NODEMAILER_USER || '',
    // Nodemailer password
    NODEMAILER_PASS: process.env.NODEMAILER_PASS || '',
    // Nodemailer from address
    NODEMAILER_FROM: process.env.NODEMAILER_FROM || '',
    // JWT Secret Token
    JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN || '',
};

// Additional variables
export const MODO_EJECUCION = process.env.MODO_EJECUCION || 'offline';
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR || 'mongodb://localhost:27017/e_book_final';

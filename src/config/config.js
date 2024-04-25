console.log('cargando config')

export const MODO_EJECUCION = 'online'
// export const MODO_EJECUCION = 'offline'

export const PORT = 8080
export const MONGODB_CNX_STR = 'mongodb://localhost/libreria'

//Encript and cookies
export const COOKIE_SECRET = 'CookieMonsterSecret'
export const SESSION_SECRET = 'SecretWithBanana'
export const JWT_PRIVATE_KEY = 'jwtSecret'

export const ADMIN_EMAIL = 'admin.admin@gmail.com'

//[CLASE 16 MAILING POR IMPLEMENTAR]
// export const ADMIN_SMS_NUMBER = process.env.ADMIN_SMS_NUMBER
// export const NODEMAILER_GMAIL_OPTIONS = {
//   service: 'gmail',
//   port: '587',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// }
// export const TWILIO_SMS_OPTIONS = {
//   sid: process.env.TWILIO_SID,
//   authToken: process.env.TWILIO_TOKEN,
//   origin: process.env.TWILIO_SMS_NUMBER
// }
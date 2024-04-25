import { Schema } from 'mongoose'
import { randomUUID } from 'node:crypto'

export const usersSchema = new Schema({
  _id: { type: String, default: randomUUID },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['user', 'premium', 'admin'], default: 'user' }
}, {
  strict: 'throw',
  versionKey: false
})

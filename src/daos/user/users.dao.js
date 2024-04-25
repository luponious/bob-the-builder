import { model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js'

import { usersDaoMongoose } from './mongoose/users.dao.mongoose.js'
import { usersDaoFiles } from './users.dao.files.js'
import { usersSchema } from './mongoose/users.model.mongoose.js'

const RUTA_userS_JSON = '../../../db/users.json'

let daousers

if (MODO_EJECUCION === 'online') {
  if (!daousers) {
    const usersModel = model('users', usersSchema)
    daousers = new usersDaoMongoose(usersModel)
    console.log('Persistencia users en mongodb')
  }
} else {
  daousers = new usersDaoFiles(RUTA_userS_JSON)
  console.log('Persistencia local')
}

export function getDaousers() {
  return daousers
} 

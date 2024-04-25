import { connect, model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js'
import { MONGODB_CNX_STR } from '../../config/config.js'

import { LibrosDaoMongoose } from './mongoose/libros.dao.mongoose.js'
import { LibrosDaoFiles } from './libros.dao.files.js'
import { librosSchema } from './mongoose/libros.model.mongoose.js'

const RUTA_userS_JSON = './db/libros.json'

const daoLibros = MODO_EJECUCION === 'online'
  ? new LibrosDaoMongoose(model('libros', librosSchema))
  : new LibrosDaoFiles(RUTA_userS_JSON);

if (MODO_EJECUCION === 'online') {
  console.log('Libros de: mongodb');
} else {
  console.log('Libros existiendo en: sistema de archivos');
}

export { daoLibros };

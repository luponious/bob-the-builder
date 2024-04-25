import { toPOJO } from '../../utils/utils.js'

export class LibrosDaoMongoose {
  constructor(librosModel) {
    this.librosModel = librosModel
  }

  async create(data) {
    const libro = await this.librosModel.create(data)
    return toPOJO(libro)
  }

  async readOne(query) {
    const libros = await this.librosModel.findOne(query).lean()
    return toPOJO(libros)
  }

  async readMany(query) {
    return toPOJO(await this.librosModel.find(query).lean())
  }

}

let librosDaoMongoose
console.log('Usando persistencia en mongodb')

export async function getDaoMongoose() {
  if (!librosDaoMongoose) {
    await connect(MONGODB_CNX_STR)
    console.log('conectado a mongodb')
    librosDaoMongoose = new LibrosDaoMongoose()
  }
  return librosDaoMongoose
}
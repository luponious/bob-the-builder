import fs from 'fs/promises'
import { matches } from '../utils/utils.js'
export class usersDaoFiles {

  constructor(path) {
    this.path = path
  }

  async #readusers() {
    return JSON.parse(await fs.readFile(this.path, 'utf-8'))
  }

  async #writeusers(users) {
    await fs.writeFile(this.path, JSON.stringify(users, null, 2))
  }

  async create(userPojo) {
    const users = await this.#readusers()
    users.push(userPojo)
    await this.#writeusers(users)
    return userPojo
  }

  async readOne(query) {
    const users = await this.#readusers()
    const buscado = users.find(matches(query))
    return buscado
  }

  async readMany(query) {
    const users = await this.#readusers()
    const buscados = users.filter(matches(query))
    return buscados
  }

  async updateOne(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async updateMany(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteOne(query) {
    const users = await this.#readusers()
    const indexBuscado = users.findIndex(matches(query))
    if (indexBuscado !== -1) {
      const [buscado] = users.splice(indexBuscado, 1)
      await this.#writeusers(users)
      return buscado
    }
    return null
  }
}
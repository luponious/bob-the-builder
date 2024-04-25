import fs from 'fs/promises'
import { matches } from '../utils/utils.js'

export class TiendasDaoFiles {
    constructor(path) {
        this.path = path
    }

    async #readFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            // If the file doesn't exist, return an empty array
            if (error.code === 'ENOENT') {
                return []
            }
            throw error
        }
    }

    async #writeFile(tiendas) {
        await fs.writeFile(this.path, JSON.stringify(tiendas, null, 2))
    }

    async create(tiendaPojo) {
        const tiendas = await this.#readFile()
        tiendas.push(tiendaPojo)
        await this.#writeFile(tiendas)
        return tiendaPojo
    }

    async readOne(query) {
        const tiendas = await this.#readFile()
        const buscado = tiendas.find(matches(query))
        return buscado
    }

    async readMany(query) {
        const tiendas = await this.#readFile()
        const buscados = tiendas.filter(matches(query))
        return buscados
    }

    async updateOne(query, data) {
        const tiendas = await this.#readFile()
        const indexBuscado = tiendas.findIndex(matches(query))
        if (indexBuscado !== -1) {
            const nuevo = {
                ...tiendas[indexBuscado],
                ...data
            }
            tiendas[indexBuscado] = nuevo
            await this.#writeFile(tiendas)
            return nuevo
        }
        return null
    }

    async updateMany(query, data) {
        throw new Error('NOT IMPLEMENTED')
    }

    async deleteOne(query) {
        const tiendas = await this.#readFile()
        const indexBuscado = tiendas.findIndex(matches(query))
        if (indexBuscado !== -1) {
            const eliminado = tiendas.splice(indexBuscado, 1)[0]
            await this.#writeFile(tiendas)
            return eliminado
        }
        return null
    }

    async deleteMany(query) {
        const tiendas = await this.#readFile()
        const eliminados = tiendas.filter(matches(query))
        const actualizados = tiendas.filter(tienda => !matches(query)(tienda))
        await this.#writeFile(actualizados)
        return eliminados
    }
}

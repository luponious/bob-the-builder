import { randomUUID } from 'node:crypto'

export class Tienda {
    #_id
    #nombre
    #libros
    constructor({ _id = randomUUID(), nombre }) {
        this.#_id = _id
        this.nombre = nombre
        this.#libros = []
    }

    get _id() { return this.#_id }
    get nombre() { return this.#nombre }
    get libros() { return this.#libros }

    set nombre(value) {
        if (!value) throw new Error('Nombre es obligatorio')
        this.#nombre = value
    }

    toPOJO() {
        return {
            _id: this.#_id,
            nombre: this.#nombre,
            libros: this.#libros
        }
    }
}
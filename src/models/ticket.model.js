import { randomUUID } from 'node:crypto'

export class Ticket {
    #_id
    #purchaseDatetime
    #amount
    #user
    #libros
    
    constructor({ _id = randomUUID(), purchaseDatetime, amount, user, libros }) {
        this.#_id = _id
        this.#purchaseDatetime
        this.#amount
        this.#user
        this.#libros = []
    }    

    get code() { return this.#_id }
    get purchaseDatetime() { return this.#purchaseDatetime }
    get amount() { return this.#amount }
    get user() { return this.#user }
    get libros() { return this.#libros }

    toPOJO() {
        return {
            code: this.#_id,
            purchaseDatetime: this.purchaseDatetime,
            user: this.#user,
            amount: this.#amount,
            libros: this.#libros
        }    
    }    
}    

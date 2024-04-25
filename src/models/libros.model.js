import { randomUUID } from 'crypto'

export class Libro {
    #_id;
    #title;
    #price;
    #description;
    #thumbnail;
    #code;
    #status;
    #stock;
    #category;
    #timestamp;
//CONTRUCTOR OF WORLDS AND MORE MUAHAHAHAHAHA (perdon estoy perdiendo la cabeza jaja)
    constructor({
        title,
        description,
        price,
        code,
        stock,
        category,
        thumbnail = '',
        status = true,
        _id = crypto.randomUUID(),
    }) {
        if (!title || !description || !price || !code || !stock || !category) {
            throw new Error("Todos los espacions son mandatorios.");
        }

        this.#_id = _id;
        this.#title = title;
        this.#description = description;
        this.#price = price;
        this.#thumbnail = thumbnail;
        this.#code = code;
        this.#status = status;
        this.#stock = stock;
        this.#category = category;
        this.#timestamp = Date.now();
    }
//GETTERS
    get _id() {
        return this.#_id;
    }

    get title() {
        return this.#title;
    }

    get price() {
        return this.#price;
    }

    get description() {
        return this.#description;
    }

    get thumbnail() {
        return this.#thumbnail;
    }

    get code() {
        return this.#code;
    }

    get status() {
        return this.#status;
    }

    get stock() {
        return this.#stock;
    }

    get category() {
        return this.#category;
    }

    get timestamp() {
        return this.#timestamp;
    }
//SETTERS
    set title(newTitle) {
        if (!newTitle) throw new Error("Title cannot be empty.");
        this.#title = newTitle;
    }

    set price(newPrice) {
        if (typeof newPrice !== "number" || newPrice <= 0) {
            throw new Error("Price must be a positive number.");
        }
        this.#price = newPrice;
    }

    getTotalValue() {
        return this.price * this.stock;
    }

    isAvailable() {
        return this.status && this.stock > 0;
    }

    formatTimestamp() {
        return new Date(this.timestamp).toLocaleString();
    }

    toPOJO() {
        return {
            _id: this.#_id,
            title: this.#title,
            price: this.#price,
            description: this.#description,
            thumbnail: this.#thumbnail,
            code: this.#code,
            status: this.#status,
            stock: this.#stock,
            category: this.#category,
            timestamp: this.#timestamp,
        };
    }
}

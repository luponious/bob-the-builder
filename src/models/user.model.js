import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';

export class User {
    #_id
    #nombre
    #email
    #passwordHash

    constructor({ _id = randomUUID(), nombre, email, password }) {
        this.#_id = _id;
        this.nombre = nombre;
        this.email = email;
        this.passwordHash = this.#hashPassword(password);
    }

    get _id() { return this.#_id; }
    get nombre() { return this.#nombre; }
    get email() { return this.#email; }
    get passwordHash() { return this.#passwordHash; }
    set nombre(value) {
        if (!value) throw new Error('El nombre es obligatorio');
        this.#nombre = value;
    }

    set email(value) {
        if (!value) throw new Error('El email es obligatorio');
        this.#email = value;
    }

    set passwordHash(value) {
        if (!value) throw new Error('El hash de la contraseña es obligatorio');
        this.#passwordHash = value;
    }


    #hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hashSync(password, saltRounds);
    }

    toPOJO() {
        return {
            _id: this.#_id,
            nombre: this.#nombre,
            email: this.#email,
            passwordHash: this.#passwordHash 
        };
    }

    checkPassword(password) {
        return bcrypt.compareSync(password, this.#passwordHash);
    }
}

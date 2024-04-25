import { Tienda } from '../models/tienda.model.js';


export class TiendasService {
    constructor({ tiendasDao, librosService }) {
        this.tiendasDao = tiendasDao
        this.librosService = librosService
    }

    async registrar(datosTienda) {
        const tienda = new Tienda(datosTienda)
        const tiendaPojo = await this.tiendasDao.create(tienda.toPOJO())

        return tiendaPojo
    }

    async agregarLibro(idTienda, idLibro) {

        const tienda = await this.tiendasDao.readOne({ _id: idTienda })
        if (!tienda) {
            throw new Error('La tienda no existe')
        }

        const libro = await this.librosService.readOne({ _id: idlibro })
        if (!libro) {
            throw new Error('El libro no existe')
        }

        tienda.libros.push(idLibro)

        await this.tiendasDao.updateOne({ _id: idTienda }, tienda)
    }
}

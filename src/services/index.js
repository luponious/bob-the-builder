import { TiendasDaoFiles } from '../daos/tiendas/tiendas.dao.files.js'
import { librosService } from '../services/libros.services.js'
import { TiendasService } from '../services/tiendas.services.js'
import { usersService } from './user.services.js'
import { getDaousers } from '../daos/user/users.dao.js'
import { daoLibros } from '../daos/libros/libros.dao.js'
//import { getDaoSuscriptores } from '../daos/suscriptores/suscriptores.dao.js'
//import { getEmailService } from './email/email.service.js'
//import { NewslettersService } from './newsletters.service.js'
//import { getSmsService } from './sms/sms.service.js'

const tiendasDao = getDaoTiendas()
//const emailService = getEmailService()
export const tiendasService = new TiendasService({ tiendasDao, librosService })

//const suscriptoresDao = getDaoSuscriptores()
//export const newslettersService = new NewslettersService({ suscriptoresDao, emailService })

//const smsService = getSmsService()
const usersDao = getDaousers()
const librosDao = daoLibros()


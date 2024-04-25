import bcrypt from 'bcrypt';
import { errorMan } from '../daos/utils/errorMan.js';
import { validatePremiumUser } from '../middlewares/validation.js';

export class usersService {

  constructor({ smsService, usersDao, librosDao }) {
    this.smsService = smsService;
    this.usersDao = usersDao;
    this.librosDao = librosDao;
  }

  async registrar(datos) {
    const { password } = datos;
    const hashedPassword = await hashPassword(password);
    datos.password = hashedPassword;

    const user = new User(datos);
    await this.usersDao.create(user.toPOJO());

    return user.toPOJO();
  }

  async comprarLibro(iduser, idLibro) {
    const user = await this.usersDao.readOne({ _id: iduser });
    if (!user) throw new Error();

    const libro = await this.librosDao.readOne({ _id: idLibro });
    if (!libro) throw new Error();

    // TODO comprar libro
  }

  async darDeBaja(iduser) {
    const libro = await this.usersDao.deleteOne({ _id: iduser });
    return libro;
  }

  async cambiarRolUser(userId, newRole) {
    const userToUpdate = await this.usersDao.findById(userId);

    if (!userToUpdate) {
      throw new Error('user no encontrado.');
    }

    // Validar si el usuario tiene permisos para cambiar el rol a premium
    await validatePremiumUser({}, {}, async (err) => {
      if (err) {
        throw new Error('No tienes permiso para cambiar a un user a premium.');
      }

      if (newRole === 'premium' || newRole === 'user') {
        userToUpdate.role = newRole;
        await userToUpdate.save();
        return `Rol de user actualizado a ${newRole} correctamente.`;
      } else {
        throw new Error('Rol no válido.');
      }
    });
  }

  async recuperarContrasena(email) {
    const user = await this.usersDao.findOne({ email });
  
    if (!user) {
      throw new Error('El correo electrónico proporcionado no está registrado.');
    }
  
    const resetToken = generatePasswordResetToken(user._id);
  
    await sendPasswordResetEmail(user.email, resetToken);
  
    return 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.';
  }

  //async restablecerContrasena(userId, newPassword) {
    // Lógica para restablecer la contraseña
    // [TODO] Implementar lógica para restablecer la contraseña con el nuevo password
  //}
}

async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const saltRounds = 10; 
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        reject(err);
      }
      resolve(hashedPassword);
    });
  });
}

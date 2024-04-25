import { toPOJO } from '../../utils/utils.js'

export class usersDaoMongoose {
  constructor(usersModel) {
    this.usersModel = usersModel
  }

  async create(data) {
    const user = await this.usersModel.create(data)
    return toPOJO(user)
  }

  async readOne(query) {
    return toPOJO(await this.usersModel.findOne(query).lean())
  }

  async readMany(query) {
    return toPOJO(await this.usersModel.find(query).lean())
  }

  async updateRole(userId, newRole) {
    const user = await this.usersModel.findById(userId)
    if (user) {
      user.role = newRole
      await user.save()
      return toPOJO(user)
    }
    return null
  }

  async resetPassword(userData) {
    const { email, newPassword } = userData
    const user = await this.usersModel.findOne({ email })
    if (user) {
      user.password = newPassword
      await user.save()
      return toPOJO(user)
    }
    return null
  }
}

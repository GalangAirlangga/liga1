import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/Users'
export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        email: 'admin@admin.com',
        password: 'supersecret',
      },
      {
        email: 'user@user.com',
        password: 'secret'
      }
    ])
  }
}

 //import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Users'
import Hash  from '@ioc:Adonis/Core/Hash'
import LoginValidator from 'App/Validators/LoginValidator'
export default class AuthController {
/**
 *
 *Login a user and return a JWT token
 *
 */
  public async login({ request, response, auth }) {


    try {
     //validate schema
      const validation = await request.validate(LoginValidator)
      // Lookup user manually
      const user = await User
        .query()
        .where('email', validation.email)
        .firstOrFail()

      // Verify password
      if (!(await Hash.verify(user.password, validation.password))) {
        return response.badRequest({message:'Invalid credentials'})
      }

      // Generate token
      const token = await auth.use('api').generate(user)
      return response.json({
        message: 'Hello world',
        data: {
          token: token
        }
      })
    } catch (error) {
      // Handle the error
      response.badRequest({message:error.messages})
    }

  }

}

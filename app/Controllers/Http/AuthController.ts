 //import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Users'
import Hash  from '@ioc:Adonis/Core/Hash'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export default class AuthController {
/**
 *
 *Login a user and return a JWT token
 *
 */
  public async login({ request, response, auth }) {

    //make schema for validation
    const schemaLogin = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.exists({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [
        rules.minLength(6),
      ]),
    })

    try {
     //validate schema
      const validation = await request.validate({ schema: schemaLogin })
      // Lookup user manually
      const user = await User
        .query()
        .where('email', validation.email)
        .firstOrFail()

      // Verify password
      if (!(await Hash.verify(user.password, validation.password))) {
        return response.badRequest('Invalid credentials')
      }

      // Generate token
      const token = await auth.use('api').generate(user)
      return response.json({
        message: 'Hello world',
        token: token
      })
    } catch (error) {
      // Handle the error
      response.badRequest(error.messages)
    }

  }

}

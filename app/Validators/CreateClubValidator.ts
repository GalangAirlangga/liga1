import { schema, CustomMessages,rules,validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClubValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = validator.reporters.api
  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    full_name: schema.string([
      rules.maxLength(250),
      rules.minLength(3),
    ]),
    short_name: schema.string([
      rules.maxLength(50),
      rules.minLength(3),
    ]),
    slug: schema.string([
      rules.maxLength(250),
      rules.minLength(3),
      rules.unique({ table: 'clubs', column: 'slug' }),
    ]),
    logo: schema.file({
      size: '2mb',
      extnames: ['jpg', 'gif', 'png'],
    }),
    country: schema.string([
      rules.maxLength(250),
      rules.minLength(3),
    ]),
    city: schema.string([
      rules.maxLength(250),
      rules.minLength(3),
    ]),
    stadium: schema.string([
      rules.maxLength(250),
      rules.minLength(3),
    ]),
    stadium_capacity: schema.number.optional([
      // rules.max
    ]),
    stadium_description: schema.string.optional([
      rules.maxLength(250),
      rules.minLength(3),
    ]),
    stadium_location: schema.string.optional([
      rules.minLength(3),
    ]),
    stadium_image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'gif', 'png'],
    }),
    fans_name: schema.string.optional([
      rules.maxLength(255),
      rules.minLength(3),
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}

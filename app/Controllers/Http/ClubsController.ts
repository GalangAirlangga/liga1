import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Club from 'App/Models/Club'

export default class ClubsController {
  public async index({ response }) {
    const clubs = await Club.query().orderBy('id')
    return response.json(clubs)
  }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { }

  public async show({ request, response }) {
    const slug = request.param('slug')
    const club = await Club.query().where('slug', slug)
    if(!club) {
      return response.json({
        message: 'Club not found'
      })
    }
    return response.json(club)
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}

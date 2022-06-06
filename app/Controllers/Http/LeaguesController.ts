// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import League from "App/Models/League"
import SearchLeagueValidator from "App/Validators/SearchLeagueValidator"


export default class LeaguesController {
 public async index({response,request}){

    try {
      //validate schema
      const validation = await request.validate(SearchLeagueValidator)
      //get data from database
      console.log(validation)
      var leagues = await League.query()
      .if(validation.name, (builder) => {
        builder.where('name', 'like', `%${validation.name}%`)
      }).if(validation.country, (builder) => {
        builder.where('country', 'like', `%${validation.country}%`)
      })


      return response.json({
        message:'Data of leagues',
        data:leagues
      })
    } catch (error) {
      // Handle the error
      response.badRequest({message:error.messages})
    }
  }
  public async show({request,response}){
    const slug = request.param('slug')
    try{
      const league = await League.query().preload('standings', (query) => query.preload('club')).where('slug', slug).first()

      if (!league) {
        return response.json({
          message: 'League not found'
        })
      }
      const mapping = {
        name: league.name,
        country: league.country,
        slug: league.slug,
        logo: league.logo,
        clubs: league.standings.map(standing => {
          return {
            name: standing.club.full_name,
            slug: standing.club.slug,
            logo: standing.club.logo,
            city: standing.club.city,
            stadium: standing.club.stadium,
            stadium_capacity: standing.club.stadium_capacity,
            stadium_location: standing.club.stadium_location,
            stadium_description: standing.club.stadium_description,
            stadium_image: standing.club.stadium_image,
            fans_name: standing.club.fans_name,

          }
        })
      }
      return response.json({
        message: 'Detail of league',
        data:mapping
      })
    }catch(error){
      response.badRequest({message:error.messages})
    }

  }
}

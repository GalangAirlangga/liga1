// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import League from "App/Models/League"
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Standing from "App/Models/Standing"

export default class LeaguesController {
 public async index({response,request}){
   //make schema for validation request legaue
    const schemaSearchLeague = schema.create({
      name: schema.string.optional([
        rules.maxLength(255),
        rules.minLength(3),
      ]),
      country: schema.string.optional([
        rules.maxLength(255),
        rules.minLength(3),
      ]),
    })

    try {
      //validate schema
      const validation = await request.validate({ schema:schemaSearchLeague})
      //get data from database
      console.log(validation)
      var leagues = await League.query()
      .if(validation.name, (builder) => {
        builder.where('name', 'like', `%${validation.name}%`)
      }).if(validation.country, (builder) => {
        builder.where('country', 'like', `%${validation.country}%`)
      })


      return response.json(leagues)
    } catch (error) {
      // Handle the error
      response.json(error.messages)
    }
  }
  public async show({request,response}){
    const slug = request.param('slug')
    const league = await League.query().preload('standings').where('slug',slug).first()
    if(!league){
      return response.json({
        message: 'League not found'
      })
    }
    // const standings = await Standing.query().preload('club').preload('league').where('league_id',league.id)
    // const data = standings.map(item => {
    //   return {
    //     club: item.club.full_name,
    //     position: item.position,
    //     played: item.played,
    //     won: item.won,
    //     drawn: item.draw,
    //     lost: item.lost,
    //     goalsFor: item.goals_for,
    //     goalsAgainst: item.goals_against,
    //     goalDifference: item.goal_difference,
    //     points: item.points
    //   }
    // })
    return response.json(league)
  }
}

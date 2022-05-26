import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Standing from 'App/Models/Standing'

export default class StandingSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    //create standing for club premier league
    await Standing.createMany([
      {
        club_id: 1,
        league_id: 3,
        position: 1,
        played: 38,
        won: 17,
        draw: 5,
        lost: 10,
        goals_for: 52,
        goals_against: 36,
        goal_difference: 16,
        points: 70
      },
      {
        club_id: 2,
        league_id: 3,
        position: 2,
        played: 38,
        won: 16,
        draw: 6,
        lost: 10,
        goals_for: 50,
        goals_against: 37,
        goal_difference: 13,
        points: 66
      },
      {
        club_id: 3,
        league_id: 3,
        position: 3,
        played: 38,
        won: 16,
        draw: 5,
        lost: 11,
        goals_for: 50,
        goals_against: 37,
        goal_difference: 13,
        points: 66
      },
      {
        club_id: 4,
        league_id: 3,
        position: 4,
        played: 38,
        won: 16,
        draw: 5,
        lost: 11,
        goals_for: 50,
        goals_against: 37,
        goal_difference: 13,
        points: 66
      },

    ])
  }
}

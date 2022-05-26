import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import League from 'App/Models/League'

export default class LeagueSeeder extends BaseSeeder {
  public async run () {
    // create leagues for football
    await League.createMany([
      {
      name: 'Liga 1 Indonesia',
      slug: 'liga-1-indonesia',
      logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/9/9f/Logo_Liga_1_Indonesia.svg/1200px-Logo_Liga_1_Indonesia.svg.png',
      country: 'Indonesia',
      number_of_clubs: '18'
    },
    {
      name: 'La Liga',
      slug: 'la-liga',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Logo_of_the_Spanish_La_Liga.svg/1200px-Logo_of_the_Spanish_La_Liga.svg.png',
      country: 'Spain',
      number_of_clubs: '20'
    },
    {
      name: 'Premier League',
      slug: 'premier-league',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Premier_League_crest.svg/1200px-Premier_League_crest.svg.png',
      country: 'England',
      number_of_clubs: '20'
    },
  ])

  }
}

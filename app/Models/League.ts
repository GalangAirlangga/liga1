import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Standing from './Standing'

export default class League extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public logo: string

  @column()
  public country: string

  @column()
  public number_of_clubs: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //has many clubs
  @hasMany(() => Standing, {
    foreignKey: 'league_id',
  })
  public standings: HasMany<typeof Standing>
}

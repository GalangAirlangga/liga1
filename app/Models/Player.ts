import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public position: string

  @column()
  public number: string

  @column()
  public height: string

  @column()
  public weight: string

  @column()
  public age: string

  @column()
  public birth_date: string

  @column()
  public birth_place: string

  @column()
  public image: string

  @column()
  public club_id: number

  @column()
  public league_id: number

  @column()
  public country: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

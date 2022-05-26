import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import League from './League'
import Club from './Club'

export default class Standing extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public league_id: number

  @column()
  public club_id: number

  @column()
  public position: number

  @column()
  public played: number

  @column()
  public won: number

  @column()
  public draw: number

  @column()
  public lost: number

  @column()
  public goals_for: number

  @column()
  public goals_against: number

  @column()
  public goal_difference: number

  @column()
  public points: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => League)
  public legaue: BelongsTo<typeof League>
  @belongsTo(() => Club, {
    localKey: 'id',
    foreignKey: 'club_id',
  })
  public club: BelongsTo<typeof Club>
}

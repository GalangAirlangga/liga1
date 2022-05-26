import { DateTime } from 'luxon'
import { BaseModel, column, hasMany,HasMany} from '@ioc:Adonis/Lucid/Orm'
import Standing from './Standing'


export default class Club extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public full_name: string

  @column()
  public short_name: string

  @column()
  public slug: string

  @column()
  public logo: string

  @column()
  public country: string

  @column()
  public city: string

  @column()
  public stadium: string

  @column()
  public stadium_capacity: number

  @column()
  public stadium_location: string

  @column()
  public stadium_description: string

  @column()
  public stadium_image: string

  @column()
  public fans_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //has many clubs
  @hasMany(() => Standing, {
    foreignKey: 'club_id',
    localKey: 'id',
  })
  public standings: HasMany<typeof Standing>
}

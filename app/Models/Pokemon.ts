import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pokemon extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: number

  @column()
  public name: string

  @column()
  public specie: string

  @column()
  public hp: number

  @column()
  public atk: number

  @column()
  public sp_atk: number

  @column()
  public def: number

  @column()
  public sp_def: number

  @column()
  public speed: number

  @column()
  public primary_type: string

  @column()
  public secondary_type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

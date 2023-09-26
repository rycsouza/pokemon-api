import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pokemon'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('number').unique().notNullable().unsigned()
      table.string('name').unique().notNullable()
      table.string('specie').notNullable()
      table.integer('hp').notNullable().unsigned()
      table.integer('atk').notNullable().unsigned()
      table.integer('sp_atk').notNullable().unsigned()
      table.integer('def').notNullable().unsigned()
      table.integer('sp_def').notNullable().unsigned()
      table.integer('speed').notNullable().unsigned()
      table.string('primary_type').notNullable()
      table.string('secondary_type').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

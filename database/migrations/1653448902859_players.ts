import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'players'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //make columns for table players Football
      table.string('name', 250).notNullable()
      table.string('slug', 250).notNullable()
      table.string('position', 250).notNullable()
      table.string('number', 3).notNullable()
      table.string('image', 250).notNullable()
      table
        .integer('club_id')
        .unsigned()
        .references('clubs.id')
      table.string('country', 250).notNullable()
      table.integer('age').notNullable()
      table.integer('height').notNullable()
      table.integer('weight').notNullable()
      table.date('birth_date').notNullable()
      table.string('birth_place', 250).notNullable()


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

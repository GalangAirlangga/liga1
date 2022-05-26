import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clubs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //make columns for table Clubs Football
      table.string('full_name', 250).notNullable()
      table.string('short_name', 50).notNullable()
      table.string('slug', 250).notNullable()
      table.string('logo', 250).notNullable()
      table.string('country', 250).notNullable()
      table.string('city', 250).notNullable()
      table.string('stadium', 250).notNullable()
      table.integer('stadium_capacity').notNullable()
      table.string('stadium_location', 250).notNullable()
      table.text('stadium_description').notNullable()
      table.string('stadium_image', 250).notNullable()
      table.string('fans_name', 250).notNullable()

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

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'leagues'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //make columns for table leagues Football
      table.string('name', 250).notNullable()
      table.string('slug', 250).notNullable()
      table.string('logo', 250).notNullable()
      table.string('country', 250).notNullable()
      table.string('number_of_clubs',3).notNullable()

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

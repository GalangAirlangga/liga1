import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'standings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //make columns for table standings Football

      //make relations to leagues
      table
        .integer('league_id')
        .unsigned()
        .references('leagues.id')
        .onDelete('cascade')
      //make relations to clubs
      table
        .integer('club_id')
        .unsigned()
        .references('clubs.id')
        .onDelete('cascade')
      table.integer('position', 2).notNullable()
      table.integer('played', 2).notNullable()
      table.integer('won', 2).notNullable()
      table.integer('draw', 2).notNullable()
      table.integer('lost', 2).notNullable()
      table.integer('goals_for', 4).notNullable()
      table.integer('goals_against', 4).notNullable()
      table.integer('goal_difference', 4).notNullable()
      table.integer('points', 4).notNullable()
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

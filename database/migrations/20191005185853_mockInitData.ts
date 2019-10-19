import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex('user').insert({ email: 'vanpho01@gmail.com', password_hash: '123', name: 'Pho Nguyen' })
}

export async function down(knex: Knex): Promise<any> {
  await knex('user').del().where({ email: 'vanpho01@gmail.com' })
}

# Vonic Database

## This repo holds all the migration scripts for the database

### Setup 
```shell
  cd database
  yarn
  cp .env.sample .env
  npm run db:reset //This will nuke your super_dict_dev DB
```
You must have mariadb run locally

#### Running Latest Migrations

To run the latest migrations: `npm run knex:latest` 

#### Resetting your database

By default `super_dict_dev` will be reset. Change the env file to drop a different DB.
Reset with: `npm run db:reset`

#### Adding a new migration

To add a new migration file run the following command:
`npm run knex:make {your_migration_name}`

#### Rolling back migrations
Rollback migrations with `npm run knex:rollback`

### Testing a specific migration(s)
Knex migrations are run in batches, so when you run/rollback migrations
you may be executing more migrations than you really want. You can manipulate
how many migrations are run in each batch by changing the `batch` field in 
the `knex_migrations-new` table; choose the migrations you want to run and make
the `batch` field the largest integer. E.g. if latest batch is 3, change the
batch field of your migration(s) to 4.

#!/usr/bin/env bash

set -e

# set env path
ENV_PATH=".env"
if [[ !(-z "$1") ]]; then
  ENV_PATH=$1
fi

if [ -f "$ENV_PATH" ]
then
  export $(cat < ${ENV_PATH} | grep -v '^#' | xargs)
fi
export PGPASSWORD=${SUPER_DICT_POSTGRES_PASSWORD}

POSTGRESQL_COMMAND="psql -U${SUPER_DICT_POSTGRES_USERNAME} -h${SUPER_DICT_POSTGRES_HOST} -p${SUPER_DICT_POSTGRES_PORT}"

# prevent run on production mode
if [[ $NODE_ENV == 'production' ]]; then
  echo 'Aborting database reset on production...'
  exit 1
fi

echo "Revock all sessions"
${POSTGRESQL_COMMAND} -c "SELECT 
    pg_terminate_backend(pid) 
FROM 
    pg_stat_activity 
WHERE 
    -- don't kill my own connection!
    pid <> pg_backend_pid()
    -- don't kill the connections to other databases
    AND datname = '${SUPER_DICT_POSTGRES_DATABASE}'
    ;
;" -q

echo "Dropping database..."
${POSTGRESQL_COMMAND} -c "drop database if exists ${SUPER_DICT_POSTGRES_DATABASE};"

echo "Creating database..."
${POSTGRESQL_COMMAND} -c "create database ${SUPER_DICT_POSTGRES_DATABASE} WITH 
  OWNER = ${SUPER_DICT_POSTGRES_USERNAME}
  ENCODING = 'UTF8'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1;"

echo "Running migrations..."
npm run knex:latest

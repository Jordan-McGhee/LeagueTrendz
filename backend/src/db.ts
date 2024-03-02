const Pool = require("pg").Pool

export const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    max: 150,
    min: 0
})

export const tempPool = new Pool({
    user: 'ctqmvlqf',
    host: 'ruby.db.elephantsql.com',
    database: 'ctqmvlqf',
    port: 5432,
    password: 'pdZjkxf-n-wtvBPlpCZR4B8DY79dH996'
})
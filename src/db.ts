import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    DEV_POSTGRES_DB,
    TEST_POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    NODE_ENV,
} = process.env

let client: Pool = new Pool()
if (NODE_ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: TEST_POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

if (NODE_ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: DEV_POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

export default client

require("dotenv").config()

const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function executeSQL(sql) {
  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    return res
  } catch (error) {
    console.error("Error executing SQL:", error)
    throw error
  } finally {
    client.release()
  }
}

async function setupDb() {
  const createJobsTableSQL = `
    CREATE TABLE IF NOT EXISTS jobs (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT NOT NULL,
      application_link TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      user_id UUID REFERENCES auth.users(id)
    );
  `

  try {
    await executeSQL(createJobsTableSQL)
    console.log("Table created successfully")
  } catch (error) {
    console.error("Error creating table:", error)
    throw error
  }
}

setupDb().catch(console.error)

import { neon } from '@neondatabase/serverless';

export async function dbFetch(sqlString: string) {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not defined');
    return undefined;
  }
  const sql = neon(dbUrl);
  const response = await sql(sqlString);
  return response;
}

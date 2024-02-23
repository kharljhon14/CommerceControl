import { Client, QueryResult, QueryResultRow } from 'pg';
import { PG_URL } from '../utils/variables';

function getClient() {
  const client = new Client({
    connectionString: PG_URL,
  });

  return client;
}

export async function sql<T extends QueryResultRow>(
  sql: string,
  values?: any[]
): Promise<QueryResult<T>> {
  const client = getClient();

  await client.connect();

  const res = client.query(sql, values);

  await client.end();

  return res;
}

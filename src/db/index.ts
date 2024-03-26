import { Client, QueryResult, QueryResultRow, types } from 'pg';
import { PG_URL } from '../utils/variables';

export function getClient() {
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

  // Parsing of number string into float
  types.setTypeParser(1700, function (val: string) {
    return parseFloat(val);
  });

  await client.connect();

  const res = await client.query(sql, values);

  await client.end();

  return res;
}

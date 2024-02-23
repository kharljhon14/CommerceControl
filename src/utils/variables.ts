const { env } = process as { env: { [key: string]: string } };

export const { PG_URL } = env;

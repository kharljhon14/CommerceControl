import { hash } from 'bcrypt';

export async function hashPassword(password: string) {
  const saltRounds = 10;

  return await hash(password, saltRounds);
}

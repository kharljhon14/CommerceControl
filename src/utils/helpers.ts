import { compare, hash } from 'bcrypt';

export async function hashPassword(password: string) {
  const saltRounds = 10;

  return await hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}

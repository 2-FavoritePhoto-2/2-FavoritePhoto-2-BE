import bcrypt from 'bcrypt';

export async function HashingPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function ComparePassword(input: string, user: string) {
  return await bcrypt.compare(input, user);
}

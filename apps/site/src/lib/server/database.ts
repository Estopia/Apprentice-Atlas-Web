import 'server-only';
import postgres from 'postgres';

let client: ReturnType<typeof postgres> | undefined;

export function database() {
  if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is required for form storage.');
  client ??= postgres(process.env.DATABASE_URI, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
  });
  return client;
}

import { getPayload } from 'payload';
import config from '../payload.config';
import { seedContent } from './seed';

if (process.env.NODE_ENV === 'production' && process.env.ALLOW_PRODUCTION_SEED !== 'true')
  throw new Error('Production seed requires ALLOW_PRODUCTION_SEED=true.');

const payload = await getPayload({ config });
await seedContent(payload);
await payload.destroy();

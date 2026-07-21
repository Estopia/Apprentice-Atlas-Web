import { withPayload } from '@payloadcms/next/withPayload';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export default withPayload({ output: 'standalone', poweredByHeader: false, turbopack: { root } });

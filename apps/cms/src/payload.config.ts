import { postgresAdapter } from '@payloadcms/db-postgres';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { s3Storage } from '@payloadcms/storage-s3';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Authors } from './collections/Authors';
import { Topics, Audiences, Countries } from './collections/Taxonomies';
import { Pages, Articles, Guides, CareerFields } from './collections/Editorial';
import { GlossaryTerms } from './collections/GlossaryTerms';
import { Downloads } from './collections/Downloads';
import { Redirects } from './collections/Redirects';
import { migrations } from './migrations';
import {
  Navigation,
  Footer,
  Contact,
  StoreTargets,
  SocialLinks,
  ConsentTexts,
  CallsToAction,
} from './globals';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const hasS3 = Boolean(
  process.env.SUPABASE_S3_ENDPOINT &&
  process.env.SUPABASE_S3_ACCESS_KEY_ID &&
  process.env.SUPABASE_S3_SECRET_ACCESS_KEY,
);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Apprentice Atlas CMS' },
  },
  collections: [
    Users,
    Media,
    Authors,
    Topics,
    Audiences,
    Countries,
    Pages,
    Articles,
    Guides,
    CareerFields,
    GlossaryTerms,
    Downloads,
    Redirects,
  ],
  globals: [Navigation, Footer, Contact, StoreTargets, SocialLinks, ConsentTexts, CallsToAction],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? 'postgresql:///apprentice_atlas',
    },
    migrationDir: path.resolve(dirname, 'migrations'),
    prodMigrations: migrations,
  }),
  editor: lexicalEditor(),
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM_ADDRESS ?? 'hello@apprenticeatlas.com',
        defaultFromName: 'Apprentice Atlas',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT ?? 587),
          secure: Number(process.env.SMTP_PORT ?? 587) === 465,
          auth: process.env.SMTP_USER
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
            : undefined,
        },
      })
    : undefined,
  plugins: hasS3
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.SUPABASE_S3_BUCKET ?? 'marketing-media',
          config: {
            endpoint: process.env.SUPABASE_S3_ENDPOINT,
            region: process.env.SUPABASE_S3_REGION ?? 'eu-central-1',
            credentials: {
              accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID!,
              secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY!,
            },
            forcePathStyle: true,
          },
        }),
      ]
    : [],
  secret: process.env.PAYLOAD_SECRET ?? 'local-development-secret-change-before-deploy',
  serverURL: process.env.CMS_PUBLIC_URL ?? 'http://localhost:3001',
  cors: [process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'],
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    process.env.CMS_PUBLIC_URL ?? 'http://localhost:3001',
  ],
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
});

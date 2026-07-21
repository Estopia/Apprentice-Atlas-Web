import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'publisher', 'editor', 'translator');
  CREATE TYPE "public"."enum_media_country_context" AS ENUM('de', 'uk', 'both');
  CREATE TYPE "public"."enum_pages_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_articles_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_guides_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum_guides_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__guides_v_version_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum__guides_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_career_fields_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum_career_fields_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__career_fields_v_version_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum__career_fields_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_glossary_terms_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum_glossary_terms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__glossary_terms_v_version_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum__glossary_terms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_downloads_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum_downloads_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__downloads_v_version_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum__downloads_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_redirects_status" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_navigation_items_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum_footer_links_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum_store_targets_mode" AS ENUM('waitlist', 'stores');
  CREATE TYPE "public"."enum_consent_texts_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum_consent_texts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__consent_texts_v_version_locale" AS ENUM('de', 'en');
  CREATE TYPE "public"."enum__consent_texts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_calls_to_action_items_locale" AS ENUM('de', 'en');
  CREATE TABLE "users_sessions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "created_at" timestamp(3) with time zone,
    "expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "role" "enum_users_role" DEFAULT 'editor' NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "email" varchar NOT NULL,
    "reset_password_token" varchar,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" varchar,
    "hash" varchar,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
  );

  CREATE TABLE "media" (
    "id" serial PRIMARY KEY NOT NULL,
    "alt" varchar NOT NULL,
    "caption" varchar,
    "credit" varchar NOT NULL,
    "license" varchar NOT NULL,
    "license_url" varchar,
    "country_context" "enum_media_country_context" NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric,
    "sizes_thumbnail_url" varchar,
    "sizes_thumbnail_width" numeric,
    "sizes_thumbnail_height" numeric,
    "sizes_thumbnail_mime_type" varchar,
    "sizes_thumbnail_filesize" numeric,
    "sizes_thumbnail_filename" varchar,
    "sizes_card_url" varchar,
    "sizes_card_width" numeric,
    "sizes_card_height" numeric,
    "sizes_card_mime_type" varchar,
    "sizes_card_filesize" numeric,
    "sizes_card_filename" varchar,
    "sizes_hero_url" varchar,
    "sizes_hero_width" numeric,
    "sizes_hero_height" numeric,
    "sizes_hero_mime_type" varchar,
    "sizes_hero_filesize" numeric,
    "sizes_hero_filename" varchar
  );

  CREATE TABLE "authors" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "role" varchar NOT NULL,
    "bio" varchar NOT NULL,
    "image_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "topics" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "key" varchar NOT NULL,
    "description" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "audiences" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "key" varchar NOT NULL,
    "description" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "countries" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "key" varchar NOT NULL,
    "description" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "pages_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar
  );

  CREATE TABLE "pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "locale" "enum_pages_locale",
    "translation_group" varchar,
    "slug" varchar,
    "title" varchar,
    "excerpt" varchar,
    "hero_image_id" integer,
    "body" jsonb,
    "chapter_number" varchar,
    "author_id" integer,
    "reviewer_id" integer,
    "reviewed_at" timestamp(3) with time zone,
    "seo_title" varchar,
    "seo_description" varchar,
    "seo_social_image_id" integer,
    "seo_no_index" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_pages_status" DEFAULT 'draft'
  );

  CREATE TABLE "pages_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "audiences_id" integer,
    "countries_id" integer,
    "topics_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer
  );

  CREATE TABLE "_pages_v_version_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_pages_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_locale" "enum__pages_v_version_locale",
    "version_translation_group" varchar,
    "version_slug" varchar,
    "version_title" varchar,
    "version_excerpt" varchar,
    "version_hero_image_id" integer,
    "version_body" jsonb,
    "version_chapter_number" varchar,
    "version_author_id" integer,
    "version_reviewer_id" integer,
    "version_reviewed_at" timestamp(3) with time zone,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "version_seo_social_image_id" integer,
    "version_seo_no_index" boolean DEFAULT false,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__pages_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "_pages_v_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "audiences_id" integer,
    "countries_id" integer,
    "topics_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer
  );

  CREATE TABLE "articles_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar
  );

  CREATE TABLE "articles" (
    "id" serial PRIMARY KEY NOT NULL,
    "locale" "enum_articles_locale",
    "translation_group" varchar,
    "slug" varchar,
    "title" varchar,
    "excerpt" varchar,
    "hero_image_id" integer,
    "body" jsonb,
    "chapter_number" varchar,
    "author_id" integer,
    "reviewer_id" integer,
    "reviewed_at" timestamp(3) with time zone,
    "seo_title" varchar,
    "seo_description" varchar,
    "seo_social_image_id" integer,
    "seo_no_index" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_articles_status" DEFAULT 'draft'
  );

  CREATE TABLE "articles_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "audiences_id" integer,
    "countries_id" integer,
    "topics_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer
  );

  CREATE TABLE "_articles_v_version_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_articles_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_locale" "enum__articles_v_version_locale",
    "version_translation_group" varchar,
    "version_slug" varchar,
    "version_title" varchar,
    "version_excerpt" varchar,
    "version_hero_image_id" integer,
    "version_body" jsonb,
    "version_chapter_number" varchar,
    "version_author_id" integer,
    "version_reviewer_id" integer,
    "version_reviewed_at" timestamp(3) with time zone,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "version_seo_social_image_id" integer,
    "version_seo_no_index" boolean DEFAULT false,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__articles_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "_articles_v_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "audiences_id" integer,
    "countries_id" integer,
    "topics_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer
  );

  CREATE TABLE "guides_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar
  );

  CREATE TABLE "guides" (
    "id" serial PRIMARY KEY NOT NULL,
    "locale" "enum_guides_locale",
    "translation_group" varchar,
    "slug" varchar,
    "title" varchar,
    "excerpt" varchar,
    "hero_image_id" integer,
    "body" jsonb,
    "chapter_number" varchar,
    "author_id" integer,
    "reviewer_id" integer,
    "reviewed_at" timestamp(3) with time zone,
    "seo_title" varchar,
    "seo_description" varchar,
    "seo_social_image_id" integer,
    "seo_no_index" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_guides_status" DEFAULT 'draft'
  );

  CREATE TABLE "guides_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "audiences_id" integer,
    "countries_id" integer,
    "topics_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer
  );

  CREATE TABLE "_guides_v_version_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_guides_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_locale" "enum__guides_v_version_locale",
    "version_translation_group" varchar,
    "version_slug" varchar,
    "version_title" varchar,
    "version_excerpt" varchar,
    "version_hero_image_id" integer,
    "version_body" jsonb,
    "version_chapter_number" varchar,
    "version_author_id" integer,
    "version_reviewer_id" integer,
    "version_reviewed_at" timestamp(3) with time zone,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "version_seo_social_image_id" integer,
    "version_seo_no_index" boolean DEFAULT false,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__guides_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "_guides_v_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "audiences_id" integer,
    "countries_id" integer,
    "topics_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer
  );

  CREATE TABLE "career_fields_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar
  );

  CREATE TABLE "career_fields" (
    "id" serial PRIMARY KEY NOT NULL,
    "locale" "enum_career_fields_locale",
    "translation_group" varchar,
    "slug" varchar,
    "title" varchar,
    "excerpt" varchar,
    "hero_image_id" integer,
    "body" jsonb,
    "chapter_number" varchar,
    "author_id" integer,
    "reviewer_id" integer,
    "reviewed_at" timestamp(3) with time zone,
    "seo_title" varchar,
    "seo_description" varchar,
    "seo_social_image_id" integer,
    "seo_no_index" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_career_fields_status" DEFAULT 'draft'
  );

  CREATE TABLE "career_fields_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "audiences_id" integer,
    "countries_id" integer,
    "topics_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer
  );

  CREATE TABLE "_career_fields_v_version_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_career_fields_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_locale" "enum__career_fields_v_version_locale",
    "version_translation_group" varchar,
    "version_slug" varchar,
    "version_title" varchar,
    "version_excerpt" varchar,
    "version_hero_image_id" integer,
    "version_body" jsonb,
    "version_chapter_number" varchar,
    "version_author_id" integer,
    "version_reviewer_id" integer,
    "version_reviewed_at" timestamp(3) with time zone,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "version_seo_social_image_id" integer,
    "version_seo_no_index" boolean DEFAULT false,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__career_fields_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "_career_fields_v_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "audiences_id" integer,
    "countries_id" integer,
    "topics_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer
  );

  CREATE TABLE "glossary_terms_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar
  );

  CREATE TABLE "glossary_terms" (
    "id" serial PRIMARY KEY NOT NULL,
    "locale" "enum_glossary_terms_locale",
    "translation_group" varchar,
    "slug" varchar,
    "term" varchar,
    "definition" varchar,
    "seo_title" varchar,
    "seo_description" varchar,
    "seo_social_image_id" integer,
    "seo_no_index" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_glossary_terms_status" DEFAULT 'draft'
  );

  CREATE TABLE "_glossary_terms_v_version_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_glossary_terms_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_locale" "enum__glossary_terms_v_version_locale",
    "version_translation_group" varchar,
    "version_slug" varchar,
    "version_term" varchar,
    "version_definition" varchar,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "version_seo_social_image_id" integer,
    "version_seo_no_index" boolean DEFAULT false,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__glossary_terms_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "downloads_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar
  );

  CREATE TABLE "downloads" (
    "id" serial PRIMARY KEY NOT NULL,
    "locale" "enum_downloads_locale",
    "translation_group" varchar,
    "slug" varchar,
    "title" varchar,
    "description" varchar,
    "file_id" integer,
    "author_id" integer,
    "reviewer_id" integer,
    "reviewed_at" timestamp(3) with time zone,
    "seo_title" varchar,
    "seo_description" varchar,
    "seo_social_image_id" integer,
    "seo_no_index" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_downloads_status" DEFAULT 'draft'
  );

  CREATE TABLE "downloads_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "audiences_id" integer,
    "countries_id" integer,
    "topics_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer
  );

  CREATE TABLE "_downloads_v_version_sources" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "url" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_downloads_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_locale" "enum__downloads_v_version_locale",
    "version_translation_group" varchar,
    "version_slug" varchar,
    "version_title" varchar,
    "version_description" varchar,
    "version_file_id" integer,
    "version_author_id" integer,
    "version_reviewer_id" integer,
    "version_reviewed_at" timestamp(3) with time zone,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "version_seo_social_image_id" integer,
    "version_seo_no_index" boolean DEFAULT false,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__downloads_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "_downloads_v_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "audiences_id" integer,
    "countries_id" integer,
    "topics_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer
  );

  CREATE TABLE "redirects" (
    "id" serial PRIMARY KEY NOT NULL,
    "from" varchar NOT NULL,
    "to" varchar NOT NULL,
    "status" "enum_redirects_status" DEFAULT '301' NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_kv" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "data" jsonb NOT NULL
  );

  CREATE TABLE "payload_jobs_log" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "executed_at" timestamp(3) with time zone NOT NULL,
    "completed_at" timestamp(3) with time zone NOT NULL,
    "task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
    "task_i_d" varchar NOT NULL,
    "input" jsonb,
    "output" jsonb,
    "state" "enum_payload_jobs_log_state" NOT NULL,
    "error" jsonb
  );

  CREATE TABLE "payload_jobs" (
    "id" serial PRIMARY KEY NOT NULL,
    "input" jsonb,
    "completed_at" timestamp(3) with time zone,
    "total_tried" numeric DEFAULT 0,
    "has_error" boolean DEFAULT false,
    "error" jsonb,
    "task_slug" "enum_payload_jobs_task_slug",
    "queue" varchar DEFAULT 'default',
    "wait_until" timestamp(3) with time zone,
    "processing" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_locked_documents" (
    "id" serial PRIMARY KEY NOT NULL,
    "global_slug" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_locked_documents_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer,
    "media_id" integer,
    "authors_id" integer,
    "topics_id" integer,
    "audiences_id" integer,
    "countries_id" integer,
    "pages_id" integer,
    "articles_id" integer,
    "guides_id" integer,
    "career_fields_id" integer,
    "glossary_terms_id" integer,
    "downloads_id" integer,
    "redirects_id" integer
  );

  CREATE TABLE "payload_preferences" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "value" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_preferences_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer
  );

  CREATE TABLE "payload_migrations" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "navigation_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "locale" "enum_navigation_items_locale" NOT NULL,
    "label" varchar NOT NULL,
    "href" varchar NOT NULL,
    "parent_key" varchar
  );

  CREATE TABLE "navigation" (
    "id" serial PRIMARY KEY NOT NULL,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "footer_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "locale" "enum_footer_links_locale" NOT NULL,
    "label" varchar NOT NULL,
    "href" varchar NOT NULL
  );

  CREATE TABLE "footer" (
    "id" serial PRIMARY KEY NOT NULL,
    "copyright" varchar DEFAULT '© 2026 Estopia Engineering Ltd' NOT NULL,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "contact" (
    "id" serial PRIMARY KEY NOT NULL,
    "general_email" varchar DEFAULT 'hello@apprenticeatlas.com' NOT NULL,
    "privacy_email" varchar DEFAULT 'privacy@apprenticeatlas.com' NOT NULL,
    "accessibility_email" varchar DEFAULT 'accessibility@apprenticeatlas.com' NOT NULL,
    "press_email" varchar DEFAULT 'press@apprenticeatlas.com' NOT NULL,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "store_targets" (
    "id" serial PRIMARY KEY NOT NULL,
    "mode" "enum_store_targets_mode" DEFAULT 'waitlist' NOT NULL,
    "apple_url" varchar,
    "google_url" varchar,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "social_links_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "platform" varchar NOT NULL,
    "url" varchar NOT NULL
  );

  CREATE TABLE "social_links" (
    "id" serial PRIMARY KEY NOT NULL,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "consent_texts" (
    "id" serial PRIMARY KEY NOT NULL,
    "version" varchar,
    "locale" "enum_consent_texts_locale",
    "analytics_title" varchar,
    "analytics_body" varchar,
    "waitlist_text" varchar,
    "partner_text" varchar,
    "_status" "enum_consent_texts_status" DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "_consent_texts_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version_version" varchar,
    "version_locale" "enum__consent_texts_v_version_locale",
    "version_analytics_title" varchar,
    "version_analytics_body" varchar,
    "version_waitlist_text" varchar,
    "version_partner_text" varchar,
    "version__status" "enum__consent_texts_v_version_status" DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean
  );

  CREATE TABLE "calls_to_action_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "locale" "enum_calls_to_action_items_locale" NOT NULL,
    "label" varchar NOT NULL,
    "href" varchar NOT NULL
  );

  CREATE TABLE "calls_to_action" (
    "id" serial PRIMARY KEY NOT NULL,
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_sources" ADD CONSTRAINT "pages_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_reviewer_id_authors_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_social_image_id_media_id_fk" FOREIGN KEY ("seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_sources" ADD CONSTRAINT "_pages_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_reviewer_id_authors_id_fk" FOREIGN KEY ("version_reviewer_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_social_image_id_media_id_fk" FOREIGN KEY ("version_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_sources" ADD CONSTRAINT "articles_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_reviewer_id_authors_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_seo_social_image_id_media_id_fk" FOREIGN KEY ("seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_version_sources" ADD CONSTRAINT "_articles_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_reviewer_id_authors_id_fk" FOREIGN KEY ("version_reviewer_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_seo_social_image_id_media_id_fk" FOREIGN KEY ("version_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_sources" ADD CONSTRAINT "guides_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_reviewer_id_authors_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_seo_social_image_id_media_id_fk" FOREIGN KEY ("seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides_rels" ADD CONSTRAINT "guides_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_rels" ADD CONSTRAINT "guides_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_rels" ADD CONSTRAINT "guides_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_rels" ADD CONSTRAINT "guides_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_rels" ADD CONSTRAINT "guides_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_rels" ADD CONSTRAINT "guides_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_rels" ADD CONSTRAINT "guides_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_version_sources" ADD CONSTRAINT "_guides_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_parent_id_guides_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_reviewer_id_authors_id_fk" FOREIGN KEY ("version_reviewer_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_seo_social_image_id_media_id_fk" FOREIGN KEY ("version_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_fields_sources" ADD CONSTRAINT "career_fields_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_fields" ADD CONSTRAINT "career_fields_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_fields" ADD CONSTRAINT "career_fields_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_fields" ADD CONSTRAINT "career_fields_reviewer_id_authors_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_fields" ADD CONSTRAINT "career_fields_seo_social_image_id_media_id_fk" FOREIGN KEY ("seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_fields_rels" ADD CONSTRAINT "career_fields_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_fields_rels" ADD CONSTRAINT "career_fields_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_fields_rels" ADD CONSTRAINT "career_fields_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_fields_rels" ADD CONSTRAINT "career_fields_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_fields_rels" ADD CONSTRAINT "career_fields_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_fields_rels" ADD CONSTRAINT "career_fields_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_fields_rels" ADD CONSTRAINT "career_fields_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_fields_v_version_sources" ADD CONSTRAINT "_career_fields_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_career_fields_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_fields_v" ADD CONSTRAINT "_career_fields_v_parent_id_career_fields_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."career_fields"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_career_fields_v" ADD CONSTRAINT "_career_fields_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_career_fields_v" ADD CONSTRAINT "_career_fields_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_career_fields_v" ADD CONSTRAINT "_career_fields_v_version_reviewer_id_authors_id_fk" FOREIGN KEY ("version_reviewer_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_career_fields_v" ADD CONSTRAINT "_career_fields_v_version_seo_social_image_id_media_id_fk" FOREIGN KEY ("version_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_career_fields_v_rels" ADD CONSTRAINT "_career_fields_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_career_fields_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_fields_v_rels" ADD CONSTRAINT "_career_fields_v_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_fields_v_rels" ADD CONSTRAINT "_career_fields_v_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_fields_v_rels" ADD CONSTRAINT "_career_fields_v_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_fields_v_rels" ADD CONSTRAINT "_career_fields_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_fields_v_rels" ADD CONSTRAINT "_career_fields_v_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_fields_v_rels" ADD CONSTRAINT "_career_fields_v_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "glossary_terms_sources" ADD CONSTRAINT "glossary_terms_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."glossary_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "glossary_terms" ADD CONSTRAINT "glossary_terms_seo_social_image_id_media_id_fk" FOREIGN KEY ("seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_glossary_terms_v_version_sources" ADD CONSTRAINT "_glossary_terms_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_glossary_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_glossary_terms_v" ADD CONSTRAINT "_glossary_terms_v_parent_id_glossary_terms_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."glossary_terms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_glossary_terms_v" ADD CONSTRAINT "_glossary_terms_v_version_seo_social_image_id_media_id_fk" FOREIGN KEY ("version_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads_sources" ADD CONSTRAINT "downloads_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_reviewer_id_authors_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_seo_social_image_id_media_id_fk" FOREIGN KEY ("seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads_rels" ADD CONSTRAINT "downloads_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads_rels" ADD CONSTRAINT "downloads_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads_rels" ADD CONSTRAINT "downloads_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads_rels" ADD CONSTRAINT "downloads_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads_rels" ADD CONSTRAINT "downloads_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads_rels" ADD CONSTRAINT "downloads_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads_rels" ADD CONSTRAINT "downloads_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_downloads_v_version_sources" ADD CONSTRAINT "_downloads_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_downloads_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_parent_id_downloads_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_version_file_id_media_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_version_reviewer_id_authors_id_fk" FOREIGN KEY ("version_reviewer_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v" ADD CONSTRAINT "_downloads_v_version_seo_social_image_id_media_id_fk" FOREIGN KEY ("version_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_downloads_v_rels" ADD CONSTRAINT "_downloads_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_downloads_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_downloads_v_rels" ADD CONSTRAINT "_downloads_v_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_downloads_v_rels" ADD CONSTRAINT "_downloads_v_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_downloads_v_rels" ADD CONSTRAINT "_downloads_v_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_downloads_v_rels" ADD CONSTRAINT "_downloads_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_downloads_v_rels" ADD CONSTRAINT "_downloads_v_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_downloads_v_rels" ADD CONSTRAINT "_downloads_v_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audiences_fk" FOREIGN KEY ("audiences_id") REFERENCES "public"."audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_career_fields_fk" FOREIGN KEY ("career_fields_id") REFERENCES "public"."career_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_glossary_terms_fk" FOREIGN KEY ("glossary_terms_id") REFERENCES "public"."glossary_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_links_links" ADD CONSTRAINT "social_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "calls_to_action_items" ADD CONSTRAINT "calls_to_action_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."calls_to_action"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "authors_image_idx" ON "authors" USING btree ("image_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE UNIQUE INDEX "topics_key_idx" ON "topics" USING btree ("key");
  CREATE INDEX "topics_updated_at_idx" ON "topics" USING btree ("updated_at");
  CREATE INDEX "topics_created_at_idx" ON "topics" USING btree ("created_at");
  CREATE UNIQUE INDEX "audiences_key_idx" ON "audiences" USING btree ("key");
  CREATE INDEX "audiences_updated_at_idx" ON "audiences" USING btree ("updated_at");
  CREATE INDEX "audiences_created_at_idx" ON "audiences" USING btree ("created_at");
  CREATE UNIQUE INDEX "countries_key_idx" ON "countries" USING btree ("key");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE INDEX "pages_sources_order_idx" ON "pages_sources" USING btree ("_order");
  CREATE INDEX "pages_sources_parent_id_idx" ON "pages_sources" USING btree ("_parent_id");
  CREATE INDEX "pages_locale_idx" ON "pages" USING btree ("locale");
  CREATE INDEX "pages_translation_group_idx" ON "pages" USING btree ("translation_group");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_hero_image_idx" ON "pages" USING btree ("hero_image_id");
  CREATE INDEX "pages_author_idx" ON "pages" USING btree ("author_id");
  CREATE INDEX "pages_reviewer_idx" ON "pages" USING btree ("reviewer_id");
  CREATE INDEX "pages_seo_seo_social_image_idx" ON "pages" USING btree ("seo_social_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_audiences_id_idx" ON "pages_rels" USING btree ("audiences_id");
  CREATE INDEX "pages_rels_countries_id_idx" ON "pages_rels" USING btree ("countries_id");
  CREATE INDEX "pages_rels_topics_id_idx" ON "pages_rels" USING btree ("topics_id");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  CREATE INDEX "pages_rels_guides_id_idx" ON "pages_rels" USING btree ("guides_id");
  CREATE INDEX "pages_rels_career_fields_id_idx" ON "pages_rels" USING btree ("career_fields_id");
  CREATE INDEX "_pages_v_version_sources_order_idx" ON "_pages_v_version_sources" USING btree ("_order");
  CREATE INDEX "_pages_v_version_sources_parent_id_idx" ON "_pages_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_locale_idx" ON "_pages_v" USING btree ("version_locale");
  CREATE INDEX "_pages_v_version_version_translation_group_idx" ON "_pages_v" USING btree ("version_translation_group");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_hero_image_idx" ON "_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_pages_v_version_version_author_idx" ON "_pages_v" USING btree ("version_author_id");
  CREATE INDEX "_pages_v_version_version_reviewer_idx" ON "_pages_v" USING btree ("version_reviewer_id");
  CREATE INDEX "_pages_v_version_seo_version_seo_social_image_idx" ON "_pages_v" USING btree ("version_seo_social_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_audiences_id_idx" ON "_pages_v_rels" USING btree ("audiences_id");
  CREATE INDEX "_pages_v_rels_countries_id_idx" ON "_pages_v_rels" USING btree ("countries_id");
  CREATE INDEX "_pages_v_rels_topics_id_idx" ON "_pages_v_rels" USING btree ("topics_id");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id");
  CREATE INDEX "_pages_v_rels_guides_id_idx" ON "_pages_v_rels" USING btree ("guides_id");
  CREATE INDEX "_pages_v_rels_career_fields_id_idx" ON "_pages_v_rels" USING btree ("career_fields_id");
  CREATE INDEX "articles_sources_order_idx" ON "articles_sources" USING btree ("_order");
  CREATE INDEX "articles_sources_parent_id_idx" ON "articles_sources" USING btree ("_parent_id");
  CREATE INDEX "articles_locale_idx" ON "articles" USING btree ("locale");
  CREATE INDEX "articles_translation_group_idx" ON "articles" USING btree ("translation_group");
  CREATE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_hero_image_idx" ON "articles" USING btree ("hero_image_id");
  CREATE INDEX "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE INDEX "articles_reviewer_idx" ON "articles" USING btree ("reviewer_id");
  CREATE INDEX "articles_seo_seo_social_image_idx" ON "articles" USING btree ("seo_social_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_audiences_id_idx" ON "articles_rels" USING btree ("audiences_id");
  CREATE INDEX "articles_rels_countries_id_idx" ON "articles_rels" USING btree ("countries_id");
  CREATE INDEX "articles_rels_topics_id_idx" ON "articles_rels" USING btree ("topics_id");
  CREATE INDEX "articles_rels_articles_id_idx" ON "articles_rels" USING btree ("articles_id");
  CREATE INDEX "articles_rels_guides_id_idx" ON "articles_rels" USING btree ("guides_id");
  CREATE INDEX "articles_rels_career_fields_id_idx" ON "articles_rels" USING btree ("career_fields_id");
  CREATE INDEX "_articles_v_version_sources_order_idx" ON "_articles_v_version_sources" USING btree ("_order");
  CREATE INDEX "_articles_v_version_sources_parent_id_idx" ON "_articles_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_locale_idx" ON "_articles_v" USING btree ("version_locale");
  CREATE INDEX "_articles_v_version_version_translation_group_idx" ON "_articles_v" USING btree ("version_translation_group");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_hero_image_idx" ON "_articles_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_articles_v_version_version_author_idx" ON "_articles_v" USING btree ("version_author_id");
  CREATE INDEX "_articles_v_version_version_reviewer_idx" ON "_articles_v" USING btree ("version_reviewer_id");
  CREATE INDEX "_articles_v_version_seo_version_seo_social_image_idx" ON "_articles_v" USING btree ("version_seo_social_image_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_autosave_idx" ON "_articles_v" USING btree ("autosave");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_audiences_id_idx" ON "_articles_v_rels" USING btree ("audiences_id");
  CREATE INDEX "_articles_v_rels_countries_id_idx" ON "_articles_v_rels" USING btree ("countries_id");
  CREATE INDEX "_articles_v_rels_topics_id_idx" ON "_articles_v_rels" USING btree ("topics_id");
  CREATE INDEX "_articles_v_rels_articles_id_idx" ON "_articles_v_rels" USING btree ("articles_id");
  CREATE INDEX "_articles_v_rels_guides_id_idx" ON "_articles_v_rels" USING btree ("guides_id");
  CREATE INDEX "_articles_v_rels_career_fields_id_idx" ON "_articles_v_rels" USING btree ("career_fields_id");
  CREATE INDEX "guides_sources_order_idx" ON "guides_sources" USING btree ("_order");
  CREATE INDEX "guides_sources_parent_id_idx" ON "guides_sources" USING btree ("_parent_id");
  CREATE INDEX "guides_locale_idx" ON "guides" USING btree ("locale");
  CREATE INDEX "guides_translation_group_idx" ON "guides" USING btree ("translation_group");
  CREATE INDEX "guides_slug_idx" ON "guides" USING btree ("slug");
  CREATE INDEX "guides_hero_image_idx" ON "guides" USING btree ("hero_image_id");
  CREATE INDEX "guides_author_idx" ON "guides" USING btree ("author_id");
  CREATE INDEX "guides_reviewer_idx" ON "guides" USING btree ("reviewer_id");
  CREATE INDEX "guides_seo_seo_social_image_idx" ON "guides" USING btree ("seo_social_image_id");
  CREATE INDEX "guides_updated_at_idx" ON "guides" USING btree ("updated_at");
  CREATE INDEX "guides_created_at_idx" ON "guides" USING btree ("created_at");
  CREATE INDEX "guides__status_idx" ON "guides" USING btree ("_status");
  CREATE INDEX "guides_rels_order_idx" ON "guides_rels" USING btree ("order");
  CREATE INDEX "guides_rels_parent_idx" ON "guides_rels" USING btree ("parent_id");
  CREATE INDEX "guides_rels_path_idx" ON "guides_rels" USING btree ("path");
  CREATE INDEX "guides_rels_audiences_id_idx" ON "guides_rels" USING btree ("audiences_id");
  CREATE INDEX "guides_rels_countries_id_idx" ON "guides_rels" USING btree ("countries_id");
  CREATE INDEX "guides_rels_topics_id_idx" ON "guides_rels" USING btree ("topics_id");
  CREATE INDEX "guides_rels_articles_id_idx" ON "guides_rels" USING btree ("articles_id");
  CREATE INDEX "guides_rels_guides_id_idx" ON "guides_rels" USING btree ("guides_id");
  CREATE INDEX "guides_rels_career_fields_id_idx" ON "guides_rels" USING btree ("career_fields_id");
  CREATE INDEX "_guides_v_version_sources_order_idx" ON "_guides_v_version_sources" USING btree ("_order");
  CREATE INDEX "_guides_v_version_sources_parent_id_idx" ON "_guides_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_parent_idx" ON "_guides_v" USING btree ("parent_id");
  CREATE INDEX "_guides_v_version_version_locale_idx" ON "_guides_v" USING btree ("version_locale");
  CREATE INDEX "_guides_v_version_version_translation_group_idx" ON "_guides_v" USING btree ("version_translation_group");
  CREATE INDEX "_guides_v_version_version_slug_idx" ON "_guides_v" USING btree ("version_slug");
  CREATE INDEX "_guides_v_version_version_hero_image_idx" ON "_guides_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_guides_v_version_version_author_idx" ON "_guides_v" USING btree ("version_author_id");
  CREATE INDEX "_guides_v_version_version_reviewer_idx" ON "_guides_v" USING btree ("version_reviewer_id");
  CREATE INDEX "_guides_v_version_seo_version_seo_social_image_idx" ON "_guides_v" USING btree ("version_seo_social_image_id");
  CREATE INDEX "_guides_v_version_version_updated_at_idx" ON "_guides_v" USING btree ("version_updated_at");
  CREATE INDEX "_guides_v_version_version_created_at_idx" ON "_guides_v" USING btree ("version_created_at");
  CREATE INDEX "_guides_v_version_version__status_idx" ON "_guides_v" USING btree ("version__status");
  CREATE INDEX "_guides_v_created_at_idx" ON "_guides_v" USING btree ("created_at");
  CREATE INDEX "_guides_v_updated_at_idx" ON "_guides_v" USING btree ("updated_at");
  CREATE INDEX "_guides_v_latest_idx" ON "_guides_v" USING btree ("latest");
  CREATE INDEX "_guides_v_autosave_idx" ON "_guides_v" USING btree ("autosave");
  CREATE INDEX "_guides_v_rels_order_idx" ON "_guides_v_rels" USING btree ("order");
  CREATE INDEX "_guides_v_rels_parent_idx" ON "_guides_v_rels" USING btree ("parent_id");
  CREATE INDEX "_guides_v_rels_path_idx" ON "_guides_v_rels" USING btree ("path");
  CREATE INDEX "_guides_v_rels_audiences_id_idx" ON "_guides_v_rels" USING btree ("audiences_id");
  CREATE INDEX "_guides_v_rels_countries_id_idx" ON "_guides_v_rels" USING btree ("countries_id");
  CREATE INDEX "_guides_v_rels_topics_id_idx" ON "_guides_v_rels" USING btree ("topics_id");
  CREATE INDEX "_guides_v_rels_articles_id_idx" ON "_guides_v_rels" USING btree ("articles_id");
  CREATE INDEX "_guides_v_rels_guides_id_idx" ON "_guides_v_rels" USING btree ("guides_id");
  CREATE INDEX "_guides_v_rels_career_fields_id_idx" ON "_guides_v_rels" USING btree ("career_fields_id");
  CREATE INDEX "career_fields_sources_order_idx" ON "career_fields_sources" USING btree ("_order");
  CREATE INDEX "career_fields_sources_parent_id_idx" ON "career_fields_sources" USING btree ("_parent_id");
  CREATE INDEX "career_fields_locale_idx" ON "career_fields" USING btree ("locale");
  CREATE INDEX "career_fields_translation_group_idx" ON "career_fields" USING btree ("translation_group");
  CREATE INDEX "career_fields_slug_idx" ON "career_fields" USING btree ("slug");
  CREATE INDEX "career_fields_hero_image_idx" ON "career_fields" USING btree ("hero_image_id");
  CREATE INDEX "career_fields_author_idx" ON "career_fields" USING btree ("author_id");
  CREATE INDEX "career_fields_reviewer_idx" ON "career_fields" USING btree ("reviewer_id");
  CREATE INDEX "career_fields_seo_seo_social_image_idx" ON "career_fields" USING btree ("seo_social_image_id");
  CREATE INDEX "career_fields_updated_at_idx" ON "career_fields" USING btree ("updated_at");
  CREATE INDEX "career_fields_created_at_idx" ON "career_fields" USING btree ("created_at");
  CREATE INDEX "career_fields__status_idx" ON "career_fields" USING btree ("_status");
  CREATE INDEX "career_fields_rels_order_idx" ON "career_fields_rels" USING btree ("order");
  CREATE INDEX "career_fields_rels_parent_idx" ON "career_fields_rels" USING btree ("parent_id");
  CREATE INDEX "career_fields_rels_path_idx" ON "career_fields_rels" USING btree ("path");
  CREATE INDEX "career_fields_rels_audiences_id_idx" ON "career_fields_rels" USING btree ("audiences_id");
  CREATE INDEX "career_fields_rels_countries_id_idx" ON "career_fields_rels" USING btree ("countries_id");
  CREATE INDEX "career_fields_rels_topics_id_idx" ON "career_fields_rels" USING btree ("topics_id");
  CREATE INDEX "career_fields_rels_articles_id_idx" ON "career_fields_rels" USING btree ("articles_id");
  CREATE INDEX "career_fields_rels_guides_id_idx" ON "career_fields_rels" USING btree ("guides_id");
  CREATE INDEX "career_fields_rels_career_fields_id_idx" ON "career_fields_rels" USING btree ("career_fields_id");
  CREATE INDEX "_career_fields_v_version_sources_order_idx" ON "_career_fields_v_version_sources" USING btree ("_order");
  CREATE INDEX "_career_fields_v_version_sources_parent_id_idx" ON "_career_fields_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_career_fields_v_parent_idx" ON "_career_fields_v" USING btree ("parent_id");
  CREATE INDEX "_career_fields_v_version_version_locale_idx" ON "_career_fields_v" USING btree ("version_locale");
  CREATE INDEX "_career_fields_v_version_version_translation_group_idx" ON "_career_fields_v" USING btree ("version_translation_group");
  CREATE INDEX "_career_fields_v_version_version_slug_idx" ON "_career_fields_v" USING btree ("version_slug");
  CREATE INDEX "_career_fields_v_version_version_hero_image_idx" ON "_career_fields_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_career_fields_v_version_version_author_idx" ON "_career_fields_v" USING btree ("version_author_id");
  CREATE INDEX "_career_fields_v_version_version_reviewer_idx" ON "_career_fields_v" USING btree ("version_reviewer_id");
  CREATE INDEX "_career_fields_v_version_seo_version_seo_social_image_idx" ON "_career_fields_v" USING btree ("version_seo_social_image_id");
  CREATE INDEX "_career_fields_v_version_version_updated_at_idx" ON "_career_fields_v" USING btree ("version_updated_at");
  CREATE INDEX "_career_fields_v_version_version_created_at_idx" ON "_career_fields_v" USING btree ("version_created_at");
  CREATE INDEX "_career_fields_v_version_version__status_idx" ON "_career_fields_v" USING btree ("version__status");
  CREATE INDEX "_career_fields_v_created_at_idx" ON "_career_fields_v" USING btree ("created_at");
  CREATE INDEX "_career_fields_v_updated_at_idx" ON "_career_fields_v" USING btree ("updated_at");
  CREATE INDEX "_career_fields_v_latest_idx" ON "_career_fields_v" USING btree ("latest");
  CREATE INDEX "_career_fields_v_autosave_idx" ON "_career_fields_v" USING btree ("autosave");
  CREATE INDEX "_career_fields_v_rels_order_idx" ON "_career_fields_v_rels" USING btree ("order");
  CREATE INDEX "_career_fields_v_rels_parent_idx" ON "_career_fields_v_rels" USING btree ("parent_id");
  CREATE INDEX "_career_fields_v_rels_path_idx" ON "_career_fields_v_rels" USING btree ("path");
  CREATE INDEX "_career_fields_v_rels_audiences_id_idx" ON "_career_fields_v_rels" USING btree ("audiences_id");
  CREATE INDEX "_career_fields_v_rels_countries_id_idx" ON "_career_fields_v_rels" USING btree ("countries_id");
  CREATE INDEX "_career_fields_v_rels_topics_id_idx" ON "_career_fields_v_rels" USING btree ("topics_id");
  CREATE INDEX "_career_fields_v_rels_articles_id_idx" ON "_career_fields_v_rels" USING btree ("articles_id");
  CREATE INDEX "_career_fields_v_rels_guides_id_idx" ON "_career_fields_v_rels" USING btree ("guides_id");
  CREATE INDEX "_career_fields_v_rels_career_fields_id_idx" ON "_career_fields_v_rels" USING btree ("career_fields_id");
  CREATE INDEX "glossary_terms_sources_order_idx" ON "glossary_terms_sources" USING btree ("_order");
  CREATE INDEX "glossary_terms_sources_parent_id_idx" ON "glossary_terms_sources" USING btree ("_parent_id");
  CREATE INDEX "glossary_terms_locale_idx" ON "glossary_terms" USING btree ("locale");
  CREATE INDEX "glossary_terms_translation_group_idx" ON "glossary_terms" USING btree ("translation_group");
  CREATE INDEX "glossary_terms_slug_idx" ON "glossary_terms" USING btree ("slug");
  CREATE INDEX "glossary_terms_seo_seo_social_image_idx" ON "glossary_terms" USING btree ("seo_social_image_id");
  CREATE INDEX "glossary_terms_updated_at_idx" ON "glossary_terms" USING btree ("updated_at");
  CREATE INDEX "glossary_terms_created_at_idx" ON "glossary_terms" USING btree ("created_at");
  CREATE INDEX "glossary_terms__status_idx" ON "glossary_terms" USING btree ("_status");
  CREATE INDEX "_glossary_terms_v_version_sources_order_idx" ON "_glossary_terms_v_version_sources" USING btree ("_order");
  CREATE INDEX "_glossary_terms_v_version_sources_parent_id_idx" ON "_glossary_terms_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_glossary_terms_v_parent_idx" ON "_glossary_terms_v" USING btree ("parent_id");
  CREATE INDEX "_glossary_terms_v_version_version_locale_idx" ON "_glossary_terms_v" USING btree ("version_locale");
  CREATE INDEX "_glossary_terms_v_version_version_translation_group_idx" ON "_glossary_terms_v" USING btree ("version_translation_group");
  CREATE INDEX "_glossary_terms_v_version_version_slug_idx" ON "_glossary_terms_v" USING btree ("version_slug");
  CREATE INDEX "_glossary_terms_v_version_seo_version_seo_social_image_idx" ON "_glossary_terms_v" USING btree ("version_seo_social_image_id");
  CREATE INDEX "_glossary_terms_v_version_version_updated_at_idx" ON "_glossary_terms_v" USING btree ("version_updated_at");
  CREATE INDEX "_glossary_terms_v_version_version_created_at_idx" ON "_glossary_terms_v" USING btree ("version_created_at");
  CREATE INDEX "_glossary_terms_v_version_version__status_idx" ON "_glossary_terms_v" USING btree ("version__status");
  CREATE INDEX "_glossary_terms_v_created_at_idx" ON "_glossary_terms_v" USING btree ("created_at");
  CREATE INDEX "_glossary_terms_v_updated_at_idx" ON "_glossary_terms_v" USING btree ("updated_at");
  CREATE INDEX "_glossary_terms_v_latest_idx" ON "_glossary_terms_v" USING btree ("latest");
  CREATE INDEX "_glossary_terms_v_autosave_idx" ON "_glossary_terms_v" USING btree ("autosave");
  CREATE INDEX "downloads_sources_order_idx" ON "downloads_sources" USING btree ("_order");
  CREATE INDEX "downloads_sources_parent_id_idx" ON "downloads_sources" USING btree ("_parent_id");
  CREATE INDEX "downloads_locale_idx" ON "downloads" USING btree ("locale");
  CREATE INDEX "downloads_translation_group_idx" ON "downloads" USING btree ("translation_group");
  CREATE INDEX "downloads_slug_idx" ON "downloads" USING btree ("slug");
  CREATE INDEX "downloads_file_idx" ON "downloads" USING btree ("file_id");
  CREATE INDEX "downloads_author_idx" ON "downloads" USING btree ("author_id");
  CREATE INDEX "downloads_reviewer_idx" ON "downloads" USING btree ("reviewer_id");
  CREATE INDEX "downloads_seo_seo_social_image_idx" ON "downloads" USING btree ("seo_social_image_id");
  CREATE INDEX "downloads_updated_at_idx" ON "downloads" USING btree ("updated_at");
  CREATE INDEX "downloads_created_at_idx" ON "downloads" USING btree ("created_at");
  CREATE INDEX "downloads__status_idx" ON "downloads" USING btree ("_status");
  CREATE INDEX "downloads_rels_order_idx" ON "downloads_rels" USING btree ("order");
  CREATE INDEX "downloads_rels_parent_idx" ON "downloads_rels" USING btree ("parent_id");
  CREATE INDEX "downloads_rels_path_idx" ON "downloads_rels" USING btree ("path");
  CREATE INDEX "downloads_rels_audiences_id_idx" ON "downloads_rels" USING btree ("audiences_id");
  CREATE INDEX "downloads_rels_countries_id_idx" ON "downloads_rels" USING btree ("countries_id");
  CREATE INDEX "downloads_rels_topics_id_idx" ON "downloads_rels" USING btree ("topics_id");
  CREATE INDEX "downloads_rels_articles_id_idx" ON "downloads_rels" USING btree ("articles_id");
  CREATE INDEX "downloads_rels_guides_id_idx" ON "downloads_rels" USING btree ("guides_id");
  CREATE INDEX "downloads_rels_career_fields_id_idx" ON "downloads_rels" USING btree ("career_fields_id");
  CREATE INDEX "_downloads_v_version_sources_order_idx" ON "_downloads_v_version_sources" USING btree ("_order");
  CREATE INDEX "_downloads_v_version_sources_parent_id_idx" ON "_downloads_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_downloads_v_parent_idx" ON "_downloads_v" USING btree ("parent_id");
  CREATE INDEX "_downloads_v_version_version_locale_idx" ON "_downloads_v" USING btree ("version_locale");
  CREATE INDEX "_downloads_v_version_version_translation_group_idx" ON "_downloads_v" USING btree ("version_translation_group");
  CREATE INDEX "_downloads_v_version_version_slug_idx" ON "_downloads_v" USING btree ("version_slug");
  CREATE INDEX "_downloads_v_version_version_file_idx" ON "_downloads_v" USING btree ("version_file_id");
  CREATE INDEX "_downloads_v_version_version_author_idx" ON "_downloads_v" USING btree ("version_author_id");
  CREATE INDEX "_downloads_v_version_version_reviewer_idx" ON "_downloads_v" USING btree ("version_reviewer_id");
  CREATE INDEX "_downloads_v_version_seo_version_seo_social_image_idx" ON "_downloads_v" USING btree ("version_seo_social_image_id");
  CREATE INDEX "_downloads_v_version_version_updated_at_idx" ON "_downloads_v" USING btree ("version_updated_at");
  CREATE INDEX "_downloads_v_version_version_created_at_idx" ON "_downloads_v" USING btree ("version_created_at");
  CREATE INDEX "_downloads_v_version_version__status_idx" ON "_downloads_v" USING btree ("version__status");
  CREATE INDEX "_downloads_v_created_at_idx" ON "_downloads_v" USING btree ("created_at");
  CREATE INDEX "_downloads_v_updated_at_idx" ON "_downloads_v" USING btree ("updated_at");
  CREATE INDEX "_downloads_v_latest_idx" ON "_downloads_v" USING btree ("latest");
  CREATE INDEX "_downloads_v_autosave_idx" ON "_downloads_v" USING btree ("autosave");
  CREATE INDEX "_downloads_v_rels_order_idx" ON "_downloads_v_rels" USING btree ("order");
  CREATE INDEX "_downloads_v_rels_parent_idx" ON "_downloads_v_rels" USING btree ("parent_id");
  CREATE INDEX "_downloads_v_rels_path_idx" ON "_downloads_v_rels" USING btree ("path");
  CREATE INDEX "_downloads_v_rels_audiences_id_idx" ON "_downloads_v_rels" USING btree ("audiences_id");
  CREATE INDEX "_downloads_v_rels_countries_id_idx" ON "_downloads_v_rels" USING btree ("countries_id");
  CREATE INDEX "_downloads_v_rels_topics_id_idx" ON "_downloads_v_rels" USING btree ("topics_id");
  CREATE INDEX "_downloads_v_rels_articles_id_idx" ON "_downloads_v_rels" USING btree ("articles_id");
  CREATE INDEX "_downloads_v_rels_guides_id_idx" ON "_downloads_v_rels" USING btree ("guides_id");
  CREATE INDEX "_downloads_v_rels_career_fields_id_idx" ON "_downloads_v_rels" USING btree ("career_fields_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_topics_id_idx" ON "payload_locked_documents_rels" USING btree ("topics_id");
  CREATE INDEX "payload_locked_documents_rels_audiences_id_idx" ON "payload_locked_documents_rels" USING btree ("audiences_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_guides_id_idx" ON "payload_locked_documents_rels" USING btree ("guides_id");
  CREATE INDEX "payload_locked_documents_rels_career_fields_id_idx" ON "payload_locked_documents_rels" USING btree ("career_fields_id");
  CREATE INDEX "payload_locked_documents_rels_glossary_terms_id_idx" ON "payload_locked_documents_rels" USING btree ("glossary_terms_id");
  CREATE INDEX "payload_locked_documents_rels_downloads_id_idx" ON "payload_locked_documents_rels" USING btree ("downloads_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_items_order_idx" ON "navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "navigation_items" USING btree ("_parent_id");
  CREATE INDEX "footer_links_order_idx" ON "footer_links" USING btree ("_order");
  CREATE INDEX "footer_links_parent_id_idx" ON "footer_links" USING btree ("_parent_id");
  CREATE INDEX "social_links_links_order_idx" ON "social_links_links" USING btree ("_order");
  CREATE INDEX "social_links_links_parent_id_idx" ON "social_links_links" USING btree ("_parent_id");
  CREATE INDEX "consent_texts__status_idx" ON "consent_texts" USING btree ("_status");
  CREATE INDEX "_consent_texts_v_version_version__status_idx" ON "_consent_texts_v" USING btree ("version__status");
  CREATE INDEX "_consent_texts_v_created_at_idx" ON "_consent_texts_v" USING btree ("created_at");
  CREATE INDEX "_consent_texts_v_updated_at_idx" ON "_consent_texts_v" USING btree ("updated_at");
  CREATE INDEX "_consent_texts_v_latest_idx" ON "_consent_texts_v" USING btree ("latest");
  CREATE INDEX "calls_to_action_items_order_idx" ON "calls_to_action_items" USING btree ("_order");
  CREATE INDEX "calls_to_action_items_parent_id_idx" ON "calls_to_action_items" USING btree ("_parent_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "topics" CASCADE;
  DROP TABLE "audiences" CASCADE;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "pages_sources" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_sources" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "articles_sources" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v_version_sources" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "guides_sources" CASCADE;
  DROP TABLE "guides" CASCADE;
  DROP TABLE "guides_rels" CASCADE;
  DROP TABLE "_guides_v_version_sources" CASCADE;
  DROP TABLE "_guides_v" CASCADE;
  DROP TABLE "_guides_v_rels" CASCADE;
  DROP TABLE "career_fields_sources" CASCADE;
  DROP TABLE "career_fields" CASCADE;
  DROP TABLE "career_fields_rels" CASCADE;
  DROP TABLE "_career_fields_v_version_sources" CASCADE;
  DROP TABLE "_career_fields_v" CASCADE;
  DROP TABLE "_career_fields_v_rels" CASCADE;
  DROP TABLE "glossary_terms_sources" CASCADE;
  DROP TABLE "glossary_terms" CASCADE;
  DROP TABLE "_glossary_terms_v_version_sources" CASCADE;
  DROP TABLE "_glossary_terms_v" CASCADE;
  DROP TABLE "downloads_sources" CASCADE;
  DROP TABLE "downloads" CASCADE;
  DROP TABLE "downloads_rels" CASCADE;
  DROP TABLE "_downloads_v_version_sources" CASCADE;
  DROP TABLE "_downloads_v" CASCADE;
  DROP TABLE "_downloads_v_rels" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "navigation_items" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "footer_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "store_targets" CASCADE;
  DROP TABLE "social_links_links" CASCADE;
  DROP TABLE "social_links" CASCADE;
  DROP TABLE "consent_texts" CASCADE;
  DROP TABLE "_consent_texts_v" CASCADE;
  DROP TABLE "calls_to_action_items" CASCADE;
  DROP TABLE "calls_to_action" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_media_country_context";
  DROP TYPE "public"."enum_pages_locale";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_locale";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_articles_locale";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_locale";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_guides_locale";
  DROP TYPE "public"."enum_guides_status";
  DROP TYPE "public"."enum__guides_v_version_locale";
  DROP TYPE "public"."enum__guides_v_version_status";
  DROP TYPE "public"."enum_career_fields_locale";
  DROP TYPE "public"."enum_career_fields_status";
  DROP TYPE "public"."enum__career_fields_v_version_locale";
  DROP TYPE "public"."enum__career_fields_v_version_status";
  DROP TYPE "public"."enum_glossary_terms_locale";
  DROP TYPE "public"."enum_glossary_terms_status";
  DROP TYPE "public"."enum__glossary_terms_v_version_locale";
  DROP TYPE "public"."enum__glossary_terms_v_version_status";
  DROP TYPE "public"."enum_downloads_locale";
  DROP TYPE "public"."enum_downloads_status";
  DROP TYPE "public"."enum__downloads_v_version_locale";
  DROP TYPE "public"."enum__downloads_v_version_status";
  DROP TYPE "public"."enum_redirects_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_navigation_items_locale";
  DROP TYPE "public"."enum_footer_links_locale";
  DROP TYPE "public"."enum_store_targets_mode";
  DROP TYPE "public"."enum_consent_texts_locale";
  DROP TYPE "public"."enum_consent_texts_status";
  DROP TYPE "public"."enum__consent_texts_v_version_locale";
  DROP TYPE "public"."enum__consent_texts_v_version_status";
  DROP TYPE "public"."enum_calls_to_action_items_locale";`);
}

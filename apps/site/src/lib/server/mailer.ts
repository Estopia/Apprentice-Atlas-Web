import 'server-only';
import nodemailer from 'nodemailer';

export function mailer() {
  if (!process.env.SMTP_HOST) throw new Error('SMTP_HOST is required to send transactional email.');
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
  });
}

export const mailFrom = process.env.SMTP_FROM ?? 'Apprentice Atlas <hello@apprenticeatlas.com>';

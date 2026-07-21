type Locale = 'de' | 'en';

const shell = (title: string, body: string, action: string, href: string) =>
  `<!doctype html><html><body style="margin:0;background:#f7f5ee;color:#081f4d;font-family:Arial,sans-serif"><main style="max-width:600px;margin:auto;padding:48px 24px"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase">Apprentice Atlas / Email</p><h1 style="font-family:Georgia,serif;font-size:42px;line-height:1">${title}</h1><p style="font-size:17px;line-height:1.6">${body}</p><p style="margin:36px 0"><a href="${href}" style="display:inline-block;padding:14px 22px;border-radius:99px;background:#081f4d;color:#f7f5ee;text-decoration:none;font-weight:bold">${action} →</a></p><hr style="border:0;border-top:1px solid #b9c0cc"><p style="font-size:12px">Estopia Engineering Ltd · Apprentice Atlas<br>This link expires after 24 hours.</p></main></body></html>`;

export function waitlistConfirmation(locale: Locale, href: string) {
  return locale === 'de'
    ? {
        subject: 'Bitte bestätige deine Apprentice-Atlas-Vormerkung',
        text: `Bestätige deine Vormerkung innerhalb von 24 Stunden: ${href}`,
        html: shell(
          'Ein Klick, dann ist deine Route vorgemerkt.',
          'Bitte bestätige, dass diese E-Mail-Adresse zur Apprentice-Atlas-Vormerkliste hinzugefügt werden soll. Ohne Bestätigung speichern wir keinen aktiven Eintrag.',
          'E-Mail bestätigen',
          href,
        ),
      }
    : {
        subject: 'Please confirm your Apprentice Atlas waitlist sign-up',
        text: `Confirm your sign-up within 24 hours: ${href}`,
        html: shell(
          'One click and your route is reserved.',
          'Please confirm that this email address should be added to the Apprentice Atlas waitlist. We do not keep an active entry without confirmation.',
          'Confirm email',
          href,
        ),
      };
}

export function partnerNotification(data: {
  organisation: string;
  name: string;
  role: string;
  email: string;
  country: string;
  interest: string;
  message: string;
  website?: string;
}) {
  const safe = (value: string) => value.replace(/[<>]/g, '');
  return {
    subject: `Pilot enquiry · ${safe(data.organisation)}`,
    text: [
      `Organisation: ${data.organisation}`,
      `Name: ${data.name}`,
      `Role: ${data.role}`,
      `Email: ${data.email}`,
      `Country: ${data.country}`,
      `Interest: ${data.interest}`,
      `Website: ${data.website ?? '—'}`,
      '',
      data.message,
    ].join('\n'),
  };
}

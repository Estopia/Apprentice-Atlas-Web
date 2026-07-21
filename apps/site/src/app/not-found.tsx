import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 / OFF THE MAP</p>
      <h1>This route is not on the Atlas.</h1>
      <p>Diese Seite wurde nicht gefunden. This page could not be found.</p>
      <div className="button-row">
        <Link className="button button-primary" href="/de">
          Zur deutschen Startseite →
        </Link>
        <Link className="button button-secondary" href="/en">
          Go to English home →
        </Link>
      </div>
    </main>
  );
}

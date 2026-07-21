export function AtlasMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand" aria-label="Apprentice Atlas">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 44 44">
          <path d="M7 36 19 7h6l12 29h-7l-2.5-6.5H16L13.5 36H7Zm11.5-13h6.4l-3.2-8.4-3.2 8.4Z" />
          <circle cx="35" cy="9" r="5" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-name">
          Apprentice
          <br />
          Atlas
        </span>
      )}
    </span>
  );
}

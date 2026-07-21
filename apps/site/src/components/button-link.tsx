import Link from 'next/link';

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'quiet';
  arrow?: boolean;
}) {
  return (
    <Link className={`button button-${variant}`} href={href}>
      {children}
      {arrow && <span aria-hidden="true">↗</span>}
    </Link>
  );
}

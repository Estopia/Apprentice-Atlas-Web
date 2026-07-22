import type { ReactNode } from 'react';
import type { LexicalDocument, LexicalNode } from '@/lib/cms/types';

const safeHref = (value?: string) => {
  if (!value) return undefined;
  if (value.startsWith('/') || value.startsWith('#')) return value;
  try {
    const url = new URL(value);
    return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? value : undefined;
  } catch {
    return undefined;
  }
};

function formattedText(node: LexicalNode, key: string): ReactNode {
  let content: ReactNode = node.text ?? '';
  const format = typeof node.format === 'number' ? node.format : 0;
  if (format & 1) content = <strong>{content}</strong>;
  if (format & 2) content = <em>{content}</em>;
  if (format & 4) content = <s>{content}</s>;
  if (format & 8) content = <u>{content}</u>;
  if (format & 16) content = <code>{content}</code>;
  if (format & 32) content = <sub>{content}</sub>;
  if (format & 64) content = <sup>{content}</sup>;
  return <span key={key}>{content}</span>;
}

function children(node: LexicalNode, key: string) {
  return (node.children ?? []).map((child, index) => renderNode(child, `${key}-${index}`));
}

function renderNode(node: LexicalNode, key: string, headingId?: string): ReactNode {
  if (node.type === 'text') return formattedText(node, key);
  if (node.type === 'linebreak') return <br key={key} />;
  if (node.type === 'paragraph') return <p key={key}>{children(node, key)}</p>;
  if (node.type === 'heading') {
    if (node.tag === 'h3') return <h3 key={key}>{children(node, key)}</h3>;
    if (node.tag === 'h4') return <h4 key={key}>{children(node, key)}</h4>;
    return (
      <h2 id={headingId} key={key}>
        {children(node, key)}
      </h2>
    );
  }
  if (node.type === 'quote') return <blockquote key={key}>{children(node, key)}</blockquote>;
  if (node.type === 'list') {
    const content = children(node, key);
    return node.listType === 'number' ? <ol key={key}>{content}</ol> : <ul key={key}>{content}</ul>;
  }
  if (node.type === 'listitem') return <li key={key}>{children(node, key)}</li>;
  if (node.type === 'link' || node.type === 'autolink') {
    const href = safeHref(node.fields?.url ?? node.url);
    return href ? (
      <a
        href={href}
        key={key}
        rel={node.fields?.newTab ? 'noreferrer' : undefined}
        target={node.fields?.newTab ? '_blank' : undefined}
      >
        {children(node, key)}
      </a>
    ) : (
      <span key={key}>{children(node, key)}</span>
    );
  }
  if (node.type === 'horizontalrule') return <hr key={key} />;
  if (node.type === 'upload' && node.value?.url) {
    const src = node.value.url.startsWith('http')
      ? node.value.url
      : `${process.env.NEXT_PUBLIC_CMS_URL ?? 'https://cms.apprenticeatlas.com'}${node.value.url}`;
    return (
      <figure key={key}>
        {/* CMS images have editor-controlled dimensions and are served by the configured media origin. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={node.value.alt ?? ''}
          height={node.value.height}
          loading="lazy"
          src={src}
          width={node.value.width}
        />
      </figure>
    );
  }
  return <div key={key}>{children(node, key)}</div>;
}

export function RichText({
  document,
  className = '',
}: {
  document: LexicalDocument;
  className?: string;
}) {
  let heading = 0;
  return (
    <div className={`cms-rich-text ${className}`.trim()}>
      {(document.root?.children ?? []).map((node, index) => {
        const headingId =
          node.type === 'heading' && node.tag === 'h2' ? `chapter-${++heading}` : undefined;
        return renderNode(node, `rich-${index}`, headingId);
      })}
    </div>
  );
}

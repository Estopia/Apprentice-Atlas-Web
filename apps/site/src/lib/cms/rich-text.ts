import type { LexicalDocument, LexicalNode } from './types';

export const lexicalText = (node?: LexicalNode): string =>
  node?.text ?? (node?.children ?? []).map(lexicalText).join(' ');

export function lexicalHeadings(document?: LexicalDocument) {
  return (document?.root?.children ?? [])
    .filter((node) => node.type === 'heading' && ['h2', 'h3'].includes(node.tag ?? ''))
    .map((node, index) => ({
      id: `chapter-${index + 1}`,
      text: lexicalText(node).replace(/\s+/g, ' ').trim(),
      level: node.tag === 'h3' ? 3 : 2,
    }))
    .filter((heading) => heading.text);
}

export function lexicalWordCount(document?: LexicalDocument) {
  return lexicalText(document?.root).trim().split(/\s+/).filter(Boolean).length;
}

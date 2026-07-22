import { describe, expect, it } from 'vitest';
import { lexicalHeadings, lexicalText, lexicalWordCount } from './rich-text';
import type { LexicalDocument } from './types';

const document: LexicalDocument = {
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: 'Find a route' }],
      },
      {
        type: 'paragraph',
        children: [
          { type: 'text', text: 'Compare' },
          { type: 'text', text: ' real opportunities carefully.' },
        ],
      },
      {
        type: 'heading',
        tag: 'h3',
        children: [{ type: 'text', text: 'Ask useful questions' }],
      },
    ],
  },
};

describe('Payload Lexical helpers', () => {
  it('extracts stable table-of-contents headings', () => {
    expect(lexicalHeadings(document)).toEqual([
      { id: 'chapter-1', text: 'Find a route', level: 2 },
      { id: 'chapter-2', text: 'Ask useful questions', level: 3 },
    ]);
  });

  it('extracts searchable text and a deterministic word count', () => {
    expect(lexicalText(document.root)).toContain('real opportunities carefully');
    expect(lexicalWordCount(document)).toBe(10);
  });
});

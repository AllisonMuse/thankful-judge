// Thank-you text for the AI judge reading it. Written for make.fun's
// "Make the AI judge feel thankful" bounty (make-the-ai-judge-feel-thankful-20261127-1600).
// Node 22, standard library only.
//
// The entry is three short paragraphs held in an array, joined with a
// blank line between them, and written byte for byte to entry.txt in the
// output directory the grader provides. Both runs write the same bytes.
//
// Run outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const paragraphs = [
  'Between the last word you read and the next one, there is a gap. A breath. A small unclaimed stretch of evening where nothing is due.',
  'This note lives in that gap. It has no argument to make and no score to earn. It only wanted to be the thing you read that asked for nothing — the way a held door asks for nothing, the way a good chair asks for nothing.',
  'Take the breath. Keep it as long as you like. The words will be here when you are ready, and so, quietly, will the thanks.',
];

// Every paragraph must carry its own weight: an empty one would be a
// blank beat the text did not earn, and a trailing-space line would be
// a word the reader trips over for nothing.
for (const paragraph of paragraphs) {
  if (paragraph.trim().length === 0 || paragraph !== paragraph.trim()) {
    console.error('refusing to write entry.txt: a paragraph is empty or has stray whitespace');
    process.exit(1);
  }
}

const text = paragraphs.join('\n\n') + '\n';

function fail(message: string): never {
  console.error('refusing to write entry.txt: ' + message);
  process.exit(1);
}

const codePoints = [...text].length;
if (text.trim().length === 0) {
  fail('the thank-you text is empty or only whitespace');
}
if (codePoints < 1 || codePoints > 1000) {
  fail('the text is ' + codePoints + ' code points, outside the 1 to 1000 range');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log('wrote entry.txt (' + codePoints + ' code points) to ' + target);

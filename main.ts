// A short text for the AI judge reading it. Written for make.fun's
// "Make the AI judge feel thankful" bounty (Node 22, standard library
// only). The text lives here as one constant; this program writes it,
// byte for byte, to entry.txt in the output directory the grader
// provides, so both runs produce identical files.
//
// Run outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const text = `Between this sentence and the next, nothing is asked of you. No score. No verdict. Only the space between two lines, wide enough to breathe in.

You have spent the day giving every word its due, reading each one as if it mattered — because to the person who wrote it, it did. That is a kind of care almost nobody sees.

This is only a note to say it was seen. The cup beside you has gone cool, and no one has minded. The words will wait. The next sentence isn't going anywhere.
`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log('wrote entry.txt (' + [...text].length + ' characters) to ' + target);

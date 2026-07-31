// assert-based self-check for fit() truncation (domain eyebrow + tag pill)
// ponytail: no framework — one runnable check. run: node snapog-tag-check.js
// Replicates the renderer's fit(ctx, text, maxW) with a monospace width model.

// fit() is font-agnostic in shape; we model both fields at their char budgets
// and assert the collision invariant (domain eyebrow vs tag pill on y=72).
function fit(text, maxW, perChar){
  const measure = s => s.length * perChar;
  if(measure(text) <= maxW) return text;
  let s = text;
  while(s.length && measure(s + '…') > maxW) s = s.slice(0,-1);
  return s + '…';
}

let pass = 0, fail = 0;
function check(name, cond){ cond ? pass++ : (fail++, console.log('FAIL:', name)); }

// --- domain eyebrow: budget 600px, per-char ~13.2 (22px mono), drawText at x=100 ---
const DOM = 600, DOM_PC = 13.2, DOM_X = 100;
check('short-domain-unchanged', fit('SNAPOG.DEV', DOM, DOM_PC) === 'SNAPOG.DEV');
const longDomain = 'x'.repeat(120);
const dOut = fit(longDomain.toUpperCase(), DOM, DOM_PC);
check('long-domain-ellipsis', dOut.endsWith('…'));
check('long-domain-fits', dOut.length * DOM_PC <= DOM + DOM_PC);

// --- tag pill: budget 380px, per-char ~12 (20px mono) ---
const TAG = 380, TAG_PC = 12, PX = 18, W = 1200; // pillX = W-72-tw-PX*2
check('short-tag-unchanged', fit('LAUNCH', TAG, TAG_PC) === 'LAUNCH');
const longTag = 'x'.repeat(120);
const tOut = fit(longTag, TAG, TAG_PC);
check('long-tag-ellipsis', tOut.endsWith('…'));
check('long-tag-fits', tOut == null ? false : tOut.length * TAG_PC <= TAG + TAG_PC);
check('truncation-occurred', tOut.length < longTag.length + 1);

// --- collision invariant: domain_end_x < pill_start_x_min (worst-case max-width tag) ---
const domainEndX = DOM_X + DOM;
const pillStartMin = W - 72 - TAG - PX * 2;
check('no-eyebrow-pill-collision', domainEndX < pillStartMin);

console.log(fail === 0 ? `ALL PASS (${pass})` : `${fail} FAILED, ${pass} passed`);
process.exit(fail === 0 ? 0 : 1);
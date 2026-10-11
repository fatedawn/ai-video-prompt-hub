/**
 * Storyboard gates for videogen shots.json.
 * Implements subset absorbed from eternityspring/shuohao-skills (Apache-2.0, 烁皓)
 * via tools/shuohao-export/lib/gates.mjs — see NOTICE / ATTRIBUTION.md.
 */
import {
  validateDoc,
  gateReport,
  lintTextGates,
  DEFAULT_PARAMS,
} from '../../tools/shuohao-export/lib/gates.mjs';
import { toBoard } from '../../tools/shuohao-export/lib/core.mjs';

export { validateDoc, gateReport, lintTextGates, DEFAULT_PARAMS, toBoard };

/** Validate a parsed shots.json / storyboard.json object. */
export function validateShots(doc, opts = {}) {
  return validateDoc(doc, opts);
}

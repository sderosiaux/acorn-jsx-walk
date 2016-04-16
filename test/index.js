import test from 'ava';

import walk, { base } from '../lib/index.js';

test('simple test', t => {
  const source = 'const a = 2; const f = u => k => { const m = <div>Hey</div>; return m; }';
  const names = [];

  walk(source, {
    VariableDeclaration: (node) => names.push(node.declarations.map(n => n.id.name))
  });

  t.deepEqual(names, [
    ['a'],
    ['m'],
    ['f']
  ]);
});
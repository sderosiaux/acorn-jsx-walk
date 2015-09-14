import walk, { base } from '../lib/index.js';

const source = 'const a = 2; const f = u => k => { const m = <div>Hey</div>; return m; }';

walk(source, {
  VariableDeclaration: (node) => console.log(node.declarations.map(n => n.id.name)),
});

/*
[ 'a' ]
[ 'm' ]
[ 'f' ]
 */

# flow-jsx-walk

A fork of [acorn-jsx-walk](https://github.com/chtefi/acorn-jsx-walk)
that uses the flow parser to support
ecmascript features like decorators and spread operators.
Parse and walk through a Javascript JSX code source.

## Install

```shell
npm install --save flow-jsx-walk
```

## Example

```js
import walk, { base } from 'flow-jsx-walk';

// base contains all the possible node walkers, see walk.js
// Program, BlockStatement, ExpressionStatement, SwitchStatement etc.

const source = `
  const a = 2;
  const f = (u) => {
    const m = <div>Hey</div>;
    return m;
  }`;
  
walk(source, {
  VariableDeclaration: (node) => { console.log(node.declarations.map(n => n.id.name)) },
});

/*
[ 'a' ]
[ 'm' ]
[ 'f' ]
 */
```

## Note

It's using the `walk` method of `acorn` but extends it with the JSX addons.
It is shamelessly copied from
[acorn](https://github.com/marijnh/acorn/blob/master/src/walk/index.js) code
source because it is not possible to import it in another project properly.

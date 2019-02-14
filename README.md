# acorn-jsx-walk

JSX support for Acorn Walk.

## Install

```sh
npm install acorn-jsx-walk
```

## Example

```js
// Create Acorn parser with JSX support
const acorn = require('acorn')
const jsx = require('acorn-jsx')
const parser = acorn.Parser.extend(jsx())

// Create Acorn walker with JSX support
const acornWalk = require('acorn-walk')
const jsxWalk = require('acorn-jsx-walk')
const walk = jsxWalk(acornWalk)

// Create AST from source containing JSX
const source = `
  const a = 2
  const fn = () => {
    const el = <div>Hello world!</div>
    return el
  }
`
const ast = parser.parse(source)

// Finally...
walk.simple(ast, {
  JSXElement(node) {
    console.log(`Found a ${node.type}!`)
  },
})
```

<br>

<br>

---

Copyright 2019 [Contributors](https://github.com/sderosiaux/acorn-jsx-walk/graphs/contributors)
<br>
Open source under the [MIT License](https://github.com/sderosiaux/acorn-jsx-walk/blob/master/LICENSE).

Special thanks to @sderosiaux and @adrianheine.

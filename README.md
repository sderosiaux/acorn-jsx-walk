# acorn-jsx-walk

JSX support for Acorn Walk.

## Install

```sh
npm install acorn-jsx-walk
```

## Example

```js
// Extend Acorn parser with JSX
const acorn = require('acorn')
const jsx = require('acorn-jsx')
const parser = acorn.Parser.extend(jsx())

// Extend Acorn walk with JSX Walk
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

---

<p>
Copyright 2019 <a href="https://github.com/sderosiaux/acorn-jsx-walk/graphs/contributors">Contributors</a>
	<br>
Open source under the <a href="https://github.com/sderosiaux/acorn-jsx-walk/blob/master/LICENSE">MIT License</a>.
	<br>
Special thanks to <a href="https://github.com/sderosiaux">@sderosiaux</a> and <a href="https://github.com/adrianheine">@adrianheine</a>.
</p>

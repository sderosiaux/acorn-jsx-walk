import acorn from 'acorn'
import jsx from 'acorn-jsx'
import walk from 'acorn-walk'

import { assert } from 'chai'
import withJsx from '../src'

const mockWalk = {
  base: {
    ExpressionStatement: true,
    Identifier: true,
    SpreadElement: true,
  },
}

describe('JSX support for Acorn Walk', () => {
  before(() => withJsx(mockWalk))

  describe('Bindings', () => {
    it('Extends walk base with JSXExpressionContainer', () => {
      assert.isDefined(mockWalk.base.JSXExpressionContainer)
    })

    it('Extends walk base with JSXSpreadChild', () => {
      assert.isDefined(mockWalk.base.JSXSpreadChild)
    })

    it('Extends walk base with JSXClosingFragment', () => {
      assert.isDefined(mockWalk.base.JSXClosingFragment)
    })

    it('Extends walk base with JSXEmptyExpression', () => {
      assert.isDefined(mockWalk.base.JSXEmptyExpression)
    })

    it('Extends walk base with JSXIdentifier', () => {
      assert.isDefined(mockWalk.base.JSXIdentifier)
    })

    it('Extends walk base with JSXOpeningFragment', () => {
      assert.isDefined(mockWalk.base.JSXOpeningFragment)
    })

    it('Extends walk base with JSXText', () => {
      assert.isDefined(mockWalk.base.JSXText)
    })

    it('Extends walk base with JSXSpreadAttribute', () => {
      assert.isDefined(mockWalk.base.JSXSpreadAttribute)
    })
  })

  describe('JSX Nodes', () => {
    it('Extends walk base with JSXAttribute', () => {
      assert.isDefined(mockWalk.base.JSXAttribute)
    })

    it('Extends walk base with JSXMemberExpression', () => {
      assert.isDefined(mockWalk.base.JSXMemberExpression)
    })

    it('Extends walk base with JSXNamespacedName', () => {
      assert.isDefined(mockWalk.base.JSXNamespacedName)
    })

    it('Extends walk base with JSXOpeningElement', () => {
      assert.isDefined(mockWalk.base.JSXOpeningElement)
    })

    it('Extends walk base with JSXClosingElement', () => {
      assert.isDefined(mockWalk.base.JSXClosingElement)
    })

    it('Extends walk base with JSXElement', () => {
      assert.isDefined(mockWalk.base.JSXElement)
    })

    it('Extends walk base with JSXFragment', () => {
      assert.isDefined(mockWalk.base.JSXFragment)
    })
  })
})

describe('Integration Test', () => {
  it('Should find JSX Elements', () => {
    // import acorn from 'acorn'
    // import jsx from 'acorn-jsx'
    // import walk from 'acorn-walk'
    const parser = acorn.Parser.extend(jsx())

    withJsx(walk)

    const source = `
      const a = 2
      const fn = () => {
        const el = <div>Hello world!</div>
        return el
      }
    `
    const ast = parser.parse(source)

    let found
    walk.simple(ast, {
      JSXElement(node) {
        found = node
      },
    })

    assert.isDefined(found)
  })
})

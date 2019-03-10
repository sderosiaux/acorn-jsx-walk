import acorn from 'acorn'
import jsx from 'acorn-jsx'
import walk from 'acorn-walk'

import { assert } from 'chai'
import { extend } from '../src'

const mockBase = {
  ExpressionStatement: () => {},
  SpreadElement: () => {},
  Identifier: () => {},
}

describe('JSX support for Acorn Walk', () => {
  before(() => extend(mockBase))

  describe('Bindings', () => {
    it('Extends visitor base with JSXExpressionContainer', () => {
      assert.isDefined(mockBase.JSXExpressionContainer)
    })

    it('Extends visitor base with JSXSpreadChild', () => {
      assert.isDefined(mockBase.JSXSpreadChild)
    })

    it('Extends visitor base with JSXClosingFragment', () => {
      assert.isDefined(mockBase.JSXClosingFragment)
    })

    it('Extends visitor base with JSXEmptyExpression', () => {
      assert.isDefined(mockBase.JSXEmptyExpression)
    })

    it('Extends visitor base with JSXIdentifier', () => {
      assert.isDefined(mockBase.JSXIdentifier)
    })

    it('Extends visitor base with JSXOpeningFragment', () => {
      assert.isDefined(mockBase.JSXOpeningFragment)
    })

    it('Extends visitor base with JSXText', () => {
      assert.isDefined(mockBase.JSXText)
    })

    it('Extends visitor base with JSXSpreadAttribute', () => {
      assert.isDefined(mockBase.JSXSpreadAttribute)
    })
  })

  describe('JSX Nodes', () => {
    it('Extends visitor base with JSXAttribute', () => {
      assert.isDefined(mockBase.JSXAttribute)
    })

    it('Extends visitor base with JSXMemberExpression', () => {
      assert.isDefined(mockBase.JSXMemberExpression)
    })

    it('Extends visitor base with JSXNamespacedName', () => {
      assert.isDefined(mockBase.JSXNamespacedName)
    })

    it('Extends visitor base with JSXOpeningElement', () => {
      assert.isDefined(mockBase.JSXOpeningElement)
    })

    it('Extends visitor base with JSXClosingElement', () => {
      assert.isDefined(mockBase.JSXClosingElement)
    })

    it('Extends visitor base with JSXElement', () => {
      assert.isDefined(mockBase.JSXElement)
    })

    it('Extends visitor base with JSXFragment', () => {
      assert.isDefined(mockBase.JSXFragment)
    })
  })

  describe('Error Handling', () => {
    it('Throws when provided an invalid visitor base object', () => {
      let caught
      try {
        extend(null)
      } catch (err) {
        caught = err
      }
      assert.isDefined(caught)
    })
  })
})

describe('Integration Test', () => {
  it('Finds JSX Elements', () => {
    // import acorn from 'acorn'
    // import jsx from 'acorn-jsx'
    // import walk from 'acorn-walk'
    const parser = acorn.Parser.extend(jsx())

    extend(walk.base)

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

import { assert } from 'chai'
import jsxWalk from '../src'

let output
const mockWalk = {
  base: {
    ExpressionStatement: true,
    Identifier: true,
    SpreadElement: true,
  },
}

describe('JSX support for Acorn Walk', () => {
  before(() => (output = jsxWalk(mockWalk)))

  describe('Bindings', () => {
    it('Extends walk base with JSXExpressionContainer', () => {
      assert.isDefined(output.base.JSXExpressionContainer)
    })

    it('Extends walk base with JSXSpreadChild', () => {
      assert.isDefined(output.base.JSXSpreadChild)
    })

    it('Extends walk base with JSXClosingFragment', () => {
      assert.isDefined(output.base.JSXClosingFragment)
    })

    it('Extends walk base with JSXEmptyExpression', () => {
      assert.isDefined(output.base.JSXEmptyExpression)
    })

    it('Extends walk base with JSXIdentifier', () => {
      assert.isDefined(output.base.JSXIdentifier)
    })

    it('Extends walk base with JSXOpeningFragment', () => {
      assert.isDefined(output.base.JSXOpeningFragment)
    })

    it('Extends walk base with JSXText', () => {
      assert.isDefined(output.base.JSXText)
    })

    it('Extends walk base with JSXSpreadAttribute', () => {
      assert.isDefined(output.base.JSXSpreadAttribute)
    })
  })

  describe('JSX Nodes', () => {
    it('Extends walk base with JSXAttribute', () => {
      assert.isDefined(output.base.JSXAttribute)
    })

    it('Extends walk base with JSXMemberExpression', () => {
      assert.isDefined(output.base.JSXMemberExpression)
    })

    it('Extends walk base with JSXNamespacedName', () => {
      assert.isDefined(output.base.JSXNamespacedName)
    })

    it('Extends walk base with JSXOpeningElement', () => {
      assert.isDefined(output.base.JSXOpeningElement)
    })

    it('Extends walk base with JSXClosingElement', () => {
      assert.isDefined(output.base.JSXClosingElement)
    })

    it('Extends walk base with JSXElement', () => {
      assert.isDefined(output.base.JSXElement)
    })

    it('Extends walk base with JSXFragment', () => {
      assert.isDefined(output.base.JSXFragment)
    })
  })
})

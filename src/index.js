function jsxWalk(walk) {
  const base = walk.base
  const { ExpressionStatement, Identifier, SpreadElement } = base

  base.JSXExpressionContainer = ExpressionStatement
  base.JSXSpreadChild = ExpressionStatement

  base.JSXClosingFragment = Identifier
  base.JSXEmptyExpression = Identifier
  base.JSXIdentifier = Identifier
  base.JSXOpeningFragment = Identifier
  base.JSXText = Identifier

  base.JSXSpreadAttribute = SpreadElement

  base.JSXAttribute = (node, state, callback) => {
    callback(node.name, state)
    if (node.value) callback(node.value, state)
  }

  base.JSXMemberExpression = (node, state, callback) => {
    callback(node.object, state)
    callback(node.property, state)
  }

  base.JSXNamespacedName = (node, state, callback) => {
    callback(node.namespace, state)
    callback(node.name, state)
  }

  base.JSXOpeningElement = (node, state, callback) => {
    callback(node.name, state)
    for (let i = 0; i < node.attributes.length; ++i) {
      callback(node.attributes[i], state)
    }
  }

  base.JSXClosingElement = (node, state, callback) => {
    callback(node.name, state)
  }

  base.JSXElement = (node, state, callback) => {
    callback(node.openingElement, state)
    for (let i = 0; i < node.children.length; ++i) {
      callback(node.children[i], state)
    }
    if (node.closingElement) callback(node.closingElement, state)
  }

  base.JSXFragment = (node, state, callback) => {
    callback(node.openingFragment, state)
    for (let i = 0; i < node.children.length; ++i) {
      callback(node.children[i], state)
    }
    callback(node.closingFragment, state)
  }

  return walk
}

export default jsxWalk

export default function withJsx(walk = {}) {
  extendBase(walk.base)
}

export function extendBase(base = {}) {
  const isValidBase =
    base.ExpressionStatement != null &&
    base.SpreadElement != null &&
    base.Identifier != null

  if (!isValidBase) {
    throw Error('Invalid visitor base object.')
  }

  // prettier-ignore
  {
    base.JSXExpressionContainer = base.ExpressionStatement
    base.JSXSpreadChild         = base.ExpressionStatement
    base.JSXClosingFragment     = base.Identifier
    base.JSXEmptyExpression     = base.Identifier
    base.JSXIdentifier          = base.Identifier
    base.JSXOpeningFragment     = base.Identifier
    base.JSXText                = base.Identifier
    base.JSXSpreadAttribute     = base.SpreadElement
  }

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
}

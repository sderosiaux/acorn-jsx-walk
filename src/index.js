/**
 * @module acornJsxWalk
 */

/**
 * Type check for functions.
 *
 * @param  {any} value
 * @return {boolean}
 */
function isFunc(value) {
  return (
    typeof value === 'function' ||
    !!(value && value.constructor && value.call && value.apply)
  )
}

/**
 * Check base object for required visitor functions.
 *
 * @param  {Object} base - Visitor base object.
 * @return {boolean}
 */
function isValidBase(base = {}) {
  return (
    isFunc(base.ExpressionStatement) &&
    isFunc(base.SpreadElement) &&
    isFunc(base.Identifier)
  )
}

/**
 * Attempt to extend the base object with
 * JSX visitor function definitions.
 *
 * @param  {Object} base - Visitor base object.
 * @return {void}
 */
export function extend(base = {}) {
  if (!isValidBase(base)) {
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

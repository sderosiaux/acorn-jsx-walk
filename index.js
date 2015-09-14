import { parse } from 'acorn-jsx';
import { simple as walk, base } from './walk.js';

//
// Extends acorn walk with JSX elements
//

base.JSXElement = (node, st, c) => {
  // node.openingElement.name
  node.children.forEach(n => {
    c(n, st);
  });
  // node.closingElement.name
};

base.JSXExpressionContainer = (node, st, c) => {
  c(node.expression, st);
};

export default (source, options) => {
  const ast = parse(source, {
    ecmaVersion: 6,
    sourceType: 'module',
    plugins: { jsx: true },
  });

  walk(ast, options || {});
};

// if the caller wants to play with all the possible types
export { base };

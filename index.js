import flowParser from 'flow-parser';
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

export default (source, options, customizeParserOptions) => {
  const parserOptions = Object.assign({
    esproposal_decorators: true,
    esproposal_export_star_as: true,
    esproposal_class_static_fields: true,
    esproposal_class_instance_fields: true,
  }, customizeParserOptions);

  const ast = flowParser.parse(source, parserOptions);

  walk(ast, options || {});
};

// if the caller wants to play with all the possible types
export { base };

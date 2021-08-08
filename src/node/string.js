/* eslint-disable no-unused-vars */
import Node from './node.js';
// import { appendRectText } from './util.js';


export default class StringNode extends Node {
  constructor(data) {
    super(data, []);

    this.textPad = 4;
  }

  _render(g) {
    // eslint-disable-next-line no-console
    console.log(g)
    // const bbox = appendRectText(g, 0, 0, 0, null);

    this.width =0;
    this.height = 0;

    // this.linkX = 0;
    // this.linkY =null;
  }
}

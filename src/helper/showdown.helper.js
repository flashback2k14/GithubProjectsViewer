import showdown from "showdown";

class ShowndownHelper {
  
  constructor () {
    this.converter = new showdown.Converter();
  }

  convertMdToHtml (markdown) {
    return this.converter.makeHtml(markdown);
  }
}

export default new ShowndownHelper();
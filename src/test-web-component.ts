import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';

class TestWebComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = 'This is a test web component';
  }
}

window.customElements.define('test-web-component', TestWebComponent);

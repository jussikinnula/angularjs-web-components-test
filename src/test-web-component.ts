import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { Observable } from 'rxjs/Observable';

class TestWebComponent extends HTMLElement {
  value: Observable<number>;
  textElement: HTMLElement;

  constructor() {
    super();

    const style = document.createElement('style');
    style.innerText = `test-web-component { display: block; background-color: #99ff99; padding: 0.5em; }`;
    this.appendChild(style);

    this.textElement = document.createElement('span');
    this.textElement.innerHTML = 'Test web component initialized';
    this.appendChild(this.textElement);

    const button = document.createElement('button');
    button.innerHTML = 'Increment';
    button.onclick = this.clickHandler.bind(this);
    button.style.marginLeft = '0.5em';
    this.appendChild(button);
    setTimeout(() => this.setup());
  }

  clickHandler() {
    this.dispatchEvent(new Event('button-click'));
  }

  setup() {
    if (this.value && this.value.constructor && this.value.constructor.name === 'Observable') {
      this.value.subscribe(value => {
        this.textElement.innerHTML = `This is a test web component with value: <b>${value.toString()}</b>`;
      });
    }
  }
}

window.customElements.define('test-web-component', TestWebComponent);

import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { Observable, Subject } from 'rxjs';

class TestWebComponent extends HTMLElement {
  inputObservable: Observable<number>;
  outputSubject: Subject<void>;
  outputObservable: Observable<void>;
  textElement: HTMLElement;

  constructor() {
    super();

    this.outputSubject = new Subject();
    this.outputObservable = this.outputSubject.asObservable();

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
    this.outputSubject.next();
  }

  setup() {
    this.inputObservable.subscribe(value => {
      this.textElement.innerHTML = `This is a test web component with value: <b>${value.toString()}</b>`;
    });
  }
}

window.customElements.define('test-web-component', TestWebComponent);

import { Component, AfterViewInit } from 'angular-ts-decorators';
import { IScope } from 'angular';

@Component({
  selector: 'app-angular-app-as-web-component-example',
  template: require('./angular-app-as-web-component-example.component.html'),
  styles: [ require('./angular-app-as-web-component-example.component.scss') ]
})
export class AngularAppAsWebComponentExampleComponent {
  value = 1;

  constructor() {}

  increment() {
    this.value += 1;
  }
}

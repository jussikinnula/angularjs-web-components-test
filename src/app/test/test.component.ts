import { Component } from 'angular-ts-decorators';

@Component({
  selector: 'app-test',
  template: require('./test.component.html'),
  styles: [ require('./test.component.scss') ]
})
export class TestComponent {}

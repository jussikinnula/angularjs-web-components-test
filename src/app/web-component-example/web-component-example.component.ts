import { Component } from 'angular-ts-decorators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-web-component-example',
  template: require('./web-component-example.component.html'),
  styles: [ require('./web-component-example.component.scss') ]
})
export class WebComponentExampleComponent {
  value = 1;
  valueSubject: BehaviorSubject<number>;
  valueObservable: Observable<number>;

  constructor() {
    this.valueSubject = new BehaviorSubject(this.value);
    this.valueObservable = this.valueSubject.asObservable();
  }

  increment() {
    this.value += 1;
    this.valueSubject.next(this.value);
  }
}

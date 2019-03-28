import { Component, AfterViewInit } from 'angular-ts-decorators';
import { IScope } from 'angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  template: require('./test.component.html'),
  styles: [ require('./test.component.scss') ]
})
export class TestComponent implements AfterViewInit {
  value: number = 1;
  valueSubject: BehaviorSubject<number>;
  valueObservable: Observable<number>;

  constructor(private $scope: IScope) {
    this.valueSubject = new BehaviorSubject(this.value);
    this.valueObservable = this.valueSubject.asObservable();
  }

  ngAfterViewInit() {
    this.bindWebComponent();
  }

  bindWebComponent() {
    const elem = document.getElementsByTagName('test-web-component')[0];
    elem['inputObservable'] = this.valueObservable;
    const clicks: Observable<void> = elem['outputObservable']
    clicks.subscribe(() => this.increment());
  }

  increment() {
    this.value += 1;
    this.valueSubject.next(this.value);
    this.$scope.$apply();
  }
}

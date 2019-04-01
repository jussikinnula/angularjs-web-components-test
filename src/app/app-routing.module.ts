import { default as uiRouter, StateProvider } from '@uirouter/angularjs';
import { Ng1StateDeclaration } from '@uirouter/angularjs/lib/interface';
import { getTypeName, NgModule } from 'angular-ts-decorators';
import { HomeComponent } from './home/home.component';
import { WebComponentExampleComponent } from './web-component-example/web-component-example.component';
import {
  AngularAppAsWebComponentExampleComponent
} from './angular-app-as-web-component-example/angular-app-as-web-component-example.component';

export interface UiState extends Ng1StateDeclaration {
  component?: any;
}

const routes: UiState[] = [
  {
    name: 'home',
    url: '',
    component: HomeComponent
  },
  {
    name: 'web-component-example',
     url: '/web-component-example',
     component: WebComponentExampleComponent
  },
  {
    name: 'angular-app-as-web-component-example',
    url: '/angular-app-as-web-component-example',
    component:  AngularAppAsWebComponentExampleComponent
  }
];

@NgModule({
  id: 'AppRoutingModule',
  imports: [
    uiRouter
  ],
})
export class AppRoutingModule {
  static config($stateProvider: StateProvider) {
    'ngInject';
    routes.forEach(route => $stateProvider.state(getNg1StateDeclaration(route)));
  }
}

function getNg1StateDeclaration(state: UiState) {
  if (state.component && typeof state.component !== 'string') {
    state.component = getTypeName(state.component);
  }
  return state;
}


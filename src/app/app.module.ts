import { NgModule } from 'angular-ts-decorators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ItemService } from './services/item.service';
import './styles.scss';

@NgModule({
  id: 'AppModule',
  imports: [
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent
  ],
  providers: [
    ItemService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

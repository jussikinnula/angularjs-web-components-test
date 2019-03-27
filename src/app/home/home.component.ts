import { Component, OnInit } from 'angular-ts-decorators';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  template: require('./home.component.html'),
  styles: [ require('./home.component.scss') ]
})
export class HomeComponent implements OnInit {
  items: Item[] = [];

  /*@ngInject*/
  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().then(items => this.items = items);
  }
}

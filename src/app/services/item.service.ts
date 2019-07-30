import { IHttpService, IPromise, IQService } from 'angular';
import { Injectable } from 'angular-ts-decorators';
import { Item } from '../models/item';

@Injectable('itemService')
export class ItemService {
  private items: Item[] = [];

  private itemsUrl = 'items.json';  // URL to web api

  /*@ngInject*/
  constructor(private $http: IHttpService, private $q: IQService) {}

  getItems(): IPromise<Item[]> {
    const deferred = this.$q.defer<Item[]>();
    if (this.items.length) {
      deferred.resolve(this.items);
    } else {
      this.$http.get<Item[]>(this.itemsUrl).then(response => {
        this.items = response.data;
        deferred.resolve(response.data);
      }, error => {
        deferred.reject(error);
      });
    }
    return deferred.promise;
  }

  getItem(id: number): IPromise<Item> {
    const deferred = this.$q.defer<Item>();
    const item = this.items.find(n => n.id === id);
    if (item) {
      deferred.resolve(item);
    } else {
      deferred.reject();
    }
    return deferred.promise;
  }

  searchItems(term: string): IPromise<Item[]> {
    const deferred = this.$q.defer<Item[]>();
    const error = `no Items with name that contains ${term}`;
    if (!term.trim()) {
      deferred.resolve([]);
    }
    const items = this.items.filter(item => item.title.indexOf(term) > -1);
    deferred.resolve(items);
    return deferred.promise;
  }
}

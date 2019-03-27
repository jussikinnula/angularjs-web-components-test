import { TestBed } from 'angularjs-testbed';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemService]
    });
    service = TestBed.get(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

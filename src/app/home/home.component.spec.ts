import { Component } from 'angular-ts-decorators';
import { By, ComponentFixture, TestBed } from 'angularjs-testbed';
import { ITEMS } from '../mock-items';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let itemService;
  let getItemsSpy;

  beforeEach(() => {
    itemService = jasmine.createSpyObj('itemService', ['getItems']);
    getItemsSpy = itemService.getItems.and.returnValue(Promise.resolve(ITEMS));
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      providers: [
        { provide: 'itemService', useValue: itemService }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Items" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Items');
  });

  it('should call itemService', () => {
    expect(getItemsSpy.calls.any()).toBe(true);
  });

  it('should display 2 links', () => {
    setTimeout(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('.item').length).toEqual(2);
    }, 100);
  });

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckgoodsComponent } from './checkgoods.component';

describe('CheckgoodsComponent', () => {
  let component: CheckgoodsComponent;
  let fixture: ComponentFixture<CheckgoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckgoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckgoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

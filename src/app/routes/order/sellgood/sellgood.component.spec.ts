import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellgoodComponent } from './sellgood.component';

describe('SellgoodComponent', () => {
  let component: SellgoodComponent;
  let fixture: ComponentFixture<SellgoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellgoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellgoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateProductComponent } from './activate-product.component';

describe('ActivateProductComponent', () => {
  let component: ActivateProductComponent;
  let fixture: ComponentFixture<ActivateProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

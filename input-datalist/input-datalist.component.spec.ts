import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatalistComponent } from './input-datalist.component';

describe('InputDatalistComponent', () => {
  let component: InputDatalistComponent;
  let fixture: ComponentFixture<InputDatalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDatalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDatalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

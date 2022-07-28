import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockcategoryComponent } from './stockcategory.component';

describe('StockcategoryComponent', () => {
  let component: StockcategoryComponent;
  let fixture: ComponentFixture<StockcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

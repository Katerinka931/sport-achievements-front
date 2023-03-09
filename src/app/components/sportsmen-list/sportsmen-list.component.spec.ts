import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsmenListComponent } from './sportsmen-list.component';

describe('SportsmenListComponent', () => {
  let component: SportsmenListComponent;
  let fixture: ComponentFixture<SportsmenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsmenListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsmenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

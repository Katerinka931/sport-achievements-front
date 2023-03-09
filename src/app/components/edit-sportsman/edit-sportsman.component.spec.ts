import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSportsmanComponent } from './edit-sportsman.component';

describe('EditSportsmanComponent', () => {
  let component: EditSportsmanComponent;
  let fixture: ComponentFixture<EditSportsmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSportsmanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSportsmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

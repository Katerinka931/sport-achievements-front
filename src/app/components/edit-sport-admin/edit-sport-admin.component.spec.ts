import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSportAdminComponent } from './edit-sport-admin.component';

describe('EditSportAdminComponent', () => {
  let component: EditSportAdminComponent;
  let fixture: ComponentFixture<EditSportAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSportAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSportAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

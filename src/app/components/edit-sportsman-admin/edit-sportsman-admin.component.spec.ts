import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSportsmanAdminComponent } from './edit-sportsman-admin.component';

describe('EditSportsmanAdminComponent', () => {
  let component: EditSportsmanAdminComponent;
  let fixture: ComponentFixture<EditSportsmanAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSportsmanAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSportsmanAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

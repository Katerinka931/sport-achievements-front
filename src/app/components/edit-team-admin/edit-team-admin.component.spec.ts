import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamAdminComponent } from './edit-team-admin.component';

describe('EditTeamAdminComponent', () => {
  let component: EditTeamAdminComponent;
  let fixture: ComponentFixture<EditTeamAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeamAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeamAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

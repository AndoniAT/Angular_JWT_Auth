import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileSkeletonComponent } from './user-profile-skeleton.component';

describe('UserProfileSkeletonComponent', () => {
  let component: UserProfileSkeletonComponent;
  let fixture: ComponentFixture<UserProfileSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

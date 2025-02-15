import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UserAdminActionsType } from '../../interfaces/user';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should receive users as input', () => {
    const mockUsers: UserAdminActionsType[] = [
      {
        _id: "1",
        username: "User1",
        firstname: "FirstnameTest",
        lastname: "LastnameTest",
        email: "user1@ex.com",
        roles: [1000],
        modify: () => {},
        delete: () => {}
      },
      {
        _id: "2",
        username: "User2",
        firstname: "FirstnameTest2",
        lastname: "LastnameTest2",
        email: "user2@ex.com",
        roles: [2000],
        modify: () => {},
        delete: () => {}
      }
    ];

    component.users = mockUsers;
    fixture.detectChanges(); // Update component after input modifications

    expect(component.users).toEqual(mockUsers);
  });

  it('should handle empty users list', () => {
    component.users = [];
    fixture.detectChanges();

    expect(component.users.length).toBe(0);
  });

  it('should handle error message input', () => {
    component.errMsg = "Error in component.";
    fixture.detectChanges();

    expect(component.errMsg).toBe("Error in component.");
  });
});

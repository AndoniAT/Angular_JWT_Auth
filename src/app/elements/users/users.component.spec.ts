import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UserAdminActionsType } from '../../interfaces/user';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let el: DebugElement;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should receive users as input', () => {
    component.users = mockUsers;
    fixture.detectChanges(); // Update component after input modifications

    expect(component.users).toEqual(mockUsers);
  });

  it('should handle empty users list', () => {
    component.users = [];
    fixture.detectChanges();

    expect(component.users.length).toBe(0);
  });

  it('Should handle error message input', () => {
    component.errMsg = "Error in component.";
    fixture.detectChanges();

    expect(component.errMsg).toBe("Error in component.");
  });

  it('Should have error message existing in page', () => {
    component.errMsg = "Error in component.";
    fixture.detectChanges();

    let errorElement = el.queryAll(By.css('.error-message'))[0].nativeElement;
    expect(errorElement.textContent).toBe("Error in component.");
  });

  it('Should have 2 users', () => {
    component.users = mockUsers;
    fixture.detectChanges();

    let trElements = el.queryAll(By.css('tbody tr'));
    expect(trElements.length).toBe(2);
  });

  it('Check username contents', () => {
    component.users = mockUsers;
    fixture.detectChanges();

    let trElements = el.queryAll(By.css("tbody tr"));
    let element1 = trElements[0].queryAll(By.css("td"))[0].nativeElement;
    expect(element1.textContent.trim()).toBe(mockUsers[0].username);
    
    let element2 = trElements[1].queryAll(By.css("td"))[0].nativeElement;
    expect(element2.textContent.trim()).toBe(mockUsers[1].username);
  });

  it('It Should render action buttons', () => {
    component.users = mockUsers;
    fixture.detectChanges();

    let deleteElements = el.queryAll(By.css("tbody .deleteUser"));
    expect(deleteElements.length).toBe(2);
    
    let updateElements = el.queryAll(By.css("tbody .modifyUser"));
    expect(updateElements.length).toBe(2);
  })
});

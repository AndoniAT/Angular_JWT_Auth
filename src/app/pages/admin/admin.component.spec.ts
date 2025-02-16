import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserAdminActionsType } from '../../interfaces/user';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let el: DebugElement;
  let httpTesting: HttpTestingController;
  const mockUsers: UserAdminActionsType[] = [
      {
        _id: "1",
        username: "User1",
        firstname: "FirstnameTest",
        lastname: "LastnameTest",
        email: "user1@ex.com",
        roles: [1000],
        modify: () => {
          console.log('modify!');
          return of({ success: true })
        },
        delete: () => {
          console.log("delete!");
          return of({ success: true })
        }
      },
      {
        _id: "2",
        username: "User2",
        firstname: "FirstnameTest2",
        lastname: "LastnameTest2",
        email: "user2@ex.com",
        roles: [2000],
        modify: () => of({ success: true }) ,
        delete: () => of({ success: true }) 
      }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    const req = httpTesting.expectOne(`${environment.BACK_END_URL}users`);
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(mockUsers));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have correct contents', ()=>{
    let h1Elements = el.queryAll(By.css('h1'));
    expect(h1Elements[0].nativeElement.textContent).toBe('Admins Page');
    let h2Elements = el.queryAll(By.css('h2'));
    expect(h2Elements[0].nativeElement.textContent).toBe('Users List');
  });

  it('Should have 2 users', () => {
    //component.users = mockUsers;
    fixture.detectChanges();

    let trElements = el.queryAll(By.css('tbody tr'));
    expect(trElements.length).toBe(2);
  });

  it('Delete button clicked', fakeAsync(() => {
    //component.users = mockUsers;
    spyOn(component, 'deleteUser').and.callThrough();
    spyOn(component, 'modifyUser');
    fixture.detectChanges();

    let userIdDeleted = mockUsers[0]._id;

    let deleteElements = el.queryAll(By.css("tbody .deleteUser"));
    const deleteBtn = deleteElements[0];
    deleteBtn.nativeElement.click(); // Delete action in DOM

    // Expect delete api to be called
    const mockReq = httpTesting.expectOne(`${environment.BACK_END_URL}users/${userIdDeleted}`);
    expect(mockReq.request.method).toEqual('DELETE');
    mockReq.flush(
      {},
      { status: 200, statusText: "Ok" }
    );

    //tick(3000);
    
    let trElements = [];
    fixture.detectChanges();

    flush(); // Wait async to finish

    expect(component.deleteUser).toHaveBeenCalled()
    trElements = el.queryAll(By.css('tbody tr'));
    expect(trElements.length).toBe(1); // Expect user to be removed from the DOM

  }))
});

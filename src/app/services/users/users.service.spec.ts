import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import USERS from '../../mock-data/users';
import { environment } from '../../../environments/environment';
import { UserCreateType, UserType } from '../../interfaces/user';

describe('UsersService', () => {
  let service: UsersService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsersService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('Error => (Get users) Should not have access', () => {
    service.getAllUsers().subscribe({
      error: (err: any) => {
        expect(err.status).toBe(401);
        expect(err.statusText).toContain("Unauthorized");
      }
    });

    // 401 response
    const req = httpTesting.expectOne(`${environment.BACK_END_URL}users`);
    req.flush({}, { status: 401, statusText: "Unauthorized" });
  });

  it('Should have users', () => {
    service.getAllUsers().subscribe({
      next: (users:UserType[]) => {
        expect(users).toBeTruthy();
        expect(users.length).toBe(2);

        const secondUser = users.find( u => u._id == '2');
        expect(secondUser?.email).toBe('user2@example.com');
      }
    });

    const req = httpTesting.expectOne(`${environment.BACK_END_URL}users`);
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(USERS));
  });

  it('Should get user', () => {
    service.getUser( 'User1Test' ).subscribe({
      next: (user:UserType) => {
        expect(user).toBeTruthy();
        expect(user?.email).toBe('admin@exemple.com');
      }
    })

    const req = httpTesting.expectOne(`${environment.BACK_END_URL}users/User1Test`);
    expect(req.request.method).toEqual('GET');
    req.flush(USERS[0]);
  });

  it('Should update user', () => {
    let changes = {
      firstname: 'TEST'
    };

    service.updateUser( 'User1Test', {
      ...USERS[0],
      ...changes
    } ).subscribe({
      next: (user:UserType) => {
        expect(user).toBeTruthy();
        expect(user?.firstname).toBe('TEST');
      }
    })

    const mockReq = httpTesting.expectOne(`${environment.BACK_END_URL}users/User1Test`);
    expect(mockReq.request.method).toEqual('PUT');

    let modifiedUser = USERS[0];
    modifiedUser.firstname = 'TEST';
    expect(mockReq.request.body.firstname).toEqual(changes.firstname)
    mockReq.flush(modifiedUser);
  });

  it('Error => (Create User) Repeated user', () => {
    const user = {
      ...USERS[0],
      confirmPassword: USERS[0].password
    } as UserCreateType;
  
    service.createUser(user).subscribe({
      next: (res:any) => {
        fail('Expected an error, but got success response')
      },
      error: (err: any) => {
        console.log('Error Response!', err);
        expect(err.status).toBe(400);
        expect(err.statusText).toBe('Bad Request');
        expect(err.error.message.username).toBe(`User with username "${USERS[0].username}" already exists`);
      }
    });
  
    const mockReq = httpTesting.expectOne(`${environment.BACK_END_URL}users`);
    expect(mockReq.request.method).toEqual('POST');
  
    expect(mockReq.request.body.username).toEqual(user.username);
  
    mockReq.flush(
      { message: { username: `User with username "${USERS[0].username}" already exists` } },
      { status: 400, statusText: 'Bad Request' }
    );    
  });

  it('Should create user', () => {
    const user = {
      ...USERS[0],
      username: "My_TEST",
      email: "my_test@ex.com",
      confirmPassword: USERS[0].password
    } as UserCreateType;
  
    service.createUser(user).subscribe({
      next: (usr:UserType) => {
        expect(usr).toBeTruthy();
        expect(usr.username).toEqual(user.username);
      },
      error: (err: any) => {
        fail('Expected an success response, but got an error')
      }
    });
  
    const mockReq = httpTesting.expectOne(`${environment.BACK_END_URL}users`);
    expect(mockReq.request.method).toEqual('POST');
  
    expect(mockReq.request.body.username).toEqual(user.username);
  
    mockReq.flush(
      user,
      { status: 201, statusText: "Created" }
    );    
  });

  it('Should delete user', () => {
    service.deleteUser(USERS[0].username).subscribe({
      next: (usr:UserType) => {
        expect(usr).toBeTruthy();
      },
      error: (err: any) => {
        fail('Expected an success response, but got an error')
      }
    });
  
    const mockReq = httpTesting.expectOne(`${environment.BACK_END_URL}users/${USERS[0].username}`);
    expect(mockReq.request.method).toEqual('DELETE');
  
    mockReq.flush(
      {},
      { status: 200, statusText: "Ok" }
    );    
  });

  afterEach(() => {
    httpTesting.verify();
  })
});

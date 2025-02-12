<h1 class="text-center" style="background-color: rgb(226 232 240 / var(--tw-bg-opacity, 1));
 padding: 5px;"> Authentication JWT Login in Angular
 <img src="./angular.png" height="80"/>
 </h1>
<h4>Author : Andoni ALONSO TORT</h4>

### Angular + TypeScript

Implementing authentication in Angular with JWT received from server.

A front-end application built with Angular, designed to provide an intuitive and modern interface for user and role management. It includes:

- ✅ An intuitive user interface for login and user profile management.
- ✅ Role management with specific views and permissions based on user authorizations.
- ✅ Integration with a secure REST API, developed in Node.js, for all authentication and user management operations. Communications use JWTs (JSON Web Tokens) to ensure secure exchanges.
- ✅ Support for conditional navigation with protected routes based on user login status and roles.
- ✅ An optimized user experience thanks to modern libraries like Angular Router and HttpClient, HTTP INTERCEPTORS, etc.

This front-end is designed to interact with the [authentication JWT Node.js back-end proejct](https://github.com/AndoniAT/Auth_JWT_NodeJs). Offering a solid and secure foundation for applications requiring advanced user management.

Project created with :

> ng new project Angular_JWT_Auth

Run appliation : 

> ng serve
 
### Dependencies


Other dependencies installed:

- [jwt-decode](https://www.npmjs.com/package/jwt-decode) : To decode accesToken received from Backend
- [ng-icons](https://ng-icons.github.io/ng-icons/#/)
- [coreui](https://coreui.io/angular/docs/components/modal/#live-demo) : For modal display
  
<hr/>

For styles see :
  - [Tailwind](https://tailwindcss.com/docs)


<b>Setting Tailwind config :</b>

To init tailwind in project :

See [tailwind documentation](https://v3.tailwindcss.com/docs/guides/angular) to see how to install tailwind with Angular.

## Angular Project Details

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

#### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

#### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

#### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

#### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

#### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

#### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

<hr />

# Other project details

<h6>== USER ROLES ==</h6>

<table style="margin: 0 auto; width: fit-content; border: 1px solid black;">
  <tr style="background: gray;">
    <th style="border: 1px solid black;">Role</th>
    <th style="border: 1px solid black;">Code</th>
  </tr>
  <tr>
    <td style="border: 1px solid black">Admin</td>
    <td style="border: 1px solid black">1000</td>
  </tr>
  <tr>
    <td style="border: 1px solid black">User</td>
    <td style="border: 1px solid black">2000</td>
  </tr>
</table>

## == 🏠 Home Page ==

On the homepage, there will be a page similar to when starting a new project with Angular, except that there will be an additional navbar with navigation buttons.
<div style="flex inline-flex">
     <img src="https://github.com/user-attachments/assets/1e2d9b35-b319-4779-985b-73d573973338" width="500"/>
     <img src="https://github.com/user-attachments/assets/b9cbc5fb-eb43-4679-9b28-bb9f662781d5" width="500"/> 
</div>

## == 🔐 Login ==

Login page to connect to the application. This form calls the login API of the back-end project, which provides an accessToken with a duration of 1 minute and also stores a refreshToken in the cookies.

Each time an API call fails because the token has expired, the application will automatically request a new accessToken. The backend will use the refreshToken stored in the cookies to verify if the user is authorized to make this request.

<div style="flex inline-flex">
     <img src="https://github.com/user-attachments/assets/2744205d-21ed-41a9-804f-d3c8ecf61811" width="500"/>
     <img src="https://github.com/user-attachments/assets/d694867c-6d8f-4567-a6e7-8dfcf70d2ca5" width="500"/>
</div>

## == ✅🧔 Create Account ==

Create an account while following the rules defined in the [Back-end project](https://github.com/AndoniAT/Auth_JWT_NodeJs). Once the account is created, the user will be redirected to the login page.

<div style="flex inline-flex">
     <img src="https://github.com/user-attachments/assets/d80f5a7a-52f9-47e8-bc13-bab515defe23" width="500"/>
     <img src="https://github.com/user-attachments/assets/6c023ae2-d176-4cbc-82f9-bcf249e94d3c" width="500">
</div>

## == 👨‍💼 Admin Page Users Manage ==

The admin page displays a list of users with action buttons: Edit and Delete.

‼️WARNING: An administrator cannot be deleted if they are the only administrator of the application.

<div style="flex inline-flex">
   <img src="https://github.com/user-attachments/assets/3e5588df-d00f-410e-8e7a-52f28b3c6d4a" width="500"/>
   <img src="https://github.com/user-attachments/assets/e4f3d5c6-fb76-4d21-85f3-5f5556c94a20" width="500"/>
</div>

## == 👨‍💻 User Profile ==

The user profile page is divided into 3 sections:

 - 👁️ Form for viewing, editing, and deleting the user : Actions only displayed in your own profile or if you are an admin.

 - 🤝 Interactions : Are only displayed in other user, not your own profile.

 - 💻 Posts

(Points 2 and 3 are not features of this application. They are just examples of what could be added. This application is designed solely to provide a complete authentication and user management project based on roles.)

<div style="flex inline-flex">
   <img src="https://github.com/user-attachments/assets/15e25896-ef00-4e1c-8d1c-d1f63b14f7e0" width="500"/>
   <img src="https://github.com/user-attachments/assets/26e4b158-26ca-45b7-8cce-5f91e43b1251" width="500"/>
</div>

‼️WARNING: Some modifications to sensitive information ( email, username and roles ) may require reauthentication.

<div style="flex inline-flex">
   <img src="https://github.com/user-attachments/assets/a2ef92f0-4f9e-4682-816a-da847a822e58" width="500"/>
   <img src="https://github.com/user-attachments/assets/2545aaeb-c157-4f4c-9d70-e6f88258643f" width="500"/>
</div>

# == ✅➕ MORE ==

## == ↪️ REDIRECTIONS (Navigation)  ==

- 🙅 If a user does not have permission to access a page, they will be redirected to the homepage. For example, a regular user attempting to access the admin page.
- ❓ If an unauthenticated user tries to access a page, they will be redirected to the login page. Once logged in, they will be redirected to the page they were trying to reach.

## == 🔄️ LOAGING DATA (SKELETONS) ==

Display a loading skeleton while the data is being loaded. This feature enhances the user experience.

<div style="flex inline-flex">
   <img src="https://github.com/user-attachments/assets/4fcd5597-6028-4b5f-a857-fbe804fd2002" width="500"/>
   <img src="https://github.com/user-attachments/assets/c1e8e500-d790-4285-8736-6f5b208e37ac" width="500"/>
</div>

## == ❌ ERROR FORMS ==

Display clear error messages in forms so that the user can correct the submitted information.

<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/7dc1fb87-eebb-4339-9b97-4126ac8f4fce" width="500"/>
  <img src="https://github.com/user-attachments/assets/f9ac970e-3629-410b-ab3d-e37b6ab79c1c" width="500"/>
</div>

<hr/>
<h5>Author: <i>Andoni ALONSO TORT</i><h5>

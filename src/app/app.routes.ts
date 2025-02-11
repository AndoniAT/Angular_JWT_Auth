import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthService } from './services/auth/auth.service';
import { hasRoleGuard, isNotConnected } from './has-role.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'login',
        canActivate: [ isNotConnected ],
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'createAccount',
        canActivate: [ isNotConnected ],
        component: CreateAccountComponent,
        title: 'Create Account'
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [ hasRoleGuard ],
        data: {
            roles: [ AuthService.ROLES.admin ]
        },
        title: 'Admin Page'
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About'
    },
    {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact'
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        title: 'Unauthorized'
    }
];

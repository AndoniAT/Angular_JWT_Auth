import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'createAccount',
        component: CreateAccountComponent,
        title: 'Create Account'
    },
    {
        path: 'admin',
        component: AdminComponent,
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
    }
];

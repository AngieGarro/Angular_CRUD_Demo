import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { SigUpComponent } from './pages/auth/sign-up/signup.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuestGuard } from './guards/guest.guard';
import { IRoleType } from './interfaces';
import { ProfileComponent } from './pages/profile/profile.component';
import { GamesComponent } from './pages/games/games.component';
import { CategoriesManagementComponent } from './pages/categories-management/categories-management.component';
import { CategoriesViewComponent } from './pages/categories-view/categories-view.component';
import { ProductsManagementComponent } from './pages/products-management/products-management.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signup',
    component: SigUpComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'app',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate:[AdminRoleGuard],
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin
          ],
          showInSidebar: true,
          name: 'Users'
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: true,
          name: 'Dashboard'
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: false,
          name: 'profile'
        }
      },
      /**{
        path: 'games',
        component: GamesComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: true,
          name: 'games'
        }
      },*/
      {
        path: 'categories-management',
        component: CategoriesManagementComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
          ],
          showInSidebar: true,
          name: 'Management Categories'
        }
      },
      {
        path: 'categories-view',
        component: CategoriesViewComponent,
        data: { 
          authorities: [
            IRoleType.user
          ],
          showInSidebar: true,
          name: 'List Categories'
        }
      },
      {
        path: 'products-management',
        component: ProductsManagementComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
          ],
          showInSidebar: true,
          name: 'Management Products'
        }
      },
      {
        path: 'product-view',
        component: ProductViewComponent,
        data: { 
          authorities: [
            IRoleType.user
          ],
          showInSidebar: true,
          name: 'List Products'
        }
      }
    ],
  },
];

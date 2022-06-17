import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFailComponent } from './auth-fail/auth-fail.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent, canActivate: [AuthGuardGuard]},
  {path: 'posts', component: PostsComponent, canActivate: [AuthGuardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'auth-fail', component: AuthFailComponent},
  {path: '', redirectTo: '/posts', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

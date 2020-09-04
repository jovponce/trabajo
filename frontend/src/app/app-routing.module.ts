import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//
import {PrivateComponent} from './components/private/private.component'
import {SigninComponent} from './components/signin/signin.component'
import {SignupComponent} from './components/signup/signup.component'

import {AuthGuard} from './auth.guard';
import { from } from 'rxjs';

const routes: Routes = [
{
  path: '',
  redirectTo: '/signin',
  pathMatch: 'full'
},
{
  path: 'signin',
  component: SigninComponent
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'private',
  component: PrivateComponent,
  canActivate: [AuthGuard]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

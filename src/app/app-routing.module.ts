import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
    //loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInModule),
  },
  {
    path: 'sign-up',
    component: SignUpComponent
    //loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInModule),
  },
  {
    path: 'home',
    component: HomeComponent
    //loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInModule),
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

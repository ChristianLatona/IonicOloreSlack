import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './components/channel/channel.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

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
    path: 'workspace',
    component: WorkspaceComponent ,
    children:[{
      path: 'channel/:id',
      component: ChannelComponent
    }] 
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

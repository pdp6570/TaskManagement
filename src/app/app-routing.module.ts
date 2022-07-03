import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
{ path: '', redirectTo: 'auth', pathMatch:'full'},
{ path: 'auth',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
{ path: 'task',loadChildren: () => import('./task/task.module').then(m => m.TaskModule),canActivate:[AuthGuard]},
{ path: '**', redirectTo: 'auth', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

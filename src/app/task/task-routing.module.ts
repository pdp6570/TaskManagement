import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AddUpdateTaskComponent } from './components/add-update-task/add-update-task.component';
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';
import { TaskComponent } from './task.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch:'full'},
  { path: 'dashboard', component: TaskDashboardComponent,canActivate:[AuthGuard]},
  { path: 'pendingTasks', component: PendingTasksComponent },
  { path: 'completedTasks', component: CompletedTasksComponent },
  { path: 'addTask', component: AddUpdateTaskComponent },
  { path: 'updateTask/:id', component: AddUpdateTaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';
import { AddUpdateTaskComponent } from './components/add-update-task/add-update-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskComponent,
    TaskDashboardComponent,
    NavbarComponent,
    PendingTasksComponent,
    CompletedTasksComponent,
    AddUpdateTaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }

import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {

  dashboardDetails: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.dashboardDetails = this.taskService.getDashboardDetails();
  }

}

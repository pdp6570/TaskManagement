import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { EnumTaskStatus } from '../../shared/enums';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.css']
})
export class PendingTasksComponent implements OnInit {

  tasks: any = [];
  searchedText: any;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getPendingTasks();

  }

  getPendingTasks() {
    this.tasks = this.taskService.getTasksByStatus(EnumTaskStatus.Pending);
    this.tasks = [...this.tasks];
  }

  onDelete(taskId: any) {
    this.taskService.deleteTask(taskId);
    this.getPendingTasks();
  }

  onClickMarkAsCompleted(taskId: any) {
    this.taskService.updateTaskStatus(taskId, EnumTaskStatus.Completed);
    this.getPendingTasks();
  }

  searchTask() {
    if (this.searchedText && this.tasks && this.tasks.length > 0) {
      this.tasks = this.tasks.filter((x: any) => x.title.includes(this.searchedText) || x.description.includes(this.searchedText));
      this.tasks = [...this.tasks];
    }
    else {
      this.getPendingTasks();
    }
  }
}

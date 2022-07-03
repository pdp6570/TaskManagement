import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { EnumTaskStatus } from '../../shared/enums';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnInit {

  tasks: any = [];
  searchedText: any;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getCompletedTasks();
  }

  getCompletedTasks() {
    this.tasks = this.taskService.getTasksByStatus(EnumTaskStatus.Completed);
    this.tasks = [...this.tasks];
  }

  onDelete(taskId: any) {
    this.taskService.deleteTask(taskId);
    this.getCompletedTasks();
  }

  onClickMarkAsPending(taskId: any) {
    this.taskService.updateTaskStatus(taskId, EnumTaskStatus.Pending);
    this.getCompletedTasks();
  }

  searchTask() {
    if (this.searchedText && this.tasks && this.tasks.length > 0) {
      this.tasks = this.tasks.filter((x: any) => x.title.includes(this.searchedText) || x.description.includes(this.searchedText));
      this.tasks = [...this.tasks];
    }
    else {
      this.getCompletedTasks();
    }
  }

}

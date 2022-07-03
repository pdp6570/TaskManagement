import { Injectable } from '@angular/core';
import { EnumTaskStatus } from '../task/shared/enums';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: any;
  tasks: any = [];

  constructor() {

    this.taskList = localStorage.getItem('taskList');
    if (this.taskList) {
      this.tasks = JSON.parse(this.taskList);
    }
  }

  getTasks() {
    return this.tasks();
  }

  getDashboardDetails() {
    let dashboardDetails : {
      totalTasks: number,
      pendingTasks: number,
      compltedTasks: number
    };

    dashboardDetails =  {
      totalTasks: 0,
      pendingTasks: 0,
      compltedTasks: 0
    };

    if (this.tasks && this.tasks.length > 0) {
      dashboardDetails.totalTasks = this.tasks.length;
      dashboardDetails.pendingTasks = this.tasks.filter((x:any) => x.status == EnumTaskStatus.Pending).length;
      dashboardDetails.compltedTasks = this.tasks.filter((x:any) => x.status == EnumTaskStatus.Completed).length;
    }

    return dashboardDetails;
  }

  getTaskDetailsByTaskId(taskId: any) {
    if (this.tasks && this.tasks.length > 0) {
      return this.tasks.find((x: any) => x.taskId == taskId);
    }
  }

  getTasksByStatus(statusId: any) {
    if (this.tasks && this.tasks.length > 0) {
      return this.tasks.filter((x: any) => x.status == statusId);
    }
  }

  addUpdateTask(taskObj: any) {
    if (taskObj) {
      if (taskObj.taskId && taskObj.taskId > 0) {
        let taskDetails = this.tasks.find((x: any) => x.taskId == taskObj.taskId);
        taskDetails.title = taskObj.title;
        taskDetails.description = taskObj.description;
        taskDetails.status = taskObj.status;
        localStorage.setItem('taskList', JSON.stringify(this.tasks));
      }
      else {
        const taskDetails = Object.assign({});
        taskDetails.title = taskObj.title;
        taskDetails.description = taskObj.description;
        taskDetails.status = taskObj.status;

        if (this.tasks && this.tasks.length > 0) {
          taskDetails.taskId = Math.max(...this.tasks.map((x: any) => x.taskId), 0) + 1;
        }
        else {
          taskDetails.taskId = 1;
        }

        this.tasks.push(taskDetails);
        localStorage.setItem('taskList', JSON.stringify(this.tasks));
      }
    }

  }

  deleteTask(taskId: any) {
    if (this.tasks && this.tasks.length > 0) {
      let index = this.tasks.findIndex((x: any) => x.taskId == taskId);
      if (index && index !== -1) {
        this.tasks.splice(index, 1);
        localStorage.setItem('taskList', JSON.stringify(this.tasks));
        alert("Task Deleted Successfully");
      }
    }
  }

  updateTaskStatus(taskId: any, statusId: any) {
    let taskDetails = this.tasks.find((x: any) => x.taskId == taskId);
    if (taskDetails) {
      taskDetails.status = statusId;
      localStorage.setItem('taskList', JSON.stringify(this.tasks));
    }
  }
}

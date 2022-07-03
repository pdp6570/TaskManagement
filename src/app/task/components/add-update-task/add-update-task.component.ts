import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { CommonHelper } from '../../shared/commonHelper';
import { EnumTaskStatus } from '../../shared/enums';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.css']
})
export class AddUpdateTaskComponent implements OnInit {

  taskId: any = 0;
  taskDetailsForm!: FormGroup;
  taskStatusOptions: any = [];
  taskList: any;
  tasks: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {

    this.activatedRoute.paramMap.subscribe(params => {
      if (params) {
        this.taskId = Number(params.get('id'));
      }
    })

    this.taskDetailsForm = new FormGroup({
      taskId: new FormControl(null),
      title: new FormControl(null, Validators.compose([Validators.required])),
      description: new FormControl(null, Validators.compose([Validators.required])),
      status: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void {
    this.taskStatusOptions = CommonHelper.convertEnumToArray(EnumTaskStatus);

    if (this.taskId > 0) {
      this.getTaskDetails();
    }
  }

  getTaskDetails() {
    let taskDetails = this.taskService.getTaskDetailsByTaskId(this.taskId);
    if (taskDetails) {
      this.taskDetailsForm.controls.taskId.patchValue(taskDetails.taskId);
      this.taskDetailsForm.controls.title.patchValue(taskDetails.title);
      this.taskDetailsForm.controls.description.patchValue(taskDetails.description);
      this.taskDetailsForm.controls.status.patchValue(taskDetails.status);
    }
  }

  saveTaskDetails() {
    if (this.taskDetailsForm.valid) {
      const taskDetails = Object.assign({});
      taskDetails.taskId = this.taskId;
      taskDetails.title = this.taskDetailsForm.value.title;
      taskDetails.description = this.taskDetailsForm.value.description;
      taskDetails.status = this.taskDetailsForm.value.status;

      this.taskService.addUpdateTask(taskDetails);
      this.router.navigate(['/task/dashboard'], { relativeTo: this.activatedRoute.root });
    }
  }
}

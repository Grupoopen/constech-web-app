import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TaskService} from "../../shared/task.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {


  taskForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _taskService: TaskService,
    private _dialogRef: MatDialogRef<EditTaskComponent>,
  ) {
    this.taskForm = this._fb.group({
      assigned: '',
      title: '',
      description: '',
      status:'',
      initialdate: '',
      deadline:'',
    });
  }
  onFormSubmit() {
    if(this.taskForm.valid){
      this._taskService.addTask(this.taskForm.value).subscribe({
        next:(val:any)=>{
          alert('Tarea añadida correctamente');
          this._dialogRef.close(true);
        },
        error: (err:any)=>{
          console.error(err);
        },
      })
    }

  }

}

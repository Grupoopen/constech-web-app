import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TaskService} from "../../shared/services/task-service/task.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit{


  taskForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _taskService: TaskService,
    private _dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.taskForm = this._fb.group({
      assigned: '',
      title: '',
      description: '',
      status:'',
      initialDate: '',
      deadline:'',
    });
  }
  ngOnInit(): void{
    this.taskForm.patchValue(this.data);
  }
  onFormSubmit() {
    if(this.taskForm.valid){
      if(this.data){
        this._taskService.updateTask(this.data.id, this.taskForm.value)
          .subscribe({
            next:(val:any)=>{
              alert('Tarea actualizada correctamente');
              this._dialogRef.close(true);
            },
            error: (err:any)=>{
              console.error(err);
            },
          });
      }else{
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

}

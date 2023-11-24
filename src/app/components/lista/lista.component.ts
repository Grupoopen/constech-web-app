import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';  // Asegúrate de tener esta importación
import { TaskService } from 'src/app/shared/task.service';
import { Task } from '../../shared/listask.module';
import { EditListaComponent } from 'src/app/pages/edit-lista/edit-lista.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  tasks: Task[] = [];

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    name:'',
    endDate:'',
  };

  constructor(private listServ: TaskService, private _dialog: MatDialog) {  // Corregir aquí

  }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.listServ.getTasks().subscribe(
      (res: any) => {
        console.log(res);
        this.tasks = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addTask() {
    console.log("agregado a la data", this.newTask);
    this.listServ.addTask2(this.newTask).subscribe(() => {
      this.getTaskList();
    });

    this.newTask = {
      id: 0,
      title: '',
      description: '',
      name:'',
      endDate:''
    };
  }

  deleteTask(id: number) {
    this.listServ.deleteTask2(id).subscribe(() => {
      this.getTaskList();
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EditListaComponent, {
      data: { task: data },
    });
  
    dialogRef.afterClosed().subscribe({
      next: (updatedTask) => {
        if (updatedTask) {
          // Utiliza el nombre correcto del método en el servicio: updateTasks
          this.listServ.updateTasks(updatedTask).subscribe(() => {
            this.getTaskList();
          });
        }
      },
    });
  }
  
}

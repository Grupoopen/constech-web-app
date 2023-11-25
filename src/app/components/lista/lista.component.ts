import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/task.service';
import { Task } from 'src/app/models/listask.module';

import { EditListaComponent } from 'src/app/pages/edit-lista/edit-lista.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '', name: '', clientName:'',clientEmail:'',startDate: new Date(),status:'en proceso',endDate: new Date() };
  errorMessage: string | null = null; 

  constructor(private listServ: TaskService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.listServ.getTasks().subscribe(
      (res: any) => {
        console.log(res);
        this.tasks = res;
        this.clearErrorMessage(); // Limpiar el mensaje de error al recibir nuevas tareas exitosamente
      },
      (error) => {
        console.error(error);
        this.errorMessage = this.extractErrorMessage(error);
        this.clearErrorMessageAfterDelay();
      }
    );
  }

  addTask() {
    console.log("agregado a la data", this.newTask);

    // Realiza la llamada a tu servicio aquí
    this.listServ.addTask2(this.newTask).subscribe(
      () => {
        this.getTaskList();
        this.clearErrorMessage(); // Limpiar el mensaje de error al agregar una nueva tarea exitosamente
      },
      (error) => {
        console.error(error);
        this.errorMessage = this.extractErrorMessage(error);
        this.clearErrorMessageAfterDelay();
      }
    );

    this.newTask = { id: 0, title: '', description: '', name: '', clientName:'',clientEmail:'',startDate:new Date(),status:'en proceso', endDate: new Date() }; // Restaura la fecha a la actual
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
          this.listServ.updateTasks(updatedTask).subscribe(() => {
            this.getTaskList();
            this.clearErrorMessage(); // Limpiar el mensaje de error al actualizar una tarea exitosamente
          });
        }
      },
    });
  }

  private extractErrorMessage(error: any): string {
    // Extraemos el mensaje de error
    if (error.error && error.error.message) {
      return error.error.message;
    }

    // En el caso de que no exista ningún mensaje específico
    return "Se produjo un error. Por favor, inténtelo nuevamente.";
  }

  private clearErrorMessage() {
    // Limpiar el mensaje de error
    this.errorMessage = null;
  }

  private clearErrorMessageAfterDelay() {
    // Limpiar el mensaje de error después de 3 segundos
    setTimeout(() => {
      this.clearErrorMessage();
    }, 3000);
  }
}

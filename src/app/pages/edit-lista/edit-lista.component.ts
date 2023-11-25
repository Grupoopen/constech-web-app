import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task-service/task.service'; // Asegúrate de especificar la ruta correcta
import { Task } from 'src/app/models/listask.module'; // Asegúrate de especificar la ruta correcta

@Component({
  selector: 'app-edit-lista',
  templateUrl: './edit-lista.component.html',
  styleUrls: ['./edit-lista.component.css']
})
export class EditListaComponent {
  updatedTask: Task;

  constructor(
    public dialogRef: MatDialogRef<EditListaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService // Inyectar el servicio TaskService
  ) {
    // Clonamos los datos para evitar modificar la tarea original directamente
    this.updatedTask = { ...data.task };
  }

  // Función para manejar la actualización
  updateTask() {
    this.taskService.updateTasks(this.updatedTask).subscribe(
      () => {
        // La tarea se actualizó con éxito
        this.dialogRef.close(this.updatedTask);
      },
      error => {
        // Manejar errores aquí
        console.error('Error al actualizar la tarea:', error);
      }
    );
  }

}

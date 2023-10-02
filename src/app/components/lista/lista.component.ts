import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { Task } from '../../shared/listask.module';

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
    description: ''
  };

  constructor(private listServ: TaskService) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.listServ.getTasks().subscribe(
      (res: any) => {
        console.log(res); // PORQUE NO SALE AAA 
        this.tasks = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  
  
//Agrega la card nueva 

  addTask() {
    console.log("agregado a la data", this.newTask); //prueba para ver si me esta llegando la info:V
    this.listServ.addTask2(this.newTask).subscribe(() => {

      this.getTaskList();
    });

    this.newTask = {
      id: 0,
      title: '',
      description: ''
    };
  }


  //elimina la card
  deleteTask(id: number) {
    this.listServ.deleteTask2(id).subscribe(() => {
  
      this.getTaskList();
    
    });
  }
}

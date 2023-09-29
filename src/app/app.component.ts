import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditTaskComponent} from "./pages/edit-task/edit-task.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'constech-web-app';
  options = [

    { path: '/pages/main', title:'Tareas'},

  ]

}

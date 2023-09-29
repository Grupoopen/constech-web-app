import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditTaskComponent} from "../edit-task/edit-task.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TaskService} from "../../shared/task.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  displayedColumns: string[] = ['id', 'assigned', 'title', 'description', 'status', 'initialdate', 'deadline', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor (private _dialog:MatDialog, private _taskService: TaskService){}

  ngOnInit() {
    this.getTaskList();
  }

  openAddEditTask(){
    const dialogRef= this._dialog.open(EditTaskComponent)
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if (val){
          this.getTaskList();
        }
      }
    })
  }
  getTaskList(){
    this._taskService.getTaskList().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTask(id:number){
    this._taskService.deleteTask(id).subscribe({
      next:(res)=>{
        alert('Tarea eliminada')
        this.getTaskList();
      },
      error: console.log,
    })
  }

}

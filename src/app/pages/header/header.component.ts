import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'constech-web-app';
  options = [

    { path: '/main', title:'Tareas'},
    { path: '/lista', title:'Lista'},
    { path: '/companies', title:'Empresas'},
    { path: '/emp-crud', title:'Compañias'},

  ]
}

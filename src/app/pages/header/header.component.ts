import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) {}
  title = 'constech-web-app';
  options = [

    { path: '/main', title:'Tareas'},
    { path: '/lista', title:'Lista'},
    { path: '/companies', title:'Empresas'},
    { path: '/emp-crud', title:'Compañias'},

  ]

  logout() {

    this.router.navigate(['/sign-in']);
  }
}

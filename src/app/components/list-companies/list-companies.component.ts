import { Component, OnInit} from '@angular/core';
import { CompanyService } from 'src/app/shared/services/companies-service/companies.service';
import { Company } from 'src/app/shared/services/companies-service/companies.module';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit {

  companies: Company[] = [];

  newTask: Company = {
    id: 0,
    title: '',
    description: ''
  };

  constructor(private listServ: CompanyService) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.listServ.getCompany().subscribe(
      (res: any) => {
        console.log(res); 
        this.companies = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Agrega la card nueva 

  addCompany() {
    console.log("agregado a la data", this.newTask);
    this.listServ.addCompany2(this.newTask).subscribe(() => {

      this.getTaskList();
    });

    this.newTask = {
      id: 0,
      title: '',
      description: ''
    };
  }


  //elimina la card
  deleteCompany(id: number) {
    this.listServ.deleteCompany2(id).subscribe(() => {
  
      this.getTaskList();
    
    });
  }
}

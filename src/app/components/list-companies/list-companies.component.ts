import { Component, OnInit} from '@angular/core';
import { CompanyService } from 'src/app/shared/services/companies-service/companies.service';
import { Company } from 'src/app/shared/listask.module';

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
}

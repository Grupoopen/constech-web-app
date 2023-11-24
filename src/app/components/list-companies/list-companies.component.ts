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

  newCompany: Company = {
    id: 0,
    title: '',
    description: '',
    ruc: 0
  };

  constructor(private listServ: CompanyService) { }

  ngOnInit(): void {
    this.getCompanyList();
  }

  getCompanyList() {
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
    console.log("agregado a la data", this.newCompany);
    this.listServ.addCompany2(this.newCompany).subscribe(() => {

      this.getCompanyList();
    });

    this.newCompany = {
      id: 0,
      title: '',
      description: '',
      ruc: 0
    };
  }


  //elimina la card
  deleteCompany(id: number) {
    this.listServ.deleteCompany2(id).subscribe(() => {
  
      this.getCompanyList();
    
    });
  }
}

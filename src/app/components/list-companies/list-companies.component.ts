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
    ruc: '',
    companyName: '',
    description: '',
    ceo: '',
    address: '',
    contactMail: '',
    contactNumber: ''
  };
  http: any;

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
    this.listServ.addCompany2(this.newCompany).subscribe(() => {
  
      this.getCompanyList();
    
    });
  }

  //elimina la card
  deleteCompany(id: number) {
    this.listServ.deleteCompany2(id).subscribe(() => {
  
      this.getCompanyList();
    
    });
  }
}

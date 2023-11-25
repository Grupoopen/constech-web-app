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
    const companyData = {
      id: 0,
      ruc: '',
      companyName: '',
      description: '',
      ceo: '',
      address: '',
      contactMail: '',
      contactNumber: ''
    };

    this.listServ.addCompany(companyData)
      .subscribe(
        (response: Company) => {
          // Handle the successful response from the API
          console.log('New company added:', response);
          // Display a success message to the user
          alert('New company added successfully!');
          // You can update the UI or redirect the user as needed
        },
        (error: Company) => {
          // Handle any errors that occurred during the API call
          console.error('Error adding company:', error);
          // Display an error message to the user
          alert('An error occurred while adding the company. Please try again.');
        }
      );
  }


  //elimina la card
  deleteCompany(id: number) {
    this.listServ.deleteCompany2(id).subscribe(() => {
  
      this.getCompanyList();
    
    });
  }
}

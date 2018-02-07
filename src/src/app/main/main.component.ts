import { Component, OnInit } from '@angular/core';

import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  companies: Company[];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService.getCompanies()
    .subscribe(companies => this.companies = companies);
  }

  add(company: Company): void {
    if (!company) return;
    this.companyService.addCompany(company)
      .subscribe(company => {
        this.companies.push(company);
      });
  }

  delete(company: Company): void {
    this.companies = this.companies.filter(c => c !== company);
    this.companyService.deleteCompany(company).subscribe();
  }

}
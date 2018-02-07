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
    if (!company) { return; }
    this.companyService.addCompany(company)
      .subscribe(company => {
        this.companies.push(company);
      });
  }

  addNew(): void {
    const newName = (<HTMLInputElement>document.querySelector('#companyName')).value;
    const newCompany = {
        CompanyName: newName,
        CompanyID: this.randomInt(1000, 100000),
        AccountId: 0,
        StreetAddress: '',
        StreetAddress2: '',
        City: '',
        State: '',
        Country: '',
        ZipCode: 0,
        webSite: '',
        Contacts: [],
        status: '',
        type: '',
        CreatedDate: new Date()
    };
    this.add(newCompany);
    //this.companies.push(newCompany);
    alert('Added Successfully!');
    (<HTMLInputElement>document.querySelector('#companyName')).value = '';
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  delete(company: Company): void {
    this.companies = this.companies.filter(c => c !== company);
    this.companyService.deleteCompany(company).subscribe();
  }

  update(company: Company): void {
    this.companyService.updateCompany(company).subscribe();
  }

  expand(event, company: Company) {
    let target = event.target || event.srcElement || event.currentTarget;

    while (!target.classList.contains('card') && target.type !== 'text') {
      target = target.parentNode;
    }

    target.classList.toggle('expanded');

    if (target.classList.contains('expanded')) {
      target.appendChild(document.createElement('hr'));
      target.appendChild(document.createElement('br'));
      for (const key in company) {
        if (company.hasOwnProperty(key)) {
            if (key === 'Contacts' || key === 'CompanyID') { continue; }
            const span = document.createElement('span');
            span.innerHTML = key;
            const input = document.createElement('input');
            input.type = 'text';
            input.name = key;
            input.style.width = `100%`;
            input.value = company[key];
            target.appendChild(span);
            target.appendChild(document.createElement('br'));
            target.appendChild(input);
            target.appendChild(document.createElement('br'));
            target.appendChild(document.createElement('br'));
        }
      }
    } else {
      const input = target.querySelectorAll('input');
      
      const index = this.companies.findIndex(c => c.CompanyID === company.CompanyID);
      const toUpdate = this.companies[index];
      const history = [];

      Array.prototype.forEach.call( input, function( node ) {
        if (!history[node.name]) {
          toUpdate[node.name] = node.value;
          history[node.name] = 1;
        }
      });

      this.companies[index] = toUpdate;

      this.update(toUpdate);

      const br = target.querySelectorAll('br');
      const hr = target.querySelectorAll('hr');
      const span = target.querySelectorAll('span');
      Array.prototype.forEach.call( input, function( node ) {
        node.parentNode.removeChild( node );
      });
      Array.prototype.forEach.call( br, function( node ) {
        node.parentNode.removeChild( node );
      });
      Array.prototype.forEach.call( span, function( node ) {
        node.parentNode.removeChild( node );
      });
      Array.prototype.forEach.call( hr, function( node ) {
        node.parentNode.removeChild( node );
      });
    
    }
  }

}

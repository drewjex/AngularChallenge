import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Company } from './company';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CompanyService {

  private apiUrl = 'http://devapp.telenotes.com/api/data/drewjex';

  constructor(private http: HttpClient) { }

  /** GET companies from the server */
  getCompanies (): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl)
      .pipe(
        tap(companies => console.log(`fetched companies`)),
        catchError(this.handleError('getCompanies', []))
      );
  }

  /** PUT: add a new hero to the server */
  addCompany (company: Company): Observable<Company> {
    return this.http.put<Company>(this.apiUrl, company, httpOptions).pipe(
      tap((company: Company) => console.log(`added company`)),
      catchError(this.handleError<Company>('addCompany'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteCompany (company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.CompanyID;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Company>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted company id=${id}`)),
      catchError(this.handleError<Company>('deleteCompany'))
    );
  }

  /** POST: update the hero on the server */
  updateCompany (company: Company): Observable<any> {
    return this.http.post(this.apiUrl, company, httpOptions).pipe(
      tap(_ => console.log(`updated company id=${company.CompanyID}`)),
      catchError(this.handleError<any>('updateCompany'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


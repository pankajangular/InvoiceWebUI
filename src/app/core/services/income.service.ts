import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoint } from '../enum/api-end-point.enum';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  getInvoiceList(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.invoiceList, data);
  }
}

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

  getitemsList(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.itemList, data);
  }
  getCustomersList(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.customersList, data);
  }

  createNewItem(name: string, description: string, quantity: number, price: number, tax: number) {
    debugger;
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.addNewItem, { name, description, quantity, price, tax });
  }

  createCustomer(data: any) {
    debugger;
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.addNewCustomer, data)
  }

}

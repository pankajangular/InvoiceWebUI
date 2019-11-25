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


  // Invoice Get ,Create ,Delete,Edit Functions
  getInvoiceList(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.invoiceList, data);
  }

  getInvoiceById(id: number) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.getInvoiceById, { '_Id': id });
  }

  deleteInvoice(id: number) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.deleteInvoice, { '_Id': id });
  }




  // Customer Get ,Create ,Delete,Edit Functions

  createCustomer(data: any) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.addNewCustomer, data)
  }

  getCustomersList(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.customersList, data);
  }

  getCustomerById(id: number) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.getCustomerById, { '_Id': id });
  }

  deleteCustomer(id: number) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.deleteCustomer, { '_Id': id });
  }





  // Items Get ,Create ,Delete,Edit Functions

  createNewItem(name: string, description: string, quantity: number, price: number, tax: number) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.addNewItem, { name, description, quantity, price, tax });
  }
  getitemsList(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.itemList, data);
  }

  getitemById(id: number) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.getItemById, { '_Id': id });
  }

  deleteItem(id: number) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.deleteItem, { '_Id': id });
  }

}

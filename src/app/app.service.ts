import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment.prod';

const Endpoint = environment.ApiEndpoint;
interface users {
  username: string;
  password: string;
}
interface customers {
  "Order_Number": number,
  "Order_Due_Date": string,
  "Customer_name": string,
  "Customer_Address": string,
  "Customer_Phone": string,
  "OrderTotal": number
}
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient) { }

  checkUser(): Observable<users[]> {
    // console.log(Endpoint);
    return this.http.get<users[]>(Endpoint + '/login');
  };

  getCustomerDetails(): Observable<customers[]> {
    return this.http.get<customers[]>(Endpoint + '/getCustomers');
  }

  addOrder(data: customers): Observable<boolean> {
    // console.log(data);
    const params = data;
    return this.http.post<boolean>(Endpoint + '/addOrder', params);
  }

  editOrder(data: customers): Observable<boolean> {
    const params = data;
    return this.http.put<boolean>(Endpoint + '/editOrder', params);
  }
  
  deleteOrder(id: number): Observable<boolean> {
    const params = { "id": id };
    return this.http.post<boolean>(Endpoint + '/deleteOrder', params);
  }
}

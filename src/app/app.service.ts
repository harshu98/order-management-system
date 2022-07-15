import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
interface users {
  username: string;
  password: string;
}
interface customers {
  "Order Number": number,
  "Order Due Date": string,
  "Customer name": string,
  "Customer Address": string,
  "Customer Phone": string,
  "OrderTotal": number
}
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient) { }

  checkUser(): Observable<users[]> {
    return this.http.get<users[]>('../assets/users.json');
  };

  getCustomerDetails(): Observable<customers[]> {
    return this.http.get<customers[]>('../assets/sample.json');
  }
}

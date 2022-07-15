import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  constructor(private service:AppService) { }

  async ngOnInit(): Promise<void> {
    console.log('orders');
    const customers= await lastValueFrom(this.service.getCustomerDetails());
    console.log(customers);
    console.log(Object.keys(customers[0]))
  }

}

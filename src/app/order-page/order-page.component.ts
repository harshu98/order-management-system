import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AppService } from '../app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}
interface customers {
  "Order_Number": number,
  "Order_Due_Date": string,
  "Customer_name": string,
  "Customer_Address": string,
  "Customer_Phone": string,
  "OrderTotal": number
}
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  constructor(private service: AppService, private fb: FormBuilder, private modalService: NgbModal) { }
  page = 1;
  isAdd=false;
  isEdit=true;
  pageSize = 4;
  orders: customers[] = [];
  submitted = false;
  collectionSize = 0;
  form!: FormGroup;
  async ngOnInit(): Promise<void> {
    console.log('orders');
    this.orders = await lastValueFrom(this.service.getCustomerDetails());
    console.log(this.orders);
    this.collectionSize = this.orders.length;
    this.form = this.fb.group({
      orderNumber: ['', Validators.required],
      dueDate: ['', Validators.required],
      customerName: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerPhone: ['', Validators.required],
      orderTotal: ['', Validators.required],
    })
  }
  get f() { return this.form.controls; }
  addButton(content: any) {
    this.modalService.open(content, { centered: true });
    this.isAdd=true;
    this.isEdit=false;
  }
  addOrder() {
    console.log('add order');
    console.log(this.form);
    this.submitted = true;
    if (this.form.invalid) {
      console.log('"INVALID"')
      return;
    }
  }
  editButton(id: number, content: any) {
    console.log('edit order');
    this.isAdd=false;
    this.isEdit=true;
    this.modalService.open(content, { centered: true });
    console.log(id);
    const editableitem = this.orders.find(order => order.Order_Number === id);
    if (editableitem != null) {
      this.form.setValue(
        { 
          orderNumber: editableitem.Order_Number,
          dueDate: editableitem.Order_Due_Date, 
          customerName: editableitem.Customer_name, 
          customerAddress: editableitem.Customer_Address, 
          customerPhone: editableitem.Customer_Phone, 
          orderTotal: editableitem.OrderTotal 
        }
        );
    }
  }
  editOrder(){
    console.log("editOrder");
  }
  deleteOrder(id: number) {
    console.log('delete order');
    console.log(id);
  }
  refreshCountries() { }

}

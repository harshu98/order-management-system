import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AppService } from '../app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  isAdd = false;
  isEdit = true;
  show = false;
  Message = '';
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
      orderNumber: [''],
      dueDate: ['', Validators.required],
      customerName: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerPhone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      orderTotal: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
    this.form.controls['orderNumber'].disable()
  }
  get f() { return this.form.controls; }
  addButton(content: any) {
    this.form.reset();
    this.modalService.open(content, { centered: true });
    this.isAdd = true;
    this.isEdit = false;
  }
  async addOrder() {
    console.log('add order');
    console.log(this.form);
    this.submitted = true;
    if (this.form.invalid) {
      console.log('"INVALID"')
      return;
    }
    console.log(this.form.value);
    const formData: customers = {
      "Order_Number": this.orders.length + 1,
      "Order_Due_Date": this.form.value.dueDate,
      "Customer_name": this.form.value.customerName,
      "Customer_Address": this.form.value.customerAddress,
      "Customer_Phone": this.form.value.customerPhone,
      "OrderTotal": this.form.value.orderTotal
    }
    const result = await lastValueFrom(this.service.addOrder(formData));
    if (result) {
      this.modalService.dismissAll();
      this.Message = "Order added successfully";
      this.show = true;
      this.orders = await lastValueFrom(this.service.getCustomerDetails());
    }
    else {
      this.Message = "Order failed to be added";
      this.show = true;
    }
  }
  editButton(id: number, content: any) {
    console.log('edit order');
    this.isAdd = false;
    this.isEdit = true;
    this.modalService.open(content, { centered: true });
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
  async editOrder() {
    console.log("editOrder");
    this.submitted = true;
    if (this.form.invalid) {
      console.log('"INVALID"')
      return;
    }
    const formData: customers = {
      "Order_Number": this.f['orderNumber'].value,
      "Order_Due_Date": this.form.value.dueDate,
      "Customer_name": this.form.value.customerName,
      "Customer_Address": this.form.value.customerAddress,
      "Customer_Phone": this.form.value.customerPhone,
      "OrderTotal": this.form.value.orderTotal
    }
    const result = await lastValueFrom(this.service.editOrder(formData));
    if (result) {
      this.modalService.dismissAll();
      this.Message = "Order Updated successfully";
      this.show = true;
      this.orders = await lastValueFrom(this.service.getCustomerDetails());
    }
    else {
      this.Message = "Order failed to Update";
      this.show = true;
    }
  }
  async deleteOrder(id: number) {
    console.log('delete order');
    console.log(id);
    const result = await lastValueFrom(this.service.deleteOrder(id));
    if (result) {
      this.modalService.dismissAll();
      this.Message = "Order Deleted successfully";
      this.show = true;
      this.orders = await lastValueFrom(this.service.getCustomerDetails());
    }
    else {
      this.Message = "Order failed to delete";
      this.show = true;
    }
  }
  refreshCountries() { }

}

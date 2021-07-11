import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class RazorpayService {
  susbcription_id = []
  constructor(private http: HttpClient) { }

  getCustomer(data) {
    this.http.post('http://localhost:4500/create-customers', data).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }
  getSubscription(data) {
    this.http.post('http://localhost:4500/create-subscription', data).subscribe(
      data => {
        console.log(data);
        const usersJson: any[] = Array.of(data);
        this.susbcription_id = usersJson[0].createRzpData.id
        console.log(this.susbcription_id)
      }, error => {
        console.log(error);
      });
  }
  getPlans() {
    return this.http.get('http://localhost:4500/fetch-plans');
  }
}

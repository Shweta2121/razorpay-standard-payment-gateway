import { Component, OnInit, OnDestroy } from '@angular/core';
import { RazorpayService } from '../../core/service/razorpay.service'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']

})
export class SubscriptionComponent implements OnInit, OnDestroy {
  plans = []
  razorpay_subscription_id;
  myForm: FormGroup;
  plan_id;
  private formIdChangeSub: Subscription;

  constructor(private rzp: RazorpayService, private fb: FormBuilder, public router: Router) {
  }

  ngOnInit(): void {
    this.razorpay_subscription_id = this.rzp.susbcription_id
    console.log(this.razorpay_subscription_id)
    this.allPlans();
    this.initForm();
  }
  ngOnDestroy() {
    if (this.formIdChangeSub) {
      this.formIdChangeSub.unsubscribe();
    }
  }

  allPlans() {
    this.rzp.getPlans().subscribe(
      data => {
        console.log(data);
        const usersJson: any[] = Array.of(data);
        this.plans = usersJson[0].fetchRzpData.items
      }, error => {
        console.log(error);
      });
  }
  initForm() {
    this.myForm = this.fb.group({
      plan_id: [this.plan_id, Validators.required],
      total_count: ['', Validators.required],
    });
    this.formIdChangeSub = this.myForm.controls.plan_id.valueChanges.subscribe(
      res => {
        console.log(res)
      }
    );
  }
  get fields() { return this.myForm.controls; }

  async onSubmit(data) {
    console.log("hello")
    console.log(data)
    if (this.myForm.valid) {
      console.log(this.myForm.value)
      const data = this.myForm.value
      this.rzp.getSubscription(data)
      console.log(data)
      // this.router.navigate(['/checkout'])
      return data
    }
    else {
      console.error("error");
      this.myForm.reset();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {ConversionApiService} from '../sercvices/conversion-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currencyConversion = this.formBuilder.group({
      fromAmount: ['']
    });
  toAmount = '৳ 0.00';
  conversionPrice: any;

  constructor(
    private formBuilder: FormBuilder,
    private conversionApiService: ConversionApiService
  ) { }

  ngOnInit(): void {
    this.getConversionPrice();
    this.covertPrice();
  }

  async getConversionPrice(): Promise<void> {
    try {
      const conversionData = await this.conversionApiService.getConversionApi().toPromise();
      this.conversionPrice = conversionData.conversion_rates;
    }
    catch (error) {
      console.log(error);
    }
  }

  covertPrice(): void {
    this.currencyConversion.get('fromAmount')?.valueChanges.subscribe((data) => {
        const totalPrice = (this.currencyConversion.get('fromAmount')?.value * this.conversionPrice.BDT).toString();
        this.toAmount = `৳ ${totalPrice}`;
      },
      (error) => {
        console.log(error.message);
      });
  }
}

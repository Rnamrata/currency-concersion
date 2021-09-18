import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversionApiService {

  constructor(
    private http: HttpClient
  ) { }

  getConversionApi(): Observable<any> {
    return this.http.get(' https://v6.exchangerate-api.com/v6/282be22468b08672bab2f8f4/latest/USD', {});
  }
}

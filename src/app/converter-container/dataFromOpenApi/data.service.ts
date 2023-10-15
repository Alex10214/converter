import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IConversionRates, ICurrencies} from "../intefaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {

  }

  getDataFromOpenApiForConversionRates(): Observable<IConversionRates> {
    return this.http.get<IConversionRates>('https://v6.exchangerate-api.com/v6/3ceb134900d6ecfdfad839a1/latest/USD');
  }

  getDataNamesFromOpenApi(): Observable<ICurrencies[]> {
    return this.http.get<ICurrencies[]>('https://restcountries.com/v3.1/all?fields=currencies');
  }
}

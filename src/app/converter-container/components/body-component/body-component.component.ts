import {Component, OnInit} from '@angular/core';
import {ICurrencies, ICustomData} from "../../intefaces/interfaces";
import {DataService} from "../../dataFromOpenApi/data.service";
import {forkJoin, take} from "rxjs";

@Component({
  selector: 'app-body-component',
  templateUrl: './body-component.component.html',
  styleUrls: ['./body-component.component.scss']
})
export class BodyComponentComponent implements OnInit {

  public data: ICustomData[] = [];
  firstAmountValue: number;
  secondAmountValue: number;
  selectedOptionFromFirstSelect: any;
  selectedOptionFromSecondSelect: any;

  constructor(private reqDataFromOpenApi: DataService) {

  }

  ngOnInit(): void {

    forkJoin([
      this.reqDataFromOpenApi.getDataFromOpenApiForConversionRates().pipe(take(1)),
      this.reqDataFromOpenApi.getDataNamesFromOpenApi().pipe(take(1))
    ]).subscribe(
      ([currencyData, countryData]) => {

        const outputArray = Object.entries(currencyData.conversion_rates).map(([key, value]) => ({[key]: value}));

        outputArray.forEach(item1 => {
          const currency = Object.keys(item1)[0];
          const price = item1[currency];
          const item2 = countryData.find((obj: ICurrencies) => obj.currencies[currency]);

          if (item2) {
            const name = item2.currencies[currency].name;
            const symbol = item2.currencies[currency].symbol;

            this.data.push({currency, name, price, symbol});
          }
        });
        this.startedValues()
      });


  }

  startedValues() {

    this.selectedOptionFromFirstSelect = this.data.find((el: ICustomData) => el.currency === "USD")
    this.selectedOptionFromSecondSelect = this.data.find((el: ICustomData) => el.currency === "UAH")

    console.log(this.selectedOptionFromSecondSelect)

    this.firstAmountValue = +(Math.round(this.selectedOptionFromFirstSelect.price * 100) / 100).toFixed(3);
    this.secondAmountValue = +(Math.round(this.selectedOptionFromSecondSelect.price * 100) / 100).toFixed(3);
  }

  calc() {
    if (this.selectedOptionFromFirstSelect && this.selectedOptionFromSecondSelect) {

      const changedValue = this.firstAmountValue / this.selectedOptionFromFirstSelect.price;

      this.secondAmountValue = changedValue * this.selectedOptionFromSecondSelect.price;

      this.secondAmountValue = +(Math.round(this.secondAmountValue * 1000) / 1000).toFixed(3);
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {DataService} from "./dataFromOpenApi/data.service";
import {forkJoin, take} from "rxjs";
import {ICurrencies, ICustomData} from "./intefaces/interfaces";

import {data} from "../data/data";

@Component({
  selector: 'app-converter-container',
  templateUrl: './converter-container.component.html',
  styleUrls: ['./converter-container.component.scss']
})
export class ConverterContainerComponent implements OnInit {



  constructor(

  ) {
  }

  ngOnInit() {


  }

}

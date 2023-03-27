import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { WeatherService } from "src/app/services/weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  formGroup : FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private weatherService: WeatherService) { }

  ngOnInit() {
  }
  submit(){

  }
}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-error-input',
  templateUrl: './form-error-input.component.html',
  styleUrls: ['./form-error-input.component.scss']
})
export class FormErrorInputComponent implements OnInit, OnChanges {
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes)
  }

}

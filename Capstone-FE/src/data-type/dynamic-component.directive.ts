import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamic]',
})
export class Dynamic {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

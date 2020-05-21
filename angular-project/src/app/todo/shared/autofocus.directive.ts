import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  constructor(private element: ElementRef) {}

  ngOnInit() {
    window.setTimeout(() => {
      this.element.nativeElement.focus();
    });
  }
}

import { Directive, HostListener, ElementRef, Renderer2, OnInit, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDeviceCodeInput]'
})
export class DeviceCodeInputDirective implements OnInit{

  constructor(private _elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
     this.renderer.removeAttribute(this._elRef.nativeElement,'disabled');
  }

  @HostListener('keydown.enter') keyEnterDown(eventData: Event){
   event.preventDefault();
  //  this.renderer.setAttribute(this._elRef.nativeElement,'disabled','');
     
}

 @HostListener('input') change(eventData: Event){

 }



}

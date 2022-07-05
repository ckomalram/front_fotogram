import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImgSanitizerPipe } from './img-sanitizer.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImgSanitizerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [ DomSanitizerPipe,ImgSanitizerPipe]
})
export class PipesModule { }

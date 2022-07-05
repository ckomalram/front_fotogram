import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImgSanitizerPipe } from './img-sanitizer.pipe';
import { ImgpipePipe } from './imgpipe.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImgSanitizerPipe,
    ImgpipePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [ DomSanitizerPipe,ImgSanitizerPipe,ImgpipePipe]
})
export class PipesModule { }

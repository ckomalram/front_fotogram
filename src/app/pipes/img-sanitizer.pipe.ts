import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imgSanitizer'
})
export class ImgSanitizerPipe implements PipeTransform {

  constructor(private domsanitizer: DomSanitizer){}

  transform(image: any): any {
    return this.domsanitizer.bypassSecurityTrustUrl(image);
  }

}

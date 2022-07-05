import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Pipe({
  name: 'imgpipe'
})
export class ImgpipePipe implements PipeTransform {

  transform(image: string, userID: string): string {
    return `${API_URL}/post/imagen/${userID}/${image}`;
  }

}

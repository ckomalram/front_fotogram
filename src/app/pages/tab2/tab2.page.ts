import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[]= [];
  post = {
    message: '',
    coords: null,
    posicion: false
  };

  constructor(private postservices: PostService, private route: Router) {}

  async crearPost(){
    console.log(this.post);
    const creado = await this.postservices.createPost(this.post);
    if (creado) {
      this.post = {
        message: '',
        coords: null,
        posicion: false
      };

      this.route.navigateByUrl('/main/tabs/tab1');

    }
  }
}

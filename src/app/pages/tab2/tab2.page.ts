import { Component } from '@angular/core';
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

  constructor(private postservices: PostService) {}

  crearPost(){
    console.log(this.post);
    this.postservices.createPost(this.post);
  }
}

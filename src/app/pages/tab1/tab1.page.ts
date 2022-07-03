import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  deshabilitado =  false;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadData();

/* Subscribing to the observable that is created in the post.service.ts file. */
    this.postService.nuevoPost.subscribe(post => {
      this.posts.unshift(post);
    });
  }

  loadData(event?: any, pull: boolean = false){

    if (pull) {
      this.posts = [];
      this.deshabilitado=false;
    }
    this.postService.getPosts(pull).subscribe( resp => {
      console.log(resp);
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();
        if (resp.posts.length === 0) {
          this.deshabilitado=true;
        }
       }
    });
  }

  doRefresh(event?: any){
    this.loadData(event , true);
  }
}

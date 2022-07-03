import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


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

  cargandoGeo = false;

  constructor(private postservices: PostService, private route: Router, private geolocation: Geolocation) {}

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

  getGeo(){
    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords= coords;
     }).catch((error) => {
      this.cargandoGeo = false;
       console.log('Error getting location', error);
     });
    console.log(this.post);
  }
}

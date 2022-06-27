import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService  {

  toke: string = null;

  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }

  async init() {
    await this.storage.create();
    // console.log('instancia creada');
  };

  login(email: string, password: string){
    const data = { email, password};

    this.http.post(`${API_URL}/user/login`,data)
    .subscribe(resp => {
      console.log(resp);
    });
  }

  guardarToken(){

  }

}

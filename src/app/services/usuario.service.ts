import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaLogin } from '../interfaces/interfaces';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService  {

  token: string = null;

  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }

  async init() {
    await this.storage.create();
    // console.log('instancia creada');
  };

  login(email: string, password: string){
    const data = { email, password};

    return new Promise(resolve => {
      this.http.post<RespuestaLogin>(`${API_URL}/user/login`,data)
      .subscribe(resp => {
        console.log(resp);
        if (resp.ok) {
          this.guardarToken(resp.token);
          resolve(true);
        }else{
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });


  }

  async guardarToken(token: string){
    this.token = token;
    await this.storage.set('token',this.token);
  }

}

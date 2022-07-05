import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaUsuario, RespuestaValidaToken, Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService  {

  token: string = null;
  private usuario: Usuario={};

  constructor(private storage: Storage, private http: HttpClient, private navcontroller: NavController) {
    this.init();
  }

  async init() {
    await this.storage.create();
    // console.log('instancia creada');
  };

  logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navcontroller.navigateRoot('/login', {animated: true});
  }

  login(email: string, password: string){
    const data = { email, password};

    return new Promise(resolve => {
      this.http.post<RespuestaUsuario>(`${API_URL}/user/login`,data)
      .subscribe(async (resp) => {
        console.log(resp);
        if (resp.ok) {
         await  this.guardarToken(resp.token);
          resolve(true);
        }else{
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });


  }

  register(usuario: Usuario){
    return new Promise(resolve => {
        this.http.post<RespuestaUsuario>(`${API_URL}/user/create`,usuario).subscribe(async resp => {
          console.log(resp);
          if (resp.ok) {
           await  this.guardarToken(resp.token);
            resolve(true);
          }else{
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  actualizar(usuario: Usuario){
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.http.post<RespuestaUsuario>(`${API_URL}/user/update`,usuario, {headers}).subscribe(resp => {
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

   await  this.validaToken();
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

 async validaToken(): Promise<boolean>{
    await this.cargarToken();


    if (!this.token) {
      this.navcontroller.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get<RespuestaValidaToken>(`${API_URL}/user/`, {headers}).subscribe(resp => {
        if (resp.ok) {
          this.usuario = resp.usuario;
          resolve(true);
        }else{
          this.navcontroller.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  getUsuario(){
    // eslint-disable-next-line no-underscore-dangle
    if (!this.usuario._id) {
      this.validaToken();
    }
    return {...this.usuario};
  }



}

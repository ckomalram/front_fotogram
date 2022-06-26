import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces';


const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class PostService {

  paginaPost = 0;

  constructor(private http: HttpClient) { }

  getPosts(){
    this.paginaPost++;
    return this.http.get<RespuestaPosts>(`${API_URL}/post/?pagina=${ this.paginaPost}`);
  }
}

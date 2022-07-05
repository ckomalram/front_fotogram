import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FileUploadOptions, FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post, RespuestaPost } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';


const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class PostService {

  paginaPost = 0;

  nuevoPost = new EventEmitter<Post>();
  constructor(private http: HttpClient, private filetransfer: FileTransfer,
    private usuarioService: UsuarioService) { }

  getPosts(pull: boolean = false) {

    if (pull) {
      this.paginaPost = 0;
    }
    this.paginaPost++;
    return this.http.get<RespuestaPosts>(`${API_URL}/post/?pagina=${this.paginaPost}`);
  }

  createPost(post) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {
          /* Creating a post and emitting the post to the newPost event emitter. */
    this.http.post<RespuestaPost>(`${API_URL}/post`, post, { headers }).subscribe(resp => {
      console.log(resp);
      this.nuevoPost.emit(resp.post);
      resolve(true);
    });
    });


  }

  subirImagen(img: string){
    const options: FileUploadOptions={
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.filetransfer.create();
    fileTransfer.upload(img, `${API_URL}/post/upload`,options)
    .then(data => {

    }).catch(error => {
      console.log('Error cargarimagen', error);
    });
  }
}

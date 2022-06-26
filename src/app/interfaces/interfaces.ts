export interface RespuestaPosts {
  ok:     boolean;
  pagina: number;
  posts:  Post[];
}

export interface Post {
  _id:     string;
  message: string;
  images:  any[];
  coords:  string;
  usuario: Usuario;
  created: Date;

}

export interface Usuario {
  _id:      string;
  nombre:   string;
  avatar:   string;
  email:    string;
}
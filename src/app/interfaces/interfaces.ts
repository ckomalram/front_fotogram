

export interface Post {
  _id?:     string;
  message?: string;
  images?:  any[];
  coords?:  string;
  usuario?: Usuario;
  created?: Date;

}

export interface Usuario {
  _id?:      string;
  nombre?:   string;
  avatar?:   string;
  email?:    string;
  password?:    string;
}

// Generated by https://quicktype.io

export interface RespuestaUsuario {
  ok:    boolean;
  token: string;
}

export interface RespuestaValidaToken {
  ok:      boolean;
  usuario: Usuario;
}

export interface RespuestaPosts {
  ok:     boolean;
  pagina: number;
  posts:  Post[];
}


export interface RespuestaPost {
  ok:   boolean;
  post: Post;
}



import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario={};

  constructor(private usuarioservice: UsuarioService) {}

  ngOnInit(): void {
  this.usuario=  this.usuarioservice.getUsuario();
  }
  logout(){
    console.log('logout');
  }

}

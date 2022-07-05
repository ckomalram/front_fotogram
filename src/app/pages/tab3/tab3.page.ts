import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario={};

  constructor(private usuarioservice: UsuarioService,private postservice: PostService,
     private uiServiceService:  UiServiceService) {}

  ngOnInit(): void {
  this.usuario=  this.usuarioservice.getUsuario();
  }
  logout(){
    console.log('logout');
    this.postservice.paginaPost = 0;
    this.usuarioservice.logout();
  }

  async actualizarUsuario(fActualizar: NgForm){
    if (fActualizar.invalid) {
      return;
    }

    const actualizado = await this.usuarioservice.actualizar(this.usuario);

    if (actualizado) {
        //Alerta toast con mensaje actualizado
        this.uiServiceService.presentToast('Datos  actualizados con exito!');
    }else{
      //Alerta toast con mensaje error
      this.uiServiceService.presentToast('Error al actualizar datos...');
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slidePrincipal: IonSlides;



  loginUser = {
    email: 'ckomalram@gmail.com',
    password: 'ckomalram'
  };

  registerUser: Usuario = {
    email: 'ckomalram@gmail.com',
    password: 'ckomalram',
    nombre: 'Carlyle'
  };



  constructor(private usuarioService: UsuarioService , private navCtrl: NavController
    ,private uiservice: UiServiceService
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.slidePrincipal.lockSwipes(true);
  }

  async login(fLogin: NgForm){
    console.log(fLogin.valid);
    console.log(this.loginUser);

    if (fLogin.invalid) {
      return;
    }

    const valido = await this.usuarioService.login(this.loginUser.email,this.loginUser.password);

    if (valido) {
      //navegar a tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {
        animated: true
      });
    } else {
      //mostrar mensaje de credenciales no validad.
      this.uiservice.alertaInformativa('Credenciales no validas.');
    }

  }
  async register(fRegister: NgForm){
    if (fRegister.invalid) {
      return;
    }

    const valido = await  this.usuarioService.register(this.registerUser);
    if (valido) {
      //navegar a tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {
        animated: true
      });
    } else {
      //mostrar mensaje de credenciales no validad.
      this.uiservice.alertaInformativa('Correo Electronico ya existe');
    }
  }



  mostrarLogin(){
    this.slidePrincipal.lockSwipes(false);
    this.slidePrincipal.slideTo(0);
    this.slidePrincipal.lockSwipes(true);

  }

  mostrarRegistro(){
    this.slidePrincipal.lockSwipes(false);
    this.slidePrincipal.slideTo(1);
    this.slidePrincipal.lockSwipes(true);

  }


  chooseAvatar(event: string){
    console.log(event);
    this.registerUser.avatar=event;
  }


}

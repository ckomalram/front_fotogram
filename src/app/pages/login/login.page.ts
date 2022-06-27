import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slidePrincipal: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

 slideOpts = {
  slidesPerView: 3.5
  };

  loginUser = {
    email: 'ckomalram@gmail.com',
    password: 'ckomalram'
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
  register(fRegister: NgForm){
    console.log(fRegister.valid);
  }

  seleccionarAvatar(avatar: any){
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
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


}

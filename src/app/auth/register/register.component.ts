import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public authSerice:AuthService) { }

  ngOnInit() {
  }

  onSubmit(correo:string,nombre:string, password:string){
    this.authSerice.crearUsuario(nombre,correo,password);
  }

}

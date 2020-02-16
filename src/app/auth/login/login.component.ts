import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private _service:AuthService) { }

  ngOnInit() {
  }

  login(email:string,pass:string){
    this._service.loginUsuario(email,pass)
  }
}

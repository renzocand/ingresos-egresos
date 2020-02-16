import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router:Router) { }

  initAuthListener(){
    this.auth.authState.subscribe((fbUser:User)=>{
      console.log(fbUser);
    })
  }

  crearUsuario(nombre:string,email:string,pass:string){
    this.auth.createUserWithEmailAndPassword(email,pass)
    .then(resp=>{
      console.log(resp);
      this.router.navigateByUrl("/")
    })
    .catch(error=>{
      console.error(error);
    })
  }

  loginUsuario(email:string,password:string){
    this.auth.signInWithEmailAndPassword(email,password)
    .then(resp=>{
      console.log(resp);
      this.router.navigateByUrl("/")
    })
    .catch(error=>{
      console.error(error);
    })
  }

  logout(){
    this.router.navigateByUrl('login');
    this.auth.signOut()
  }
}

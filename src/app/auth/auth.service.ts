import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { map } from "rxjs/operators";
import { User } from "./user";
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  fbUser: firebase.User;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private afDb: AngularFirestore
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, pass: string) {
    this.auth
      .createUserWithEmailAndPassword(email, pass)
      .then(resp => {
        const user:User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: email
        };
        
        this.afDb
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigateByUrl("");
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  loginUsuario(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        console.log(resp);
        this.router.navigateByUrl("/");
      })
      .catch(error => {
        console.error(error);
      });
  }

  logout() {
    this.router.navigateByUrl("login");
    this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) {
          this.router.navigateByUrl("login");
        }
        return fbUser !== null;
      })
    );
  }
}
